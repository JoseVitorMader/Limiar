import React, { useState } from 'react';
import {
  Character,
  AttributeKey,
  TrainingDegree,
  TRAINING_BONUS,
} from '../types/limiar';
import { useLimiar } from '../context/LimiarContext';
import {
  OFFICIAL_CLASSES,
  OFFICIAL_ORIGINS,
  OFFICIAL_SKILLS,
  BONDS_TABLE,
  FLAWS_TABLE,
} from '../data/limiarDatabase';
import { getRandomInt } from '../utils/limiarRules';
import {
  UserPlus,
  Dices,
  Shield,
  Zap,
  Brain,
  Heart,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Sparkles,
  Info,
} from 'lucide-react';

interface CharacterCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (character: Character) => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const { createCharacter, currentCampaign, selectCharacterForCampaign } = useLimiar();

  // Etapa do criador (1: Conceito, 2: Atributos, 3: Origem & Classe, 4: Perícias, 5: Vínculo & Detalhes)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [concept, setConcept] = useState('');

  // Atributos (Base 1, 4 pontos extras)
  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>({
    FOR: 1,
    AGI: 1,
    INT: 1,
    VIG: 1,
    PRE: 1,
  });
  const [hasReducedToZero, setHasReducedToZero] = useState(false);

  // Origem e Classe
  const [originId, setOriginId] = useState<string>('atleta_descartado');
  const [isHomebrewOrigin, setIsHomebrewOrigin] = useState(false);
  const [customOriginName, setCustomOriginName] = useState('');
  const [customOriginPower, setCustomOriginPower] = useState('');

  const [classId, setClassId] = useState<string>('vanguarda');
  const [trackId, setTrackId] = useState<string>('muralha');

  // Perícias
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Atletismo', 'Fortitude', 'Luta']);

  // Vínculo & Falha
  const [bond, setBond] = useState('Um colega de turma, a única pessoa em quem você confia.');
  const [flaw, setFlaw] = useState('Impulsividade: age antes de pensar.');
  const [lastActDraft, setLastActDraft] = useState('Não deixem que me levem.');
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  // Cálculo de pontos de atributos gastos
  // Começam em 1. Total padrão de pontos adicionais = 4 (+1 se reduziu um a zero).
  const totalBasePoints = Object.values(attributes).reduce((a, b) => a + b, 0);
  const maxAllowedPoints = 5 + 4 + (hasReducedToZero ? 1 : 0);
  const pointsRemaining = maxAllowedPoints - totalBasePoints;

  // Arquétipos pré-definidos do Capítulo 9
  const applyArchetype = (arch: { FOR: number; AGI: number; INT: number; VIG: number; PRE: number }) => {
    setAttributes(arch);
    setHasReducedToZero(Object.values(arch).some((v) => v === 0));
  };

  const handleAttributeChange = (key: AttributeKey, delta: number) => {
    const current = attributes[key];
    const target = current + delta;

    if (target < 0 || target > 3) return; // Máx 3 na criação

    if (target === 0) {
      if (hasReducedToZero && current !== 0) return; // Só pode 1 atributo em zero
      setHasReducedToZero(true);
    } else if (current === 0 && target > 0) {
      setHasReducedToZero(false);
    }

    if (delta > 0 && pointsRemaining <= 0) return;

    setAttributes((prev) => ({ ...prev, [key]: target }));
  };

  // Alternar perícia
  const toggleSkill = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  // Rolar Vínculo e Falha
  const rollBond = () => {
    const roll = getRandomInt(1, 10);
    const item = BONDS_TABLE.find((b) => b.roll === roll);
    if (item) setBond(item.text);
  };

  const rollFlaw = () => {
    const roll = getRandomInt(1, 10);
    const item = FLAWS_TABLE.find((f) => f.roll === roll);
    if (item) setFlaw(item.text);
  };

  const handleFinish = () => {
    if (!name.trim()) {
      alert('Por favor, informe o nome do seu agente.');
      setStep(1);
      return;
    }

    const skillsMap: Record<string, TrainingDegree> = {};
    selectedSkills.forEach((s) => {
      skillsMap[s] = 'treinado';
    });

    const newChar = createCharacter({
      name,
      nickname,
      concept: concept || 'Um agente novato buscando respostas diante das Fendas.',
      originId: isHomebrewOrigin ? customOriginName : originId,
      classId,
      trackId,
      level: 1,
      rank: 'Calouro',
      attributes,
      skills: skillsMap,
      bond,
      flaw,
      isPublic,
      lastActDraft,
    });

    // Se estiver em uma campanha, associa este personagem
    if (currentCampaign) {
      selectCharacterForCampaign(currentCampaign.id, newChar.id);
    }

    onCreated(newChar);
    onClose();
  };

  const currentClassObj = OFFICIAL_CLASSES.find((c) => c.id === classId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-limiar-900 border-2 border-limiar-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
        {/* Cabeçalho do Modal */}
        <div className="p-4 border-b border-limiar-800 bg-limiar-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-limiar-red/20 border border-limiar-red/40 flex items-center justify-center text-limiar-red">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-100 tracking-wide">
                ALISTAMENTO · ACADEMIA MERIDIANO
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Etapa {step} de 5: {step === 1 ? 'Conceito' : step === 2 ? 'Atributos' : step === 3 ? 'Origem & Classe' : step === 4 ? 'Perícias' : 'Vínculos & Falhas'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-limiar-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Criador */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* ETAPA 1: CONCEITO */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">NOME DO AGENTE *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Rafaela Soares, Gabriel Prado..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-limiar-red"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">APELIDO OU CODINOME DE COMBATE</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Ex: Muralha, Sombra, Brasa..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-limiar-red"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  CONCEITO EM UMA FRASE (Capítulo 15)
                </label>
                <textarea
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  rows={3}
                  placeholder='Ex: "Um ex-lutador clandestino que busca salvar os amigos e que tem medo de perder a sanidade."'
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-limiar-red"
                />
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  Estrutura sugerida: "Um(a) [o que era] que [o que busca] e que tem medo de [seu pavor]."
                </p>
              </div>
            </div>
          )}

          {/* ETAPA 2: ATRIBUTOS */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between bg-limiar-850 p-3 rounded-lg border border-limiar-800">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Pontos para distribuir:</span>
                  <div className="font-mono text-2xl font-black text-amber-400">
                    {pointsRemaining} <span className="text-xs font-normal text-slate-400">pontos restantes</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  Base 1 cada · Máx 3 na criação
                  <br />
                  <span className="text-cyan-400">Pode reduzir 1 para 0 (+1 ponto extra)</span>
                </div>
              </div>

              {/* Botões dos 5 Atributos */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {(['FOR', 'AGI', 'INT', 'VIG', 'PRE'] as AttributeKey[]).map((key) => {
                  const val = attributes[key];
                  const labels: Record<AttributeKey, string> = {
                    FOR: 'Força (Luta/Dano)',
                    AGI: 'Agilidade (Def/Inic)',
                    INT: 'Intelecto (Perícias)',
                    VIG: 'Vigor (PV/Fortitude)',
                    PRE: 'Presença (PE/Dons)',
                  };

                  return (
                    <div
                      key={key}
                      className="bg-limiar-850 border border-limiar-700/80 rounded-xl p-3 text-center space-y-2"
                    >
                      <span className="text-xs font-mono font-bold text-slate-300 block">{key}</span>
                      <div className="text-[10px] text-slate-400 h-6 leading-tight">{labels[key]}</div>
                      <div className="font-mono text-3xl font-black text-slate-100">{val}</div>

                      <div className="flex gap-1 justify-center">
                        <button
                          type="button"
                          onClick={() => handleAttributeChange(key, -1)}
                          disabled={val <= 0}
                          className="w-7 h-7 bg-limiar-800 hover:bg-limiar-700 disabled:opacity-30 rounded font-mono font-bold text-slate-200"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAttributeChange(key, 1)}
                          disabled={val >= 3 || pointsRemaining <= 0}
                          className="w-7 h-7 bg-limiar-800 hover:bg-limiar-red disabled:opacity-30 rounded font-mono font-bold text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Arquétipos Prontos */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  OU SELECIONE UM ARQUÉTIPO RÁPIDO DO LIVRO:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { name: 'Muralha', arch: { FOR: 3, AGI: 1, INT: 1, VIG: 3, PRE: 1 } },
                    { name: 'Sombra', arch: { FOR: 1, AGI: 3, INT: 2, VIG: 1, PRE: 2 } },
                    { name: 'Cérebro', arch: { FOR: 1, AGI: 1, INT: 3, VIG: 1, PRE: 3 } },
                    { name: 'Guardião', arch: { FOR: 2, AGI: 2, INT: 1, VIG: 3, PRE: 1 } },
                    { name: 'Voz', arch: { FOR: 1, AGI: 2, INT: 2, VIG: 1, PRE: 3 } },
                    { name: 'Lâmina', arch: { FOR: 3, AGI: 3, INT: 1, VIG: 1, PRE: 1 } },
                  ].map((a) => (
                    <button
                      key={a.name}
                      type="button"
                      onClick={() => applyArchetype(a.arch)}
                      className="p-2 bg-limiar-850 hover:bg-limiar-800 border border-limiar-800 rounded text-left transition"
                    >
                      <strong className="text-amber-400">{a.name}:</strong>{' '}
                      <span className="text-slate-400">
                        {a.arch.FOR}/{a.arch.AGI}/{a.arch.INT}/{a.arch.VIG}/{a.arch.PRE}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 3: ORIGEM & CLASSE */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Escolha da Origem */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-slate-300">
                    ESCOLHA SUA ORIGEM (OU CRIE HOMEBREW)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsHomebrewOrigin(!isHomebrewOrigin)}
                    className="text-xs text-amber-400 underline font-mono"
                  >
                    {isHomebrewOrigin ? 'Usar Origem Oficial' : '+ Origem Homebrew'}
                  </button>
                </div>

                {!isHomebrewOrigin ? (
                  <select
                    value={originId}
                    onChange={(e) => setOriginId(e.target.value)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-limiar-red"
                  >
                    {OFFICIAL_ORIGINS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} (Perícias: {o.fixedSkills.join(', ')}) — Poder: {o.originPowerName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2 bg-limiar-850 p-3 rounded-lg border border-limiar-700">
                    <input
                      type="text"
                      value={customOriginName}
                      onChange={(e) => setCustomOriginName(e.target.value)}
                      placeholder="Nome da sua Origem Homebrew"
                      className="w-full bg-limiar-900 border border-limiar-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                    />
                    <input
                      type="text"
                      value={customOriginPower}
                      onChange={(e) => setCustomOriginPower(e.target.value)}
                      placeholder="Poder de Origem (efeito situacional)"
                      className="w-full bg-limiar-900 border border-limiar-700 rounded px-2.5 py-1.5 text-xs text-slate-100"
                    />
                  </div>
                )}
              </div>

              {/* Escolha da Classe */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-300 block">
                  ESCOLHA SUA CLASSE OFICIAL
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {OFFICIAL_CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => {
                        setClassId(cls.id);
                        setTrackId(cls.tracks[0]?.id || '');
                      }}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                        classId === cls.id
                          ? 'bg-limiar-red/20 border-limiar-red text-white shadow-glow-red'
                          : 'bg-limiar-850 border-limiar-800 text-slate-400 hover:bg-limiar-800'
                      }`}
                    >
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-100">{cls.name}</h4>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          PV {cls.basePV}+VIG · PE {cls.basePE}+PRE · MEN {cls.baseMEN}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 mt-2 block">
                        Divisão: {cls.division}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Escolha da Trilha */}
                {currentClassObj && (
                  <div className="pt-2">
                    <label className="text-xs font-mono text-slate-300 block mb-1.5">
                      TRILHA / AFINIDADE DA CLASSE:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentClassObj.tracks.map((tr) => (
                        <button
                          key={tr.id}
                          type="button"
                          onClick={() => setTrackId(tr.id)}
                          className={`p-2 rounded-lg border text-left transition text-xs font-mono ${
                            trackId === tr.id
                              ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                              : 'bg-limiar-850 border-limiar-800 text-slate-400 hover:bg-limiar-800'
                          }`}
                        >
                          <div className="font-bold text-slate-200">{tr.name.replace('Trilha: ', '').replace('Afinidade: ', '')}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ETAPA 4: PERÍCIAS */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-mono">Perícias Treinadas Selecionadas:</span>
                  <div className="font-bold font-mono text-cyan-400 text-sm">
                    {selectedSkills.length} perícias
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs text-right">
                  Recebe 2 da origem + fixas da classe + à escolha + 1 extra por ponto de INT ({attributes.INT}).
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
                {OFFICIAL_SKILLS.map((sk) => {
                  const isChecked = selectedSkills.includes(sk.name);
                  return (
                    <button
                      key={sk.name}
                      type="button"
                      onClick={() => toggleSkill(sk.name)}
                      className={`p-2 rounded-lg border text-left transition flex items-center justify-between text-xs font-mono ${
                        isChecked
                          ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-sm'
                          : 'bg-limiar-850 border-limiar-800 text-slate-400 hover:bg-limiar-800'
                      }`}
                    >
                      <span>
                        {sk.name} <span className="text-[10px] opacity-60">({sk.attribute})</span>
                      </span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ETAPA 5: VÍNCULOS, FALHAS & ÚLTIMO ATO */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono text-emerald-400 font-semibold">
                    VÍNCULO (ÂNCORA EMOCIONAL)
                  </label>
                  <button
                    type="button"
                    onClick={rollBond}
                    className="text-xs text-slate-400 hover:text-emerald-300 font-mono flex items-center gap-1"
                  >
                    <Dices className="w-3.5 h-3.5" /> Rolar 1d10
                  </button>
                </div>
                <input
                  type="text"
                  value={bond}
                  onChange={(e) => setBond(e.target.value)}
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono text-rose-400 font-semibold">
                    FALHA (FRAQUEZA QUE DÁ DETERMINAÇÃO)
                  </label>
                  <button
                    type="button"
                    onClick={rollFlaw}
                    className="text-xs text-slate-400 hover:text-rose-300 font-mono flex items-center gap-1"
                  >
                    <Dices className="w-3.5 h-3.5" /> Rolar 1d10
                  </button>
                </div>
                <input
                  type="text"
                  value={flaw}
                  onChange={(e) => setFlaw(e.target.value)}
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-purple-400 mb-1 font-semibold">
                  ÚLTIMO ATO (FRASE DRAMÁTICA SE CHEGAR A 100% CONSUMIDO)
                </label>
                <input
                  type="text"
                  value={lastActDraft}
                  onChange={(e) => setLastActDraft(e.target.value)}
                  placeholder='Ex: "Cuidem da minha irmã."'
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded bg-limiar-800 text-limiar-red focus:ring-0"
                  />
                  <span>Tornar Ficha Pública na Mesa (colegas podem visualizar seus atributos)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé de Navegação */}
        <div className="p-4 border-t border-limiar-800 bg-limiar-950 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-limiar-800 hover:bg-limiar-700 text-slate-300 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 bg-gradient-to-r from-limiar-red to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition shadow-glow-red"
            >
              Próximo <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition shadow-lg"
            >
              <Check className="w-4 h-4" /> FINALIZAR & ALISTAR AGENTE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
