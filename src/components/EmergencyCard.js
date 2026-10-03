import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const EmergencyCard = ({
  number,
  title,
  subtitle,
  iconSymbol,
  accentColor = colors.danger,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.card, { borderColor: colors.cardBorder }]}
      accessibilityRole="button"
      accessibilityLabel={`Emergência ${number}: ${title}. Motivos: ${subtitle}`}
      accessibilityHint="Toque para disparar socorro especializado para esta corporação"
    >
      <View style={styles.headerRow}>
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}25` }]}>
          <Text style={styles.icon}>{iconSymbol}</Text>
        </View>
        <View style={[styles.numberBadge, { backgroundColor: accentColor }]}>
          <Text style={styles.numberText}>{number}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>
        {subtitle}
      </Text>

      <View style={styles.tapIndicator}>
        <Text style={[styles.tapIndicatorText, { color: accentColor }]}>
          Acionamento Direto →
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    minHeight: 142,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  numberBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  tapIndicator: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  tapIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default EmergencyCard;
