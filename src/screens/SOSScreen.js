import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import Header from '../components/Header';
import EmergencyButton from '../components/EmergencyButton';
import EmergencyCard from '../components/EmergencyCard';

export const SOSScreen = ({ navigation }) => {
  const handleGeneralSOS = () => {
    // Alerta de confirmação rápida ou navegação direta para Atendimento
    if (navigation) {
      navigation.navigate('Atendimento');
    }
  };

  const handleSpecializedSOS = (serviceNumber, serviceName) => {
    if (navigation) {
      navigation.navigate('Triagem', { preselected: serviceNumber });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="SOS Acessível" showGps={true} gpsAccuracy="±3m" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner de Atalho Físico Silencioso */}
        <View style={styles.shortcutBanner}>
          <View style={styles.shortcutIconBox}>
            <Text style={styles.shortcutIcon}>⚡</Text>
          </View>
          <View style={styles.shortcutTextBox}>
            <Text style={styles.shortcutTag}>ATALHO FÍSICO SILENCIOSO</Text>
            <Text style={styles.shortcutText}>
              Pressione o botão liga/desliga 3 vezes para disparar o SOS mudo com geolocalização.
            </Text>
          </View>
        </View>

        {/* Botão Principal Circular com Anéis Pulsantes */}
        <EmergencyButton onPress={handleGeneralSOS} />

        {/* Seção Disparo Direto Especializado */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DISPARO DIRETO ESPECIALIZADO</Text>
          <Text style={styles.sectionSubtitle}>
            Toque único para contatar o serviço adequado
          </Text>
        </View>

        {/* Grid 2x2 de Serviços Oficiais */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <EmergencyCard
                number="190"
                title="Polícia Militar"
                subtitle="Perigo, Invasão, Roubo"
                iconSymbol="🛡️"
                accentColor="#3B82F6"
                onPress={() => handleSpecializedSOS('190', 'Polícia Militar')}
              />
            </View>
            <View style={styles.gridItem}>
              <EmergencyCard
                number="192"
                title="SAMU Médico"
                subtitle="Parada, Queda, AVC"
                iconSymbol="🩺"
                accentColor="#EF4444"
                onPress={() => handleSpecializedSOS('192', 'SAMU Médico')}
              />
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <EmergencyCard
                number="193"
                title="Bombeiros"
                subtitle="Fogo, Resgate, Preso"
                iconSymbol="🔥"
                accentColor="#F97316"
                onPress={() => handleSpecializedSOS('193', 'Bombeiros')}
              />
            </View>
            <View style={styles.gridItem}>
              <EmergencyCard
                number="180"
                title="Central Direitos"
                subtitle="Violência e Amparo"
                iconSymbol="⚖️"
                accentColor="#8B5CF6"
                onPress={() => handleSpecializedSOS('180', 'Central Direitos')}
              />
            </View>
          </View>
        </View>

        {/* Rodapé: Localização Confirmada */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationPin}>
              <Text style={styles.pinIcon}>📍</Text>
            </View>
            <View style={styles.locationTitleBox}>
              <Text style={styles.locationLabel}>LOCALIZAÇÃO CONFIRMADA</Text>
              <Text style={styles.locationAddress}>
                Av. Paulista, 1578 - Bela Vista, São Paulo - SP
              </Text>
            </View>
            <View style={styles.accuracyTag}>
              <Text style={styles.accuracyText}>Alta Precisão</Text>
            </View>
          </View>
          <View style={styles.coordsRow}>
            <Text style={styles.coordsText}>Lat: -23.5615° | Long: -46.6559°</Text>
            <Text style={styles.silentSendNotice}>Enviado automaticamente no alerta</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  shortcutBanner: {
    marginTop: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  shortcutIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shortcutIcon: {
    fontSize: 20,
  },
  shortcutTextBox: {
    flex: 1,
  },
  shortcutTag: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.urgent,
    letterSpacing: 0.8,
  },
  shortcutText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginTop: 2,
    lineHeight: 16,
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  gridContainer: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
  },
  locationCard: {
    backgroundColor: colors.cardElevated,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pinIcon: {
    fontSize: 18,
  },
  locationTitleBox: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.stable,
    letterSpacing: 0.8,
  },
  locationAddress: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    fontSize: 14,
    marginTop: 2,
  },
  accuracyTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  accuracyText: {
    fontSize: 10,
    color: colors.stable,
    fontWeight: '700',
  },
  coordsRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coordsText: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: 'monospace',
  },
  silentSendNotice: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default SOSScreen;
