import React, { useState } from 'react';
import {
  Character,
  AttributeKey,
  TrainingDegree,
  TRAINING_BONUS,
  Weapon,
  Gift,
} from '../types/limiar';
import { useLimiar } from '../context/LimiarContext';
import {
  calculateAgentStats,
  rollWeaponDamage,
  rollLimiarCheck,
  getRandomInt,
  playDiceSound,
} from '../utils/limiarRules';
import {
  OFFICIAL_SKILLS,
  OFFICIAL_CLASSES,
  OFFICIAL_ORIGINS,
  CONDITIONS_LIST,
} from '../data/limiarDatabase';
import { AferidorDisplay } from './AferidorDisplay';
import { DiceRollModal } from './DiceRollModal';
import {
  Dices,
  Shield,
  Zap,
  Brain,
  Heart,
  Activity,
  Crosshair,
  Flame,
  Swords,
  Sparkles,
  Package,
  BookOpen,
  User,
  Eye,
  EyeOff,
  AlertOctagon,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Feather,
  Info,
} from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
  isReadOnly?: boolean;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  character,
  isReadOnly = false,
}) => {
  const {
    currentCampaign,
    getCampaignCharacterState,
    updateCampaignCharacterState,
    updateCharacter,
    weapons,
    gifts,
    makeRoll,
    currentUser,
  } = useLimiar();

  const [activeTab, setActiveTab] = useState<'atributos' | 'combate' | 'dons' | 'bio'>('atributos');

  // Estado da rolagem no modal
  const [modalRollParams, setModalRollParams] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    attributeKey?: AttributeKey;
    attributeValue: number;
    trainingBonus: number;
    initialDC?: number;
  }>({
    isOpen: false,
    title: '',
    attributeValue: 1,
    trainingBonus: 0,
  });

  const campaignId = currentCampaign?.id || 'default';
  const campaignState = getCampaignCharacterState(campaignId, character.id);
  const stats = calculateAgentStats(character, campaignState);

  const originDef = OFFICIAL_ORIGINS.find((o) => o.id === character.originId);
  const classDef = OFFICIAL_CLASSES.find((c) => c.id === character.classId);
  const trackDef = classDef?.tracks.find((t) => t.id === character.trackId);

  // Armas equipadas
  const equippedWeapons = weapons.filter((w) => character.equippedWeaponIds.includes(w.id));
  // Dons conhecidos
  const knownGifts = gifts.filter((g) => character.knownGiftIds.includes(g.id));

  // Abertura de rolagem modal para Atributo ou Perícia
  const openRollModal = (
    title: string,
    attributeKey: AttributeKey,
    trainingBonus: number = 0,
    subtitle?: string,
    dc?: number
  ) => {
    setModalRollParams({
      isOpen: true,
      title,
      subtitle,
      attributeKey,
      attributeValue: character.attributes[attributeKey],
      trainingBonus,
      initialDC: dc,
    });
  };

  // Rolagem de Ataque com Arma
  const handleWeaponAttack = (weapon: Weapon) => {
    const isMelee = ['desarmado', 'corpo_a_corpo_leve', 'uma_mao', 'duas_maos', 'haste'].includes(weapon.category);
    const skillName = isMelee ? 'Luta' : 'Pontaria';
    const attrKey: AttributeKey = isMelee ? 'FOR' : 'AGI';
    const trainingDegree = character.skills[skillName] || 'destreinado';
    const trainingBonus = TRAINING_BONUS[trainingDegree] || 0;

    openRollModal(
      `Ataque com ${weapon.name}`,
      attrKey,
      trainingBonus,
      `Teste de ${skillName} contra a Defesa do alvo`
    );
  };

  // Rolagem de Dano da Arma
  const handleWeaponDamageRoll = (weapon: Weapon) => {
    const damageRes = rollWeaponDamage(weapon, character);
    playDiceSound();

    makeRoll({
      title: `Dano: ${weapon.name}`,
      subtitle: `${weapon.damageDice} (${weapon.damageType})`,
      attributeValue: 1,
      trainingBonus: 0,
      extraModifier: 0,
      damageRoll: damageRes,
      isPrivate: false,
    });
  };

  // Ativação de Dom
  const handleActivateGift = (gift: Gift) => {
    if (campaignState.currentPE < gift.peCost) {
      alert(`PE insuficiente! Este Dom custa ${gift.peCost} PE, mas você tem apenas ${campaignState.currentPE} PE.`);
      return;
    }

    // Deduz PE
    updateCampaignCharacterState(campaignId, character.id, {
      currentPE: Math.max(0, campaignState.currentPE - gift.peCost),
    });

    playDiceSound();

    // Rola ativação do Dom
    makeRoll({
      title: `Ativação de Dom: ${gift.name}`,
      subtitle: `${gift.affinity.toUpperCase()} · ${gift.action} · Custo: ${gift.peCost} PE (DT de Resistência: ${stats.domDT})`,
      attributeValue: character.attributes.PRE,
      trainingBonus: 0,
      extraModifier: 0,
      extraEffect: `${gift.baseEffect} | Assinatura: "${gift.signature}"`,
      isPrivate: false,
    });
  };

  // Manipular PV
  const modifyPV = (delta: number) => {
    if (isReadOnly) return;
    const newPV = Math.max(0, Math.min(stats.maxPV, campaignState.currentPV + delta));
    updateCampaignCharacterState(campaignId, character.id, { currentPV: newPV });
  };

  // Manipular PE
  const modifyPE = (delta: number) => {
    if (isReadOnly) return;
    const newPE = Math.max(0, Math.min(stats.maxPE, campaignState.currentPE + delta));
    updateCampaignCharacterState(campaignId, character.id, { currentPE: newPE });
  };

  // Manipular MEN
  const modifyMEN = (delta: number) => {
    if (isReadOnly) return;
    const newMEN = Math.max(0, Math.min(stats.maxMEN, campaignState.currentMEN + delta));
    updateCampaignCharacterState(campaignId, character.id, { currentMEN: newMEN });
  };

  // Manipular Determinação (PD)
  const modifyPD = (delta: number) => {
    if (isReadOnly) return;
    const newPD = Math.max(0, Math.min(5, campaignState.determination + delta));
    updateCampaignCharacterState(campaignId, character.id, { determination: newPD });
  };

  // Teste de Morrendo
  const handleDyingCheck = () => {
    const fortBonus = TRAINING_BONUS[character.skills['Fortitude'] || 'destreinado'] || 0;
    const roll = rollLimiarCheck({
      attributeKey: 'VIG',
      attributeValue: character.attributes.VIG,
      trainingBonus: fortBonus,
      dc: 15,
    });

    const isSuccess = roll.isSuccess || roll.isHighlight;
    const newSucc = isSuccess ? campaignState.dyingState.successes + 1 : campaignState.dyingState.successes;
    const newFail = !isSuccess ? campaignState.dyingState.failures + 1 : campaignState.dyingState.failures;

    updateCampaignCharacterState(campaignId, character.id, {
      dyingState: { successes: newSucc, failures: newFail },
      currentPV: newSucc >= 3 ? 1 : campaignState.currentPV,
    });

    makeRoll({
      title: 'Teste de Morrendo (Fortitude DT 15)',
      subtitle: isSuccess
        ? `Sucesso de estabilização! (${newSucc}/3 sucessos)`
        : `Falha! (${newFail}/3 falhas - 3 falhas causam morte)`,
      attributeKey: 'VIG',
      attributeValue: character.attributes.VIG,
      trainingBonus: fortBonus,
      dc: 15,
      isPrivate: false,
    });
  };

  // Alternar Condição
  const toggleCondition = (condName: string) => {
    if (isReadOnly) return;
    const has = campaignState.conditions.includes(condName);
    const newConditions = has
      ? campaignState.conditions.filter((c) => c !== condName)
      : [...campaignState.conditions, condName];
    updateCampaignCharacterState(campaignId, character.id, { conditions: newConditions });
  };

  return (
    <div className="space-y-6">
      {/* Banner se estiver visualizando como Somente Leitura */}
      {isReadOnly && (
        <div className="bg-amber-950/60 border border-amber-600/60 text-amber-200 px-4 py-2.5 rounded-lg text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>
              <strong>Modo de Visualização:</strong> Você está visualizando a ficha pública de{' '}
              <strong>{character.name}</strong>. Apenas o proprietário e o Mestre podem editá-la.
            </span>
          </div>
        </div>
      )}

      {/* CABEÇALHO DO AGENTE - ESTILO DOSSIÊ DA ACADEMIA MERIDIANO */}
      <div className="bg-gradient-to-r from-limiar-900 via-limiar-850 to-limiar-900 border border-limiar-700/80 rounded-xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-limiar-cyan/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-slate-100 tracking-wide">
                {character.name}
              </h1>
              {character.nickname && (
                <span className="text-sm font-mono text-limiar-cyan bg-limiar-cyan/10 px-2 py-0.5 rounded border border-limiar-cyan/30">
                  "{character.nickname}"
                </span>
              )}
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-limiar-800 text-slate-300 border border-limiar-700">
                {character.rank.toUpperCase()} · NÍVEL {character.level}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-limiar-850 text-amber-400 border border-amber-500/30">
                {character.merit} MÉRITO
              </span>
            </div>

            <p className="text-xs text-slate-300 italic font-sans max-w-2xl">
              "{character.concept}"
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-1">
              <span>
                Origem: <strong className="text-slate-200">{originDef?.name || character.originId}</strong>
              </span>
              <span>•</span>
              <span>
                Classe: <strong className="text-slate-200">{classDef?.name || character.classId}</strong>
              </span>
              <span>•</span>
              <span>
                Trilha: <strong className="text-cyan-400">{trackDef?.name || character.trackId}</strong>
              </span>
              <span>•</span>
              <span>
                Divisão: <strong className="text-slate-200">{classDef?.division || 'Meridiano'}</strong>
              </span>
            </div>
          </div>

          {/* Privacy Switch & Ações de Cabeçalho */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2">
            {!isReadOnly && (
              <button
                onClick={() => updateCharacter(character.id, { isPublic: !character.isPublic })}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono flex items-center gap-1.5 transition ${
                  character.isPublic
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-limiar-850 border-limiar-700 text-slate-400'
                }`}
                title="Fichas públicas podem ser visualizadas pelos outros jogadores da campanha."
              >
                {character.isPublic ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                {character.isPublic ? 'Ficha Pública na Mesa' : 'Ficha Privada'}
              </button>
            )}

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">DT dos Dons:</span>
              <span className="bg-limiar-800 px-2 py-0.5 rounded text-cyan-400 font-bold border border-limiar-700">
                DT {stats.domDT}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* O AFERIDOR OFICIAL DE PULSO */}
      <AferidorDisplay
        character={character}
        campaignState={campaignState}
        isEditable={!isReadOnly}
      />

      {/* BARRA DE VITAIS (PV, PE, MEN, DEF, DESL, PD) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* PONTOS DE VIDA (PV) */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-rose-400 font-display font-bold">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" /> PONTOS DE VIDA
            </span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="font-mono text-2xl font-black text-rose-400">
              {campaignState.currentPV}
            </span>
            <span className="text-xs font-mono text-slate-500">
              / {stats.maxPV} {campaignState.tempPV > 0 && `(+${campaignState.tempPV})`}
            </span>
          </div>
          {!isReadOnly && (
            <div className="flex gap-1 pt-1 border-t border-limiar-800">
              <button
                onClick={() => modifyPV(-5)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-rose-950 text-rose-300 rounded text-[11px] font-mono"
              >
                -5
              </button>
              <button
                onClick={() => modifyPV(-1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-rose-950 text-rose-300 rounded text-[11px] font-mono"
              >
                -1
              </button>
              <button
                onClick={() => modifyPV(1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-emerald-950 text-emerald-300 rounded text-[11px] font-mono"
              >
                +1
              </button>
              <button
                onClick={() => modifyPV(5)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-emerald-950 text-emerald-300 rounded text-[11px] font-mono"
              >
                +5
              </button>
            </div>
          )}
        </div>

        {/* PONTOS DE ENERGIA (PE) */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-amber-400 font-display font-bold">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> ENERGIA (PE)
            </span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="font-mono text-2xl font-black text-amber-400">
              {campaignState.currentPE}
            </span>
            <span className="text-xs font-mono text-slate-500">/ {stats.maxPE}</span>
          </div>
          {!isReadOnly && (
            <div className="flex gap-1 pt-1 border-t border-limiar-800">
              <button
                onClick={() => modifyPE(-2)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-amber-950 text-amber-300 rounded text-[11px] font-mono"
              >
                -2
              </button>
              <button
                onClick={() => modifyPE(-1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-amber-950 text-amber-300 rounded text-[11px] font-mono"
              >
                -1
              </button>
              <button
                onClick={() => modifyPE(1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-amber-900 text-amber-300 rounded text-[11px] font-mono"
              >
                +1
              </button>
            </div>
          )}
        </div>

        {/* MENTE (MEN) */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-display font-bold">
            <span className="flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" /> MENTE (SANIDADE)
            </span>
          </div>
          <div className="my-1.5 flex items-baseline justify-between">
            <span className="font-mono text-2xl font-black text-cyan-400">
              {campaignState.currentMEN}
            </span>
            <span className="text-xs font-mono text-slate-500">/ {stats.maxMEN}</span>
          </div>
          {!isReadOnly && (
            <div className="flex gap-1 pt-1 border-t border-limiar-800">
              <button
                onClick={() => modifyMEN(-2)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-cyan-950 text-cyan-300 rounded text-[11px] font-mono"
              >
                -2
              </button>
              <button
                onClick={() => modifyMEN(-1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-cyan-950 text-cyan-300 rounded text-[11px] font-mono"
              >
                -1
              </button>
              <button
                onClick={() => modifyMEN(1)}
                className="flex-1 py-0.5 bg-limiar-800 hover:bg-cyan-900 text-cyan-300 rounded text-[11px] font-mono"
              >
                +1
              </button>
            </div>
          )}
        </div>

        {/* DEFESA & DESLOCAMENTO */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-display font-bold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-slate-300" /> DEFESA & DESLOC.
          </div>
          <div className="my-1.5 flex items-baseline justify-around">
            <div className="text-center">
              <span className="text-[10px] text-slate-500 block font-mono">DEFESA</span>
              <span className="font-mono text-xl font-bold text-slate-200">{stats.defense}</span>
            </div>
            <div className="h-6 w-px bg-limiar-800" />
            <div className="text-center">
              <span className="text-[10px] text-slate-500 block font-mono">DESL.</span>
              <span className="font-mono text-xl font-bold text-slate-200">{stats.speed}m</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-center font-mono pt-1 border-t border-limiar-800">
            6 quadrados (1,5m)
          </div>
        </div>

        {/* CARGA */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="text-xs text-slate-400 font-display font-bold flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-slate-300" /> CARGA
          </div>
          <div className="my-1.5 text-center">
            <span className="font-mono text-xl font-bold text-slate-200">
              {character.inventory.reduce((a, b) => a + (b.spaces || 0), 0) +
                equippedWeapons.reduce((a, b) => a + (b.spaces || 0), 0)}
            </span>
            <span className="text-xs font-mono text-slate-500"> / {stats.capacity} esp</span>
          </div>
          <div className="text-[10px] text-slate-400 text-center font-mono pt-1 border-t border-limiar-800">
            5 + 5×FOR
          </div>
        </div>

        {/* PONTOS DE DETERMINAÇÃO (PD) */}
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3 shadow-sm flex flex-col justify-between">
          <div className="text-xs text-amber-400 font-display font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> DETERMINAÇÃO
          </div>
          <div className="my-1.5 flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((point) => (
              <div
                key={point}
                onClick={() => !isReadOnly && modifyPD(point <= campaignState.determination ? -1 : 1)}
                className={`w-4 h-4 rounded-full cursor-pointer transition ${
                  point <= campaignState.determination
                    ? 'bg-amber-400 shadow-glow-amber scale-110'
                    : 'bg-limiar-800 border border-limiar-700'
                }`}
                title={`PD ${point} (Clique para gastar/recuperar)`}
              />
            ))}
          </div>
          <div className="text-[10px] text-slate-400 text-center font-mono pt-1 border-t border-limiar-800">
            1 PD: Refazer dado / -5 dano
          </div>
        </div>
      </div>

      {/* ALERTA DE MORRENDO (SE PV == 0) */}
      {campaignState.currentPV === 0 && (
        <div className="bg-rose-950/80 border-2 border-rose-600 rounded-xl p-4 shadow-glow-red animate-pulse">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center">
                <AlertOctagon className="w-6 h-6 animate-spin" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-rose-200">
                  AGENTE EM ESTADO MORRENDO (PV 0)
                </h3>
                <p className="text-xs text-rose-300">
                  Faça um teste de Fortitude DT 15 no início do seu turno. 3 sucessos estabilizam; 3 falhas causam morte permanente.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-mono">
                <span className="text-emerald-400 font-bold">Sucessos: {campaignState.dyingState.successes}/3</span>
                <span className="mx-2">•</span>
                <span className="text-rose-400 font-bold">Falhas: {campaignState.dyingState.failures}/3</span>
              </div>
              {!isReadOnly && (
                <button
                  onClick={handleDyingCheck}
                  className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition"
                >
                  <Dices className="w-4 h-4" /> TESTAR FORTITUDE (DT 15)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONDIÇÕES ATIVAS (Badges com toggle) */}
      <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-limiar-cyan" /> CONDIÇÕES ATIVAS
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Clique para aplicar ou remover</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS_LIST.map((cond) => {
            const isActive = campaignState.conditions.includes(cond.name);
            return (
              <button
                key={cond.name}
                type="button"
                disabled={isReadOnly}
                onClick={() => toggleCondition(cond.name)}
                title={cond.effect}
                className={`text-xs px-2.5 py-1 rounded-md font-mono transition border ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : 'bg-limiar-850 text-slate-400 border-limiar-800 hover:bg-limiar-800 hover:text-slate-200'
                }`}
              >
                {cond.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ABAS DA FICHA */}
      <div className="border-b border-limiar-800 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('atributos')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'atributos'
              ? 'border-limiar-red text-slate-100 bg-limiar-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Dices className="w-4 h-4 text-limiar-red" /> ATRIBUTOS & PERÍCIAS
        </button>
        <button
          onClick={() => setActiveTab('combate')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'combate'
              ? 'border-limiar-red text-slate-100 bg-limiar-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Swords className="w-4 h-4 text-amber-400" /> ARMAS & COMBATE
        </button>
        <button
          onClick={() => setActiveTab('dons')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'dons'
              ? 'border-limiar-red text-slate-100 bg-limiar-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" /> DONS DO DESPERTO ({knownGifts.length})
        </button>
        <button
          onClick={() => setActiveTab('bio')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'bio'
              ? 'border-limiar-red text-slate-100 bg-limiar-900/50'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-slate-400" /> DOSSIÊ & BIOGRAFIA
        </button>
      </div>

      {/* CONTEÚDO DA ABA 1: ATRIBUTOS & PERÍCIAS */}
      {activeTab === 'atributos' && (
        <div className="space-y-6">
          {/* OS 5 ATRIBUTOS COM BOTÃO DE DADO 🎲 EM CADA */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(['FOR', 'AGI', 'INT', 'VIG', 'PRE'] as AttributeKey[]).map((attrKey) => {
              const val = character.attributes[attrKey];
              const attrNames: Record<AttributeKey, string> = {
                FOR: 'FORÇA',
                AGI: 'AGILIDADE',
                INT: 'INTELECTO',
                VIG: 'VIGOR',
                PRE: 'PRESENÇA',
              };

              return (
                <div
                  key={attrKey}
                  className="bg-limiar-900 border border-limiar-700/80 rounded-xl p-3 text-center shadow-sm relative group hover:border-limiar-amber transition"
                >
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    {attrNames[attrKey]}
                  </span>
                  <div className="font-mono text-3xl font-black text-slate-100 mb-2">
                    {val}
                  </div>

                  {/* Botão de Rolagem Rápida com Ícone de Dado 🎲 */}
                  <button
                    onClick={() =>
                      openRollModal(
                        `Teste de ${attrNames[attrKey]}`,
                        attrKey,
                        0,
                        `Rolagem pura do atributo ${attrKey}`
                      )
                    }
                    className="w-full py-1 px-2 bg-limiar-800 hover:bg-limiar-red text-white text-xs font-mono font-bold rounded flex items-center justify-center gap-1.5 transition shadow-sm"
                    title={`Rolar ${val}d20 de ${attrNames[attrKey]}`}
                  >
                    <Dices className="w-3.5 h-3.5 text-limiar-amber" /> Rolar 🎲
                  </button>
                </div>
              );
            })}
          </div>

          {/* TABELA DE PERÍCIAS OFICIAIS COM BOTÃO DE DADO 🎲 EM CADA UMA */}
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-limiar-800">
              <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
                <Dices className="w-4 h-4 text-limiar-red" /> PERÍCIAS (28 OFICIAIS)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Treinado: <span className="text-amber-400">+5</span> · Veterano: <span className="text-amber-400">+10</span> · Expert: <span className="text-amber-400">+15</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {OFFICIAL_SKILLS.map((skill) => {
                const degree: TrainingDegree = character.skills[skill.name] || 'destreinado';
                const bonus = TRAINING_BONUS[degree];
                const attrVal = character.attributes[skill.attribute];

                return (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 bg-limiar-850 hover:bg-limiar-800 border border-limiar-800 rounded-lg transition text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-medium text-slate-200">
                        <span>{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({skill.attribute})
                        </span>
                        {skill.trainedOnly && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-limiar-800 text-amber-400 font-mono" title="Somente Treinada">
                            T
                          </span>
                        )}
                        {skill.armorPenalty && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-limiar-800 text-rose-400 font-mono" title="Penalidade de Armadura">
                            A
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono capitalize">
                        {degree} (<strong className="text-amber-400">+{bonus}</strong>)
                      </div>
                    </div>

                    {/* Botão de dado para rolagem imediata */}
                    <button
                      onClick={() =>
                        openRollModal(
                          `Perícia: ${skill.name}`,
                          skill.attribute,
                          bonus,
                          `${skill.description}`
                        )
                      }
                      className="p-1.5 bg-limiar-800 hover:bg-limiar-red text-slate-200 hover:text-white rounded transition flex items-center gap-1 font-mono text-xs font-semibold shadow-sm"
                      title={`Rolar teste de ${skill.name} (${attrVal}d20 + ${bonus})`}
                    >
                      <Dices className="w-3.5 h-3.5 text-limiar-amber" />
                      <span>+{bonus}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: ARMAS & COMBATE */}
      {activeTab === 'combate' && (
        <div className="space-y-6">
          {/* Armas Equipadas */}
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-limiar-800">
              <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-400" /> ARMAS EQUIPADAS
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {equippedWeapons.length} armas no coldre / empunhadas
              </span>
            </div>

            {equippedWeapons.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                Nenhuma arma equipada no momento. Acesse o Compêndio de Armas para equipar.
              </p>
            ) : (
              <div className="space-y-3">
                {equippedWeapons.map((wp) => {
                  const currentAmmo = campaignState.ammoByWeaponId[wp.id] ?? wp.magCapacity ?? 0;

                  return (
                    <div
                      key={wp.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        wp.properties.includes('fendida')
                          ? 'bg-purple-950/20 border-purple-500/40'
                          : 'bg-limiar-850 border-limiar-700/70'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-slate-100">{wp.name}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-limiar-800 text-slate-300 uppercase">
                            {wp.category.replace(/_/g, ' ')}
                          </span>
                          {wp.contagionCostPerScene ? (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/50">
                              +{wp.contagionCostPerScene}% Contágio/cena
                            </span>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-400 font-mono">
                          <span>Dano: <strong className="text-rose-400">{wp.damageDice}</strong> ({wp.damageType})</span>
                          <span>•</span>
                          <span>Alcance: <strong className="text-slate-200">{wp.range}</strong></span>
                          <span>•</span>
                          <span>Espaços: <strong className="text-slate-200">{wp.spaces}</strong></span>
                        </div>

                        {wp.properties.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {wp.properties.map((prop) => (
                              <span key={prop} className="text-[9px] px-1 rounded bg-limiar-800 text-slate-400 font-mono">
                                {prop}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Botões de Ação da Arma: Ataque 🎲 & Dano 🎲 */}
                      <div className="flex items-center gap-2">
                        {wp.magCapacity && (
                          <div className="text-xs font-mono mr-2">
                            <span className="text-slate-400">Pente: </span>
                            <span className="text-amber-400 font-bold">{currentAmmo}</span>
                            <span className="text-slate-500">/{wp.magCapacity}</span>
                          </div>
                        )}

                        <button
                          onClick={() => handleWeaponAttack(wp)}
                          className="px-3 py-1.5 bg-limiar-800 hover:bg-limiar-red text-white text-xs font-display font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                          title="Fazer teste de ataque contra a Defesa"
                        >
                          <Crosshair className="w-3.5 h-3.5 text-limiar-cyan" /> Acerto 🎲
                        </button>

                        <button
                          onClick={() => handleWeaponDamageRoll(wp)}
                          className="px-3 py-1.5 bg-rose-900/80 hover:bg-rose-800 text-rose-100 text-xs font-display font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                          title="Rolar o dano desta arma"
                        >
                          <Dices className="w-3.5 h-3.5 text-amber-300" /> Dano 🎲
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Manobras & Ações Táticas Rápidas de Combate */}
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4">
            <h3 className="font-display font-bold text-base text-slate-100 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" /> AÇÕES & REAÇÕES TÁTICAS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <button
                onClick={() =>
                  openRollModal(
                    'Reação: Esquivar',
                    'AGI',
                    TRAINING_BONUS[character.skills['Reflexos'] || 'destreinado'],
                    'Teste de Reflexos substitui sua Defesa contra o ataque'
                  )
                }
                className="p-2.5 bg-limiar-850 hover:bg-limiar-800 border border-limiar-700/60 rounded-lg text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-200">Esquivar 🎲</div>
                  <div className="text-[10px] text-slate-400">Reflexos substitui Defesa</div>
                </div>
                <Dices className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() =>
                  makeRoll({
                    title: 'Reação: Bloquear com Arma/Escudo',
                    subtitle: `Reduz dano sofrido em 5 + FOR (${5 + character.attributes.FOR})`,
                    attributeValue: 1,
                    trainingBonus: 0,
                    extraModifier: 0,
                    extraEffect: `Dano reduzido em ${5 + character.attributes.FOR} pontos.`,
                    isPrivate: false,
                  })
                }
                className="p-2.5 bg-limiar-850 hover:bg-limiar-800 border border-limiar-700/60 rounded-lg text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-200">Bloquear</div>
                  <div className="text-[10px] text-slate-400">Reduz dano em {5 + character.attributes.FOR}</div>
                </div>
                <Shield className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() =>
                  openRollModal(
                    'Primeiros Socorros',
                    'INT',
                    TRAINING_BONUS[character.skills['Medicina'] || 'destreinado'],
                    'Medicina DT 15: recupera 1d6 + INT em PV de um aliado',
                    15
                  )
                }
                className="p-2.5 bg-limiar-850 hover:bg-limiar-800 border border-limiar-700/60 rounded-lg text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-200">Primeiros Socorros 🎲</div>
                  <div className="text-[10px] text-slate-400">Medicina DT 15 (1d6+INT)</div>
                </div>
                <Heart className="w-4 h-4 text-rose-400" />
              </button>

              <button
                onClick={() => {
                  const roll = getRandomInt(1, 6);
                  const heal = roll + character.attributes.VIG + Math.floor(character.level / 2);
                  modifyPV(heal);
                  makeRoll({
                    title: 'Descanso: Respiro (10 minutos)',
                    subtitle: '1x por cena: encerra Abalado e Enjoado',
                    attributeValue: 1,
                    trainingBonus: 0,
                    extraModifier: 0,
                    extraEffect: `Recuperou ${heal} PV (1d6 [${roll}] + VIG ${character.attributes.VIG} + nv/2). Condições Abalado e Enjoado removidas.`,
                    isPrivate: false,
                  });
                }}
                className="p-2.5 bg-limiar-850 hover:bg-limiar-800 border border-limiar-700/60 rounded-lg text-left transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-200">Respiro (10 min)</div>
                  <div className="text-[10px] text-slate-400">Cura 1d6+VIG+nv/2</div>
                </div>
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 3: DONS DO DESPERTO */}
      {activeTab === 'dons' && (
        <div className="space-y-6">
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-limiar-800">
              <div>
                <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> REPERTÓRIO DE DONS
                </h3>
                <p className="text-xs text-slate-400">
                  Dons Livres máximos: <strong className="text-slate-200">{2 + character.attributes.PRE}</strong> · DT de Resistência: <strong className="text-cyan-400">DT {stats.domDT}</strong>
                </p>
              </div>

              <div className="text-xs text-slate-400 font-mono bg-limiar-850 px-3 py-1.5 rounded-lg border border-limiar-700">
                Ressonância: 1% de Contágio a cada 5 PE gastos na cena
              </div>
            </div>

            {knownGifts.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30 text-cyan-400" />
                <p className="text-xs">Este agente não possui Dons vinculados no momento.</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Se for um Desperto, adicione ou crie dons pelo Compêndio.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {knownGifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="p-3.5 bg-limiar-850 border border-limiar-700/80 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-cyan-500/50 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-slate-100">{gift.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
                          {gift.affinity}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                          {gift.peCost} PE
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {gift.action} · {gift.range} · {gift.targetArea}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300">{gift.baseEffect}</p>

                      <p className="text-[11px] text-slate-400 italic">
                        Assinatura: "{gift.signature}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleActivateGift(gift)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-display font-bold text-xs rounded-lg shadow-glow-cyan flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" /> ATIVAR DOM 🎲
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 4: BIOGRAFIA & CONEXÕES */}
      {activeTab === 'bio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vínculo & Falha */}
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4 space-y-3">
            <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2 border-b border-limiar-800 pb-2">
              <User className="w-4 h-4 text-limiar-amber" /> VÍNCULO & FALHA
            </h3>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold text-emerald-400">VÍNCULO (ÂNCORA EMOCIONAL):</span>
                {!isReadOnly && (
                  <button
                    onClick={() => {
                      modifyPD(1);
                      makeRoll({
                        title: 'Cena do Vínculo Acionada',
                        subtitle: `${character.bond} — Agente ganha +1 PD e remove uma condição de medo.`,
                        attributeValue: 1,
                        trainingBonus: 0,
                        extraModifier: 0,
                        isPrivate: false,
                      });
                    }}
                    className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900 font-mono"
                  >
                    +1 PD & -Medo
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-300 bg-limiar-850 p-2.5 rounded border border-limiar-800">
                {character.bond}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold text-rose-400">FALHA (FRAQUEZA):</span>
                {!isReadOnly && (
                  <button
                    onClick={() => {
                      modifyPD(1);
                      makeRoll({
                        title: 'Falha Interpretada com Custo',
                        subtitle: `${character.flaw} — Agente recebe +1 Ponto de Determinação.`,
                        attributeValue: 1,
                        trainingBonus: 0,
                        extraModifier: 0,
                        isPrivate: false,
                      });
                    }}
                    className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 font-mono"
                  >
                    +1 PD por Falha
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-300 bg-limiar-850 p-2.5 rounded border border-limiar-800">
                {character.flaw}
              </p>
            </div>
          </div>

          {/* Origem e Poder */}
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4 space-y-3">
            <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2 border-b border-limiar-800 pb-2">
              <Feather className="w-4 h-4 text-cyan-400" /> PODER DE ORIGEM
            </h3>

            {originDef && (
              <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-cyan-300">{originDef.originPowerName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{originDef.name}</span>
                </div>
                <p className="text-xs text-slate-300">{originDef.originPowerDescription}</p>
              </div>
            )}

            {/* Habilidades de Classe */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-mono font-semibold text-slate-400">HABILIDADES DE CLASSE ({classDef?.name}):</span>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {classDef?.classAbilities
                  .filter((ab) => ab.level <= character.level)
                  .map((ab) => (
                    <div key={ab.name} className="p-2 bg-limiar-850 rounded border border-limiar-800 text-xs">
                      <strong className="text-slate-200">{ab.name} (Nv {ab.level}):</strong>{' '}
                      <span className="text-slate-400">{ab.description}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Histórico do Aferidor / Registro de Contágio */}
          <div className="md:col-span-2 bg-limiar-900 border border-limiar-800 rounded-xl p-4 space-y-3">
            <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2 border-b border-limiar-800 pb-2">
              <Activity className="w-4 h-4 text-limiar-red" /> REGISTRO DE CONTÁGIO (AFERIDOR)
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs">
              {campaignState.contagionHistory.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-limiar-850 rounded border border-limiar-800"
                >
                  <span className="text-slate-400 text-[11px]">{entry.timestamp}</span>
                  <span className="text-slate-300 flex-1 px-3">{entry.reason}</span>
                  <span
                    className={`font-bold ${
                      entry.change > 0 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {entry.change > 0 ? `+${entry.change}%` : `${entry.change}%`}
                  </span>
                  <span className="text-slate-400 text-[11px] pl-3">
                    Total: <strong>{entry.currentValue}%</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ROLAGEM COM DADO 🎲 */}
      <DiceRollModal
        isOpen={modalRollParams.isOpen}
        onClose={() => setModalRollParams({ ...modalRollParams, isOpen: false })}
        title={modalRollParams.title}
        subtitle={modalRollParams.subtitle}
        attributeKey={modalRollParams.attributeKey}
        attributeValue={modalRollParams.attributeValue}
        trainingBonus={modalRollParams.trainingBonus}
        initialDC={modalRollParams.initialDC}
      />
    </div>
  );
};
