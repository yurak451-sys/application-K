import React, { useState } from 'react';
import { View } from 'react-native';
import { TransactionProvider } from './src/store/transactionStore';
import { SettingsProvider } from './src/store/settingsStore';
import { colors } from './src/constants/colors';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BottomNav from './src/components/BottomNav';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'add':
        return <AddTransactionScreen onNavigate={setCurrentScreen} />;
      case 'statistics':
        return <StatisticsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgLight }}>
      {renderScreen()}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </View>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </TransactionProvider>
  );
}