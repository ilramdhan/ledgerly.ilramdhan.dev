import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency, formatDate, cn } from '../../utils';
import { Coffee, ShoppingBag, Truck, Zap, Briefcase, ArrowDownRight, Trash2, Pencil } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
  onEdit?: (txn: Transaction) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const styles = "w-10 h-10 rounded-full flex items-center justify-center text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-400 flex-shrink-0";
  
  switch(category.toLowerCase()) {
    case 'food & dining': return <div className={cn(styles, "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400")}><Coffee size={18} /></div>;
    case 'shopping': return <div className={cn(styles, "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400")}><ShoppingBag size={18} /></div>;
    case 'transportation': return <div className={cn(styles, "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400")}><Truck size={18} /></div>;
    case 'utilities': return <div className={cn(styles, "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400")}><Zap size={18} /></div>;
    case 'income': return <div className={cn(styles, "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400")}><Briefcase size={18} /></div>;
    default: return <div className={styles}><ArrowDownRight size={18} /></div>;
  }
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, limit, onEdit }) => {
  const { deleteTransaction } = useData();
  const displayData = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="w-full">
      <div className="flex flex-col">
        {displayData.map((txn, idx) => (
          <div 
            key={txn.id}
            className={cn(
              "group relative flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0",
              "animate-in fade-in slide-in-from-bottom-2 duration-500"
            )}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Left Side: Icon & Info */}
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <CategoryIcon category={txn.category} />
              <div className="min-w-0">
                <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm md:text-base truncate">{txn.merchant}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{formatDate(txn.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="truncate">{txn.category}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Amount & Actions */}
            <div className="flex items-center gap-3 pl-2 flex-shrink-0">
              <div className="text-right">
                <span className={cn(
                  "block font-medium tabular-nums text-sm md:text-base",
                  txn.amount > 0 ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-slate-100"
                )}>
                  {txn.amount > 0 ? '+' : ''}{formatCurrency(txn.amount, txn.currency)}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide hidden sm:block">
                  {txn.status}
                </span>
              </div>

              {/* Actions - No longer absolute. Always visible on mobile, hover on desktop */}
              <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                {onEdit && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(txn);
                    }}
                    className="p-2 md:p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md transition-all"
                    title="Edit"
                  >
                    <Pencil size={16} className="md:w-3.5 md:h-3.5" />
                  </button>
                )}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(confirm('Delete this transaction?')) deleteTransaction(txn.id);
                  }}
                  className="p-2 md:p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
                  title="Delete"
                >
                  <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};