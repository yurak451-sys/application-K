import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSettingsViewModel } from './SettingsViewModel';
import { useSettingsStore } from './settingsStore';
import { colors } from './colors';
import { spacing, fontSize, fontWeight, borderRadius } from './spacing';
import { strings } from './strings';
import Button from './Button';

// разная валюта  

const SettingsScreen = () => {
  const settingsStore = useSettingsStore();
  const { currency, appStats, handleSetCurrency, handleClearAll } =
    useSettingsViewModel();

  const CURRENCIES = ['₽', '$', '€', '¥', 'C'];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgLight,
    },
    section: {
      padding: spacing.lg,
    },
    sectionTitle: {
      fontSize: fontSize.heading,
      fontWeight: fontWeight.bold,
      color: colors.black80,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: fontSize.body,
      color: colors.gray,
      marginBottom: spacing.lg,
    },
    currencyButtons: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    infoItem: {
      backgroundColor: colors.white,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
      borderRadius: borderRadius.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: fontSize.body,
      color: colors.gray,
    },
    infoValue: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.semibold,
      color: colors.black80,
    },
    dangerButton: {
      marginBottom: spacing.xxxl,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const handleClearAllConfirm = () => {
    Alert.alert(
      strings.settings.deleteAllTitle,
      strings.settings.deleteAllMessage,
      [
        { text: strings.settings.cancel, style: 'cancel' },
        {
          text: strings.settings.delete,
          style: 'destructive',
          onPress: async () => {
            const result = await handleClearAll();
            if (result.success) {
              Alert.alert(
                strings.settings.success,
                strings.settings.successMessage
              );
            }
          },
        },
      ]
    );
  };

  if (settingsStore.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: spacing.lg }}>
            {strings.settings.loading}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.settings.currencySection}
          </Text>
          <Text style={styles.subtitle}>
            {strings.settings.currentCurrency}{' '}
            <Text style={{ fontWeight: fontWeight.bold }}>{currency}</Text>
          </Text>

          <View style={styles.currencyButtons}>
            {CURRENCIES.map(curr => (
              <Button
                key={curr}
                title={curr}
                variant={currency === curr ? 'primary' : 'secondary'}
                size="small"
                onPress={() => handleSetCurrency(curr)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.settings.appInfoSection}
          </Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {strings.settings.version}
            </Text>
            <Text style={styles.infoValue}>{appStats.version}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {strings.settings.totalTransactions}
            </Text>
            <Text style={styles.infoValue}>
              {appStats.totalTransactions}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {strings.settings.storageType}
            </Text>
            <Text style={styles.infoValue}>
              {appStats.storageType}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.settings.systemSection}
          </Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>
              {strings.settings.theme}
            </Text>
            <Text style={styles.infoValue}>{settingsStore.theme}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {strings.settings.dangerZoneSection}
          </Text>
          <View style={styles.dangerButton}>
            <Button
              title={strings.settings.deleteAllData}
              variant="danger"
              onPress={handleClearAllConfirm}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
