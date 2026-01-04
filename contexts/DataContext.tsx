import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Account, Budget, Transaction, User, Metric, Goal } from '../types';
import { ACCOUNTS as SEED_ACCOUNTS, TRANSACTIONS as SEED_TRANSACTIONS, BUDGETS as SEED_BUDGETS, CATEGORIES as SEED_CATEGORIES, CURRENT_USER } from '../constants';

interface ToastData {
  message: string;
  type: 'success' | 'error';
}

interface DataContextType {
  user: User;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  categories: string[];
  metrics: Metric[];
  toast: ToastData | null;
  addTransaction: (txn: Omit<Transaction, 'id' | 'status'>) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  addAccount: (acc: Omit<Account, 'id' | 'lastSynced'>) => void;
  editAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  editBudget: (id: string, updates: Partial<Budget>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
  editGoal: (id: string, updates: Partial<Goal>) => void;
  updateGoal: (id: string, currentAmount: number) => void;
  addCategory: (name: string) => void;
  deleteCategory: (name: string) => void;
  deleteTransaction: (id: string) => void;
  deleteBudget: (id: string) => void;
  deleteGoal: (id: string) => void;
  updateUser: (updates: Partial<User>) => void;
  resetData: () => void;
  hideToast: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persistence Loading
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('ledgerly_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('ledgerly_accounts');
    return saved ? JSON.parse(saved) : SEED_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ledgerly_transactions');
    return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('ledgerly_budgets');
    return saved ? JSON.parse(saved) : SEED_BUDGETS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('ledgerly_goals');
    return saved ? JSON.parse(saved) : [
      { id: 'g1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 2500, color: '#3FB77F', deadline: '2024-12-31' },
      { id: 'g2', name: 'New Laptop', targetAmount: 2000, currentAmount: 1200, color: '#5B86E5', deadline: '2023-11-30' }
    ];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('ledgerly_categories');
    return saved ? JSON.parse(saved) : SEED_CATEGORIES;
  });
  
  // Computed States
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Persistence Effects
  useEffect(() => localStorage.setItem('ledgerly_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('ledgerly_accounts', JSON.stringify(accounts)), [accounts]);
  useEffect(() => localStorage.setItem('ledgerly_transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('ledgerly_budgets', JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem('ledgerly_goals', JSON.stringify(goals)), [goals]);
  useEffect(() => localStorage.setItem('ledgerly_categories', JSON.stringify(categories)), [categories]);

  // Recalculate metrics
  useEffect(() => {
    const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const incomeTxns = transactions.filter(t => t.type === 'income');
    const expenseTxns = transactions.filter(t => t.type === 'expense');

    const monthlyIn = incomeTxns.reduce((sum, t) => sum + t.amount, 0);
    const monthlyOut = expenseTxns.reduce((sum, t) => sum + Math.abs(t.amount), 0);

    setMetrics([
      { 
        label: 'Net Worth', 
        value: netWorth, 
        change: 2.4, 
        trend: 'up', 
        history: accounts.map(a => a.balance) 
      },
      { 
        label: 'Total Income', 
        value: monthlyIn, 
        change: 1.2, 
        trend: 'neutral', 
        history: [] 
      },
      { 
        label: 'Total Expenses', 
        value: monthlyOut, 
        change: -5.2, 
        trend: 'down', 
        history: [] 
      },
    ]);
  }, [accounts, transactions]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  const addTransaction = (txnData: Omit<Transaction, 'id' | 'status'>) => {
    const newTxn: Transaction = {
      ...txnData,
      id: `t-${Date.now()}`,
      status: 'posted',
    };

    setTransactions(prev => [newTxn, ...prev]);

    setAccounts(prev => prev.map(acc => {
      if (acc.id === newTxn.accountId) {
        return { ...acc, balance: acc.balance + newTxn.amount };
      }
      return acc;
    }));
    showToast('Transaction added successfully', 'success');
  };

  const editTransaction = (id: string, updates: Partial<Transaction>) => {
    let oldAmount = 0;
    let newAmount = 0;
    let accountId = '';

    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        oldAmount = t.amount;
        newAmount = updates.amount !== undefined ? updates.amount : t.amount;
        accountId = t.accountId;
        return { ...t, ...updates };
      }
      return t;
    }));

    // Adjust balance difference
    if (oldAmount !== newAmount) {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === accountId) {
          return { ...acc, balance: acc.balance - oldAmount + newAmount };
        }
        return acc;
      }));
    }
    showToast('Transaction updated', 'success');
  };

  const deleteTransaction = (id: string) => {
    const txn = transactions.find(t => t.id === id);
    if (txn) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      setAccounts(prev => prev.map(acc => {
        if (acc.id === txn.accountId) {
          return { ...acc, balance: acc.balance - txn.amount };
        }
        return acc;
      }));
      showToast('Transaction deleted', 'success');
    }
  };

  const addAccount = (accData: Omit<Account, 'id' | 'lastSynced'>) => {
    const newAccount: Account = {
      ...accData,
      id: `a-${Date.now()}`,
      lastSynced: 'Just now'
    };
    setAccounts(prev => [...prev, newAccount]);
    showToast('Account linked successfully', 'success');
  };

  const editAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === id) return { ...a, ...updates };
      return a;
    }));
    showToast('Account details updated', 'success');
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    showToast('Account removed', 'success');
  };

  const addBudget = (budgetData: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...budgetData,
      id: `b-${Date.now()}`,
      spent: 0 
    };
    setBudgets(prev => [...prev, newBudget]);
    showToast('Budget created', 'success');
  };

  const editBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(b => {
      if (b.id === id) return { ...b, ...updates };
      return b;
    }));
    showToast('Budget updated', 'success');
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    showToast('Budget removed', 'success');
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'currentAmount'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `g-${Date.now()}`,
      currentAmount: 0
    };
    setGoals(prev => [...prev, newGoal]);
    showToast('Financial goal set!', 'success');
  };

  const editGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) return { ...g, ...updates };
      return g;
    }));
    showToast('Goal details updated', 'success');
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) return { ...g, currentAmount: g.currentAmount + amount };
      return g;
    }));
    showToast('Goal savings updated', 'success');
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    showToast('Goal deleted', 'success');
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories(prev => [...prev, name]);
      showToast('Category added', 'success');
    }
  };

  const deleteCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
    showToast('Category removed', 'success');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  };

  const resetData = () => {
    if (confirm("Are you sure? This will reset all data to default demo data.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <DataContext.Provider value={{
      user,
      accounts,
      transactions,
      budgets,
      goals,
      categories,
      metrics,
      toast,
      addTransaction,
      editTransaction,
      addAccount,
      editAccount,
      deleteAccount,
      addBudget,
      editBudget,
      addGoal,
      editGoal,
      updateGoal,
      addCategory,
      deleteCategory,
      deleteTransaction,
      deleteBudget,
      deleteGoal,
      updateUser,
      resetData,
      hideToast
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};