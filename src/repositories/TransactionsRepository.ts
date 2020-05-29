import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionRepository {
  private transactions: Array<Transaction>;

  constructor() {
    this.transactions = [];
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Invalid TYPE');
    }

    if (type === 'outcome' && value > this.balance().total) {
      throw Error('The money is not enought for this outcome');
    }

    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  public getAll(): Array<Transaction> {
    return this.transactions;
  }

  public balance(): Balance {
    const { income, outcome }: Balance = this.transactions.reduce(
      (accumulator: Balance, currentTransaction: Transaction) => {
        switch (currentTransaction.type) {
          case 'income':
            accumulator.income += currentTransaction.value;
            break;
          case 'outcome':
            accumulator.outcome += currentTransaction.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionRepository;
