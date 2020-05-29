import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface CreateTransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ title, value, type }: CreateTransactionServiceDTO): Transaction {
    const transaction = this.transactionRepository.create({ value, title, type });
    return transaction;
  }
}

export default CreateTransactionService;
