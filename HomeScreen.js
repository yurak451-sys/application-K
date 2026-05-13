import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useHomeViewModel } from './HomeViewModel';
import { useTransactionStore } from './transactionStore';
import { colors } from './colors';
import { spacing, fontSize, fontWeight } from './spacing';
import TransactionItem from './TransactionItem';
import StatCard from './StatCard';
import { PlusIcon, WalletIcon } from './icons';

const HomeScreen = ({ onNavigate }) => {
  const transactionStore = useTransactionStore();
  
  const {
    transactions,
    balance,
    currency,
    loading,
    handleDeleteTransaction,
  } = useHomeViewModel();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgLight,
    },
    header: {
      padding: spacing.lg,
      backgroundColor: colors.bgLight,
    },
    balanceCard: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: spacing.xl,
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    balanceTitle: {
      fontSize: 20,
      color: colors.white,
      marginBottom: spacing.md,
      opacity: 0.9,
    },
    balanceAmount: {
      fontSize: 32,
      fontWeight: fontWeight.bold,
      color: colors.white,
    },
    statsContainer: {
      gap: spacing.md,
    },
    list: {
      flex: 1,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyIcon: {
      marginBottom: spacing.lg,
    },
    emptyText: {
      fontSize: fontSize.title,
      fontWeight: fontWeight.semibold,
      color: colors.gray,
      marginTop: spacing.lg,
    },
    emptySubText: {
      fontSize: fontSize.body,
      color: colors.grayLight,
      marginTop: spacing.sm,
    },
    fab: {
      position: 'absolute',
      bottom: 90,
      right: spacing.lg,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: spacing.lg }}>Загрузка данных...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            currency={currency}
            onDelete={() => handleDeleteTransaction(item.id)}
            onPress={() => {}}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Ваш баланс</Text>
              <Text
                style={[
                  styles.balanceAmount,
                  {
                    color:
                      balance.balance >= 0 ? colors.success : colors.danger,
                  },
                ]}
              >
                {balance.balance.toFixed(2)} {currency}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <StatCard
                title="Доход"
                amount={balance.income.toFixed(2)}
                currency={currency}
                color={colors.success}
              />
              <StatCard
                title="Расход"
                amount={balance.expense.toFixed(2)}
                currency={currency}
                color={colors.danger}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <WalletIcon size={64} color={colors.grayBorder} />
            </View>
            <Text style={styles.emptyText}>Пока нет транзакций</Text>
            <Text style={styles.emptySubText}>
              Добавьте первую операцию
            </Text>
          </View>
        }
        scrollEnabled={true}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => onNavigate('add')}
        activeOpacity={0.7}
      >
        <PlusIcon size={28} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
