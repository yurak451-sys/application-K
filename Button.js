import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from './colors';
import { spacing, borderRadius, fontSize, fontWeight } from './spacing';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon = null,
  loading = false,
  style,
  ...props
}) => {
  const variants = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    danger: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
    },
    success: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
  };

  const sizes = {
    small: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      fontSize: fontSize.small,
    },
    medium: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      fontSize: fontSize.body,
    },
    large: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      fontSize: fontSize.title,
    },
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: borderRadius.md,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.md,
      opacity: disabled ? 0.5 : 1,
      ...variants[variant],
      ...sizes[size],
    },
    text: {
      fontWeight: fontWeight.semibold,
      color: variant === 'secondary' ? colors.primary : colors.white,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {icon && <View>{icon}</View>}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
