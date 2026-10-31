import React, { useState } from 'react';
import { useLimiar } from '../context/LimiarContext';
import { Character, Creature, InitiativeItem } from '../types/limiar';
import { calculateAgentStats, getRandomInt, playDiceSound, playAferidorBeep } from '../utils/limiarRules';
import {
  Clock,
  Shield,
  Heart,
  Zap,
  Brain,
  Activity,
  AlertTriangle,
  Play,
  RotateCcw,
  SkipForward,
  User,
  Users,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Sparkles,
  Dices,
  Flame,
  Radio,
  Swords,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface CampaignDashboardProps {
  onOpenCharacterSheet: (character: Character, isReadOnly: boolean) => void;
}

export const CampaignDashboard: React.FC<CampaignDashboardProps> = ({
  onOpenCharacterSheet,
}) => {
  const {
    currentCampaign,
    characters,
    activeCharacter,
    currentUser,
    getCampaignCharacterState,
    updateCampaignCharacterState,
    setRiftClockHours,
    advanceRiftClock,
    toggleCombat,
    nextTurn,
    setInitiativeOrder,
    makeRoll,
    selectCharacterForCampaign,
    creatures,
  } = useLimiar();

  const [selectedAgentForQuickEdit, setSelectedAgentForQuickEdit] = useState<string | null>(null);

  if (!currentCampaign) {
    return (
      <div className="text-center py-12 text-slate-400">
        Nenhuma campanha selecionada. Crie ou entre em uma mesa no menu superior.
      </div>
    );
  }

  const isGM = currentUser.rolePreference === 'mestre' || currentCampaign.gmId === currentUser.id;
  const rift = currentCampaign.riftClock;

  // Lista de personagens na campanha
  const partyCharacters = currentCampaign.players
    .map((p) => {
      const char = characters.find((c) => c.id === p.characterId);
      return char ? { ...char, playerName: p.userName, playerId: p.userId } : null;
    })
    .filter(Boolean) as (Character & { playerName: string; playerId: string })[];

  // Rolagem de Reforços da Fenda (a cada 3 rodadas)
  const handleCheckReinforcements = () => {
    playDiceSound();
    const roll = getRandomInt(1, 6);
    let arrives = false;
    let desc = '';

    if (rift.phase === 'Silêncio') {
      arrives = false;
      desc = 'Silêncio da Fenda: nenhum Alheio consegue atravessar ainda.';
    } else if (rift.phase === 'Gotejamento') {
      arrives = roll === 1;
      desc = arrives ? '1d4 Alheios de Grau 1 emergiram da Fenda!' : 'Nenhum Alheio atravessou nesta rodada.';
    } else if (rift.phase === 'Maré') {
      arrives = roll <= 2;
      desc = arrives ? '1d4 Alheios de Grau 1 ou 1 de Grau 2 surgiram!' : 'Nenhum Alheio nesta rodada.';
    } else if (rift.phase === 'Contagem final') {
      arrives = roll <= 3;
      desc = arrives ? '1 Alheio de Grau 2 ou 1d4 de Grau 1 + um Elite surgiram da Fenda!' : 'Sem reforços no momento.';
    } else {
      arrives = true;
      desc = 'Ruptura ativa! Reforços constantes de Alheios e Elites a cada rodada ímpar!';
    }

    if (arrives) playAferidorBeep('alert');

    makeRoll({
      title: `Checagem de Reforços da Fenda (1d6 = ${roll})`,
      subtitle: `Fase: ${rift.phase} (Pressão +${rift.pressure})`,
      attributeValue: 1,
      trainingBonus: 0,
      extraModifier: 0,
      extraEffect: desc,
      isPrivate: false,
    });
  };

  // Pulso de Contágio do Núcleo (Fortitude DT 15 + Pressão)
  const handleTriggerCorePulse = () => {
    playAferidorBeep('rift');
    const dc = 15 + rift.pressure;
    makeRoll({
      title: `PULSO CONTANGIANTE DO NÚCLEO! (DT ${dc})`,
      subtitle: `Todos os agentes em Curto alcance devem fazer um teste de Fortitude contra DT ${dc}`,
      attributeValue: 1,
      trainingBonus: 0,
      extraModifier: 0,
      dc,
      extraEffect: 'Falha: o agente ganha imediatamente +1% de Contágio no Aferidor!',
      isPrivate: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* PAINEL SUPERIOR DO RELÓGIO DE 48 HORAS DA FENDA */}
      <div className="bg-gradient-to-r from-limiar-900 via-limiar-850 to-limiar-900 border-2 border-limiar-700/80 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        {/* Glow de Fenda */}
        <div
          className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            rift.phase === 'Ruptura'
              ? 'bg-red-600/20'
              : rift.phase === 'Contagem final'
              ? 'bg-amber-500/20'
              : 'bg-cyan-500/10'
          }`}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                PROTOCOLO DE INCURSÃO · RELÓGIO DE CONTENÇÃO
              </span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  rift.phase === 'Ruptura'
                    ? 'bg-red-950 text-red-300 border-red-500 shadow-glow-red animate-pulse'
                    : rift.phase === 'Contagem final'
                    ? 'bg-amber-950 text-amber-300 border-amber-500'
                    : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                }`}
              >
                FASE: {rift.phase.toUpperCase()}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-slate-100 tracking-wide flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-400" />
              <span>{rift.hours}h / 48 Horas</span>
              <span className="text-sm font-mono font-normal text-slate-400">
                (Pressão na DT: <strong className="text-amber-400">+{rift.pressure}</strong>)
              </span>
            </h2>

            <p className="text-xs text-slate-400 max-w-xl">
              Toda Fenda precisa ser selada em até dois dias. Passado o prazo, ela sofre uma Ruptura permanente. A Pressão é somada à DT de testes de Selagem.
            </p>
          </div>

          {/* Botões do Mestre para avançar o Relógio */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2">
            {isGM && (
              <div className="flex items-center gap-1.5 bg-limiar-950 p-1.5 rounded-lg border border-limiar-800">
                <span className="text-[10px] font-mono text-slate-400 px-1">Avançar Horas:</span>
                <button
                  onClick={() => advanceRiftClock(-6)}
                  className="px-2 py-1 bg-limiar-800 hover:bg-limiar-700 text-xs font-mono rounded text-slate-300"
                  title="Retroceder 6 horas"
                >
                  -6h
                </button>
                <button
                  onClick={() => advanceRiftClock(1)}
                  className="px-2 py-1 bg-limiar-800 hover:bg-limiar-700 text-xs font-mono rounded text-slate-300"
                  title="Avançar 1 hora"
                >
                  +1h
                </button>
                <button
                  onClick={() => advanceRiftClock(6)}
                  className="px-2 py-1 bg-limiar-800 hover:bg-limiar-700 text-xs font-mono rounded text-slate-300"
                  title="Avançar 6 horas"
                >
                  +6h
                </button>
                <button
                  onClick={() => advanceRiftClock(12)}
                  className="px-2 py-1 bg-limiar-800 hover:bg-limiar-700 text-xs font-mono rounded text-slate-300"
                  title="Avançar 12 horas"
                >
                  +12h
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={handleCheckReinforcements}
                className="px-3 py-1.5 bg-limiar-800 hover:bg-limiar-700 border border-limiar-700 text-slate-200 text-xs font-display font-bold rounded-lg transition flex items-center gap-1.5"
                title="Rolar 1d6 para verificar chegada de novos Alheios"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400" /> Rolar Reforços 🎲
              </button>

              <button
                onClick={handleTriggerCorePulse}
                className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 text-rose-200 text-xs font-display font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                title="Emitir pulso de contágio do Núcleo"
              >
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-ping" /> Pulso do Núcleo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DE COMBATE / INICIATIVA */}
      <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-limiar-800">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-base text-slate-100">
              {currentCampaign.combat.isActive
                ? `COMBATE ATIVO · RODADA ${currentCampaign.combat.round}`
                : 'RASTREAMENTO DE INICIATIVA & COMBATE'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isGM && (
              <>
                <button
                  onClick={toggleCombat}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold transition flex items-center gap-1.5 ${
                    currentCampaign.combat.isActive
                      ? 'bg-rose-600 text-white shadow-glow-red'
                      : 'bg-emerald-600 text-white shadow-sm'
                  }`}
                >
                  {currentCampaign.combat.isActive ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" /> Encerrar Combate
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Iniciar Combate
                    </>
                  )}
                </button>

                {currentCampaign.combat.isActive && (
                  <button
                    onClick={nextTurn}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-display font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <SkipForward className="w-3.5 h-3.5" /> Próximo Turno
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Turnos / Ordem de Iniciativa */}
        {currentCampaign.combat.isActive ? (
          <div className="space-y-2">
            <p className="text-xs text-slate-400">
              Ordem de ação da rodada (da maior para a menor iniciativa):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {partyCharacters.map((char, idx) => {
                const charState = getCampaignCharacterState(currentCampaign.id, char.id);
                const isCurrentTurn = currentCampaign.combat.turnIndex === idx;

                return (
                  <div
                    key={char.id}
                    className={`p-3 rounded-xl border transition ${
                      isCurrentTurn
                        ? 'bg-amber-950/30 border-amber-500 shadow-glow-amber ring-1 ring-amber-400'
                        : 'bg-limiar-850 border-limiar-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-slate-100 flex items-center gap-1.5">
                        {isCurrentTurn && <ChevronRight className="w-4 h-4 text-amber-400 animate-pulse" />}
                        {char.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {charState.currentPV} PV
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>PE: {charState.currentPE}</span>
                      <span>Contágio: <strong className="text-rose-400">{charState.contagion}%</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic">
            O combate está inativo no momento. Quando o Mestre iniciar o combate, os agentes e criaturas poderão agir por rodadas de 6 segundos.
          </div>
        )}
      </div>

      {/* ROSTER DE AGENTES NA MESA (EQUIPE DA CAMPANHA) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> EQUIPE DE AGENTES NA MESA ({partyCharacters.length})
            </h3>
            <p className="text-xs text-slate-400">
              {isGM
                ? 'Como Mestre, você pode ver e gerenciar os status de todos os jogadores em tempo real.'
                : 'Fichas com status "Pública" podem ser visualizadas por todos os colegas da mesa.'}
            </p>
          </div>

          {/* Selecionar meu personagem para esta mesa */}
          {!isGM && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Meu Agente:</span>
              <select
                value={activeCharacter?.id || ''}
                onChange={(e) => selectCharacterForCampaign(currentCampaign.id, e.target.value)}
                className="bg-limiar-850 border border-limiar-700 text-xs font-mono text-slate-100 rounded px-2.5 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="">Selecione um Agente...</option>
                {characters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Nv {c.level})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {partyCharacters.length === 0 ? (
          <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-8 text-center text-slate-500">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-30 text-slate-400" />
            <p className="text-sm font-medium">Nenhum agente vinculado a esta mesa ainda.</p>
            <p className="text-xs text-slate-600 mt-1">
              Selecione um personagem na barra superior para entrar na operação.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partyCharacters.map((char) => {
              const charState = getCampaignCharacterState(currentCampaign.id, char.id);
              const charStats = calculateAgentStats(char, charState);
              const isMine = char.id === activeCharacter?.id;
              const canView = isGM || isMine || char.isPublic;

              return (
                <div
                  key={char.id}
                  className={`bg-limiar-900 border rounded-xl p-4 shadow-lg flex flex-col justify-between transition ${
                    isMine
                      ? 'border-cyan-500/60 ring-1 ring-cyan-500/20'
                      : 'border-limiar-800 hover:border-limiar-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Cabeçalho do Card */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-bold text-base text-slate-100">
                            {char.name}
                          </h4>
                          {isMine && (
                            <span className="text-[10px] font-mono px-1.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                              Você
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {char.rank} · Nv {char.level} · {char.playerName}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {char.isPublic ? (
                          <span
                            className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1"
                            title="Ficha Pública: colegas podem visualizar"
                          >
                            <Eye className="w-3 h-3" /> Pública
                          </span>
                        ) : (
                          <span
                            className="p-1 rounded bg-limiar-800 text-slate-400 text-[10px] font-mono flex items-center gap-1"
                            title="Ficha Privada: visível apenas para o Mestre e o dono"
                          >
                            <EyeOff className="w-3 h-3" /> Privada
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mostrador de Contágio & Aferidor Compacto */}
                    <div className="bg-limiar-950 p-2.5 rounded-lg border border-limiar-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono text-slate-400">AFERIDOR:</span>
                        <span className={`font-mono font-bold text-xs ${charStats.contagionStage.colorClass}`}>
                          {charState.contagion}% ({charStats.contagionStage.label.toUpperCase()})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-limiar-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            charState.contagion >= 90
                              ? 'bg-red-600 animate-pulse'
                              : charState.contagion >= 50
                              ? 'bg-amber-500'
                              : 'bg-cyan-500'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(2, charState.contagion))}%` }}
                        />
                      </div>
                    </div>

                    {/* Barras de Status (PV, PE, MEN) */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                      <div className="bg-limiar-850 p-1.5 rounded border border-limiar-800">
                        <span className="text-[10px] text-rose-400 block font-bold">PV</span>
                        <span className="font-bold text-slate-100">
                          {charState.currentPV}/{charStats.maxPV}
                        </span>
                      </div>
                      <div className="bg-limiar-850 p-1.5 rounded border border-limiar-800">
                        <span className="text-[10px] text-amber-400 block font-bold">PE</span>
                        <span className="font-bold text-slate-100">
                          {charState.currentPE}/{charStats.maxPE}
                        </span>
                      </div>
                      <div className="bg-limiar-850 p-1.5 rounded border border-limiar-800">
                        <span className="text-[10px] text-cyan-400 block font-bold">MEN</span>
                        <span className="font-bold text-slate-100">
                          {charState.currentMEN}/{charStats.maxMEN}
                        </span>
                      </div>
                    </div>

                    {/* Condições ativas */}
                    {charState.conditions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {charState.conditions.map((cond) => (
                          <span
                            key={cond}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40 font-mono"
                          >
                            {cond}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* MESTRE: CONTROLE RÁPIDO DE STATUS */}
                    {isGM && (
                      <div className="pt-2 border-t border-limiar-800 space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-500 block">
                          CONTROLE DO MESTRE:
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateCampaignCharacterState(currentCampaign.id, char.id, {
                                currentPV: Math.max(0, charState.currentPV - 5),
                              })
                            }
                            className="flex-1 py-1 bg-limiar-800 hover:bg-rose-950 text-rose-300 rounded text-[10px] font-mono"
                            title="-5 PV"
                          >
                            -5 PV
                          </button>
                          <button
                            onClick={() =>
                              updateCampaignCharacterState(currentCampaign.id, char.id, {
                                currentPV: Math.min(charStats.maxPV, charState.currentPV + 5),
                              })
                            }
                            className="flex-1 py-1 bg-limiar-800 hover:bg-emerald-950 text-emerald-300 rounded text-[10px] font-mono"
                            title="+5 PV"
                          >
                            +5 PV
                          </button>
                          <button
                            onClick={() =>
                              updateCampaignCharacterState(
                                currentCampaign.id,
                                char.id,
                                { contagion: Math.min(100, charState.contagion + 2) },
                                { change: 2, reason: 'Exposição pelo Mestre' }
                              )
                            }
                            className="flex-1 py-1 bg-limiar-800 hover:bg-amber-950 text-amber-300 rounded text-[10px] font-mono"
                            title="+2% Contágio"
                          >
                            +2% Cont.
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ação de Abrir Ficha */}
                  <div className="pt-3 mt-3 border-t border-limiar-800 flex justify-end">
                    {canView ? (
                      <button
                        onClick={() => onOpenCharacterSheet(char, !isGM && !isMine)}
                        className={`w-full py-2 rounded-lg font-display font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 ${
                          isMine || isGM
                            ? 'bg-limiar-800 hover:bg-limiar-red text-white'
                            : 'bg-limiar-850 hover:bg-limiar-800 text-slate-300 border border-limiar-700'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        {isMine || isGM ? 'ABRIR & GERENCIAR FICHA' : 'VISUALIZAR FICHA PÚBLICA'}
                      </button>
                    ) : (
                      <div className="w-full text-center py-1.5 text-xs text-slate-500 italic font-mono">
                        Ficha Privada pelo Jogador
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
