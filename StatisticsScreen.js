import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useStatisticsViewModel } from './StatisticsViewModel';
import { colors } from './colors';
import { spacing, fontSize, fontWeight } from './spacing';
import StatCard from './StatCard';

const StatisticsScreen = () => {
  const {
    balance,
    currency,
    categoryStats,
  } = useStatisticsViewModel();

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
    statRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    statHalf: {
      flex: 1,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      marginBottom: spacing.md,
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    categoryIcon: {
      fontSize: 24,
      marginRight: spacing.md,
    },
    categoryName: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.semibold,
      color: colors.black80,
    },
    categoryAmount: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.bold,
    },
    emptyText: {
      fontSize: fontSize.body,
      color: colors.gray,
      textAlign: 'center',
      paddingVertical: spacing.xl,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Общая статистика</Text>

          <StatCard
            title="Общий баланс"
            amount={balance.balance.toFixed(2)}
            currency={currency}
            color={
              balance.balance >= 0 ? colors.success : colors.danger
            }
          />

          <View style={styles.statRow}>
            <View style={styles.statHalf}>
              <StatCard
                title="Доход"
                amount={balance.income.toFixed(2)}
                currency={currency}
                color={colors.success}
              />
            </View>
            <View style={styles.statHalf}>
              <StatCard
                title="Расход"
                amount={balance.expense.toFixed(2)}
                currency={currency}
                color={colors.danger}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 По категориям</Text>

          {categoryStats.length === 0 ? (
            <Text style={styles.emptyText}>Нет данных</Text>
          ) : (
            categoryStats.map((stat, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <Text style={styles.categoryIcon}>📦</Text>
                  <Text style={styles.categoryName}>{stat.categoryName}</Text>
                </View>
                <Text
                  style={[
                    styles.categoryAmount,
                    {
                      color:
                        stat.type === 'income'
                          ? colors.success
                          : colors.danger,
                    },
                  ]}
                >
                  {stat.amount.toFixed(2)} {currency}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;
