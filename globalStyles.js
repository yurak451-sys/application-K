import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from './spacing';

export const globalStyles = StyleSheet.create({
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

  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
});
