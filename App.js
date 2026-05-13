import React, { useState } from 'react';
import { View } from 'react-native';
import { TransactionProvider } from './transactionStore';
import { SettingsProvider } from './settingsStore';
import { colors } from './colors';
import HomeScreen from './HomeScreen';
import AddTransactionScreen from './AddTransactionScreen';
import StatisticsScreen from './StatisticsScreen';
import SettingsScreen from './SettingsScreen';
import BottomNav from './BottomNav';

// пакеты

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
