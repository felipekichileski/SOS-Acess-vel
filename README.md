# 🚨 SOS Acessível — Sistema de Emergência Silencioso para Pessoas Surdas e Mudas

O **SOS Acessível** é um aplicativo mobile (React Native / Expo) e web (Next.js) de emergência projetado especificamente para pessoas surdas, mudas ou em situações de risco em que a vítima não pode emitir som (ex: violência doméstica, sequestro, invasão de domicílio).

Ele prioriza **zero digitação obrigatória**, acionamento rápido em 1 toque, comunicação bilateral silenciosa por **Texto em Tempo Real (RTT)**, **vídeo com intérprete oficial de Libras**, **rastreamento de viaturas** e **retorno tátil em Código Morse** (`... --- ...`).

---

## 🎨 Design System e UI/UX Inclusiva

- **Dark Mode Utilitário:** Paleta em `#0D1117` e `#161B22` com alto contraste, reduzindo ofuscamento e cansaço visual sob estresse.
- **Cores Semânticas:**
  - 🔴 **Vermelho Alerta (`#EF4444`):** SOS, emergências críticas imediatas e botões de pânico.
  - 🟠 **Laranja Urgente (`#F97316`):** Ocorrências urgentes em minutos e avisos de segurança.
  - 🟢 **Verde Estável (`#22C55E`):** GPS com precisão ativa (`±3m`), sirene silenciosa confirmada e dados salvos.
  - 🟣 **Roxo Libras (`#8B5CF6`):** Central de interpretação em Libras em tempo real.
  - 🔵 **Azul RTT (`#38BDF8`):** Transcrição instantânea de voz para texto (Real-Time Text).
- **Acessibilidade Universal:** Touch targets ampliados (mínimo de 48px), ícones descritivos e compatibilidade com leitores de tela.

---

## 📱 As 4 Telas do Aplicativo

### 1. 🚨 SOS (Dashboard de Acionamento Rápido)
- **Header:** Indicador em tempo real **GPS Ativo: ±3m** com satélite de alta precisão.
- **Atalho Físico:** Disparo rápido pressionando 3 vezes o botão liga/desliga físico.
- **Botão Principal:** Grande botão circular centralizado com anéis concêntricos pulsantes e proteção contra toque acidental.
- **Disparo Direto Especializado (Grid 2x2):**
  - **190 — Polícia Militar:** Perigo, invasão, roubo ou ameaça iminente.
  - **192 — SAMU Médico:** Parada cardíaca, queda, AVC, convulsão.
  - **193 — Bombeiros:** Incêndio, resgate, pessoas presas em ferragens.
  - **180 — Central de Direitos:** Violência contra a mulher e apoio humanitário.
- **Rodapé:** Endereço confirmado com coordenadas e telemetria despachada automaticamente.

### 2. 📋 Triagem (Detalhes da Ocorrência sem Digitação)
- **Header:** Indicador de **Modo Silencioso Ativo** + Botão para cancelar o chamado + Barra de progresso da triagem.
- **Tipos de Emergência:** Cards selecionáveis (*Saúde / Ferimentos*, *Perigo / Crime*, *Acidente de Trânsito*, *Incêndio / Fumaça*).
- **Gravidade da Situação:** Botões horizontais (*Crítico*, *Urgente*, *Estável*).
- **Contexto do Local (Toggles Silenciosos):**
  - *"Não posso fazer barulho (Silêncio total)"* — Notifica os socorristas a desligarem as sirenes.
  - *"Estou sozinho(a)"*.
  - *"Há crianças no local"*.
  - *"Criminoso armado"*.
- **FAB (Floating Action Button):** *"ENVIAR ALERTA ÀS AUTORIDADES 🚨"*.

### 3. 💬 Atendimento (Acompanhamento e Chat RTT)
- **Header de Status:** Banner vermelho `#4829` com cronômetro em tempo real do chamado.
- **Trajeto da Viatura:** Acompanhamento da *Ambulância AL-04* a 1.8km com previsão de chegada em 6 minutos e badge *"Sirene Silenciosa OK"*.
- **Vídeo em Libras:** Conexão direta com intérprete oficial de Libras com suporte a visualização PIP da câmera frontal.
- **Live RTT (Real-Time Text):** Transcrição instantânea da voz dos operadores diretamente em texto no chat.
- **Respostas Rápidas de 1 Toque:** `[Estou escondido(a)]`, `[Porta trancada]`, `[A pessoa desmaiou]`, `[Preciso de maca]`, `[Tudo seguro no momento]`.
- **Modo Camuflagem:** Transforma a tela instantaneamente em um relógio digital inofensivo com alarme falso e desbloqueio tático por toque duplo.

### 4. 👤 Perfil (Hardware & Ficha Médica de Emergência)
- **Atalhos Físicos:** Ativação com tela apagada, 3 cliques no botão Power ou Volume Baixo + Power.
- **Retorno Tátil Morse:** O smartphone vibra silenciosamente o padrão Morse `... --- ...` para confirmar o recebimento do alerta.
- **Ficha Médica de Emergência:** Dados vitais criptografados com Tipo Sanguíneo (`O+`), alergias (Penicilina, Dipirona), histórico médico e identificação visual de usuária de Libras.
- **Contatos de Confiança:** Envio automático de SMS com geolocalização e link de rastreamento.

---

## 📂 Arquitetura do Projeto

```
├── App.js                         # Ponto de entrada React Native / Expo
├── app.json                       # Manifesto Expo com permissões
├── src/
│   ├── theme/
│   │   ├── colors.js              # Tokens de cores do Design System
│   │   └── typography.js          # Escalas e pesos tipográficos
│   ├── components/
│   │   ├── Header.js              # Cabeçalho acessível com indicador GPS
│   │   ├── EmergencyButton.js     # Botão SOS circular com anéis pulsantes
│   │   ├── EmergencyCard.js       # Cards de despacho especializado 2x2
│   │   └── CamouflageModal.js     # Modal de camuflagem (relógio discreto)
│   ├── navigation/
│   │   └── BottomTabNavigator.js  # Barra inferior de abas de alto contraste
│   └── screens/
│       ├── SOSScreen.js           # Tela 1: Dashboard SOS
│       ├── TriagemScreen.js       # Tela 2: Triagem sem digitação
│       ├── AtendimentoScreen.js   # Tela 3: Atendimento em tempo real
│       └── PerfilScreen.js        # Tela 4: Hardware & Ficha Médica
└── app/
    ├── page.tsx                   # Simulador interativo web (Next.js)
    └── layout.tsx                 # Metadados do projeto
```

---

## 🚀 Como Executar

### 1. Simulador Web Interativo (Next.js)
```bash
npm run dev
```
Acesse no navegador: **`http://localhost:3000`**

### 2. No Celular via Expo (React Native)
```bash
npx expo start
```
Abra o aplicativo **Expo Go** e escaneie o QR Code.
