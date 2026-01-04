import React, { useMemo, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { formatCurrency, formatDate } from '../utils';
import { CalendarClock, Zap, Tv, Music, Smartphone, ShieldCheck, ArrowRight, Plus, Trash2, Pencil } from 'lucide-react';
import { AddTransactionModal } from '../components/modals/AddTransactionModal';
import { Transaction } from '../types';

export const SubscriptionsPage: React.FC = () => {
  const { transactions, deleteTransaction } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [subToEdit, setSubToEdit] = useState<Transaction | null>(null);

  // Filter for recurring transactions only
  const subscriptions = useMemo(() => {
    return transactions.filter(t => t.isRecurring)
      .sort((a, b) => b.date.localeCompare(a.date)); // Newest first
  }, [transactions]);

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Math.abs(sub.amount), 0);

  function getNextMonthDate(dateStr: string) {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  }

  function getIcon(merchant: string, category: string) {
    const m = merchant.toLowerCase();
    if (m.includes('netflix') || m.includes('tv') || m.includes('hulu')) return <Tv size={20} />;
    if (m.includes('spotify') || m.includes('music')) return <Music size={20} />;
    if (m.includes('utility') || m.includes('electric') || category === 'Utilities') return <Zap size={20} />;
    if (m.includes('insurance')) return <ShieldCheck size={20} />;
    return <Smartphone size={20} />;
  }

  const handleEdit = (sub: Transaction) => {
    setSubToEdit(sub);
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setSubToEdit(null);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subscriptions</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage recurring payments and bills.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" />
          Add Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Active Subscriptions</h3>
          {subscriptions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              No subscriptions found. <br/> Add a recurring expense to track it here.
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="group relative flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-600">
                      {getIcon(sub.merchant, sub.category)}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">{sub.merchant}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <span>Monthly</span>
                        <span>•</span>
                        <span>Last paid: {formatDate(sub.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(Math.abs(sub.amount))}
                    </span>
                    <div className="text-xs text-slate-400">Next: {formatDate(getNextMonthDate(sub.date))}</div>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 flex gap-2 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 p-1 rounded-md shadow-md border border-slate-200 dark:border-slate-600 transition-all">
                     <button 
                       onClick={() => handleEdit(sub)}
                       className="p-1.5 text-slate-400 hover:text-primary-500 rounded-md"
                       title="Edit"
                     >
                       <Pencil size={14} />
                     </button>
                     <button 
                       onClick={() => {
                         if(confirm('Stop tracking this subscription? This will delete the transaction record.')) deleteTransaction(sub.id);
                       }}
                       className="p-1.5 text-slate-400 hover:text-red-500 rounded-md"
                       title="Delete"
                     >
                       <Trash2 size={14} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary-600 text-white border-none">
            <h3 className="text-primary-100 text-sm font-medium mb-1">Total Monthly Cost</h3>
            <div className="text-3xl font-bold mb-4">{formatCurrency(totalMonthly)}</div>
            <p className="text-sm text-primary-100 opacity-90">
              You are spending about <strong>{formatCurrency(totalMonthly * 12)}</strong> per year on subscriptions.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Upcoming Payments</h3>
            {subscriptions.length > 0 ? (
                <div className="space-y-4">
                {subscriptions.slice(0, 3).map((sub, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400 truncate max-w-[120px]">{sub.merchant}</span>
                    <span className="font-medium text-slate-900 dark:text-white tabular-nums">{formatDate(getNextMonthDate(sub.date))}</span>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-xs text-slate-400">No upcoming payments.</p>
            )}
            
            <Button variant="secondary" className="w-full mt-4 text-xs">
              View Calendar <ArrowRight size={14} className="ml-1" />
            </Button>
          </Card>
        </div>
      </div>

      <AddTransactionModal 
        isOpen={showAddModal} 
        onClose={handleClose} 
        transactionToEdit={subToEdit}
        defaultRecurring={true}
      />
    </div>
  );
};