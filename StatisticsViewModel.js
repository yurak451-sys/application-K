import { useTransactionStore } from './transactionStore';
import { useSettingsStore } from './settingsStore';

export const useStatisticsViewModel = () => {
  const { getBalance, getStatsByCategory } = useTransactionStore();
  const { currency } = useSettingsStore();

  const balance = getBalance();
  const categoryStats = getStatsByCategory();

  const getIncomeVsExpense = () => {
    return {
      income: balance.income,
      expense: balance.expense,
      incomePct:
        balance.income + balance.expense > 0
          ? Math.round(
              (balance.income / (balance.income + balance.expense)) * 100
            )
          : 0,
      expensePct:
        balance.income + balance.expense > 0
          ? Math.round(
              (balance.expense / (balance.income + balance.expense)) * 100
            )
          : 0,
    };
  };

  return {
    balance,
    currency,
    categoryStats,
    getIncomeVsExpense,
  };
};
