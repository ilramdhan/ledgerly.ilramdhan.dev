import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { formatCurrency, cn } from '../utils';
import { PieChart, Plus, Trash2 } from 'lucide-react';
import { CreateBudgetModal } from '../components/modals/CreateBudgetModal';

export const BudgetsPage: React.FC = () => {
  const { budgets, transactions, deleteBudget } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Calculate actual spend based on real transactions for each budget category
  const enrichedBudgets = budgets.map(b => {
    // In a real app, filter by current month
    const spent = transactions
      .filter(t => t.category === b.category && t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { ...b, spent };
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Monthly Budgets</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your spending limits.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          Create Budget
        </Button>
      </div>

      {enrichedBudgets.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <p className="text-slate-500">No budgets set yet. Create one to start tracking.</p>
           <Button variant="secondary" className="mt-4" onClick={() => setShowCreateModal(true)}>Create First Budget</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrichedBudgets.map(budget => {
            const percent = Math.min((budget.spent / budget.limit) * 100, 100);
            const isOver = budget.spent > budget.limit;

            return (
              <Card key={budget.id} className="space-y-4 group relative">
                <button 
                  onClick={() => deleteBudget(budget.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Budget"
                >
                  <Trash2 size={16} />
                </button>

                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <PieChart size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{budget.category}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{budget.period}</p>
                    </div>
                  </div>
                  <div className="text-right mr-6 md:mr-0">
                    <span className={cn(
                      "font-bold block tabular-nums",
                      isOver ? "text-red-500" : "text-slate-900 dark:text-white"
                    )}>
                      {formatCurrency(budget.spent)}
                    </span>
                    <span className="text-xs text-slate-400">of {formatCurrency(budget.limit)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000", isOver ? "bg-red-500" : "bg-primary-500")} 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isOver ? "text-red-500" : "text-slate-500"}>
                      {percent.toFixed(0)}% used
                    </span>
                    <span className="text-slate-400">
                      {formatCurrency(Math.max(0, budget.limit - budget.spent))} remaining
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      
      <CreateBudgetModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};