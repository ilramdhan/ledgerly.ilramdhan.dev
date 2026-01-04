import React, { useMemo, useState } from 'react';
import { X, PieChart, AlertCircle, CheckCircle2, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { useData } from '../../contexts/DataContext';
import { Budget, Transaction } from '../../types';
import { TransactionList } from '../data/TransactionList';
import { formatCurrency, cn } from '../../utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  budget: Budget | null;
}

export const BudgetDetailsModal: React.FC<Props> = ({ isOpen, onClose, budget }) => {
  const { transactions } = useData();
  const [search, setSearch] = useState('');

  const budgetTransactions = useMemo(() => {
    if (!budget) return [];
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.filter(t => {
      // Must match category and be an expense
      if (t.category !== budget.category || t.type !== 'expense') return false;
      
      // Must match the budget period
      const tDate = new Date(t.date);
      let inPeriod = false;
      if (budget.period === 'monthly') {
        inPeriod = tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      } else {
        inPeriod = tDate.getFullYear() === currentYear;
      }

      if (!inPeriod) return false;

      // Apply Search Filter
      if (search) {
        return t.merchant.toLowerCase().includes(search.toLowerCase()) || 
               t.amount.toString().includes(search);
      }
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [budget, transactions, search]);

  if (!isOpen || !budget) return null;

  // Calculate stats based on ALL transactions for this budget, not just filtered ones
  // We need to re-calculate raw total to show correct progress bar even when searching
  const allBudgetTransactions = transactions.filter(t => {
     if (t.category !== budget.category || t.type !== 'expense') return false;
     const tDate = new Date(t.date);
     const now = new Date();
     if (budget.period === 'monthly') return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
     return tDate.getFullYear() === now.getFullYear();
  });

  const spent = allBudgetTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const remaining = budget.limit - spent;
  const percent = Math.min((spent / budget.limit) * 100, 100);
  const isOver = spent > budget.limit;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div 
        className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm m-0 p-0" 
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <Card className="w-full max-w-2xl relative shadow-2xl flex flex-col max-h-[85vh]" padding="none">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start bg-white dark:bg-slate-800 rounded-t-xl sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{budget.category}</h2>
                        <p className="text-sm text-slate-500 capitalize">{budget.period} Budget Overview</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                    <X size={24} />
                </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="overflow-y-auto custom-scroll p-6 space-y-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <span className="text-xs font-medium text-slate-500 uppercase">Limit</span>
                        <div className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">{formatCurrency(budget.limit)}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                        <span className="text-xs font-medium text-slate-500 uppercase">Spent</span>
                        <div className={cn("text-lg font-bold tabular-nums", isOver ? "text-red-500" : "text-slate-900 dark:text-white")}>
                            {formatCurrency(spent)}
                        </div>
                    </div>
                    <div className={cn(
                        "p-4 rounded-xl border",
                        isOver 
                            ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30" 
                            : "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30"
                    )}>
                        <span className={cn("text-xs font-medium uppercase", isOver ? "text-red-600" : "text-green-600")}>
                            {isOver ? 'Over Budget' : 'Remaining'}
                        </span>
                        <div className={cn("text-lg font-bold tabular-nums", isOver ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400")}>
                            {isOver ? formatCurrency(Math.abs(remaining)) : formatCurrency(remaining)}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Usage</span>
                        <span className={cn("font-medium", isOver ? "text-red-500" : "text-slate-500")}>
                            {percent.toFixed(1)}%
                        </span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className={cn("h-full rounded-full", isOver ? "bg-red-500" : "bg-primary-500")} 
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    {isOver && (
                        <div className="flex items-center gap-2 text-xs text-red-500 mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                            <AlertCircle size={14} />
                            <span>You have exceeded this budget. Consider adjusting the limit or reducing expenses.</span>
                        </div>
                    )}
                    {!isOver && percent < 80 && (
                        <div className="flex items-center gap-2 text-xs text-green-600 mt-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                            <CheckCircle2 size={14} />
                            <span>You are doing great! Keep it up.</span>
                        </div>
                    )}
                </div>

                {/* Transactions List */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Contributing Transactions</h3>
                        <div className="relative">
                            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 pr-3 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-1 focus:ring-primary-500 w-32 md:w-48"
                            />
                        </div>
                    </div>
                    
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden min-h-[150px]">
                        {budgetTransactions.length > 0 ? (
                            <TransactionList transactions={budgetTransactions} />
                        ) : (
                            <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-800/30 h-full flex items-center justify-center">
                                {search ? 'No matching transactions found.' : 'No expenses found for this category in the current period.'}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </Card>
      </div>
    </div>
  );
};