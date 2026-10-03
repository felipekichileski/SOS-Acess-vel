import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import { colors } from './src/theme/colors';
import SOSScreen from './src/screens/SOSScreen';
import TriagemScreen from './src/screens/TriagemScreen';
import AtendimentoScreen from './src/screens/AtendimentoScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import CustomTabBar from './src/navigation/BottomTabNavigator';

export default function App() {
  const [currentTab, setCurrentTab] = useState('SOS');
  const [navigationParams, setNavigationParams] = useState({});

  // Mock de objeto navigation compatível com React Navigation
  const navigation = {
    navigate: (screenName, params = {}) => {
      setNavigationParams(params);
      setCurrentTab(screenName);
    },
    goBack: () => {
      setCurrentTab('SOS');
    },
  };

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'SOS':
        return <SOSScreen navigation={navigation} />;
      case 'Triagem':
        return <TriagemScreen navigation={navigation} route={{ params: navigationParams }} />;
      case 'Atendimento':
        return <AtendimentoScreen navigation={navigation} route={{ params: navigationParams }} />;
      case 'Perfil':
        return <PerfilScreen navigation={navigation} />;
      default:
        return <SOSScreen navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      <View style={styles.screenArea}>
        {renderCurrentScreen()}
      </View>
      <CustomTabBar
        currentTab={currentTab}
        onSelectTab={(tabName) => setCurrentTab(tabName)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
