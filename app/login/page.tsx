'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  Lock,
  Fingerprint,
  Building2,
  User,
  KeyRound,
  Eye,
  EyeOff,
  LogIn,
  Play,
  ChevronRight,
  UserPlus,
  Headphones,
  MessageSquare,
  CheckCircle2,
  Asterisk,
  Hand,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [keepConnected, setKeepConnected] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [librasVideoOpen, setLibrasVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  }, [router]);

  const handleBiometric = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 600);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex justify-center items-stretch antialiased">
      <main className="w-full max-w-md bg-[#0D1117] flex flex-col min-h-screen border-x border-slate-800/80 shadow-2xl relative overflow-hidden">

        {/* Cabecalho de Status */}
        <header className="bg-black px-3 py-2 flex items-center justify-between shrink-0 gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-wide hover:bg-emerald-500/25 transition-colors">
            <Lock className="w-3 h-3 shrink-0" />
            <span>• AMBIENTE SEGURO End-to-End SSL</span>
          </button>
          <button
            onClick={handleBiometric}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-bold tracking-wide hover:bg-red-500/30 transition-colors animate-pulse"
          >
            <Asterisk className="w-3 h-3 shrink-0" />
            <span>• SOS RAPIDO</span>
          </button>
        </header>

        {/* Corpo com Scroll */}
        <section className="flex-1 overflow-y-auto no-scrollbar px-4 py-6 flex flex-col gap-5 pb-8">

          {/* Logotipo e Descricao */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="p-5 rounded-2xl bg-[#161B22] border border-slate-700/60 shadow-lg"
              style={{ boxShadow: '0 0 24px 2px rgba(239,68,68,0.12), inset 0 0 20px rgba(239,68,68,0.04)' }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/50 relative">
                <Shield className="w-10 h-10 text-white absolute" />
                <Hand className="w-5 h-5 text-white/80 absolute bottom-2.5 right-2.5" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-black text-white tracking-tight">SOS Acessivel</h1>
              <p className="text-sm text-slate-400 mt-1 leading-snug max-w-[260px] mx-auto">
                Seguranca e socorro imediato para a comunidade surda, muda e com dificuldades de fala.
              </p>
            </div>
          </div>

          {/* Card Ajuda em Libras */}
          <div className="bg-[#161B22] border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 shadow-md">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Hand className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">Ajuda em Libras</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Instrucoes sinalizadas e legendadas para login</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 uppercase tracking-wider">Video</span>
              <button
                id="btn-libras-video"
                onClick={() => setLibrasVideoOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-colors"
              >
                <Play className="w-3 h-3 fill-white" />
                Assistir
              </button>
            </div>
          </div>

          {/* Acesso Rapido */}
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2.5 px-0.5">
              Acesso Rapido (1 Toque)
            </p>
            <div className="flex flex-col gap-2.5">
              {/* Biometria */}
              <button
                id="btn-biometric"
                onClick={handleBiometric}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 hover:border-emerald-500/60 hover:bg-emerald-950/80 transition-all group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                  <Fingerprint className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-white">Entrar com Biometria</p>
                  <p className="text-[11px] text-emerald-400/70 mt-0.5">Acesso em 1 segundo sob estresse</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Gov.br */}
              <button
                id="btn-govbr"
                onClick={handleBiometric}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#161B22] border border-slate-700/50 hover:border-slate-500/60 hover:bg-[#1C2230] transition-all group active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-700/40 border border-slate-600/40 flex items-center justify-center shrink-0 group-hover:bg-slate-700/60 transition-colors">
                  <Building2 className="w-6 h-6 text-slate-300" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-white">Entrar com gov.br / SUS</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Sincroniza prontuario e contatos</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-wider shrink-0">Oficial</span>
              </button>
            </div>
          </div>

          {/* Divisor */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
              Ou acesse com seus dados
            </p>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Formulario de Login */}
          <div className="flex flex-col gap-4">
            {/* Campo CPF / E-mail */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-identifier" className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                  CPF, Cartao SUS ou E-mail
                </label>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 uppercase tracking-wider">
                  Apenas numeros ou e-mail
                </span>
              </div>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="field-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="000.000.000-00 ou seu@email.com"
                  className="w-full bg-[#161B22] border border-slate-700/60 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:bg-[#1C2230]"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="field-password" className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                  Senha de Acesso
                </label>
                <button className="text-[9px] font-black px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/25 text-orange-400 uppercase tracking-wider hover:bg-orange-500/25 transition-colors">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="field-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha cadastrada"
                  className="w-full bg-[#161B22] border border-slate-700/60 focus:border-red-500/60 rounded-xl pl-10 pr-11 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:bg-[#1C2230]"
                />
                <button
                  id="btn-toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Manter Conectado */}
            <button
              id="toggle-keep-connected"
              onClick={() => setKeepConnected((v) => !v)}
              className="w-full flex items-start gap-3 p-3.5 rounded-xl bg-[#161B22] border border-slate-700/40 hover:border-slate-600/60 transition-colors text-left group"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  keepConnected ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-slate-600 group-hover:border-slate-400'
                }`}
              >
                {keepConnected && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">Manter conectado para emergencias</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Altamente recomendado para evitar bloqueios e pedir socorro em menos de 3 segundos.
                </p>
              </div>
            </button>
          </div>

          {/* Botao Principal */}
          <button
            id="btn-login"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-base uppercase tracking-wider transition-all active:scale-[0.98] shadow-lg shadow-amber-900/30 disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)', color: '#fff' }}
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {isLoading ? 'Verificando...' : 'Acessar Conta'}
          </button>

          {/* Rodape de Opcoes */}
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-[12px] text-slate-500">Primeira vez aqui?</p>
            <button className="flex items-center gap-1.5 text-[12px] font-bold text-red-400 hover:text-red-300 transition-colors">
              <UserPlus className="w-3.5 h-3.5" />
              Criar Ficha de Emergencia Gratis
            </button>
          </div>

          {/* Card de Suporte */}
          <div className="bg-[#161B22] border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">Suporte Acessivel 24 Horas</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Atendimento textual ou com Interprete Libras</p>
            </div>
            <button id="btn-support-chat" className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold transition-colors shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
              Iniciar Chat
            </button>
          </div>

          {/* Informacoes Legais */}
          <div className="flex flex-col items-center gap-1 pb-2">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-emerald-400">WCAG AAA Compliant</span>
            </div>
            <p className="text-[10px] text-slate-600 text-center">
              SOS Acessivel • Conectado as Centrais 190, 192 e 193
            </p>
          </div>
        </section>

        {/* Modal Video Libras */}
        {librasVideoOpen && (
          <div
            className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLibrasVideoOpen(false)}
          >
            <div
              className="bg-[#161B22] border border-slate-700 rounded-2xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-white flex items-center gap-2">
                  <Hand className="w-4 h-4 text-indigo-400" />
                  Ajuda em Libras
                </h2>
                <button
                  id="btn-close-libras"
                  onClick={() => setLibrasVideoOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors text-xl leading-none"
                >
                  X
                </button>
              </div>
              <div className="aspect-video bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-3 border border-slate-700">
                <div className="w-14 h-14 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
                  <Play className="w-6 h-6 text-indigo-300 fill-indigo-300 ml-1" />
                </div>
                <p className="text-xs text-slate-400 text-center px-4">
                  Video com interprete de Libras explicando como fazer login
                </p>
              </div>
              <button
                onClick={() => setLibrasVideoOpen(false)}
                className="mt-4 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
