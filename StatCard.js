import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, borderRadius, fontSize, fontWeight } from './spacing';

const StatCard = ({
  title,
  amount,
  currency = '₽',
  color = colors.primary,
  icon = null,
  subtitle = null,
}) => {
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: color,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    icon: {
      marginRight: spacing.md,
      width: 24,
      height: 24,
    },
    title: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.semibold,
      color: colors.gray,
    },
    amount: {
      fontSize: fontSize.large,
      fontWeight: fontWeight.bold,
      color: color,
      marginBottom: spacing.sm,
    },
    currency: {
      fontSize: fontSize.body,
      color: color,
      marginLeft: spacing.sm,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    subtitle: {
      fontSize: fontSize.small,
      color: colors.grayLight,
      marginTop: spacing.sm,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.currency}>{currency}</Text>
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default StatCard;
