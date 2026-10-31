import {
  SkillDefinition,
  OriginDefinition,
  ClassDefinition,
  Weapon,
  Gift,
  Creature,
  Character,
  Armor,
  EquipmentItem
} from '../types/limiar';
import {
  TODAS_ARMAS_VOL6,
  OFFICIAL_ARMORS,
  OFFICIAL_EQUIPMENT,
  RIFT_EFFECTS,
  DEFEITOS_DE_FENDA,
  MODIFICACOES_ARMAS_BRANCAS,
  MODIFICACOES_ARMAS_FOGO,
  MODIFICACOES_ARMADURAS,
  MODIFICACOES_ESCUDOS,
  MUNICOES_ESPECIAIS
} from './armamentoVol6';

export {
  OFFICIAL_ARMORS,
  OFFICIAL_EQUIPMENT,
  RIFT_EFFECTS,
  DEFEITOS_DE_FENDA,
  MODIFICACOES_ARMAS_BRANCAS,
  MODIFICACOES_ARMAS_FOGO,
  MODIFICACOES_ARMADURAS,
  MODIFICACOES_ESCUDOS,
  MUNICOES_ESPECIAIS
};

// ==========================================
// 28 PERÍCIAS OFICIAIS DE LIMIAR
// ==========================================
export const OFFICIAL_SKILLS: SkillDefinition[] = [
  // FORÇA
  { name: 'Atletismo', attribute: 'FOR', trainedOnly: false, armorPenalty: false, description: 'Esforço físico bruto: correr, saltar, nadar, escalar, arrastar, empurrar.' },
  { name: 'Luta', attribute: 'FOR', trainedOnly: false, armorPenalty: false, description: 'Combate corpo a corpo: socos, armas brancas, agarrões e manobras.' },

  // AGILIDADE
  { name: 'Acrobacia', attribute: 'AGI', trainedOnly: false, armorPenalty: true, description: 'Equilíbrio, rolamentos, quedas controladas, passar por espaços apertados.' },
  { name: 'Crime', attribute: 'AGI', trainedOnly: true, armorPenalty: true, description: 'Arrombar fechaduras, furtar, desativar alarmes e falsificar.' },
  { name: 'Furtividade', attribute: 'AGI', trainedOnly: false, armorPenalty: true, description: 'Mover-se sem ser notado, esconder-se, passar despercebido.' },
  { name: 'Iniciativa', attribute: 'AGI', trainedOnly: false, armorPenalty: false, description: 'Reação rápida ao início de uma ameaça e ordem de ação no combate.' },
  { name: 'Pilotagem', attribute: 'AGI', trainedOnly: true, armorPenalty: false, description: 'Dirigir carros, motos, barcos, drones e veículos sob estresse.' },
  { name: 'Pontaria', attribute: 'AGI', trainedOnly: false, armorPenalty: false, description: 'Usar armas de longo alcance: pistolas, rifles, arcos e lançadores.' },
  { name: 'Reflexos', attribute: 'AGI', trainedOnly: false, armorPenalty: false, description: 'Resistência rápida contra perigos de esquiva: explosões, armadilhas, projéteis.' },

  // INTELECTO
  { name: 'Anomalia', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Conhecimento sobre Alheios, Fendas, Resíduo e fenômenos do Interior.' },
  { name: 'Atualidades', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Cultura geral, notícias, política, geografia e informações cotidianas.' },
  { name: 'Ciências', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Física, química, biologia e cálculo da base científica da Academia.' },
  { name: 'Investigação', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Procurar pistas, examinar cenas de crime, ligar dados e reconstituir fatos.' },
  { name: 'Medicina', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Primeiros socorros, diagnóstico, estancar sangramento e estabilização de feridos.' },
  { name: 'Profissão', attribute: 'INT', trainedOnly: true, armorPenalty: false, description: 'Conhecimento prático de um ofício técnico prévio à Academia.' },
  { name: 'Selagem', attribute: 'INT', trainedOnly: true, armorPenalty: false, description: 'A perícia mestra: leitura de Núcleos de Fendas, ancoragem de selos e contenção.' },
  { name: 'Sobrevivência', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Viver em ambientes hostis, rastreamento, abrigo, água e navegação no Interior.' },
  { name: 'Tática', attribute: 'INT', trainedOnly: false, armorPenalty: false, description: 'Planejamento militar, leitura tática de campo e coordenação de equipes.' },
  { name: 'Tecnologia', attribute: 'INT', trainedOnly: true, armorPenalty: false, description: 'Eletrônica, hackers, sistemas de segurança e manutenção de Aferidores.' },

  // VIGOR
  { name: 'Fortitude', attribute: 'VIG', trainedOnly: false, armorPenalty: false, description: 'Resistência orgânica: venenos, doenças, fadiga, dor e radiação de Fenda.' },

  // PRESENÇA
  { name: 'Adestramento', attribute: 'PRE', trainedOnly: true, armorPenalty: false, description: 'Treinar, acalmar e comandar animais e certas criaturas.' },
  { name: 'Artes', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Expressão artística: música, atuação, grafite, distrair com performances.' },
  { name: 'Diplomacia', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Convencer pessoas, negociar tréguas, acalmar multidões em pânico.' },
  { name: 'Enganação', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Mentir, disfarçar, blefar em combate e manipular informações.' },
  { name: 'Intimidação', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Coagir, impor respeito ou medo, assustar inimigos no combate.' },
  { name: 'Intuição', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Perceber mentiras, pressentir intenções e sentir o perigo iminente.' },
  { name: 'Percepção', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Notar detalhes ocultos, ouvir sons distantes e antecipar emboscadas.' },
  { name: 'Vontade', attribute: 'PRE', trainedOnly: false, armorPenalty: false, description: 'Resistência mental contra medo, perda de Mente, controle e o Chamado do Contágio.' },
];

// ==========================================
// 12 ORIGENS OFICIAIS
// ==========================================
export const OFFICIAL_ORIGINS: OriginDefinition[] = [
  {
    id: 'atleta_descartado',
    name: 'Atleta Descartado',
    fixedSkills: ['Atletismo', 'Fortitude'],
    originPowerName: 'Fôlego de Campeão',
    originPowerDescription: 'Uma vez por cena, ao fazer um teste de Atletismo ou Fortitude, ganhe +1 dado bônus.',
    suggestedFlaw: 'Precisa provar o próprio valor diante de qualquer plateia.',
    description: 'Foi promessa esportiva até lesão ou briga tirá-lo do jogo. O corpo lembra o treino e o orgulho ainda dói.'
  },
  {
    id: 'infrator',
    name: 'Infrator',
    fixedSkills: ['Crime', 'Furtividade'],
    originPowerName: 'Rua',
    originPowerDescription: 'Pode usar Crime para avaliar um lugar: com sucesso (DT 15), descobre uma saída, esconderijo ou ponto fraco.',
    suggestedFlaw: 'Desconfia de qualquer autoridade e age sozinho quando pressionado.',
    description: 'Aprendeu cedo a pegar o alheio e a sumir. A Academia foi a alternativa à prisão.'
  },
  {
    id: 'sobrevivente_ruptura',
    name: 'Sobrevivente de Ruptura',
    fixedSkills: ['Vontade', 'Sobrevivência'],
    originPowerName: 'Sangue Frio',
    originPowerDescription: 'Reduza em 1 (mínimo 1) cada perda de Mente causada por Alheios ou por cenas de Ruptura.',
    suggestedFlaw: 'Revive a Ruptura diante de situações parecidas e pode paralisar.',
    description: 'Estava lá quando uma Fenda passou de 48 horas. Viu o horror do outro lado e sobreviveu.'
  },
  {
    id: 'prodigio_rebelde',
    name: 'Prodígio Rebelde',
    fixedSkills: ['Ciências', 'Tecnologia'],
    originPowerName: 'Mente Aberta',
    originPowerDescription: 'Uma vez por missão, pode refazer um teste de Ciências ou Tecnologia, ficando com o melhor resultado.',
    suggestedFlaw: 'Subestima os outros e raramente aceita ordens.',
    description: 'Um gênio precoce que entediava professores. Sempre achou que sabia mais e muitas vezes sabia.'
  },
  {
    id: 'filho_militar',
    name: 'Filho de Militar',
    fixedSkills: ['Tática', 'Pontaria'],
    originPowerName: 'Disciplina',
    originPowerDescription: 'Ganha +1 dado bônus em testes de Iniciativa e pode usar Tática para ajudar aliados sem fazer teste de DT 10.',
    suggestedFlaw: 'Carrega a expectativa paterna/materna e tem dificuldade em desobedecer regras.',
    description: 'Cresceu em quartel militar, entre rigidez e silêncios. Sabe receber e dar ordens.'
  },
  {
    id: 'ex_gangue',
    name: 'Ex-Gangue',
    fixedSkills: ['Luta', 'Intimidação'],
    originPowerName: 'Olhar Duro',
    originPowerDescription: 'Quando um inimigo falha em Vontade contra sua Intimidação, ele perde –1 dado no próximo ataque contra você.',
    suggestedFlaw: 'Reage com violência impulsiva quando é desafiado em público.',
    description: 'Cresceu no asfalto e aprendeu que o respeito e a sobrevivência são conquistados na força.'
  },
  {
    id: 'voluntario_idealista',
    name: 'Voluntário Idealista',
    fixedSkills: ['Diplomacia', 'Medicina'],
    originPowerName: 'Presença Calma',
    originPowerDescription: 'Uma vez por cena, como ação de movimento, remova a condição Abalado de um aliado a até 9 m.',
    suggestedFlaw: 'Ignora os próprios limites físicos e emocionais para acudir os outros.',
    description: 'Alistou-se na Academia por vontade própria. Acredita no propósito nobre de salvar vidas.'
  },
  {
    id: 'hacker_quarto',
    name: 'Hacker de Quarto',
    fixedSkills: ['Tecnologia', 'Investigação'],
    originPowerName: 'Acesso Remoto',
    originPowerDescription: 'Pode usar Tecnologia para obter dados de redes públicas e privadas remotamente, com DT +5.',
    suggestedFlaw: 'Isola-se socialmente e confia muito mais em terminais do que em seres humanos.',
    description: 'Passou a juventude no quarto quebrando defesas de dados governamentais até ser interceptado.'
  },
  {
    id: 'artista_rua',
    name: 'Artista de Rua',
    fixedSkills: ['Artes', 'Enganação'],
    originPowerName: 'Show',
    originPowerDescription: 'Uma vez por cena, ação padrão: teste de Artes resistido por Vontade de inimigos em Curto. Falhas impõem -1 dado até o fim da rodada.',
    suggestedFlaw: 'Necessita desesperadamente de atenção e validação pública.',
    description: 'Música, teatro ou grafite. Sobrevivia com o improviso da calçada e aprendeu a mascarar a dor.'
  },
  {
    id: 'ex_culto',
    name: 'Ex-Culto',
    fixedSkills: ['Anomalia', 'Intuição'],
    originPowerName: 'Língua Alheia',
    originPowerDescription: 'Ganha +1 dado bônus em testes de Anomalia envolvendo Núcleos, Resíduo e fenômenos do Interior.',
    suggestedFlaw: 'Ouve ecos sussurrados que lembram os cânticos do Culto Aberto.',
    description: 'Cresceu dentro do Culto Aberto acreditando que as Fendas eram uma bênção até ver a devoração de perto.'
  },
  {
    id: 'jovem_interior',
    name: 'Jovem do Interior',
    fixedSkills: ['Sobrevivência', 'Percepção'],
    originPowerName: 'Faro do Mato',
    originPowerDescription: 'Fareja perigos ocultos: o Mestre avisa quando há criaturas ou emboscadas a menos de 18 m.',
    suggestedFlaw: 'Desconfia fortemente de tecnologia moderna e de ambientes fechados.',
    description: 'Nascido em matas e fazendas isoladas, acostumado ao silêncio denso e a rastros na terra.'
  },
  {
    id: 'ex_paciente',
    name: 'Ex-Paciente',
    fixedSkills: ['Medicina', 'Vontade'],
    originPowerName: 'Corpo Treinado pela Dor',
    originPowerDescription: 'Ganha RD 1 geral contra qualquer dano físico e ignora a condição Enjoado.',
    suggestedFlaw: 'Teme procedimentos médicos invasivos e evita a todo custo o prédio da Âncora.',
    description: 'Passou anos em internações e experimentos médicos tentando aplacar anomalias no organismo.'
  }
];

// ==========================================
// 3 CLASSES OFICIAIS DE LIMIAR
// ==========================================
export const OFFICIAL_CLASSES: ClassDefinition[] = [
  {
    id: 'vanguarda',
    name: 'Vanguarda',
    basePV: 20,
    pvPerLevel: 4,
    basePE: 2,
    pePerLevel: 2,
    baseMEN: 12,
    menPerLevel: 3,
    trainedSkillsText: 'Luta ou Pontaria (à escolha), Fortitude, mais 2 à escolha e INT extras.',
    fixedSkills: ['Fortitude'],
    skillsToChooseCount: 3,
    proficiencies: 'Armas simples e táticas. Armaduras leves e médias.',
    division: 'Vanguarda',
    classAbilities: [
      { level: 1, name: 'Pele Curtida', description: 'Você tem RD 1 contra dano físico (sobe para RD 2 no nível 10 e RD 3 no nível 17).' },
      { level: 1, name: 'Golpe Decisivo', description: 'Ao acertar um ataque, gaste 2 PE para causar +1d8 de dano (+2d8 por 3 PE no nv 10, +3d8 por 4 PE no nv 17).' },
      { level: 5, name: 'Inabalável', description: 'Ganha +1 dado bônus em Vontade contra medo/controle e não fica Abalado com mais de 50% dos PV.' },
      { level: 10, name: 'Segundo Fôlego', description: '1x por cena, ação de movimento: recupere 2d8 + VIG de PV (3d8 + VIG no nível 17).' },
      { level: 14, name: 'Barreira Humana', description: '1x por rodada, reação: sofre ataque no lugar de aliado a até 1,5 m com RD +2.' },
      { level: 17, name: 'Ímpeto', description: '1x por cena: ataque duas vezes como uma única ação padrão em alvos iguais ou diferentes.' },
      { level: 20, name: 'Lenda da Linha de Frente', description: 'PV máximo +20. 1x/dia ao cair a 0 PV, fica com 1 PV. Golpe Decisivo custa metade do PE.' }
    ],
    tracks: [
      {
        id: 'muralha',
        name: 'Trilha: Muralha',
        description: 'O agente protetor inquebrável que retém os Alheios e segura a porta.',
        abilities: [
          { level: 3, name: 'Postura Defensiva', description: 'Ação de movimento: +3 Defesa até o próximo turno, com deslocamento reduzido pela metade.' },
          { level: 8, name: 'Provocar', description: 'Ação padrão: Intimidação vs Vontade em 9 m. Inimigo sofre -1 dado se atacar outros que não você.' },
          { level: 13, name: 'Bastião', description: 'Aliados adjacentes ganham +1 Defesa. Você ganha RD +2 em Postura Defensiva.' },
          { level: 18, name: 'Inquebrável', description: '1x/cena, reação: ao sofrer golpe de 10+ de dano, reduz o dano à metade.' }
        ]
      },
      {
        id: 'lamina',
        name: 'Trilha: Lâmina',
        description: 'Combatente veloz e cirúrgico no combate próximo com armas brancas.',
        abilities: [
          { level: 3, name: 'Estilo de Duelo', description: '+2 dano corpo a corpo contra alvo único adjacente (+4 se sem escudo e com arma de uma mão).' },
          { level: 8, name: 'Contragolpe', description: '1x por rodada, reação: quando inimigo errar ataque corpo a corpo, gaste 1 PE para atacar contra ele.' },
          { level: 13, name: 'Golpe Veloz', description: 'Ao usar ação completa de ataque com arma leve, desfere um ataque adicional (com -1 dado).' },
          { level: 18, name: 'Dança de Lâminas', description: 'Ao reduzir inimigo a 0 PV corpo a corpo, realize um ataque extra imediato em outro alvo adjacente.' }
        ]
      },
      {
        id: 'atirador',
        name: 'Trilha: Atirador',
        description: 'O especialista em fuzilaria e precisão tática à distância.',
        abilities: [
          { level: 3, name: 'Tiro Firme', description: 'Sem penalidade para alvos em alcance Médio. Ao mirar, ignora cobertura parcial.' },
          { level: 8, name: 'Fogo de Supressão', description: 'Ação padrão, 2 PE: cone de 9 m. Vontade DT 10+AGI+nível/2 ou fica Abalado e imóvel na direção.' },
          { level: 13, name: 'Olho de Águia', description: 'Alcances +50%. Destaque em ataques à distância com 19 ou 20 no dado mantido.' },
          { level: 18, name: 'Tiro Perfeito', description: '1x por cena, ação padrão: ataque à distância que acerta automaticamente com dano máximo da arma.' }
        ]
      }
    ]
  },
  {
    id: 'operador',
    name: 'Operador',
    basePV: 16,
    pvPerLevel: 3,
    basePE: 4,
    pePerLevel: 3,
    baseMEN: 16,
    menPerLevel: 4,
    trainedSkillsText: 'Percepção, mais 4 à escolha e INT extras.',
    fixedSkills: ['Percepção'],
    skillsToChooseCount: 4,
    proficiencies: 'Armas simples e táticas leves. Armaduras leves.',
    division: 'Operações / Selagem / Forja / Âncora',
    classAbilities: [
      { level: 1, name: 'Perito', description: 'Ao testar perícia treinada, gaste 1 PE para ganhar +1 dado bônus (2 PE para +2 dados no nv 10).' },
      { level: 1, name: 'Mochila Cheia', description: 'Carga máxima aumenta em +5 espaços. Começa com kit de ferramentas adicional da trilha.' },
      { level: 5, name: 'Plano B', description: '1x/rodada, reação, 2 PE: aliado a até 18 m que falhou em teste rola de novo com melhor resultado.' },
      { level: 10, name: 'Mente Estratégica', description: 'Ação padrão, 2 PE, Tática DT 15: até INT aliados em 18 m ganham +1 dado bônus no próximo teste.' },
      { level: 14, name: 'Sempre Preparado', description: '1x por cena: retira da mochila qualquer item comum de 1 espaço mesmo sem ter anotado.' },
      { level: 17, name: 'Um Passo à Frente', description: '1x por cena: realiza uma ação padrão adicional em seu turno.' },
      { level: 20, name: 'Mestre Operador', description: 'Perito passa a custar 0 PE. Escolha 2 perícias Veteranas para se tornarem Expert imediatamente.' }
    ],
    tracks: [
      {
        id: 'infiltrador',
        name: 'Trilha: Infiltrador',
        description: 'Mestre em evasão, reconhecimento e ataques furtivos nas sombras.',
        abilities: [
          { level: 3, name: 'Ataque Furtivo', description: '1x por rodada em alvo Desprevenido ou flanqueado: causa +1d6 de dano. Treinado em Furtividade e Crime.' },
          { level: 8, name: 'Sumir', description: 'Ação de movimento: esconde-se mesmo sob observação se houver penumbra. Ataque Furtivo +2d6.' },
          { level: 13, name: 'Mestre das Sombras', description: '+1 dado bônus em Furtividade e Crime. Ataque Furtivo passa a causar +3d6.' },
          { level: 18, name: 'Fantasma', description: '1x/cena ao atacar, esconde-se como reação sem teste. Ataque Furtivo +4d6.' }
        ]
      },
      {
        id: 'selador',
        name: 'Trilha: Selador',
        description: 'O elemento mais crucial da Academia: fecha os Núcleos e salva cidades.',
        abilities: [
          { level: 3, name: 'Mãos Firmes', description: 'Treinado em Selagem com +1 dado bônus. Reduz a Pressão do Relógio em 1 na DT de Selagem.' },
          { level: 8, name: 'Leitura de Núcleo', description: 'Ação de movimento: lê o Núcleo sem teste (sabe Grau e horas). DT de Selagem reduz em 2.' },
          { level: 13, name: 'Selo Duplo', description: 'Instala dois selos ao mesmo tempo. Tempo de manutenção da Selagem cai em 1 rodada (mín. 1).' },
          { level: 18, name: 'Fechar o Mundo', description: '1x/missão: converte um teste de Selagem falho em sucesso ao custo de +5% de Contágio.' }
        ]
      },
      {
        id: 'forjador',
        name: 'Trilha: Forjador',
        description: 'Mestre dos compostos, armas fendidas e engenharia com Resíduo.',
        abilities: [
          { level: 3, name: 'Engenheiro de Campo', description: 'Treinado em Tecnologia e Ciências. 1x/cena, 1 PE: concede a uma arma +1 dado em ataques.' },
          { level: 8, name: 'Resíduo Estável', description: 'Extrai Resíduo de Alheios (Ciências DT 15, 1h). Manuseia Resíduo bruto sem ganhar Contágio.' },
          { level: 13, name: 'Arma Pessoal', description: 'Sua arma fendida ganha propriedade extra à escolha e você a usa sem penalidade.' },
          { level: 18, name: 'Obra-Prima', description: 'Cria uma arma única de Resíduo raro com regras customizadas aprovadas pelo Mestre.' }
        ]
      },
      {
        id: 'ancora',
        name: 'Trilha: Âncora',
        description: 'O pilar psicológico e médico que mantém o grupo vivo e são.',
        abilities: [
          { level: 3, name: 'Primeira Ajuda', description: 'Treinado em Medicina e Vontade. Primeiros socorros como ação de movimento com cura +INT.' },
          { level: 8, name: 'Palavra Âncora', description: 'Ação padrão, 2 PE: remove Abalado/Apavorado de aliado em 9 m e recupera 1d6 + PRE de Mente.' },
          { level: 13, name: 'Anulação', description: '1x por cena: quando um aliado em 9 m for ganhar Contágio, reduz o ganho em até 2%.' },
          { level: 18, name: 'Rede de Segurança', description: '1x/dia quando aliado em 9 m for a 0 PV, fica com 1 PV e perde 3% de Contágio.' }
        ]
      }
    ]
  },
  {
    id: 'desperto',
    name: 'Desperto',
    basePV: 12,
    pvPerLevel: 2,
    basePE: 6,
    pePerLevel: 4,
    baseMEN: 20,
    menPerLevel: 5,
    trainedSkillsText: 'Vontade, Anomalia, mais 2 à escolha e INT extras.',
    fixedSkills: ['Vontade', 'Anomalia'],
    skillsToChooseCount: 2,
    proficiencies: 'Armas simples. Armaduras leves.',
    division: 'Núcleo Desperto',
    classAbilities: [
      { level: 1, name: 'Dom Inicial', description: 'Aprende o Dom Básico da Afinidade escolhida e ganha a trilha correspondente.' },
      { level: 1, name: 'Ressonância', description: 'Ao final de cenas onde gastou PE em Dons, seu Contágio sobe 1% a cada 5 PE gastos (mín. 1%).' },
      { level: 5, name: 'Dom Ampliado', description: 'Gaste até PRE em PE adicionais: a cada 2 PE extras, cause +1d6 de dano ou +1 na DT.' },
      { level: 10, name: 'Segundo Dom', description: 'Aprende um Dom adicional de qualquer Afinidade, usando mesmo Atributo e DT.' },
      { level: 14, name: 'Voz Abafada', description: 'Ganha +1 dado bônus em testes de Vontade para resistir ao chamado do Contágio.' },
      { level: 17, name: 'Fonte Profunda', description: '1x por rodada, um Dom seu custa 1 PE a menos (mínimo 1).' },
      { level: 20, name: 'Ápice do Desperto', description: '1x/dia usa um Dom sem custo de PE, sem Ressonância e com efeito máximo (dano max, duração x2).' }
    ],
    tracks: [
      {
        id: 'carne',
        name: 'Afinidade: Carne',
        description: 'Domínio sobre corpo, sangue e regeneração. Força bruta e resistência biológica.',
        abilities: [
          { level: 1, name: 'Dom Básico: Endurecer', description: '1 PE, ação de movimento: ganha RD 2 físico até o início do próximo turno.' },
          { level: 3, name: 'Regeneração', description: '2 PE, ação de movimento: recupere 1d6 + VIG de PV.' },
          { level: 8, name: 'Fúria da Carne', description: '3 PE, ação de movimento: por 1 cena, +2 de dano corpo a corpo e RD +1.' },
          { level: 13, name: 'Forma Ampliada', description: '4 PE, ação padrão: seu corpo se expande (1 cena). +1 dado em Luta/Atletismo, RD +3, alcance +1,5 m.' },
          { level: 18, name: 'Corpo Irrompível', description: 'Imune a Sangrando e Envenenado. 1x/dia ao cair a 0 PV, recupera metade dos PV máximos.' }
        ]
      },
      {
        id: 'eco',
        name: 'Afinidade: Eco',
        description: 'Vibração, telepatia, perturbação sônica e leitura de pensamentos.',
        abilities: [
          { level: 1, name: 'Dom Básico: Sussurro', description: '1 PE, ação padrão: telepatia curta secreta ou envio de imagem mental.' },
          { level: 3, name: 'Pulso de Eco', description: '2 PE, ação padrão: cone de 9 m. Fortitude: 2d6 dano sonoro. Se falhar por 5+, Atordoado 1 rodada.' },
          { level: 8, name: 'Ouvir o que Ninguém Ouve', description: '2 PE, ação de movimento: por 1 cena, percebe criaturas em 18 m mesmo sem ver e não é surpreendido.' },
          { level: 13, name: 'Voz de Comando', description: '3 PE, ação padrão: alvo em Curto faz Vontade; falha: obedece ordem simples não suicida na próx ação.' },
          { level: 18, name: 'Coro', description: 'Ao usar Dom de alvo único, gaste +3 PE para afetar até 3 alvos simultaneamente.' }
        ]
      },
      {
        id: 'brasa',
        name: 'Afinidade: Brasa',
        description: 'Fogo primal, calor, descargas elétricas e pura destruição de área.',
        abilities: [
          { level: 1, name: 'Dom Básico: Faísca', description: '2 PE, ação padrão: alvo em Curto faz Reflexos. Falha: 2d6 dano de energia; Sucesso: metade.' },
          { level: 3, name: 'Arco Voltaico', description: '3 PE, ação padrão: linha de 9 m. Reflexos; falha: 3d6 de dano; sucesso: metade.' },
          { level: 8, name: 'Armadura de Calor', description: '3 PE, ação de movimento: por 1 cena, RD 5 contra energia e atacantes corpo a corpo sofrem 1d6.' },
          { level: 13, name: 'Explosão', description: '5 PE, ação padrão: esfera de 6 m de raio. Reflexos: 6d6 de dano; sucesso: metade.' },
          { level: 18, name: 'Estrela Anã', description: '1x/cena, ação completa, 8 PE: esfera de 12 m. Reflexos: falha 12d6. Causa +10% de Contágio!' }
        ]
      },
      {
        id: 'vazio',
        name: 'Afinidade: Vazio',
        description: 'Distorção de espaço, gravidade, teletransporte e bolsões dimensionais.',
        abilities: [
          { level: 1, name: 'Dom Básico: Empurrão do Vazio', description: '1 PE, ação padrão: alvo em Curto faz Fortitude. Falha: empurrado 3 m e Caído.' },
          { level: 3, name: 'Gravidade Local', description: '2 PE, ação padrão: área 3 m vira terreno difícil por 1 rodada e puxa voadores ao solo.' },
          { level: 8, name: 'Passo do Vazio', description: '2 PE, ação de movimento: teletransporte até 9 m em linha de visão.' },
          { level: 13, name: 'Poço', description: '4 PE, ação padrão: criaturas em esfera de 6 m fazem Fortitude; falha: puxadas ao centro e Imóveis.' },
          { level: 18, name: 'Colapso', description: '6 PE, ação padrão: alvo faz Fortitude (falha: 10d6 e Atordoado 1 rodada) OU teletransporta grupo 18 m.' }
        ]
      },
      {
        id: 'veu',
        name: 'Afinidade: Véu',
        description: 'Ilusões, sombras, desaparecimento e manipulação da percepção alheia.',
        abilities: [
          { level: 1, name: 'Dom Básico: Manto', description: '1 PE, ação de movimento: +1 dado em Furtividade na cena e camuflagem parcial por 1 rodada.' },
          { level: 3, name: 'Manto de Sombras', description: '2 PE, ação de movimento: +2 dados em Furtividade por 1 cena. Pode se esconder observado se penumbra.' },
          { level: 8, name: 'Ilusão Menor', description: '2 PE, ação padrão: imagem de 3 m de lado por 1 cena. Observadores fazem Vontade/Percepção.' },
          { level: 13, name: 'Duplicata', description: '4 PE, ação padrão: cópia ilusória em Curto por 1 rodada/2 PE. Inimigos testam Vontade para atacar o real.' },
          { level: 18, name: 'Sumir do Mundo', description: '6 PE, ação padrão: invisível por 1 minuto (ou até atacar). Causa +1% de Contágio por uso.' }
        ]
      }
    ]
  }
];

// ==========================================
// ARMAS OFICIAIS (VOLUME 6 — ARMAMENTO)
// ==========================================
export const OFFICIAL_WEAPONS: Weapon[] = TODAS_ARMAS_VOL6;

// ==========================================
// 21 DONS PRONTOS DO LIVRO + BÁSICOS
// ==========================================
export const OFFICIAL_GIFTS: Gift[] = [
  // Básicos
  {
    id: 'dom_endurecer',
    name: 'Endurecer (Carne Básico)',
    affinity: 'carne',
    minLevel: 1,
    domainLevel: 1,
    baseEffect: 'Ganha RD 2 contra dano físico até o início do seu próximo turno.',
    action: 'Movimento',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 1,
    signature: 'A pele ganha uma tonalidade cinzenta e rígida como couro seco ao toque.',
    description: 'Fortalece o tecido corporal para absorver impactos brutais.'
  },
  {
    id: 'dom_sussurro',
    name: 'Sussurro (Eco Básico)',
    affinity: 'eco',
    minLevel: 1,
    domainLevel: 1,
    baseEffect: 'Fala secretamente com uma pessoa em alcance Curto sem ser ouvido por ninguém, ou projeta uma imagem mental simples.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 1,
    signature: 'Um estalo seco nos ouvidos do receptor e o arrepio de uma voz murmurada na nuca.',
    description: 'Projeção sônica psíquica unidirecional.'
  },
  {
    id: 'dom_faisca',
    name: 'Faísca (Brasa Básico)',
    affinity: 'brasa',
    minLevel: 1,
    domainLevel: 1,
    baseEffect: 'Alvo em alcance Curto faz Reflexos; falha: 2d6 de dano de energia; sucesso: metade.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 2,
    signature: 'Faíscas alaranjadas crepitam nos nós dos dedos com forte cheiro de ozônio e queimado.',
    description: 'Descarga elétrica e ígnea súbita projetada contra o alvo.'
  },
  {
    id: 'dom_empurrao_vazio',
    name: 'Empurrão do Vazio (Vazio Básico)',
    affinity: 'vazio',
    minLevel: 1,
    domainLevel: 1,
    baseEffect: 'Alvo em alcance Curto faz Fortitude; falha: é empurrado 3 m e fica Caído.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 1,
    signature: 'O ar se contrai numa ondulação gravitacional fria e cinzenta.',
    description: 'Pulso de gravidade invertida direcionado que prostra o inimigo.'
  },
  {
    id: 'dom_manto',
    name: 'Manto (Véu Básico)',
    affinity: 'veu',
    minLevel: 1,
    domainLevel: 1,
    baseEffect: 'Ganha +1 dado bônus em Furtividade até o fim da cena, e camuflagem parcial por 1 rodada.',
    action: 'Movimento',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Uma cena',
    enhancements: [],
    limiters: [],
    peCost: 1,
    signature: 'A sombra do corpo se alonga e a luz ao redor parece deslizar sem tocar o agente.',
    description: 'Envolve o corpo em dobras de penumbra distorcida.'
  },

  // 21 DONS DO CAPÍTULO 43
  {
    id: 'dom_lasca_osso',
    name: 'Lasca de Osso',
    affinity: 'carne',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Fortitude: 4d6 de dano perfurante (metade no sucesso); o agente sofre 1d6 de dano.',
    action: 'Padrão',
    range: 'Médio',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: ['Esforço (-2 PE: sofre 1d6 PV)'],
    peCost: 2,
    signature: 'O osso da falange rasga a ponta do dedo e é disparado como um dardo veloz.',
    description: 'Dispara fragmento de osso vivo projetilado do próprio corpo.'
  },
  {
    id: 'dom_mao_curativa',
    name: 'Mão Curativa',
    affinity: 'carne',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Um aliado em alcance Curto recupera 2d6 PV.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 aliado',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 2,
    signature: 'Veias luminosas avermelhadas pulsam na palma e transferem calor vital que sutura a carne.',
    description: 'Acelera a cicatrização celular de tecidos rompidos.'
  },
  {
    id: 'dom_armadura_osso',
    name: 'Armadura de Osso',
    affinity: 'carne',
    minLevel: 6,
    domainLevel: 1,
    baseEffect: 'Concede RD 5 contra dano físico por uma cena inteira.',
    action: 'Padrão',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Uma cena',
    enhancements: [],
    limiters: [],
    peCost: 4,
    signature: 'Placas ósseas e queratina brotam da epiderme como uma carapaça biológica.',
    description: 'Crescimento ósseo dérmico espesso que resiste a cortes e pancadas.'
  },
  {
    id: 'dom_muro_carne',
    name: 'Muro de Carne',
    affinity: 'carne',
    minLevel: 8,
    domainLevel: 1,
    baseEffect: 'Cria uma barreira de 3 m com 20 PV por uma cena.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: 'Linha de 3 m',
    duration: 'Uma cena',
    enhancements: [],
    limiters: [],
    peCost: 3,
    signature: 'O chão sangra e ergue uma parede pulsante de fibras musculares e ossos entrelaçados.',
    description: 'Barreira biológica densa erguida para contenção de corredores.'
  },
  {
    id: 'dom_sopro_quente',
    name: 'Sopro Quente',
    affinity: 'brasa',
    minLevel: 2,
    domainLevel: 1,
    baseEffect: 'Cone de 9 m. Reflexos: 2d6 de dano de fogo; metade se passar.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: 'Cone de 9 m',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 2,
    signature: 'Uma baforada de ar incandescente que incendeia papéis e queima o oxigênio.',
    description: 'Lança uma torrente cônica de labaredas e fagulhas.'
  },
  {
    id: 'dom_faisca_dupla',
    name: 'Faísca Dupla',
    affinity: 'brasa',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Até 3 alvos em Curto. Reflexos: 2d6 de dano elétrico cada.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: 'Até 3 alvos',
    duration: 'Instantânea',
    enhancements: ['Até 3 alvos (+1 PE)'],
    limiters: [],
    peCost: 3,
    signature: 'Dois arcos elétricos azuis-alaranjados saltam estalando entre as vítimas.',
    description: 'Bifurcação elétrica de alta voltagem em alvos múltiplos.'
  },
  {
    id: 'dom_relampago_curto',
    name: 'Relâmpago Curto',
    affinity: 'brasa',
    minLevel: 4,
    domainLevel: 1,
    baseEffect: 'Alcance Médio. Reflexos: 4d6 de dano elétrico; metade se passar.',
    action: 'Padrão',
    range: 'Médio',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: ['Alcance Médio (+1 PE)'],
    limiters: [],
    peCost: 4,
    signature: 'Um clarão ofuscante seguido por estrondo que quebra lâmpadas ao redor.',
    description: 'Raio retilíneo focado com penetração direta.'
  },
  {
    id: 'dom_escudo_chamas',
    name: 'Escudo de Chamas',
    affinity: 'brasa',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Concede RD 5 contra dano de fogo e energia por uma cena inteira.',
    action: 'Padrão',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Uma cena',
    enhancements: ['Duração 1 Cena (+1 PE)'],
    limiters: [],
    peCost: 4,
    signature: 'Uma película de ar superaquecido distorce a visão como um espelho de calor.',
    description: 'Campo de calor reativo que dissipa ondas de choque energéticas.'
  },
  {
    id: 'dom_fala_calma',
    name: 'Fala Calma',
    affinity: 'eco',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Um aliado em Curto recupera 2d6 de Mente e encerra Abalado ou Apavorado.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 aliado',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 2,
    signature: 'O timbre da voz ressoa como um sino harmônico que abafa o zumbido do terror mental.',
    description: 'Restauração da sanidade através de frequências reconfortantes.'
  },
  {
    id: 'dom_sussurro_coletivo',
    name: 'Sussurro Coletivo',
    affinity: 'eco',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Até 3 aliados em Curto comunicam-se telepaticamente por uma cena inteira.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: 'Até 3 aliados',
    duration: 'Uma cena',
    enhancements: ['Até 3 alvos (+1 PE)', 'Duração 1 Cena (+1 PE)'],
    limiters: [],
    peCost: 3,
    signature: 'Uma linha sutil de eco mental conecta as mentes, audível apenas como zumbido leve.',
    description: 'Canal de rádio psíquico imune a interceptações eletrônicas comuns.'
  },
  {
    id: 'dom_voz_medo',
    name: 'Voz do Medo',
    affinity: 'eco',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Vontade: o alvo fica Apavorado por 1 rodada (-2 dados em testes e foge da fonte).',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 3,
    signature: 'A voz assume a entonação do maior trauma de quem escuta, duplicada por estática.',
    description: 'Injeção de terror primal no córtex auditivo do alvo.'
  },
  {
    id: 'dom_eco_protetor',
    name: 'Eco Protetor',
    affinity: 'eco',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Como reação imediata: um aliado em Curto ganha 10 PV temporários.',
    action: 'Reação',
    range: 'Curto',
    targetArea: '1 aliado',
    duration: 'Instantânea',
    enhancements: ['Ação de Reação (+2 PE)'],
    limiters: [],
    peCost: 4,
    signature: 'Uma redoma sônica reverbera em torno do aliado, absorvendo o choque do golpe.',
    description: 'Barreira de pressão de ar comprimido defletora.'
  },
  {
    id: 'dom_onda_choque',
    name: 'Onda de Choque',
    affinity: 'eco',
    minLevel: 8,
    domainLevel: 1,
    baseEffect: 'Esfera de 6 m. Fortitude: 6d6 de dano sonoro. Uma vez por cena.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: 'Esfera de 6 m',
    duration: 'Instantânea',
    enhancements: ['Esfera 6 m (+1 PE)'],
    limiters: ['Recarga (-2 PE: 1x por cena)'],
    peCost: 3,
    signature: 'O agente bate palmas e o ar implode em um estrondo sônico que estilhaça vidraças.',
    description: 'Detonação vibracional de alta frequência em área.'
  },
  {
    id: 'dom_salto_curto',
    name: 'Salto Curto',
    affinity: 'vazio',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Teletransporte de até 9 m como ação de movimento. Uma vez por cena.',
    action: 'Movimento',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Instantânea',
    enhancements: ['Ação de Movimento (+1 PE)'],
    limiters: ['Recarga (-2 PE: 1x por cena)'],
    peCost: 1,
    signature: 'O corpo dobra sobre si mesmo em um silêncio absoluto e ressurge a metros de distância.',
    description: 'Micro-salto através de uma fresta no espaço euclidiano.'
  },
  {
    id: 'dom_peso_chumbo',
    name: 'Peso de Chumbo',
    affinity: 'vazio',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Fortitude: alvo em Curto fica Lento por 3 rodadas (metade deslocamento e 1 ação/turno).',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: '3 rodadas',
    enhancements: ['Duração 3 rodadas (+1 PE)'],
    limiters: [],
    peCost: 3,
    signature: 'A gravidade em torno do alvo se multiplica por três; o chão range sob as botas.',
    description: 'Ancoragem hipergravitacional pontual.'
  },
  {
    id: 'dom_queda_livre',
    name: 'Queda Livre',
    affinity: 'vazio',
    minLevel: 4,
    domainLevel: 1,
    baseEffect: 'Fortitude: o alvo em Médio alcance é arremessado 9 metros para trás.',
    action: 'Padrão',
    range: 'Médio',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: ['Alcance Médio (+1 PE)', 'Empurrão 9 m (+2 PE)'],
    limiters: [],
    peCost: 4,
    signature: 'Um vácuo se forma atrás do alvo puxando-o violentamente em trajetória balística.',
    description: 'Distorção vetorial gravitacional horizontal.'
  },
  {
    id: 'dom_corredor_vazio',
    name: 'Corredor do Vazio',
    affinity: 'vazio',
    minLevel: 10,
    domainLevel: 1,
    baseEffect: 'Teleporta a si mesmo e a um aliado adjacente em até 18 metros.',
    action: 'Padrão',
    range: 'Médio',
    targetArea: 'Você + 1 aliado',
    duration: 'Instantânea',
    enhancements: ['Levar Aliado (+2 PE)', 'Alcance 18 m (+1 PE)'],
    limiters: [],
    peCost: 5,
    signature: 'Duas sombras se desvanecem no ar como fumaça engolida por uma fenda escura.',
    description: 'Abertura rápida de um túnel dimensional de escape coordenado.'
  },
  {
    id: 'dom_rosto_passageiro',
    name: 'Rosto Passageiro',
    affinity: 'veu',
    minLevel: 3,
    domainLevel: 1,
    baseEffect: 'Disfarce completo por 1 hora. Requer um espelho ou superfície reflexiva à vista.',
    action: 'Padrão',
    range: 'Pessoal',
    targetArea: 'Você mesmo',
    duration: 'Uma hora',
    enhancements: [],
    limiters: ['Foco: espelho (-1 PE)'],
    peCost: 1,
    signature: 'O reflexo no espelho pisca com outro rosto e as feições do agente se moldam à imagem.',
    description: 'Falsa camada mimética de luz e ilusão sobre os traços faciais.'
  },
  {
    id: 'dom_olhar_que_perde',
    name: 'Olhar que Perde',
    affinity: 'veu',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Vontade: o alvo em Curto fica Fascinado por 1 rodada (-2 dados em Percepção).',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: 'Instantânea',
    enhancements: [],
    limiters: [],
    peCost: 3,
    signature: 'Os olhos do Desperto parecem dois poços de escuridão sem reflexo ou fundo.',
    description: 'Hipnose sensorial provocada por distorção óptica do Véu.'
  },
  {
    id: 'dom_imagem_gigante',
    name: 'Imagem Gigante',
    affinity: 'veu',
    minLevel: 6,
    domainLevel: 1,
    baseEffect: 'Cria uma ilusão tridimensional de 3 m a até 18 m de distância, durando por uma cena.',
    action: 'Padrão',
    range: 'Médio',
    targetArea: 'Área 3 m',
    duration: 'Uma cena',
    enhancements: ['Alcance Médio (+1 PE)'],
    limiters: [],
    peCost: 3,
    signature: 'O ar oscila em tons violeta e desenha uma figura vívida que duplica a realidade.',
    description: 'Holograma espectral estático ou com pequenos movimentos repetitivos.'
  },
  {
    id: 'dom_sombra_que_roi',
    name: 'Sombra que Rói',
    affinity: 'veu',
    minLevel: 5,
    domainLevel: 1,
    baseEffect: 'Vontade: 4d6 de dano psíquico imediato e mais 1d6 por rodada durante 3 rodadas.',
    action: 'Padrão',
    range: 'Curto',
    targetArea: '1 alvo',
    duration: '3 rodadas',
    enhancements: ['Persistente (+2 PE)'],
    limiters: [],
    peCost: 5,
    signature: 'A sombra do próprio inimigo sobe por suas costas como garras de névoa mordendo a mente.',
    description: 'Ataque psíquico continuado que corrói a estabilidade mental do alvo.'
  }
];

// ==========================================
// 6 AGENTES PRONTOS DO LIVRO (CAPÍTULO 23)
// ==========================================
export const PREMADE_CHARACTERS: Character[] = [
  {
    id: 'char_rafa_muralha',
    ownerId: 'default_gm',
    name: 'Rafa "Muralha" Duarte',
    nickname: 'Muralha',
    concept: 'Um ex-jogador de futebol que resolve tudo com o corpo e que tem medo de ficar sem ninguém para proteger.',
    originId: 'atleta_descartado',
    classId: 'vanguarda',
    trackId: 'muralha',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 3, AGI: 1, INT: 1, VIG: 3, PRE: 1 },
    skills: {
      'Atletismo': 'treinado',
      'Fortitude': 'treinado',
      'Luta': 'treinado',
      'Intimidação': 'treinado',
      'Percepção': 'treinado',
      'Iniciativa': 'treinado',
      'Tática': 'treinado'
    },
    bond: 'A irmã mais nova, que mora com a avó.',
    flaw: 'Não consegue deixar ninguém para trás, mesmo quando deveria.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['machado'],
    equippedArmorId: 'colete_tecido',
    equippedShieldId: 'escudo_leve',
    inventory: [
      { id: 'item_aferidor', name: 'Aferidor de Pulso Modelo 2034', spaces: 0, notes: 'Pulseira de aço fosco oficial' },
      { id: 'item_colete_leve', name: 'Colete Leve (+1 Defesa, RD 2 balístico/perfurante)', spaces: 1 },
      { id: 'item_kit_socorros', name: 'Kit de Primeiros Socorros (+1 dado em Medicina)', spaces: 1 },
      { id: 'item_lanterna', name: 'Lanterna Tática (9 m)', spaces: 1 }
    ],
    knownGiftIds: [],
    notes: 'Ex-zagueiro da base do Coritiba. Porte maciço, leal até a teimosia.',
    appearance: 'Alto, cicatriz no ombro esquerdo de uma lesão antiga, uniforme cinza bem ajustado.',
    lastActDraft: 'Digam à minha irmã que eu não precisei ficar sozinho.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char_nina_sombra',
    ownerId: 'default_gm',
    name: 'Nina "Sombra" Alcântara',
    nickname: 'Sombra',
    concept: 'Uma garota de rua que fugiu da cadeia e tem medo de confiar em alguém.',
    originId: 'infrator',
    classId: 'operador',
    trackId: 'infiltrador',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 1, AGI: 3, INT: 2, VIG: 1, PRE: 2 },
    skills: {
      'Crime': 'treinado',
      'Furtividade': 'treinado',
      'Percepção': 'treinado',
      'Iniciativa': 'treinado',
      'Acrobacia': 'treinado',
      'Pontaria': 'treinado',
      'Investigação': 'treinado',
      'Tecnologia': 'treinado',
      'Intuição': 'treinado'
    },
    bond: 'Um amigo de infância que ficou fora da Academia.',
    flaw: 'Desconfia de qualquer autoridade e age sozinha quando pressionada.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['pistola_tatica_l', 'faca_tatica_l'],
    equippedArmorId: 'colete_tecido',
    inventory: [
      { id: 'item_aferidor_nina', name: 'Aferidor de Pulso', spaces: 0 },
      { id: 'item_colete_nina', name: 'Colete Leve', spaces: 1 },
      { id: 'item_ferramentas_infiltracao', name: 'Gazuas e Kit de Infiltração', spaces: 1 }
    ],
    knownGiftIds: [],
    notes: 'Cresceu no morro e vivia de pequenos furtos. Detesta ordens.',
    appearance: 'Cabelo curto desfiado, jaqueta escura com bolsos escondidos, olhar atento.',
    lastActDraft: 'Se eu cair, não olhem pra trás.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char_davi_cerebro',
    ownerId: 'default_gm',
    name: 'Davi "Cérebro" Lopes',
    nickname: 'Cérebro',
    concept: 'Um prodígio da matemática que acredita que qualquer Fenda é apenas uma equação mal resolvida.',
    originId: 'prodigio_rebelde',
    classId: 'operador',
    trackId: 'selador',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 1, AGI: 1, INT: 3, VIG: 1, PRE: 3 },
    skills: {
      'Ciências': 'treinado',
      'Tecnologia': 'treinado',
      'Percepção': 'treinado',
      'Selagem': 'treinado',
      'Anomalia': 'treinado',
      'Tática': 'treinado',
      'Investigação': 'treinado',
      'Medicina': 'treinado',
      'Atualidades': 'treinado',
      'Diplomacia': 'treinado'
    },
    bond: 'Um mentor da Academia que o defendeu no julgamento.',
    flaw: 'Orgulho intelectual cego: nunca admite que errou um cálculo.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['pistola'],
    equippedArmorId: 'colete_tecido',
    inventory: [
      { id: 'item_aferidor_davi', name: 'Aferidor de Pulso Calibrado', spaces: 0 },
      { id: 'item_selos', name: '3x Selos de Resíduo Estabilizado', spaces: 1 },
      { id: 'item_ferramentas_selagem', name: 'Kit de Ancoragem e Selagem de Núcleos', spaces: 1 }
    ],
    knownGiftIds: [],
    notes: 'Aos 17 anos registrou duas patentes de estabilização de pulso.',
    appearance: 'Óculos com armação reforçada, bloco de notas digital, postura inquieta.',
    lastActDraft: 'Os números batiam... eu juro que batiam.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char_helena_guardia',
    ownerId: 'default_gm',
    name: 'Helena "Guardiã" Reis',
    nickname: 'Guardiã',
    concept: 'Uma jovem que perdeu o pai numa Ruptura e prometeu nunca mais permitir que o silêncio leve uma família.',
    originId: 'voluntario_idealista',
    classId: 'vanguarda',
    trackId: 'muralha',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 2, AGI: 2, INT: 1, VIG: 3, PRE: 1 },
    skills: {
      'Diplomacia': 'treinado',
      'Medicina': 'treinado',
      'Pontaria': 'treinado',
      'Fortitude': 'treinado',
      'Atletismo': 'treinado',
      'Percepção': 'treinado',
      'Tática': 'treinado'
    },
    bond: 'A promessa feita ao túmulo de seu pai.',
    flaw: 'Heroísmo suicida: coloca-se sempre na frente do perigo antes de pensar.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['fuzil_assalto', 'faca_tatica_l'],
    equippedArmorId: 'colete_tatico',
    inventory: [
      { id: 'item_aferidor_helena', name: 'Aferidor de Pulso', spaces: 0 },
      { id: 'item_colete_helena', name: 'Colete Tático (+2 Defesa)', spaces: 2 },
      { id: 'item_medkit', name: 'Kit Médico de Emergência', spaces: 1 }
    ],
    knownGiftIds: [],
    notes: 'Voluntária de primeira hora. Firme, compassiva e obstinada.',
    appearance: 'Cabelos presos em rabo de cavalo prático, farda impecável da Academia.',
    lastActDraft: 'Fiquem atrás de mim. Vai dar tudo certo.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char_leo_voz',
    ownerId: 'default_gm',
    name: 'Léo "Voz" Matos',
    nickname: 'Voz',
    concept: 'Um cantor de rua cuja voz explodiu uma vitrine na primeira manifestação do Dom.',
    originId: 'artista_rua',
    classId: 'desperto',
    trackId: 'eco',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 1, AGI: 2, INT: 2, VIG: 1, PRE: 3 },
    skills: {
      'Artes': 'treinado',
      'Enganação': 'treinado',
      'Vontade': 'treinado',
      'Anomalia': 'treinado',
      'Diplomacia': 'treinado',
      'Intuição': 'treinado',
      'Percepção': 'treinado',
      'Investigação': 'treinado'
    },
    bond: 'Um colega de quarto, a única pessoa com quem fala a verdade.',
    flaw: 'Pavor visceral de abandono: faz qualquer coisa para não ficar sozinho.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['machado'],
    equippedArmorId: 'colete_tecido',
    equippedShieldId: 'escudo_leve',
    inventory: [
      { id: 'item_aferidor_leo', name: 'Aferidor de Pulso Sensível', spaces: 0 },
      { id: 'item_talisma', name: 'Talismã de Foco (diapasão metálico no pescoço)', spaces: 0 },
      { id: 'item_casaco', name: 'Casaco Reforçado com Fibras (+1 Defesa)', spaces: 1 }
    ],
    knownGiftIds: ['dom_sussurro', 'dom_fala_calma'],
    notes: 'Desperto do Eco. Escuta os sussurros do outro lado com frequência alarmante.',
    appearance: 'Olhar inquieto, dedos trêmulos acariciando o Aferidor, fones de ouvido no pescoço.',
    lastActDraft: 'Eu só queria que o barulho parasse.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char_bia_lamina',
    ownerId: 'default_gm',
    name: 'Bia "Lâmina" Cardoso',
    nickname: 'Lâmina',
    concept: 'Uma ex-combatente de gangue de periferia que jurou lealdade ao instrutor que a acolheu.',
    originId: 'ex_gangue',
    classId: 'vanguarda',
    trackId: 'lamina',
    level: 1,
    rank: 'Calouro',
    attributes: { FOR: 3, AGI: 3, INT: 1, VIG: 1, PRE: 1 },
    skills: {
      'Luta': 'treinado',
      'Intimidação': 'treinado',
      'Fortitude': 'treinado',
      'Acrobacia': 'treinado',
      'Iniciativa': 'treinado',
      'Percepção': 'treinado',
      'Atletismo': 'treinado'
    },
    bond: 'O instrutor Brandão que acreditou nela quando ninguém acreditou.',
    flaw: 'Raiva incontrolável: perde a cabeça se for insultada em público.',
    traumas: [],
    merit: 10,
    isPublic: true,
    equippedWeaponIds: ['facao_tatico', 'faca_tatica_l'],
    equippedArmorId: 'colete_tecido',
    inventory: [
      { id: 'item_aferidor_bia', name: 'Aferidor de Pulso', spaces: 0 },
      { id: 'item_colete_bia', name: 'Colete Leve', spaces: 1 },
      { id: 'item_bandagens', name: 'Faixas de Combate para as Mãos', spaces: 0 }
    ],
    knownGiftIds: [],
    notes: 'Veloz e implacável em combate próximo.',
    appearance: 'Cicatrizes nas mãos, andar felino e olhar duro.',
    lastActDraft: 'Eu avisei que ninguém ia passar por cima da gente.',
    createdAt: new Date().toISOString()
  }
];

// ==========================================
// BESTIÁRIO OFICIAL INICIAL
// ==========================================
export const OFFICIAL_BESTIARY: Creature[] = [
  {
    id: 'creature_rastejante',
    name: 'Rastejante da Fenda',
    type: 'Rastejante',
    degree: 1,
    pv: 20,
    currentPv: 20,
    defense: 13,
    rdAlheia: 0,
    speed: '12 m (rápido)',
    resistances: { fortitude: 2, reflexos: 4, vontade: 1 },
    attacks: [
      {
        name: 'Mordida Voraz',
        attackBonus: 4,
        damageFormula: '1d8+2',
        damageType: 'perfurante',
        contagionOnHit: 1,
        saveDC: 12,
        saveType: 'Fortitude',
        effectDescription: 'Se acertar, alvo faz Fortitude DT 12 ou sofre +1% de Contágio.'
      }
    ],
    traits: [
      'Alheio em bando: se metade do grupo morrer, os sobreviventes tentam fugir.',
      'Ignora obstáculos baixos de terreno.'
    ],
    powers: [],
    description: 'Criatura quadrúpede com mandíbulas expostas e pele coriácea translúcida.'
  },
  {
    id: 'creature_cacador',
    name: 'Caçador Fendido',
    type: 'Caçador',
    degree: 2,
    pv: 45,
    currentPv: 45,
    defense: 14,
    rdAlheia: 2,
    speed: '12 m (rápido)',
    resistances: { fortitude: 11, reflexos: 6, vontade: 4 },
    attacks: [
      {
        name: 'Garras Cortantes',
        attackBonus: 8,
        damageFormula: '2d8+3',
        damageType: 'cortante',
        contagionOnHit: 2,
        saveDC: 15,
        saveType: 'Fortitude',
        effectDescription: 'Ataque contagiante: falha em Fortitude DT 15 adiciona +2% de Contágio.'
      }
    ],
    traits: [
      'RD Alheia 2: ignora 2 de dano físico comum, vulnerável a dano Fendido e Dons.',
      'Isca tática: persegue implacavelmente o alvo que mais demonstrar fraqueza.'
    ],
    powers: [
      {
        name: 'Rugido Desolador',
        description: 'Ação padrão em alcance Curto: todos os agentes fazem Vontade DT 15 ou ficam Abalados por 1 rodada.',
        dc: 15
      }
    ],
    description: 'Predador bípede com musculatura hipertrofiada, crânio sem olhos e garras de resíduo cristalizado.'
  },
  {
    id: 'creature_bruto',
    name: 'Bruto de Ruptura',
    type: 'Bruto',
    degree: 3,
    pv: 90,
    currentPv: 90,
    defense: 14,
    rdAlheia: 4,
    speed: '6 m (lento)',
    resistances: { fortitude: 14, reflexos: 3, vontade: 6 },
    attacks: [
      {
        name: 'Pancada Esmagadora',
        attackBonus: 12,
        damageFormula: '3d8+5',
        damageType: 'contundente',
        contagionOnHit: 3,
        saveDC: 18,
        saveType: 'Fortitude',
        effectDescription: 'Alvo faz Fortitude DT 18 ou é arremessado 3 m e fica Caído.'
      }
    ],
    traits: [
      'RD Alheia 4 contra armas convencionais.',
      'Corpo massivo: imune a manobras de agarrar de criaturas menores.'
    ],
    powers: [
      {
        name: 'Onda Sísmica',
        description: 'Bate os punhos no chão: todos os agentes em 6 m fazem Reflexos DT 18 ou caem Caídos.',
        dc: 18
      }
    ],
    description: 'Massa colapso de pedra e carne estranha com mais de três metros de altura.'
  },
  {
    id: 'creature_horda_grau1',
    name: 'Horda de Rastejantes',
    type: 'Horda',
    degree: 1,
    pv: 30,
    currentPv: 30,
    defense: 10,
    rdAlheia: 0,
    speed: '9 m',
    resistances: { fortitude: 8, reflexos: 6, vontade: 2 },
    attacks: [
      {
        name: 'Maré de Dentes e Garras',
        attackBonus: 6,
        damageFormula: '1d8+2',
        damageType: 'cortante',
        effectDescription: 'Todos os agentes adjacentes à Horda fazem Reflexos DT 16 ou sofrem dano.'
      }
    ],
    traits: [
      'Ocupa espaço 3x3 (4,5 m).',
      'Ataques de área causam o DOBRO do dano na Horda.',
      'Ataques de alvo único causam METADE do dano.',
      'Ao cair a 15 PV, seu espaço cai para 2x2 e o dano é reduzido à metade.',
      'Imune a condições de Mente, Agarrar e Derrubar.'
    ],
    powers: [],
    description: 'Enxame contorcido de dezenas de Alheios menores avançando em frenesi.'
  },
  {
    id: 'creature_consumido_modelo',
    name: 'Consumido (Ex-Agente Turma 22)',
    type: 'Consumido',
    degree: 3,
    pv: 74,
    currentPv: 74,
    defense: 17,
    rdAlheia: 5,
    speed: '12 m',
    consumidoOriginalName: 'Cadete Mateus Silva',
    consumidoLastAct: '"Entreguem meu cordão pra minha mãe."',
    resistances: { fortitude: 14, reflexos: 12, vontade: 10 },
    attacks: [
      {
        name: 'Golpe Deformado',
        attackBonus: 15,
        damageFormula: '2d8+3',
        damageType: 'fendido',
        contagionOnHit: 3,
        saveDC: 13,
        saveType: 'Fortitude',
        effectDescription: 'Ataque contagiante: +3% de Contágio (Fortitude DT 13 evita o contágio).'
      }
    ],
    traits: [
      'RD 5 contra todos os tipos de dano.',
      'Imune a medo, controle mental e condições de Mente.',
      'Dar Nome ao Silêncio: Aliados com Vínculo podem usar ação padrão (Diplomacia ou Vontade DT 20 citando o Último Ato). 3 sucessos deixam o Consumido lúcido por 1 cena!'
    ],
    powers: [
      {
        name: 'Grito Rasgado do Passado',
        description: 'Vontade DT 16 em 9 m: alvos falhos ficam Atordoados ao reconhecer a voz de seu antigo companheiro.',
        dc: 16
      }
    ],
    description: 'Agente totalmente consumido pelo Contágio a 100%. Restos de farda cinza fundidos à carne mutante.'
  }
];

// ==========================================
// TABELAS DE EFEITOS DO LIVRO
// ==========================================
export const IMPULSOS_TABLE = [
  { roll: 1, name: 'Irritabilidade', effect: '-1 dado em testes sociais. Responde com agressividade desmedida a qualquer provocação.' },
  { roll: 2, name: 'Insônia Febril', effect: 'O próximo descanso completo não recupera Mente (pesadelos de fendas abertas).' },
  { roll: 3, name: 'Fome Estranha', effect: 'Precisa comer o dobro. Sem comida adequada na cena, sofre -1 dado em testes físicos.' },
  { roll: 4, name: 'Atração por Resíduo', effect: 'Ao ver Resíduo, faz Vontade DT 15 para não tocá-lo (sofrendo o contágio de contato).' },
  { roll: 5, name: 'Memória Falsa', effect: 'Convence-se firmemente de um fato que nunca aconteceu. O Mestre define os detalhes.' },
  { roll: 6, name: 'Voz Amiga', effect: 'Ouve conselhos de uma voz íntima e conhecida. Seguir o conselho dá +1 dado no teste e +1% de Contágio.' },
];

export const CHAMADO_TABLE = [
  { roll: 1, name: 'Fúria Cega', effect: 'Ataca imediatamente a criatura mais próxima, seja ela aliada ou inimiga. Ganha +2 de dano no ataque.' },
  { roll: 2, name: 'Paralisia Hipnótica', effect: 'Fica Atordoado por 1 rodada. Os olhos vidram em algo invisível aos outros no ar.' },
  { roll: 3, name: 'Obsessão pelo Núcleo', effect: 'Move-se desesperadamente em direção ao Núcleo, Fenda ou ao maior Alheio presente.' },
  { roll: 4, name: 'Comando da Voz', effect: 'O Mestre decide uma ação padrão completa do agente na rodada (nunca abertamente suicida).' },
  { roll: 5, name: 'Fuga em Pânico', effect: 'Fica Apavorado e gasta todo seu movimento fugindo do combate e dos companheiros.' },
  { roll: 6, name: 'Êxtase do Outro Lado', effect: 'Ganha +1 dado bônus em todos os testes por 1 rodada, mas ganha +1% de Contágio imediatamente.' },
];

export const ERRATIC_EFFECTS_TABLE = [
  { roll: 1, name: 'Desvio de Foco', effect: 'O Dom afeta um aliado próximo em vez do alvo escolhido.' },
  { roll: 2, name: 'Dreno Duplo', effect: 'O Dom consome o dobro de PE (se o agente não puder pagar, o Dom falha completamente).' },
  { roll: 3, name: 'Bloqueio Sináptico', effect: 'O agente fica incapaz de utilizar qualquer Dom por 1 rodada.' },
  { roll: 4, name: 'Ponto Errado', effect: 'O Dom explode a 1d6 x 1,5 metros de distância do ponto pretendido.' },
  { roll: 5, name: 'Calafrio Ambiental', effect: 'Luzes piscam e o ar congela: todos os presentes na cena fazem Vontade DT 15 ou ficam Abalados.' },
  { roll: 6, name: 'Sobrecarga Contagiante', effect: 'O Dom se manifesta com força máxima, mas o Contágio do agente sobe +2% de imediato.' },
];

export const LESIONS_TABLE = [
  { roll: 1, name: 'Braço Ferido', effect: '-1 dado em ataques e testes com aquele braço; impossível empunhar armas de duas mãos.', recovery: 'Âncora (24 h)' },
  { roll: 2, name: 'Perna Ferida', effect: 'Deslocamento reduzido em -3 m; -1 dado em Acrobacia e Atletismo.', recovery: 'Âncora (24 h)' },
  { roll: 3, name: 'Costelas Quebradas', effect: '-1 dado em Fortitude; não pode usar Segundo Fôlego; correr deixa Enjoado.', recovery: 'Tratamento (1 semana)' },
  { roll: 4, name: 'Concussão Severa', effect: '-1 dado em testes de INT e PRE; fica Confuso por 1 rodada.', recovery: 'Âncora (24 h)' },
  { roll: 5, name: 'Hemorragia Interna', effect: 'Fica com condição Sangrando persistente; DT para estancar sobe em +5.', recovery: 'Imediata (Medicina DT 20)' },
  { roll: 6, name: 'Olho Atingido', effect: '-1 dado em Percepção visual e Pontaria; fica Ofuscado na cena.', recovery: 'Tratamento (1 semana)' },
  { roll: 7, name: 'Tímpano Rompido', effect: 'Surdo por 1 cena; -1 dado em Percepção auditiva até ser tratado.', recovery: 'Âncora (24 h)' },
  { roll: 8, name: 'Mão Fraturada', effect: 'Larga o que estiver segurando no chão; -2 dados em qualquer teste manual.', recovery: 'Tratamento (1 semana)' },
  { roll: 9, name: 'Cicatriz Marcante', effect: 'O golpe deixa uma marca profunda no corpo e na mente (Trauma leve).', recovery: 'Permanente' },
  { roll: 10, name: 'Lesão Dupla Grave', effect: 'Role mais duas vezes na tabela e aplique ambos os efeitos com duração dobrada.', recovery: 'Tratamento (2 semanas)' },
];

export const SEQUELAS_TABLE = [
  { roll: 1, name: 'Tremor Crônico', effect: '-1 dado permanente em testes de Pontaria e Crime.' },
  { roll: 2, name: 'Cicatriz Deformante', effect: '-1 dado em Diplomacia com civis comuns; +1 dado bônus em Intimidação.' },
  { roll: 3, name: 'Dor Crônica nas Juntas', effect: '-1 dado em Fortitude ao fim de cenas de esforço físico intenso; primeiro Respiro cura metade.' },
  { roll: 4, name: 'Coxeadura', effect: 'Deslocamento reduzido permanentemente em -1,5 metros.' },
  { roll: 5, name: 'Pesadelos Recorrentes', effect: 'Descansos completos recuperam apenas metade da Mente máxima.' },
  { roll: 6, name: 'Pânico de Sangue', effect: 'Fica com a condição Abalado imediatamente ao ver o próprio sangue ou de aliado ferido.' },
];

export const BONDS_TABLE = [
  { roll: 1, text: 'Um irmão ou irmã mais nova que depende exclusivamente de você.' },
  { roll: 2, text: 'Um amigo de infância que ficou para trás fora da Academia.' },
  { roll: 3, text: 'Um pai ou mãe com sequelas de contágio, internado em clínica.' },
  { roll: 4, text: 'Um colega da mesma turma, a única pessoa em quem você confia.' },
  { roll: 5, text: 'Um instrutor ou veterano da Academia que impediu sua prisão.' },
  { roll: 6, text: 'A promessa solene feita a alguém que morreu dentro de uma Fenda.' },
  { roll: 7, text: 'Um lugar específico: a casa, a quadra ou o bairro onde cresceu.' },
  { roll: 8, text: 'Um animal de estimação ou lembrança guardada do passado.' },
  { roll: 9, text: 'Um segredo obscuro do qual ninguém na Academia pode desconfiar.' },
  { roll: 10, text: 'Alguém que você ama profundamente e que nem sabe que você está vivo.' },
];

export const FLAWS_TABLE = [
  { roll: 1, text: 'Orgulho: nunca admite que cometeu um erro ou calculou mal.' },
  { roll: 2, text: 'Impulsividade: age na urgência antes de parar para pensar.' },
  { roll: 3, text: 'Medo de abandono: faz qualquer concessão humilhante para não ficar só.' },
  { roll: 4, text: 'Raiva explosiva: perde a razão quando é provocado ou desafiado.' },
  { roll: 5, text: 'Culpa mórbida: carrega a morte de alguém e pune a si mesmo.' },
  { roll: 6, text: 'Ganância: nunca recusa uma vantagem ou recurso, mesmo ilícito.' },
  { roll: 7, text: 'Desconfiança crônica: não aceita ajuda sincera e crê que mentem.' },
  { roll: 8, text: 'Vício ou dependência: depende de uma substância, remédio ou ritual.' },
  { roll: 9, text: 'Heroísmo suicida: coloca seu corpo na linha de fogo desnecessariamente.' },
  { roll: 10, text: 'Curiosidade mórbida: não resiste a abrir portas e tocar no proibido.' },
];

export const CONDITIONS_LIST = [
  { name: 'Abalado', type: 'mental', effect: '-1 dado em todos os testes. Recompor-se: Vontade DT 15.' },
  { name: 'Apavorado', type: 'mental', effect: '-2 dados em todos os testes e deve fugir da fonte do medo.' },
  { name: 'Confuso', type: 'mental', effect: 'Age aleatoriamente; Mestre decide ação. Pode atacar aliados.' },
  { name: 'Fascinado', type: 'mental', effect: 'Atenção presa. -2 dados em Percepção. Quebra sob ameaça direta.' },
  { name: 'Enlouquecido', type: 'mental', effect: 'Controle mental perdido para a influência da Fenda até fim da cena.' },
  { name: 'Em Crise', type: 'mental', effect: 'Mente chegou a 0. Atordoado por 1 rodada e Abalado até descansar. Ganha Trauma.' },
  { name: 'Debilitado', type: 'fisica', effect: '-2 dados em testes de FOR, AGI e VIG. Se piorar, vira Inconsciente.' },
  { name: 'Enjoado', type: 'fisica', effect: 'Só pode realizar uma única ação por turno (padrão ou de movimento).' },
  { name: 'Envenenado', type: 'fisica', effect: 'Sofre dano/penalidades por turno até teste de Fortitude ou antídoto.' },
  { name: 'Exausto', type: 'fisica', effect: '-2 dados em todos os testes e Deslocamento pela metade.' },
  { name: 'Fraco', type: 'fisica', effect: '-1 dado em testes de FOR, AGI e VIG.' },
  { name: 'Sangrando', type: 'fisica', effect: 'Perde 1d6 PV no início de cada turno até estancar (Medicina DT 15).' },
  { name: 'Em chamas', type: 'fisica', effect: 'Sofre 1d6 dano por rodada. Ação padrão: Acrobacia DT 15 ou água para apagar.' },
  { name: 'Agarrado', type: 'movimento', effect: 'Imóvel e Desprevenido. Teste resistido de Luta/Acrobacia para soltar.' },
  { name: 'Caído', type: 'movimento', effect: '-2 dados em ataques corpo a corpo e Defesa -2. Levantar consome ação movimento.' },
  { name: 'Imóvel', type: 'movimento', effect: 'Deslocamento 0. Não pode se mover do espaço onde está.' },
  { name: 'Lento', type: 'movimento', effect: 'Deslocamento pela metade e realiza apenas 1 ação por turno.' },
  { name: 'Paralisado', type: 'movimento', effect: 'Indefeso. Falha automaticamente em qualquer teste de FOR e AGI.' },
  { name: 'Desprevenido', type: 'combate', effect: 'Defesa -5 e -1 dado em testes de Reflexos.' },
  { name: 'Vulnerável', type: 'combate', effect: 'Sofre +50% de dano contra um tipo específico declarado.' },
  { name: 'Atordoado', type: 'combate', effect: 'Incapaz de realizar ações no turno; preserva apenas reações.' },
  { name: 'Morrendo', type: 'mortal', effect: 'PV 0. No início do turno, Fortitude DT 15: 3 sucessos estabilizam; 3 falhas matam!' },
  { name: 'Inconsciente', type: 'mortal', effect: 'Indefeso, Caído e incapaz de agir. Acorda após 1h ou socorro Medicina DT 15.' },
  { name: 'Consumido', type: 'mortal', effect: 'Contágio atingiu 100%. Transformação permanente em criatura sob controle do Mestre.' }
];
