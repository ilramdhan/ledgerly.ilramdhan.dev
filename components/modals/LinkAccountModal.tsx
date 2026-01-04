import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { AccountType, Account } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accountToEdit?: Account | null;
}

export const LinkAccountModal: React.FC<Props> = ({ isOpen, onClose, accountToEdit }) => {
  const { addAccount, editAccount } = useData();
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank' as AccountType,
    balance: '',
    currency: 'USD',
    institution: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (accountToEdit) {
        setFormData({
          name: accountToEdit.name,
          type: accountToEdit.type,
          balance: accountToEdit.balance.toString(),
          currency: accountToEdit.currency,
          institution: accountToEdit.institution || ''
        });
      } else {
        setFormData({ name: '', type: 'bank', balance: '', currency: 'USD', institution: '' });
      }
    }
  }, [isOpen, accountToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountToEdit) {
      editAccount(accountToEdit.id, {
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance) || 0,
        currency: formData.currency,
        institution: formData.institution || undefined
      });
    } else {
      addAccount({
        name: formData.name,
        type: formData.type,
        balance: parseFloat(formData.balance) || 0,
        currency: formData.currency,
        institution: formData.institution || undefined
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          {accountToEdit ? 'Edit Account' : 'Link Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Name</label>
            <input 
              required
              type="text" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. Chase Checking"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Type</label>
            <select 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as AccountType})}
            >
              <option value="bank">Bank</option>
              <option value="credit">Credit Card</option>
              <option value="cash">Cash / Wallet</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Balance</label>
            <input 
              required
              type="number" 
              step="0.01"
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="0.00"
              value={formData.balance}
              onChange={e => setFormData({...formData, balance: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Institution Name (Optional)</label>
             <input 
              type="text" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. Bank of America"
              value={formData.institution}
              onChange={e => setFormData({...formData, institution: e.target.value})}
            />
          </div>

          <div className="pt-2">
            <Button className="w-full" type="submit">
              {accountToEdit ? 'Save Changes' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};