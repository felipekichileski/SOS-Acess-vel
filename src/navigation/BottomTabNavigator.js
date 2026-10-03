import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

// Mapeamento de abas para React Navigation ou Custom Bottom Bar
export const TAB_CONFIG = [
  {
    name: 'SOS',
    label: 'SOS',
    icon: '🚨',
    badge: null,
  },
  {
    name: 'Triagem',
    label: 'Triagem',
    icon: '📋',
    badge: null,
  },
  {
    name: 'Atendimento',
    label: 'Atendimento',
    icon: '💬',
    badge: '192',
  },
  {
    name: 'Perfil',
    label: 'Perfil',
    icon: '👤',
    badge: null,
  },
];

export const CustomTabBar = ({ currentTab, onSelectTab }) => {
  return (
    <View style={styles.tabContainer} accessibilityRole="tablist">
      {TAB_CONFIG.map((tab) => {
        const isActive = currentTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
            onPress={() => onSelectTab(tab.name)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Aba ${tab.label}`}
          >
            <View style={styles.iconWrapper}>
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              {tab.badge && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </Text>

            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: colors.tabBarBorder,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  tabButtonActive: {},
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -12,
    backgroundColor: colors.danger,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  tabLabelActive: {
    color: colors.tabBarActive,
  },
  tabLabelInactive: {
    color: colors.tabBarInactive,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 24,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.danger,
  },
});

export default CustomTabBar;
