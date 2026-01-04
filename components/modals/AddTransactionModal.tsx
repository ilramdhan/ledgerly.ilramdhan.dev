import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Calendar, CalendarClock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { TransactionType, Transaction } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Transaction> | null;
  transactionToEdit?: Transaction | null;
  defaultRecurring?: boolean;
}

export const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, initialData, transactionToEdit, defaultRecurring = false }) => {
  const { accounts, categories, addTransaction, editTransaction } = useData();
  const [formData, setFormData] = useState({
    amount: '',
    merchant: '',
    category: '',
    accountId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as TransactionType,
    isRecurring: false,
    recurringPeriod: 'monthly' as 'monthly' | 'yearly'
  });

  // Load defaults
  useEffect(() => {
    if (isOpen) {
        // Ensure we have a default category/account if not set
        const defaultCat = categories[0] || 'Uncategorized';
        const defaultAcc = accounts[0]?.id || '';

        if (transactionToEdit) {
            setFormData({
                amount: Math.abs(transactionToEdit.amount).toString(),
                merchant: transactionToEdit.merchant,
                category: transactionToEdit.category,
                accountId: transactionToEdit.accountId,
                date: transactionToEdit.date,
                type: transactionToEdit.type,
                isRecurring: transactionToEdit.isRecurring || false,
                recurringPeriod: transactionToEdit.recurringPeriod || 'monthly'
            });
        } else if (initialData) {
            setFormData(prev => ({
                ...prev,
                merchant: initialData.merchant || '',
                amount: initialData.amount ? Math.abs(initialData.amount).toString() : '',
                date: initialData.date || prev.date,
                category: prev.category || defaultCat,
                accountId: prev.accountId || defaultAcc,
                type: (initialData.amount && initialData.amount > 0) ? 'income' : 'expense',
                isRecurring: initialData.isRecurring || defaultRecurring,
                recurringPeriod: 'monthly'
            }));
        } else {
            setFormData({
                amount: '',
                merchant: '',
                category: defaultCat,
                accountId: defaultAcc,
                date: new Date().toISOString().split('T')[0],
                type: 'expense',
                isRecurring: defaultRecurring,
                recurringPeriod: 'monthly'
            });
        }
    }
  }, [isOpen, initialData, transactionToEdit, accounts, categories, defaultRecurring]);

  // If type changes to income/transfer, force recurring to false
  useEffect(() => {
    if (formData.type !== 'expense' && formData.isRecurring) {
        setFormData(prev => ({ ...prev, isRecurring: false }));
    }
  }, [formData.type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount);
    
    // Auto-negate expense if user didn't type negative sign
    const finalAmount = formData.type === 'expense' ? -Math.abs(amountNum) : Math.abs(amountNum);

    const payload = {
        merchant: formData.merchant,
        amount: finalAmount,
        date: formData.date,
        category: formData.category,
        accountId: formData.accountId,
        currency: 'USD',
        type: formData.type,
        isRecurring: formData.type === 'expense' ? formData.isRecurring : false,
        recurringPeriod: formData.type === 'expense' && formData.isRecurring ? formData.recurringPeriod : undefined
    };

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  const isEdit = !!transactionToEdit;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop Layer */}
      <div 
        className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm m-0 p-0" 
        onClick={onClose}
      />
      
      {/* Content Layout Layer */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Card className="w-full max-w-md relative shadow-2xl transform transition-all text-left">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
              {['expense', 'income', 'transfer'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({...formData, type: t as TransactionType})}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    formData.type === t 
                      ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="0.00"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description / Merchant</label>
              <input 
                required
                type="text" 
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="e.g. Starbucks, Salary"
                value={formData.merchant}
                onChange={e => setFormData({...formData, merchant: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select 
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account</label>
              <select 
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={formData.accountId}
                onChange={e => setFormData({...formData, accountId: e.target.value})}
              >
                {accounts.map(a => <option key={a.id} value={a.id}>{a.name} ({a.currency})</option>)}
              </select>
            </div>

            {/* Recurring Settings - Only for Expenses */}
            {formData.type === 'expense' && (
                <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
                    <div 
                        className="flex items-center gap-2 cursor-pointer mb-3" 
                        onClick={() => setFormData(p => ({...p, isRecurring: !p.isRecurring}))}
                    >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.isRecurring ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                            {formData.isRecurring && <RefreshCw size={12} />}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 select-none">Mark as Subscription</span>
                    </div>

                    {formData.isRecurring && (
                        <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2">
                             <button
                                type="button"
                                onClick={() => setFormData(p => ({...p, recurringPeriod: 'monthly'}))}
                                className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                                    formData.recurringPeriod === 'monthly'
                                    ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300 ring-1 ring-primary-500'
                                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                                }`}
                             >
                                <Calendar size={14} /> Monthly
                             </button>
                             <button
                                type="button"
                                onClick={() => setFormData(p => ({...p, recurringPeriod: 'yearly'}))}
                                className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                                    formData.recurringPeriod === 'yearly'
                                    ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300 ring-1 ring-primary-500'
                                    : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                                }`}
                             >
                                <CalendarClock size={14} /> Yearly
                             </button>
                        </div>
                    )}
                </div>
            )}

            <div className="pt-2">
              <Button className="w-full" type="submit">
                {isEdit ? 'Update Transaction' : 'Add Transaction'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};