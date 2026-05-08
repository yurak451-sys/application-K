import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import storageService from '../utils/storage';
import { getMonthKey } from '../utils/formatters';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initializedRef = useRef(false); 

  // инициализация
  useEffect(() => {
    const loadData = async () => {
      if (initializedRef.current) return; 
      
      try {
        initializedRef.current = true;
        setLoading(true);
        setError(null);
        const data = await storageService.getTransactions();
        setTransactions(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error initializing transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); 
  // добав транзак
  const addTransaction = useCallback(async (transactionData) => {
    try {
      setError(null);
      const newTransaction = await storageService.addTransaction({
        ...transactionData,
        date: new Date().toISOString(),
      });
      setTransactions(prev => [...prev, newTransaction]);
      return { success: true, data: newTransaction };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при добавлении';
      setError(errorMsg);
      console.error('Error adding transaction:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Удаление транз
  const deleteTransaction = useCallback(async (id) => {
    try {
      setError(null);
      const success = await storageService.deleteTransaction(id);
      if (success) {
        setTransactions(prev => prev.filter(t => t.id !== id));
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при удалении';
      setError(errorMsg);
      console.error('Error deleting transaction:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Обнова транз
  const updateTransaction = useCallback(async (id, updates) => {
    try {
      setError(null);
      const updated = await storageService.updateTransaction(id, updates);
      if (updated) {
        setTransactions(prev =>
          prev.map(t => (t.id === id ? updated : t))
        );
        return { success: true, data: updated };
      }
      return { success: false };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при обновлении';
      setError(errorMsg);
      console.error('Error updating transaction:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Очистить все
  const clearAllTransactions = useCallback(async () => {
    try {
      setError(null);
      const success = await storageService.clearTransactions();
      if (success) {
        setTransactions([]);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при очистке';
      setError(errorMsg);
      console.error('Error clearing transactions:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Расчеты
  const getBalance = useCallback(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const getStatsByCategory = useCallback(() => {
    const stats = {};
    transactions.forEach(t => {
      const key = t.category;
      if (!stats[key]) {
        stats[key] = {
          amount: 0,
          count: 0,
          type: t.type,
          categoryName: t.categoryName,
        };
      }
      stats[key].amount += parseFloat(t.amount || 0);
      stats[key].count += 1;
    });

    return Object.entries(stats)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const getRecentTransactions = useCallback((limit = 10) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }, [transactions]);

  const value = {
    // State
    transactions,
    loading,
    error,

    // Methods
    addTransaction,
    deleteTransaction,
    updateTransaction,
    clearAllTransactions,

    // Selectors
    getBalance,
    getStatsByCategory,
    getRecentTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionStore = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionStore must be used within TransactionProvider');
  }
  return context;
};