import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, colors, spacing } from './style';
import {
  FoodIcon,
  TransportIcon,
  EntertainmentIcon,
  UtilitiesIcon,
  HealthIcon,
  EducationIcon,
  ShoppingIcon,
  SalaryIcon,
  BonusIcon,
  FreelanceIcon,
  InvestmentIcon,
  HomeIcon,
  AnalyticsIcon,
  SettingsIcon,
  PlusIcon,
  DeleteIcon,
  WarningIcon,
  WalletIcon,
  CurrencyIcon,
  InfoIcon,
  TrashIcon,
} from './svgIcons';

//контекст
const TransactionContext = createContext();

//категории
const INCOME_CATEGORIES = [
  { id: 1, name: 'Зарплата', icon: SalaryIcon, color: '#4CAF50' },
  { id: 2, name: 'Лотерея', icon: BonusIcon, color: '#8BC34A' },
  { id: 3, name: 'Подарок', icon: FreelanceIcon, color: '#689F38' },
  { id: 4, name: 'Инвестиции', icon: InvestmentIcon, color: '#7CB342' },
  { id: 5, name: 'Другое', icon: SalaryIcon, color: '#9CCC65' },
];

const EXPENSE_CATEGORIES = [
  { id: 1, name: 'Продукты', icon: FoodIcon, color: '#FF9800' },
  { id: 2, name: 'Транспорт', icon: TransportIcon, color: '#FF7043' },
  { id: 3, name: 'Ремонт', icon: EntertainmentIcon, color: '#EC407A' },
  { id: 4, name: 'Развлечения', icon: UtilitiesIcon, color: '#AB47BC' },
  { id: 5, name: 'Медицинская страховка', icon: HealthIcon, color: '#29B6F6' },
  { id: 6, name: 'Учеба', icon: EducationIcon, color: '#5C6BC0' },
  { id: 7, name: 'Шоппинг', icon: ShoppingIcon, color: '#EF5350' },
  { id: 8, name: 'Другое', icon: FoodIcon, color: '#BDBDBD' },
];

//провайдер
function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrencyState] = useState('₽');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('транзакции');
      const curr = await AsyncStorage.getItem('валюта');
      setTransactions(data ? JSON.parse(data) : []);
      setCurrencyState(curr || '₽');
    } catch (error) {
      console.log('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };
  const addTransaction = async (transaction) => {
    try {
      const newTr = {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      const updated = [...transactions, newTr];
      setTransactions(updated);
      await AsyncStorage.setItem('транзакции', JSON.stringify(updated));
    } catch (error) {
      console.log('Ошибка добавления:', error);
    }
  };
  const deleteTransaction = async (id) => {
    try {
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      await AsyncStorage.setItem('транзакции', JSON.stringify(updated));
    } catch (error) {
      console.log('Ошибка удаления:', error);
    }
  };

  const setCurrency = async (curr) => {
    try {
      setCurrencyState(curr);
      await AsyncStorage.setItem('Валюта', curr);
    } catch (error) {
      console.log('Ошибка установки валюты:', error);
    }
  };

  const clearAll = async () => {
    try {
      setTransactions([]);
      await AsyncStorage.removeItem('Транзакции');
    } catch (error) {
      console.log('Ошибка очистки:', error);
    }
  };

  const getBalance = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        currency,
        loading,
        addTransaction,
        deleteTransaction,
        setCurrency,
        clearAll,
        getBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
function useTransactions() {
  return useContext(TransactionContext);
}
//компоненты
function TransactionItem({ transaction, currency, onDelete, icon: IconComponent }) {
  const isIncome = transaction.type === 'income';
  const sign = isIncome ? '+' : '-';
  const color = isIncome ? colors.success : colors.danger;

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('ru-RU');

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIcon}>
          {IconComponent && <IconComponent size={28} color={color} />}
        </View>
        <View style={styles.transactionContent}>
          <Text style={styles.transactionCategory}>
            {transaction.categoryName}
          </Text>
          <Text style={styles.transactionDate}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[styles.transactionAmount, { color }]}>
          {sign}
          {transaction.amount.toFixed(2)}
        </Text>
        <Text style={{ marginRight: spacing.md }}>{currency}</Text>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.transactionDelete}
          activeOpacity={0.7}
        >
          <DeleteIcon size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatCard({ title, amount, currency, color, icon: IconComponent }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        {IconComponent && (
          <View style={styles.statIcon}>
            <IconComponent size={24} color={color} />
          </View>
        )}
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={[styles.statAmount, { color }]}>
        {amount.toFixed(2)} {currency}
      </Text>
    </View>
  );
}
//экран
function HomeScreen({ onNavigate }) {
  const { transactions, currency, loading, deleteTransaction, getBalance } =
    useTransactions();
  const { income, expense, balance } = getBalance();

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getCategoryIcon = (categoryName, type) => {
    const categories =
      type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const category = categories.find(c => c.name === categoryName);
    return category?.icon;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.sectionTitle}>Загрузка...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            currency={currency}
            onDelete={() => deleteTransaction(item.id)}
            icon={getCategoryIcon(item.categoryName, item.type)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Баланс</Text>
              <Text
                style={[
                  styles.balanceAmount,
                  {
                    color:
                      balance >= 0 ? colors.success : colors.danger,
                  },
                ]}
              >
                {balance.toFixed(2)} {currency}
              </Text>
            </View>
            <StatCard
              title="Доход"
              amount={income}
              currency={currency}
              color={colors.success}
              icon={AnalyticsIcon}
            />
            <StatCard
              title="Расход"
              amount={expense}
              currency={currency}
              color={colors.danger}
              icon={AnalyticsIcon}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <WalletIcon size={64} color={colors.grayBorder} />
            </View>
            <Text style={styles.emptyText}>Нет транзакций</Text>
            <Text style={styles.emptySubText}>Добавьте первую операцию</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => onNavigate('add')}
        activeOpacity={0.7}
      >
        <PlusIcon size={28} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
function AddTransactionScreen({ onNavigate }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const categories =
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const handleAdd = async () => {
    if (!amount || !selectedCategory) {
      Alert.alert('Ошибка', 'Заполните сумму и выберите категорию');
      return;
    }
    try {
      await addTransaction({
        type,
        amount: parseFloat(amount),
        categoryName: selectedCategory.name,
        categoryIcon: '',
        description,
      });
      Alert.alert('Есть', 'Транзакция добавлена');
      onNavigate('home');
    } catch (error) {
      Alert.alert('Ошибка!', 'Не удалось добавить транзакцию');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Тип операции</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.typeButtonActive,
              ]}
              onPress={() => {
                setType('expense');
                setSelectedCategory(null);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' && styles.typeButtonTextActive,
                ]}
              >
                📉 Расход
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.typeButtonActive,
              ]}
              onPress={() => {
                setType('income');
                setSelectedCategory(null);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' && styles.typeButtonTextActive,
                ]}
              >
                📈 Доход
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Сумма</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={colors.grayLight}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Категория</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  selectedCategory?.id === cat.id &&
                    styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryIcon}>
                  <cat.icon size={28} color={cat.color} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Описание (опционально)</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Добавьте заметку..."
            placeholderTextColor={colors.grayLight}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.7}
        >
          <PlusIcon size={20} color={colors.white} />
          <Text style={styles.addButtonText}>Добавить транзакцию</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('home')}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Text style={styles.backButton}>← Назад на главный экран</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
function StatisticsScreen() {
  const { transactions, currency, getBalance } = useTransactions();
  const { income, expense, balance } = getBalance();
  const stats = {};
  transactions.forEach(t => {
    if (!stats[t.categoryName]) {
      stats[t.categoryName] = {
        amount: 0,
        type: t.type,
      };
    }
    stats[t.categoryName].amount += t.amount;
  });

  const getCategoryIcon = (categoryName, type) => {
    const categories =
      type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const category = categories.find(c => c.name === categoryName);
    return category?.icon;
  };

  const sortedStats = Object.entries(stats)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Ваша статистика</Text>
        </View>
        <View style={styles.section}>
          <StatCard
            title="Общий баланс"
            amount={balance}
            currency={currency}
            color={balance >= 0 ? colors.success : colors.danger}
            icon={CurrencyIcon}
          />
          <StatCard
            title="Общий доход"
            amount={income}
            currency={currency}
            color={colors.success}
            icon={AnalyticsIcon}
          />
          <StatCard
            title="Общие расходы"
            amount={expense}
            currency={currency}
            color={colors.danger}
            icon={AnalyticsIcon}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Добавленные категории</Text>
          {sortedStats.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Нет данных</Text>
            </View>
          ) : (
            sortedStats.map((stat, index) => {
              const IconComponent = getCategoryIcon(stat.name, stat.type);
              return (
                <View key={index} style={styles.categoryStatItem}>
                  <View style={styles.categoryStatLeft}>
                    {IconComponent && (
                      <View style={styles.categoryStatIcon}>
                        <IconComponent
                          size={24}
                          color={
                            stat.type === 'income'
                              ? colors.success
                              : colors.danger
                          }
                        />
                      </View>
                    )}
                    <Text style={styles.categoryStatName}>{stat.name}</Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryStatAmount,
                      {
                        color:
                          stat.type === 'income'
                            ? colors.success
                            : colors.danger,
                      },
                    ]}
                  >
                    {stat.amount.toFixed(2)} {currency}
                  </Text>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function SettingsScreen() {
  const { currency, setCurrency, clearAll } = useTransactions();
  const CURRENCIES = ['₽', '$', '€', '¥', 'с'];

  const handleClearAll = () => {
    Alert.alert(
      '⚠️ Удалить все данные?',
      'Это действие нельзя отменить. Все ваши транзакции будут удалены.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить все',
          style: 'destructive',
          onPress: () => {
            clearAll();
            Alert.alert('Все данные удалены');
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💱 Выбор валюты</Text>
          <Text style={styles.sectionSubtitle}>
            Текущая валюта: <Text style={{ fontWeight: 'bold' }}>{currency}</Text>
          </Text>
          <View style={styles.currencyButtons}>
            {CURRENCIES.map(curr => (
              <TouchableOpacity
                key={curr}
                style={[
                  styles.currencyButton,
                  currency === curr && styles.currencyButtonActive,
                ]}
                onPress={() => setCurrency(curr)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.currencyButtonText,
                    currency === curr && styles.currencyButtonTextActive,
                  ]}
                >
                  {curr}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Версия</Text>
            <Text style={styles.aboutValue}>1.0</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Разработчик</Text>
            <Text style={styles.aboutValue}>Kim Yuri</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Хранилище</Text>
            <Text style={styles.aboutValue}>Cloud</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ На крайний случай</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearAll}
            activeOpacity={0.7}
          >
            <View style={styles.dangerIcon}>
              <TrashIcon size={20} color={colors.white} />
            </View>
            <Text style={styles.dangerButtonText}>Удалить все данные</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
//Гл прилож
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  return (
    <TransactionProvider>
      <View style={styles.innerContainer}>
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'add' && (
          <AddTransactionScreen onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'stats' && <StatisticsScreen />}
        {currentScreen === 'settings' && <SettingsScreen />}

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'home' && styles.navButtonActive,
            ]}
            onPress={() => setCurrentScreen('home')}
            activeOpacity={0.7}
          >
            <View style={styles.navIcon}>
              <HomeIcon
                size={24}
                color={
                  currentScreen === 'home' ? colors.primary : colors.grayLight
                }
              />
            </View>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'home' && styles.navButtonTextActive,
              ]}
            >
              Главное
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'stats' && styles.navButtonActive,
            ]}
            onPress={() => setCurrentScreen('stats')}
            activeOpacity={0.7}
          >
            <View style={styles.navIcon}>
              <AnalyticsIcon
                size={24}
                color={
                  currentScreen === 'stats' ? colors.primary : colors.grayLight
                }
              />
            </View>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'stats' && styles.navButtonTextActive,
              ]}
            >
              Статистика
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentScreen === 'settings' && styles.navButtonActive,
            ]}
            onPress={() => setCurrentScreen('settings')}
            activeOpacity={0.7}
          >
            <View style={styles.navIcon}>
              <SettingsIcon
                size={24}
                color={
                  currentScreen === 'settings'
                    ? colors.primary
                    : colors.grayLight
                }
              />
            </View>
            <Text
              style={[
                styles.navButtonText,
                currentScreen === 'settings' && styles.navButtonTextActive,
              ]}
            >
              Настройки
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TransactionProvider>
  );
}
