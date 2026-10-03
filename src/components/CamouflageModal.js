import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, StatusBar } from 'react-native';

export const CamouflageModal = ({ visible, onClose }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      setDate(now.toLocaleDateString('pt-BR', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.container}>
        {/* Barra Superior Discreta de Status */}
        <View style={styles.topBar}>
          <Text style={styles.carrierText}>VIVO 5G</Text>
          <View style={styles.rightIcons}>
            <Text style={styles.batteryText}>98% 🔋</Text>
          </View>
        </View>

        {/* Relógio Digital Centralizado Estilo Lockscreen */}
        <View style={styles.clockContainer}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
          <Text style={styles.weatherText}>24°C • Céu Limpo</Text>
        </View>

        {/* Mensagem de Alarme Falso / Inofensivo */}
        <View style={styles.fakeWidget}>
          <Text style={styles.fakeWidgetTitle}>⏰ Alarme programado</Text>
          <Text style={styles.fakeWidgetSub}>Amanhã às 06:30 • Diário</Text>
        </View>

        {/* Botão Secreto de Retorno (Protegido / Discreto na base) */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={onClose}
            style={styles.secretButton}
            accessibilityLabel="Toque duplo para retornar ao atendimento"
          >
            <Text style={styles.secretText}>
              • Toque duas vezes para desbloquear •
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carrierText: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
  },
  batteryText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  clockContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  lockIcon: {
    fontSize: 22,
    marginBottom: 12,
    opacity: 0.8,
  },
  dateText: {
    color: '#E5E5EA',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 76,
    fontWeight: '200',
    letterSpacing: -1,
  },
  weatherText: {
    color: '#8E8E93',
    fontSize: 15,
    marginTop: 8,
  },
  fakeWidget: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 12,
  },
  fakeWidgetTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  fakeWidgetSub: {
    color: '#8E8E93',
    fontSize: 13,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  secretButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: '#1C1C1E',
  },
  secretText: {
    color: '#636366',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default CamouflageModal;
