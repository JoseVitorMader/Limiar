import React, { useState } from 'react';
import { useLimiar } from '../context/LimiarContext';
import { Dices, Eye, EyeOff, ShieldAlert, Sparkles, Trash2, X, ChevronRight, Skull, AlertTriangle, Send } from 'lucide-react';
import { parseDiceFormula, getRandomInt, playDiceSound } from '../utils/limiarRules';

interface RollsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RollsSidebar: React.FC<RollsSidebarProps> = ({ isOpen, onClose }) => {
  const {
    visibleRollHistory,
    currentUser,
    clearRollHistory,
    currentCampaign,
    activeCharacter,
    makeRoll,
  } = useLimiar();

  const [customFormula, setCustomFormula] = useState('');
  const [quickTitle, setQuickTitle] = useState('Rolagem Rápida');
  const [isPrivate, setIsPrivate] = useState(currentUser.rolePreference === 'mestre');

  const isGM = currentUser.rolePreference === 'mestre' || (currentCampaign && currentCampaign.gmId === currentUser.id);

  const handleCustomRoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFormula.trim()) return;

    const parsed = parseDiceFormula(customFormula.trim());
    playDiceSound();

    const rolls: number[] = [];
    for (let i = 0; i < parsed.count; i++) {
      rolls.push(getRandomInt(1, parsed.faces));
    }
    const sum = rolls.reduce((a, b) => a + b, 0) + parsed.fixedBonus;

    makeRoll({
      title: quickTitle || `Rolagem ${customFormula}`,
      subtitle: `Fórmula: ${customFormula}`,
      attributeValue: 1,
      trainingBonus: 0,
      extraModifier: 0,
      isPrivate,
      damageRoll: {
        formula: customFormula,
        rolls,
        bonus: parsed.fixedBonus,
        total: Math.max(0, sum),
        type: 'balistico',
        isDoubleFromHighlight: false,
      },
    });

    setCustomFormula('');
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-limiar-900/95 border-l border-limiar-700/70 shadow-2xl z-40 backdrop-blur-md flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-limiar-800 flex items-center justify-between bg-limiar-950/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-limiar-800 border border-limiar-700 flex items-center justify-center text-limiar-amber">
            <Dices className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-slate-100 tracking-wide flex items-center gap-2">
              HISTÓRICO DA MESA
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              {currentCampaign?.name || 'Mesa Ativa'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isGM && (
            <button
              onClick={clearRollHistory}
              title="Limpar histórico"
              className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-limiar-800 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-limiar-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lista de Rolagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-limiar-800/40">
        {visibleRollHistory.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Dices className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
            <p className="text-sm font-medium">Nenhuma rolagem registrada ainda.</p>
            <p className="text-xs text-slate-600 mt-1">
              Clique em qualquer ícone 🎲 na ficha ou no painel para rolar.
            </p>
          </div>
        ) : (
          visibleRollHistory.map((roll) => {
            const isUserRoll = roll.senderId === currentUser.id;

            return (
              <div
                key={roll.id}
                className={`pt-3 first:pt-0 rounded-lg p-3 transition border ${
                  roll.isHighlight
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : roll.isDisaster
                    ? 'bg-rose-950/30 border-rose-600/60'
                    : 'bg-limiar-850/70 border-limiar-800'
                }`}
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-semibold ${
                        roll.senderRole === 'mestre'
                          ? 'text-amber-400'
                          : isUserRoll
                          ? 'text-cyan-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {roll.senderName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-limiar-800 text-slate-400 uppercase font-mono">
                      {roll.senderRole === 'mestre' ? 'Mestre' : 'Agente'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    {roll.isPrivate && (
                      <span className="flex items-center gap-0.5 text-amber-400/90 bg-amber-950/50 px-1 rounded">
                        <EyeOff className="w-3 h-3" /> Privada
                      </span>
                    )}
                    <span>{roll.timestamp}</span>
                  </div>
                </div>

                {/* Título da Rolagem */}
                <div className="mb-2">
                  <h4 className="text-sm font-display font-bold text-slate-100 flex items-center gap-1">
                    {roll.title}
                  </h4>
                  {roll.subtitle && (
                    <p className="text-[11px] text-slate-400">{roll.subtitle}</p>
                  )}
                </div>

                {/* DADOS D20 - Representação Visual */}
                {roll.rolls && roll.rolls.length > 0 && (
                  <div className="bg-limiar-950/80 p-2.5 rounded border border-limiar-800 mb-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span>
                        Reserva ({roll.rolls.length}d20
                        {roll.bonusDice > 0 ? ` +${roll.bonusDice}` : ''}
                        {roll.penaltyDice > 0 ? ` -${roll.penaltyDice}` : ''}):
                      </span>
                      {roll.attributeKey && (
                        <span className="font-mono text-cyan-300">
                          {roll.attributeKey} ({roll.attributeValue})
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center">
                      {roll.rolls.map((val, idx) => {
                        const isKept = val === roll.keptDie;
                        return (
                          <div
                            key={idx}
                            className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold transition ${
                              val === 20
                                ? 'bg-amber-500 text-black shadow-glow-amber ring-2 ring-amber-300'
                                : val === 1
                                ? 'bg-rose-700 text-white'
                                : isKept
                                ? 'bg-cyan-600 text-white ring-1 ring-cyan-300'
                                : 'bg-limiar-800 text-slate-400 opacity-60'
                            }`}
                            title={`Dado ${idx + 1}: ${val}`}
                          >
                            {val}
                          </div>
                        );
                      })}

                      <div className="ml-auto text-right">
                        <div className="text-[10px] text-slate-400">
                          Dado: <span className="font-mono font-bold text-slate-200">{roll.keptDie}</span>
                          {roll.trainingBonus > 0 && (
                            <span> + Treino: <span className="text-amber-400">+{roll.trainingBonus}</span></span>
                          )}
                          {roll.extraModifier !== 0 && (
                            <span> + Mod: {roll.extraModifier}</span>
                          )}
                        </div>
                        <div className="font-display font-extrabold text-lg text-slate-100">
                          TOTAL: <span className="text-cyan-400 font-mono">{roll.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* BADGES ESPECIAIS: DESTAQUE, DESASTRE, SUCESSO PLENO */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {roll.isHighlight && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-black shadow-glow-amber animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" /> DESTAQUE (20)!
                    </span>
                  )}

                  {roll.isDisaster && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white shadow-glow-red">
                      <Skull className="w-3.5 h-3.5" /> DESASTRE (TODOS 1)!
                    </span>
                  )}

                  {roll.isFullSuccess && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950 border border-cyan-500 text-cyan-300">
                      Sucesso Pleno (+10 acima da DT)
                    </span>
                  )}

                  {roll.dc !== undefined && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        roll.isHighlight || roll.total >= roll.dc
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                      }`}
                    >
                      {roll.isHighlight || roll.total >= roll.dc
                        ? `Sucesso vs DT ${roll.dc}`
                        : `Falha vs DT ${roll.dc}`}
                    </span>
                  )}
                </div>

                {/* ROLAGEM DE DANO ASSOCIADA */}
                {roll.damageRoll && (
                  <div className="bg-limiar-900 p-2.5 rounded border border-limiar-700/60 text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-medium text-rose-400 flex items-center gap-1">
                        Dano ({roll.damageRoll.type}):
                      </span>
                      <span className="font-mono text-slate-300">
                        {roll.damageRoll.formula}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        [{roll.damageRoll.rolls.join(', ')}]
                        {roll.damageRoll.bonus !== 0 && ` + ${roll.damageRoll.bonus}`}
                      </span>
                      <span className="font-display font-bold text-base text-rose-400">
                        {roll.damageRoll.total} PV
                      </span>
                    </div>
                    {roll.damageRoll.isDoubleFromHighlight && (
                      <p className="text-[10px] text-amber-400 mt-1 italic">
                        * Dados duplicados pelo Destaque!
                      </p>
                    )}
                  </div>
                )}

                {/* EFEITO EXTRA */}
                {roll.extraEffect && (
                  <p className="text-xs text-slate-300 mt-1.5 italic bg-limiar-950/60 p-2 rounded border border-limiar-800">
                    {roll.extraEffect}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Caixa de Rolagem Rápida no Rodapé */}
      <div className="p-3 border-t border-limiar-800 bg-limiar-950">
        <form onSubmit={handleCustomRoll} className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Rolagem Manual / Dado Livre</span>
            {isGM && (
              <label className="flex items-center gap-1 cursor-pointer hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="rounded bg-limiar-800 border-limiar-700 text-limiar-red focus:ring-0"
                />
                <span className="text-[11px]">{isPrivate ? 'Oculta' : 'Pública'}</span>
              </label>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customFormula}
              onChange={(e) => setCustomFormula(e.target.value)}
              placeholder="Ex: 1d20, 2d6+3, 1d100"
              className="flex-1 bg-limiar-850 border border-limiar-700 rounded px-2.5 py-1.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-limiar-amber"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-limiar-red hover:bg-red-700 text-white rounded font-display font-semibold text-xs tracking-wide transition flex items-center gap-1 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Rolar
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};
