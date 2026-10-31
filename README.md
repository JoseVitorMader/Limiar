# LIMIAR — Mesa Virtual & Terminal de Operações da Academia Meridiano

> **Sistema Oficial:** LIMIAR — RPG de Horror, Ação e Contágio (Edição de Trabalho 2034)  
> **Desenvolvido para:** Mestres e Agentes de Campo da Academia Meridiano.

---

## 🚀 Como Iniciar a Mesa Online

Para rodar a plataforma no seu computador:

```bash
# Iniciar o servidor de desenvolvimento local
npm run dev
```

O terminal exibirá os endereços de acesso:
- **Local:** `http://localhost:5173/`
- **Rede Local (Wi-Fi):** `http://<seu-ip-local>:5173/` (permite que outros jogadores conectados ao seu Wi-Fi entrem na mesa pelo celular, tablet ou notebook!).

---

## 🎛️ Principais Recursos Implementados

### 1. Dois Tipos de Acesso Integrados
- **Mestre (GM):**
  - Acesso irrestrito a todas as fichas de agentes da mesa.
  - Painel de controle de status em tempo real (PV, PE, MEN, Contágio %, Condições).
  - Rolagens **Públicas** ou **Ocultas/Privadas** (rolagens privadas ficam visíveis exclusivamente para o Mestre com aviso visual).
  - Acesso ao **Bestiário Tático** com criaturas oficiais e criador rápido de novos Alheios por Grau de Ameaça (1 a 5).
  - Gerenciador do **Relógio de Ruptura (Fenda)** e contador de civis.
- **Jogador:**
  - Acesso completo para editar e rolar com o seu agente ativo na mesa.
  - Visualização de fichas de colegas de equipe caso estejam marcadas como **Públicas** (modo somente-leitura).
  - Feed lateral de rolagens em tempo real com histórico de todos os jogadores e rolagens públicas do Mestre.

### 2. Separação Estrita por Campanhas / Mesas
- Crie e gerencie múltiplas campanhas (ex: *"Operação Silêncio Fendido"*, *"Incidente no Setor 4"*).
- Crie quantos personagens quiser no seu dossiê geral.
- Ao entrar em uma mesa, selecione qual agente você deseja utilizar.
- **Isolamento de Vitalidade:** Os valores de **Pontos de Vida (PV)**, **Pontos de Esforço (PE)**, **Sanidade/Mente (MEN)**, **Contágio (%)**, **Piso de Contágio** e **Condições Ativas** são salvos **por campanha**, permitindo que o mesmo personagem participe de diferentes missões sem misturar danos ou traumas!

### 3. Ficha Completa & Regras Oficiais do Livro
- **Mecânica dos Dados LIMIAR:**
  - **Reserva de Dados:** Rola N d20 (Atributo + bônus/penalidades) e mantém o **MAIOR**.
  - **Regra do Atributo 0:** Se o agente possuir Atributo 0 (ou penalidade líquida zerar a reserva), rola **2d20 e mantém o MENOR resultado**.
  - **Destaque:** Resultado 20 no dado mantido (sucesso automático + dobra dados de dano).
  - **Desastre:** Todos os dados da reserva resultam em 1 (falha com complicação dramática).
  - **Sucesso Pleno:** Resultado total $\ge \text{DT} + 10$ (+1 dado de dano em ataques).
- **Ícones de Dado 🎲 em Todo o Sistema:**
  - Ao lado de cada Atributo (FOR, AGI, INT, VIG, PRE).
  - Ao lado de cada uma das 28 Perícias oficiais.
  - Ao lado de cada Arma (rolagem de ataque e rolagem de dano automatizada).
  - Ao lado de cada Dom do Outro Lado (com gasto de PE e cálculo de dano/efeito).
  - Testes de Morrendo (DT 15 de Vigor) e Testes de Controle de Limiar.

### 4. Aferidor de Contágio & Display Sonoro
- Indicador visual estilizado com barras de LED (Latente 0-24%, Aflorado 25-49%, Ressonante 50-74%, Limiar 75-99%, Consumido 100%).
- **Efeitos Sonoros Integrados (Web Audio API):** Bipes autênticos de aferidor a cada subida de patamar e alarme sonoro ao atingir o Limiar.
- **Piso de Contágio (Regra Oficial):** Metade do pico histórico de contágio não pode ser reduzido por tratamentos normais.
- Ações rápidas de **Tratamentos** (Injeção Estabilizadora, Sessão de Acolhimento, etc.).
- Botão especial de **Último Ato** ao atingir 100% de contágio (concede ação final com Destaque automático).

### 5. Compêndio de Armas & Forja de Dons (Capítulo 32)
- Catálogo global de armas brancas, de fogo e fendas com botão para equipar diretamente em qualquer personagem.
- **Forja de Dons:** Criador completo de anomalias sobrenaturais baseado no Capítulo 32, onde você configura Efeito Base, Alcance, Duração, Área e Ampliações, calculando automaticamente o custo final de PE!

### 6. Sincronização em Tempo Real Multi-Abas
- Utiliza a API `BroadcastChannel` do navegador: abra uma aba como **Mestre** e outra como **Jogador** (ou em telas separadas) e veja as rolagens, danos e atualizações de status refletindo instantaneamente!
- Backup e Restauração em formato JSON na aba **Homebrew**.
