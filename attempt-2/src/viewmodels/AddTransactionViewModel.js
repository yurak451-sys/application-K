import { useTransactionStore } from '../store/transactionStore';
import { validateTransaction } from '../utils/validators';

export const useAddTransactionViewModel = () => {
  const { addTransaction } = useTransactionStore();

  const handleAddTransaction = async (transactionData) => {
    const validation = validateTransaction(transactionData);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const result = await addTransaction({
      type: transactionData.type,
      amount: transactionData.amount,
      category: transactionData.category,
      categoryName: transactionData.categoryName,
      description: transactionData.description || '',
    });

    return result;
  };

  const validateAmount = (amount) => {
    if (!amount || amount.toString().trim() === '') {
      return false;
    }
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const validateFields = (type, amount, category) => {
    return {
      hasType: !!type,
      hasAmount: validateAmount(amount),
      hasCategory: !!category,
    };
  };

  return {
    handleAddTransaction,
    validateAmount,
    validateFields,
  };
};