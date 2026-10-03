'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  HeartPulse,
  Flame,
  Scale,
  MapPin,
  Radio,
  Video,
  MessageSquare,
  EyeOff,
  VolumeX,
  Clock,
  User,
  Smartphone,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Activity,
  PhoneCall,
  FileText,
  ChevronRight,
  Copy,
  Check,
  Vibrate,
  Navigation as NavIcon,
  HelpCircle,
  Eye,
} from 'lucide-react';

// Tipagem das abas principais
type TabType = 'SOS' | 'Triagem' | 'Atendimento' | 'Perfil';

export default function SOSAccessibleApp() {
  const [activeTab, setActiveTab] = useState<TabType>('SOS');
  const [selectedEmergency, setSelectedEmergency] = useState('saude');
  const [severity, setSeverity] = useState<'critico' | 'urgente' | 'estavel'>('critico');

  // Contextos da Triagem
  const [noNoise, setNoNoise] = useState(true);
  const [isAlone, setIsAlone] = useState(true);
  const [hasChildren, setHasChildren] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  // Estados de Atendimento & Chat RTT
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'operator',
      name: 'Central 192 (SAMU & Polícia Militar)',
      time: '17:52',
      text: 'Localização triangulada com precisão de ±3m. Viatura AL-04 a caminho no modo silencioso.',
      rtt: true,
    },
    {
      id: 2,
      sender: 'operator',
      name: 'Transcrição de Áudio (RTT em Tempo Real)',
      time: '17:53',
      text: 'Comandante da equipe: "Estamos a 6 minutos do endereço. Portões e acessos sendo monitorados via satélite."',
      rtt: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [librasModalOpen, setLibrasModalOpen] = useState(false);
  const [camouflageMode, setCamouflageMode] = useState(false);

  // Estados de Hardware & Ficha Médica
  const [hardwareMaster, setHardwareMaster] = useState(true);
  const [powerButtonQuick, setPowerButtonQuick] = useState(true);
  const [triggerMethod, setTriggerMethod] = useState<'power3x' | 'volDownPower'>('power3x');
  const [morseFeedback, setMorseFeedback] = useState(true);
  const [vibratingEffect, setVibratingEffect] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Temporizador de emergência ativa
  const [timerSeconds, setTimerSeconds] = useState(202); // 03:22
  const [sosTriggerCount, setSosTriggerCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Simulação de clique triplo no botão Power físico
  const handlePowerPhysicalClick = () => {
    setSosTriggerCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        triggerSOS('Atalho Físico: 3x Botão Power');
        return 0;
      }
      setTimeout(() => setSosTriggerCount(0), 1200);
      return next;
    });
  };

  const triggerSOS = (source: string) => {
    setVibratingEffect(true);
    setTimeout(() => setVibratingEffect(false), 1600);
    setActiveTab('Atendimento');
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        name: 'Você (Silencioso)',
        time: 'Agora',
        text: content.trim(),
        rtt: false,
      },
    ]);
    if (!textToSend) setInputText('');
  };

  const triggerVibrationTest = () => {
    setVibratingEffect(true);
    setTimeout(() => {
      setVibratingEffect(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col lg:flex-row items-stretch justify-center p-2 sm:p-6 lg:p-8 gap-8 font-sans selection:bg-red-500 selection:text-white">
      {/* PAINEL LATERAL ESQUERDO: Metadados, Arquitetura & Controles de Demonstração */}
      <div className="w-full lg:w-[420px] flex flex-col gap-5 justify-between">
        <div className="flex flex-col gap-4">
          {/* Badge de Apresentação */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              SOS Acessível Mobile UI
            </span>
            <span className="text-xs text-slate-400">React Native / Expo Ready</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Sistema de Emergência para Pessoas Surdas e Mudas
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Desenvolvido para máxima agilidade sob estresse extremo: zero digitação obrigatória,
            comunicação silenciosa bilateral, vídeo com intérprete em Libras, transcrição RTT e
            disparo por atalhos físicos de hardware.
          </p>

          {/* Atalho Físico Interativo do Aparelho */}
          <div className="bg-[#12161F] border border-slate-700/60 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
                <Smartphone className="w-4 h-4" />
                Simulador de Botão Físico
              </div>
              <span className="text-[11px] text-slate-400">Hardware Trigger</span>
            </div>
            <p className="text-xs text-slate-300 mb-3">
              Teste o acionamento tátil: clique 3 vezes no botão abaixo para simular o disparo com tela apagada.
            </p>
            <button
              onClick={handlePowerPhysicalClick}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition border border-slate-600 rounded-lg flex items-center justify-between text-xs font-semibold"
            >
              <span>🔘 Pressionar Botão Power ({sosTriggerCount}/3 cliques)</span>
              <span className="text-amber-400 font-mono text-[11px]">
                {sosTriggerCount > 0 ? 'Clique rápido!' : 'Pronto'}
              </span>
            </button>
          </div>

          {/* Lista de Telas & Recursos */}
          <div className="bg-[#12161F] border border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navegação e Telas Desenvolvidas
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setActiveTab('SOS')}
                className={`p-2.5 rounded-lg text-left border transition flex items-center justify-between ${
                  activeTab === 'SOS'
                    ? 'bg-red-500/20 border-red-500 text-white font-bold'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>🚨 1. SOS Geral</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('Triagem')}
                className={`p-2.5 rounded-lg text-left border transition flex items-center justify-between ${
                  activeTab === 'Triagem'
                    ? 'bg-red-500/20 border-red-500 text-white font-bold'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>📋 2. Triagem</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('Atendimento')}
                className={`p-2.5 rounded-lg text-left border transition flex items-center justify-between ${
                  activeTab === 'Atendimento'
                    ? 'bg-red-500/20 border-red-500 text-white font-bold'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>💬 3. Atendimento</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('Perfil')}
                className={`p-2.5 rounded-lg text-left border transition flex items-center justify-between ${
                  activeTab === 'Perfil'
                    ? 'bg-red-500/20 border-red-500 text-white font-bold'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>👤 4. Perfil / Ficha</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>

          {/* Destaque de Recursos de Acessibilidade */}
          <div className="bg-[#12161F] border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Diferenciais de UX Inclusiva
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dark Mode Utilitário:</strong> Contraste estrito para diminuir ofuscamento e cansaço visual.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Libras em Tempo Real:</strong> Botão de chamada de vídeo com intérprete oficial.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Modo Camuflagem:</strong> Esconde o SOS atrás de um relógio inofensivo em situações de agressão.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Feedback Tátil Morse:</strong> Vibra <code className="text-amber-400">... --- ...</code> confirmando despacho sem emitir som.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informações da Estrutura Modular Criada */}
        <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          Arquivos React Native gerados: <code className="text-red-400">App.js</code>, <code className="text-slate-200">src/screens/*</code>, <code className="text-slate-200">src/components/*</code>, <code className="text-slate-200">src/theme/*</code>.
        </div>
      </div>

      {/* DISPOSITIVO MÓVEL INTERATIVO (Mockup Flagship Smartphone) */}
      <div className="relative flex justify-center items-center">
        {/* Efeito de Vibração Tátil no Telefone */}
        <div
          className={`w-[390px] h-[830px] bg-[#0D1117] rounded-[48px] border-[10px] border-[#252B35] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(239,68,68,0.15)] flex flex-col overflow-hidden relative transition-transform duration-100 ${
            vibratingEffect ? 'animate-bounce scale-[1.01] border-red-500' : ''
          }`}
        >
          {/* Dynamic Island / Câmera Superior */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-end px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 mr-1 animate-pulse" title="Câmera/Microfone Silencioso"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F29]"></div>
          </div>

          {/* Barra de Status do Sistema */}
          <div className="pt-3 px-6 pb-1 flex justify-between items-center text-[12px] font-semibold text-slate-300 z-40 select-none">
            <span>17:54</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>5G</span>
              <span>98%</span>
            </div>
          </div>

          {/* ONDA DE VIBRAÇÃO MORSE VISÍVEL */}
          {vibratingEffect && (
            <div className="absolute top-12 left-0 right-0 z-50 bg-red-600 text-white text-[11px] font-black py-1 px-4 text-center flex items-center justify-center gap-2 animate-pulse shadow-lg">
              <Vibrate className="w-4 h-4 animate-spin" />
              <span>RETORNO TÁTIL MORSE: • • •  — — —  • • • (SOS ENVIADO)</span>
            </div>
          )}

          {/* CONTEÚDO PRINCIPAL DA TELA SELECIONADA */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {/* TELA 1: SOS (DASHBOARD) */}
            {activeTab === 'SOS' && (
              <div className="p-4 flex flex-col gap-4 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-white">SOS Acessível</h2>
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider">SISTEMA SILENCIOSO DE EMERGÊNCIA</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>GPS Ativo: ±3m</span>
                  </div>
                </div>

                {/* Banner de Atalho Físico */}
                <div className="bg-[#161B22] border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg shrink-0">
                    ⚡
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-wide block">
                      ATALHO FÍSICO SILENCIOSO
                    </span>
                    <p className="text-[11px] text-slate-200 leading-tight mt-0.5">
                      Pressione o botão liga/desliga 3 vezes para disparar o SOS mudo com geolocalização.
                    </p>
                  </div>
                </div>

                {/* Botão Principal Circular com Anéis Concêntricos */}
                <div className="my-2 py-4 flex flex-col items-center justify-center relative">
                  {/* Anel Pulsante 2 */}
                  <div className="absolute w-56 h-56 rounded-full border-2 border-red-500/20 bg-red-500/5 animate-ping pointer-events-none"></div>
                  {/* Anel Pulsante 1 */}
                  <div className="absolute w-44 h-44 rounded-full border-2 border-red-500/30 bg-red-500/10 pointer-events-none"></div>

                  {/* Botão Central de SOS */}
                  <button
                    onClick={() => triggerSOS('Botão Principal SOS')}
                    className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:scale-95 transition shadow-[0_0_35px_rgba(239,68,68,0.6)] border-4 border-red-300 flex flex-col items-center justify-center text-white cursor-pointer select-none group"
                  >
                    <span className="text-3xl font-black tracking-wider leading-none">SOS</span>
                    <span className="text-[11px] font-extrabold tracking-widest text-red-100 mt-1">SILENCIOSO</span>
                    <span className="mt-1 px-2 py-0.5 bg-black/30 rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
                      1 Toque
                    </span>
                  </button>

                  <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1 font-medium">
                    🛡️ Protegido contra toque acidental
                  </p>
                </div>

                {/* Seção Disparo Direto Especializado (Grid 2x2) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-slate-400 tracking-wider uppercase">
                      Disparo Direto Especializado
                    </span>
                    <span className="text-[10px] text-slate-400">Toque rápido</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Card 1: 190 Polícia Militar */}
                    <button
                      onClick={() => {
                        setSelectedEmergency('perigo');
                        setActiveTab('Triagem');
                      }}
                      className="bg-[#161B22] hover:bg-[#1C2128] border border-blue-500/40 rounded-xl p-3 text-left transition flex flex-col justify-between h-28 group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                          🛡️
                        </div>
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-xs">
                          190
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white leading-tight">Polícia Militar</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Perigo, Invasão, Roubo</p>
                      </div>
                    </button>

                    {/* Card 2: 192 SAMU Médico */}
                    <button
                      onClick={() => {
                        setSelectedEmergency('saude');
                        setActiveTab('Triagem');
                      }}
                      className="bg-[#161B22] hover:bg-[#1C2128] border border-red-500/40 rounded-xl p-3 text-left transition flex flex-col justify-between h-28 group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm">
                          🩺
                        </div>
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-xs">
                          192
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white leading-tight">SAMU Médico</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Parada, Queda, AVC</p>
                      </div>
                    </button>

                    {/* Card 3: 193 Bombeiros */}
                    <button
                      onClick={() => {
                        setSelectedEmergency('incendio');
                        setActiveTab('Triagem');
                      }}
                      className="bg-[#161B22] hover:bg-[#1C2128] border border-orange-500/40 rounded-xl p-3 text-left transition flex flex-col justify-between h-28 group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm">
                          🔥
                        </div>
                        <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-black text-xs">
                          193
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white leading-tight">Bombeiros</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Fogo, Resgate, Preso</p>
                      </div>
                    </button>

                    {/* Card 4: 180 Central Direitos */}
                    <button
                      onClick={() => {
                        setSelectedEmergency('perigo');
                        setActiveTab('Triagem');
                      }}
                      className="bg-[#161B22] hover:bg-[#1C2128] border border-purple-500/40 rounded-xl p-3 text-left transition flex flex-col justify-between h-28 group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">
                          ⚖️
                        </div>
                        <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-black text-xs">
                          180
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white leading-tight">Central Direitos</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Violência e Amparo</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Rodapé: Localização Confirmada */}
                <div className="bg-[#161B22] border border-slate-700/60 rounded-xl p-3 mt-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wide block">
                        LOCALIZAÇÃO CONFIRMADA
                      </span>
                      <p className="text-xs font-bold text-white">
                        Av. Paulista, 1578 - Bela Vista
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold rounded-md">
                      Alta Precisão
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TELA 2: TRIAGEM (DETALHES DA OCORRÊNCIA) */}
            {activeTab === 'Triagem' && (
              <div className="p-4 flex flex-col gap-4 pb-24">
                {/* Header com Modo Silencioso e Cancelar */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-lg font-black text-white">Detalhes da Ocorrência</h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">
                        Modo Silencioso Ativo
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('SOS')}
                    className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg border border-slate-700"
                  >
                    Cancelar SOS
                  </button>
                </div>

                {/* Barra de Progresso: Etapa 1 de 2 */}
                <div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-1/2 rounded-full"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">Etapa 1 de 2: Seleção Rápida</p>
                </div>

                {/* 1. Tipo de Emergência (Cards Selecionáveis) */}
                <div>
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2">
                    1. Tipo de Emergência
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: 'saude', title: 'Saúde / Ferimentos', desc: 'Hemorragia, Desmaio, Infarto...', icon: '🩺' },
                      { id: 'perigo', title: 'Perigo / Crime', desc: 'Assalto, Ameaça, Invasão...', icon: '🚨' },
                      { id: 'transito', title: 'Acidente de Trânsito', desc: 'Colisão com feridos, Capotamento', icon: '🚗' },
                      { id: 'incendio', title: 'Incêndio / Fumaça', desc: 'Fogo ativo, Gás, Explosão', icon: '🔥' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedEmergency(item.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                          selectedEmergency === item.id
                            ? 'bg-red-500/15 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <span className="font-extrabold text-xs block text-white">{item.title}</span>
                            <span className="text-[11px] text-slate-400">{item.desc}</span>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedEmergency === item.id ? 'border-red-500 bg-red-500' : 'border-slate-600'
                          }`}
                        >
                          {selectedEmergency === item.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Gravidade da Situação (Botões Horizontais) */}
                <div>
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2">
                    2. Gravidade da Situação
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSeverity('critico')}
                      className={`py-2.5 px-2 rounded-xl text-center border transition flex flex-col items-center justify-center ${
                        severity === 'critico'
                          ? 'bg-red-500 border-red-400 text-white font-black'
                          : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs font-extrabold">Crítico</span>
                      <span className="text-[9px] opacity-80">(Imediato)</span>
                    </button>

                    <button
                      onClick={() => setSeverity('urgente')}
                      className={`py-2.5 px-2 rounded-xl text-center border transition flex flex-col items-center justify-center ${
                        severity === 'urgente'
                          ? 'bg-orange-500 border-orange-400 text-white font-black'
                          : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs font-extrabold">Urgente</span>
                      <span className="text-[9px] opacity-80">(Em minutos)</span>
                    </button>

                    <button
                      onClick={() => setSeverity('estavel')}
                      className={`py-2.5 px-2 rounded-xl text-center border transition flex flex-col items-center justify-center ${
                        severity === 'estavel'
                          ? 'bg-slate-700 border-slate-500 text-white font-black'
                          : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xs font-extrabold">Estável</span>
                      <span className="text-[9px] opacity-80">(Sem risco)</span>
                    </button>
                  </div>
                </div>

                {/* 3. Contexto do Local (Checkboxes / Toggles) */}
                <div>
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2">
                    3. Contexto do Local
                  </h3>
                  <div className="bg-[#161B22] border border-slate-800 rounded-xl divide-y divide-slate-800">
                    <label className="p-3 flex items-center justify-between cursor-pointer">
                      <div className="pr-2">
                        <span className="text-xs font-bold text-red-400 block">
                          Não posso fazer barulho (Silêncio total)
                        </span>
                        <span className="text-[10px] text-slate-400">Socorristas chegam sem sirene</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={noNoise}
                        onChange={(e) => setNoNoise(e.target.checked)}
                        className="w-5 h-5 accent-red-500 cursor-pointer"
                      />
                    </label>

                    <label className="p-3 flex items-center justify-between cursor-pointer">
                      <div className="pr-2">
                        <span className="text-xs font-bold text-white block">Estou sozinho(a)</span>
                        <span className="text-[10px] text-slate-400">Sem acompanhantes no recinto</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isAlone}
                        onChange={(e) => setIsAlone(e.target.checked)}
                        className="w-5 h-5 accent-orange-500 cursor-pointer"
                      />
                    </label>

                    <label className="p-3 flex items-center justify-between cursor-pointer">
                      <div className="pr-2">
                        <span className="text-xs font-bold text-white block">Há crianças no local</span>
                        <span className="text-[10px] text-slate-400">Prioriza protocolo de proteção infantil</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasChildren}
                        onChange={(e) => setHasChildren(e.target.checked)}
                        className="w-5 h-5 accent-orange-500 cursor-pointer"
                      />
                    </label>

                    <label className="p-3 flex items-center justify-between cursor-pointer">
                      <div className="pr-2">
                        <span className="text-xs font-bold text-red-400 block">Criminoso armado</span>
                        <span className="text-[10px] text-slate-400">Ameaça tática com arma letal</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isArmed}
                        onChange={(e) => setIsArmed(e.target.checked)}
                        className="w-5 h-5 accent-red-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Botão Flutuante (FAB) */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      triggerSOS('Alerta Triagem');
                    }}
                    className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-black text-sm tracking-wider uppercase rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.4)] flex flex-col items-center justify-center transition"
                  >
                    <span>ENVIAR ALERTA ÀS AUTORIDADES 🚨</span>
                    <span className="text-[10px] font-normal text-red-200 mt-0.5">
                      Despacho imediato de viaturas com telemetria
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* TELA 3: ATENDIMENTO (ACOMPANHAMENTO E CHAT RTT) */}
            {activeTab === 'Atendimento' && (
              <div className="flex flex-col h-full relative">
                {/* Header de Status de Emergência Ativa */}
                <div className="bg-red-600 px-4 py-2.5 flex items-center justify-between text-white shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                    <div>
                      <h3 className="text-xs font-black tracking-wide leading-none">
                        SOS ATIVO #4829
                      </h3>
                      <p className="text-[10px] text-red-100 font-semibold mt-0.5">
                        Viaturas SAMU e PM Notificadas
                      </p>
                    </div>
                  </div>
                  <div className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
                    {formatTimer(timerSeconds)}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 pb-24">
                  {/* Mapa / Trajeto (Card Superior) */}
                  <div className="bg-[#161B22] border border-slate-700 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-white flex items-center gap-1.5">
                          🚑 Ambulância AL-04
                        </span>
                        <span className="text-[11px] text-slate-400 block">Distância: 1.8km</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[10px] font-bold">
                        Sirene Silenciosa OK
                      </span>
                    </div>

                    {/* Gráfico Simulado de Rota */}
                    <div className="h-20 bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800 flex items-center px-4">
                      {/* Grid de fundo */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:14px_14px] opacity-30"></div>
                      
                      <div className="relative z-10 w-full flex items-center justify-between">
                        <div className="flex flex-col items-center">
                          <span className="text-xl">🚑</span>
                          <span className="text-[9px] font-bold text-red-400 bg-black/60 px-1 rounded">AL-04</span>
                        </div>

                        {/* Linha traçada com viatura em movimento */}
                        <div className="flex-1 mx-3 h-1 bg-slate-700 relative">
                          <div className="absolute inset-0 bg-red-500 animate-pulse"></div>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-xl">📍</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-black/60 px-1 rounded">Você</span>
                        </div>
                      </div>

                      <div className="absolute bottom-1 right-2 text-[10px] font-extrabold text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded">
                        Chegada estimada: 6 minutos
                      </div>
                    </div>
                  </div>

                  {/* Vídeo Acessível: Botão Grande com Libras */}
                  <button
                    onClick={() => setLibrasModalOpen(true)}
                    className="p-3 bg-gradient-to-r from-purple-900/60 to-purple-800/40 border border-purple-500/50 rounded-xl flex items-center justify-between text-left hover:brightness-110 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition">
                        🤟
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-white">
                            Vídeo com Intérprete Libras
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        </div>
                        <p className="text-[10px] text-purple-200 mt-0.5">
                          Central conectada em tempo real por vídeo
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-2 py-1 rounded-md border border-purple-800">
                      Conectar →
                    </span>
                  </button>

                  {/* Transcrição Instantânea (Live RTT) */}
                  <div className="bg-[#161B22] border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Activity className="w-3 h-3 text-sky-400" />
                        Transcrição Instantânea (Live RTT)
                      </span>
                      <span className="text-[9px] font-bold text-sky-400 bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-800">
                        Voz para Texto Ativo
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto no-scrollbar">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-2 rounded-lg text-xs leading-snug ${
                            msg.sender === 'operator'
                              ? 'bg-sky-950/40 border-l-2 border-sky-400 text-slate-200'
                              : 'bg-slate-800 text-white self-end ml-4'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mb-0.5">
                            <span>{msg.name}</span>
                            <span>{msg.time}</span>
                          </div>
                          <p className="text-[11px]">{msg.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Respostas Rápidas de 1 Toque */}
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
                      Respostas Rápidas (1 Toque)
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        'Estou escondido(a)',
                        'Porta trancada',
                        'A pessoa desmaiou',
                        'Preciso de maca',
                        'Tudo seguro no momento',
                      ].map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(`[${chip}]`)}
                          className="px-2.5 py-2 bg-[#161B22] hover:bg-slate-800 active:scale-95 border border-slate-700 rounded-lg text-[11px] font-bold text-slate-200 text-left transition"
                        >
                          [{chip}]
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input de Texto Silencioso */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Digite mensagem sem som..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-[#161B22] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className="px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Botão Modo Camuflagem */}
                  <button
                    onClick={() => setCamouflageMode(true)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center gap-2 text-slate-300 hover:text-white text-xs font-bold transition shadow"
                  >
                    <EyeOff className="w-4 h-4 text-slate-400" />
                    <span>Modo Camuflagem (Tela de Relógio Falso)</span>
                  </button>
                </div>

                {/* MODAL SIMULADO DE VÍDEO COM INTÉRPRETE DE LIBRAS */}
                {librasModalOpen && (
                  <div className="absolute inset-0 z-50 bg-[#0D1117] flex flex-col p-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                      <div>
                        <h4 className="text-sm font-black text-white">Central de Libras Conectada</h4>
                        <span className="text-[10px] text-purple-300">Intérprete Oficial de Emergência</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                        AO VIVO
                      </span>
                    </div>

                    {/* Vídeo do Intérprete */}
                    <div className="flex-1 bg-slate-900 border-2 border-purple-500/40 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-6xl animate-pulse mb-3">🤟</span>
                      <h5 className="text-sm font-bold text-white">Karina Santos (Intérprete CIL)</h5>
                      <p className="text-xs text-purple-200 max-w-xs mt-1">
                        "Estou transmitindo seus gestos e status diretamente aos médicos do SAMU. Mantenha a calma."
                      </p>

                      {/* Janela PIP Câmera Frontal */}
                      <div className="absolute top-3 right-3 w-20 h-24 bg-slate-800 border border-slate-600 rounded-xl flex flex-col items-center justify-center">
                        <span className="text-xl">👤</span>
                        <span className="text-[8px] text-slate-400">Você</span>
                      </div>

                      {/* Legenda RTT no vídeo */}
                      <div className="absolute bottom-3 left-3 right-3 bg-black/80 p-2 rounded-lg text-left text-[11px] text-sky-300 font-mono">
                        RTT: "Viaturas a 1.8km do local. Fique onde está."
                      </div>
                    </div>

                    <button
                      onClick={() => setLibrasModalOpen(false)}
                      className="mt-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700"
                    >
                      Fechar Vídeo e Voltar ao Atendimento
                    </button>
                  </div>
                )}

                {/* MODO CAMUFLAGEM (TELA DE RELÓGIO FALSO) */}
                {camouflageMode && (
                  <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-6 select-none animate-fadeIn">
                    <div className="flex justify-between items-center text-xs text-slate-600">
                      <span>VIVO 5G</span>
                      <span>98% 🔋</span>
                    </div>

                    <div className="flex flex-col items-center my-auto">
                      <span className="text-slate-600 text-sm mb-2">🔒</span>
                      <span className="text-slate-400 text-sm font-medium">Sábado, 3 de outubro</span>
                      <span className="text-7xl font-extralight text-white tracking-tighter my-1">
                        17:54
                      </span>
                      <span className="text-slate-500 text-xs mt-2">24°C • Céu Limpo</span>

                      <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-xl p-3 w-full max-w-xs">
                        <span className="text-xs font-semibold text-white block">⏰ Alarme programado</span>
                        <span className="text-[11px] text-slate-400">Amanhã às 06:30 • Diário</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setCamouflageMode(false)}
                        className="py-2 px-4 rounded-full bg-neutral-900 text-neutral-600 hover:text-neutral-400 text-[10px] font-bold tracking-widest uppercase transition"
                      >
                        • Toque duas vezes para desbloquear •
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TELA 4: PERFIL (CONFIGURAÇÕES E FICHA MÉDICA) */}
            {activeTab === 'Perfil' && (
              <div className="p-4 flex flex-col gap-4 pb-24">
                {/* Header */}
                <div>
                  <h2 className="text-lg font-black text-white">Perfil e Configurações</h2>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider">
                    HARDWARE & FICHA MÉDICA DE EMERGÊNCIA
                  </p>
                </div>

                {/* Banner de Criptografia */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-start gap-2.5">
                  <span className="text-lg">🔒</span>
                  <div className="text-[11px] text-slate-300 leading-tight">
                    <strong className="text-emerald-400 block font-bold">
                      Dados Vitais Criptografados
                    </strong>
                    Estes dados são despachados automaticamente aos socorristas (SAMU/PM) no instante do acionamento silencioso.
                  </div>
                </div>

                {/* Bloco 1: Atalhos Físicos de Hardware */}
                <div className="bg-[#161B22] border border-slate-800 rounded-xl p-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        Atalhos Físicos de Hardware
                      </h4>
                      <p className="text-[10px] text-slate-400">Gatilhos sem olhar para a tela</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={hardwareMaster}
                      onChange={(e) => setHardwareMaster(e.target.checked)}
                      className="w-5 h-5 accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {hardwareMaster && (
                    <div className="flex flex-col gap-2.5">
                      <label className="flex items-center justify-between text-xs text-slate-200 cursor-pointer">
                        <div>
                          <span className="font-bold block">Acionamento Rápido pelo Botão Power</span>
                          <span className="text-[10px] text-slate-400">Disparo com tela bloqueada</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={powerButtonQuick}
                          onChange={(e) => setPowerButtonQuick(e.target.checked)}
                          className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                      </label>

                      {/* Gatilho Primário (Radio Buttons) */}
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">
                          Gatilho Primário:
                        </span>

                        <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                          <input
                            type="radio"
                            name="trigger"
                            checked={triggerMethod === 'power3x'}
                            onChange={() => setTriggerMethod('power3x')}
                            className="accent-red-500"
                          />
                          <span>3 cliques rápidos no Botão Power</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                          <input
                            type="radio"
                            name="trigger"
                            checked={triggerMethod === 'volDownPower'}
                            onChange={() => setTriggerMethod('volDownPower')}
                            className="accent-red-500"
                          />
                          <span>Segurar Volume Baixo + Power por 3s</span>
                        </label>
                      </div>

                      {/* Retorno Tátil Morse */}
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col gap-2">
                        <label className="flex items-center justify-between text-xs text-white cursor-pointer">
                          <div>
                            <span className="font-bold block">Modo Silencioso com Retorno Tátil Morse</span>
                            <span className="text-[10px] text-slate-400">
                              Vibra <code className="text-amber-400 font-mono">... --- ...</code> confirmando envio
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={morseFeedback}
                            onChange={(e) => setMorseFeedback(e.target.checked)}
                            className="w-4 h-4 accent-amber-500 cursor-pointer"
                          />
                        </label>

                        {morseFeedback && (
                          <button
                            onClick={triggerVibrationTest}
                            className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-md border border-slate-700 flex items-center justify-center gap-1.5 transition"
                          >
                            <Vibrate className="w-3.5 h-3.5" />
                            <span>Testar Vibração Tátil Morse</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bloco 2: Ficha Médica de Emergência */}
                <div className="bg-[#161B22] border border-slate-800 rounded-xl p-3 flex flex-col gap-3">
                  <div className="border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      Ficha Médica de Emergência
                    </h4>
                    <p className="text-[10px] text-slate-400">Informações prioritárias para socorristas</p>
                  </div>

                  {/* Identificação */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-900 border border-blue-500 flex items-center justify-center text-sm font-black text-white shrink-0">
                      AC
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Ana Clara Silva</h5>
                      <div className="flex gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold">
                          🧏 Surda
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-bold">
                          🤟 Usuária de Libras
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tipo Sanguíneo & Alergias */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] font-black text-slate-400 uppercase block">Tipo Sanguíneo</span>
                      <span className="text-base font-black text-red-400">O+ (Positivo)</span>
                    </div>

                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] font-black text-slate-400 uppercase block">Alergias</span>
                      <span className="text-xs font-bold text-white">Penicilina, Dipirona</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Condições Crônicas</span>
                    <span className="text-xs text-slate-200">Asma leve compensada (inalador de alívio)</span>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Medicamentos em Uso</span>
                    <span className="text-xs text-slate-200">Salbutamol se necessário</span>
                  </div>
                </div>

                {/* Bloco 3: Contatos de Emergência */}
                <div className="bg-[#161B22] border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
                  <div className="border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      Contatos de Emergência
                    </h4>
                    <p className="text-[10px] text-slate-400">Recebem SMS automático com geolocalização</p>
                  </div>

                  <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">Lucas Silva (Irmão)</span>
                      <span className="text-[11px] text-slate-400">(11) 98765-4321</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">SMS Ativo ✓</span>
                  </div>

                  <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">Maria Helena (Mãe)</span>
                      <span className="text-[11px] text-slate-400">(11) 99123-4567</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">SMS Ativo ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BARRA DE NAVEGAÇÃO INFERIOR (BOTTOM TABS) */}
          <div className="bg-[#12161E] border-t border-slate-800 px-3 py-2 flex justify-around items-center z-40 select-none">
            {/* Tab 1: SOS */}
            <button
              onClick={() => setActiveTab('SOS')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'SOS' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className="text-xl">🚨</span>
              <span className="text-[10px] font-bold">SOS</span>
            </button>

            {/* Tab 2: Triagem */}
            <button
              onClick={() => setActiveTab('Triagem')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'Triagem' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className="text-xl">📋</span>
              <span className="text-[10px] font-bold">Triagem</span>
            </button>

            {/* Tab 3: Atendimento */}
            <button
              onClick={() => setActiveTab('Atendimento')}
              className={`flex flex-col items-center gap-1 transition relative ${
                activeTab === 'Atendimento' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className="text-xl">💬</span>
              <span className="text-[10px] font-bold">Atendimento</span>
              <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>

            {/* Tab 4: Perfil */}
            <button
              onClick={() => setActiveTab('Perfil')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'Perfil' ? 'text-red-500 font-bold scale-105' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <span className="text-xl">👤</span>
              <span className="text-[10px] font-bold">Perfil</span>
            </button>
          </div>

          {/* Barra de Gestos na base do iOS */}
          <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto my-1.5 opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
