import React, { useState } from 'react';
import { Character, CampaignCharacterState } from '../types/limiar';
import { useLimiar } from '../context/LimiarContext';
import {
  getContagionStageInfo,
  rollLimiarCheck,
  getRandomInt,
  playAferidorBeep,
} from '../utils/limiarRules';
import {
  CHAMADO_TABLE,
  IMPULSOS_TABLE,
} from '../data/limiarDatabase';
import {
  Radio,
  AlertTriangle,
  Skull,
  Shield,
  Activity,
  HeartCrack,
  Flame,
  Volume2,
  Sparkles,
  HelpCircle,
  Plus,
  Minus,
} from 'lucide-react';

interface AferidorDisplayProps {
  character: Character;
  campaignState: CampaignCharacterState;
  isEditable?: boolean;
}

export const AferidorDisplay: React.FC<AferidorDisplayProps> = ({
  character,
  campaignState,
  isEditable = true,
}) => {
  const { updateCampaignCharacterState, makeRoll, currentCampaign, currentUser } = useLimiar();
  const [showDetails, setShowDetails] = useState(false);
  const [showTreatments, setShowTreatments] = useState(false);

  const contagion = campaignState.contagion || 0;
  const stageInfo = getContagionStageInfo(contagion);
  const peak = campaignState.peakContagion || contagion;
  const floor = Math.floor(peak / 2);

  // Manipular ganho de contágio
  const handleAddContagion = (amount: number, reason: string) => {
    if (!currentCampaign) return;
    const newContagion = Math.min(100, contagion + amount);
    updateCampaignCharacterState(
      currentCampaign.id,
      character.id,
      { contagion: newContagion },
      { change: amount, reason }
    );
  };

  // Manipular redução de contágio respeitando o Piso
  const handleReduceContagion = (amount: number, reason: string) => {
    if (!currentCampaign) return;
    const clampedAmount = Math.max(0, amount);
    const newContagion = Math.max(floor, contagion - clampedAmount);
    const actualReduction = contagion - newContagion;

    updateCampaignCharacterState(
      currentCampaign.id,
      character.id,
      { contagion: newContagion },
      { change: -actualReduction, reason: `${reason} (Piso: ${floor}%)` }
    );
  };

  // Realizar Teste de Controle do Limiar (Cap. 27)
  const handleControlCheck = () => {
    const excess = Math.max(0, contagion - 75);
    const controlDC = 15 + Math.floor(excess / 5);
    const vontadeBonus = character.skills['Vontade'] === 'expert' ? 15 : character.skills['Vontade'] === 'veterano' ? 10 : character.skills['Vontade'] === 'treinado' ? 5 : 0;

    // Desperto nv 14 tem Voz Abafada (+1 dado bônus)
    const isDespertoNv14 = character.classId === 'desperto' && character.level >= 14;

    const rollRes = makeRoll({
      title: 'Teste de Controle (Estágio Limiar)',
      subtitle: `Resistir ao Chamado do Outro Lado contra DT ${controlDC}`,
      attributeKey: 'PRE',
      attributeValue: character.attributes.PRE,
      trainingBonus: vontadeBonus,
      bonusDice: isDespertoNv14 ? 1 : 0,
      penaltyDice: 1, // Limiar impõe -1 dado em Vontade
      dc: controlDC,
      isPrivate: false,
    });

    // Se falhar no teste de controle, sofre o Chamado!
    if (!rollRes.isSuccess && !rollRes.isHighlight) {
      const chamadoRoll = getRandomInt(1, 6);
      const chamadoEffect = CHAMADO_TABLE.find((c) => c.roll === chamadoRoll) || CHAMADO_TABLE[0];
      playAferidorBeep('alert');

      setTimeout(() => {
        makeRoll({
          title: `O CHAMADO ATIVADO! (Resultado: ${chamadoRoll} - ${chamadoEffect.name})`,
          subtitle: 'O Outro Lado assume o controle do corpo por 1 rodada!',
          attributeValue: 1,
          trainingBonus: 0,
          extraModifier: 0,
          extraEffect: chamadoEffect.effect,
          isPrivate: false,
        });
      }, 500);
    }
  };

  // Realizar Teste de Impulso do Ressonante (Cap. 27)
  const handleImpulseCheck = () => {
    const vontadeBonus = character.skills['Vontade'] === 'expert' ? 15 : character.skills['Vontade'] === 'veterano' ? 10 : character.skills['Vontade'] === 'treinado' ? 5 : 0;
    const rollRes = makeRoll({
      title: 'Teste de Impulso (Estágio Ressonante)',
      subtitle: 'Mente reduzida à metade: teste de Vontade DT 15',
      attributeKey: 'PRE',
      attributeValue: character.attributes.PRE,
      trainingBonus: vontadeBonus,
      dc: 15,
      isPrivate: false,
    });

    if (!rollRes.isSuccess && !rollRes.isHighlight) {
      const impulseRoll = getRandomInt(1, 6);
      const impulse = IMPULSOS_TABLE.find((i) => i.roll === impulseRoll) || IMPULSOS_TABLE[0];
      setTimeout(() => {
        makeRoll({
          title: `IMPULSO ATIVADO! (${impulse.name})`,
          subtitle: 'Comportamento alterado até o final da cena.',
          attributeValue: 1,
          trainingBonus: 0,
          extraModifier: 0,
          extraEffect: impulse.effect,
          isPrivate: false,
        });
      }, 500);
    }
  };

  // Executar Último Ato (Consumido 100%)
  const handleExecuteLastAct = () => {
    const act = prompt('Declare a frase ou ação heróica do seu Último Ato:', character.lastActDraft || 'Não me deixem ficar sozinho.');
    if (act) {
      makeRoll({
        title: 'ÚLTIMO ATO — O FIM DO AGENTE',
        subtitle: `${character.name} atingiu 100% de Contágio e se despede da humanidade.`,
        attributeValue: 1,
        trainingBonus: 0,
        extraModifier: 0,
        forceHighlight: true, // Último Ato concede Destaque Automático!
        extraEffect: `"${act}" — A ficha do agente foi transferida ao Mestre como Consumido.`,
        isPrivate: false,
      });
      if (currentCampaign) {
        updateCampaignCharacterState(currentCampaign.id, character.id, {
          lastActExecuted: act,
          isConsumido: true,
        });
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-limiar-900 to-limiar-950 border-2 border-limiar-700/80 rounded-xl p-4 shadow-aferidor overflow-hidden">
      {/* Detalhe de Chassi metálico do Aferidor (Aço fosco da Academia) */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-60">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          AFERIDOR DE PULSO · MODELO 2034 · MERIDIANO
        </span>
      </div>

      <div className="absolute top-2 right-3 flex items-center gap-2">
        <button
          onClick={() => playAferidorBeep('short')}
          title="Testar sinal sonoro do Aferidor"
          className="text-slate-500 hover:text-amber-400 transition"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 font-mono"
        >
          <HelpCircle className="w-3.5 h-3.5" /> {showDetails ? 'Ocultar' : 'Efeitos'}
        </button>
      </div>

      {/* Visor Digital Principal */}
      <div className="mt-5 bg-black/90 rounded-lg p-3.5 border border-limiar-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Mostrador Numérico & Barra */}
        <div className="w-full md:w-2/3">
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono text-slate-400">Nível de Contágio:</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${stageInfo.badgeBg}`}>
                {stageInfo.label.toUpperCase()} ({stageInfo.rangeText})
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono mr-2">PISO: {floor}%</span>
              <span className={`font-mono text-3xl font-extrabold tracking-tight ${stageInfo.colorClass}`}>
                {contagion}%
              </span>
            </div>
          </div>

          {/* Barra Segmentada de LEDs com Marcadores Críticos */}
          <div className="relative w-full h-4 bg-limiar-950 rounded-full overflow-hidden p-0.5 border border-limiar-800">
            {/* Marcadores 25%, 50%, 75%, 90% */}
            <div className="absolute top-0 bottom-0 left-[25%] w-0.5 bg-slate-600/70 z-10" title="25% Aflorado" />
            <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-slate-600/70 z-10" title="50% Ressonante" />
            <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-600/70 z-10" title="75% Limiar" />
            <div className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-red-600/80 z-10" title="90% Alerta Crítico" />

            {/* Piso Indicator */}
            {floor > 0 && (
              <div
                className="absolute top-0 bottom-0 bg-red-950/40 z-0 border-r border-red-500/50"
                style={{ width: `${floor}%` }}
                title={`Piso intransponível: ${floor}%`}
              />
            )}

            {/* Barra de Progresso com Cor Dinâmica */}
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                contagion >= 100
                  ? 'bg-purple-600 shadow-lg shadow-purple-500 animate-pulse'
                  : contagion >= 90
                  ? 'bg-gradient-to-r from-amber-500 via-red-600 to-rose-700 shadow-glow-red animate-pulse'
                  : contagion >= 75
                  ? 'bg-gradient-to-r from-amber-500 to-red-600'
                  : contagion >= 50
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-500'
                  : contagion >= 25
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(1, contagion))}%` }}
            />
          </div>

          {/* Legenda de marcas */}
          <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1 px-1">
            <span>0%</span>
            <span>25% Bip</span>
            <span>50% Avaliação</span>
            <span>75% Limiar</span>
            <span className="text-red-400">90% Contínuo</span>
            <span className="text-purple-400 font-bold">100% Consumido</span>
          </div>
        </div>

        {/* Botões Rápidos de Ação Mecânica do Estágio */}
        <div className="w-full md:w-1/3 flex flex-col gap-2">
          {stageInfo.stage === 'limiar' && (
            <button
              onClick={handleControlCheck}
              className="w-full py-1.5 px-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-display font-bold text-xs rounded-lg shadow-glow-red flex items-center justify-center gap-1.5 transition"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" /> TESTE DE CONTROLE
            </button>
          )}

          {stageInfo.stage === 'ressonante' && (
            <button
              onClick={handleImpulseCheck}
              className="w-full py-1.5 px-3 bg-amber-600/90 hover:bg-amber-500 text-black font-display font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition"
            >
              <HeartCrack className="w-4 h-4" /> TESTAR IMPULSO (Mente ≤ 50%)
            </button>
          )}

          {contagion >= 100 && (
            <button
              onClick={handleExecuteLastAct}
              className="w-full py-2 px-3 bg-purple-700 hover:bg-purple-600 text-white font-display font-bold text-xs rounded-lg shadow-lg shadow-purple-900 flex items-center justify-center gap-1.5 transition animate-pulse"
            >
              <Skull className="w-4 h-4" /> DECLARAR ÚLTIMO ATO
            </button>
          )}

          {isEditable && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-mono">Ajuste:</span>
              <button
                onClick={() => handleAddContagion(1, 'Exposição ou uso de Dom')}
                title="+1% de Contágio"
                className="flex-1 py-1 bg-limiar-800 hover:bg-limiar-700 text-slate-200 rounded text-xs font-mono font-semibold"
              >
                +1%
              </button>
              <button
                onClick={() => handleAddContagion(2, 'Fenda / Arma Fendida')}
                title="+2% de Contágio"
                className="flex-1 py-1 bg-limiar-800 hover:bg-limiar-700 text-slate-200 rounded text-xs font-mono font-semibold"
              >
                +2%
              </button>
              <button
                onClick={() => handleAddContagion(3, 'Resíduo bruto / Ataque contagiante')}
                title="+3% de Contágio"
                className="flex-1 py-1 bg-limiar-800 hover:bg-limiar-700 text-slate-200 rounded text-xs font-mono font-semibold"
              >
                +3%
              </button>
              <button
                onClick={() => setShowTreatments(!showTreatments)}
                title="Tratamentos para reduzir contágio (Cap. 28)"
                className="px-2 py-1 bg-limiar-700 hover:bg-limiar-600 text-emerald-300 rounded text-xs font-mono"
              >
                Tratar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Painel de Tratamentos (Redução de Contágio) */}
      {showTreatments && (
        <div className="mt-3 p-3 bg-limiar-850 rounded-lg border border-emerald-900/40 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-limiar-800">
            <h4 className="text-xs font-display font-bold text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> MÉTODOS DE REDUÇÃO (CAP. 28)
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Piso Mínimo Intransponível: <strong className="text-slate-200">{floor}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleReduceContagion(1, 'Cena do Vínculo')}
              className="p-2 bg-limiar-900 hover:bg-limiar-800 border border-limiar-700 rounded text-left transition"
            >
              <div className="font-semibold text-emerald-300">Cena do Vínculo (-1%)</div>
              <div className="text-[10px] text-slate-400">1x por sessão, lembrança humana com Vínculo.</div>
            </button>

            <button
              onClick={() => {
                const roll = getRandomInt(1, 4);
                handleReduceContagion(roll, `Quarentena (-${roll}%)`);
              }}
              className="p-2 bg-limiar-900 hover:bg-limiar-800 border border-limiar-700 rounded text-left transition"
            >
              <div className="font-semibold text-emerald-300">Quarentena (-1d4%)</div>
              <div className="text-[10px] text-slate-400">2 semanas sem Fendas/Dons, Medicina DT 20.</div>
            </button>

            <button
              onClick={() => {
                const roll = getRandomInt(1, 6);
                handleReduceContagion(roll, `Soro de Dessintonia (-${roll}%)`);
              }}
              className="p-2 bg-limiar-900 hover:bg-limiar-800 border border-limiar-700 rounded text-left transition"
            >
              <div className="font-semibold text-emerald-300">Soro de Dessintonia (-1d6%)</div>
              <div className="text-[10px] text-slate-400">Gera Debilitado por 24h. 5 Mérito.</div>
            </button>

            <button
              onClick={() => {
                const r1 = getRandomInt(1, 6);
                const r2 = getRandomInt(1, 6);
                handleReduceContagion(r1 + r2, `Tratamento Profundo (-${r1 + r2}%)`);
              }}
              className="p-2 bg-limiar-900 hover:bg-limiar-800 border border-limiar-700 rounded text-left transition"
            >
              <div className="font-semibold text-emerald-300">Tratamento Profundo (-2d6%)</div>
              <div className="text-[10px] text-slate-400">1 semana na Âncora, Medicina DT 25 & Ciências DT 20.</div>
            </button>
          </div>
        </div>
      )}

      {/* Detalhes de Benefícios e Custos do Estágio */}
      {showDetails && (
        <div className="mt-3 p-3 bg-limiar-950/90 rounded-lg border border-limiar-800 text-xs space-y-2 animate-in fade-in">
          <div>
            <span className="font-semibold text-emerald-400">Benefícios Ativos:</span>
            <p className="text-slate-300 mt-0.5">{stageInfo.benefits}</p>
          </div>
          <div>
            <span className="font-semibold text-rose-400">Custos & Penalidades:</span>
            <p className="text-slate-300 mt-0.5">{stageInfo.costs}</p>
          </div>
          <div className="pt-1 text-[11px] text-slate-400 border-t border-limiar-800/80">
            <span className="font-semibold text-slate-300">Descrição Física & Sensorial:</span>
            <p className="italic mt-0.5">{stageInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
