import { Transaction } from './types';

export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic Chart Data Generator
export const getChartData = (transactions: Transaction[], days = 7) => {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Format label based on range
    const label = days > 7 
      ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : d.toLocaleDateString('en-US', { weekday: 'short' });

    const dayTransactions = transactions.filter(t => t.date === dateStr);
    
    const income = dayTransactions
      .filter(t => t.amount > 0 && t.type !== 'transfer')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expense = dayTransactions
      .filter(t => t.amount < 0 && t.type !== 'transfer')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    result.push({
      name: label,
      fullDate: dateStr,
      income,
      expense
    });
  }
  return result;
};

// Kept for backward compatibility if needed, but getChartData is preferred
export const getLast7DaysChartData = (transactions: Transaction[]) => getChartData(transactions, 7);

export const exportToCSV = (transactions: Transaction[], filename = 'transactions.csv') => {
  const headers = ['Date', 'Merchant', 'Amount', 'Currency', 'Category', 'Account', 'Type', 'Status'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.merchant.replace(/"/g, '""')}"`, // Escape quotes
    t.amount,
    t.currency,
    t.category,
    t.accountId,
    t.type,
    t.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};