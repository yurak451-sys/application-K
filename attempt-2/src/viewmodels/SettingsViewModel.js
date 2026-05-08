import { useTransactionStore } from '../store/transactionStore';
import { useSettingsStore } from '../store/settingsStore';

export const useSettingsViewModel = () => {
  const transactionStore = useTransactionStore();
  const settingsStore = useSettingsStore();

  const handleSetCurrency = async (newCurrency) => {
    const result = await settingsStore.setCurrency(newCurrency);
    return result;
  };

  const handleClearAll = async () => {
    const result = await transactionStore.clearAllTransactions();
    return result;
  };

  const getAppStats = () => {
    return {
      totalTransactions: transactionStore.transactions.length,
      storageType: 'AsyncStorage',
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
    };
  };

  return {
    currency: settingsStore.currency,
    appStats: getAppStats(),
    handleSetCurrency,
    handleClearAll,
  };
};