import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { formatCurrency, cn } from '../utils';
import { PieChart, Plus, Trash2, Pencil, Calendar, ArrowRight } from 'lucide-react';
import { CreateBudgetModal } from '../components/modals/CreateBudgetModal';
import { BudgetDetailsModal } from '../components/modals/BudgetDetailsModal';
import { Budget } from '../types';

export const BudgetsPage: React.FC = () => {
  const { budgets, transactions, deleteBudget } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  // Get current date details
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Calculate actual spend based on current period (Month or Year)
  const enrichedBudgets = budgets.map(b => {
    const spent = transactions
      .filter(t => {
        // 1. Must match category and be an expense
        if (t.category !== b.category || t.type !== 'expense') return false;
        
        // 2. Must match the budget period
        const tDate = new Date(t.date);
        if (b.period === 'monthly') {
          return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        } else {
          return tDate.getFullYear() === currentYear;
        }
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { ...b, spent };
  });

  const handleEdit = (e: React.MouseEvent, budget: Budget) => {
    e.stopPropagation();
    setBudgetToEdit(budget);
    setShowCreateModal(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(confirm('Are you sure you want to delete this budget?')) {
        deleteBudget(id);
    }
  }

  const handleCardClick = (budget: Budget) => {
      setSelectedBudget(budget);
      setShowDetailsModal(true);
  }

  const handleCloseCreate = () => {
    setShowCreateModal(false);
    setBudgetToEdit(null);
  };

  const currentMonthName = now.toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Budgets</h1>
          <div className="flex items-center text-slate-500 dark:text-slate-400 mt-1">
            <Calendar size={14} className="mr-1" />
            <span className="text-sm">Period: {currentMonthName} {currentYear}</span>
          </div>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          Create Budget
        </Button>
      </div>

      {enrichedBudgets.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <PieChart size={48} className="mx-auto text-slate-300 mb-4" />
           <p className="text-slate-500">No budgets set yet. Create one to start tracking.</p>
           <Button variant="secondary" className="mt-4" onClick={() => setShowCreateModal(true)}>Create First Budget</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrichedBudgets.map(budget => {
            const percent = Math.min((budget.spent / budget.limit) * 100, 100);
            const isOver = budget.spent > budget.limit;

            return (
              <Card 
                key={budget.id} 
                className="space-y-4 group relative cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-transparent hover:border-l-primary-500"
              >
                {/* Clickable Area Overlay */}
                <div className="absolute inset-0 z-0" onClick={() => handleCardClick(budget)}></div>

                {/* Actions: Absolute but container has right padding to avoid overlap if needed. Visible on Mobile. */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10">
                  <button 
                    onClick={(e) => handleEdit(e, budget)}
                    className="p-1.5 text-slate-400 hover:text-primary-500 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-200"
                    title="Edit Budget"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, budget.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:border-red-200"
                    title="Delete Budget"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex justify-between items-start pointer-events-none pr-16 md:pr-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <PieChart size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          {budget.category}
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      </h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{budget.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
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
                <div className="space-y-2 pointer-events-none">
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
      
      <CreateBudgetModal 
        isOpen={showCreateModal} 
        onClose={handleCloseCreate} 
        budgetToEdit={budgetToEdit}
      />

      <BudgetDetailsModal 
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        budget={selectedBudget}
      />
    </div>
  );
};