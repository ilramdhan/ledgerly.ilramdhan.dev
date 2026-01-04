import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useData } from '../../contexts/DataContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = ['#3FB77F', '#5B86E5', '#F6C85F', '#EF6B6B', '#8EA6FF'];

export const CreateGoalModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addGoal } = useData();
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    color: COLORS[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount) || 0,
      deadline: formData.deadline || undefined,
      color: formData.color
    });
    onClose();
    setFormData({ name: '', targetAmount: '', deadline: '', color: COLORS[0] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <Card className="w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">New Savings Goal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Goal Name</label>
            <input 
              required
              type="text" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. New Car, Bali Trip"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Amount</label>
            <input 
              required
              type="number" 
              step="1"
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="e.g. 5000"
              value={formData.targetAmount}
              onChange={e => setFormData({...formData, targetAmount: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Date (Optional)</label>
            <input 
              type="date" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={formData.deadline}
              onChange={e => setFormData({...formData, deadline: e.target.value})}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color Tag</label>
             <div className="flex gap-2">
               {COLORS.map(c => (
                 <button
                   key={c}
                   type="button"
                   onClick={() => setFormData({...formData, color: c})}
                   className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === c ? 'border-slate-500 scale-110' : 'border-transparent'}`}
                   style={{ backgroundColor: c }}
                 />
               ))}
             </div>
          </div>

          <div className="pt-2">
            <Button className="w-full" type="submit">Create Goal</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};