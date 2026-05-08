import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight, shadowStyle, shadowStyleLarge } from '../constants/spacing';

export const globalStyles = StyleSheet.create({
  //контейнеры
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },

  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // текст
  textSmall: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.normal,
    color: colors.gray,
  },

  textBody: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.normal,
    color: colors.black80,
  },

  textTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.semibold,
    color: colors.black80,
  },

  textHeading: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.black80,
  },

  // кнопки
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadowStyle,
  },

  buttonSecondary: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },

  buttonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.white,
  },

  // карточки
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadowStyle,
  },

  cardLarge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadowStyleLarge,
  },

  // отступы
  p: spacing.lg,
  px: spacing.lg,
  py: spacing.lg,

  // скругления
  rounded: borderRadius.md,
  roundedLg: borderRadius.lg,
  roundedFull: borderRadius.full,

  // тень
  shadow: shadowStyle,
  shadowLarge: shadowStyleLarge,
});