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
import { useSettingsViewModel } from '../viewmodels/SettingsViewModel';
import { useSettingsStore } from '../store/settingsStore';
import { colors } from '../constants/colors';
import { spacing, fontSize, fontWeight, borderRadius } from '../constants/spacing';
import Button from '../components/Button';
// НАСТРОЙКИ
const SettingsScreen = () => {
  const settingsStore = useSettingsStore();
  const { currency, appStats, handleSetCurrency, handleClearAll } =
    useSettingsViewModel();
//валюты
  const CURRENCIES = ['₽', '$', '€', '¥', 'С'];

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
//всплывающее окно предупреждения
  const handleClearAllConfirm = () => {
    Alert.alert(
      '⚠️ Удалить все данные?',
      'Это действие нельзя отменить. Все ваши транзакции будут удалены.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить все',
          style: 'destructive',
          onPress: async () => {
            const result = await handleClearAll();
            if (result.success) {
              Alert.alert('Все данные удалены');
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
          <Text style={{ marginTop: spacing.lg }}>Загрузка настроек...</Text>
        </View>
      </SafeAreaView>
    );
  }
//валюты
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💱 Выбор валюты</Text>
          <Text style={styles.subtitle}>
            Текущая валюта: <Text style={{ fontWeight: fontWeight.bold }}>{currency}</Text>
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
          <Text style={styles.sectionTitle}>О приложении</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Версия</Text>
            <Text style={styles.infoValue}>1.0</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Всего транзакций</Text>
            <Text style={styles.infoValue}>{appStats.totalTransactions}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Хранилище</Text>
            <Text style={styles.infoValue}>Облако</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Система</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Тема</Text>
            <Text style={styles.infoValue}>Светлая</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Сброс</Text>
          <View style={styles.dangerButton}>
            <Button
              title="Удалить все данные"
              variant="danger"
              onPress={handleClearAllConfirm}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//главные надписи в настройки

export default SettingsScreen;