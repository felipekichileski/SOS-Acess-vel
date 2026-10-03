import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Vibration,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const PerfilScreen = () => {
  // Configurações de Hardware
  const [hardwareMasterEnabled, setHardwareMasterEnabled] = useState(true);
  const [powerButtonQuickTrigger, setPowerButtonQuickTrigger] = useState(true);
  const [primaryTriggerMethod, setPrimaryTriggerMethod] = useState('power3x'); // 'power3x' ou 'volDownPower'
  const [morseFeedback, setMorseFeedback] = useState(true);
  const [vibratingNow, setVibratingNow] = useState(false);

  const handleTestVibration = () => {
    setVibratingNow(true);

    // Padrão Morse: S.O.S (... --- ...)
    // S: 3 toques curtos (100ms on, 100ms off)
    // O: 3 toques longos (300ms on, 100ms off)
    // S: 3 toques curtos (100ms on, 100ms off)
    const morsePattern = [
      0, 100, 100, 100, 100, 100, 200,
      300, 100, 300, 100, 300, 200,
      100, 100, 100, 100, 100
    ];

    if (Platform.OS !== 'web') {
      try {
        Vibration.vibrate(morsePattern);
      } catch (e) {
        // Ignora em caso de não suporte
      }
    }

    setTimeout(() => {
      setVibratingNow(false);
      Alert.alert(
        'Retorno Tátil Confirmado',
        'Seu dispositivo executou a sequência Morse tática (... --- ...). O SOS foi confirmado silenciosamente.'
      );
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil e Configurações</Text>
        <Text style={styles.headerSub}>HARDWARE & FICHA MÉDICA DE EMERGÊNCIA</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Criptografia e Despacho Automático */}
        <View style={styles.encryptedBanner}>
          <Text style={styles.encryptedIcon}>🔒</Text>
          <View style={styles.encryptedTextBox}>
            <Text style={styles.encryptedTitle}>Dados Vitais Criptografados</Text>
            <Text style={styles.encryptedDesc}>
              Estas informações são despachadas automaticamente aos socorristas (SAMU/PM) no instante do acionamento silencioso.
            </Text>
          </View>
        </View>

        {/* Bloco 1: Atalhos Físicos de Hardware */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionCardTitle}>ATALHOS FÍSICOS DE HARDWARE</Text>
            <Switch
              value={hardwareMasterEnabled}
              onValueChange={setHardwareMasterEnabled}
              trackColor={{ false: '#374151', true: colors.stable }}
              thumbColor="#FFFFFF"
            />
          </View>
          <Text style={styles.sectionHelp}>
            Disparo físico sem precisar olhar ou desbloquear a tela do aparelho
          </Text>

          {hardwareMasterEnabled && (
            <View style={styles.optionsList}>
              {/* Toggle Tela Bloqueada */}
              <View style={styles.optionRow}>
                <View style={styles.optionTextCol}>
                  <Text style={styles.optionTitle}>
                    Acionamento Rápido pelo Botão Power
                  </Text>
                  <Text style={styles.optionSubtitle}>
                    Permite disparo mesmo com tela bloqueada no bolso
                  </Text>
                </View>
                <Switch
                  value={powerButtonQuickTrigger}
                  onValueChange={setPowerButtonQuickTrigger}
                  trackColor={{ false: '#374151', true: colors.danger }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.subDivider} />

              {/* Gatilho Primário (Radio Buttons) */}
              <Text style={styles.fieldLabel}>Gatilho Primário:</Text>

              <TouchableOpacity
                style={[
                  styles.radioCard,
                  primaryTriggerMethod === 'power3x' && styles.radioCardActive,
                ]}
                onPress={() => setPrimaryTriggerMethod('power3x')}
              >
                <View style={styles.radioDotOuter}>
                  {primaryTriggerMethod === 'power3x' && <View style={styles.radioDotInner} />}
                </View>
                <View style={styles.radioTextCol}>
                  <Text style={styles.radioTitle}>3 cliques rápidos no Botão Power</Text>
                  <Text style={styles.radioDesc}>Recomendado para ação rápida com uma só mão</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioCard,
                  primaryTriggerMethod === 'volDownPower' && styles.radioCardActive,
                ]}
                onPress={() => setPrimaryTriggerMethod('volDownPower')}
              >
                <View style={styles.radioDotOuter}>
                  {primaryTriggerMethod === 'volDownPower' && <View style={styles.radioDotInner} />}
                </View>
                <View style={styles.radioTextCol}>
                  <Text style={styles.radioTitle}>Segurar Volume Baixo + Power por 3s</Text>
                  <Text style={styles.radioDesc}>Ideal contra disparos acidentais durante atividades</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.subDivider} />

              {/* Retorno Tátil Morse */}
              <View style={styles.morseBox}>
                <View style={styles.morseHeader}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.morseTitle}>
                      Modo Silencioso com Retorno Tátil Morse
                    </Text>
                    <Text style={styles.morseDesc}>
                      O aparelho vibra <Text style={{ fontFamily: 'monospace', color: colors.urgent }}>... --- ...</Text> em Morse para confirmar o envio sem fazer som.
                    </Text>
                  </View>
                  <Switch
                    value={morseFeedback}
                    onValueChange={setMorseFeedback}
                    trackColor={{ false: '#374151', true: colors.urgent }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                {morseFeedback && (
                  <TouchableOpacity
                    style={[
                      styles.testVibrationBtn,
                      vibratingNow && styles.testVibrationBtnActive,
                    ]}
                    onPress={handleTestVibration}
                  >
                    <Text style={styles.testVibrationBtnText}>
                      {vibratingNow ? '⚡ Vibrando Padrão SOS (... --- ...)...' : '📳 Testar Vibração Tátil Morse'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Bloco 2: Ficha Médica de Emergência */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>FICHA MÉDICA DE EMERGÊNCIA</Text>
          <Text style={styles.sectionHelp}>
            Identificação visual prioritária para a equipe médica e socorristas
          </Text>

          {/* Card de Identificação */}
          <View style={styles.medicalIdCard}>
            <View style={styles.avatarRow}>
              <View style={styles.userAvatar}>
                <Text style={styles.userAvatarText}>AC</Text>
              </View>
              <View style={styles.userDataCol}>
                <Text style={styles.userName}>Ana Clara Silva</Text>
                <Text style={styles.userDoc}>CPF: ***.458.918-** | 28 anos</Text>
                <View style={styles.badgesRow}>
                  <View style={styles.deafBadge}>
                    <Text style={styles.deafBadgeText}>🧏 Surda</Text>
                  </View>
                  <View style={styles.librasBadge}>
                    <Text style={styles.librasBadgeText}>🤟 Usuária de Libras</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.subDivider} />

            {/* Grid de Dados Vitais */}
            <View style={styles.vitalsGrid}>
              <View style={styles.vitalBox}>
                <Text style={styles.vitalLabel}>Tipo Sanguíneo</Text>
                <Text style={styles.vitalValueBlood}>O+ (Positivo)</Text>
              </View>

              <View style={styles.vitalBox}>
                <Text style={styles.vitalLabel}>Alergias Conhecidas</Text>
                <Text style={styles.vitalValue}>Penicilina, Dipirona</Text>
              </View>
            </View>

            <View style={styles.vitalFullBox}>
              <Text style={styles.vitalLabel}>Condições Crônicas</Text>
              <Text style={styles.vitalValue}>Asma leve compensada (Uso eventual de broncodilatador)</Text>
            </View>

            <View style={styles.vitalFullBox}>
              <Text style={styles.vitalLabel}>Medicamentos em Uso Contínuo</Text>
              <Text style={styles.vitalValue}>Nenhum de uso diário obrigatório</Text>
            </View>
          </View>
        </View>

        {/* Bloco 3: Contatos de Emergência */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>CONTATOS DE EMERGÊNCIA</Text>
          <Text style={styles.sectionHelp}>
            Recebem SMS imediato com link do mapa e alerta de socorro
          </Text>

          <View style={styles.contactItem}>
            <View style={styles.contactIconCircle}>
              <Text style={styles.contactIcon}>👤</Text>
            </View>
            <View style={styles.contactInfoCol}>
              <Text style={styles.contactName}>Lucas Silva (Irmão)</Text>
              <Text style={styles.contactPhone}>(11) 98765-4321</Text>
              <Text style={styles.smsNotice}>✓ Notificação por SMS automático com link GPS</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIconCircle}>
              <Text style={styles.contactIcon}>👩</Text>
            </View>
            <View style={styles.contactInfoCol}>
              <Text style={styles.contactName}>Maria Helena (Mãe)</Text>
              <Text style={styles.contactPhone}>(11) 99123-4567</Text>
              <Text style={styles.smsNotice}>✓ Notificação por SMS automático com link GPS</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.addContactBtn}>
            <Text style={styles.addContactBtnText}>+ Adicionar Novo Contato de Confiança</Text>
          </TouchableOpacity>
        </View>

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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  headerSub: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
    letterSpacing: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  encryptedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    marginBottom: 16,
  },
  encryptedIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  encryptedTextBox: {
    flex: 1,
  },
  encryptedTitle: {
    color: colors.stable,
    fontSize: 14,
    fontWeight: '800',
  },
  encryptedDesc: {
    color: colors.textPrimary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionCardTitle: {
    ...typography.micro,
    color: colors.textPrimary,
    fontSize: 13,
    letterSpacing: 0.8,
  },
  sectionHelp: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 14,
  },
  optionsList: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextCol: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  optionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  subDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 10,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 8,
  },
  radioCardActive: {
    borderColor: colors.danger,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  radioDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },
  radioTextCol: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  radioDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  morseBox: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  morseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  morseTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  morseDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  testVibrationBtn: {
    marginTop: 10,
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
  },
  testVibrationBtnActive: {
    backgroundColor: colors.urgent,
    borderColor: '#EA580C',
  },
  testVibrationBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  medicalIdCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  userDataCol: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userDoc: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  deafBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  deafBadgeText: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '800',
  },
  librasBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  librasBadgeText: {
    color: '#C084FC',
    fontSize: 10,
    fontWeight: '800',
  },
  vitalsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  vitalBox: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
  },
  vitalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  vitalValueBlood: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.danger,
    marginTop: 2,
  },
  vitalValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 2,
  },
  vitalFullBox: {
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 10,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactIcon: {
    fontSize: 20,
  },
  contactInfoCol: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  contactPhone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  smsNotice: {
    fontSize: 10,
    color: colors.stable,
    marginTop: 3,
    fontWeight: '600',
  },
  addContactBtn: {
    borderWidth: 1.5,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addContactBtnText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PerfilScreen;
