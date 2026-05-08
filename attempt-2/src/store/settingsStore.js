import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import storageService from '../utils/storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState('₽');
  const [theme, setThemeState] = useState('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initializedRef = useRef(false);

  // инициализация
  useEffect(() => {
    const initializeSettings = async () => {
      if (initializedRef.current) return;
      
      try {
        initializedRef.current = true;
        setLoading(true);
        setError(null);
        
        const curr = await storageService.getCurrency();
        const th = await storageService.getTheme();
        
        setCurrencyState(curr || '₽');
        setThemeState(th || 'light');
      } catch (err) {
        setError(err.message);
        console.error('Error initializing settings:', err);
        setCurrencyState('₽');
        setThemeState('light');
      } finally {
        setLoading(false);
      }
    };

    initializeSettings();
  }, []);

  // валюта
  const setCurrency = useCallback(async (newCurrency) => {
    try {
      setError(null);
      const success = await storageService.setCurrency(newCurrency);
      if (success) {
        setCurrencyState(newCurrency);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при установке валюты';
      setError(errorMsg);
      console.error('Error setting currency:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  // Установить тему
  const setTheme = useCallback(async (newTheme) => {
    try {
      setError(null);
      const success = await storageService.setTheme(newTheme);
      if (success) {
        setThemeState(newTheme);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      const errorMsg = err.message || 'Ошибка при установке темы';
      setError(errorMsg);
      console.error('Error setting theme:', err);
      return { success: false, error: errorMsg };
    }
  }, []);

  const value = {
    currency,
    theme,
    loading,
    error,

    setCurrency,
    setTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsStore = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsStore must be used within SettingsProvider');
  }
  return context;
};