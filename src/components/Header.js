import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const Header = ({ title = 'SOS Acessível', showGps = true, gpsAccuracy = '±3m' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.subTitle}>SISTEMA DE EMERGÊNCIA SILENCIOSO</Text>
      </View>

      {showGps && (
        <View 
          style={styles.gpsBadge} 
          accessible={true}
          accessibilityLabel={`Status do satélite: GPS Ativo com precisão de ${gpsAccuracy}`}
        >
          <View style={styles.gpsDot} />
          <Text style={styles.gpsText}>GPS Ativo: {gpsAccuracy}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subTitle: {
    ...typography.micro,
    color: colors.textSecondary,
    marginTop: 2,
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  gpsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.stable,
    marginRight: 6,
  },
  gpsText: {
    ...typography.caption,
    color: colors.stable,
    fontWeight: '700',
  },
});

export default Header;
