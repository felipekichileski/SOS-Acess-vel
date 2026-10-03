# 🚨 SOS Acessível — Documentação e Guia de Execução

O **SOS Acessível** é um sistema mobile e web de emergência projetado especialmente para pessoas surdas, mudas e em situações de risco silencioso (ex: violência doméstica, invasão de domicílio). Ele prioriza acionamento em 1 toque, comunicação por texto em tempo real (RTT), vídeo em Libras e retorno tátil Morse.

---

## 📁 Estrutura de Arquivos Criada

```
teste/
├── App.js                         # Ponto de entrada React Native / Expo
├── app.json                       # Configuração e permissões do Expo
├── src/
│   ├── theme/
│   │   ├── colors.js              # Paleta Dark Mode Utilitária (Slate 900, Vermelho Alerta)
│   │   └── typography.js          # Escalas tipográficas de alta legibilidade
│   ├── components/
│   │   ├── Header.js              # Cabeçalho com indicador "GPS Ativo: ±3m"
│   │   ├── EmergencyButton.js     # Botão circular SOS com anéis pulsantes concêntricos
│   │   ├── EmergencyCard.js       # Cards de despacho rápido 2x2 (190, 192, 193, 180)
│   │   └── CamouflageModal.js     # Modo Camuflagem (Relógio Falso com desbloqueio tático)
│   ├── navigation/
│   │   └── BottomTabNavigator.js  # Barra inferior com 4 abas e badges de status
│   └── screens/
│       ├── SOSScreen.js           # Tela 1: Dashboard de acionamento imediato
│       ├── TriagemScreen.js       # Tela 2: Triagem sem digitação com botões e toggles
│       ├── AtendimentoScreen.js   # Tela 3: Rota da viatura, Libras, RTT e Modo Camuflagem
│       └── PerfilScreen.js        # Tela 4: Ficha médica, atalhos de hardware e vibração Morse
└── app/
    ├── page.tsx                   # Simulador interativo web completo (Next.js)
    └── layout.tsx                 # Metadados e estrutura base
```

---

## 📱 Especificações das 4 Telas Implementadas

### 1. SOS (Dashboard)
- **Header**: Título com badge **GPS Ativo: ±3m** com ponto verde pulsante.
- **Banner de Atalho**: *"Pressione o botão liga/desliga 3 vezes para disparar o SOS mudo com geolocalização"*.
- **Botão SOS Silencioso**: Grande botão circular vermelho central com anéis concêntricos animados e aviso de proteção contra toque acidental.
- **Disparo Direto 2x2**:
  - `190` Polícia Militar (Perigo, Invasão, Roubo)
  - `192` SAMU Médico (Parada, Queda, AVC)
  - `193` Bombeiros (Fogo, Resgate, Preso)
  - `180` Central Direitos (Violência e Amparo)
- **Rodapé de Localização**: Mostra endereço com coordenadas e precisão calculada.

### 2. Triagem (Detalhes da Ocorrência)
- **Header**: Modo Silencioso Ativo + Botão de Cancelamento + Barra de progresso (Etapa 1 de 2).
- **1. Tipo de Emergência**: Cards selecionáveis com feedback visual em vermelho/azul/laranja.
- **2. Gravidade da Situação**: Botões horizontais `[Crítico (Imediato)]`, `[Urgente]`, `[Estável]`.
- **3. Contexto do Local**:
  - *Não posso fazer barulho (Silêncio total)* — viaturas desligam sirenes.
  - *Estou sozinho(a)*.
  - *Há crianças no local*.
  - *Criminoso armado*.
- **FAB**: Botão flutuante *"ENVIAR ALERTA ÀS AUTORIDADES"*.

### 3. Atendimento (Acompanhamento e Chat RTT)
- **Header de Status**: Banner vermelho com cronômetro em tempo real `#4829`.
- **Card da Viatura**: Trajeto da *Ambulância AL-04*, distância de 1.8km, chegada estimada em 6 min e badge *"Sirene Silenciosa OK"*.
- **Vídeo em Libras**: Botão de conexão com intérprete em tempo real, visualização de avatar de Libras, legenda RTT e janela de câmera frontal (PIP).
- **Transcrição Instantânea (Live RTT)**: Chat com transcrição de voz para texto do atendente.
- **Respostas Rápidas (1 Toque)**:
  - `[Estou escondido(a)]`
  - `[Porta trancada]`
  - `[A pessoa desmaiou]`
  - `[Preciso de maca]`
  - `[Tudo seguro no momento]`
- **Modo Camuflagem**: Transforma instantaneamente a tela num relógio digital discreto com alarme falso e desbloqueio por toque duplo.

### 4. Perfil (Configurações e Ficha Médica)
- **Atalhos de Hardware**:
  - Acionamento rápido pelo Botão Power com tela bloqueada.
  - Gatilho primário: 3 cliques rápidos ou Segurar Volume Baixo + Power.
  - Modo Silencioso com Retorno Tátil Morse (`... --- ...`).
  - Botão interativo *"Testar Vibração"*.
- **Ficha Médica**:
  - Nome: Ana Clara Silva (`[Surda]`, `[Usuária de Libras]`).
  - Tipo sanguíneo `O+ (Positivo)`.
  - Alergias (Penicilina, Dipirona) e Asma leve.
- **Contatos de Emergência**: Lista de parentes com notificação automática por SMS e link GPS.

---

## 🚀 Como Executar

### Opção 1: Visualização Imediata no Navegador (Simulador Web)
O servidor Next.js já está ativo localmente:
1. Abra seu navegador em: `http://localhost:3000`
2. Você verá o simulador do smartphone com todas as 4 telas interativas, botão simulador de hardware, chat RTT e modo camuflagem.

### Opção 2: Executar no Celular via Expo (React Native)
Para rodar no celular físico (iOS / Android):
```bash
npx expo start
```
Escaneie o QR Code com o aplicativo **Expo Go** no celular.
