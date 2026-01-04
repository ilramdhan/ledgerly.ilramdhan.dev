import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';
import { Goal } from '../../types';
import { formatCurrency } from '../../utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
}

export const AddMoneyModal: React.FC<Props> = ({ isOpen, onClose, goal }) => {
  const { updateGoal } = useData();
  const [amount, setAmount] = useState('');

  if (!isOpen || !goal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoal(goal.id, parseFloat(amount));
    onClose();
    setAmount('');
  };

  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Add to {goal.name}</h2>
        <p className="text-sm text-slate-500 mb-4">
            Current: {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount to Add</label>
            <input 
              required
              type="number" 
              step="1"
              autoFocus
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder={`Remaining: ${remaining}`}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button className="w-full" type="submit">Add Money</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};