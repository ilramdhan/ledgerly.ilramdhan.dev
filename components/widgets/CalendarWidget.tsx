import React from 'react';
import { useData } from '../../contexts/DataContext';
import { cn } from '../../utils';
import { Card } from '../ui/Card';
import { ChevronRight } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const { transactions } = useData();
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Find recurring expenses
  const recurring = transactions.filter(t => t.isRecurring && t.type === 'expense');

  // Map dates to transactions
  const daysWithPayments = new Map<number, number>(); // day -> count
  recurring.forEach(t => {
     const tDate = new Date(t.date);
     // Simple projection: assumes monthly payments on same day of month
     const day = tDate.getDate();
     daysWithPayments.set(day, (daysWithPayments.get(day) || 0) + 1);
  });

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOffset = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  const days = [];
  // Empty slots for start offset
  for (let i = 0; i < startDayOffset; i++) {
    days.push(<div key={`empty-${i}`} className="h-6" />);
  }
  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate();
    const paymentCount = daysWithPayments.get(d);
    
    days.push(
      <div key={d} className="flex flex-col items-center justify-center h-6 relative group cursor-default">
        <span className={cn(
            "text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10 transition-colors",
            isToday 
                ? "bg-primary-500 text-white font-bold" 
                : paymentCount 
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        )}>
            {d}
        </span>
        {paymentCount && (
            <div className="absolute -bottom-0.5 w-1 h-1 bg-red-500 rounded-full" />
        )}
      </div>
    );
  }

  return (
    <Card className="flex flex-col" padding="sm">
        <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Upcoming Bills</h3>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{today.toLocaleString('default', {month:'short'})}</span>
        </div>
        
        <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
             {['S','M','T','W','T','F','S'].map(d => (
                <span key={d} className="text-[9px] text-slate-400 font-bold uppercase">{d}</span>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-2">
            {days}
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-1.5">
            {recurring.length > 0 ? recurring.slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="truncate flex-1 font-medium">{t.merchant}</span>
                    <span className="text-slate-400 text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">
                        {new Date(t.date).getDate()}th
                    </span>
                </div>
            )) : (
                <div className="text-xs text-slate-400 text-center py-1">No upcoming bills</div>
            )}
        </div>
    </Card>
  );
};