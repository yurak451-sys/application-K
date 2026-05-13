import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTIONS_KEY = '@expense_tracker_transactions';
const CURRENCY_KEY = '@expense_tracker_currency';
const THEME_KEY = '@expense_tracker_theme';

class StorageService {
  async getTransactions() {
    try {
      const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  async saveTransactions(transactions) {
    try {
      await AsyncStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(transactions)
      );
      return true;
    } catch (error) {
      console.error('Error saving transactions:', error);
      return false;
    }
  }

  async addTransaction(transaction) {
    try {
      const transactions = await this.getTransactions();
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      transactions.push(newTransaction);
      await this.saveTransactions(transactions);
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }

  async deleteTransaction(id) {
    try {
      const transactions = await this.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      await this.saveTransactions(filtered);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  }

  async updateTransaction(id, updates) {
    try {
      const transactions = await this.getTransactions();
      const index = transactions.findIndex(t => t.id === id);
      if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updates };
        await this.saveTransactions(transactions);
        return transactions[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  async clearTransactions() {
    try {
      await AsyncStorage.removeItem(TRANSACTIONS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing transactions:', error);
      return false;
    }
  }

  async getCurrency() {
    try {
      const currency = await AsyncStorage.getItem(CURRENCY_KEY);
      return currency || '₽';
    } catch (error) {
      console.error('Error getting currency:', error);
      return '₽';
    }
  }

  async setCurrency(currency) {
    try {
      await AsyncStorage.setItem(CURRENCY_KEY, currency);
      return true;
    } catch (error) {
      console.error('Error setting currency:', error);
      return false;
    }
  }

  async getTheme() {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  }

  async setTheme(theme) {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
      return true;
    } catch (error) {
      console.error('Error setting theme:', error);
      return false;
    }
  }

  async clearAll() {
    try {
      await AsyncStorage.multiRemove([
        TRANSACTIONS_KEY,
        CURRENCY_KEY,
        THEME_KEY,
      ]);
      return true;
    } catch (error) {
      console.error('Error clearing all:', error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
