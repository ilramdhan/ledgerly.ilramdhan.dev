import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { CATEGORIES } from '../../constants';
import { Budget } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  budgetToEdit?: Budget | null;
}

export const CreateBudgetModal: React.FC<Props> = ({ isOpen, onClose, budgetToEdit }) => {
  const { addBudget, editBudget } = useData();
  const [formData, setFormData] = useState({
    category: CATEGORIES[0],
    limit: '',
    period: 'monthly' as 'monthly' | 'yearly'
  });

  useEffect(() => {
    if (isOpen) {
      if (budgetToEdit) {
        setFormData({
          category: budgetToEdit.category,
          limit: budgetToEdit.limit.toString(),
          period: budgetToEdit.period
        });
      } else {
        setFormData({ category: CATEGORIES[0], limit: '', period: 'monthly' });
      }
    }
  }, [isOpen, budgetToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetToEdit) {
      editBudget(budgetToEdit.id, {
        category: formData.category,
        limit: parseFloat(formData.limit) || 0,
        period: formData.period
      });
    } else {
      addBudget({
        category: formData.category,
        limit: parseFloat(formData.limit) || 0,
        period: formData.period
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
          {budgetToEdit ? 'Edit Budget' : 'New Budget'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Spending Limit</label>
            <input 
              required
              type="number" 
              step="1"
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. 500"
              value={formData.limit}
              onChange={e => setFormData({...formData, limit: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Period</label>
             <select 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.period}
              onChange={e => setFormData({...formData, period: e.target.value as any})}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="pt-2">
            <Button className="w-full" type="submit">
              {budgetToEdit ? 'Save Changes' : 'Set Budget'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};