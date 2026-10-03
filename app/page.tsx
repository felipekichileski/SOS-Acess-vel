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
  EyeOff,
  User,
  CheckCircle2,
  Send,
  Activity,
  Vibrate,
  PhoneCall,
  Clock,
  AlertTriangle,
  ArrowRight,
  Settings,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Lock,
  VolumeX,
} from 'lucide-react';

type TabType = 'SOS' | 'Triagem' | 'Atendimento' | 'Perfil';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

interface Message {
  id: number;
  sender: 'operator' | 'user';
  name: string;
  time: string;
  text: string;
  rtt?: boolean;
}

export default function SOSAccessibleApp() {
  const [activeTab, setActiveTab] = useState<TabType>('SOS');
  const [selectedEmergency, setSelectedEmergency] = useState('saude');
  const [severity, setSeverity] = useState<'critico' | 'urgente' | 'estavel'>('critico');

  // Contextos da Ocorrência
  const [noNoise, setNoNoise] = useState(true);
  const [isAlone, setIsAlone] = useState(true);
  const [hasChildren, setHasChildren] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  // Status de Emergência Ativa
  const [isSosActive, setIsSosActive] = useState(false);
  const [incidentId, setIncidentId] = useState('#4829');
  const [elapsedSeconds, setElapsedSeconds] = useState(184); // 03:04
  const [vibrating, setVibrating] = useState(false);

  // Localização
  const [currentAddress, setCurrentAddress] = useState('Av. Paulista, 1578 - Bela Vista, São Paulo - SP');
  const [coordinates, setCoordinates] = useState('Lat: -23.5615° | Long: -46.6559°');
  const [gpsAccuracy, setGpsAccuracy] = useState('±3m');

  // Chat RTT
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'operator',
      name: 'Central 192 (SAMU & Polícia Militar)',
      time: '17:52',
      text: 'Localização triangulada com precisão. Viatura AL-04 e apoio tático despachados no modo silencioso.',
      rtt: true,
    },
    {
      id: 2,
      sender: 'operator',
      name: 'Transcrição de Áudio (RTT em Tempo Real)',
      time: '17:53',
      text: 'Comandante da equipe: "Estamos a 6 minutos do endereço. Sirene desativada para segurança da vítima."',
      rtt: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  // Modais de Segurança
  const [camouflageActive, setCamouflageActive] = useState(false);
  const [librasModalActive, setLibrasModalActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ficha Médica e Contatos (com persistência local)
  const [userName, setUserName] = useState('Ana Clara Silva');
  const [bloodType, setBloodType] = useState('O+ (Positivo)');
  const [allergies, setAllergies] = useState('Penicilina, Dipirona');
  const [chronicConditions, setChronicConditions] = useState('Asma leve compensada (uso eventual de broncodilatador)');
  const [medications, setMedications] = useState('Salbutamol se necessário');
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Lucas Silva', relationship: 'Irmão', phone: '(11) 98765-4321' },
    { id: '2', name: 'Maria Helena', relationship: 'Mãe', phone: '(11) 99123-4567' },
  ]);

  // Hardware Config
  const [powerButtonQuick, setPowerButtonQuick] = useState(true);
  const [triggerMethod, setTriggerMethod] = useState<'power3x' | 'volDownPower'>('power3x');
  const [morseFeedback, setMorseFeedback] = useState(true);

  // Relógio do Sistema e Modo Camuflagem
  const [currentTime, setCurrentTime] = useState('17:54');
  const [currentDate, setCurrentDate] = useState('Sábado, 3 de outubro');

  // Inicialização e Relógio
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
      setCurrentDate(now.toLocaleDateString('pt-BR', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Contador de Emergência
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Geolocalização Real
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          const acc = Math.round(pos.coords.accuracy);
          setCoordinates(`Lat: ${lat}° | Long: ${lng}°`);
          setGpsAccuracy(`±${acc}m`);
        },
        () => {
          // Mantém as coordenadas de demonstração de alta precisão
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Iniciar / Parar Câmera Real para Libras
  useEffect(() => {
    if (librasModalActive) {
      if (typeof window !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'user' }, audio: false })
          .then((stream) => {
            setCameraStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(() => {
            // Câmera indisponível ou permissão negada
          });
      }
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      }
    }
  }, [librasModalActive]);

  // Função de Vibração Morse Tática
  const executeMorseVibration = () => {
    setVibrating(true);
    // Padrão Morse S.O.S (... --- ...)
    const morsePattern = [100, 100, 100, 100, 100, 200, 300, 100, 300, 100, 300, 200, 100, 100, 100, 100, 100];
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(morsePattern);
      } catch (e) {
        // Ignora caso restrito
      }
    }
    setTimeout(() => setVibrating(false), 2000);
  };

  // Disparar SOS
  const handleTriggerSOS = (service = 'Geral') => {
    setIsSosActive(true);
    executeMorseVibration();
    setActiveTab('Atendimento');
  };

  // Enviar Mensagem no Chat RTT
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'user',
      name: 'Você (Silencioso)',
      time: currentTime,
      text,
      rtt: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex justify-center items-stretch antialiased selection:bg-red-500 selection:text-white">
      {/* Contêiner da Aplicação (Responsivo: 100% no celular, chassis elegante no desktop) */}
      <main className="w-full max-w-md bg-[#0D1117] flex flex-col justify-between min-h-screen border-x border-slate-800/80 shadow-2xl relative overflow-hidden">
        
        {/* Barra Superior de Status do Sistema */}
        <header className="bg-[#12161E] border-b border-slate-800 px-4 py-2.5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-black text-sm tracking-tight text-white uppercase">
              SOS Acessível
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>GPS: {gpsAccuracy}</span>
            </div>

            <button
              onClick={() => setCamouflageActive(true)}
              title="Ativar Modo Camuflagem Imediato"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              aria-label="Modo Camuflagem"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Notificação Tátil Morse Visível */}
        {vibrating && (
          <div className="bg-red-600 text-white text-[11px] font-black py-1.5 px-3 text-center flex items-center justify-center gap-2 z-50 animate-pulse">
            <Vibrate className="w-4 h-4 animate-spin" />
            <span>CONFIRMAÇÃO TÁTIL MORSE ATIVADA: • • • — — — • • •</span>
          </div>
        )}

        {/* CORPO DE CONTEÚDO PRINCIPAL (COM SCROLL INTERNO) */}
        <section className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          
          {/* ========================================================= */}
          {/* 1. TELA: SOS (DASHBOARD PRINCIPAL)                        */}
          {/* ========================================================= */}
          {activeTab === 'SOS' && (
            <div className="p-4 flex flex-col gap-4 pb-20">
              
              {/* Banner de Atalho Físico Silencioso */}
              <div className="bg-[#161B22] border border-amber-500/30 rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl shrink-0">
                  ⚡
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                    ATALHO FÍSICO SILENCIOSO
                  </span>
                  <p className="text-xs text-slate-200 leading-snug mt-0.5">
                    Pressione o botão liga/desliga 3 vezes para disparar o SOS mudo com geolocalização.
                  </p>
                </div>
              </div>

              {/* Botão Central de Impacto SOS com Anéis Concêntricos Pulsantes */}
              <div className="my-4 py-8 flex flex-col items-center justify-center relative select-none">
                {/* Anéis Pulsantes Concêntricos */}
                <div className="absolute w-64 h-64 rounded-full border-2 border-red-500/20 bg-red-500/5 animate-pulse-ring-1 pointer-events-none"></div>
                <div className="absolute w-52 h-52 rounded-full border-2 border-red-500/30 bg-red-500/10 animate-pulse-ring-2 pointer-events-none"></div>

                {/* Botão SOS Principal */}
                <button
                  onClick={() => handleTriggerSOS('Geral')}
                  className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:scale-95 transition-transform duration-100 shadow-[0_0_40px_rgba(239,68,68,0.65)] border-4 border-red-300/80 flex flex-col items-center justify-center text-white cursor-pointer select-none group"
                  aria-label="Botão de SOS Silencioso de Emergência"
                >
                  <span className="text-4xl font-black tracking-widest leading-none drop-shadow">
                    SOS
                  </span>
                  <span className="text-xs font-black tracking-widest text-red-100 mt-1 uppercase">
                    SILENCIOSO
                  </span>
                  <span className="mt-1 px-2.5 py-0.5 bg-black/40 rounded-full text-[9px] font-extrabold text-white uppercase tracking-wider">
                    1 Toque
                  </span>
                </button>

                <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  Protegido contra toque acidental
                </p>
              </div>

              {/* Seção Disparo Direto Especializado (Grid 2x2) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-xs font-black text-slate-400 tracking-wider uppercase">
                    Disparo Direto Especializado
                  </h2>
                  <span className="text-[10px] text-slate-400">Atendimento Dedicado</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Card 1: 190 Polícia Militar */}
                  <button
                    onClick={() => {
                      setSelectedEmergency('perigo');
                      handleTriggerSOS('Polícia Militar');
                    }}
                    className="bg-[#161B22] hover:bg-[#1E2530] border border-blue-500/40 rounded-2xl p-3.5 text-left transition flex flex-col justify-between h-32 active:scale-98 shadow-sm group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-base">
                        🛡️
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-black text-xs shadow">
                        190
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white leading-tight">Polícia Militar</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Perigo, Invasão, Roubo</p>
                    </div>
                  </button>

                  {/* Card 2: 192 SAMU Médico */}
                  <button
                    onClick={() => {
                      setSelectedEmergency('saude');
                      handleTriggerSOS('SAMU Médico');
                    }}
                    className="bg-[#161B22] hover:bg-[#1E2530] border border-red-500/40 rounded-2xl p-3.5 text-left transition flex flex-col justify-between h-32 active:scale-98 shadow-sm group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-base">
                        🩺
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-xs shadow">
                        192
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white leading-tight">SAMU Médico</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Parada, Queda, AVC</p>
                    </div>
                  </button>

                  {/* Card 3: 193 Bombeiros */}
                  <button
                    onClick={() => {
                      setSelectedEmergency('incendio');
                      handleTriggerSOS('Bombeiros');
                    }}
                    className="bg-[#161B22] hover:bg-[#1E2530] border border-orange-500/40 rounded-2xl p-3.5 text-left transition flex flex-col justify-between h-32 active:scale-98 shadow-sm group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-base">
                        🔥
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white font-black text-xs shadow">
                        193
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white leading-tight">Bombeiros</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Fogo, Resgate, Preso</p>
                    </div>
                  </button>

                  {/* Card 4: 180 Central Direitos */}
                  <button
                    onClick={() => {
                      setSelectedEmergency('perigo');
                      handleTriggerSOS('Central Direitos');
                    }}
                    className="bg-[#161B22] hover:bg-[#1E2530] border border-purple-500/40 rounded-2xl p-3.5 text-left transition flex flex-col justify-between h-32 active:scale-98 shadow-sm group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-base">
                        ⚖️
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-black text-xs shadow">
                        180
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white leading-tight">Central Direitos</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Violência e Amparo</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Rodapé: Localização Confirmada */}
              <div className="bg-[#161B22] border border-slate-700/70 rounded-2xl p-3.5 shadow-sm mt-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">
                      LOCALIZAÇÃO CONFIRMADA
                    </span>
                    <p className="text-xs font-bold text-white truncate">
                      {currentAddress}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-full shrink-0">
                    Alta Precisão
                  </span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{coordinates}</span>
                  <span className="text-slate-300 font-sans text-[10px]">Despacho Automático</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 2. TELA: TRIAGEM (DETALHES DA OCORRÊNCIA SEM DIGITAÇÃO)    */}
          {/* ========================================================= */}
          {activeTab === 'Triagem' && (
            <div className="p-4 flex flex-col gap-4 pb-24">
              
              {/* Header com Modo Silencioso e Cancelar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-lg font-black text-white">Detalhes da Ocorrência</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                      Modo Silencioso Ativo
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('SOS')}
                  className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 font-semibold rounded-xl border border-slate-700 transition"
                >
                  Cancelar SOS
                </button>
              </div>

              {/* Barra de Progresso */}
              <div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-1/2 rounded-full"></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1">Etapa 1 de 2: Triagem Silenciosa</p>
              </div>

              {/* 1. Tipo de Emergência (Cards Selecionáveis) */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  1. Tipo de Emergência
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'saude', title: 'Saúde / Ferimentos', desc: 'Hemorragia, Desmaio, Parada, Queda...', icon: '🩺' },
                    { id: 'perigo', title: 'Perigo / Crime', desc: 'Assalto, Ameaça, Invasão de domicílio...', icon: '🚨' },
                    { id: 'transito', title: 'Acidente de Trânsito', desc: 'Colisão com vítimas, Atropelamento...', icon: '🚗' },
                    { id: 'incendio', title: 'Incêndio / Fumaça', desc: 'Fogo ativo, Vazamento de gás tóxico...', icon: '🔥' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedEmergency(item.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                        selectedEmergency === item.id
                          ? 'bg-red-500/15 border-red-500 text-white shadow-md'
                          : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <span className="font-extrabold text-sm block text-white">{item.title}</span>
                          <span className="text-xs text-slate-400">{item.desc}</span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedEmergency === item.id ? 'border-red-500 bg-red-500' : 'border-slate-600'
                        }`}
                      >
                        {selectedEmergency === item.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Gravidade da Situação (Botões Horizontais) */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  2. Gravidade da Situação
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSeverity('critico')}
                    className={`py-3 px-2 rounded-2xl text-center border transition flex flex-col items-center justify-center ${
                      severity === 'critico'
                        ? 'bg-red-600 border-red-400 text-white font-black shadow'
                        : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black">Crítico</span>
                    <span className="text-[10px] opacity-80">(Imediato)</span>
                  </button>

                  <button
                    onClick={() => setSeverity('urgente')}
                    className={`py-3 px-2 rounded-2xl text-center border transition flex flex-col items-center justify-center ${
                      severity === 'urgente'
                        ? 'bg-orange-500 border-orange-400 text-white font-black shadow'
                        : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black">Urgente</span>
                    <span className="text-[10px] opacity-80">(Em minutos)</span>
                  </button>

                  <button
                    onClick={() => setSeverity('estavel')}
                    className={`py-3 px-2 rounded-2xl text-center border transition flex flex-col items-center justify-center ${
                      severity === 'estavel'
                        ? 'bg-slate-700 border-slate-500 text-white font-black shadow'
                        : 'bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black">Estável</span>
                    <span className="text-[10px] opacity-80">(Sem risco)</span>
                  </button>
                </div>
              </div>

              {/* 3. Contexto do Local (Checkboxes / Toggles) */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  3. Contexto do Local
                </h3>
                <div className="bg-[#161B22] border border-slate-800 rounded-2xl divide-y divide-slate-800">
                  <label className="p-3.5 flex items-center justify-between cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-red-400 block">
                        🤫 Não posso fazer barulho (Silêncio total)
                      </span>
                      <span className="text-[11px] text-slate-400">Socorristas chegam sem sirenes ligadas</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={noNoise}
                      onChange={(e) => setNoNoise(e.target.checked)}
                      className="w-5 h-5 accent-red-500 cursor-pointer"
                    />
                  </label>

                  <label className="p-3.5 flex items-center justify-between cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-white block">👤 Estou sozinho(a)</span>
                      <span className="text-[11px] text-slate-400">Sem acompanhantes no recinto</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAlone}
                      onChange={(e) => setIsAlone(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 cursor-pointer"
                    />
                  </label>

                  <label className="p-3.5 flex items-center justify-between cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-white block">👶 Há crianças no local</span>
                      <span className="text-[11px] text-slate-400">Prioriza protocolo de proteção infantil</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasChildren}
                      onChange={(e) => setHasChildren(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 cursor-pointer"
                    />
                  </label>

                  <label className="p-3.5 flex items-center justify-between cursor-pointer">
                    <div className="pr-3">
                      <span className="text-xs font-bold text-red-400 block">⚠️ Criminoso armado</span>
                      <span className="text-[11px] text-slate-400">Ameaça tática com arma letal</span>
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
                  onClick={() => handleTriggerSOS('Triagem Concluída')}
                  className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-black text-sm tracking-wider uppercase rounded-2xl shadow-[0_4px_25px_rgba(239,68,68,0.5)] flex flex-col items-center justify-center transition"
                >
                  <span>ENVIAR ALERTA ÀS AUTORIDADES 🚨</span>
                  <span className="text-[10px] font-normal text-red-100 mt-0.5">
                    Despacho com telemetria GPS e perfil médico
                  </span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 3. TELA: ATENDIMENTO (ACOMPANHAMENTO E CHAT RTT)          */}
          {/* ========================================================= */}
          {activeTab === 'Atendimento' && (
            <div className="flex flex-col h-full relative pb-20">
              
              {/* Header de Status de Emergência Ativa */}
              <div className="bg-red-600 px-4 py-3 flex items-center justify-between text-white shrink-0 shadow-md">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                  <div>
                    <h2 className="text-xs font-black tracking-wide leading-none">
                      SOS ATIVO {incidentId}
                    </h2>
                    <p className="text-[11px] text-red-100 font-semibold mt-0.5">
                      Viaturas SAMU e PM Notificadas
                    </p>
                  </div>
                </div>
                <div className="bg-black/35 px-2.5 py-1 rounded-xl text-xs font-mono font-black border border-white/20">
                  {formatTimer(elapsedSeconds)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5">
                
                {/* Card de Mapa e Trajeto da Viatura */}
                <div className="bg-[#161B22] border border-slate-700 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-white flex items-center gap-1.5">
                        🚑 Ambulância AL-04
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5">Distância: 1.8km</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-[11px] font-black">
                      ✓ Sirene Silenciosa OK
                    </span>
                  </div>

                  {/* Visualização de Rota */}
                  <div className="h-24 bg-slate-900 rounded-xl relative overflow-hidden border border-slate-800 flex items-center px-6">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
                    
                    <div className="relative z-10 w-full flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl animate-bounce">🚑</span>
                        <span className="text-[10px] font-black text-red-400 bg-black/70 px-1.5 py-0.5 rounded mt-1">AL-04</span>
                      </div>

                      <div className="flex-1 mx-4 h-1.5 bg-slate-700 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-500 animate-pulse"></div>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-2xl">📍</span>
                        <span className="text-[10px] font-black text-emerald-400 bg-black/70 px-1.5 py-0.5 rounded mt-1">Você</span>
                      </div>
                    </div>

                    <div className="absolute bottom-1.5 right-2.5 text-xs font-black text-amber-400 bg-slate-950/90 px-2.5 py-0.5 rounded-lg border border-slate-800">
                      Chegada estimada: 6 minutos
                    </div>
                  </div>
                </div>

                {/* Botão Conectar Vídeo em Libras */}
                <button
                  onClick={() => setLibrasModalActive(true)}
                  className="p-3.5 bg-gradient-to-r from-purple-900/70 to-purple-800/50 border border-purple-500/60 rounded-2xl flex items-center justify-between text-left hover:brightness-110 active:scale-98 transition shadow group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/25 text-purple-300 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
                      🤟
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">
                          Vídeo com Intérprete Libras
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <p className="text-xs text-purple-200 mt-0.5">
                        Central conectada em tempo real por vídeo
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-purple-300 bg-purple-950/70 px-3 py-1.5 rounded-xl border border-purple-800">
                    Conectar →
                  </span>
                </button>

                {/* Transcrição Instantânea (Live RTT) */}
                <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                      Transcrição Instantânea (Live RTT)
                    </span>
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-800">
                      Voz para Texto Ativo
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto no-scrollbar">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'operator'
                            ? 'bg-sky-950/40 border-l-4 border-sky-400 text-slate-200'
                            : 'bg-slate-800 text-white self-end ml-4 border border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                          <span>{msg.name}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-xs">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Respostas Rápidas de 1 Toque */}
                <div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                    Respostas Rápidas (1 Toque)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
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
                        className="px-3 py-2.5 bg-[#161B22] hover:bg-slate-800 active:scale-95 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 text-left transition"
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
                    className="flex-1 bg-[#161B22] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center transition active:scale-95"
                    aria-label="Enviar Mensagem"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Botão Modo Camuflagem */}
                <button
                  onClick={() => setCamouflageActive(true)}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center gap-2.5 text-slate-300 hover:text-white text-xs font-bold transition shadow"
                >
                  <EyeOff className="w-4 h-4 text-slate-400" />
                  <span>Modo Camuflagem (Tela de Relógio Falso)</span>
                </button>

              </div>

              {/* MODAL DE VÍDEO COM INTÉRPRETE DE LIBRAS & WEBCAM REAL */}
              {librasModalActive && (
                <div className="absolute inset-0 z-50 bg-[#0D1117] flex flex-col p-4 animate-in fade-in">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <h3 className="text-base font-black text-white">Central de Libras Conectada</h3>
                      <span className="text-xs text-purple-300">Intérprete Oficial de Emergência</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-black">
                      AO VIVO
                    </span>
                  </div>

                  {/* Feed do Intérprete */}
                  <div className="flex-1 bg-slate-900 border-2 border-purple-500/50 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                    <span className="text-7xl animate-pulse mb-4">🤟</span>
                    <h4 className="text-base font-black text-white">Karina Santos (Intérprete CIL 42)</h4>
                    <p className="text-xs text-purple-200 max-w-xs mt-1 leading-relaxed">
                      "Visualizando seus sinais e repassando comandos diretos às viaturas da PM e SAMU."
                    </p>

                    {/* Janela PIP da Câmera do Usuário */}
                    <div className="absolute top-4 right-4 w-28 h-36 bg-slate-800 border-2 border-purple-400 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {!cameraStream && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-slate-800">
                          <span className="text-2xl">👤</span>
                          <span className="text-[9px] text-slate-400 mt-1">Sua Câmera</span>
                        </div>
                      )}
                    </div>

                    {/* Legenda RTT no Vídeo */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/85 p-3 rounded-xl text-left text-xs text-sky-300 font-mono border border-slate-800">
                      Legenda RTT: "A viatura AL-04 está a 1.8km. Fique abrigado(a)."
                    </div>
                  </div>

                  <button
                    onClick={() => setLibrasModalActive(false)}
                    className="mt-3 py-3.5 bg-slate-800 hover:bg-slate-700 active:scale-98 text-white text-xs font-bold rounded-2xl border border-slate-700 transition"
                  >
                    Fechar Vídeo e Voltar ao Chat
                  </button>
                </div>
              )}

              {/* MODAL DO MODO CAMUFLAGEM (RELÓGIO FALSO) */}
              {camouflageActive && (
                <div className="absolute inset-0 z-50 bg-black flex flex-col justify-between p-6 select-none animate-in fade-in">
                  <div className="flex justify-between items-center text-xs text-slate-600">
                    <span>VIVO 5G</span>
                    <span>98% 🔋</span>
                  </div>

                  <div className="flex flex-col items-center my-auto">
                    <span className="text-slate-600 text-base mb-2">🔒</span>
                    <span className="text-slate-400 text-sm font-medium">{currentDate}</span>
                    <span className="text-8xl font-extralight text-white tracking-tighter my-2">
                      {currentTime}
                    </span>
                    <span className="text-slate-500 text-xs mt-1">24°C • Céu Limpo</span>

                    <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 w-full max-w-xs shadow">
                      <span className="text-xs font-bold text-white block">⏰ Alarme programado</span>
                      <span className="text-[11px] text-slate-400">Amanhã às 06:30 • Diário</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setCamouflageActive(false)}
                      className="py-2.5 px-5 rounded-full bg-neutral-900 text-neutral-600 hover:text-neutral-400 text-[11px] font-black tracking-widest uppercase transition border border-neutral-800"
                    >
                      • Toque duas vezes para desbloquear •
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 4. TELA: PERFIL (CONFIGURAÇÕES & FICHA MÉDICA DE EMERGÊNCIA)*/}
          {/* ========================================================= */}
          {activeTab === 'Perfil' && (
            <div className="p-4 flex flex-col gap-4 pb-24">
              
              <div>
                <h2 className="text-lg font-black text-white">Perfil e Configurações</h2>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">
                  HARDWARE & FICHA MÉDICA DE EMERGÊNCIA
                </p>
              </div>

              {/* Banner de Criptografia */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 block font-black">
                    Dados Vitais Criptografados
                  </strong>
                  Estas informações são despachadas automaticamente aos socorristas (SAMU/PM) no instante do acionamento silencioso.
                </div>
              </div>

              {/* Bloco 1: Atalhos Físicos de Hardware */}
              <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Atalhos Físicos de Hardware
                  </h3>
                  <p className="text-[11px] text-slate-400">Disparo silencioso sem olhar para a tela</p>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center justify-between text-xs text-slate-200 cursor-pointer">
                    <div>
                      <span className="font-bold block">Acionamento Rápido pelo Botão Power</span>
                      <span className="text-[11px] text-slate-400">Disparo com tela bloqueada</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={powerButtonQuick}
                      onChange={(e) => setPowerButtonQuick(e.target.checked)}
                      className="w-5 h-5 accent-red-500 cursor-pointer"
                    />
                  </label>

                  {/* Gatilho Primário (Radio Buttons) */}
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      Gatilho Primário:
                    </span>

                    <label className="flex items-center gap-2.5 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        name="trigger"
                        checked={triggerMethod === 'power3x'}
                        onChange={() => setTriggerMethod('power3x')}
                        className="w-4 h-4 accent-red-500"
                      />
                      <span>3 cliques rápidos no Botão Power</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-white cursor-pointer">
                      <input
                        type="radio"
                        name="trigger"
                        checked={triggerMethod === 'volDownPower'}
                        onChange={() => setTriggerMethod('volDownPower')}
                        className="w-4 h-4 accent-red-500"
                      />
                      <span>Segurar Volume Baixo + Power por 3s</span>
                    </label>
                  </div>

                  {/* Retorno Tátil Morse */}
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col gap-2.5">
                    <label className="flex items-center justify-between text-xs text-white cursor-pointer">
                      <div>
                        <span className="font-bold block">Modo Silencioso com Retorno Tátil Morse</span>
                        <span className="text-[11px] text-slate-400">
                          Vibra <code className="text-amber-400 font-mono">... --- ...</code> confirmando envio
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={morseFeedback}
                        onChange={(e) => setMorseFeedback(e.target.checked)}
                        className="w-5 h-5 accent-amber-500 cursor-pointer"
                      />
                    </label>

                    {morseFeedback && (
                      <button
                        onClick={executeMorseVibration}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 active:scale-98 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition"
                      >
                        <Vibrate className="w-4 h-4" />
                        <span>Testar Vibração Tátil Morse</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bloco 2: Ficha Médica de Emergência */}
              <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-sm">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Ficha Médica de Emergência
                  </h3>
                  <p className="text-[11px] text-slate-400">Informações prioritárias para socorristas</p>
                </div>

                {/* Identificação */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-base font-black text-white shrink-0">
                    AC
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white">{userName}</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold">
                        🧏 Surda
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px] font-bold">
                        🤟 Usuária de Libras
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid de Dados Vitais */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Tipo Sanguíneo</span>
                    <span className="text-base font-black text-red-400">{bloodType}</span>
                  </div>

                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Alergias</span>
                    <span className="text-xs font-bold text-white">{allergies}</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] font-black text-slate-400 uppercase block">Condições Crônicas</span>
                  <span className="text-xs text-slate-200">{chronicConditions}</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] font-black text-slate-400 uppercase block">Medicamentos em Uso</span>
                  <span className="text-xs text-slate-200">{medications}</span>
                </div>
              </div>

              {/* Bloco 3: Contatos de Emergência */}
              <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    Contatos de Confiança
                  </h3>
                  <p className="text-[11px] text-slate-400">Recebem SMS automático com link de rastreamento GPS</p>
                </div>

                <div className="flex flex-col gap-2">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">
                          {contact.name} ({contact.relationship})
                        </span>
                        <span className="text-[11px] text-slate-400">{contact.phone}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        SMS Ativo ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </section>

        {/* BARRA DE NAVEGAÇÃO INFERIOR FIXA (BOTTOM TABS) */}
        <nav
          className="bg-[#12161E] border-t border-slate-800/80 px-2 py-2 flex justify-around items-center z-40 shrink-0 select-none"
          aria-label="Navegação Principal"
        >
          {/* Tab 1: SOS */}
          <button
            onClick={() => setActiveTab('SOS')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'SOS'
                ? 'text-red-500 font-black scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl leading-none">🚨</span>
            <span className="text-[11px] font-black">SOS</span>
          </button>

          {/* Tab 2: Triagem */}
          <button
            onClick={() => setActiveTab('Triagem')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'Triagem'
                ? 'text-red-500 font-black scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl leading-none">📋</span>
            <span className="text-[11px] font-black">Triagem</span>
          </button>

          {/* Tab 3: Atendimento */}
          <button
            onClick={() => setActiveTab('Atendimento')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition relative ${
              activeTab === 'Atendimento'
                ? 'text-red-500 font-black scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl leading-none">💬</span>
            <span className="text-[11px] font-black">Atendimento</span>
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </button>

          {/* Tab 4: Perfil */}
          <button
            onClick={() => setActiveTab('Perfil')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
              activeTab === 'Perfil'
                ? 'text-red-500 font-black scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl leading-none">👤</span>
            <span className="text-[11px] font-black">Perfil</span>
          </button>
        </nav>

      </main>
    </div>
  );
}
