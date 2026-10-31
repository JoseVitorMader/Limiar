import {
  Character,
  CampaignCharacterState,
  ContagionStage,
  Weapon,
  DamageType,
  RiftClock,
  ClockPhase,
  AttributeKey,
} from '../types/limiar';
import { OFFICIAL_CLASSES, OFFICIAL_ARMORS } from '../data/limiarDatabase';

// ==========================================
// ROLAGEM DE DADOS E TESTES MECÂNICOS
// ==========================================

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollD20(): number {
  return getRandomInt(1, 20);
}

export interface LimiarCheckParams {
  attributeKey?: AttributeKey;
  attributeValue: number;
  trainingBonus: number; // 0, 5, 10, 15
  bonusDice?: number; // 0, 1, 2
  penaltyDice?: number; // 0, 1, 2
  extraModifier?: number; // +2 de item, etc.
  dc?: number; // DT
  isEagleEye?: boolean; // Olho de Águia (19-20 Destaque)
  forceHighlight?: boolean; // Forçar Destaque (ex: Último Ato)
}

export interface LimiarCheckResult {
  attributeValue: number;
  dicePool: number;
  rolls: number[];
  keptDie: number;
  trainingBonus: number;
  extraModifier: number;
  total: number;
  dc?: number;
  isHighlight: boolean; // Destaque
  isDisaster: boolean; // Desastre
  isSuccess?: boolean;
  isFullSuccess: boolean; // Sucesso Pleno
  margin?: number;
}

export function rollLimiarCheck(params: LimiarCheckParams): LimiarCheckResult {
  const {
    attributeValue,
    trainingBonus,
    bonusDice = 0,
    penaltyDice = 0,
    extraModifier = 0,
    dc,
  } = params;

  // Modificadores de dados se cancelam mutuamente, máximo +-2
  const netDice = Math.max(-2, Math.min(2, bonusDice - penaltyDice));

  let rolls: number[] = [];
  let keptDie: number = 0;
  let isAttributeZeroOrDepleted = attributeValue === 0 || (attributeValue + netDice <= 0);

  if (params.forceHighlight) {
    rolls = [20];
    keptDie = 20;
  } else if (isAttributeZeroOrDepleted) {
    // REGRA DO ATRIBUTO 0: Rola 2d20 e fica com o MENOR resultado!
    const d1 = rollD20();
    const d2 = rollD20();
    rolls = [d1, d2];
    keptDie = Math.min(d1, d2);
  } else {
    // Reserva de dados normal: Atributo + netDice (mínimo 1)
    const count = Math.max(1, attributeValue + netDice);
    for (let i = 0; i < count; i++) {
      rolls.push(rollD20());
    }
    // Fica com o MAIOR resultado
    keptDie = Math.max(...rolls);
  }

  // Destaque: dado mantido 20 (ou 19-20 com talento Olho de Águia)
  const highlightThreshold = params.isEagleEye ? 19 : 20;
  const isHighlight = Boolean(params.forceHighlight || keptDie >= highlightThreshold);

  // Desastre: TODOS os dados da reserva mostram 1!
  const isDisaster = !params.forceHighlight && rolls.length > 0 && rolls.every((r) => r === 1);

  const total = keptDie + trainingBonus + extraModifier;

  let isSuccess: boolean | undefined = undefined;
  let isFullSuccess = false;
  let margin: number | undefined = undefined;

  if (dc !== undefined) {
    margin = total - dc;
    if (isHighlight && dc < 35) {
      isSuccess = true;
    } else if (isDisaster) {
      isSuccess = false;
    } else {
      isSuccess = total >= dc;
    }

    if (isSuccess && margin >= 10) {
      isFullSuccess = true;
    }
  }

  return {
    attributeValue,
    dicePool: rolls.length,
    rolls,
    keptDie,
    trainingBonus,
    extraModifier,
    total,
    dc,
    isHighlight,
    isDisaster,
    isSuccess,
    isFullSuccess,
    margin,
  };
}

// ==========================================
// ROLAGEM DE DANO DE ARMAS E DONS
// ==========================================

export interface DamageRollResult {
  formula: string;
  rolls: number[];
  bonus: number;
  total: number;
  type: DamageType;
  isDoubleFromHighlight?: boolean;
}

export function parseDiceFormula(formula: string): { count: number; faces: number; fixedBonus: number } {
  // Regex para "2d6+3", "1d10", "1d8", "3d8-1"
  const clean = formula.replace(/\s+/g, '');
  const match = clean.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    return { count: 1, faces: 6, fixedBonus: 0 };
  }
  const count = parseInt(match[1], 10);
  const faces = parseInt(match[2], 10);
  const fixedBonus = match[3] ? parseInt(match[3], 10) : 0;
  return { count, faces, fixedBonus };
}

export function rollWeaponDamage(
  weapon: Weapon,
  character: Character,
  isHighlight: boolean = false,
  isFullSuccess: boolean = false,
  extraBonusDice: string[] = [], // ex: ['1d8'] do Golpe Decisivo ou Ataque Furtivo
  extraFixedBonus: number = 0
): DamageRollResult {
  const parsed = parseDiceFormula(weapon.damageDice);
  let totalDiceCount = parsed.count;

  // Destaque: os dados de dano da arma são rolados duas vezes!
  if (isHighlight) {
    totalDiceCount = parsed.count * 2;
  }

  // Sucesso Pleno: o dano ganha +1 dado do mesmo tipo da arma (não duplicado por destaque)
  if (isFullSuccess && !isHighlight) {
    totalDiceCount += 1;
  }

  const rolls: number[] = [];
  for (let i = 0; i < totalDiceCount; i++) {
    rolls.push(getRandomInt(1, parsed.faces));
  }

  // Processa dados extras (Golpe Decisivo, Ataque Furtivo)
  for (const extra of extraBonusDice) {
    const pExtra = parseDiceFormula(extra);
    const countToRoll = isHighlight ? pExtra.count * 2 : pExtra.count;
    for (let j = 0; j < countToRoll; j++) {
      rolls.push(getRandomInt(1, pExtra.faces));
    }
  }

  // Bônus de Força para armas corpo a corpo
  let attrBonus = 0;
  const isMelee = [
    'desarmado',
    'corpo_a_corpo_leve',
    'uma_mao',
    'duas_maos',
    'haste',
  ].includes(weapon.category);

  if (isMelee) {
    attrBonus = character.attributes.FOR;
  } else if (weapon.properties.includes('arremesso')) {
    attrBonus = Math.floor(character.attributes.FOR / 2);
  }

  const totalBonus = parsed.fixedBonus + attrBonus + extraFixedBonus;
  const sumOfDice = rolls.reduce((acc, val) => acc + val, 0);
  const total = Math.max(1, sumOfDice + totalBonus);

  return {
    formula: `${totalDiceCount}d${parsed.faces}${totalBonus ? (totalBonus > 0 ? `+${totalBonus}` : `${totalBonus}`) : ''}`,
    rolls,
    bonus: totalBonus,
    total,
    type: weapon.damageType,
    isDoubleFromHighlight: isHighlight,
  };
}

// ==========================================
// CÁLCULOS DO CONTÁGIO E ESTÁGIOS
// ==========================================

export interface ContagionStageInfo {
  stage: ContagionStage;
  label: string;
  rangeText: string;
  colorClass: string;
  badgeBg: string;
  borderColor: string;
  benefits: string;
  costs: string;
  description: string;
  aferidorBeepPattern: 'none' | 'short' | 'double' | 'long' | 'continuous' | 'critical';
}

export function getContagionStageInfo(percentage: number): ContagionStageInfo {
  const p = Math.max(0, Math.min(100, Math.round(percentage)));

  if (p < 25) {
    return {
      stage: 'latente',
      label: 'Latente',
      rangeText: '0–24%',
      colorClass: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      borderColor: 'border-emerald-500/30',
      benefits: 'Nenhum benefício anômalo mecânico.',
      costs: 'Nenhum custo mecânico. Sonhos nítidos, sensação de observação.',
      description: 'O agente aparenta normalidade. O Aferidor registra contaminação inicial controlada.',
      aferidorBeepPattern: 'none',
    };
  }

  if (p < 50) {
    return {
      stage: 'aflorado',
      label: 'Aflorado',
      rangeText: '25–49%',
      colorClass: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      borderColor: 'border-cyan-500/40',
      benefits: '+1 dado bônus em Percepção; PE máximo +2.',
      costs: 'Hipersensibilidade: -1 dado em testes de Vontade contra efeitos de som ou luz intensa.',
      description: 'Sentidos aguçados, veias discretamente escuras nos pulsos, pupilas dilatadas.',
      aferidorBeepPattern: 'short',
    };
  }

  if (p < 75) {
    return {
      stage: 'ressonante',
      label: 'Ressonante',
      rangeText: '50–74%',
      colorClass: 'text-amber-400',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      borderColor: 'border-amber-500/50',
      benefits: '+1 dado em Iniciativa e Reflexos; +2 de dano em todos os ataques; RD 1 geral; PE máximo +5.',
      costs: 'Mente máxima reduzida em 10%; -1 dado em Diplomacia e Enganação com civis; Impulsos quando Mente <= 50%.',
      description: 'Corpo acelerado, brilho nos olhos no escuro. Avaliação obrigatória na Âncora.',
      aferidorBeepPattern: 'double',
    };
  }

  if (p < 100) {
    return {
      stage: 'limiar',
      label: 'Limiar',
      rangeText: '75–99%',
      colorClass: 'text-red-400',
      badgeBg: 'bg-red-950/80 text-red-300 border-red-500/60 shadow-glow-red animate-pulse',
      borderColor: 'border-red-500/80',
      benefits: '+1 dado em todos os ataques; RD 3; regenera 2 PV por turno (acima de 0 PV); PE máx +10; Dons custam -1 PE.',
      costs: 'Mente máx -25%; todo ganho de Contágio +1%; -1 dado em Vontade; Testes de Controle sob estresse (DT 15 + 1 p/ cada 5% acima de 75).',
      description: 'No limite da humanidade. O outro lado sussurra sem parar. Pele com fissuras luminosas. A partir de 90%, alarme contínuo.',
      aferidorBeepPattern: p >= 90 ? 'continuous' : 'long',
    };
  }

  return {
    stage: 'consumido',
    label: 'CONSUMIDO',
    rangeText: '100%',
    colorClass: 'text-purple-400',
    badgeBg: 'bg-purple-950 text-purple-200 border-purple-500 shadow-lg shadow-purple-900/60 animate-bounce',
    borderColor: 'border-purple-600',
    benefits: 'Transformação monstruosa! Dobro dos PV, Defesa +5, RD 5, ataques contagiantes.',
    costs: 'Perda de controle total do personagem. A ficha passa ao Mestre! Liberado o Último Ato.',
    description: 'A barreira se rompeu. O agente não existe mais como ser humano.',
    aferidorBeepPattern: 'critical',
  };
}

// ==========================================
// CÁLCULO DE STATUS MÁXIMOS DO AGENTE
// ==========================================

export interface CalculatedStats {
  maxPV: number;
  maxPE: number;
  maxMEN: number;
  rawMEN: number;
  defense: number;
  speed: number;
  capacity: number;
  domDT: number;
  controlDT: number;
  contagionStage: ContagionStageInfo;
  contagionFloor: number;
}

export function calculateAgentStats(
  character: Character,
  campaignState?: CampaignCharacterState
): CalculatedStats {
  const cls = OFFICIAL_CLASSES.find((c) => c.id === character.classId) || OFFICIAL_CLASSES[0];
  const level = character.level || 1;
  const vig = character.attributes.VIG || 1;
  const pre = character.attributes.PRE || 1;
  const agi = character.attributes.AGI || 1;
  const forAttr = character.attributes.FOR || 1;

  // PV Máximo: PV Inicial (base + VIG) + (Nível - 1) * (ganho + VIG)
  const basePV = cls.basePV + vig;
  const perLevelPV = cls.pvPerLevel + vig;
  const maxPV = basePV + (level - 1) * perLevelPV;

  // Contágio e Estágio
  const contagionVal = campaignState ? campaignState.contagion : 0;
  const stageInfo = getContagionStageInfo(contagionVal);

  // PE Máximo: Base PE + PRE + ganho por nível + bônus de Contágio
  const basePE = cls.basePE + pre;
  const perLevelPE = cls.pePerLevel + pre;
  let contagionPEBonus = 0;
  if (stageInfo.stage === 'aflorado') contagionPEBonus = 2;
  else if (stageInfo.stage === 'ressonante') contagionPEBonus = 5;
  else if (stageInfo.stage === 'limiar') contagionPEBonus = 10;
  const maxPE = basePE + (level - 1) * perLevelPE + contagionPEBonus;

  // MEN Máximo: Base MEN + ganho por nível
  const rawMEN = cls.baseMEN + (level - 1) * cls.menPerLevel;
  let maxMEN = rawMEN;
  if (stageInfo.stage === 'ressonante') {
    maxMEN = Math.floor(rawMEN * 0.9); // -10%
  } else if (stageInfo.stage === 'limiar') {
    maxMEN = Math.floor(rawMEN * 0.75); // -25%
  }

  // Defesa: 10 + AGI + Bônus de Armadura + Bônus de Escudo (Capítulo 72)
  let armorDefense = 0;
  let shieldDefense = 0;
  if (character.equippedArmorId) {
    const foundArmor = OFFICIAL_ARMORS.find((a) => a.id === character.equippedArmorId);
    if (foundArmor) armorDefense = foundArmor.defenseBonus;
  }
  if (character.equippedShieldId) {
    const foundShield = OFFICIAL_ARMORS.find((a) => a.id === character.equippedShieldId);
    if (foundShield) shieldDefense = foundShield.defenseBonus;
  }
  const defense = 10 + agi + armorDefense + shieldDefense;

  // Deslocamento: 9 m padrão
  let speed = 9;
  if (campaignState?.conditions.includes('Lento') || campaignState?.conditions.includes('Exausto')) {
    speed = Math.floor(speed / 2);
  }
  if (campaignState?.conditions.includes('Imóvel') || campaignState?.conditions.includes('Agarrado')) {
    speed = 0;
  }

  // Carga: 5 + 5 * FOR (mínimo 5). Operador com Mochila Cheia ganha +5
  let capacity = Math.max(5, 5 + 5 * forAttr);
  if (character.classId === 'operador') {
    capacity += 5;
  }

  // DT dos Dons: 10 + PRE + metade do nível (arredondado para baixo)
  const domDT = 10 + pre + Math.floor(level / 2);

  // DT do Teste de Controle no Limiar: 15 + 1 para cada 5% de Contágio acima de 75
  const excessAbove75 = Math.max(0, contagionVal - 75);
  const controlDT = 15 + Math.floor(excessAbove75 / 5);

  // Piso do Contágio: metade do maior valor de Contágio que o agente já atingiu
  const peak = campaignState ? Math.max(campaignState.peakContagion || 0, contagionVal) : contagionVal;
  const contagionFloor = Math.floor(peak / 2);

  return {
    maxPV,
    maxPE,
    maxMEN,
    rawMEN,
    defense,
    speed,
    capacity,
    domDT,
    controlDT,
    contagionStage: stageInfo,
    contagionFloor,
  };
}

// ==========================================
// RELÓGIO DE 48 HORAS DA FENDA
// ==========================================

export function calculateRiftClockInfo(hours: number): RiftClock {
  const h = Math.max(0, hours);
  let phase: ClockPhase = 'Silêncio';
  let pressure = 0;

  if (h <= 6) {
    phase = 'Silêncio';
    pressure = 0;
  } else if (h <= 24) {
    phase = 'Gotejamento';
    pressure = 1;
  } else if (h <= 36) {
    phase = 'Maré';
    pressure = 2;
  } else if (h <= 48) {
    phase = 'Contagem final';
    pressure = 3;
  } else {
    phase = 'Ruptura';
    pressure = 5;
  }

  return {
    hours: h,
    phase,
    pressure,
    breachDegree: h > 48 ? 4 : h > 24 ? 3 : 2,
    breachName: h > 48 ? 'Ruptura Ativa' : h > 36 ? 'Brecha Crítica' : 'Rasgo Estável',
    activeLayers: [],
  };
}

// ==========================================
// SONS DO SISTEMA VIA WEB AUDIO API
// ==========================================
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDiceSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Som sintético mecânico de dados rolando
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch {
    // Ignora se áudio estiver desativado no navegador
  }
}

export function playAferidorBeep(type: 'short' | 'double' | 'alert' | 'rift'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'short') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'double') {
      [0, 0.15].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046, now + offset);
        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    } else if (type === 'alert') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.linearRampToValueAtTime(720, now + 0.25);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'rift') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.4);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {
    // Silencia erros de áudio
  }
}
