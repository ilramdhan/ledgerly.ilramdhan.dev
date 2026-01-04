import { Transaction } from './types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Map currency codes to likely locales for better formatting
const CURRENCY_LOCALES: Record<string, string> = {
  'USD': 'en-US',
  'EUR': 'de-DE',
  'GBP': 'en-GB',
  'IDR': 'id-ID',
  'JPY': 'ja-JP',
  'SGD': 'en-SG',
  'AUD': 'en-AU',
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  const locale = CURRENCY_LOCALES[currency] || 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'IDR' ? 0 : 2, // IDR usually doesn't need decimals
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
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

export const getMonthlyTrendData = (transactions: Transaction[]) => {
  const result = [];
  const today = new Date();
  
  // Last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = d.getMonth();
    const yearKey = d.getFullYear();
    const label = d.toLocaleDateString('en-US', { month: 'short' });

    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === monthKey && tDate.getFullYear() === yearKey;
    });

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    result.push({
      name: label,
      income,
      expense
    });
  }
  return result;
}

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

export const exportToPDF = (transactions: Transaction[], title = 'Transaction Report') => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text('Ledgerly', 14, 22);
  doc.setFontSize(12);
  doc.text(title, 14, 32);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);

  // Table
  const tableColumn = ["Date", "Merchant", "Category", "Type", "Amount"];
  const tableRows: any[] = [];

  transactions.forEach(t => {
    const transactionData = [
      formatDate(t.date),
      t.merchant,
      t.category,
      t.type,
      formatCurrency(t.amount, t.currency)
    ];
    tableRows.push(transactionData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: 'grid',
    headStyles: { fillColor: [91, 134, 229] }, // Primary color
    styles: { fontSize: 9 },
    columnStyles: {
      4: { halign: 'right' }
    }
  });

  doc.save(`ledgerly_report_${new Date().toISOString().split('T')[0]}.pdf`);
};