import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Vibration, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export const EmergencyButton = ({ onPress, size = 190 }) => {
  const pulseAnim1 = useRef(new Animated.Value(1)).current;
  const pulseAnim2 = useRef(new Animated.Value(1)).current;
  const pulseOpacity1 = useRef(new Animated.Value(0.6)).current;
  const pulseOpacity2 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Animação contínua dos anéis concêntricos pulsantes
    const createPulse = (scaleAnim, opacityAnim, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1.45,
              duration: 2200,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 2200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.6,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    const pulse1 = createPulse(pulseAnim1, pulseOpacity1, 0);
    const pulse2 = createPulse(pulseAnim2, pulseOpacity2, 900);

    pulse1.start();
    pulse2.start();

    return () => {
      pulse1.stop();
      pulse2.stop();
    };
  }, [pulseAnim1, pulseAnim2, pulseOpacity1, pulseOpacity2]);

  const handlePress = () => {
    // Vibração tátil tática: 1 pulso forte para confirmação imediata
    if (Platform.OS !== 'web') {
      try {
        Vibration.vibrate([0, 150, 80, 150]);
      } catch (e) {
        // Ignora em ambientes sem suporte
      }
    }
    if (onPress) onPress();
  };

  return (
    <View style={styles.wrapper}>
      {/* Anel Externo 2 */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: (size * 1.5) / 2,
            transform: [{ scale: pulseAnim2 }],
            opacity: pulseOpacity2,
          },
        ]}
      />

      {/* Anel Externo 1 */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size * 1.25,
            height: size * 1.25,
            borderRadius: (size * 1.25) / 2,
            transform: [{ scale: pulseAnim1 }],
            opacity: pulseOpacity1,
          },
        ]}
      />

      {/* Botão Central de Impacto SOS */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePress}
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Botão SOS Silencioso de Emergência"
        accessibilityHint="Toque para disparar alerta geral de emergência silenciosa com geolocalização"
      >
        <View style={styles.buttonInner}>
          <Text style={styles.sosText}>SOS</Text>
          <Text style={styles.sosSubtext}>SILENCIOSO</Text>
          <View style={styles.instantTag}>
            <Text style={styles.instantTagText}>1 TOQUE</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.safetyHint}>
        🛡️ Protegido contra toque acidental
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    height: 260,
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.danger,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  button: {
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 4,
    borderColor: '#FCA5A5',
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    ...typography.sosLabel,
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
  },
  sosSubtext: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FEE2E2',
    letterSpacing: 2,
    marginTop: 2,
  },
  instantTag: {
    marginTop: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  instantTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  safetyHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default EmergencyButton;
