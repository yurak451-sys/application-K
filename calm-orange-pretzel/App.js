import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionContext = createContext();

const INCOME_CATEGORIES = [
  { id: 1, name: 'Зарплата', icon: '💼' },
  { id: 2, name: 'Бонус', icon: '🎁' },
  { id: 3, name: 'Фриланс', icon: '💻' },
  { id: 4, name: 'Инвестиции', icon: '📈' },
  { id: 5, name: 'Другое', icon: '💰' },
];

const EXPENSE_CATEGORIES = [
  { id: 1, name: 'Еда', icon: '🍔' },
  { id: 2, name: 'Транспорт', icon: '🚗' },
  { id: 3, name: 'Развлечения', icon: '🎬' },
  { id: 4, name: 'Коммунальные', icon: '🏠' },
  { id: 5, name: 'Здоровье', icon: '⚕️' },
  { id: 6, name: 'Образование', icon: '📚' },
  { id: 7, name: 'Шоппинг', icon: '🛍️' },
  { id: 8, name: 'Другое', icon: '❓' },
];

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrencyState] = useState('₽');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('transactions');
      const curr = await AsyncStorage.getItem('currency');
      setTransactions(data ? JSON.parse(data) : []);
      setCurrencyState(curr || '₽');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    const newTr = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    const updated = [...transactions, newTr];
    setTransactions(updated);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  const deleteTransaction = async (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  const setCurrency = async (curr) => {
    setCurrencyState(curr);
    await AsyncStorage.setItem('currency', curr);
  };

  const clearAll = async () => {
    setTransactions([]);
    await AsyncStorage.removeItem('transactions');
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
    <TransactionContext.Provider value={{ transactions, currency, loading, addTransaction, deleteTransaction, setCurrency, clearAll, getBalance }}>
      {children}
    </TransactionContext.Provider>
  );
}

function useTransactions() {
  return useContext(TransactionContext);
}

function TransactionItem({ transaction, currency, onDelete }) {
  const isIncome = transaction.type === 'income';
  const sign = isIncome ? '+' : '-';
  const color = isIncome ? '#4CAF50' : '#F44336';
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('ru-RU');

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionIcon}>{transaction.categoryIcon}</Text>
        <View>
          <Text style={styles.transactionCategory}>{transaction.categoryName}</Text>
          <Text style={styles.transactionDate}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[styles.transactionAmount, { color }]}>
          {sign}{transaction.amount.toFixed(2)} {currency}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteBtn}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatCard({ title, amount, currency }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statAmount}>{amount.toFixed(2)} {currency}</Text>
    </View>
  );
}

function HomeScreen({ onNavigate }) {
  const { transactions, currency, loading, deleteTransaction, getBalance } = useTransactions();
  const { income, expense, balance } = getBalance();

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

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
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>Баланс</Text>
              <Text style={[styles.balanceAmount, { color: balance >= 0 ? '#4CAF50' : '#F44336' }]}>
                {balance.toFixed(2)} {currency}
              </Text>
            </View>
            <StatCard title="Доход" amount={income} currency={currency} />
            <StatCard title="Расход" amount={expense} currency={currency} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Нет транзакций</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={() => onNavigate('add')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
function AddTransactionScreen({ onNavigate }) {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleAdd = async () => {
    if (!amount || !selectedCategory) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    await addTransaction({
      type,
      amount: parseFloat(amount),
      categoryName: selectedCategory.name,
      categoryIcon: selectedCategory.icon,
    });
    Alert.alert('Успех', 'Добавлено!');
    onNavigate('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>Тип</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
              onPress={() => setType('expense')}
            >
              <Text style={[styles.typeButtonText, type === 'expense' && { color: '#fff' }]}>Расход</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
              onPress={() => setType('income')}
            >
              <Text style={[styles.typeButtonText, type === 'income' && { color: '#fff' }]}>Доход</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Сумма</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
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
                style={[styles.categoryItem, selectedCategory?.id === cat.id && styles.categoryItemSelected]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNavigate('home')}>
          <Text style={styles.backButton}>← Назад</Text>
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
      stats[t.categoryName] = { amount: 0, icon: t.categoryIcon };
    }
    stats[t.categoryName].amount += t.amount;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Статистика</Text>
          <StatCard title="Общий баланс" amount={balance} currency={currency} />
          <StatCard title="Доход" amount={income} currency={currency} />
          <StatCard title="Расход" amount={expense} currency={currency} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>По категориям</Text>
          {Object.entries(stats).map(([name, data], i) => (
            <View key={i} style={styles.categoryStatItem}>
              <Text style={styles.categoryStatIcon}>{data.icon}</Text>
              <Text style={styles.categoryStatName}>{name}</Text>
              <Text style={styles.categoryStatAmount}>{data.amount.toFixed(2)} {currency}</Text>
              </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { currency, setCurrency, clearAll } = useTransactions();
  const CURRENCIES = ['₽', '$', '€', 'с'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Валюта: {currency}</Text>
          <View style={styles.currencyButtons}>
            {CURRENCIES.map(curr => (
              <TouchableOpacity
                key={curr}
                style={[styles.currencyButton, currency === curr && styles.currencyButtonActive]}
                onPress={() => setCurrency(curr)}
              >
                <Text style={[styles.currencyButtonText, currency === curr && { color: '#fff' }]}>{curr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.dangerButton} onPress={() => {
            Alert.alert('Удалить все?', 'Это нельзя отменить', [
              { text: 'Отмена', style: 'cancel' },
              { text: 'Удалить', onPress: clearAll, style: 'destructive' }
            ]);
          }}>
            <Text style={styles.dangerButtonText}>Удалить все данные</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <TransactionProvider>
      <View style={{ flex: 1 }}>
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'add' && <AddTransactionScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'stats' && <StatisticsScreen />}
        {currentScreen === 'settings' && <SettingsScreen />}

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('home')}>
            <Text style={currentScreen === 'home' ? styles.navButtonActive : {}}>🏠 Дом</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('stats')}>
            <Text style={currentScreen === 'stats' ? styles.navButtonActive : {}}>📊 Статистика</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen('settings')}>
            <Text style={currentScreen === 'settings' ? styles.navButtonActive : {}}>⚙️ Настройки</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TransactionProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  header: { padding: 16 },
  balanceCard: { backgroundColor: '#0066cc', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 16 },
  balanceTitle: { fontSize: 14, color: '#fff', marginBottom: 8 },
  balanceAmount: { fontSize: 32, fontWeight: '700', color: '#fff' },
  statCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, marginHorizontal: 16 },
  statTitle: { fontSize: 14, color: '#666', marginBottom: 8 },
  statAmount: { fontSize: 24, fontWeight: '700', color: '#0066cc' },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  transactionIcon: { fontSize: 32, marginRight: 12 },
  transactionCategory: { fontSize: 16, fontWeight: '600', color: '#333' },
  transactionDate: { fontSize: 12, color: '#999' },
  transactionRight: { alignItems: 'flex-end', marginLeft: 12 },
  transactionAmount: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  deleteBtn: { fontSize: 18 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 18, color: '#666' },
  fab: { position: 'absolute', bottom: 80, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#0066cc', justifyContent: 'center', alignItems: 'center' },
  fabText: { fontSize: 28, color: '#fff', fontWeight: 'bold' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  typeButtons: { flexDirection: 'row', gap: 10 },
  typeButton: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', alignItems: 'center' },
  typeButtonActive: { borderColor: '#0066cc', backgroundColor: '#0066cc' },
  typeButtonText: { fontSize: 14, fontWeight: '600', color: '#999' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryItem: { width: '31%', paddingVertical: 12, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', borderWidth: 2, borderColor: '#f0f0f0' },
  categoryItemSelected: { borderColor: '#0066cc', backgroundColor: '#f0f7ff' },
  categoryIcon: { fontSize: 28, marginBottom: 6 },
  categoryName: { fontSize: 12, color: '#666', fontWeight: '500', textAlign: 'center' },
  addButton: { backgroundColor: '#0066cc', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  backButton: { textAlign: 'center', color: '#0066cc', fontSize: 16, paddingVertical: 12, marginHorizontal: 16 },
  categoryStatItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
  categoryStatIcon: { fontSize: 24, marginRight: 10 },
  categoryStatName: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  categoryStatAmount: { fontSize: 14, fontWeight: '700', color: '#0066cc' },
  currencyButtons: { flexDirection: 'row', gap: 8 },
  currencyButton: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: '#fff', borderWidth: 2, borderColor: '#ddd', alignItems: 'center' },
  currencyButtonActive: { backgroundColor: '#0066cc', borderColor: '#0066cc' },
  currencyButtonText: { fontSize: 14, fontWeight: '600', color: '#666' },
  dangerButton: { backgroundColor: '#F44336', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  dangerButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  bottomNav: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
  navButton: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  navButtonActive: { fontWeight: 'bold', color: '#0066cc' },
});