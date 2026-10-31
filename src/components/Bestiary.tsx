import React, { useState } from 'react';
import { useLimiar } from '../context/LimiarContext';
import { Creature, CreatureAttack } from '../types/limiar';
import { getRandomInt, playDiceSound } from '../utils/limiarRules';
import {
  Skull,
  Plus,
  Trash2,
  Shield,
  Crosshair,
  Sparkles,
  Dices,
  Flame,
  Radio,
  Eye,
  EyeOff,
  AlertTriangle,
  Heart,
  Activity,
  Edit2,
  Check,
} from 'lucide-react';

export const Bestiary: React.FC = () => {
  const {
    creatures,
    createCreature,
    updateCreature,
    deleteCreature,
    makeRoll,
    currentUser,
    currentCampaign,
  } = useLimiar();

  const [isPrivateRoll, setIsPrivateRoll] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Formulário de Criação Rápida de Criatura
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<Creature['type']>('Caçador');
  const [formDegree, setFormDegree] = useState<number>(2);
  const [formPV, setFormPV] = useState<number>(45);
  const [formDefense, setFormDefense] = useState<number>(14);
  const [formRD, setFormRD] = useState<number>(2);
  const [formSpeed, setFormSpeed] = useState<string>('12 m');
  const [formDesc, setFormDesc] = useState<string>('');

  // Ao alterar o grau, preenche sugestão automática da tabela do Cap. 56
  const handleDegreeChange = (degree: number) => {
    setFormDegree(degree);
    if (degree === 1) {
      setFormPV(24);
      setFormDefense(12);
      setFormRD(0);
    } else if (degree === 2) {
      setFormPV(45);
      setFormDefense(14);
      setFormRD(2);
    } else if (degree === 3) {
      setFormPV(90);
      setFormDefense(16);
      setFormRD(4);
    } else if (degree === 4) {
      setFormPV(180);
      setFormDefense(19);
      setFormRD(6);
    } else if (degree === 5) {
      setFormPV(400);
      setFormDefense(22);
      setFormRD(10);
    }
  };

  const handleSaveCreature = () => {
    if (!formName.trim()) {
      alert('Informe o nome da criatura.');
      return;
    }

    createCreature({
      name: formName,
      type: formType,
      degree: formDegree,
      pv: formPV,
      currentPv: formPV,
      defense: formDefense,
      rdAlheia: formRD,
      speed: formSpeed,
      description: formDesc,
      attacks: [
        {
          name: 'Ataque Alheio',
          attackBonus: 4 + formDegree * 4,
          damageFormula: `${formDegree}d8+${formDegree + 1}`,
          damageType: 'cortante',
          contagionOnHit: formDegree,
          saveDC: 10 + formDegree * 3,
          saveType: 'Fortitude',
          effectDescription: `Ataque contagiante: +${formDegree}% de Contágio se falhar na resistência.`,
        }
      ],
      traits: [`RD Alheia ${formRD} contra armas comuns.`],
      powers: [],
    });

    setFormName('');
    setShowCreateModal(false);
  };

  // Rolar Ataque da Criatura
  const handleRollCreatureAttack = (creature: Creature, attack: CreatureAttack) => {
    playDiceSound();
    const d20 = getRandomInt(1, 20);
    const total = d20 + attack.attackBonus;
    const isHighlight = d20 === 20;
    const isDisaster = d20 === 1;

    // Rola dano
    const diceMatch = attack.damageFormula.match(/(\d+)d(\d+)([+-]\d+)?/i);
    let damageTotal = 0;
    const damageRolls: number[] = [];
    if (diceMatch) {
      const count = parseInt(diceMatch[1], 10) * (isHighlight ? 2 : 1);
      const faces = parseInt(diceMatch[2], 10);
      const bonus = diceMatch[3] ? parseInt(diceMatch[3], 10) : 0;
      for (let i = 0; i < count; i++) {
        damageRolls.push(getRandomInt(1, faces));
      }
      damageTotal = damageRolls.reduce((a, b) => a + b, 0) + bonus;
    }

    makeRoll({
      title: `${creature.name}: ${attack.name}`,
      subtitle: `Ataque com bônus +${attack.attackBonus} contra Defesa do alvo`,
      attributeValue: 1,
      trainingBonus: attack.attackBonus,
      extraModifier: 0,
      isPrivate: isPrivateRoll,
      damageRoll: {
        formula: attack.damageFormula,
        rolls: damageRolls,
        bonus: 0,
        total: Math.max(1, damageTotal),
        type: attack.damageType,
        isDoubleFromHighlight: isHighlight,
      },
      extraEffect: attack.effectDescription,
    });
  };

  // Teste de Moral da Criatura (Vontade DT 12)
  const handleMoralCheck = (creature: Creature) => {
    playDiceSound();
    const d20 = getRandomInt(1, 20);
    const bonus = creature.resistances?.vontade || 4;
    const total = d20 + bonus;
    const passed = total >= 12;

    makeRoll({
      title: `Teste de Moral: ${creature.name}`,
      subtitle: 'Alvo abaixo de 25% PV ou líder abatido (DT 12)',
      attributeValue: 1,
      trainingBonus: bonus,
      extraModifier: 0,
      dc: 12,
      extraEffect: passed
        ? 'A criatura mantém a determinação e segue lutando!'
        : 'Moral quebrada! A criatura hesita, recua ou tenta fugir para a Fenda!',
      isPrivate: isPrivateRoll,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header do Bestiário */}
      <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
            <Skull className="w-5 h-5 text-limiar-red" /> BESTIÁRIO & AMEAÇAS DO OUTRO LADO
          </h2>
          <p className="text-xs text-slate-400">
            Alheios, Hordas, Elites e Consumidos catalogados pela Academia Meridiano. Exclusivo para o Mestre da Mesa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-limiar-850 px-2.5 py-1.5 rounded-lg border border-limiar-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isPrivateRoll}
              onChange={(e) => setIsPrivateRoll(e.target.checked)}
              className="rounded bg-limiar-800 text-limiar-red focus:ring-0"
            />
            {isPrivateRoll ? (
              <span className="flex items-center gap-1 text-amber-400">
                <EyeOff className="w-3.5 h-3.5" /> Rolagens Ocultas
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-400">
                <Eye className="w-3.5 h-3.5" /> Rolagens Públicas
              </span>
            )}
          </label>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-limiar-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> CRIAR NOVO ALHEIO
          </button>
        </div>
      </div>

      {/* Grid de Criaturas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creatures.map((creature) => {
          return (
            <div
              key={creature.id}
              className={`p-4 rounded-xl border shadow-lg flex flex-col justify-between transition ${
                creature.type === 'Consumido'
                  ? 'bg-purple-950/20 border-purple-500/50'
                  : creature.type === 'Chefe'
                  ? 'bg-red-950/30 border-red-500/60 shadow-glow-red'
                  : 'bg-limiar-900 border-limiar-800'
              }`}
            >
              <div className="space-y-3">
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-2 border-b border-limiar-800 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base text-slate-100">
                        {creature.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-limiar-800 text-slate-300 font-bold uppercase">
                        GRAU {creature.degree}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-limiar-850 text-cyan-400 border border-limiar-700 uppercase">
                        {creature.type}
                      </span>
                    </div>

                    {creature.consumidoOriginalName && (
                      <p className="text-xs text-purple-300 italic font-sans mt-0.5">
                        Ex-agente: <strong>{creature.consumidoOriginalName}</strong> · Último Ato:{' '}
                        {creature.consumidoLastAct}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteCreature(creature.id)}
                    title="Excluir criatura"
                    className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* VITAIS DA CRIATURA */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="bg-limiar-850 p-2 rounded border border-limiar-800">
                    <span className="text-[10px] text-rose-400 block font-bold">PV</span>
                    <span className="font-bold text-slate-100">
                      {creature.currentPv}/{creature.pv}
                    </span>
                  </div>
                  <div className="bg-limiar-850 p-2 rounded border border-limiar-800">
                    <span className="text-[10px] text-slate-400 block font-bold">DEFESA</span>
                    <span className="font-bold text-slate-100">{creature.defense}</span>
                  </div>
                  <div className="bg-limiar-850 p-2 rounded border border-limiar-800">
                    <span className="text-[10px] text-purple-400 block font-bold">RD ALHEIA</span>
                    <span className="font-bold text-slate-100">{creature.rdAlheia}</span>
                  </div>
                  <div className="bg-limiar-850 p-2 rounded border border-limiar-800">
                    <span className="text-[10px] text-cyan-400 block font-bold">DESL.</span>
                    <span className="font-bold text-slate-100">{creature.speed}</span>
                  </div>
                </div>

                {/* Descrição e Traços */}
                {creature.description && (
                  <p className="text-xs text-slate-400 italic">{creature.description}</p>
                )}

                {creature.traits && creature.traits.length > 0 && (
                  <div className="space-y-1">
                    {creature.traits.map((t, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-300 bg-limiar-950/70 p-1.5 rounded border border-limiar-800 flex items-start gap-1.5"
                      >
                        <Shield className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ATAQUES DA CRIATURA COM BOTÃO 🎲 */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    ATAQUES & GOLPES CONTAGIANTES:
                  </span>

                  {creature.attacks.map((atk, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-limiar-850 rounded-lg border border-limiar-700/80 flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-slate-200">{atk.name}</strong>
                          <span className="text-[10px] font-mono text-cyan-400">
                            +{atk.attackBonus}
                          </span>
                          <span className="text-[10px] font-mono text-rose-400">
                            {atk.damageFormula} ({atk.damageType})
                          </span>
                        </div>
                        {atk.effectDescription && (
                          <p className="text-[10px] text-slate-400">{atk.effectDescription}</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRollCreatureAttack(creature, atk)}
                        className="px-2.5 py-1.5 bg-limiar-800 hover:bg-limiar-red text-white text-xs font-display font-bold rounded flex items-center gap-1 transition shadow-sm"
                        title="Rolar acerto e dano"
                      >
                        <Dices className="w-3.5 h-3.5 text-amber-400" /> Rolar 🎲
                      </button>
                    </div>
                  ))}
                </div>

                {/* PODERES ESPECIAIS */}
                {creature.powers && creature.powers.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {creature.powers.map((p, idx) => (
                      <div key={idx} className="p-2 bg-limiar-950 rounded border border-limiar-800 text-xs">
                        <strong className="text-amber-400">{p.name}:</strong>{' '}
                        <span className="text-slate-300">{p.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ações de Controle no Rodapé (Mestre) */}
              <div className="pt-3 mt-3 border-t border-limiar-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      updateCreature(creature.id, {
                        currentPv: Math.max(0, creature.currentPv - 5),
                      })
                    }
                    className="px-2 py-1 bg-limiar-800 hover:bg-rose-950 text-rose-300 text-xs font-mono rounded"
                    title="-5 PV"
                  >
                    -5 PV
                  </button>
                  <button
                    onClick={() =>
                      updateCreature(creature.id, {
                        currentPv: Math.min(creature.pv, creature.currentPv + 5),
                      })
                    }
                    className="px-2 py-1 bg-limiar-800 hover:bg-emerald-950 text-emerald-300 text-xs font-mono rounded"
                    title="+5 PV"
                  >
                    +5 PV
                  </button>
                </div>

                <button
                  onClick={() => handleMoralCheck(creature)}
                  className="px-2.5 py-1 bg-limiar-850 hover:bg-limiar-800 border border-limiar-700 text-slate-300 text-xs font-mono rounded flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Testar Moral 🎲
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE CRIAÇÃO RÁPIDA DE CRIATURA */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-limiar-900 border border-limiar-700 rounded-xl p-6 text-slate-100 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
              <Skull className="w-5 h-5 text-limiar-red" /> CRIAR NOVA CRIATURA / ALHEIO
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nome da Criatura</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Alheio da Bruma, Devorador de Ossos..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Tipo de Ameaça</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2.5 py-1.5"
                  >
                    <option value="Rastejante">Rastejante (em bando)</option>
                    <option value="Caçador">Caçador (ágil e letal)</option>
                    <option value="Bruto">Bruto (massivo e pesado)</option>
                    <option value="Elite">Elite (PV x2, turno duplo)</option>
                    <option value="Chefe">Chefe (PV x4, resistências)</option>
                    <option value="Horda">Horda (3x3, área x2)</option>
                    <option value="Consumido">Consumido (ex-agente)</option>
                    <option value="Humano">Humano Armado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Grau de Perigo (1 a 5)</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleDegreeChange(g)}
                        className={`flex-1 py-1 rounded font-mono font-bold transition ${
                          formDegree === g
                            ? 'bg-limiar-red text-white'
                            : 'bg-limiar-850 text-slate-300 hover:bg-limiar-800'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Pontos de Vida</label>
                  <input
                    type="number"
                    value={formPV}
                    onChange={(e) => setFormPV(parseInt(e.target.value) || 20)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Defesa</label>
                  <input
                    type="number"
                    value={formDefense}
                    onChange={(e) => setFormDefense(parseInt(e.target.value) || 10)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">RD Alheia</label>
                  <input
                    type="number"
                    value={formRD}
                    onChange={(e) => setFormRD(parseInt(e.target.value) || 0)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Descrição & Comportamento</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  placeholder="Aspecto visual, sons, histórico da fenda de onde veio..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded p-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 bg-limiar-800 text-slate-300 rounded font-medium text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveCreature}
                className="flex-1 py-2 bg-limiar-red text-white rounded font-display font-bold text-xs"
              >
                Salvar Criatura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
