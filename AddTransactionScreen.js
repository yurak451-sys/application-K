import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { useAddTransactionViewModel } from './AddTransactionViewModel';
import { colors } from './colors';
import { spacing, fontSize, fontWeight, borderRadius } from './spacing';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './categories';
import CategoryGrid from './CategoryGrid';
import Button from './Button';

const AddTransactionScreen = ({ onNavigate }) => {
  const { handleAddTransaction, validateFields } =
    useAddTransactionViewModel();

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgLight,
    },
    scrollView: {
      flex: 1,
    },
    section: {
      padding: spacing.lg,
    },
    label: {
      fontSize: fontSize.title,
      fontWeight: fontWeight.semibold,
      color: colors.black80,
      marginBottom: spacing.md,
    },
    typeButtons: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    input: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      fontSize: fontSize.body,
      color: colors.black80,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.grayBorder,
    },
    descriptionInput: {
      textAlignVertical: 'top',
      minHeight: 80,
    },
    button: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    backButton: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.xxl,
    },
  });

  const handleSubmit = async () => {
    const validation = validateFields(type, amount, selectedCategory);

    if (!validation.hasAmount) {
      Alert.alert('Ошибка', 'Введите корректную сумму');
      return;
    }

    if (!validation.hasCategory) {
      Alert.alert('Ошибка', 'Выберите категорию');
      return;
    }

    setLoading(true);
    const result = await handleAddTransaction({
      type,
      amount: parseFloat(amount),
      category: selectedCategory.id,
      categoryName: selectedCategory.name,
      description,
    });

    setLoading(false);

    if (result.success) {
      Alert.alert('Успех', 'Транзакция добавлена');
      onNavigate('home');
    } else {
      Alert.alert('Ошибка', result.error || 'Не удалось добавить транзакцию');
    }
  };

// для добавлении транз

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.label}>Тип операции</Text>
          <View style={styles.typeButtons}>
            <Button
              title="📉 Расход"
              variant={type === 'expense' ? 'primary' : 'secondary'}
              onPress={() => {
                setType('expense');
                setSelectedCategory(null);
              }}
            />
            <Button
              title="📈 Доход"
              variant={type === 'income' ? 'primary' : 'secondary'}
              onPress={() => {
                setType('income');
                setSelectedCategory(null);
              }}
            />
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
          <CategoryGrid
            categories={categories}
            selectedId={selectedCategory?.id}
            onSelect={setSelectedCategory}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Описание (опционально)</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Добавьте заметку..."
            placeholderTextColor={colors.grayLight}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Добавить транзакцию"
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>

// назад

        <View style={styles.backButton}>
          <Button
            title="← Вернуться"
            variant="secondary"
            onPress={() => onNavigate('home')}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTransactionScreen;
