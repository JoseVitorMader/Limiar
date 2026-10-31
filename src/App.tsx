import React, { useState } from 'react';
import { LimiarProvider, useLimiar } from './context/LimiarContext';
import { Navbar } from './components/Navbar';
import { CampaignDashboard } from './components/CampaignDashboard';
import { CharacterSheet } from './components/CharacterSheet';
import { Compendium } from './components/Compendium';
import { Bestiary } from './components/Bestiary';
import { HomebrewManager } from './components/HomebrewManager';
import { RollsSidebar } from './components/RollsSidebar';
import { CharacterCreator } from './components/CharacterCreator';
import { Character } from './types/limiar';

const MainAppContent: React.FC = () => {
  const { activeCharacter, characters } = useLimiar();
  const [currentTab, setCurrentTab] = useState<'mesa' | 'ficha' | 'compendio' | 'bestiario' | 'homebrew'>('mesa');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Personagem sendo inspecionado na aba de ficha
  const [inspectedCharacter, setInspectedCharacter] = useState<{
    character: Character;
    isReadOnly: boolean;
  } | null>(null);

  // Ao clicar em um agente na mesa
  const handleOpenCharacter = (char: Character, isReadOnly: boolean) => {
    setInspectedCharacter({ character: char, isReadOnly });
    setCurrentTab('ficha');
  };

  // Personagem a exibir na aba Ficha: se inspecionado, usa ele; senão usa o activeCharacter, senão o primeiro disponível
  const displayCharacter = inspectedCharacter?.character || activeCharacter || characters[0];
  const isReadOnlySheet = inspectedCharacter?.isReadOnly ?? (activeCharacter ? displayCharacter.id !== activeCharacter.id : false);

  return (
    <div className="min-h-screen bg-limiar-950 text-slate-100 flex flex-col font-sans">
      {/* Barra de Navegação */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'ficha') {
            // Se o usuário clicar manualmente em "Minha Ficha", limpa inspeção de terceiros
            setInspectedCharacter(null);
          }
          setCurrentTab(tab);
        }}
        onOpenCreator={() => setIsCreatorOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'mesa' && (
          <CampaignDashboard onOpenCharacterSheet={handleOpenCharacter} />
        )}

        {currentTab === 'ficha' && (
          <div>
            {displayCharacter ? (
              <CharacterSheet character={displayCharacter} isReadOnly={isReadOnlySheet} />
            ) : (
              <div className="text-center py-16 text-slate-500">
                Nenhum personagem cadastrado. Clique em "+ Novo Agente" no topo para criar sua ficha.
              </div>
            )}
          </div>
        )}

        {currentTab === 'compendio' && <Compendium />}

        {currentTab === 'bestiario' && <Bestiary />}

        {currentTab === 'homebrew' && <HomebrewManager />}
      </main>

      {/* Rodapé Tático */}
      <footer className="border-t border-limiar-900 bg-limiar-950/80 py-4 text-center text-xs font-mono text-slate-500">
        LIMIAR — RPG de Horror, Ação e Contágio · Academia Meridiano · Edição de Trabalho 2034
      </footer>

      {/* Menu Lateral de Rolagens */}
      <RollsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Modal de Criação de Agente */}
      <CharacterCreator
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onCreated={(newChar) => {
          setInspectedCharacter(null);
          setCurrentTab('ficha');
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <LimiarProvider>
      <MainAppContent />
    </LimiarProvider>
  );
}
