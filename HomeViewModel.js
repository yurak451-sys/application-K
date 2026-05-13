import { useTransactionStore } from './transactionStore';
import { useSettingsStore } from './settingsStore';

export const useHomeViewModel = () => {
  const {
    transactions,
    loading,
    getBalance,
    getRecentTransactions,
    deleteTransaction,
  } = useTransactionStore();

  const { currency } = useSettingsStore();

  const balance = getBalance();
  const recentTransactions = getRecentTransactions(20);

  const handleDeleteTransaction = async (id) => {
    const result = await deleteTransaction(id);
    return result;
  };

  const getSortedTransactions = () => {
    return [...recentTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  };

  return {
    transactions: getSortedTransactions(),
    balance,
    currency,
    loading,
    handleDeleteTransaction,
  };
};
