import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, fontSize, fontWeight } from './spacing';
import { DeleteIcon } from './icons';
import { formatDate } from './formatters';

const TransactionItem = ({
  transaction,
  currency = '₽',
  onDelete,
  onPress,
}) => {
  const isIncome = transaction.type === 'income';
  const sign = isIncome ? '+' : '-';
  const textColor = isIncome ? colors.success : colors.danger;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.grayBorder,
      backgroundColor: colors.white,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      fontSize: 32,
      marginRight: spacing.lg,
    },
    content: {
      flex: 1,
    },
    category: {
      fontSize: fontSize.body,
      fontWeight: fontWeight.semibold,
      color: colors.black80,
      marginBottom: spacing.sm,
    },
    date: {
      fontSize: fontSize.small,
      color: colors.grayLight,
    },
    right: {
      alignItems: 'flex-end',
      marginLeft: spacing.lg,
    },
    amount: {
      fontSize: fontSize.title,
      fontWeight: fontWeight.bold,
      color: textColor,
      marginBottom: spacing.sm,
    },
    deleteBtn: {
      padding: spacing.sm,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.left}>
        <Text style={styles.icon}>📦</Text>
        <View style={styles.content}>
          <Text style={styles.category}>{transaction.categoryName}</Text>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>
          {sign}
          {transaction.amount} {currency}
        </Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <DeleteIcon size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;
