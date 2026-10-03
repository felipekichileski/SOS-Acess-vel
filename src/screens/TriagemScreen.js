import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const EMERGENCY_TYPES = [
  {
    id: 'saude',
    title: 'Saúde / Ferimentos',
    desc: 'Hemorragia, Desmaio, Dor no peito, Queda grave',
    icon: '🩺',
  },
  {
    id: 'perigo',
    title: 'Perigo / Crime',
    desc: 'Assalto, Ameaça, Invasão, Perseguição',
    icon: '🚨',
  },
  {
    id: 'transito',
    title: 'Acidente de Trânsito',
    desc: 'Colisão com vítimas, Atropelamento',
    icon: '🚗',
  },
  {
    id: 'incendio',
    title: 'Incêndio / Fumaça',
    desc: 'Fogo ativo, Fumaça densa, Vazamento de gás',
    icon: '🔥',
  },
];

const SEVERITIES = [
  { id: 'critico', label: 'Crítico', sub: 'Imediato', color: colors.danger },
  { id: 'urgente', label: 'Urgente', sub: 'Em minutos', color: colors.urgent },
  { id: 'estavel', label: 'Estável', sub: 'Sem risco de vida', color: colors.textSecondary },
];

export const TriagemScreen = ({ navigation, route }) => {
  const initialType = route?.params?.preselected === '190' ? 'perigo' : 'saude';
  const [selectedType, setSelectedType] = useState(initialType);
  const [severity, setSeverity] = useState('critico');

  // Contextos do local (Toggles silenciosos)
  const [contextNoNoise, setContextNoNoise] = useState(true);
  const [contextAlone, setContextAlone] = useState(true);
  const [contextChildren, setContextChildren] = useState(false);
  const [contextArmed, setContextArmed] = useState(false);

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Alerta?',
      'Deseja realmente cancelar este protocolo de emergência?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim, Cancelar', style: 'destructive', onPress: () => navigation?.navigate('SOS') },
      ]
    );
  };

  const handleSend = () => {
    if (navigation) {
      navigation.navigate('Atendimento', {
        type: selectedType,
        severity,
        noNoise: contextNoNoise,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header com Barra de Progresso e Cancelamento */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Detalhes da Ocorrência</Text>
            <View style={styles.stealthBadge}>
              <View style={styles.redDot} />
              <Text style={styles.stealthText}>MODO SILENCIOSO ATIVO</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel="Cancelar SOS"
          >
            <Text style={styles.cancelBtnText}>Cancelar SOS</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
          <Text style={styles.progressLabel}>Etapa 1 de 2: Triagem Silenciosa</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Tipo de Emergência */}
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>1. TIPO DE EMERGÊNCIA</Text>
          <Text style={styles.sectionSub}>Selecione sem precisar digitar nada</Text>

          <View style={styles.typeCardsList}>
            {EMERGENCY_TYPES.map((item) => {
              const isSelected = selectedType === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedType(item.id)}
                  style={[
                    styles.typeCard,
                    isSelected && styles.typeCardSelected,
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={styles.typeCardLeft}>
                    <Text style={styles.typeIcon}>{item.icon}</Text>
                    <View style={styles.typeTextBox}>
                      <Text
                        style={[
                          styles.typeTitle,
                          isSelected && styles.typeTitleSelected,
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text style={styles.typeDesc}>{item.desc}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 2. Gravidade da Situação */}
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>2. GRAVIDADE DA SITUAÇÃO</Text>
          <Text style={styles.sectionSub}>Determina a prioridade do despacho</Text>

          <View style={styles.severityRow}>
            {SEVERITIES.map((item) => {
              const isSelected = severity === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSeverity(item.id)}
                  style={[
                    styles.severityBtn,
                    isSelected && {
                      backgroundColor: item.id === 'critico' ? colors.danger : item.id === 'urgente' ? colors.urgent : '#374151',
                      borderColor: item.color,
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.severityLabel,
                      isSelected ? styles.severityLabelActive : { color: colors.textPrimary },
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={[
                      styles.severitySub,
                      isSelected ? styles.severitySubActive : { color: colors.textSecondary },
                    ]}
                  >
                    {item.sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Contexto do Local */}
        <View style={styles.section}>
          <Text style={styles.sectionHeaderTitle}>3. CONTEXTO DO LOCAL</Text>
          <Text style={styles.sectionSub}>Informações críticas para a equipe tática</Text>

          <View style={styles.togglesCard}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleTextCol}>
                <Text style={[styles.toggleTitle, { color: colors.danger, fontWeight: '700' }]}>
                  🤫 Não posso fazer barulho (Silêncio total)
                </Text>
                <Text style={styles.toggleDesc}>
                  Sirenes serão desligadas e policiais entrarão em silêncio
                </Text>
              </View>
              <Switch
                value={contextNoNoise}
                onValueChange={setContextNoNoise}
                trackColor={{ false: '#374151', true: colors.danger }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>👤 Estou sozinho(a)</Text>
                <Text style={styles.toggleDesc}>Sem acompanhantes ou testemunhas no recinto</Text>
              </View>
              <Switch
                value={contextAlone}
                onValueChange={setContextAlone}
                trackColor={{ false: '#374151', true: colors.urgent }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextCol}>
                <Text style={styles.toggleTitle}>👶 Há crianças no local</Text>
                <Text style={styles.toggleDesc}>Alerta socorristas pediátricos / proteção infantil</Text>
              </View>
              <Switch
                value={contextChildren}
                onValueChange={setContextChildren}
                trackColor={{ false: '#374151', true: colors.urgent }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextCol}>
                <Text style={[styles.toggleTitle, contextArmed && { color: colors.danger }]}>
                  ⚠️ Criminoso armado
                </Text>
                <Text style={styles.toggleDesc}>Presença de arma de fogo ou branca confirmada</Text>
              </View>
              <Switch
                value={contextArmed}
                onValueChange={setContextArmed}
                trackColor={{ false: '#374151', true: colors.danger }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Botão Flutuante (FAB) na Base */}
      <View style={styles.floatingFooter}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSend}
          style={styles.fabButton}
          accessibilityRole="button"
          accessibilityLabel="Enviar Alerta às Autoridades"
        >
          <Text style={styles.fabText}>ENVIAR ALERTA ÀS AUTORIDADES 🚨</Text>
          <Text style={styles.fabSubText}>Despacho tático com telemetria e perfil médico</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  stealthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
    marginRight: 6,
  },
  stealthText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.danger,
    letterSpacing: 0.6,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B5563',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.danger,
  },
  progressLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeaderTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  sectionSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 10,
  },
  typeCardsList: {
    gap: 10,
  },
  typeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
  },
  typeCardSelected: {
    borderColor: colors.danger,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  typeCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  typeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  typeTextBox: {
    flex: 1,
  },
  typeTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  typeTitleSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  typeDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.danger,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },
  severityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  severityBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  severityLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  severityLabelActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  severitySub: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  severitySubActive: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  togglesCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleTextCol: {
    flex: 1,
    marginRight: 12,
  },
  toggleTitle: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  toggleDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  floatingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  fabButton: {
    backgroundColor: colors.danger,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  fabSubText: {
    color: '#FEE2E2',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default TriagemScreen;
