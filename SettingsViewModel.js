import { useTransactionStore } from './transactionStore';
import { useSettingsStore } from './settingsStore';

export const useSettingsViewModel = () => {
  const { transactions, clearAllTransactions } = useTransactionStore();
  const { currency, setCurrency } = useSettingsStore();

  const handleSetCurrency = async (newCurrency) => {
    const result = await setCurrency(newCurrency);
    return result;
  };

  const handleClearAll = async () => {
    const result = await clearAllTransactions();
    return result;
  };

  const getAppStats = () => {
    return {
      totalTransactions: transactions.length,
      storageType: 'Cloud',
      version: '1.0',
      lastUpdated: new Date().toISOString(),
    };
  };

  return {
    currency,
    appStats: getAppStats(),
    handleSetCurrency,
    handleClearAll,
  };
};
