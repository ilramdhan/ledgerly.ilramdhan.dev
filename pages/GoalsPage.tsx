import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { formatCurrency, formatDate, cn } from '../utils';
import { Plus, Target, Trash2, Calendar, Trophy, Pencil } from 'lucide-react';
import { CreateGoalModal } from '../components/modals/CreateGoalModal';
import { AddMoneyModal } from '../components/modals/AddMoneyModal';
import { Goal } from '../types';

export const GoalsPage: React.FC = () => {
  const { goals, deleteGoal } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null); // For Adding Money
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null); // For Editing

  const handleEdit = (goal: Goal) => {
    setGoalToEdit(goal);
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
    setGoalToEdit(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Savings Goals</h1>
          <p className="text-slate-500 dark:text-slate-400">Dream big, save smart.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          New Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <Target size={48} className="mx-auto text-slate-300 mb-4" />
           <p className="text-slate-500">No active goals. Set a target to start saving.</p>
           <Button variant="secondary" className="mt-4" onClick={() => setShowCreateModal(true)}>Create Goal</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map(goal => {
            const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isCompleted = percent >= 100;

            return (
              <Card key={goal.id} className="relative group flex flex-col h-full" padding="lg">
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleEdit(goal)}
                    className="p-1.5 text-slate-300 hover:text-primary-500 bg-white dark:bg-slate-800 rounded-md shadow-sm"
                    title="Edit Goal"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 bg-white dark:bg-slate-800 rounded-md shadow-sm"
                    title="Delete Goal"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: goal.color }}
                  >
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{goal.name}</h3>
                    {goal.deadline && (
                      <div className="flex items-center text-xs text-slate-500 mt-1">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(goal.deadline)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 mb-6">
                   <div className="flex justify-between items-end">
                     <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                       {formatCurrency(goal.currentAmount)}
                     </span>
                     <span className="text-sm text-slate-500 mb-1">
                       of {formatCurrency(goal.targetAmount)}
                     </span>
                   </div>
                   <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                     <div 
                       className="h-full rounded-full transition-all duration-1000"
                       style={{ width: `${percent}%`, backgroundColor: goal.color }}
                     />
                   </div>
                   <div className="text-right text-xs font-semibold" style={{ color: goal.color }}>
                     {percent.toFixed(0)}%
                   </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                  {isCompleted ? (
                    <div className="w-full py-2 bg-green-50 text-green-700 rounded-lg text-center font-medium text-sm">
                      Goal Reached! 🎉
                    </div>
                  ) : (
                     <Button 
                       variant="secondary" 
                       className="w-full" 
                       size="sm"
                       onClick={() => setSelectedGoal(goal)}
                     >
                       Add Money
                     </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
      
      <CreateGoalModal 
        isOpen={showCreateModal} 
        onClose={handleCloseCreate} 
        goalToEdit={goalToEdit}
      />
      <AddMoneyModal isOpen={!!selectedGoal} onClose={() => setSelectedGoal(null)} goal={selectedGoal} />
    </div>
  );
};