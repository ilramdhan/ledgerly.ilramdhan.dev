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
    days.push(<div key={`empty-${i}`} className="h-8" />);
  }
  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate();
    const paymentCount = daysWithPayments.get(d);
    
    days.push(
      <div key={d} className="flex flex-col items-center justify-center h-8 relative">
        <span className={cn(
            "text-xs w-6 h-6 flex items-center justify-center rounded-full z-10",
            isToday ? "bg-primary-500 text-white font-bold" : "text-slate-700 dark:text-slate-300"
        )}>
            {d}
        </span>
        {paymentCount && (
            <div className="absolute bottom-0 w-1 h-1 bg-red-500 rounded-full" title={`${paymentCount} payment(s)`} />
        )}
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-full" padding="md">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Upcoming</h3>
            <span className="text-xs text-slate-500">{today.toLocaleString('default', {month:'long'})}</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
             {['S','M','T','W','T','F','S'].map(d => (
                <span key={d} className="text-[10px] text-slate-400 font-medium">{d}</span>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
            {days}
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-2">
            {recurring.slice(0, 2).map(t => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="truncate flex-1">{t.merchant}</span>
                    <span className="text-slate-400">{new Date(t.date).getDate()}th</span>
                </div>
            ))}
        </div>
    </Card>
  );
};