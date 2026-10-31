import React, { useState } from 'react';
import { Weapon, Gift, Affinity, DamageType, WeaponCategory, WeaponProperty } from '../types/limiar';
import { useLimiar } from '../context/LimiarContext';
import {
  Swords,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Shield,
  Zap,
  Flame,
  Radio,
  Eye,
  Crosshair,
  Package,
  Wrench,
  Dices,
  BookOpen,
} from 'lucide-react';

export const Compendium: React.FC = () => {
  const {
    weapons,
    createWeapon,
    deleteWeapon,
    gifts,
    createGift,
    deleteGift,
    activeCharacter,
    updateCharacter,
    currentUser,
  } = useLimiar();

  const [activeSubTab, setActiveSubTab] = useState<'armas' | 'dons' | 'oficina_dons'>('armas');

  // Filtros
  const [weaponCategoryFilter, setWeaponCategoryFilter] = useState<string>('todas');
  const [giftAffinityFilter, setGiftAffinityFilter] = useState<string>('todas');

  // Modal para Criar Arma Homebrew
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [newWeapon, setNewWeapon] = useState<Partial<Weapon>>({
    name: '',
    category: 'uma_mao',
    damageDice: '1d8',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 1,
    properties: ['uma_mao'],
    magCapacity: undefined,
    contagionCostPerScene: 0,
    description: '',
  });

  // Estado do Construtor do Capítulo 32 (Oficina de Dons)
  const [builderAffinity, setBuilderAffinity] = useState<Affinity>('carne');
  const [builderName, setBuilderName] = useState('');
  const [builderEffectType, setBuilderEffectType] = useState<
    'dano' | 'cura_pv' | 'cura_mente' | 'rd' | 'condicao' | 'teleporte' | 'ilusao' | 'outro'
  >('dano');
  const [builderDamageDice, setBuilderDamageDice] = useState<number>(2); // 2d6
  const [builderCondition, setBuilderCondition] = useState<string>('Abalado');
  const [builderAction, setBuilderAction] = useState<'Padrão' | 'Movimento' | 'Reação' | 'Livre'>('Padrão');
  const [builderRange, setBuilderRange] = useState<'Pessoal' | 'Toque' | 'Curto' | 'Médio' | 'Longo' | 'Extremo'>('Curto');
  const [builderArea, setBuilderArea] = useState<string>('1 alvo');
  const [builderDuration, setBuilderDuration] = useState<'Instantânea' | '3 rodadas' | 'Uma cena' | 'Uma hora' | 'Concentração'>('Instantânea');
  const [builderEnhancements, setBuilderEnhancements] = useState<string[]>([]);
  const [builderLimiters, setBuilderLimiters] = useState<string[]>([]);
  const [builderSignature, setBuilderSignature] = useState('');
  const [builderDescription, setBuilderDescription] = useState('');

  // Cálculo automático do custo do Dom pelo Capítulo 32
  const calculateBuilderCost = (): { peCost: number; baseCost: number; extraContagion: number } => {
    let baseCost = 2;

    // Efeito base
    if (builderEffectType === 'dano') {
      baseCost = 1 + Math.ceil(builderDamageDice / 2);
    } else if (builderEffectType === 'cura_pv' || builderEffectType === 'cura_mente') {
      baseCost = 2;
    } else if (builderEffectType === 'rd') {
      baseCost = 3; // RD 5
    } else if (builderEffectType === 'condicao') {
      if (['Abalado', 'Fraco', 'Lento', 'Caído'].includes(builderCondition)) baseCost = 2;
      else if (['Cego', 'Imóvel', 'Apavorado', 'Fascinado'].includes(builderCondition)) baseCost = 3;
      else if (['Confuso', 'Enjoado', 'Atordoado'].includes(builderCondition)) baseCost = 4;
      else if (builderCondition === 'Paralisado') baseCost = 5;
      else baseCost = 3;
    } else if (builderEffectType === 'teleporte') {
      baseCost = 2; // até 9 m
    } else if (builderEffectType === 'ilusao') {
      baseCost = 2;
    }

    // Parâmetros de ação
    let actionCost = 0;
    if (builderAction === 'Movimento') actionCost = 1;
    else if (builderAction === 'Reação') actionCost = 2;
    else if (builderAction === 'Livre') actionCost = 3;

    // Alcance
    let rangeCost = 0;
    if (builderRange === 'Toque') rangeCost = -1;
    else if (builderRange === 'Médio') rangeCost = 1;
    else if (builderRange === 'Longo') rangeCost = 2;
    else if (builderRange === 'Extremo') rangeCost = 3;

    // Área
    let areaCost = 0;
    if (builderArea === 'Até 3 alvos' || builderArea === 'Esfera 6 m') areaCost = 1;
    else if (builderArea === 'Esfera 12 m') areaCost = 2;

    // Duração
    let durationCost = 0;
    if (builderDuration === '3 rodadas' || builderDuration === 'Uma cena') durationCost = 1;
    else if (builderDuration === 'Uma hora') durationCost = 2;
    else if (builderDuration === 'Concentração') durationCost = -1;

    // Aprimoramentos
    let enhCost = 0;
    if (builderEnhancements.includes('Penetrante (ignora RD)')) enhCost += 2;
    if (builderEnhancements.includes('Persistente (+1d6/rodada por 3 rodadas)')) enhCost += 2;
    if (builderEnhancements.includes('Impacto (empurra 3 m ou derruba)')) enhCost += 1;
    if (builderEnhancements.includes('DT +2')) enhCost += 1;
    if (builderEnhancements.includes('Silencioso (quase imperceptível)')) enhCost += 1;

    // Limitadores
    let limCost = 0;
    let extraContagion = 0;
    if (builderLimiters.includes('Recarga (1x por cena)')) limCost -= 2;
    if (builderLimiters.includes('Esforço (sofre 1d6 dano ao usar)')) limCost -= 2;
    if (builderLimiters.includes('Contagiante (-1 PE: +1% contágio extra)')) {
      limCost -= 1;
      extraContagion += 1;
    }
    if (builderLimiters.includes('Foco (exige objeto visível)')) limCost -= 1;
    if (builderLimiters.includes('Preparação (ação de movimento prévia)')) limCost -= 1;

    // Limitadores máx -4
    const clampedLim = Math.max(-4, limCost);

    const total = Math.max(1, baseCost + actionCost + rangeCost + areaCost + durationCost + enhCost + clampedLim);

    return { peCost: total, baseCost, extraContagion };
  };

  const handleSaveBuiltGift = () => {
    if (!builderName.trim()) {
      alert('Dê um nome para o Dom criado.');
      return;
    }

    const { peCost, extraContagion } = calculateBuilderCost();

    let baseEffectText = '';
    if (builderEffectType === 'dano') {
      baseEffectText = `Causa ${builderDamageDice}d6 de dano de afinidade. Alvo resiste com teste adequado (metade no sucesso).`;
    } else if (builderEffectType === 'cura_pv') {
      baseEffectText = `Um aliado recupera 2d6 PV.`;
    } else if (builderEffectType === 'cura_mente') {
      baseEffectText = `Um aliado recupera 2d6 de Mente e remove condições de medo.`;
    } else if (builderEffectType === 'rd') {
      baseEffectText = `Concede RD 5 contra dano físico ou de energia por uma cena.`;
    } else if (builderEffectType === 'condicao') {
      baseEffectText = `Alvo faz teste de resistência da Afinidade; em falha sofre a condição ${builderCondition}.`;
    } else if (builderEffectType === 'teleporte') {
      baseEffectText = `Teleporta o agente ou alvo até a distância indicada em linha de visão.`;
    } else {
      baseEffectText = builderDescription || 'Efeito criado na Oficina de Dons.';
    }

    createGift({
      name: builderName,
      affinity: builderAffinity,
      minLevel: peCost >= 5 ? 8 : peCost >= 3 ? 3 : 1,
      domainLevel: 1,
      baseEffect: baseEffectText,
      action: builderAction,
      range: builderRange,
      targetArea: builderArea,
      duration: builderDuration,
      enhancements: builderEnhancements,
      limiters: builderLimiters,
      peCost,
      extraContagion,
      signature: builderSignature || 'Manifestação anômala de luz e vibração.',
      description: builderDescription,
      isHomebrew: true,
    });

    alert(`Dom "${builderName}" criado com sucesso e adicionado ao Compêndio! (Custo: ${peCost} PE)`);
    setBuilderName('');
    setActiveSubTab('dons');
  };

  // Alternar equipar/desequipar arma no personagem ativo
  const toggleEquipWeapon = (weaponId: string) => {
    if (!activeCharacter) return;
    const has = activeCharacter.equippedWeaponIds.includes(weaponId);
    const newEquipped = has
      ? activeCharacter.equippedWeaponIds.filter((id) => id !== weaponId)
      : [...activeCharacter.equippedWeaponIds, weaponId];

    updateCharacter(activeCharacter.id, { equippedWeaponIds: newEquipped });
  };

  // Alternar aprender/esquecer dom no personagem ativo
  const toggleLearnGift = (giftId: string) => {
    if (!activeCharacter) return;
    const has = activeCharacter.knownGiftIds.includes(giftId);
    const newKnown = has
      ? activeCharacter.knownGiftIds.filter((id) => id !== giftId)
      : [...activeCharacter.knownGiftIds, giftId];

    updateCharacter(activeCharacter.id, { knownGiftIds: newKnown });
  };

  const filteredWeapons = weapons.filter((w) => {
    if (weaponCategoryFilter === 'todas') return true;
    if (weaponCategoryFilter === 'fendidas') return w.properties.includes('fendida');
    if (weaponCategoryFilter === 'fogo') return ['pistola', 'revolver', 'submetralhadora', 'rifle', 'espingarda', 'rifle_precisao'].includes(w.category);
    if (weaponCategoryFilter === 'brancas') return ['corpo_a_corpo_leve', 'uma_mao', 'duas_maos', 'haste', 'desarmado'].includes(w.category);
    return true;
  });

  const filteredGifts = gifts.filter((g) => {
    if (giftAffinityFilter === 'todas') return true;
    return g.affinity === giftAffinityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header do Compêndio */}
      <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-limiar-amber" /> COMPÊNDIO DA ACADEMIA MERIDIANO
          </h2>
          <p className="text-xs text-slate-400">
            Armaria oficial, armas fendidas e catálogo de Dons Despertos. Itens criados aqui podem ser equipados por qualquer personagem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeCharacter && (
            <span className="text-xs font-mono text-slate-400 bg-limiar-850 px-2.5 py-1 rounded border border-limiar-700">
              Equipando em: <strong className="text-cyan-400">{activeCharacter.name}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Navegação entre Sub-abas */}
      <div className="flex border-b border-limiar-800 gap-2">
        <button
          onClick={() => setActiveSubTab('armas')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-2 ${
            activeSubTab === 'armas'
              ? 'border-amber-400 text-amber-300 bg-limiar-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Swords className="w-4 h-4" /> ARMARIA & EQUIPAMENTO ({weapons.length})
        </button>
        <button
          onClick={() => setActiveSubTab('dons')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-2 ${
            activeSubTab === 'dons'
              ? 'border-cyan-400 text-cyan-300 bg-limiar-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" /> CATÁLOGO DE DONS ({gifts.length})
        </button>
        <button
          onClick={() => setActiveSubTab('oficina_dons')}
          className={`py-2 px-4 font-display font-bold text-sm tracking-wide border-b-2 transition flex items-center gap-2 ${
            activeSubTab === 'oficina_dons'
              ? 'border-limiar-red text-rose-300 bg-limiar-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" /> OFICINA DE DONS (CAP. 32)
        </button>
      </div>

      {/* SUB-ABA 1: ARMARIA */}
      {activeSubTab === 'armas' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filtros */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Filtro:</span>
              {[
                { id: 'todas', label: 'Todas' },
                { id: 'fendidas', label: 'Fendidas (Resíduo)' },
                { id: 'brancas', label: 'Armas Brancas' },
                { id: 'fogo', label: 'Armas de Fogo' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setWeaponCategoryFilter(f.id)}
                  className={`px-2.5 py-1 rounded font-mono transition ${
                    weaponCategoryFilter === f.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-limiar-850 text-slate-300 hover:bg-limiar-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowWeaponModal(true)}
              className="px-3 py-1.5 bg-limiar-red hover:bg-red-700 text-white font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> CRIAR NOVA ARMA (HOMEBREW)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredWeapons.map((wp) => {
              const isEquipped = activeCharacter?.equippedWeaponIds.includes(wp.id);

              return (
                <div
                  key={wp.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
                    wp.properties.includes('fendida')
                      ? 'bg-purple-950/20 border-purple-500/40 hover:border-purple-400'
                      : 'bg-limiar-850 border-limiar-800 hover:border-limiar-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-100">{wp.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {wp.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                      {wp.contagionCostPerScene ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                          +{wp.contagionCostPerScene}% Contágio
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-x-2 text-xs font-mono text-slate-300">
                      <span>Dano: <strong className="text-rose-400">{wp.damageDice}</strong></span>
                      <span>•</span>
                      <span>Tipo: <strong className="text-amber-400">{wp.damageType}</strong></span>
                      <span>•</span>
                      <span>Alcance: {wp.range}</span>
                    </div>

                    {wp.magCapacity && (
                      <div className="text-xs font-mono text-slate-400">
                        Capacidade do Pente: <strong className="text-slate-200">{wp.magCapacity} disparos</strong>
                      </div>
                    )}

                    {wp.description && (
                      <p className="text-xs text-slate-400 italic line-clamp-2">{wp.description}</p>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {wp.properties.map((prop) => (
                        <span key={prop} className="text-[9px] px-1 rounded bg-limiar-800 text-slate-400 font-mono">
                          {prop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activeCharacter && (
                    <div className="pt-3 mt-2 border-t border-limiar-800 flex justify-end">
                      <button
                        onClick={() => toggleEquipWeapon(wp.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition ${
                          isEquipped
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-limiar-800 hover:bg-limiar-700 text-slate-200'
                        }`}
                      >
                        {isEquipped ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Equipado
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Equipar no Agente
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-ABA 2: CATÁLOGO DE DONS */}
      {activeSubTab === 'dons' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Filtros de Afinidade */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-mono mr-1">Afinidade:</span>
              {[
                { id: 'todas', label: 'Todas' },
                { id: 'carne', label: 'Carne' },
                { id: 'eco', label: 'Eco' },
                { id: 'brasa', label: 'Brasa' },
                { id: 'vazio', label: 'Vazio' },
                { id: 'veu', label: 'Véu' },
              ].map((af) => (
                <button
                  key={af.id}
                  onClick={() => setGiftAffinityFilter(af.id)}
                  className={`px-2.5 py-1 rounded font-mono uppercase transition ${
                    giftAffinityFilter === af.id
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-limiar-850 text-slate-300 hover:bg-limiar-800'
                  }`}
                >
                  {af.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveSubTab('oficina_dons')}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition"
            >
              <Wrench className="w-4 h-4" /> ABRIR OFICINA DO CAP. 32
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredGifts.map((gift) => {
              const isKnown = activeCharacter?.knownGiftIds.includes(gift.id);

              return (
                <div
                  key={gift.id}
                  className="p-3.5 bg-limiar-850 border border-limiar-800 hover:border-cyan-500/40 rounded-xl flex flex-col justify-between transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-100">{gift.name}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                          {gift.affinity}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                        {gift.peCost} PE
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-2 text-[11px] font-mono text-slate-400">
                      <span>{gift.action}</span>
                      <span>•</span>
                      <span>{gift.range}</span>
                      <span>•</span>
                      <span>{gift.targetArea}</span>
                    </div>

                    <p className="text-xs text-slate-300">{gift.baseEffect}</p>

                    <p className="text-[11px] text-slate-400 italic">
                      "{gift.signature}"
                    </p>
                  </div>

                  {activeCharacter && (
                    <div className="pt-3 mt-2 border-t border-limiar-800 flex justify-end">
                      <button
                        onClick={() => toggleLearnGift(gift.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold flex items-center gap-1.5 transition ${
                          isKnown
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-limiar-800 hover:bg-limiar-700 text-slate-200'
                        }`}
                      >
                        {isKnown ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> No Repertório
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Adicionar ao Agente
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-ABA 3: OFICINA DE DONS (SISTEMA MATEMÁTICO OFICIAL DO CAPÍTULO 32) */}
      {activeSubTab === 'oficina_dons' && (
        <div className="bg-limiar-900 border border-limiar-800 rounded-xl p-5 space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-limiar-red" /> OFICINA DE CRIAÇÃO DE DONS (CAPÍTULO 32)
            </h3>
            <p className="text-xs text-slate-400">
              Crie Dons balanceados seguindo fielmente as fórmulas matemáticas do livro LIMIAR. O sistema calcula o custo final em PE em tempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1: Conceito, Afinidade e Efeito Base */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">1. NOME DO DOM</label>
                <input
                  type="text"
                  value={builderName}
                  onChange={(e) => setBuilderName(e.target.value)}
                  placeholder="Ex: Pulso Devorador, Lâmina de Sangue..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">2. AFINIDADE</label>
                <div className="grid grid-cols-5 gap-2">
                  {(['carne', 'eco', 'brasa', 'vazio', 'veu'] as Affinity[]).map((af) => (
                    <button
                      key={af}
                      type="button"
                      onClick={() => setBuilderAffinity(af)}
                      className={`py-1.5 rounded text-xs font-mono font-bold uppercase transition ${
                        builderAffinity === af
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'bg-limiar-850 text-slate-400 hover:bg-limiar-800'
                      }`}
                    >
                      {af}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">3. EFEITO BASE</label>
                <select
                  value={builderEffectType}
                  onChange={(e) => setBuilderEffectType(e.target.value as any)}
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400"
                >
                  <option value="dano">Dano Direto (1 + metade do número de d6)</option>
                  <option value="cura_pv">Cura de PV (2d6 - 2 PE)</option>
                  <option value="cura_mente">Cura de Mente / Sanidade (2d6 - 2 PE)</option>
                  <option value="rd">Proteção: RD 5 contra um tipo (3 PE)</option>
                  <option value="condicao">Controle: Aplicar Condição</option>
                  <option value="teleporte">Movimento: Teleporte até 9 m (2 PE)</option>
                  <option value="ilusao">Ilusão ou Disfarce (2 PE)</option>
                  <option value="outro">Efeito Customizado</option>
                </select>
              </div>

              {builderEffectType === 'dano' && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Quantidade de Dano ({builderDamageDice}d6):
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={builderDamageDice}
                    onChange={(e) => setBuilderDamageDice(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>1d6 (2 PE)</span>
                    <span>4d6 (3 PE)</span>
                    <span>6d6 (4 PE)</span>
                    <span>12d6 (7 PE)</span>
                  </div>
                </div>
              )}

              {builderEffectType === 'condicao' && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Condição a aplicar:</label>
                  <select
                    value={builderCondition}
                    onChange={(e) => setBuilderCondition(e.target.value)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100"
                  >
                    <option value="Abalado">Abalado (Potência 1 - 2 PE)</option>
                    <option value="Lento">Lento (Potência 1 - 2 PE)</option>
                    <option value="Caído">Caído (Potência 1 - 2 PE)</option>
                    <option value="Cego">Cego (Potência 2 - 3 PE)</option>
                    <option value="Apavorado">Apavorado (Potência 2 - 3 PE)</option>
                    <option value="Fascinado">Fascinado (Potência 2 - 3 PE)</option>
                    <option value="Confuso">Confuso (Potência 3 - 4 PE)</option>
                    <option value="Atordoado">Atordoado (Potência 3 - 4 PE)</option>
                    <option value="Paralisado">Paralisado (Potência 4 - 5 PE)</option>
                  </select>
                </div>
              )}

              {/* Assinatura Sensorial */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  ASSINATURA SENSORIAL (O que se vê, ouve ou sente)
                </label>
                <input
                  type="text"
                  value={builderSignature}
                  onChange={(e) => setBuilderSignature(e.target.value)}
                  placeholder="Ex: O ar congela e as lâmpadas piscam com estalos azuis."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Coluna 2: Parâmetros, Modificadores e Resumo */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Ação</label>
                  <select
                    value={builderAction}
                    onChange={(e) => setBuilderAction(e.target.value as any)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-100"
                  >
                    <option value="Padrão">Padrão (+0 PE)</option>
                    <option value="Movimento">Movimento (+1 PE)</option>
                    <option value="Reação">Reação (+2 PE)</option>
                    <option value="Livre">Livre (+3 PE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Alcance</label>
                  <select
                    value={builderRange}
                    onChange={(e) => setBuilderRange(e.target.value as any)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-100"
                  >
                    <option value="Pessoal">Pessoal (+0 PE)</option>
                    <option value="Toque">Toque (-1 PE)</option>
                    <option value="Curto">Curto 9 m (+0 PE)</option>
                    <option value="Médio">Médio 18 m (+1 PE)</option>
                    <option value="Longo">Longo 36 m (+2 PE)</option>
                    <option value="Extremo">Extremo 90 m (+3 PE)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Área / Alvos</label>
                  <select
                    value={builderArea}
                    onChange={(e) => setBuilderArea(e.target.value)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-100"
                  >
                    <option value="1 alvo">1 alvo (+0 PE)</option>
                    <option value="Até 3 alvos">Até 3 alvos (+1 PE)</option>
                    <option value="Esfera 6 m">Esfera 6 m (+1 PE)</option>
                    <option value="Esfera 12 m">Esfera 12 m (+2 PE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Duração</label>
                  <select
                    value={builderDuration}
                    onChange={(e) => setBuilderDuration(e.target.value as any)}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-100"
                  >
                    <option value="Instantânea">Instantânea (+0 PE)</option>
                    <option value="3 rodadas">3 rodadas (+1 PE)</option>
                    <option value="Uma cena">Uma cena (+1 PE)</option>
                    <option value="Uma hora">Uma hora (+2 PE)</option>
                    <option value="Concentração">Concentração (-1 PE)</option>
                  </select>
                </div>
              </div>

              {/* Aprimoramentos & Limitadores */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Aprimoramentos (Aumentam Custo) & Limitadores (Reduzem Custo):
                </label>
                <div className="grid grid-cols-1 gap-1.5 text-xs max-h-36 overflow-y-auto pr-1">
                  {[
                    'Penetrante (ignora RD) [+2 PE]',
                    'Persistente (+1d6/rodada por 3 rodadas) [+2 PE]',
                    'Impacto (empurra 3 m ou derruba) [+1 PE]',
                    'DT +2 [+1 PE]',
                    'Recarga (1x por cena) [-2 PE]',
                    'Esforço (sofre 1d6 dano ao usar) [-2 PE]',
                    'Contagiante (-1 PE: +1% contágio extra)',
                    'Foco (exige objeto visível) [-1 PE]',
                    'Preparação (ação de movimento prévia) [-1 PE]',
                  ].map((mod) => {
                    const rawName = mod.split(' [')[0];
                    const isSelected =
                      builderEnhancements.includes(rawName) || builderLimiters.includes(rawName);

                    return (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => {
                          if (mod.includes('[-')) {
                            setBuilderLimiters((prev) =>
                              prev.includes(rawName) ? prev.filter((m) => m !== rawName) : [...prev, rawName]
                            );
                          } else {
                            setBuilderEnhancements((prev) =>
                              prev.includes(rawName) ? prev.filter((m) => m !== rawName) : [...prev, rawName]
                            );
                          }
                        }}
                        className={`text-left px-2.5 py-1 rounded border text-[11px] font-mono transition ${
                          isSelected
                            ? mod.includes('[-')
                              ? 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-limiar-850 border-limiar-800 text-slate-400 hover:bg-limiar-800'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {mod}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caixa de Custo Final */}
              <div className="bg-limiar-950 p-4 rounded-xl border border-limiar-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-mono block">CUSTO FINAL EM PE:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-black text-amber-400">
                      {calculateBuilderCost().peCost} PE
                    </span>
                    {calculateBuilderCost().extraContagion > 0 && (
                      <span className="text-xs font-mono text-purple-400">
                        (+{calculateBuilderCost().extraContagion}% Contágio extra por uso)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveBuiltGift}
                  className="px-4 py-2.5 bg-gradient-to-r from-limiar-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-display font-bold text-sm tracking-wide rounded-lg shadow-glow-red transition"
                >
                  FORJAR DOM 🔮
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA CRIAR NOVA ARMA HOMEBREW */}
      {showWeaponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-limiar-900 border border-limiar-700 rounded-xl p-6 text-slate-100 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" /> FORJAR NOVA ARMA (HOMEBREW)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nome da Arma</label>
                <input
                  type="text"
                  value={newWeapon.name}
                  onChange={(e) => setNewWeapon({ ...newWeapon, name: e.target.value })}
                  placeholder="Ex: Fuzil de Pulso Pesado, Katana de Resíduo..."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Categoria</label>
                  <select
                    value={newWeapon.category}
                    onChange={(e) => setNewWeapon({ ...newWeapon, category: e.target.value as any })}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2.5 py-1.5"
                  >
                    <option value="corpo_a_corpo_leve">Corpo a Corpo Leve</option>
                    <option value="uma_mao">Uma Mão</option>
                    <option value="duas_maos">Duas Mãos</option>
                    <option value="haste">Haste</option>
                    <option value="pistola">Pistola</option>
                    <option value="revolver">Revólver</option>
                    <option value="submetralhadora">Submetralhadora</option>
                    <option value="rifle">Rifle</option>
                    <option value="espingarda">Espingarda</option>
                    <option value="rifle_precisao">Rifle de Precisão</option>
                    <option value="arco_besta">Arco ou Besta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Dano (Dados)</label>
                  <input
                    type="text"
                    value={newWeapon.damageDice}
                    onChange={(e) => setNewWeapon({ ...newWeapon, damageDice: e.target.value })}
                    placeholder="Ex: 1d8, 2d6, 2d8"
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2.5 py-1.5 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Tipo de Dano</label>
                  <select
                    value={newWeapon.damageType}
                    onChange={(e) => setNewWeapon({ ...newWeapon, damageType: e.target.value as any })}
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5"
                  >
                    <option value="cortante">Cortante</option>
                    <option value="perfurante">Perfurante</option>
                    <option value="contundente">Contundente</option>
                    <option value="balistico">Balístico</option>
                    <option value="fogo">Fogo</option>
                    <option value="eletrico">Elétrico</option>
                    <option value="fendido">Fendido (Resíduo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Pente (Munição)</label>
                  <input
                    type="number"
                    value={newWeapon.magCapacity || ''}
                    onChange={(e) =>
                      setNewWeapon({
                        ...newWeapon,
                        magCapacity: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    placeholder="Opcional"
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Contágio (% / cena)</label>
                  <input
                    type="number"
                    value={newWeapon.contagionCostPerScene || 0}
                    onChange={(e) =>
                      setNewWeapon({
                        ...newWeapon,
                        contagionCostPerScene: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                    className="w-full bg-limiar-850 border border-limiar-700 rounded px-2 py-1.5 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Descrição</label>
                <textarea
                  value={newWeapon.description}
                  onChange={(e) => setNewWeapon({ ...newWeapon, description: e.target.value })}
                  rows={2}
                  placeholder="Detalhes visuais, história de forja, etc."
                  className="w-full bg-limiar-850 border border-limiar-700 rounded p-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowWeaponModal(false)}
                className="flex-1 py-2 bg-limiar-800 text-slate-300 rounded font-medium text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newWeapon.name?.trim()) return;
                  createWeapon(newWeapon);
                  setShowWeaponModal(false);
                }}
                className="flex-1 py-2 bg-limiar-red text-white rounded font-display font-bold text-xs"
              >
                Salvar Arma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
