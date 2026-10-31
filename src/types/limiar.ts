// ==========================================
// LIMIAR RPG - SISTEMA OFICIAL DE TIPOS
// ==========================================

export type AttributeKey = 'FOR' | 'AGI' | 'INT' | 'VIG' | 'PRE';

export type TrainingDegree = 'destreinado' | 'treinado' | 'veterano' | 'expert';

export const TRAINING_BONUS: Record<TrainingDegree, number> = {
  destreinado: 0,
  treinado: 5,
  veterano: 10,
  expert: 15,
};

export type ContagionStage = 'latente' | 'aflorado' | 'ressonante' | 'limiar' | 'consumido';

export type DamageType = 
  | 'contundente'
  | 'cortante'
  | 'perfurante'
  | 'balistico'
  | 'fogo'
  | 'eletrico'
  | 'sonoro'
  | 'psiquico'
  | 'acido'
  | 'forca'
  | 'fendido';

export type WeaponProperty =
  | 'leve'
  | 'uma_mao'
  | 'duas_maos'
  | 'haste'
  | 'arremesso'
  | 'silenciosa'
  | 'automatica'
  | 'pesada'
  | 'precisa'
  | 'versatil'
  | 'perfurante'
  | 'contundente'
  | 'cortante'
  | 'fendida';

export type RequisitionType = 'I' | 'II' | 'III' | 'IV' | 'V' | '—';

export type WeaponProficiency = 'simples' | 'tatica' | 'pesada' | 'fendida';

export type Rarity = 'comum' | 'incomum' | 'rara' | 'epica' | 'lendaria';

export type WeaponCategory =
  | 'desarmado'
  | 'leve'
  | 'uma_mao'
  | 'duas_maos'
  | 'haste'
  | 'improvisada'
  | 'pistola'
  | 'revolver'
  | 'submetralhadora'
  | 'espingarda'
  | 'rifle'
  | 'arma_pesada'
  | 'arco_besta'
  | 'nao_letal'
  | 'fendida'
  | 'personalizada';

export interface Weapon {
  id: string;
  name: string;
  baseWeapon?: string; // e.g. "Facão tático", "Rifle", "Pistola"
  category: WeaponCategory;
  weaponProficiency: WeaponProficiency; // simples, tatica, pesada, fendida
  isTacticalLight?: boolean; // Tática Leve (L) - Operador tem proficiência
  damageDice: string; // e.g. "1d8", "2d6", "1d10"
  damageType: DamageType;
  range: string; // "Adjacente", "3 m", "Curto", "Médio", "Longo", "Extremo", "Cone 9 m"
  magCapacity?: number; // Pente
  spaces: number; // Carga em espaços (1, 2, 3, 4)
  requisitionType: RequisitionType;
  properties: WeaponProperty[];
  rarity?: Rarity; // Comum, Incomum, Rara, Épica, Lendária
  riftEffects?: string[]; // Efeitos de Fenda (Cap. 74)
  riftFlaw?: string; // Defeito de Fenda (d10)
  contagionCostPerScene?: number; // 1% a 5% se fendida
  description?: string;
  lore?: string; // História e notas do Capítulo 79 e 85
  modifications?: string[]; // Modificações instaladas (Capítulo 76)
  ammoType?: string; // Comum, Perfurante, Expansiva, etc.
  isHomebrew?: boolean;
}

export interface Armor {
  id: string;
  name: string;
  category: 'leve' | 'media' | 'pesada' | 'escudo';
  defenseBonus: number; // +1, +2, +3, +4
  rd: string; // e.g. "2 balístico e perfurante", "3 balístico; 1 outros"
  notes: string;
  spaces: number;
  requisitionType: RequisitionType;
  contagionCostPerScene?: number;
  isFendida?: boolean;
  rarity?: Rarity;
  effects?: string[];
  modifications?: string[];
  isHomebrew?: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'kit' | 'selo' | 'contagio' | 'comunicacao' | 'mobilidade' | 'explosivo' | 'foco' | 'veiculo' | 'artefato' | 'faccao' | 'municao' | 'modificacao';
  effect: string;
  spaces: number;
  requisitionType: RequisitionType;
  dt?: number;
  costOrRisk?: string;
  lore?: string;
  isHomebrew?: boolean;
}

export type Affinity = 'carne' | 'eco' | 'brasa' | 'vazio' | 'veu' | 'anomalo' | 'custom';

export interface Gift {
  id: string;
  name: string;
  affinity: Affinity;
  minLevel: number;
  domainLevel: 1 | 2 | 3 | 4;
  baseEffect: string;
  action: 'Padrão' | 'Movimento' | 'Completa' | 'Reação' | 'Livre';
  range: 'Pessoal' | 'Toque' | 'Curto' | 'Médio' | 'Longo' | 'Extremo';
  targetArea: string; // e.g. "1 alvo", "cone 9 m", "esfera 6 m"
  duration: 'Instantânea' | '3 rodadas' | 'Uma cena' | 'Uma hora' | 'Concentração';
  enhancements: string[];
  limiters: string[];
  peCost: number;
  extraContagion?: number; // % extra por uso
  signature: string; // Como o Dom se manifesta visualmente/sonoramente
  description: string;
  isHomebrew?: boolean;
}

export interface SkillDefinition {
  name: string;
  attribute: AttributeKey;
  trainedOnly: boolean; // (T)
  armorPenalty: boolean; // (A)
  description: string;
  isHomebrew?: boolean;
}

export interface OriginDefinition {
  id: string;
  name: string;
  fixedSkills: string[];
  originPowerName: string;
  originPowerDescription: string;
  suggestedFlaw: string;
  description: string;
  isHomebrew?: boolean;
}

export interface ClassTrack {
  id: string;
  name: string;
  description: string;
  abilities: Array<{
    level: number;
    name: string;
    description: string;
  }>;
}

export interface ClassDefinition {
  id: string;
  name: string;
  basePV: number;
  pvPerLevel: number;
  basePE: number;
  pePerLevel: number;
  baseMEN: number;
  menPerLevel: number;
  trainedSkillsText: string;
  fixedSkills: string[];
  skillsToChooseCount: number;
  proficiencies: string;
  division: string;
  tracks: ClassTrack[];
  classAbilities: Array<{
    level: number;
    name: string;
    description: string;
  }>;
  isHomebrew?: boolean;
}

export interface Trauma {
  id: string;
  trigger: string;
  effect: string;
  relief: string;
}

export interface Character {
  id: string;
  ownerId: string; // ID do usuário que criou o personagem
  name: string;
  nickname?: string;
  concept: string; // "Um(a) ___ que ___ e que tem medo de ___"
  originId: string;
  classId: string;
  trackId: string;
  level: number;
  rank: 'Calouro' | 'Cadete' | 'Agente' | 'Veterano' | 'Sentinela';
  attributes: Record<AttributeKey, number>;
  skills: Record<string, TrainingDegree>;
  bond: string; // Vínculo
  flaw: string; // Falha
  traumas: Trauma[];
  merit: number; // Mérito
  meritDebt?: number; // Dívida de Mérito (Cap. 78)
  isPublic: boolean; // Permite que outros jogadores da mesma campanha vejam a ficha
  equippedWeaponIds: string[];
  equippedArmorId?: string; // Armadura vestida
  equippedShieldId?: string; // Escudo empunhado
  residueCargas?: { g1: number; g2: number; g3: number; g4: number; g5: number }; // Cargas de Resíduo por Grau (Cap. 73)
  inventory: Array<{ id: string; name: string; spaces: number; notes?: string }>;
  knownGiftIds: string[];
  notes?: string;
  appearance?: string;
  lastActDraft?: string; // Frase pensada para o Último Ato
  createdAt: string;
}

export interface ContagionEvent {
  timestamp: string;
  change: number; // ex: +2, -1
  reason: string;
  currentValue: number;
}

// OS VALORES DE STATUS (PV, PE, CONTÁGIO, CONDIÇÕES) SÃO SALVOS POR CAMPANHA
export interface CampaignCharacterState {
  characterId: string;
  campaignId: string;
  currentPV: number;
  currentPE: number;
  currentMEN: number;
  tempPV: number;
  contagion: number; // 0 a 100%
  peakContagion: number; // maior valor já atingido (para calcular Piso)
  floorContagion: number; // Piso = metade do pico
  determination: number; // PD: normalmente 3
  conditions: string[]; // ex: ['Abalado', 'Sangrando']
  dyingState: {
    successes: number; // 3 estabilizam
    failures: number; // 3 matam
  };
  ammoByWeaponId: Record<string, number>;
  contagionHistory: ContagionEvent[];
  lastActExecuted?: string; // Se atingiu 100% Consumido
  isConsumido: boolean;
  notesInCampaign?: string;
}

export type ClockPhase = 'Silêncio' | 'Gotejamento' | 'Maré' | 'Contagem final' | 'Ruptura';

export interface RiftClock {
  hours: number; // 0 a 48+
  phase: ClockPhase;
  pressure: number; // 0, 1, 2, 3, 5
  breachDegree: number; // 1 a 5
  breachName: string; // Fresta, Rasgo, Brecha, Abismo, Colapso
  activeLayers: string[];
}

export interface CreatureAttack {
  name: string;
  attackBonus: number;
  damageFormula: string;
  damageType: DamageType;
  range?: string;
  contagionOnHit?: number;
  saveDC?: number;
  saveType?: 'Fortitude' | 'Reflexos' | 'Vontade';
  effectDescription?: string;
}

export interface Creature {
  id: string;
  campaignId?: string; // pode ser global do bestiário ou de uma campanha
  name: string;
  type: 'Rastejante' | 'Caçador' | 'Bruto' | 'Elite' | 'Chefe' | 'Horda' | 'Consumido' | 'Humano' | 'Outro';
  degree: number; // 1 a 5
  pv: number;
  currentPv: number;
  defense: number;
  rdAlheia: number;
  speed: string; // ex: "9 m", "12 m"
  resistances: {
    fortitude: number;
    reflexos: number;
    vontade: number;
  };
  attacks: CreatureAttack[];
  traits: string[];
  powers: Array<{ name: string; description: string; dc?: number }>;
  isChief?: boolean;
  chiefPhase?: 1 | 2 | 3;
  hordaBaseGrau?: number;
  consumidoOriginalName?: string;
  consumidoLastAct?: string;
  description: string;
}

export interface InitiativeItem {
  id: string; // characterId or creatureId
  name: string;
  initiative: number;
  isCreature: boolean;
  currentPV: number;
  maxPV: number;
  conditions: string[];
}

export interface Campaign {
  id: string;
  code: string; // código curto para entrar na mesa (ex: "LM-8921")
  name: string;
  description: string;
  gmId: string;
  gmName: string;
  players: Array<{
    userId: string;
    userName: string;
    characterId?: string;
  }>;
  riftClock: RiftClock;
  combat: {
    isActive: boolean;
    round: number;
    turnIndex: number;
    order: InitiativeItem[];
  };
  civilCounter?: {
    total: number;
    rescued: number;
    casualties: number;
  };
  createdAt: string;
}

export interface RollResult {
  id: string;
  campaignId: string;
  senderId: string;
  senderName: string;
  senderRole: 'mestre' | 'jogador';
  isPrivate: boolean; // Rolagem oculta do Mestre
  title: string;
  subtitle?: string;
  attributeKey?: AttributeKey;
  attributeValue: number;
  bonusDice: number;
  penaltyDice: number;
  rolls: number[];
  keptDie: number;
  trainingBonus: number;
  extraModifier: number;
  total: number;
  dc?: number;
  isSuccess?: boolean;
  isHighlight: boolean; // Destaque (20 mantido)
  isDisaster: boolean; // Desastre (todos 1)
  isFullSuccess: boolean; // Total >= DC + 10
  damageRoll?: {
    formula: string;
    rolls: number[];
    bonus: number;
    total: number;
    type: DamageType;
    isDoubleFromHighlight?: boolean;
  };
  extraEffect?: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  rolePreference: 'mestre' | 'jogador';
}
