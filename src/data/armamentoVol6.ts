import { Weapon, Armor, EquipmentItem } from '../types/limiar';

// ==========================================
// CAPÍTULO 69 — ARMAS BRANCAS (VOLUME 6)
// ==========================================
export const ARMAS_BRANCAS: Weapon[] = [
  // --- Armas leves (Espaços 1) ---
  {
    id: 'faca',
    name: 'Faca',
    baseWeapon: 'Faca',
    category: 'leve',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'perfurante',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'I',
    properties: ['leve', 'arremesso', 'perfurante'],
    description: 'Leve, Arremesso. Em corpo a corpo soma FOR ao dano.'
  },
  {
    id: 'soco_ingles',
    name: 'Soco inglês',
    baseWeapon: 'Soco inglês',
    category: 'leve',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['leve', 'contundente'],
    description: 'Leve. Discreto e brutal em curta distância.'
  },
  {
    id: 'cassetete',
    name: 'Cassetete',
    baseWeapon: 'Cassetete',
    category: 'leve',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['leve', 'contundente'],
    description: 'Leve; ataque não letal sem teste.'
  },
  {
    id: 'punhal',
    name: 'Punhal',
    baseWeapon: 'Punhal',
    category: 'leve',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'perfurante',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['leve', 'silenciosa', 'perfurante'],
    description: 'Leve, Silenciosa. Ideal para ataques furtivos.'
  },
  {
    id: 'faca_tatica_l',
    name: 'Faca tática (L)',
    baseWeapon: 'Faca tática',
    category: 'leve',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d6',
    damageType: 'perfurante',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'II',
    properties: ['leve', 'arremesso', 'perfurante'],
    description: 'Tática leve (L). Leve, Arremesso, Perfurante. Proficiência para Vanguarda e Operador.'
  },
  {
    id: 'lamina_retratil_l',
    name: 'Lâmina retrátil (L)',
    baseWeapon: 'Lâmina retrátil',
    category: 'leve',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d6',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'II',
    properties: ['leve', 'cortante'],
    description: 'Tática leve (L). Leve; sacar é ação livre.'
  },

  // --- Armas de uma mão (Espaços 1 a 2) ---
  {
    id: 'bastao',
    name: 'Bastão',
    baseWeapon: 'Bastão',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'versatil', 'contundente'],
    description: 'Uma mão, Versátil.'
  },
  {
    id: 'taco',
    name: 'Taco',
    baseWeapon: 'Taco',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'contundente'],
    description: 'Uma mão.'
  },
  {
    id: 'machadinha',
    name: 'Machadinha',
    baseWeapon: 'Machadinha',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'cortante',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'arremesso', 'cortante'],
    description: 'Uma mão, Arremesso.'
  },
  {
    id: 'pe_de_cabra',
    name: 'Pé de cabra',
    baseWeapon: 'Pé de cabra',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'contundente'],
    description: 'Uma mão; +1 dado em Atletismo para arrombar.'
  },
  {
    id: 'facao',
    name: 'Facão',
    baseWeapon: 'Facão',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'cortante'],
    description: 'Uma mão, Cortante.'
  },
  {
    id: 'bastao_extensivel',
    name: 'Bastão extensível',
    baseWeapon: 'Bastão extensível',
    category: 'uma_mao',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'silenciosa', 'contundente'],
    description: 'Uma mão, Silenciosa; recolhido ocupa 1 espaço. Ideal para Despertos com Dons de toque.'
  },
  {
    id: 'facao_tatico',
    name: 'Facão tático',
    baseWeapon: 'Facão tático',
    category: 'uma_mao',
    weaponProficiency: 'tatica',
    damageDice: '1d8',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'II',
    properties: ['uma_mao', 'versatil', 'cortante'],
    description: 'Uma mão, Versátil, Cortante.'
  },
  {
    id: 'martelo_de_guerra',
    name: 'Martelo de guerra',
    baseWeapon: 'Martelo de guerra',
    category: 'uma_mao',
    weaponProficiency: 'tatica',
    damageDice: '1d8',
    damageType: 'perfurante',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'II',
    properties: ['uma_mao', 'perfurante', 'contundente'],
    description: 'Uma mão, Perfurante, Contundente.'
  },
  {
    id: 'espada_curta',
    name: 'Espada curta',
    baseWeapon: 'Espada curta',
    category: 'uma_mao',
    weaponProficiency: 'tatica',
    damageDice: '1d8',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'II',
    properties: ['uma_mao', 'cortante'],
    description: 'Uma mão, Cortante. Equilíbrio de combate refinado.'
  },

  // --- Armas de duas mãos (Espaços 2 a 3) ---
  {
    id: 'marreta',
    name: 'Marreta',
    baseWeapon: 'Marreta',
    category: 'duas_maos',
    weaponProficiency: 'pesada',
    damageDice: '2d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 3,
    requisitionType: 'III',
    properties: ['duas_maos', 'pesada', 'contundente'],
    description: 'Duas mãos, Pesada, Contundente. Exige Treinamento Pesado (FOR 2).'
  },
  {
    id: 'machado',
    name: 'Machado',
    baseWeapon: 'Machado',
    category: 'duas_maos',
    weaponProficiency: 'tatica',
    damageDice: '2d6',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'cortante'],
    description: 'Duas mãos, Cortante.'
  },
  {
    id: 'espada_longa',
    name: 'Espada longa',
    baseWeapon: 'Espada longa',
    category: 'duas_maos',
    weaponProficiency: 'tatica',
    damageDice: '2d6',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'versatil', 'cortante'],
    description: 'Duas mãos, Versátil, Cortante.'
  },
  {
    id: 'tacape_de_ferro',
    name: 'Tacape de ferro',
    baseWeapon: 'Tacape de ferro',
    category: 'duas_maos',
    weaponProficiency: 'tatica',
    damageDice: '2d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'contundente'],
    description: 'Duas mãos, Contundente.'
  },
  {
    id: 'motosserra',
    name: 'Motosserra',
    baseWeapon: 'Motosserra',
    category: 'duas_maos',
    weaponProficiency: 'pesada',
    damageDice: '3d6',
    damageType: 'cortante',
    range: 'Adjacente',
    spaces: 3,
    requisitionType: 'III',
    properties: ['duas_maos', 'pesada', 'cortante'],
    description: 'Duas mãos, Pesada, Barulhenta (–2 em Furtividade). Dano brutal.'
  },
  {
    id: 'foice',
    name: 'Foice',
    baseWeapon: 'Foice',
    category: 'duas_maos',
    weaponProficiency: 'tatica',
    damageDice: '2d6',
    damageType: 'cortante',
    range: '3 m',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'haste', 'cortante'],
    description: 'Duas mãos, Alcance 3 m (–1 dado contra alvo diretamente adjacente).'
  },

  // --- Armas de haste (Espaços 1 a 3) ---
  {
    id: 'lanca_curta',
    name: 'Lança curta',
    baseWeapon: 'Lança curta',
    category: 'haste',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'perfurante',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'I',
    properties: ['uma_mao', 'arremesso', 'perfurante'],
    description: 'Uma mão, Arremesso, Perfurante.'
  },
  {
    id: 'lanca',
    name: 'Lança',
    baseWeapon: 'Lança',
    category: 'haste',
    weaponProficiency: 'tatica',
    damageDice: '1d10',
    damageType: 'perfurante',
    range: '3 m',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'haste', 'perfurante'],
    description: 'Duas mãos, Alcance 3 m, Perfurante.'
  },
  {
    id: 'alabarda',
    name: 'Alabarda',
    baseWeapon: 'Alabarda',
    category: 'haste',
    weaponProficiency: 'tatica',
    damageDice: '1d10',
    damageType: 'cortante',
    range: '3 m',
    spaces: 3,
    requisitionType: 'II',
    properties: ['duas_maos', 'haste', 'cortante'],
    description: 'Duas mãos, Alcance 3 m, Cortante.'
  },
  {
    id: 'bastao_de_combate',
    name: 'Bastão de combate',
    baseWeapon: 'Bastão de combate',
    category: 'haste',
    weaponProficiency: 'tatica',
    damageDice: '1d10',
    damageType: 'contundente',
    range: '3 m',
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'haste', 'versatil', 'contundente'],
    description: 'Duas mãos, Alcance 3 m, Versátil.'
  },

  // --- Armas improvisadas ---
  {
    id: 'garrafa_cadeira',
    name: 'Garrafa / Cadeira leve',
    baseWeapon: 'Garrafa / Cadeira',
    category: 'improvisada',
    weaponProficiency: 'simples',
    damageDice: '1d4',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: '—',
    properties: ['contundente'],
    description: 'Quebra no Destaque.'
  },
  {
    id: 'cano_tubo',
    name: 'Cano / Tubo / Enxada',
    baseWeapon: 'Cano',
    category: 'improvisada',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: '—',
    properties: ['uma_mao', 'contundente'],
    description: 'Uma mão. Impõe –1 dado no teste de ataque.'
  },
  {
    id: 'ferramenta_pesada',
    name: 'Ferramenta pesada',
    baseWeapon: 'Ferramenta pesada',
    category: 'improvisada',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: '—',
    properties: ['duas_maos', 'contundente'],
    description: 'Duas mãos. Impõe –1 dado no teste de ataque.'
  },
  {
    id: 'extintor',
    name: 'Extintor',
    baseWeapon: 'Extintor',
    category: 'improvisada',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'contundente',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: '—',
    properties: ['duas_maos', 'contundente'],
    description: 'Pode ser usado para fazer fumaça (ação padrão: esfera 3 m, camuflagem total por 2 rodadas).'
  }
];

// ==========================================
// CAPÍTULO 70 — ARMAS DE FOGO E À DISTÂNCIA
// ==========================================
export const ARMAS_DISTANCIA: Weapon[] = [
  // --- Pistolas e revólveres ---
  {
    id: 'pistola',
    name: 'Pistola',
    baseWeapon: 'Pistola',
    category: 'pistola',
    weaponProficiency: 'simples',
    damageDice: '1d10',
    damageType: 'balistico',
    range: 'Curto / Médio',
    magCapacity: 12,
    spaces: 1,
    requisitionType: 'I',
    properties: ['leve'],
    description: 'Pente 12; sem penalidade com inimigo adjacente. Dano não soma FOR.'
  },
  {
    id: 'pistola_tatica_l',
    name: 'Pistola tática (L)',
    baseWeapon: 'Pistola tática',
    category: 'pistola',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d10',
    damageType: 'balistico',
    range: 'Curto / Médio',
    magCapacity: 15,
    spaces: 1,
    requisitionType: 'II',
    properties: ['leve', 'precisa'],
    description: 'Tática leve (L). Pente 15; Precisa; aceita silenciador.'
  },
  {
    id: 'revolver',
    name: 'Revólver',
    baseWeapon: 'Revólver',
    category: 'revolver',
    weaponProficiency: 'simples',
    damageDice: '2d6',
    damageType: 'balistico',
    range: 'Curto / Médio',
    magCapacity: 6,
    spaces: 1,
    requisitionType: 'I',
    properties: [],
    description: 'Pente 6; recarregar é ação padrão.'
  },
  {
    id: 'revolver_pesado',
    name: 'Revólver pesado',
    baseWeapon: 'Revólver pesado',
    category: 'revolver',
    weaponProficiency: 'pesada',
    damageDice: '3d6',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 5,
    spaces: 2,
    requisitionType: 'III',
    properties: ['pesada'],
    description: 'Pente 5; Pesada; –1 dado em alcance Médio.'
  },
  {
    id: 'pistola_sinalizacao',
    name: 'Pistola de sinalização',
    baseWeapon: 'Pistola de sinalização',
    category: 'pistola',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'fogo',
    range: 'Curto',
    magCapacity: 1,
    spaces: 1,
    requisitionType: 'I',
    properties: [],
    description: 'Pente 1; Em chamas se acertar; ilumina 18 m.'
  },

  // --- Submetralhadoras ---
  {
    id: 'submetralhadora_l',
    name: 'Submetralhadora (L)',
    baseWeapon: 'Submetralhadora',
    category: 'submetralhadora',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d10',
    damageType: 'balistico',
    range: 'Curto / Médio',
    magCapacity: 20,
    spaces: 2,
    requisitionType: 'II',
    properties: ['automatica'],
    description: 'Tática leve (L). Pente 20; Automática.'
  },
  {
    id: 'submetralhadora_compacta_l',
    name: 'Submetralhadora compacta (L)',
    baseWeapon: 'Submetralhadora compacta',
    category: 'submetralhadora',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d8',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 15,
    spaces: 1,
    requisitionType: 'II',
    properties: ['uma_mao', 'automatica'],
    description: 'Tática leve (L). Pente 15; Automática; Uma mão.'
  },
  {
    id: 'pistola_metralhadora',
    name: 'Pistola-metralhadora',
    baseWeapon: 'Pistola-metralhadora',
    category: 'submetralhadora',
    weaponProficiency: 'pesada',
    damageDice: '1d10',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 30,
    spaces: 2,
    requisitionType: 'III',
    properties: ['automatica', 'pesada'],
    description: 'Pente 30; Automática; Barulhenta (atrai Alheios a 36 m).'
  },

  // --- Espingardas ---
  {
    id: 'espingarda',
    name: 'Espingarda',
    baseWeapon: 'Espingarda',
    category: 'espingarda',
    weaponProficiency: 'simples',
    damageDice: '3d6',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 4,
    spaces: 2,
    requisitionType: 'I',
    properties: ['duas_maos'],
    description: 'Pente 4; –1 dado em alcance Médio.'
  },
  {
    id: 'espingarda_cano_duplo',
    name: 'Espingarda de cano duplo',
    baseWeapon: 'Espingarda de cano duplo',
    category: 'espingarda',
    weaponProficiency: 'simples',
    damageDice: '3d6',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 2,
    spaces: 2,
    requisitionType: 'I',
    properties: ['duas_maos'],
    description: 'Pente 2; dois disparos como ação padrão (+1d6, gasta ambos os cartuchos).'
  },
  {
    id: 'espingarda_tatica',
    name: 'Espingarda tática',
    baseWeapon: 'Espingarda tática',
    category: 'espingarda',
    weaponProficiency: 'tatica',
    damageDice: '3d6',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 7,
    spaces: 3,
    requisitionType: 'II',
    properties: ['duas_maos'],
    description: 'Pente 7; semiautomática; –1 dado em alcance Médio.'
  },
  {
    id: 'escopeta_combate',
    name: 'Escopeta de combate',
    baseWeapon: 'Escopeta de combate',
    category: 'espingarda',
    weaponProficiency: 'pesada',
    damageDice: '3d6',
    damageType: 'balistico',
    range: 'Curto',
    magCapacity: 8,
    spaces: 3,
    requisitionType: 'III',
    properties: ['duas_maos', 'pesada'],
    description: 'Pente 8; Pesada; derruba Pequenos (Fortitude DT 15).'
  },

  // --- Rifles ---
  {
    id: 'rifle_caca',
    name: 'Rifle de caça',
    baseWeapon: 'Rifle de caça',
    category: 'rifle',
    weaponProficiency: 'simples',
    damageDice: '2d8',
    damageType: 'balistico',
    range: 'Longo',
    magCapacity: 5,
    spaces: 2,
    requisitionType: 'I',
    properties: ['duas_maos', 'precisa'],
    description: 'Pente 5; Precisa.'
  },
  {
    id: 'rifle',
    name: 'Rifle',
    baseWeapon: 'Rifle',
    category: 'rifle',
    weaponProficiency: 'tatica',
    damageDice: '2d8',
    damageType: 'balistico',
    range: 'Longo',
    magCapacity: 10,
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos'],
    description: 'Pente 10.'
  },
  {
    id: 'fuzil_assalto',
    name: 'Fuzil de assalto',
    baseWeapon: 'Fuzil de assalto',
    category: 'rifle',
    weaponProficiency: 'tatica',
    damageDice: '2d8',
    damageType: 'balistico',
    range: 'Longo',
    magCapacity: 20,
    spaces: 3,
    requisitionType: 'III',
    properties: ['duas_maos', 'automatica'],
    description: 'Pente 20; Automática.'
  },
  {
    id: 'rifle_precisao',
    name: 'Rifle de precisão',
    baseWeapon: 'Rifle de precisão',
    category: 'rifle',
    weaponProficiency: 'tatica',
    damageDice: '2d10',
    damageType: 'balistico',
    range: 'Extremo',
    magCapacity: 5,
    spaces: 3,
    requisitionType: 'III',
    properties: ['duas_maos', 'precisa'],
    description: 'Pente 5; Precisa; Mirar obrigatório.'
  },
  {
    id: 'rifle_antimaterial',
    name: 'Rifle antimaterial',
    baseWeapon: 'Rifle antimaterial',
    category: 'rifle',
    weaponProficiency: 'pesada',
    damageDice: '3d10',
    damageType: 'perfurante',
    range: 'Extremo',
    magCapacity: 3,
    spaces: 4,
    requisitionType: 'IV',
    properties: ['duas_maos', 'pesada', 'perfurante'],
    description: 'Pente 3; Pesada; ignora 5 de RD; atravessa cobertura parcial.'
  },

  // --- Armas pesadas ---
  {
    id: 'metralhadora_leve',
    name: 'Metralhadora leve',
    baseWeapon: 'Metralhadora leve',
    category: 'arma_pesada',
    weaponProficiency: 'pesada',
    damageDice: '2d10',
    damageType: 'balistico',
    range: 'Longo',
    magCapacity: 50,
    spaces: 4,
    requisitionType: 'III',
    properties: ['duas_maos', 'automatica', 'pesada'],
    description: 'Pente 50; Automática; Pesada; apoio: –1 dado se disparada sem bipé ou apoio.'
  },
  {
    id: 'lanca_granadas',
    name: 'Lança-granadas',
    baseWeapon: 'Lança-granadas',
    category: 'arma_pesada',
    weaponProficiency: 'pesada',
    damageDice: '6d6',
    damageType: 'balistico',
    range: 'Médio',
    magCapacity: 1,
    spaces: 4,
    requisitionType: 'IV',
    properties: ['duas_maos', 'pesada'],
    description: 'Explosivo médio (esfera 6 m, 6d6, DT 18); recarregar é ação padrão; Pesada.'
  },
  {
    id: 'lanca_chamas',
    name: 'Lança-chamas',
    baseWeapon: 'Lança-chamas',
    category: 'arma_pesada',
    weaponProficiency: 'pesada',
    damageDice: '4d6',
    damageType: 'fogo',
    range: 'Cone 9 m',
    magCapacity: 4,
    spaces: 4,
    requisitionType: 'IV',
    properties: ['duas_maos', 'pesada'],
    description: 'Pente 4; Em chamas; Pesada; explode em Desastre.'
  },

  // --- Arcos, bestas e arremesso ---
  {
    id: 'arco',
    name: 'Arco',
    baseWeapon: 'Arco',
    category: 'arco_besta',
    weaponProficiency: 'simples',
    damageDice: '1d8',
    damageType: 'perfurante',
    range: 'Médio',
    magCapacity: 12,
    spaces: 2,
    requisitionType: 'I',
    properties: ['duas_maos', 'silenciosa', 'perfurante'],
    description: '12 flechas; Silenciosa; Duas mãos.'
  },
  {
    id: 'arco_composto',
    name: 'Arco composto',
    baseWeapon: 'Arco composto',
    category: 'arco_besta',
    weaponProficiency: 'tatica',
    damageDice: '1d10',
    damageType: 'perfurante',
    range: 'Longo',
    magCapacity: 12,
    spaces: 2,
    requisitionType: 'II',
    properties: ['duas_maos', 'silenciosa', 'perfurante'],
    description: '12 flechas; Silenciosa; Duas mãos; FOR 2 para usar sem penalidade.'
  },
  {
    id: 'besta',
    name: 'Besta',
    baseWeapon: 'Besta',
    category: 'arco_besta',
    weaponProficiency: 'simples',
    damageDice: '1d10',
    damageType: 'perfurante',
    range: 'Longo',
    magCapacity: 12,
    spaces: 2,
    requisitionType: 'I',
    properties: ['silenciosa', 'perfurante'],
    description: '12 virotes; Silenciosa; recarregar é ação padrão.'
  },
  {
    id: 'besta_tatica_l',
    name: 'Besta tática (L)',
    baseWeapon: 'Besta tática',
    category: 'arco_besta',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    damageDice: '1d10',
    damageType: 'perfurante',
    range: 'Longo',
    magCapacity: 8,
    spaces: 2,
    requisitionType: 'II',
    properties: ['silenciosa', 'precisa', 'perfurante'],
    description: 'Tática leve (L). 8 virotes; Silenciosa; Precisa; recarga em ação de movimento.'
  },
  {
    id: 'dardos',
    name: 'Dardos (3)',
    baseWeapon: 'Dardos',
    category: 'arco_besta',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'perfurante',
    range: 'Curto',
    spaces: 1,
    requisitionType: 'I',
    properties: ['arremesso', 'silenciosa', 'perfurante'],
    description: 'Arremesso; Silenciosa; soma metade da FOR no dano.'
  },
  {
    id: 'funda',
    name: 'Funda',
    baseWeapon: 'Funda',
    category: 'arco_besta',
    weaponProficiency: 'simples',
    damageDice: '1d6',
    damageType: 'contundente',
    range: 'Curto / Médio',
    spaces: 1,
    requisitionType: 'I',
    properties: ['silenciosa', 'contundente'],
    description: 'Silenciosa; utiliza pedras comuns.'
  },

  // --- Armas não letais ---
  {
    id: 'taser',
    name: 'Taser',
    baseWeapon: 'Taser',
    category: 'nao_letal',
    weaponProficiency: 'tatica',
    damageDice: '1d6',
    damageType: 'eletrico',
    range: 'Curto',
    magCapacity: 2,
    spaces: 1,
    requisitionType: 'II',
    properties: [],
    description: 'Pente 2; dano elétrico não letal; alvo faz Fortitude DT 15 ou fica Atordoado por 1 rodada.'
  },
  {
    id: 'pistola_tinta',
    name: 'Pistola de tinta',
    baseWeapon: 'Pistola de tinta',
    category: 'nao_letal',
    weaponProficiency: 'simples',
    damageDice: '0',
    damageType: 'contundente',
    range: 'Curto',
    magCapacity: 12,
    spaces: 1,
    requisitionType: 'I',
    properties: [],
    description: 'Marca o alvo: +1 dado para rastreá-lo; Pente 12.'
  },
  {
    id: 'lancador_redes',
    name: 'Lançador de redes',
    baseWeapon: 'Lançador de redes',
    category: 'nao_letal',
    weaponProficiency: 'tatica',
    damageDice: '0',
    damageType: 'contundente',
    range: 'Curto',
    magCapacity: 1,
    spaces: 2,
    requisitionType: 'III',
    properties: [],
    description: 'Pente 1; alvo faz Reflexos DT 15 ou fica Agarrado; escapar: Acrobacia DT 15.'
  },
  {
    id: 'spray_pimenta',
    name: 'Spray de pimenta',
    baseWeapon: 'Spray de pimenta',
    category: 'nao_letal',
    weaponProficiency: 'simples',
    damageDice: '0',
    damageType: 'acido',
    range: 'Adjacente',
    magCapacity: 3,
    spaces: 1,
    requisitionType: 'I',
    properties: [],
    description: '3 usos; Fortitude DT 15 ou Cego por 1 rodada.'
  }
];

// ==========================================
// CAPÍTULOS 79 E 85 — ARMAS FENDIDAS PRONTAS
// ==========================================
export const ARMAS_FENDIDAS_PRONTAS: Weapon[] = [
  // --- Comuns (Contágio 1%, Req. III) ---
  {
    id: 'faca_vigilia',
    name: 'Faca de Vigília',
    baseWeapon: 'Faca tática (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'comum',
    damageDice: '1d6',
    damageType: 'fendido',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['leve', 'arremesso', 'fendida'],
    riftEffects: ['Rastro de Fenda'],
    description: 'Dano: 1d6 + FOR fendido. Vibra quando Alheios se aproximam (+1 dado em Percepção a 9 m). Padrão para Calouros.'
  },
  {
    id: 'cano_manso',
    name: 'Cano Manso',
    baseWeapon: 'Pistola',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '1d10',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 12,
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['leve', 'fendida'],
    riftEffects: ['Aderência'],
    description: 'Dano: 1d10 fendido. Impossível de desarmar (–2 dados para desarmar). Pente 12.'
  },
  {
    id: 'cassetete_campo',
    name: 'Cassetete de Campo',
    baseWeapon: 'Cassetete',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '1d6',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['leve', 'fendida'],
    riftEffects: ['Fio Estável'],
    description: 'Dano: 1d6 + FOR fendido. Ignora 1 de RD; não letal sem teste.'
  },
  {
    id: 'machadinha_curta',
    name: 'Machadinha Curta',
    baseWeapon: 'Machadinha',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '1d8',
    damageType: 'fendido',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['uma_mao', 'arremesso', 'fendida'],
    riftEffects: ['Rastro de Fenda'],
    description: 'Dano: 1d8 + FOR fendido. Pode ser arremessada em Curto. Vibra perto de Alheios.'
  },
  {
    id: 'rifle_vigia',
    name: 'Rifle de Vigia',
    baseWeapon: 'Rifle',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'comum',
    damageDice: '2d8',
    damageType: 'fendido',
    range: 'Longo',
    magCapacity: 10,
    spaces: 2,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'fendida'],
    riftEffects: ['Alcance Estendido'],
    description: 'Dano: 2d8 fendido. Sem penalidade em Médio. Pente 10.'
  },
  {
    id: 'soco_cinza',
    name: 'Soco de Cinza',
    baseWeapon: 'Soco inglês',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '1d6',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['leve', 'fendida'],
    riftEffects: ['Fio Estável'],
    description: 'Dano: 1d6 + FOR fendido. Ignora 1 RD. Barata e discreta.'
  },
  {
    id: 'lamina_bolso',
    name: 'Lâmina de Bolso',
    baseWeapon: 'Lâmina retrátil (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'comum',
    damageDice: '1d6',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['leve', 'fendida'],
    riftEffects: ['Aderência'],
    description: 'Dano: 1d6 + FOR fendido. Sacar é ação livre; ninguém desarma.'
  },
  {
    id: 'revolver_casa',
    name: 'Revólver de Casa',
    baseWeapon: 'Revólver',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '2d6',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 6,
    spaces: 1,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['fendida'],
    riftEffects: ['Peso Leve'],
    description: 'Dano: 2d6 fendido. Saque livre. Pente 6.'
  },
  {
    id: 'flecha_cantora',
    name: 'Flecha Cantora',
    baseWeapon: 'Arco',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'comum',
    damageDice: '1d8',
    damageType: 'fendido',
    range: 'Médio',
    magCapacity: 12,
    spaces: 2,
    requisitionType: 'III',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'silenciosa', 'fendida'],
    riftEffects: ['Rastro de Fenda'],
    description: 'Dano: 1d8 fendido. Vibra suavemente com Alheios por perto.'
  },

  // --- Incomuns (Contágio 1%, +1 de dano, Req. IV) ---
  {
    id: 'lingua_de_fogo',
    name: 'Língua de Fogo',
    baseWeapon: 'Facão tático',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'incomum',
    damageDice: '1d8+1d6+1',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['uma_mao', 'versatil', 'fendida'],
    riftEffects: ['Chama Viva', 'Ímpeto'],
    description: 'Dano: 1d8 + FOR + 1 fendido + 1d6 fogo. Carga: +1d6. Destaque: Em chamas (DT 15).',
    lore: 'Um facão tático forjado em 2019 com Resíduo de Alheio de Grau 2 que ardeu por dentro. A lâmina nunca esfria por completo.'
  },
  {
    id: 'trovao_seco',
    name: 'Trovão Seco',
    baseWeapon: 'Revólver',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'incomum',
    damageDice: '2d6+1d6+1',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 6,
    spaces: 1,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['fendida'],
    riftEffects: ['Descarga', 'Recarga Viva'],
    description: 'Dano: 2d6 + 1 fendido + 1d6 elétrico. Destaque: Atordoado (DT 15). Desativa aparelhos. Recarregar ação livre 1x por cena.'
  },
  {
    id: 'sussurro',
    name: 'Sussurro',
    baseWeapon: 'Pistola tática (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'incomum',
    damageDice: '1d10+1',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 15,
    spaces: 1,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['leve', 'silenciosa', 'precisa', 'fendida'],
    riftEffects: ['Sombra', 'Recarga Viva'],
    description: 'Dano: 1d10 + 1 fendido. Totalmente silenciosa e não brilha. Preferida dos Infiltradores.'
  },
  {
    id: 'cacadora',
    name: 'Caçadora',
    baseWeapon: 'Rifle',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'incomum',
    damageDice: '2d8+1d6+1',
    damageType: 'fendido',
    range: 'Longo',
    magCapacity: 10,
    spaces: 2,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'fendida'],
    riftEffects: ['Marca do Caçador', 'Vibração'],
    description: 'Dano: 2d8 + 1 fendido + 1d6 sonoro. Marca alvos em Curto (+1 dado). Ignora cobertura parcial.'
  },
  {
    id: 'ferrao',
    name: 'Ferrão',
    baseWeapon: 'Lança',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'incomum',
    damageDice: '1d10+1d6+1',
    damageType: 'fendido',
    range: '3 m',
    spaces: 2,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'haste', 'fendida'],
    riftEffects: ['Corrosão', 'Fio Estável'],
    description: 'Dano: 1d10 + FOR + 1 fendido + 1d6 ácido. Alcance 3 m. Reduz RD de armadura do alvo em Destaque.'
  },
  {
    id: 'dente_de_ferro',
    name: 'Dente de Ferro',
    baseWeapon: 'Machado',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'incomum',
    damageDice: '2d6+1d6+1',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'fendida'],
    riftEffects: ['Corrosão', 'Aderência'],
    description: 'Dano: 2d6 + FOR + 1 fendido + 1d6 ácido. Reduz RD de armadura em Destaque. Impossível desarmar.'
  },
  {
    id: 'rajada_fria',
    name: 'Rajada Fria',
    baseWeapon: 'Submetralhadora (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'incomum',
    damageDice: '1d10+1d6+1',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 20,
    spaces: 2,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['automatica', 'fendida'],
    riftEffects: ['Vibração', 'Recarga Viva'],
    description: 'Dano: 1d10 + 1 fendido + 1d6 sonoro. Ignora cobertura parcial. Pente 20.'
  },
  {
    id: 'brasa_lenta',
    name: 'Brasa Lenta',
    baseWeapon: 'Espingarda',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'incomum',
    damageDice: '3d6+1d6+1',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 4,
    spaces: 2,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['duas_maos', 'fendida'],
    riftEffects: ['Chama Viva', 'Alcance Estendido'],
    description: 'Dano: 3d6 + 1 fendido + 1d6 fogo. Sem penalidade em Médio. Pente 4.'
  },
  {
    id: 'ladra_de_sombras',
    name: 'Ladra de Sombras',
    baseWeapon: 'Faca tática (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'incomum',
    damageDice: '1d6+1',
    damageType: 'fendido',
    range: 'Adjacente / Curto',
    spaces: 1,
    requisitionType: 'IV',
    contagionCostPerScene: 1,
    properties: ['leve', 'silenciosa', 'fendida'],
    riftEffects: ['Sombra', 'Marca do Caçador'],
    description: 'Dano: 1d6 + FOR + 1 fendido. Silenciosa; marca alvos e ataca da escuridão.'
  },

  // --- Raras (Contágio 2%, +2 de dano, Req. V) ---
  {
    id: 'selo_ferro',
    name: 'Selo-Ferro',
    baseWeapon: 'Machado',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'rara',
    damageDice: '2d6+2',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['duas_maos', 'fendida'],
    riftEffects: ['Seladora', 'Fio Estável'],
    description: 'Dano: 2d6 + FOR + 2 fendido. +1 dado em Selagem; dano dobrado contra Núcleos.',
    lore: 'O machado da Mestra Sayuri Kimura, forjado com o Resíduo de um Núcleo que ela mesma selou.'
  },
  {
    id: 'memoria_vale_quieto',
    name: 'Memória de Vale Quieto',
    baseWeapon: 'Espada longa',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'rara',
    damageDice: '2d6+2',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['duas_maos', 'versatil', 'fendida'],
    riftEffects: ['Vingativa', 'Sede'],
    description: 'Dano: 2d6 + FOR + 2 fendido. +2 dano contra quem feriu um aliado; recupera 1d6 + nível PV ao abater.',
    lore: 'Espada recuperada da primeira Zona de Ruptura, gravada com o nome de 32 moradores.'
  },
  {
    id: 'sete_tiros',
    name: 'Sete Tiros',
    baseWeapon: 'Revólver',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'rara',
    damageDice: '2d6+2',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 6,
    spaces: 1,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['fendida'],
    riftEffects: ['Estilhaço', 'Atravessa'],
    description: 'Dano: 2d6 + 2 fendido. Atinge 2 alvos adjacentes (metade do dano); ignora cobertura parcial e forte.'
  },
  {
    id: 'bastao_do_instrutor',
    name: 'Bastão do Instrutor',
    baseWeapon: 'Bastão extensível',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'rara',
    damageDice: '1d8+2',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 1,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['uma_mao', 'fendida'],
    riftEffects: ['Peso do Vazio', 'Conduto'],
    description: 'Dano: 1d8 + FOR + 2 fendido. Empurra o alvo 3 m; +1 na DT de Dons de toque entregues pelo bastão.'
  },
  {
    id: 'sentinela',
    name: 'Sentinela',
    baseWeapon: 'Rifle de precisão',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'rara',
    damageDice: '2d10+2',
    damageType: 'fendido',
    range: 'Extremo',
    magCapacity: 5,
    spaces: 3,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['duas_maos', 'precisa', 'fendida'],
    riftEffects: ['Atravessa', 'Marca do Caçador'],
    description: 'Dano: 2d10 + 2 fendido. Alcance Extremo. Ignora cobertura. Marca alvos.'
  },
  {
    id: 'martelo_do_silencio',
    name: 'Martelo do Silêncio',
    baseWeapon: 'Marreta',
    category: 'fendida',
    weaponProficiency: 'pesada',
    rarity: 'rara',
    damageDice: '2d6+2',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 3,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['duas_maos', 'pesada', 'fendida'],
    riftEffects: ['Peso do Vazio', 'Eco'],
    description: 'Dano: 2d6 + FOR + 2 fendido. Empurra o alvo 3 m; causa metade do dano em criatura adjacente.'
  },
  {
    id: 'vigilia_haste',
    name: 'Vigília',
    baseWeapon: 'Lança',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'rara',
    damageDice: '1d10+2',
    damageType: 'fendido',
    range: '3 m',
    spaces: 2,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['duas_maos', 'haste', 'fendida'],
    riftEffects: ['Vingativa', 'Fio Estável'],
    description: 'Dano: 1d10 + FOR + 2 fendido. Alcance 3 m; +2 de dano em quem feriu aliado; ignora 1 de RD.'
  },
  {
    id: 'conversa_de_pistola',
    name: 'Conversa de Pistola',
    baseWeapon: 'Pistola tática (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'rara',
    damageDice: '1d10+2',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 15,
    spaces: 1,
    requisitionType: 'V',
    contagionCostPerScene: 2,
    properties: ['leve', 'precisa', 'fendida'],
    riftEffects: ['Estilhaço', 'Recarga Viva'],
    description: 'Dano: 1d10 + 2 fendido. Atinge 2 alvos adjacentes (metade); recarga como ação livre 1x por cena.'
  },

  // --- Épicas (Contágio 3%, +4 de dano, apenas concedidas) ---
  {
    id: 'fenda_aberta',
    name: 'Fenda Aberta',
    baseWeapon: 'Espada longa',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'epica',
    damageDice: '2d6+4',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['duas_maos', 'versatil', 'fendida'],
    riftEffects: ['Corte Dimensional', 'Executar', 'Eco'],
    description: 'Dano: 2d6 + FOR + 4 fendido. Ignora armadura; se o alvo cair a 25% dos PV, Fortitude DT 18 ou morre; Eco ao adjacente.',
    lore: 'Uma espada que corta o espaço: ao ser brandida, deixa um risco de luz sem cor no ar, como a primeira Fenda.'
  },
  {
    id: 'a_sentenca',
    name: 'A Sentença',
    baseWeapon: 'Rifle de precisão',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'epica',
    damageDice: '2d10+4',
    damageType: 'fendido',
    range: 'Extremo',
    magCapacity: 5,
    spaces: 3,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['duas_maos', 'precisa', 'fendida'],
    riftEffects: ['Executar', 'Atravessa', 'Marca do Caçador'],
    description: 'Dano: 2d10 + 4 fendido. Alcance Extremo. Ignora qualquer cobertura; marca alvos e executa a 25% PV.'
  },
  {
    id: 'coro_silencioso',
    name: 'Coro Silencioso',
    baseWeapon: 'Besta tática (L)',
    category: 'fendida',
    weaponProficiency: 'tatica',
    isTacticalLight: true,
    rarity: 'epica',
    damageDice: '1d10+4',
    damageType: 'fendido',
    range: 'Longo',
    magCapacity: 8,
    spaces: 2,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['silenciosa', 'precisa', 'fendida'],
    riftEffects: ['Eclipse', 'Chamado', 'Sombra'],
    description: 'Dano: 1d10 + 4 fendido. Suprime Dons em Destaque; invoca eco (Alheio Grau 1) 1x por cena; silenciosa.'
  },
  {
    id: 'fio_do_abismo',
    name: 'Fio do Abismo',
    baseWeapon: 'Foice',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'epica',
    damageDice: '2d6+4',
    damageType: 'fendido',
    range: '3 m',
    spaces: 2,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['duas_maos', 'haste', 'fendida'],
    riftEffects: ['Corte Dimensional', 'Sede', 'Ímpeto'],
    description: 'Dano: 2d6 + FOR + 4 fendido. Alcance 3 m; cura 1d6+nível ao abater; Carga +1d6; ignora armadura.'
  },
  {
    id: 'trovao_de_kito',
    name: 'Trovão de Kito',
    baseWeapon: 'Fuzil de assalto',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'epica',
    damageDice: '2d8+1d6+4',
    damageType: 'fendido',
    range: 'Longo',
    magCapacity: 20,
    spaces: 3,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['duas_maos', 'automatica', 'fendida'],
    riftEffects: ['Raio de Fenda', 'Estilhaço', 'Vibração'],
    description: 'Dano: 2d8 + 4 fendido + 1d6 sonoro. Uma vez por cena, linha 18 m: 3d6 fendido.'
  },
  {
    id: 'voz_amarga',
    name: 'Voz Amarga',
    baseWeapon: 'Revólver pesado',
    category: 'fendida',
    weaponProficiency: 'pesada',
    rarity: 'epica',
    damageDice: '3d6+4',
    damageType: 'fendido',
    range: 'Curto',
    magCapacity: 5,
    spaces: 2,
    requisitionType: '—',
    contagionCostPerScene: 3,
    properties: ['pesada', 'fendida'],
    riftEffects: ['Executar', 'Atravessa', 'Marca do Caçador'],
    description: 'Dano: 3d6 + 4 fendido. Executar (DT 18) a 25% dos PV. Ignora cobertura.'
  },

  // --- Lendárias (Contágio 5%, +6 de dano, únicas) ---
  {
    id: 'aurora',
    name: 'Aurora',
    baseWeapon: 'Espada longa',
    category: 'fendida',
    weaponProficiency: 'tatica',
    rarity: 'lendaria',
    damageDice: '2d6+6',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 2,
    requisitionType: '—',
    contagionCostPerScene: 5,
    properties: ['duas_maos', 'versatil', 'fendida'],
    riftEffects: ['Renascer', 'Nome Verdadeiro', 'Sede', 'Assinatura — Amanhecer'],
    description: 'Dano: 2d6 + FOR + 6 fendido. Amanhecer: 1x por missão, aliados em Curto curam metade dos PV máximos (+5% Contágio ao portador). Nome: +2 dados e +4 dano (+10% Contágio).',
    lore: 'A única arma lendária forjada na Academia, a partir de um Fragmento de Núcleo de Fenda Grau 5. Três portadores morreram abraçando sua lâmina.'
  },
  {
    id: 'o_ultimo_tiro',
    name: 'O Último Tiro',
    baseWeapon: 'Pistola',
    category: 'fendida',
    weaponProficiency: 'simples',
    rarity: 'lendaria',
    damageDice: '4d10+6',
    damageType: 'fendido',
    range: 'Curto / Médio',
    magCapacity: 1,
    spaces: 1,
    requisitionType: '—',
    contagionCostPerScene: 5,
    properties: ['fendida'],
    riftEffects: ['Fim do Mundo', 'Atravessa', 'Marca do Caçador', 'Assinatura — Uma Bala'],
    description: 'Dano: 4d10 + 6 fendido (dados dobrados com Fim do Mundo). O ataque acerta automaticamente. Pente 1. A bala retorna ao fim da cena.',
    lore: 'Pistola de cano negro que só tem uma bala. Ela sabe a quem se destina o disparo e raramente erra o alvo moral.'
  },
  {
    id: 'a_ultima_pessoa',
    name: 'A Última Pessoa',
    baseWeapon: 'Marreta',
    category: 'fendida',
    weaponProficiency: 'pesada',
    rarity: 'lendaria',
    damageDice: '2d6+6',
    damageType: 'fendido',
    range: 'Adjacente',
    spaces: 3,
    requisitionType: '—',
    contagionCostPerScene: 5,
    properties: ['duas_maos', 'pesada', 'fendida'],
    riftEffects: ['Fim do Mundo', 'Executar', 'Peso do Vazio', 'Assinatura — Peso do Luto'],
    description: 'Dano: 2d6 + FOR + 6 fendido. Ao reduzir inimigo a 0 PV, aliados em Curto recuperam 1d6 de Mente.',
    lore: 'Forjada com o Resíduo de 32 vítimas de Vale Quieto. Cada vez que mata, a marreta pesa um pouco mais.'
  }
];

// ==========================================
// CAPÍTULO 72 — ARMADURAS E ESCUDOS
// ==========================================
export const OFFICIAL_ARMORS: Armor[] = [
  // --- Leves ---
  {
    id: 'colete_tecido',
    name: 'Colete de tecido',
    category: 'leve',
    defenseBonus: 1,
    rd: '2 balístico e perfurante',
    notes: 'Discreto; passa por roupa comum.',
    spaces: 1,
    requisitionType: 'II'
  },
  {
    id: 'casaco_reforcado',
    name: 'Casaco reforçado',
    category: 'leve',
    defenseBonus: 1,
    rd: '2 balístico e perfurante',
    notes: 'Roupa civil; +1 dado em Furtividade urbana.',
    spaces: 1,
    requisitionType: 'II'
  },
  {
    id: 'uniforme_cinza',
    name: 'Uniforme Cinza',
    category: 'leve',
    defenseBonus: 1,
    rd: '1 contra fogo e elétrico',
    notes: 'Uniforme padrão da Academia; ajuda a identificar agentes.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'traje_ginastica_tatico',
    name: 'Traje de ginástica tático',
    category: 'leve',
    defenseBonus: 1,
    rd: '—',
    notes: 'Sem penalidade de AGI; +1 dado em Acrobacia.',
    spaces: 1,
    requisitionType: 'II'
  },

  // --- Médias ---
  {
    id: 'colete_tatico',
    name: 'Colete tático',
    category: 'media',
    defenseBonus: 2,
    rd: '3 balístico; 1 outros',
    notes: '–1 dado em Acrobacia e Furtividade.',
    spaces: 2,
    requisitionType: 'III'
  },
  {
    id: 'armadura_motoqueiro',
    name: 'Armadura de motoqueiro',
    category: 'media',
    defenseBonus: 2,
    rd: '2 contundente e cortante; 1 balístico',
    notes: 'Sem penalidade em Pilotagem.',
    spaces: 2,
    requisitionType: 'III'
  },
  {
    id: 'equipamento_bombeiro',
    name: 'Equipamento de bombeiro',
    category: 'media',
    defenseBonus: 2,
    rd: '3 fogo; 1 outros',
    notes: 'Imune a Em chamas por 2 rodadas.',
    spaces: 3,
    requisitionType: 'III'
  },
  {
    id: 'armadura_cacador',
    name: 'Armadura de caçador',
    category: 'media',
    defenseBonus: 2,
    rd: '2 perfurante e cortante',
    notes: 'Contra Alheios com garras: +1 RD.',
    spaces: 2,
    requisitionType: 'III'
  },

  // --- Pesadas ---
  {
    id: 'armadura_choque',
    name: 'Armadura de choque',
    category: 'pesada',
    defenseBonus: 3,
    rd: '5 balístico; 3 outros',
    notes: '–1 dado em perícias de AGI; Deslocamento –3 m.',
    spaces: 4,
    requisitionType: 'IV'
  },
  {
    id: 'traje_contencao',
    name: 'Traje de contenção',
    category: 'pesada',
    defenseBonus: 3,
    rd: '3 geral; imune a ácido',
    notes: 'Isolamento: +2 dados em Fortitude contra gases, venenos e Resíduo bruto. Penalidades de pesada.',
    spaces: 4,
    requisitionType: 'IV'
  },
  {
    id: 'blindagem_assalto',
    name: 'Blindagem de assalto',
    category: 'pesada',
    defenseBonus: 4,
    rd: '6 balístico; 4 outros',
    notes: 'Penalidades de pesada; FOR 3 para usar sem Deslocamento –6 m.',
    spaces: 4,
    requisitionType: 'IV'
  },

  // --- Escudos ---
  {
    id: 'escudo_leve',
    name: 'Escudo leve',
    category: 'escudo',
    defenseBonus: 1,
    rd: '—',
    notes: 'Reação Bloquear +1. Placa, tampa, painel. Uma mão.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'escudo_tatico',
    name: 'Escudo tático',
    category: 'escudo',
    defenseBonus: 2,
    rd: '—',
    notes: 'Reação Bloquear +3 (aceita ataques à distância). Escudo balístico. Uma mão; pesado (–1 dado em Acrobacia).',
    spaces: 2,
    requisitionType: 'II'
  },
  {
    id: 'escudo_corpo',
    name: 'Escudo de corpo',
    category: 'escudo',
    defenseBonus: 4,
    rd: '—',
    notes: 'Cobertura forte; Bloquear +5. Exige FOR 3; Deslocamento –3 m; ocupa as duas mãos.',
    spaces: 3,
    requisitionType: 'IV'
  },

  // --- Armaduras Fendidas (Cap. 74 & 79) ---
  {
    id: 'casaco_cinza_fendido',
    name: 'Casaco Cinza Fendido',
    category: 'leve',
    defenseBonus: 2,
    rd: '2 balístico/perf. + 2 geral',
    notes: 'Camuflagem (+1 dado Furtividade), Pele Alheia (Contágio por contato com Resíduo cai em 1%).',
    spaces: 1,
    requisitionType: 'IV',
    isFendida: true,
    rarity: 'incomum',
    contagionCostPerScene: 1,
    effects: ['Camuflagem', 'Pele Alheia']
  },
  {
    id: 'couraca_eco',
    name: 'Couraça de Eco',
    category: 'media',
    defenseBonus: 3,
    rd: '3 balístico/1 outros + 3 geral',
    notes: 'Barreira de Eco (1x por cena reduz 10 de dano), Fôlego (cura 2 PV no início do turno abaixo de 1/2 PV).',
    spaces: 2,
    requisitionType: 'V',
    isFendida: true,
    rarity: 'rara',
    contagionCostPerScene: 2,
    effects: ['Barreira de Eco', 'Fôlego']
  },
  {
    id: 'carapaca_meridiano',
    name: 'Carapaça Meridiano',
    category: 'pesada',
    defenseBonus: 5,
    rd: '5 balístico/3 outros + 4 geral',
    notes: 'Segunda Pele (+1 dado Fortitude, imune Sangrando), Sentido de Fenda (+1 dado Percepção emboscadas), Calor Constante.',
    spaces: 4,
    requisitionType: '—',
    isFendida: true,
    rarity: 'epica',
    contagionCostPerScene: 3,
    effects: ['Segunda Pele', 'Sentido de Fenda', 'Calor Constante']
  }
];

// ==========================================
// CAPÍTULO 71, 77, 82, 83 — UTILITÁRIOS, EXPLOSIVOS & ARTEFATOS
// ==========================================
export const OFFICIAL_EQUIPMENT: EquipmentItem[] = [
  // --- Granadas e Explosivos (Cap. 71) ---
  {
    id: 'granada_luz',
    name: 'Granada de luz',
    category: 'explosivo',
    effect: 'Esfera de 6 m: Ofuscado; Reflexos ou Cego por 1 rodada.',
    spaces: 1,
    requisitionType: 'II',
    dt: 15
  },
  {
    id: 'granada_fumaca',
    name: 'Granada de fumaça',
    category: 'explosivo',
    effect: 'Esfera de 6 m: camuflagem total por 5 rodadas.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'granada_fragmentacao',
    name: 'Granada de fragmentação',
    category: 'explosivo',
    effect: 'Esfera de 6 m: 6d6 balístico (Reflexos para metade).',
    spaces: 1,
    requisitionType: 'II',
    dt: 18
  },
  {
    id: 'granada_incendiaria',
    name: 'Granada incendiária',
    category: 'explosivo',
    effect: 'Esfera de 3 m: 4d6 de fogo e Em chamas; fogo persiste 3 rodadas.',
    spaces: 1,
    requisitionType: 'III',
    dt: 15
  },
  {
    id: 'granada_concussao',
    name: 'Granada de concussão',
    category: 'explosivo',
    effect: 'Esfera de 6 m: 4d6 de força; Caído e Surdo por 1 rodada (Fortitude DT 18).',
    spaces: 1,
    requisitionType: 'III',
    dt: 18
  },
  {
    id: 'granada_gas',
    name: 'Granada de gás',
    category: 'explosivo',
    effect: 'Esfera de 6 m, 5 rodadas: Fortitude DT 15 ou Enjoado; sem máscara, Sufocando.',
    spaces: 1,
    requisitionType: 'III',
    dt: 15
  },
  {
    id: 'granada_residuo',
    name: 'Granada de Resíduo',
    category: 'explosivo',
    effect: 'Esfera de 6 m: 6d6 de dano fendido, ignora RD Alheia. +2% de Contágio para quem a usar.',
    spaces: 1,
    requisitionType: 'IV',
    dt: 18
  },
  {
    id: 'mina_antipessoal',
    name: 'Mina antipessoal',
    category: 'explosivo',
    effect: 'Raio 3 m, 4d6; dispara ao ser pisada (Percepção DT 15 para notar).',
    spaces: 2,
    requisitionType: 'III',
    dt: 15
  },
  {
    id: 'carga_demolicao',
    name: 'Carga de demolição',
    category: 'explosivo',
    effect: 'Raio 9 m, 10d6; objetos sofrem o dobro. Temporizador ou detonador.',
    spaces: 3,
    requisitionType: 'IV',
    dt: 22
  },

  // --- Selos de Selagem (Cap. 77) ---
  {
    id: 'selo_comum',
    name: 'Selo de Selagem Comum (Grau 2)',
    category: 'selo',
    effect: 'Fecha o Núcleo de Fendas de Grau até 2. O selo padrão da Academia.',
    spaces: 1,
    requisitionType: 'II'
  },
  {
    id: 'selo_reforcado',
    name: 'Selo de Selagem Reforçado (Grau 3)',
    category: 'selo',
    effect: 'Fecha Núcleos até Grau 3. Mais estável; –1 de DT em Selagem.',
    spaces: 1,
    requisitionType: 'IV'
  },
  {
    id: 'selo_superior',
    name: 'Selo de Selagem Superior (Grau 5)',
    category: 'selo',
    effect: 'Fecha Núcleos até Grau 5. –2 de DT em Selagem; mantém o selo em 1 sucesso a menos.',
    spaces: 2,
    requisitionType: 'V'
  },

  // --- Itens contra o Contágio (Cap. 77) ---
  {
    id: 'soro_dessintonia',
    name: 'Soro de Dessintonia',
    category: 'contagio',
    effect: 'Reduz 1d6% de Contágio (respeitando o Piso); deixa Debilitado por 24 h. Limite: 1 por semana.',
    spaces: 1,
    requisitionType: 'III'
  },
  {
    id: 'estojo_contencao',
    name: 'Estojo de contenção',
    category: 'contagio',
    effect: 'Guarda até 5 cargas de Resíduo; reduz o contágio por contato a +1%.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'luvas_contencao',
    name: 'Luvas de contenção',
    category: 'contagio',
    effect: 'O contato com Resíduo bruto custa +1% de Contágio em vez de +3%.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'mascara_filtro',
    name: 'Máscara com filtro',
    category: 'contagio',
    effect: '+2 dados em Fortitude contra gases, esporos e poeira de Resíduo.',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'ancora_bolso',
    name: 'Âncora de bolso',
    category: 'contagio',
    effect: 'Um objeto do Vínculo (foto, anel, carta). A Cena de Vínculo reduz 2% em vez de 1%.',
    spaces: 1,
    requisitionType: '—'
  },

  // --- Kits (Cap. 77) ---
  {
    id: 'kit_primeiros_socorros',
    name: 'Kit de Primeiros socorros',
    category: 'kit',
    effect: '+1 dado em Medicina (3 usos).',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'kit_medico_avancado',
    name: 'Kit Médico avançado',
    category: 'kit',
    effect: '+2 dados em Medicina (6 usos); permite estabilizar em combate sem penalidade.',
    spaces: 2,
    requisitionType: 'II'
  },
  {
    id: 'kit_ferramentas',
    name: 'Kit de Ferramentas',
    category: 'kit',
    effect: 'Necessário para consertos e modificações (Tecnologia, Profissão).',
    spaces: 1,
    requisitionType: 'I'
  },
  {
    id: 'kit_selagem',
    name: 'Kit de Selagem',
    category: 'kit',
    effect: 'Contém 1 Selo Comum e ferramentas para instalá-lo. +1 dado em Selagem.',
    spaces: 2,
    requisitionType: 'II'
  },

  // --- Comunicação & Detecção (Cap. 77) ---
  {
    id: 'sismografo_fenda',
    name: 'Sismógrafo de Fenda',
    category: 'comunicacao',
    effect: 'Detecta Fendas ativas em 360 m e estima o Grau (Tecnologia DT 15).',
    spaces: 2,
    requisitionType: 'III'
  },
  {
    id: 'camera_termica',
    name: 'Câmera térmica',
    category: 'comunicacao',
    effect: 'Identifica criaturas de sangue quente em 18 m.',
    spaces: 1,
    requisitionType: 'II'
  },
  {
    id: 'oculos_visao_noturna',
    name: 'Óculos de visão noturna',
    category: 'comunicacao',
    effect: 'Visão no escuro por 1 cena; falha a 18 m de Núcleo.',
    spaces: 1,
    requisitionType: 'III'
  },

  // --- Focos para Despertos (Cap. 77) ---
  {
    id: 'talisma_foco',
    name: 'Talismã de foco',
    category: 'foco',
    effect: 'Objeto pessoal (pingente, anel). Serve como Foco para o limitador Foco do Cap. 32.',
    spaces: 0,
    requisitionType: 'I'
  },
  {
    id: 'cristal_estabilizador',
    name: 'Cristal estabilizador',
    category: 'foco',
    effect: 'Armazena 5 PE que o Desperto pode usar em Dons. Recarrega no Descanso completo; carregar custa +1% de Contágio.',
    spaces: 1,
    requisitionType: 'IV'
  },
  {
    id: 'bastao_ressonante',
    name: 'Bastão ressonante',
    category: 'foco',
    effect: 'Bastão de Resíduo. +1 de DT nos Dons de toque e +1 dado em Vontade ao usá-los.',
    spaces: 1,
    requisitionType: 'III'
  },

  // --- 12 Artefatos do Outro Lado (Capítulo 83) ---
  {
    id: 'calice_sem_fundo',
    name: 'O Cálice Sem Fundo',
    category: 'artefato',
    effect: 'Um gole restaura 2d6 PE.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: '+3% de Contágio por gole; Vontade DT 18 ou Impulso 3 (fome estranha).',
    lore: 'Taça escura que nunca esvazia. Pertenceu a alguém que não conseguiu parar de beber.'
  },
  {
    id: 'espelho_duas_faces',
    name: 'Espelho de Duas Faces',
    category: 'artefato',
    effect: 'Mostra o maior medo de quem olha. 1x por dia, revela a mentira de uma pessoa em Curto.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Vontade DT 18 ou Abalado na cena.',
    lore: 'Espelho de mão com moldura feita de osso.'
  },
  {
    id: 'sino_quebrado',
    name: 'Sino Quebrado',
    category: 'artefato',
    effect: 'Toca em silêncio: Alheios em 36 m fazem Vontade DT 18 ou perdem a próxima ação (1x por dia).',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Atrai criaturas maiores na próxima hora.',
    lore: 'Sino de bronze sem badalo.'
  },
  {
    id: 'relogio_parado',
    name: 'Relógio Parado',
    category: 'artefato',
    effect: 'Refaz uma rodada de combate (desfaz tudo) uma vez por dia.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: '+4% de Contágio; o usuário lembra de tudo, os demais, não.',
    lore: 'Relógio de bolso parado em uma hora específica.'
  },
  {
    id: 'chave_nao_abre_nada',
    name: 'Chave que Não Abre Nada',
    category: 'artefato',
    effect: 'Abre qualquer fechadura (incluindo portas de Fenda).',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Cada uso apaga uma memória do usuário (1d4 de Mente).',
    lore: 'Chave de ferro sem dentes.'
  },
  {
    id: 'coracao_de_pedra',
    name: 'Coração de Pedra',
    category: 'artefato',
    effect: 'Portador ganha RD 3 geral.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Mente máxima –5; perde empatia com estranhos.',
    lore: 'Pedra morna com uma batida lenta e pesada.'
  },
  {
    id: 'mapa_vivo',
    name: 'Mapa Vivo',
    category: 'artefato',
    effect: 'Mostra Fendas em 360 m e as rotas mais curtas.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Em 1 de 6 vezes, leva a um lugar errado.',
    lore: 'Pergaminho que se escreve sozinho.'
  },
  {
    id: 'bussola_nucleo',
    name: 'Bússola do Núcleo',
    category: 'artefato',
    effect: 'Aponta diretamente para o Núcleo da Fenda. +1 dado em Selagem ao chegar.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Consome 1 carga de Resíduo por uso.',
    lore: 'Bússola com agulha feita de cristal cintilante.'
  },
  {
    id: 'luva_de_osso',
    name: 'Luva de Osso',
    category: 'artefato',
    effect: 'Garras Vivas sem custo de PE; causa 1d8 + FOR de dano.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: '+1% de Contágio por cena de uso; difícil de tirar (Vontade DT 15).',
    lore: 'Luva ossuda que cresce diretamente na carne da mão.'
  },
  {
    id: 'mascara_sem_rosto',
    name: 'Máscara Sem Rosto',
    category: 'artefato',
    effect: 'Concede Rosto Passageiro sem espelho por 1 hora.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Ao fim, Vontade DT 15 ou esquece quem é por 1d6 horas.',
    lore: 'Máscara de porcelana lisa e sem feições.'
  },
  {
    id: 'fio_de_voz',
    name: 'Fio de Voz',
    category: 'artefato',
    effect: 'Em Dar nome ao silêncio, concede +2 dados.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Quem ouve perde 1d6 de Mente.',
    lore: 'Fita antiga contendo uma gravação sussurrada.'
  },
  {
    id: 'semente_fenda',
    name: 'Semente de Fenda',
    category: 'artefato',
    effect: 'Se plantada, abre uma Fenda de Grau 1 em 24 horas.',
    spaces: 1,
    requisitionType: '—',
    costOrRisk: 'Perigosíssimo. Objeto do Culto; só destruível com fogo e Selagem.',
    lore: 'Casca negra do tamanho de um punho fechado.'
  }
];

// ==========================================
// CAPÍTULO 74 — TABELAS DE EFEITOS DE FENDA
// ==========================================
export interface RiftEffectDef {
  name: string;
  tier: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
  type: 'U' | 'C' | 'D'; // U = qualquer arma, C = corpo a corpo, D = à distância
  description: string;
}

export const RIFT_EFFECTS: RiftEffectDef[] = [
  // Comuns
  { name: 'Rastro de Fenda', tier: 'comum', type: 'U', description: 'A arma vibra perto de Alheios: +1 dado em Percepção para notar Alheios a 9 m.' },
  { name: 'Fio Estável', tier: 'comum', type: 'C', description: 'Ignora 1 ponto de RD (comum) do alvo.' },
  { name: 'Alcance Estendido', tier: 'comum', type: 'D', description: 'Sem penalidade em alcance Médio.' },
  { name: 'Peso Leve', tier: 'comum', type: 'U', description: 'Ocupa 1 espaço a menos (mínimo 1) e sacar é ação livre.' },
  { name: 'Aderência', tier: 'comum', type: 'U', description: 'Desarmar a arma impõe –2 dados; Bloquear com ela concede +1 de redução.' },

  // Incomuns
  { name: 'Chama Viva', tier: 'incomum', type: 'U', description: '+1d6 de fogo. Destaque: o alvo faz Reflexos DT 15 ou fica Em chamas.' },
  { name: 'Descarga', tier: 'incomum', type: 'U', description: '+1d6 elétrico; desativa aparelhos pequenos. Destaque: Fortitude DT 15 ou Atordoado.' },
  { name: 'Vibração', tier: 'incomum', type: 'U', description: '+1d6 sonoro; ignora cobertura parcial.' },
  { name: 'Corrosão', tier: 'incomum', type: 'U', description: '+1d6 ácido; cada Destaque reduz 1 ponto de RD de armadura do alvo.' },
  { name: 'Sombra', tier: 'incomum', type: 'U', description: 'A arma é Silenciosa e não brilha. +1 dado em Furtividade ao atacar de surpresa.' },
  { name: 'Recarga Viva', tier: 'incomum', type: 'D', description: 'Recarregar é ação livre, uma vez por cena.' },
  { name: 'Ímpeto', tier: 'incomum', type: 'C', description: 'Ao usar Carga, causa +1d6 de dano.' },
  { name: 'Marca do Caçador', tier: 'incomum', type: 'U', description: 'Ação de movimento: marca um alvo em Curto; +1 dado em ataques contra ele até o fim da cena.' },

  // Raros
  { name: 'Peso do Vazio', tier: 'raro', type: 'U', description: 'Ao acertar, empurra o alvo 3 m (Fortitude DT 15 resiste).' },
  { name: 'Sede', tier: 'raro', type: 'U', description: 'Ao reduzir um inimigo a 0 PV, o portador recupera 1d6 + nível PV.' },
  { name: 'Eco', tier: 'raro', type: 'C', description: 'Um alvo adjacente ao primeiro sofre metade do dano (Reflexos DT 15 evita).' },
  { name: 'Estilhaço', tier: 'raro', type: 'D', description: 'Dois alvos adjacentes ao primeiro sofrem metade do dano (Reflexos DT 15 evita).' },
  { name: 'Seladora', tier: 'raro', type: 'U', description: '+1 dado em Selagem enquanto empunhada; dano dobrado contra Núcleos.' },
  { name: 'Vingativa', tier: 'raro', type: 'U', description: '+2 de dano contra uma criatura que tenha ferido um aliado do portador na cena.' },
  { name: 'Atravessa', tier: 'raro', type: 'U', description: 'Ignora cobertura parcial e forte do alvo.' },
  { name: 'Conduto', tier: 'raro', type: 'U', description: 'Dons de toque do portador podem ser entregues pela arma; +1 de DT nesses Dons.' },

  // Épicos
  { name: 'Corte Dimensional', tier: 'epico', type: 'C', description: 'O ataque ignora a Defesa de armadura do alvo (–3 de Defesa) e alcança alvo atrás de cobertura total adjacente.' },
  { name: 'Executar', tier: 'epico', type: 'U', description: 'Se o alvo cair a 25% dos PV ou menos após o dano, faz Fortitude DT 18 ou morre. Elites e Chefes sofrem +4d6.' },
  { name: 'Eclipse', tier: 'epico', type: 'U', description: 'Destaque: os Dons do alvo ficam suprimidos por 1 rodada.' },
  { name: 'Chamado', tier: 'epico', type: 'U', description: 'Uma vez por cena, ação padrão: um eco (Alheio de Grau 1) surge e ataca um inimigo adjacente por 3 rodadas.' },
  { name: 'Raio de Fenda', tier: 'epico', type: 'D', description: 'Uma vez por cena, linha de 18 m: 3d6 de dano fendido (Reflexos para metade).' },

  // Lendários
  { name: 'Renascer', tier: 'lendario', type: 'U', description: 'Uma vez por dia, ao cair a 0 PV, o portador fica com metade dos PV máximos, ao custo de +5% de Contágio.' },
  { name: 'Fim do Mundo', tier: 'lendario', type: 'U', description: 'Uma vez por missão, ataque com dados dobrados, ignora toda RD e não deixa Resíduo se o alvo for de Grau 3 ou menos.' },
  { name: 'Nome Verdadeiro', tier: 'lendario', type: 'U', description: 'Ação livre, pronunciar o nome da arma: +2 dados em ataques e +4 de dano por 1 cena; +10% de Contágio.' },
  { name: 'Assinatura', tier: 'lendario', type: 'U', description: 'Efeito único criado com o Mestre, do mesmo poder que um Dom de Potência 4 ou 5.' }
];

// Defeitos de Fenda (Cap. 74 - d10)
export const DEFEITOS_DE_FENDA = [
  { roll: 1, name: 'Sussurros', effect: 'A arma "fala" ao portador. Vontade DT 15 ou Abalado no início de cada combate.' },
  { roll: 2, name: 'Fome', effect: 'Exige dano a cada cena; sem causar dano, o portador fica Fraco.' },
  { roll: 3, name: 'Peso', effect: 'Ocupa +1 espaço e –3 m de Deslocamento.' },
  { roll: 4, name: 'Ciúme', effect: '–1 dado em ataques com outras armas.' },
  { roll: 5, name: 'Cobiça', effect: 'O portador tenta tomar itens de Resíduo de outros agentes (Vontade DT 15 para resistir).' },
  { roll: 6, name: 'Inquietação', effect: 'O portador não dorme bem com a arma por perto: Descanso completo cura metade da Mente.' },
  { roll: 7, name: 'Marca', effect: 'O portador ganha uma cicatriz que cresce com cada cena de uso.' },
  { roll: 8, name: 'Atração', effect: 'Alheios sentem a arma: –2 dados em Furtividade a 18 m.' },
  { roll: 9, name: 'Rancor', effect: 'Em um Desastre, a arma ataca um aliado adjacente.' },
  { roll: 10, name: 'Lembrança', effect: 'Uma vez por sessão, o Mestre mostra uma cena de quem empunhou a arma antes.' }
];

// Modificações (Cap. 76)
export const MODIFICACOES_ARMAS_BRANCAS = [
  { name: 'Afiação especial', effect: 'Arma Cortante ganha +1 de dano; Destaque causa Sangrando com DT 17.', req: 'II' },
  { name: 'Contrapeso', effect: '+1 dado em Luta com a arma; +1 espaço.', req: 'II' },
  { name: 'Lâmina serrilhada', effect: '+1d4 de dano em Destaque; sofre Desastre com 1 em dois dados.', req: 'II' },
  { name: 'Empunhadura reforçada', effect: '+2 dados contra Desarmar.', req: 'I' },
  { name: 'Reforço de aço', effect: 'A arma não quebra em Desastre; +1 espaço.', req: 'II' },
  { name: 'Ponta perfurante', effect: 'Ganha Perfurante (ignora 1 RD de armadura).', req: 'II' },
  { name: 'Cabo estendido', effect: 'Ganha Alcance 3 m (–1 dado adjacente); uma mão vira duas.', req: 'III' }
];

export const MODIFICACOES_ARMAS_FOGO = [
  { name: 'Cano estendido', effect: '+50% de alcance em cada categoria; +1 espaço.', req: 'III' },
  { name: 'Gatilho leve', effect: '+1 dado para Mirar; Desastre com dois 1.', req: 'II' },
  { name: 'Câmara dupla', effect: 'Pente +2; recarregar custa uma ação padrão.', req: 'III' },
  { name: 'Coldre rápido', effect: 'Sacar é ação livre.', req: 'I' },
  { name: 'Suporte de mira', effect: 'Aceita dois acessórios de mira ao mesmo tempo.', req: 'II' },
  { name: 'Câmara selada', effect: 'A arma funciona debaixo d\'água e perto de Núcleos sem falhas.', req: 'III' },
  { name: 'Compensador de Fenda', effect: 'A arma não falha com eletrônica; –1 dado em Pontaria em Interior com Camada hostil.', req: 'IV' }
];

export const MODIFICACOES_ARMADURAS = [
  { name: 'Placas extras', effect: '+1 RD geral; +1 espaço; –1 dado em Acrobacia.', req: 'III' },
  { name: 'Forro térmico', effect: 'Imune a frio extremo; RD 2 contra fogo.', req: 'II' },
  { name: 'Bolsos táticos', effect: '+2 espaços de carga.', req: 'I' },
  { name: 'Ombreiras', effect: '+1 Defesa contra ataques de cima e de flanco.', req: 'II' },
  { name: 'Capuz de contenção', effect: '+1 dado em Fortitude contra gases e Resíduo bruto.', req: 'III' },
  { name: 'Ancoragem', effect: 'Arma pessoal e escudo não se perdem por Desarmar.', req: 'II' },
  { name: 'Painel reflexivo', effect: '+1 Defesa contra Dons de Brasa.', req: 'III' }
];

export const MODIFICACOES_ESCUDOS = [
  { name: 'Borda afiada', effect: 'O escudo pode ser usado como arma (1d6 cortante).', req: 'II' },
  { name: 'Visor', effect: 'O escudo tem uma fresta: sem penalidade de mirar através dele.', req: 'III' },
  { name: 'Cinta de braço', effect: 'Libera a mão: pode portar item leve no mesmo braço.', req: 'II' }
];

// Munições especiais (Cap. 70)
export const MUNICOES_ESPECIAIS = [
  { name: 'Comum', effect: 'Dano normal.', req: 'I' },
  { name: 'Perfurante', effect: 'Ignora 2 pontos de RD. –1 no dano (mínimo 1).', req: 'II' },
  { name: 'Expansiva', effect: '+1 dado de dano contra alvos sem armadura (RD 0). Alvos com armadura reduzem pela metade o bônus.', req: 'II' },
  { name: 'De borracha', effect: 'Dano não letal; derruba Pequenos.', req: 'I' },
  { name: 'Traçante', effect: 'Ilumina 9 m ao redor do alvo; +1 dado para atacar o mesmo alvo por quem vê o rastro.', req: 'II' },
  { name: 'Incendiária', effect: '+1d6 de fogo; alvo faz Reflexos DT 15 ou fica Em chamas.', req: 'III' },
  { name: 'De Resíduo', effect: 'Causa dano fendido (ignora RD Alheia, atinge incorpóreos). +1% de Contágio ao usar na cena.', req: 'IV' }
];

// Combinação de todas as armas oficiais do Volume 6
export const TODAS_ARMAS_VOL6: Weapon[] = [
  ...ARMAS_BRANCAS,
  ...ARMAS_DISTANCIA,
  ...ARMAS_FENDIDAS_PRONTAS
];
