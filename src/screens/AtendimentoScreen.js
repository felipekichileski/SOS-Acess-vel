import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import CamouflageModal from '../components/CamouflageModal';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'operator',
    name: 'Atendente Central 192 (SAMU / PM)',
    time: '17:52',
    text: 'Sua localização foi triangulada com sucesso. A viatura AL-04 e a equipe do 190 foram despachadas com sirene desligada.',
    rtt: true,
  },
  {
    id: 2,
    sender: 'operator',
    name: 'Transcrição de Áudio (RTT em Tempo Real)',
    time: '17:53',
    text: 'Socorrista informou: "Chegaremos no portão lateral em aproximadamente 5 a 6 minutos. Mantenham a calma e permaneçam abrigados."',
    rtt: true,
  },
];

const QUICK_RESPONSES = [
  'Estou escondido(a)',
  'Porta trancada',
  'A pessoa desmaiou',
  'Preciso de maca',
  'Tudo seguro no momento',
];

export const AtendimentoScreen = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [camouflageVisible, setCamouflageVisible] = useState(false);
  const [librasModalVisible, setLibrasModalVisible] = useState(false);

  const handleSendCustom = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'Você (Silencioso)',
      time: 'Agora',
      text: inputText.trim(),
      rtt: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  const handleQuickResponse = (text) => {
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'Você (Resposta Rápida 1-Toque)',
      time: 'Agora',
      text: text,
      rtt: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Modal de Camuflagem (Relógio Falso) */}
      <CamouflageModal
        visible={camouflageVisible}
        onClose={() => setCamouflageVisible(false)}
      />

      {/* Modal Simulado de Chamada de Vídeo com Intérprete de Libras */}
      <Modal visible={librasModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.librasContainer}>
          <View style={styles.librasHeader}>
            <View>
              <Text style={styles.librasTitle}>Intérprete Oficial de Libras</Text>
              <Text style={styles.librasSubtitle}>Central de Emergência Conectada</Text>
            </View>
            <View style={styles.librasLiveBadge}>
              <View style={styles.greenPulseDot} />
              <Text style={styles.librasLiveText}>AO VIVO</Text>
            </View>
          </View>

          {/* Área de Vídeo em Libras (Simulação tática de alta acessibilidade) */}
          <View style={styles.librasVideoFeed}>
            <View style={styles.librasAvatarBox}>
              <Text style={styles.librasAvatarEmoji}>🤟</Text>
              <Text style={styles.librasAvatarName}>Karina Santos - CIL 42</Text>
              <Text style={styles.librasHelpText}>
                Intérprete visualizando sua transmissão e traduzindo para a PM e SAMU.
              </Text>
            </View>
            <View style={styles.pipSelf}>
              <Text style={styles.pipText}>Sua Câmera (Frontal)</Text>
              <Text style={styles.pipIcon}>👤</Text>
            </View>
          </View>

          {/* RTT sobreposto no vídeo */}
          <View style={styles.videoOverlaySubtitle}>
            <Text style={styles.overlaySubText}>
              Legenda RTT: "Fique onde está. A viatura já ingressou na Av. Paulista."
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeLibrasBtn}
            onPress={() => setLibrasModalVisible(false)}
          >
            <Text style={styles.closeLibrasBtnText}>Fechar Vídeo e Voltar ao Chat</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Header de Status Vermelho Crítico */}
      <View style={styles.statusHeader}>
        <View style={styles.statusHeaderRow}>
          <View style={styles.alertPulse}>
            <Text style={styles.alertEmoji}>🚨</Text>
          </View>
          <View style={styles.statusHeaderTextBox}>
            <Text style={styles.statusHeaderId}>SOS ATIVO #4829</Text>
            <Text style={styles.statusHeaderSubtitle}>
              Viaturas SAMU e PM Notificadas
            </Text>
          </View>
          <View style={styles.liveClockBadge}>
            <Text style={styles.liveClockText}>03:22</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mapa / Trajeto (Card Superior) */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeaderRow}>
            <View style={styles.unitInfo}>
              <Text style={styles.unitBadge}>🚑 Ambulância AL-04</Text>
              <Text style={styles.unitDistance}>Distância: 1.8 km</Text>
            </View>
            <View style={styles.sirenBadge}>
              <Text style={styles.sirenText}>✓ Sirene Silenciosa OK</Text>
            </View>
          </View>

          {/* Visualização Esquemática de Rota do Mapa */}
          <View style={styles.mapVisualContainer}>
            <View style={styles.mapGraphic}>
              <View style={styles.mapGridLine1} />
              <View style={styles.mapGridLine2} />
              {/* Ponto Viatura */}
              <View style={styles.mapPinAmbulance}>
                <Text style={styles.pinIconSmall}>🚑</Text>
                <Text style={styles.pinLabelText}>AL-04</Text>
              </View>
              {/* Linha de Trajeto */}
              <View style={styles.routePathLine} />
              {/* Ponto Usuário */}
              <View style={styles.mapPinUser}>
                <Text style={styles.pinIconSmall}>📍</Text>
                <Text style={styles.pinLabelText}>Você</Text>
              </View>
            </View>
            <View style={styles.etaBar}>
              <Text style={styles.etaLabel}>Chegada estimada:</Text>
              <Text style={styles.etaValue}>6 minutos</Text>
            </View>
          </View>
        </View>

        {/* Botão de Vídeo Acessível com Libras */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setLibrasModalVisible(true)}
          style={styles.librasButton}
          accessibilityRole="button"
          accessibilityLabel="Vídeo com Intérprete Libras - Central conectada em tempo real"
        >
          <View style={styles.librasIconCircle}>
            <Text style={styles.librasHandsIcon}>🤟</Text>
          </View>
          <View style={styles.librasTextCol}>
            <View style={styles.librasTitleRow}>
              <Text style={styles.librasButtonTitle}>Vídeo com Intérprete Libras</Text>
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Disponível</Text>
              </View>
            </View>
            <Text style={styles.librasButtonSub}>
              Central conectada em tempo real via vídeo e chat bilateral
            </Text>
          </View>
        </TouchableOpacity>

        {/* Seção Transcrição Instantânea (Live RTT) */}
        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatSectionTitle}>TRANSCRIÇÃO INSTANTÂNEA (LIVE RTT)</Text>
            <Text style={styles.rttBadge}>Texto em tempo real</Text>
          </View>

          <View style={styles.chatContainer}>
            {messages.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.messageBubble,
                  item.sender === 'user' ? styles.userBubble : styles.operatorBubble,
                ]}
              >
                <View style={styles.messageHeader}>
                  <Text style={styles.senderName}>{item.name}</Text>
                  <Text style={styles.messageTime}>{item.time}</Text>
                </View>
                <Text style={styles.messageText}>{item.text}</Text>
                {item.rtt && (
                  <View style={styles.rttIndicatorTag}>
                    <Text style={styles.rttIndicatorText}>● RTT transcrito ao vivo</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Respostas Rápidas de 1 Toque */}
        <View style={styles.quickResponseSection}>
          <Text style={styles.quickHeaderTitle}>RESPOSTAS RÁPIDAS (1 TOQUE)</Text>
          <View style={styles.quickGrid}>
            {QUICK_RESPONSES.map((resp, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.quickChip}
                onPress={() => handleQuickResponse(resp)}
                accessibilityRole="button"
                accessibilityLabel={`Enviar resposta rápida: ${resp}`}
              >
                <Text style={styles.quickChipText}>[{resp}]</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Input de Texto Silencioso */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite mensagem sem som..."
            placeholderTextColor="#6B7280"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendCustom}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendCustom}
            accessibilityRole="button"
            accessibilityLabel="Enviar mensagem silenciosa"
          >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Modo Camuflagem no Rodapé */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setCamouflageVisible(true)}
          style={styles.camouflageButton}
          accessibilityRole="button"
          accessibilityLabel="Ativar Modo Camuflagem"
          accessibilityHint="Disfarça este aplicativo de emergência com uma tela de relógio inofensiva"
        >
          <Text style={styles.camouflageIcon}>👁️‍🗨️</Text>
          <View style={styles.camouflageTextCol}>
            <Text style={styles.camouflageTitle}>Modo Camuflagem (Disfarce)</Text>
            <Text style={styles.camouflageDesc}>
              Ocultar tela de emergência imediatamente com relógio digital falso
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusHeader: {
    backgroundColor: colors.danger,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B91C1C',
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertPulse: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  alertEmoji: {
    fontSize: 20,
  },
  statusHeaderTextBox: {
    flex: 1,
  },
  statusHeaderId: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  statusHeaderSubtitle: {
    fontSize: 12,
    color: '#FEE2E2',
    fontWeight: '600',
    marginTop: 1,
  },
  liveClockBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveClockText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  mapCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    marginBottom: 14,
  },
  mapHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitInfo: {
    flex: 1,
  },
  unitBadge: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  unitDistance: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sirenBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  sirenText: {
    color: colors.stable,
    fontSize: 11,
    fontWeight: '700',
  },
  mapVisualContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#0F172A',
  },
  mapGraphic: {
    height: 120,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  mapGridLine1: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    height: 1,
    backgroundColor: '#1F2937',
  },
  mapGridLine2: {
    position: 'absolute',
    top: '30%',
    bottom: '30%',
    width: 1,
    backgroundColor: '#1F2937',
  },
  mapPinAmbulance: {
    position: 'absolute',
    left: '18%',
    top: '32%',
    alignItems: 'center',
  },
  routePathLine: {
    position: 'absolute',
    left: '28%',
    right: '28%',
    top: '48%',
    height: 3,
    backgroundColor: colors.danger,
    borderStyle: 'dashed',
  },
  mapPinUser: {
    position: 'absolute',
    right: '18%',
    top: '32%',
    alignItems: 'center',
  },
  pinIconSmall: {
    fontSize: 22,
  },
  pinLabelText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  etaBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#1F2937',
  },
  etaLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  etaValue: {
    color: '#F59E0B',
    fontSize: 15,
    fontWeight: '800',
  },
  librasButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E1065',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.libras,
    marginBottom: 16,
  },
  librasIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.libras,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  librasHandsIcon: {
    fontSize: 22,
  },
  librasTextCol: {
    flex: 1,
  },
  librasTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  librasButtonTitle: {
    ...typography.bodyBold,
    color: '#FFFFFF',
    fontSize: 15,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.stable,
    marginRight: 4,
  },
  onlineText: {
    color: colors.stable,
    fontSize: 10,
    fontWeight: '700',
  },
  librasButtonSub: {
    fontSize: 12,
    color: '#DDD6FE',
    marginTop: 2,
    lineHeight: 16,
  },
  chatSection: {
    marginBottom: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatSectionTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  rttBadge: {
    fontSize: 10,
    color: colors.rttBlue,
    fontWeight: '700',
  },
  chatContainer: {
    gap: 10,
  },
  messageBubble: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  operatorBubble: {
    backgroundColor: colors.cardElevated,
    borderColor: '#2563EB',
    borderLeftWidth: 4,
  },
  userBubble: {
    backgroundColor: '#1E293B',
    borderColor: '#475569',
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.rttBlue,
  },
  messageTime: {
    fontSize: 10,
    color: colors.textMuted,
  },
  messageText: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  rttIndicatorTag: {
    marginTop: 4,
  },
  rttIndicatorText: {
    fontSize: 10,
    color: '#38BDF8',
    fontStyle: 'italic',
  },
  quickResponseSection: {
    marginBottom: 16,
  },
  quickHeaderTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickChip: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#374151',
  },
  quickChipText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.danger,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  camouflageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#475569',
  },
  camouflageIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  camouflageTextCol: {
    flex: 1,
  },
  camouflageTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  camouflageDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  librasContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    justifyContent: 'space-between',
  },
  librasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  librasTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  librasSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  librasLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
    marginRight: 4,
  },
  librasLiveText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: '800',
  },
  librasVideoFeed: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.libras,
  },
  librasAvatarBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  librasAvatarEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  librasAvatarName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  librasHelpText: {
    color: '#CBD5E1',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  pipSelf: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 100,
    height: 120,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pipText: {
    color: '#94A3B8',
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 4,
  },
  pipIcon: {
    fontSize: 24,
  },
  videoOverlaySubtitle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  overlaySubText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeLibrasBtn: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  closeLibrasBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default AtendimentoScreen;
