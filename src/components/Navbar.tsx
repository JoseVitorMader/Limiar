import React, { useState } from 'react';
import { useLimiar } from '../context/LimiarContext';
import { Character } from '../types/limiar';
import {
  Shield,
  Crown,
  User,
  Users,
  Dices,
  BookOpen,
  Skull,
  Plus,
  LogIn,
  Sliders,
  Menu,
  X,
  Radio,
  Flame,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'mesa' | 'ficha' | 'compendio' | 'bestiario' | 'homebrew';
  setCurrentTab: (tab: 'mesa' | 'ficha' | 'compendio' | 'bestiario' | 'homebrew') => void;
  onOpenCreator: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCreator,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const {
    currentUser,
    switchUserRole,
    campaigns,
    currentCampaign,
    currentCampaignId,
    setCurrentCampaignId,
    createCampaign,
    joinCampaign,
    characters,
    activeCharacter,
    selectCharacterForCampaign,
    visibleRollHistory,
  } = useLimiar();

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [newCampName, setNewCampName] = useState('');
  const [newCampDesc, setNewCampDesc] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const isGM = currentUser.rolePreference === 'mestre' || (currentCampaign && currentCampaign.gmId === currentUser.id);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName.trim()) return;
    createCampaign(newCampName, newCampDesc);
    setNewCampName('');
    setNewCampDesc('');
    setShowCampaignModal(false);
  };

  const handleJoinCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    const success = joinCampaign(joinCode);
    if (success) {
      alert('Entrou na campanha com sucesso!');
      setJoinCode('');
      setShowJoinModal(false);
    } else {
      alert('Código de campanha não encontrado. Verifique e tente novamente.');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-limiar-950/90 border-b border-limiar-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-limiar-red via-red-900 to-limiar-950 border border-limiar-red/50 flex items-center justify-center text-white shadow-glow-red font-display font-black text-xl">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-slate-100">
                  LIMIAR
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-limiar-800 text-slate-400 border border-limiar-700">
                  v0.1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Academia Meridiano · RPG de Horror, Ação e Contágio
              </p>
            </div>
          </div>

          {/* Seletor de Campanhas & Mesas */}
          <div className="hidden md:flex items-center gap-2 bg-limiar-900 px-3 py-1.5 rounded-xl border border-limiar-800">
            <span className="text-xs font-mono text-slate-400">Mesa:</span>
            <select
              value={currentCampaignId}
              onChange={(e) => setCurrentCampaignId(e.target.value)}
              className="bg-transparent text-xs font-mono font-bold text-slate-200 focus:outline-none cursor-pointer max-w-[160px] truncate"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id} className="bg-limiar-900 text-slate-200">
                  {c.name} ({c.code})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowCampaignModal(true)}
              title="Criar nova campanha/mesa"
              className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-limiar-800 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              title="Entrar com código"
              className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-limiar-800 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DOIS TIPOS DE ACESSO: MESTRE vs JOGADOR */}
          <div className="flex items-center gap-1.5 bg-limiar-900 p-1 rounded-xl border border-limiar-800">
            <button
              type="button"
              onClick={() => switchUserRole('mestre')}
              className={`px-3 py-1 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition ${
                currentUser.rolePreference === 'mestre'
                  ? 'bg-amber-500 text-black shadow-glow-amber'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-850'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>MESTRE</span>
            </button>

            <button
              type="button"
              onClick={() => switchUserRole('jogador')}
              className={`px-3 py-1 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition ${
                currentUser.rolePreference === 'jogador'
                  ? 'bg-cyan-600 text-white shadow-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-850'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>JOGADOR</span>
            </button>
          </div>

          {/* Botão de Histórico / Rolagens da Mesa */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSidebar}
              className={`relative px-3 py-1.5 rounded-lg border text-xs font-display font-bold transition flex items-center gap-1.5 ${
                isSidebarOpen
                  ? 'bg-limiar-red text-white border-limiar-red shadow-glow-red'
                  : 'bg-limiar-850 border-limiar-700 text-slate-200 hover:bg-limiar-800'
              }`}
              title="Abrir histórico de rolagens e chat da mesa"
            >
              <Dices className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">ROLAGENS</span>
              {visibleRollHistory.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {visibleRollHistory.length > 99 ? '99+' : visibleRollHistory.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Barra de Navegação das Abas Principais */}
        <div className="flex items-center justify-between overflow-x-auto py-2 border-t border-limiar-850/80 gap-2">
          <nav className="flex items-center gap-1 text-xs font-display font-bold">
            <button
              onClick={() => setCurrentTab('mesa')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'mesa'
                  ? 'bg-limiar-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>MESA & PAINEL</span>
            </button>

            <button
              onClick={() => setCurrentTab('ficha')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'ficha'
                  ? 'bg-limiar-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>MINHA FICHA {activeCharacter ? `(${activeCharacter.name})` : ''}</span>
            </button>

            <button
              onClick={() => setCurrentTab('compendio')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'compendio'
                  ? 'bg-limiar-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>ARMAS & DONS</span>
            </button>

            {isGM && (
              <button
                onClick={() => setCurrentTab('bestiario')}
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  currentTab === 'bestiario'
                    ? 'bg-limiar-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-900'
                }`}
              >
                <Skull className="w-3.5 h-3.5 text-rose-400" />
                <span>BESTIÁRIO</span>
              </button>
            )}

            <button
              onClick={() => setCurrentTab('homebrew')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentTab === 'homebrew'
                  ? 'bg-limiar-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-limiar-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>HOMEBREW & DADOS</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCreator}
              className="px-3 py-1 bg-limiar-red/90 hover:bg-limiar-red text-white rounded-lg text-xs font-display font-bold flex items-center gap-1 transition shadow-glow-red"
            >
              <Plus className="w-3.5 h-3.5" /> NOVO AGENTE
            </button>
          </div>
        </div>
      </div>

      {/* Modal Criar Campanha */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateCampaign}
            className="w-full max-w-md bg-limiar-900 border border-limiar-700 rounded-xl p-5 text-slate-100 space-y-4 shadow-2xl"
          >
            <h3 className="font-display font-bold text-base text-slate-100">CRIAR NOVA MESA / CAMPANHA</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Nome da Mesa</label>
              <input
                type="text"
                value={newCampName}
                onChange={(e) => setNewCampName(e.target.value)}
                placeholder="Ex: Turma 24 - O Mistério de Vale Quieto"
                className="w-full bg-limiar-850 border border-limiar-700 rounded px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Descrição do Arco</label>
              <textarea
                value={newCampDesc}
                onChange={(e) => setNewCampDesc(e.target.value)}
                rows={2}
                placeholder="Breve resumo da missão ou fenda inicial..."
                className="w-full bg-limiar-850 border border-limiar-700 rounded p-2 text-xs text-slate-100"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCampaignModal(false)}
                className="flex-1 py-1.5 bg-limiar-800 text-slate-300 rounded text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 bg-limiar-red text-white rounded font-display font-bold text-xs"
              >
                Criar Mesa
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Entrar com Código */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleJoinCampaign}
            className="w-full max-w-md bg-limiar-900 border border-limiar-700 rounded-xl p-5 text-slate-100 space-y-4 shadow-2xl"
          >
            <h3 className="font-display font-bold text-base text-slate-100">ENTRAR EM MESA EXISTENTE</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Código da Mesa</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Ex: LM-2034"
                className="w-full bg-limiar-850 border border-limiar-700 rounded px-3 py-2 text-xs font-mono text-center text-amber-400 uppercase tracking-widest text-base"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowJoinModal(false)}
                className="flex-1 py-1.5 bg-limiar-800 text-slate-300 rounded text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 bg-cyan-600 text-white rounded font-display font-bold text-xs"
              >
                Entrar na Campanha
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};
