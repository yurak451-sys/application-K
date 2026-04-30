import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#000000',
  primaryDark: '#004fa3',
  success: '#4CAF50',
  successLight: '#8BC34A',
  danger: '#F44336',
  warning: '#FF9800',
  white: '#fff',
  black: '#000',
  black80: '#333',
  gray: '#666',
  grayLight: '#999',
  grayBorder: '#CD853F',
  bgLight: '#FFDEAD',
  bgLightBlue: '#f0f7ff',
};
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 30,
  xxxl: 40,
};
export const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 18, fontWeight: '700', lineHeight: 26 },
  h4: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400', lineHeight: 18 },
  tiny: { fontSize: 11, fontWeight: '400', lineHeight: 16 },
};
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const styles = StyleSheet.create({
  // осн конт
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },

  scrollView: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
  },
  //баланс
  header: {
    padding: spacing.lg,
    backgroundColor: colors.bgLight,
  },

  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceTitle: {
    ...typography.small,
    color: colors.white,
    marginBottom: spacing.md,
    opacity: 0.9,
  },
  balanceAmount: {
    ...typography.h1,
    color: colors.white,
  },
  // карточки статистики
  statCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    borderLeftWidth: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statIcon: {
    marginRight: spacing.md,
  },
  statTitle: {
    ...typography.small,
    color: colors.gray,
    fontWeight: '600',
  },
  statAmount: {
    ...typography.h2,
  },
  //список транзак
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorder,
    backgroundColor: colors.white,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    marginRight: spacing.lg,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transactionContent: {
    flex: 1,
  },

  transactionCategory: {
    ...typography.h4,
    color: colors.black80,
    marginBottom: spacing.sm,
  },

  transactionDate: {
    ...typography.small,
    color: colors.grayLight,
  },

  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionAmount: {
    ...typography.h4,
    fontWeight: '700',
    marginRight: spacing.md,
  },

  transactionDelete: {
    padding: spacing.sm,
  },

    //пустота
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  emptyIcon: {
    marginBottom: spacing.lg,
  },

  emptyText: {
    ...typography.h4,
    color: colors.gray,
    marginTop: spacing.lg,
  },

  emptySubText: {
    ...typography.small,
    color: colors.grayLight,
    marginTop: spacing.sm,
  },
  
    //кнопка для доваб транз
  fab: {
    position: 'absolute',
    bottom: 80,
    right: spacing.lg,
    width: 96,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  //добав. транзак
  section: {
    padding: spacing.lg,
  },

  sectionTitle: {
    ...typography.h3,
    color: colors.black80,
    marginBottom: spacing.md,
  },

  sectionSubtitle: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.lg,
  },

  label: {
    ...typography.h4,
    color: colors.black80,
    marginBottom: spacing.md,
  },

  // выбор типа
  typeButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
    typeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  typeButtonText: {
    ...typography.h4,
    fontWeight: '600',
    color: colors.grayLight,
  },

  typeButtonTextActive: {
    color: colors.white,
  },

 //ввод в поле
  input: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    ...typography.h4,
    color: colors.black80,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.grayBorder,
  },

  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 80,
  },

  // набор категории
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },

  categoryItem: {
    width: '31%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.grayBorder,
  },

  categoryItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.bgLightBlue,
  },

  categoryIcon: {
    marginBottom: spacing.sm,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryName: {
    ...typography.small,
    color: colors.gray,
    fontWeight: '500',
    textAlign: 'center',
  },

    //кнопки
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },

  addButtonText: {
    color: colors.white,
    ...typography.h4,
    fontWeight: '600',
  },

  backButton: {
    textAlign: 'center',
    color: colors.primary,
    ...typography.h4,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  // статистика
  categoryStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },

  categoryStatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  categoryStatIcon: {
    marginRight: spacing.md,
    width: 24,
    height: 24,
  },

  categoryStatName: {
    flex: 1,
    ...typography.body,
    fontWeight: '600',
    color: colors.black80,
  },

  categoryStatAmount: {
    ...typography.body,
    fontWeight: '700',
    marginLeft: spacing.md,
  },

  // настройки
  settingLabel: {
    ...typography.body,
    color: colors.gray,
    marginBottom: spacing.md,
  },

  //валюта
  currencyButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  currencyButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grayBorder,
    alignItems: 'center',
  },

  currencyButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  currencyButtonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.gray,
  },

  currencyButtonTextActive: {
    color: colors.white,
  },
    //инфа

  aboutItem: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutLabel: {
    ...typography.body,
    color: colors.gray,
  },

  aboutValue: {
    ...typography.body,
    fontWeight: '600',
    color: colors.black80,
  },

  // удаление транзакции
  dangerButton: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },

  dangerButtonText: {
    color: colors.white,
    ...typography.h4,
    fontWeight: '600',
  },

  dangerIcon: {
    width: 20,
    height: 20,
  },

  //навигац внизу
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.grayBorder,
    backgroundColor: colors.white,
  },

  navButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },

  navButtonActive: {
    borderTopColor: colors.primary,
  },

  navButtonText: {
    ...typography.small,
    color: colors.grayLight,
  },

  navButtonTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },

  navIcon: {
    width: 24,
    height: 24,
    marginBottom: spacing.xs,
  },

  navIconContainer: {
    alignItems: 'center',
  },

  //вспомогательное
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
