import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, fontSize, fontWeight } from './spacing';
import { HomeIcon, AnalyticsIcon, SettingsIcon } from './icons';

const BottomNav = ({ currentScreen, onNavigate }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: colors.grayBorder,
      backgroundColor: colors.white,
      paddingBottom: 0,
    },
    button: {
      flex: 1,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 3,
      borderTopColor: 'transparent',
    },
    buttonActive: {
      borderTopColor: colors.primary,
    },
    icon: {
      marginBottom: spacing.xs,
      width: 24,
      height: 24,
    },
    text: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.normal,
      color: colors.grayLight,
    },
    textActive: {
      fontWeight: fontWeight.bold,
      color: colors.primary,
    },
  });

  const navItems = [
    { id: 'home', label: 'Главное', icon: HomeIcon },
    { id: 'statistics', label: 'Статистика', icon: AnalyticsIcon },
    { id: 'settings', label: 'Настройки', icon: SettingsIcon },
  ];

  return (
    <View style={styles.container}>
      {navItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.button,
            currentScreen === item.id && styles.buttonActive,
          ]}
          onPress={() => onNavigate(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.icon}>
            <item.icon
              size={24}
              color={
                currentScreen === item.id ? colors.primary : colors.grayLight
              }
            />
          </View>
          <Text
            style={[
              styles.text,
              currentScreen === item.id && styles.textActive,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNav;
