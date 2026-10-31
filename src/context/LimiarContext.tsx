import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Character,
  Campaign,
  CampaignCharacterState,
  Weapon,
  Gift,
  Creature,
  RollResult,
  UserProfile,
  InitiativeItem,
} from '../types/limiar';
import {
  OFFICIAL_WEAPONS,
  OFFICIAL_GIFTS,
  PREMADE_CHARACTERS,
  OFFICIAL_BESTIARY,
} from '../data/limiarDatabase';
import {
  rollLimiarCheck,
  LimiarCheckParams,
  DamageRollResult,
  calculateRiftClockInfo,
  calculateAgentStats,
  playDiceSound,
  playAferidorBeep,
} from '../utils/limiarRules';

interface LimiarContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchUserRole: (role: 'mestre' | 'jogador') => void;
  setUserName: (name: string) => void;

  // Campanhas
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  currentCampaignId: string;
  setCurrentCampaignId: (id: string) => void;
  createCampaign: (name: string, description: string) => Campaign;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  joinCampaign: (campaignCode: string, characterId?: string) => boolean;
  selectCharacterForCampaign: (campaignId: string, characterId: string) => void;

  // Personagens
  characters: Character[];
  activeCharacter: Character | null; // Personagem que o jogador está jogando nesta campanha
  createCharacter: (char: Partial<Character>) => Character;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;

  // Estado dos Personagens na Campanha (PV, PE, MEN, Contágio salvos POR campanha)
  getCampaignCharacterState: (campaignId: string, characterId: string) => CampaignCharacterState;
  updateCampaignCharacterState: (
    campaignId: string,
    characterId: string,
    updates: Partial<CampaignCharacterState>,
    logContagionChange?: { change: number; reason: string }
  ) => void;

  // Compêndio de Armas e Dons
  weapons: Weapon[];
  createWeapon: (weapon: Partial<Weapon>) => Weapon;
  updateWeapon: (id: string, updates: Partial<Weapon>) => void;
  deleteWeapon: (id: string) => void;

  gifts: Gift[];
  createGift: (gift: Partial<Gift>) => Gift;
  updateGift: (id: string, updates: Partial<Gift>) => void;
  deleteGift: (id: string) => void;

  // Bestiário e Criaturas
  creatures: Creature[];
  createCreature: (creature: Partial<Creature>) => Creature;
  updateCreature: (id: string, updates: Partial<Creature>) => void;
  deleteCreature: (id: string) => void;

  // Rolagens e Histórico
  rollHistory: RollResult[];
  visibleRollHistory: RollResult[]; // Filtra privadas para quem é jogador
  makeRoll: (
    params: LimiarCheckParams & {
      title: string;
      subtitle?: string;
      isPrivate?: boolean;
      damageRoll?: DamageRollResult;
      extraEffect?: string;
    }
  ) => RollResult;
  clearRollHistory: () => void;

  // Relógio e Combate
  setRiftClockHours: (hours: number) => void;
  advanceRiftClock: (hoursDelta: number) => void;
  toggleCombat: () => void;
  nextTurn: () => void;
  setInitiativeOrder: (order: InitiativeItem[]) => void;
  updateCivilCounter: (rescuedDelta: number, casualtiesDelta: number) => void;

  // Exportar / Importar
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const LimiarContext = createContext<LimiarContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'limiar_vtt_';
const BROADCAST_CHANNEL_NAME = 'limiar_vtt_sync_channel';

export const LimiarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicialização de Usuário
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      id: 'user_' + Math.random().toString(36).substring(2, 9),
      name: 'Agente Recruta',
      rolePreference: 'mestre',
    };
  });

  // Campanhas
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}campaigns`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const defaultCamp: Campaign = {
      id: 'camp_turma23',
      code: 'LM-2034',
      name: 'Turma 23 — A Serra do Meridiano',
      description: 'Campanha inaugural da Turma 23. Incursões em Fendas no planalto sul e a conspiração da Cicatriz.',
      gmId: currentUser.id,
      gmName: currentUser.name,
      players: [
        { userId: currentUser.id, userName: currentUser.name, characterId: 'char_rafa_muralha' }
      ],
      riftClock: calculateRiftClockInfo(2),
      combat: {
        isActive: false,
        round: 1,
        turnIndex: 0,
        order: [],
      },
      civilCounter: {
        total: 25,
        rescued: 0,
        casualties: 0,
      },
      createdAt: new Date().toISOString(),
    };
    return [defaultCamp];
  });

  const [currentCampaignId, setCurrentCampaignId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}current_camp_id`);
    return saved || 'camp_turma23';
  });

  // Personagens globais do usuário
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}characters`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return PREMADE_CHARACTERS;
  });

  // Estados de personagem por campanha
  const [campaignCharacterStates, setCampaignCharacterStates] = useState<Record<string, CampaignCharacterState>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}camp_char_states`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    // Inicializa estados padrão para os personagens prontos na campanha default
    const initialStates: Record<string, CampaignCharacterState> = {};
    PREMADE_CHARACTERS.forEach((char) => {
      const stats = calculateAgentStats(char);
      const stateKey = `camp_turma23_${char.id}`;
      initialStates[stateKey] = {
        characterId: char.id,
        campaignId: 'camp_turma23',
        currentPV: stats.maxPV,
        currentPE: stats.maxPE,
        currentMEN: stats.maxMEN,
        tempPV: 0,
        contagion: char.id === 'char_leo_voz' ? 8 : 0,
        peakContagion: char.id === 'char_leo_voz' ? 8 : 0,
        floorContagion: char.id === 'char_leo_voz' ? 4 : 0,
        determination: 3,
        conditions: [],
        dyingState: { successes: 0, failures: 0 },
        ammoByWeaponId: {
          pistola_padrao: 12,
          fuzil_assalto: 10,
        },
        contagionHistory: [
          {
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            change: char.id === 'char_leo_voz' ? 8 : 0,
            reason: 'Registro inicial na chegada ao campus',
            currentValue: char.id === 'char_leo_voz' ? 8 : 0,
          }
        ],
        isConsumido: false,
      };
    });
    return initialStates;
  });

  // Armas
  const [weapons, setWeapons] = useState<Weapon[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}weapons`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return OFFICIAL_WEAPONS;
  });

  // Dons
  const [gifts, setGifts] = useState<Gift[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}gifts`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return OFFICIAL_GIFTS;
  });

  // Criaturas
  const [creatures, setCreatures] = useState<Creature[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}creatures`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return OFFICIAL_BESTIARY;
  });

  // Histórico de Rolagens
  const [rollHistory, setRollHistory] = useState<RollResult[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}rolls`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // ==========================================
  // SINCRONIZAÇÃO BROADCASTCHANNEL (TEMPO REAL MULTI-ABA)
  // ==========================================
  const broadcastChannel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    }
    return null;
  }, []);

  const broadcastEvent = useCallback((type: string, payload: unknown) => {
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type, payload });
    }
  }, [broadcastChannel]);

  useEffect(() => {
    if (!broadcastChannel) return;

    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data || {};
      if (!type) return;

      if (type === 'NEW_ROLL') {
        setRollHistory((prev) => [payload as RollResult, ...prev]);
        playDiceSound();
      } else if (type === 'UPDATE_CAMP_CHAR_STATE') {
        const { key, state } = payload as { key: string; state: CampaignCharacterState };
        setCampaignCharacterStates((prev) => ({ ...prev, [key]: state }));
      } else if (type === 'UPDATE_CAMPAIGN') {
        const updated = payload as Campaign;
        setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else if (type === 'FULL_SYNC') {
        // Recarrega todos os dados
        try {
          const rawCamp = localStorage.getItem(`${STORAGE_KEY_PREFIX}campaigns`);
          if (rawCamp) setCampaigns(JSON.parse(rawCamp));
          const rawChars = localStorage.getItem(`${STORAGE_KEY_PREFIX}characters`);
          if (rawChars) setCharacters(JSON.parse(rawChars));
          const rawStates = localStorage.getItem(`${STORAGE_KEY_PREFIX}camp_char_states`);
          if (rawStates) setCampaignCharacterStates(JSON.parse(rawStates));
        } catch {
          // ignore
        }
      }
    };

    broadcastChannel.addEventListener('message', handleMessage);
    return () => {
      broadcastChannel.removeEventListener('message', handleMessage);
    };
  }, [broadcastChannel]);

  // Persistência no LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}current_camp_id`, currentCampaignId);
  }, [currentCampaignId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}characters`, JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}camp_char_states`, JSON.stringify(campaignCharacterStates));
  }, [campaignCharacterStates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}weapons`, JSON.stringify(weapons));
  }, [weapons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}gifts`, JSON.stringify(gifts));
  }, [gifts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}creatures`, JSON.stringify(creatures));
  }, [creatures]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}rolls`, JSON.stringify(rollHistory.slice(0, 100)));
  }, [rollHistory]);

  // Campanha Atual
  const currentCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === currentCampaignId) || campaigns[0] || null;
  }, [campaigns, currentCampaignId]);

  // Personagem Ativo nesta campanha
  const activeCharacter = useMemo(() => {
    if (!currentCampaign) return null;
    const playerEntry = currentCampaign.players.find((p) => p.userId === currentUser.id);
    if (!playerEntry?.characterId) return null;
    return characters.find((c) => c.id === playerEntry.characterId) || null;
  }, [currentCampaign, currentUser.id, characters]);

  // Histórico de rolagens visíveis (jogadores só veem rolagens públicas e as suas)
  const visibleRollHistory = useMemo(() => {
    if (!currentCampaign) return [];
    const isGM = currentUser.rolePreference === 'mestre' || currentCampaign.gmId === currentUser.id;

    return rollHistory
      .filter((roll) => roll.campaignId === currentCampaign.id)
      .filter((roll) => {
        if (isGM) return true; // Mestre vê tudo
        if (!roll.isPrivate) return true; // Rolagem pública
        return roll.senderId === currentUser.id; // Jogador vê suas próprias rolagens privadas
      });
  }, [rollHistory, currentCampaign, currentUser]);

  // ==========================================
  // FUNÇÕES DE AÇÃO DO CONTEXTO
  // ==========================================

  const switchUserRole = (role: 'mestre' | 'jogador') => {
    setCurrentUser((prev) => ({ ...prev, rolePreference: role }));
  };

  const setUserName = (name: string) => {
    setCurrentUser((prev) => ({ ...prev, name }));
  };

  const createCampaign = (name: string, description: string): Campaign => {
    const code = 'LM-' + Math.floor(1000 + Math.random() * 9000);
    const newCamp: Campaign = {
      id: 'camp_' + Math.random().toString(36).substring(2, 9),
      code,
      name,
      description,
      gmId: currentUser.id,
      gmName: currentUser.name,
      players: [
        { userId: currentUser.id, userName: currentUser.name }
      ],
      riftClock: calculateRiftClockInfo(0),
      combat: {
        isActive: false,
        round: 1,
        turnIndex: 0,
        order: [],
      },
      createdAt: new Date().toISOString(),
    };
    setCampaigns((prev) => [...prev, newCamp]);
    setCurrentCampaignId(newCamp.id);
    broadcastEvent('UPDATE_CAMPAIGN', newCamp);
    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          broadcastEvent('UPDATE_CAMPAIGN', updated);
          return updated;
        }
        return c;
      })
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    if (currentCampaignId === id) {
      const remaining = campaigns.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        setCurrentCampaignId(remaining[0].id);
      }
    }
  };

  const joinCampaign = (campaignCode: string, characterId?: string): boolean => {
    const target = campaigns.find(
      (c) => c.code.trim().toUpperCase() === campaignCode.trim().toUpperCase()
    );
    if (!target) return false;

    const existingIndex = target.players.findIndex((p) => p.userId === currentUser.id);
    let updatedPlayers = [...target.players];

    if (existingIndex >= 0) {
      updatedPlayers[existingIndex] = {
        ...updatedPlayers[existingIndex],
        userName: currentUser.name,
        characterId: characterId || updatedPlayers[existingIndex].characterId,
      };
    } else {
      updatedPlayers.push({
        userId: currentUser.id,
        userName: currentUser.name,
        characterId,
      });
    }

    updateCampaign(target.id, { players: updatedPlayers });
    setCurrentCampaignId(target.id);
    return true;
  };

  const selectCharacterForCampaign = (campaignId: string, characterId: string) => {
    const camp = campaigns.find((c) => c.id === campaignId);
    if (!camp) return;

    const playerIndex = camp.players.findIndex((p) => p.userId === currentUser.id);
    let newPlayers = [...camp.players];
    if (playerIndex >= 0) {
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], characterId };
    } else {
      newPlayers.push({ userId: currentUser.id, userName: currentUser.name, characterId });
    }

    updateCampaign(campaignId, { players: newPlayers });

    // Garante que o estado de campanha do personagem exista
    getCampaignCharacterState(campaignId, characterId);
  };

  const createCharacter = (char: Partial<Character>): Character => {
    const newChar: Character = {
      id: 'char_' + Math.random().toString(36).substring(2, 9),
      ownerId: currentUser.id,
      name: char.name || 'Novo Agente',
      nickname: char.nickname || '',
      concept: char.concept || 'Um recruta que busca respostas e teme o silêncio.',
      originId: char.originId || 'atleta_descartado',
      classId: char.classId || 'vanguarda',
      trackId: char.trackId || 'muralha',
      level: char.level || 1,
      rank: char.level ? (char.level < 5 ? 'Calouro' : char.level < 10 ? 'Cadete' : char.level < 15 ? 'Agente' : char.level < 20 ? 'Veterano' : 'Sentinela') : 'Calouro',
      attributes: char.attributes || { FOR: 1, AGI: 1, INT: 1, VIG: 1, PRE: 1 },
      skills: char.skills || { 'Luta': 'treinado', 'Fortitude': 'treinado' },
      bond: char.bond || 'Um colega da mesma turma.',
      flaw: char.flaw || 'Impulsividade em momentos críticos.',
      traumas: char.traumas || [],
      merit: char.merit !== undefined ? char.merit : 10,
      isPublic: char.isPublic !== undefined ? char.isPublic : true,
      equippedWeaponIds: char.equippedWeaponIds || ['machadinha_facao'],
      inventory: char.inventory || [{ id: 'item_aferidor', name: 'Aferidor de Pulso Modelo 2034', spaces: 0 }],
      knownGiftIds: char.knownGiftIds || [],
      notes: char.notes || '',
      appearance: char.appearance || '',
      lastActDraft: char.lastActDraft || '',
      createdAt: new Date().toISOString(),
    };

    setCharacters((prev) => [...prev, newChar]);
    return newChar;
  };

  const updateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  // Obter o estado de PV, PE, MEN e Contágio deste personagem na campanha específica
  const getCampaignCharacterState = (campaignId: string, characterId: string): CampaignCharacterState => {
    const key = `${campaignId}_${characterId}`;
    if (campaignCharacterStates[key]) {
      return campaignCharacterStates[key];
    }

    const char = characters.find((c) => c.id === characterId) || PREMADE_CHARACTERS[0];
    const stats = calculateAgentStats(char);

    const newState: CampaignCharacterState = {
      characterId,
      campaignId,
      currentPV: stats.maxPV,
      currentPE: stats.maxPE,
      currentMEN: stats.maxMEN,
      tempPV: 0,
      contagion: 0,
      peakContagion: 0,
      floorContagion: 0,
      determination: 3,
      conditions: [],
      dyingState: { successes: 0, failures: 0 },
      ammoByWeaponId: {},
      contagionHistory: [
        {
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          change: 0,
          reason: 'Início da campanha',
          currentValue: 0,
        }
      ],
      isConsumido: false,
    };

    setCampaignCharacterStates((prev) => ({ ...prev, [key]: newState }));
    return newState;
  };

  const updateCampaignCharacterState = (
    campaignId: string,
    characterId: string,
    updates: Partial<CampaignCharacterState>,
    logContagionChange?: { change: number; reason: string }
  ) => {
    const key = `${campaignId}_${characterId}`;
    setCampaignCharacterStates((prev) => {
      const current = prev[key] || getCampaignCharacterState(campaignId, characterId);
      const updated = { ...current, ...updates };

      // Se o contágio mudou, atualiza pico e piso
      if (updates.contagion !== undefined) {
        const newContagion = Math.max(0, Math.min(100, updates.contagion));
        updated.contagion = newContagion;
        const newPeak = Math.max(current.peakContagion || 0, newContagion);
        updated.peakContagion = newPeak;
        updated.floorContagion = Math.floor(newPeak / 2);

        // Se atingiu marcos do Aferidor, dispara som
        if (newContagion >= 100) {
          updated.isConsumido = true;
          playAferidorBeep('alert');
        } else if (newContagion >= 90) {
          playAferidorBeep('alert');
        } else if (newContagion >= 50 && (current.contagion || 0) < 50) {
          playAferidorBeep('double');
        } else if (newContagion >= 25 && (current.contagion || 0) < 25) {
          playAferidorBeep('short');
        }

        if (logContagionChange) {
          const historyEntry = {
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            change: logContagionChange.change,
            reason: logContagionChange.reason,
            currentValue: newContagion,
          };
          updated.contagionHistory = [historyEntry, ...(current.contagionHistory || [])];
        }
      }

      broadcastEvent('UPDATE_CAMP_CHAR_STATE', { key, state: updated });
      return { ...prev, [key]: updated };
    });
  };

  // Compêndio de Armas e Dons
  const createWeapon = (weapon: Partial<Weapon>): Weapon => {
    const newWeapon: Weapon = {
      id: 'weapon_' + Math.random().toString(36).substring(2, 9),
      name: weapon.name || 'Nova Arma Personalizada',
      category: weapon.category || 'uma_mao',
      damageDice: weapon.damageDice || '1d8',
      damageType: weapon.damageType || 'cortante',
      range: weapon.range || 'Adjacente',
      spaces: weapon.spaces !== undefined ? weapon.spaces : 1,
      properties: weapon.properties || ['uma_mao'],
      magCapacity: weapon.magCapacity,
      contagionCostPerScene: weapon.contagionCostPerScene || 0,
      description: weapon.description || '',
      isHomebrew: true,
    };
    setWeapons((prev) => [...prev, newWeapon]);
    return newWeapon;
  };

  const updateWeapon = (id: string, updates: Partial<Weapon>) => {
    setWeapons((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  };

  const deleteWeapon = (id: string) => {
    setWeapons((prev) => prev.filter((w) => w.id !== id));
  };

  const createGift = (gift: Partial<Gift>): Gift => {
    const newGift: Gift = {
      id: 'gift_' + Math.random().toString(36).substring(2, 9),
      name: gift.name || 'Novo Dom Personalizado',
      affinity: gift.affinity || 'carne',
      minLevel: gift.minLevel || 1,
      domainLevel: gift.domainLevel || 1,
      baseEffect: gift.baseEffect || 'Efeito base do Dom',
      action: gift.action || 'Padrão',
      range: gift.range || 'Curto',
      targetArea: gift.targetArea || '1 alvo',
      duration: gift.duration || 'Instantânea',
      enhancements: gift.enhancements || [],
      limiters: gift.limiters || [],
      peCost: gift.peCost || 2,
      extraContagion: gift.extraContagion || 0,
      signature: gift.signature || 'Assinatura sensorial visível/audível',
      description: gift.description || '',
      isHomebrew: true,
    };
    setGifts((prev) => [...prev, newGift]);
    return newGift;
  };

  const updateGift = (id: string, updates: Partial<Gift>) => {
    setGifts((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGift = (id: string) => {
    setGifts((prev) => prev.filter((g) => g.id !== id));
  };

  // Criaturas
  const createCreature = (creature: Partial<Creature>): Creature => {
    const newCreature: Creature = {
      id: 'creature_' + Math.random().toString(36).substring(2, 9),
      name: creature.name || 'Novo Alheio',
      type: creature.type || 'Caçador',
      degree: creature.degree || 2,
      pv: creature.pv || 45,
      currentPv: creature.pv || 45,
      defense: creature.defense || 14,
      rdAlheia: creature.rdAlheia || 2,
      speed: creature.speed || '12 m',
      resistances: creature.resistances || { fortitude: 11, reflexos: 6, vontade: 4 },
      attacks: creature.attacks || [
        {
          name: 'Golpe Alheio',
          attackBonus: 8,
          damageFormula: '2d8+3',
          damageType: 'cortante',
          contagionOnHit: 2,
          saveDC: 15,
          saveType: 'Fortitude',
        }
      ],
      traits: creature.traits || ['RD Alheia 2 contra armas convencionais.'],
      powers: creature.powers || [],
      description: creature.description || '',
    };
    setCreatures((prev) => [...prev, newCreature]);
    return newCreature;
  };

  const updateCreature = (id: string, updates: Partial<Creature>) => {
    setCreatures((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCreature = (id: string) => {
    setCreatures((prev) => prev.filter((c) => c.id !== id));
  };

  // Rolagens
  const makeRoll = (
    params: LimiarCheckParams & {
      title: string;
      subtitle?: string;
      isPrivate?: boolean;
      damageRoll?: DamageRollResult;
      extraEffect?: string;
    }
  ): RollResult => {
    playDiceSound();
    const result = rollLimiarCheck(params);

    const rollItem: RollResult = {
      id: 'roll_' + Math.random().toString(36).substring(2, 9),
      campaignId: currentCampaign?.id || 'default',
      senderId: currentUser.id,
      senderName: activeCharacter?.name || currentUser.name,
      senderRole: currentUser.rolePreference,
      isPrivate: params.isPrivate || false,
      title: params.title,
      subtitle: params.subtitle,
      attributeKey: params.attributeKey,
      attributeValue: result.attributeValue,
      bonusDice: params.bonusDice || 0,
      penaltyDice: params.penaltyDice || 0,
      rolls: result.rolls,
      keptDie: result.keptDie,
      trainingBonus: result.trainingBonus,
      extraModifier: result.extraModifier,
      total: result.total,
      dc: params.dc,
      isSuccess: result.isSuccess,
      isHighlight: result.isHighlight,
      isDisaster: result.isDisaster,
      isFullSuccess: result.isFullSuccess,
      damageRoll: params.damageRoll,
      extraEffect: params.extraEffect,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setRollHistory((prev) => [rollItem, ...prev]);
    broadcastEvent('NEW_ROLL', rollItem);
    return rollItem;
  };

  const clearRollHistory = () => {
    setRollHistory([]);
  };

  // Relógio e Combate
  const setRiftClockHours = (hours: number) => {
    if (!currentCampaign) return;
    const newClock = calculateRiftClockInfo(hours);
    updateCampaign(currentCampaign.id, { riftClock: newClock });
    if (newClock.phase === 'Contagem final' || newClock.phase === 'Ruptura') {
      playAferidorBeep('rift');
    }
  };

  const advanceRiftClock = (hoursDelta: number) => {
    if (!currentCampaign) return;
    const currentH = currentCampaign.riftClock.hours;
    setRiftClockHours(Math.max(0, currentH + hoursDelta));
  };

  const toggleCombat = () => {
    if (!currentCampaign) return;
    const isStarting = !currentCampaign.combat.isActive;
    updateCampaign(currentCampaign.id, {
      combat: {
        ...currentCampaign.combat,
        isActive: isStarting,
        round: isStarting ? 1 : currentCampaign.combat.round,
        turnIndex: 0,
      }
    });
  };

  const nextTurn = () => {
    if (!currentCampaign || !currentCampaign.combat.isActive) return;
    const combat = currentCampaign.combat;
    const orderLength = combat.order.length;
    if (orderLength === 0) return;

    let nextIndex = combat.turnIndex + 1;
    let nextRound = combat.round;

    if (nextIndex >= orderLength) {
      nextIndex = 0;
      nextRound += 1;
    }

    updateCampaign(currentCampaign.id, {
      combat: {
        ...combat,
        round: nextRound,
        turnIndex: nextIndex,
      }
    });
  };

  const setInitiativeOrder = (order: InitiativeItem[]) => {
    if (!currentCampaign) return;
    updateCampaign(currentCampaign.id, {
      combat: {
        ...currentCampaign.combat,
        order,
      }
    });
  };

  const updateCivilCounter = (rescuedDelta: number, casualtiesDelta: number) => {
    if (!currentCampaign || !currentCampaign.civilCounter) return;
    const cur = currentCampaign.civilCounter;
    updateCampaign(currentCampaign.id, {
      civilCounter: {
        ...cur,
        rescued: Math.max(0, cur.rescued + rescuedDelta),
        casualties: Math.max(0, cur.casualties + casualtiesDelta),
      }
    });
  };

  const exportDataJSON = () => {
    const data = {
      campaigns,
      characters,
      campaignCharacterStates,
      weapons,
      gifts,
      creatures,
      version: '1.0.0',
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.campaigns) setCampaigns(parsed.campaigns);
      if (parsed.characters) setCharacters(parsed.characters);
      if (parsed.campaignCharacterStates) setCampaignCharacterStates(parsed.campaignCharacterStates);
      if (parsed.weapons) setWeapons(parsed.weapons);
      if (parsed.gifts) setGifts(parsed.gifts);
      if (parsed.creatures) setCreatures(parsed.creatures);
      broadcastEvent('FULL_SYNC', null);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefaults = () => {
    setCharacters(PREMADE_CHARACTERS);
    setWeapons(OFFICIAL_WEAPONS);
    setGifts(OFFICIAL_GIFTS);
    setCreatures(OFFICIAL_BESTIARY);
  };

  return (
    <LimiarContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        setUserName,
        campaigns,
        currentCampaign,
        currentCampaignId,
        setCurrentCampaignId,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        joinCampaign,
        selectCharacterForCampaign,
        characters,
        activeCharacter,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        getCampaignCharacterState,
        updateCampaignCharacterState,
        weapons,
        createWeapon,
        updateWeapon,
        deleteWeapon,
        gifts,
        createGift,
        updateGift,
        deleteGift,
        creatures,
        createCreature,
        updateCreature,
        deleteCreature,
        rollHistory,
        visibleRollHistory,
        makeRoll,
        clearRollHistory,
        setRiftClockHours,
        advanceRiftClock,
        toggleCombat,
        nextTurn,
        setInitiativeOrder,
        updateCivilCounter,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
      }}
    >
      {children}
    </LimiarContext.Provider>
  );
};

export const useLimiar = () => {
  const context = useContext(LimiarContext);
  if (!context) {
    throw new Error('useLimiar deve ser usado dentro de um LimiarProvider');
  }
  return context;
};
