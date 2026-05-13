import { categoryColors } from './colors';

// значки для доб транз

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Зарплата', icon: '💼', color: categoryColors.salary },
  { id: 'bonus', name: 'Подарок', icon: '🎁', color: categoryColors.bonus },
  { id: 'freelance', name: 'Фриланс', icon: '💻', color: categoryColors.freelance },
  { id: 'investment', name: 'Кредит', icon: '📈', color: categoryColors.investment },
  { id: 'other_income', name: 'Другое', icon: '💰', color: categoryColors.other },
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Продукты', icon: '🍔', color: categoryColors.food },
  { id: 'transport', name: 'Бензин', icon: '🚗', color: categoryColors.transport },
  { id: 'entertainment', name: 'Развлечения', icon: '🎬', color: categoryColors.entertainment },
  { id: 'utilities', name: 'Коммуналка', icon: '🏠', color: categoryColors.utilities },
  { id: 'health', name: 'Медстраховка', icon: '⚕️', color: categoryColors.health },
  { id: 'education', name: 'Учеба', icon: '📚', color: categoryColors.education },
  { id: 'shopping', name: 'Шоппинг', icon: '🛍️', color: categoryColors.shopping },
  { id: 'other_expense', name: 'Другое', icon: '❓', color: categoryColors.other },
];

export const getCategoryById = (id, type) => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.find(cat => cat.id === id);
};

export const getCategoryByName = (name, type) => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.find(cat => cat.name === name);
};
