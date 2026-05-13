export const validateAmount = (amount) => {
  if (!amount || amount.toString().trim() === '') {
    return { valid: false, error: 'Сумма не может быть пустой' };
  }

  const num = parseFloat(amount);
  if (isNaN(num)) {
    return { valid: false, error: 'Сумма должна быть числом' };
  }

  if (num <= 0) {
    return { valid: false, error: 'Сумма должна быть больше нуля' };
  }

  if (num > 999999999) {
    return { valid: false, error: 'Сумма слишком большая' };
  }

  return { valid: true };
};

export const validateCategory = (category) => {
  if (!category) {
    return { valid: false, error: 'Выберите категорию' };
  }
  return { valid: true };
};

export const validateDescription = (description) => {
  if (description && description.length > 500) {
    return { valid: false, error: 'Описание слишком длинное' };
  }
  return { valid: true };
};

export const validateTransaction = (transaction) => {
  const amountValidation = validateAmount(transaction.amount);
  if (!amountValidation.valid) {
    return amountValidation;
  }

  const categoryValidation = validateCategory(transaction.category);
  if (!categoryValidation.valid) {
    return categoryValidation;
  }

  const descriptionValidation = validateDescription(transaction.description);
  if (!descriptionValidation.valid) {
    return descriptionValidation;
  }

  return { valid: true };
};
