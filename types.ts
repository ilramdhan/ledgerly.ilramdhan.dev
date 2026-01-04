
export interface User {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatarUrl?: string;
}

export type AccountType = 'bank' | 'cash' | 'credit' | 'investment';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  lastSynced: string;
  institution?: string;
}

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  accountId: string;
  status: 'pending' | 'posted';
  type: TransactionType;
  isRecurring?: boolean;
}

export interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  period: 'monthly' | 'yearly';
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  color: string;
}

export interface Metric {
  label: string;
  value: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  history: number[]; // for sparkline
}

export type PageRoute = 'dashboard' | 'transactions' | 'budgets' | 'goals' | 'reports' | 'settings' | 'subscriptions';