import React, { useState } from 'react';
import { AttributeKey } from '../types/limiar';
import { useLimiar } from '../context/LimiarContext';
import { Dices, Eye, EyeOff, ShieldAlert, Sparkles, X } from 'lucide-react';

interface DiceRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  attributeKey?: AttributeKey;
  attributeValue: number;
  trainingBonus: number;
  initialDC?: number;
}

export const DiceRollModal: React.FC<DiceRollModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  attributeKey,
  attributeValue,
  trainingBonus,
  initialDC,
}) => {
  const { makeRoll, currentUser } = useLimiar();
  const [bonusDice, setBonusDice] = useState<number>(0);
  const [penaltyDice, setPenaltyDice] = useState<number>(0);
  const [extraModifier, setExtraModifier] = useState<number>(0);
  const [dc, setDc] = useState<number | ''>(initialDC !== undefined ? initialDC : '');
  const [isPrivate, setIsPrivate] = useState<boolean>(currentUser.rolePreference === 'mestre');

  if (!isOpen) return null;

  const netDice = Math.max(-2, Math.min(2, bonusDice - penaltyDice));
  const isAttrZeroOrDepleted = attributeValue === 0 || attributeValue + netDice <= 0;
  const estimatedPool = isAttrZeroOrDepleted ? 2 : Math.max(1, attributeValue + netDice);

  const handleRoll = () => {
    makeRoll({
      title,
      subtitle,
      attributeKey,
      attributeValue,
      trainingBonus,
      bonusDice,
      penaltyDice,
      extraModifier,
      dc: dc !== '' ? Number(dc) : undefined,
      isPrivate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-limiar-900 border border-limiar-700/80 rounded-xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-limiar-red/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-limiar-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-limiar-red/20 border border-limiar-red/40 flex items-center justify-center text-limiar-red">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-100 tracking-wide">{title}</h3>
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-limiar-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Informação do Teste */}
          <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-700/60 flex items-center justify-between text-sm">
            <div>
              <span className="text-slate-400">Atributo Base:</span>{' '}
              <span className="font-semibold text-slate-100">
                {attributeKey ? `${attributeKey} (${attributeValue})` : `${attributeValue}`}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Treinamento:</span>{' '}
              <span className="font-mono font-bold text-amber-400">
                +{trainingBonus}
              </span>
            </div>
          </div>

          {/* Dados Bônus e Penalidade */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-800">
              <label className="block text-xs font-medium text-emerald-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Dados Bônus (+d20)
              </label>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setBonusDice(val)}
                    className={`flex-1 py-1.5 rounded font-mono text-sm font-semibold transition ${
                      bonusDice === val
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-limiar-800 text-slate-300 hover:bg-limiar-700'
                    }`}
                  >
                    +{val}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Preparação, ajuda, mira (máx +2)</p>
            </div>

            <div className="bg-limiar-850 p-3 rounded-lg border border-limiar-800">
              <label className="block text-xs font-medium text-rose-400 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Penalidade (-d20)
              </label>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPenaltyDice(val)}
                    className={`flex-1 py-1.5 rounded font-mono text-sm font-semibold transition ${
                      penaltyDice === val
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-limiar-800 text-slate-300 hover:bg-limiar-700'
                    }`}
                  >
                    -{val}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Medo, pressa, escuridão (máx -2)</p>
            </div>
          </div>

          {/* Modificador Numérico Extra e DT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Modificador Numérico</label>
              <input
                type="number"
                value={extraModifier}
                onChange={(e) => setExtraModifier(parseInt(e.target.value) || 0)}
                placeholder="+0"
                className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-1.5 text-sm font-mono text-center focus:outline-none focus:border-limiar-amber"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Dificuldade (DT Opcional)</label>
              <input
                type="number"
                value={dc}
                onChange={(e) => setDc(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="Ex: 15, 20"
                className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-1.5 text-sm font-mono text-center focus:outline-none focus:border-limiar-red"
              />
            </div>
          </div>

          {/* Pré-visualização da Reserva */}
          <div className="p-3 bg-limiar-950 border border-limiar-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400">Reserva de Dados:</span>
            <span className="font-mono font-bold text-cyan-400">
              {isAttrZeroOrDepleted ? (
                <span className="text-amber-400">2d20 (Atributo 0: escolhe o MENOR)</span>
              ) : (
                `${estimatedPool}d20 (escolhe o MAIOR)`
              )}
            </span>
          </div>

          {/* Opção Pública vs Privada (Mestre ou Jogador) */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              {isPrivate ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
              {isPrivate ? 'Rolagem Oculta (Apenas Mestre)' : 'Rolagem Pública (Toda a Mesa)'}
            </span>
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className="text-xs text-slate-300 underline hover:text-white"
            >
              Alternar
            </button>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-limiar-800 hover:bg-limiar-700 text-slate-300 rounded-lg font-medium text-sm transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleRoll}
            className="flex-1 py-2 bg-gradient-to-r from-limiar-red to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg font-display font-bold text-sm tracking-wide shadow-glow-red transition flex items-center justify-center gap-2"
          >
            <Dices className="w-4 h-4" /> ROLAR TESTE
          </button>
        </div>
      </div>
    </div>
  );
};
