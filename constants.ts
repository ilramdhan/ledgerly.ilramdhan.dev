import { Account, Budget, Transaction, User, Metric } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Sterling',
  email: 'alex@ledgerly.app',
  currency: 'USD',
  avatarUrl: 'https://picsum.photos/200'
};

export const ACCOUNTS: Account[] = [
  { id: 'a1', name: 'Chase Sapphire', type: 'credit', balance: -1240.50, currency: 'USD', lastSynced: '2h ago', institution: 'Chase' },
  { id: 'a2', name: 'Checking Main', type: 'bank', balance: 8450.25, currency: 'USD', lastSynced: '1h ago', institution: 'Chase' },
  { id: 'a3', name: 'High Yield Savings', type: 'investment', balance: 42000.00, currency: 'USD', lastSynced: '5h ago', institution: 'Ally' },
  { id: 'a4', name: 'Wallet Cash', type: 'cash', balance: 120.00, currency: 'USD', lastSynced: '1d ago' },
];

export const CATEGORIES = [
  'Food & Dining', 'Transportation', 'Housing', 'Entertainment', 'Shopping', 'Utilities', 'Income', 'Transfer'
];

// --- Dynamic Date Generator ---
const getRelativeDate = (daysOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysOffset);
  return date.toISOString().split('T')[0];
};

const getRelativeMonthDate = (monthsOffset: number, day: number = 1): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsOffset);
  date.setDate(day);
  return date.toISOString().split('T')[0];
}

// Generate realistic transactions relative to TODAY
export const TRANSACTIONS: Transaction[] = [
  // Today
  { id: 't1', date: getRelativeDate(0), merchant: 'Whole Foods Market', amount: -142.80, currency: 'USD', category: 'Food & Dining', accountId: 'a1', status: 'posted', type: 'expense' },
  { id: 't2', date: getRelativeDate(0), merchant: 'Uber Technologies', amount: -24.50, currency: 'USD', category: 'Transportation', accountId: 'a1', status: 'pending', type: 'expense' },
  
  // Yesterday
  { id: 't3', date: getRelativeDate(1), merchant: 'Tech Corp Salary', amount: 3200.00, currency: 'USD', category: 'Income', accountId: 'a2', status: 'posted', type: 'income', isRecurring: true, recurringPeriod: 'monthly' },
  { id: 't4', date: getRelativeDate(1), merchant: 'Netflix Subscription', amount: -15.99, currency: 'USD', category: 'Entertainment', accountId: 'a1', status: 'posted', type: 'expense', isRecurring: true, recurringPeriod: 'monthly' },
  
  // This Week
  { id: 't5', date: getRelativeDate(2), merchant: 'Shell Station', amount: -45.00, currency: 'USD', category: 'Transportation', accountId: 'a1', status: 'posted', type: 'expense' },
  { id: 't6', date: getRelativeDate(3), merchant: 'Transfer to Savings', amount: -1000.00, currency: 'USD', category: 'Transfer', accountId: 'a2', status: 'posted', type: 'transfer' },
  { id: 't7', date: getRelativeDate(3), merchant: 'Transfer from Checking', amount: 1000.00, currency: 'USD', category: 'Transfer', accountId: 'a3', status: 'posted', type: 'transfer' },
  { id: 't8', date: getRelativeDate(4), merchant: 'Amazon Marketplace', amount: -89.99, currency: 'USD', category: 'Shopping', accountId: 'a1', status: 'posted', type: 'expense' },
  { id: 't9', date: getRelativeDate(5), merchant: 'Electric Utility', amount: -120.40, currency: 'USD', category: 'Utilities', accountId: 'a2', status: 'posted', type: 'expense', isRecurring: true, recurringPeriod: 'monthly' },
  { id: 't10', date: getRelativeDate(6), merchant: 'Starbucks', amount: -6.50, currency: 'USD', category: 'Food & Dining', accountId: 'a4', status: 'posted', type: 'expense' },
  { id: 't11', date: getRelativeDate(6), merchant: 'Spotify', amount: -9.99, currency: 'USD', category: 'Entertainment', accountId: 'a1', status: 'posted', type: 'expense', isRecurring: true, recurringPeriod: 'monthly' },
  { id: 't12', date: getRelativeDate(7), merchant: 'Trader Joes', amount: -64.20, currency: 'USD', category: 'Food & Dining', accountId: 'a1', status: 'posted', type: 'expense' },
  
  // Last Month (for charts)
  { id: 't13', date: getRelativeMonthDate(1, 15), merchant: 'Target', amount: -120.50, currency: 'USD', category: 'Shopping', accountId: 'a1', status: 'posted', type: 'expense' },
  { id: 't14', date: getRelativeMonthDate(1, 28), merchant: 'Tech Corp Salary', amount: 3200.00, currency: 'USD', category: 'Income', accountId: 'a2', status: 'posted', type: 'income' },
];

export const BUDGETS: Budget[] = [
  { id: 'b1', category: 'Food & Dining', spent: 0, limit: 800, period: 'monthly' }, // Spent calculated in context/component
  { id: 'b2', category: 'Entertainment', spent: 0, limit: 200, period: 'monthly' },
  { id: 'b3', category: 'Shopping', spent: 0, limit: 300, period: 'monthly' }, 
];

export const METRICS: Metric[] = [
  { label: 'Net Worth', value: 49329.75, change: 2.4, trend: 'up', history: [45000, 46000, 45500, 47000, 48500, 49329] },
  { label: 'Monthly In', value: 6400.00, change: 0.0, trend: 'neutral', history: [6400, 6400, 6400, 6400, 6400, 6400] },
  { label: 'Monthly Out', value: 3245.40, change: -5.2, trend: 'down', history: [4100, 3800, 3900, 3500, 3100, 3245] },
];