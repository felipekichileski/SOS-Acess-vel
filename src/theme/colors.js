// Design System - Cores Utilitárias de Alto Contraste (Modo Escuro)
// Otimizado para legibilidade sob estresse e resposta visual rápida

export const colors = {
  // Fundos & Estrutura
  background: '#0D1117',        // Fundo geral escuro (Slate ultra escuro / GitHub Dark)
  card: '#161B22',              // Cards e containers principais
  cardElevated: '#1C2128',      // Cards com elevação e destaque tátil
  cardBorder: '#30363D',        // Bordas de alto contraste
  cardActiveBorder: '#EF4444',  // Borda para itens ativos em emergência

  // Cores de Ação & Severidade
  danger: '#EF4444',            // Vermelho Alerta SOS / Crítico imediato
  dangerDark: '#991B1B',        // Vermelho escuro para estados ativos/anéis
  dangerGlow: 'rgba(239, 68, 68, 0.35)', // Brilho de pulsação
  urgent: '#F97316',            // Laranja Urgente (em minutos)
  urgentGlow: 'rgba(249, 115, 22, 0.3)',
  stable: '#22C55E',            // Verde Estável / GPS / Sucesso
  stableGlow: 'rgba(34, 197, 94, 0.3)',

  // Destaques e Acessibilidade
  libras: '#8B5CF6',            // Roxo de destaque para Recursos de Libras
  librasGlow: 'rgba(139, 92, 246, 0.3)',
  rttBlue: '#38BDF8',           // Azul claro para texto em tempo real (RTT)
  rttBg: '#0C2740',             // Fundo do chat RTT

  // Tipografia & Ícones
  textPrimary: '#F8FAFC',       // Texto de maior contraste (quase branco puro)
  textSecondary: '#94A3B8',     // Subtítulos e instruções secundárias
  textMuted: '#64748B',         // Informações complementares/desativadas
  textDanger: '#FCA5A5',        // Texto de aviso com tom de alerta

  // Barra de Navegação
  tabBarBg: '#12161E',          // Fundo da barra inferior
  tabBarBorder: '#21262D',      // Borda divisora da barra
  tabBarActive: '#EF4444',      // Ícone ativo
  tabBarInactive: '#64748B',    // Ícone inativo
};

export default colors;
