import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './Button';
import { Card } from './Card';

interface DateRangePickerProps {
  from: string;
  to: string;
  onChange: (range: { from: string; to: string }) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ from, to, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewDate, setViewDate] = useState(new Date()); // Tracks the month being viewed

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePreset = (preset: 'today' | 'week' | 'month' | 'lastMonth') => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    if (preset === 'today') {
      // already set
    } else if (preset === 'week') {
      start.setDate(today.getDate() - 7);
    } else if (preset === 'month') {
      start.setDate(1); // 1st of this month
    } else if (preset === 'lastMonth') {
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0); // Last day of previous month
    }

    onChange({
      from: start.toISOString().split('T')[0],
      to: end.toISOString().split('T')[0]
    });
    setIsOpen(false);
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ from: '', to: '' });
  };

  const displayText = from && to 
    ? `${new Date(from).toLocaleDateString(undefined, {month:'short', day:'numeric'})} - ${new Date(to).toLocaleDateString(undefined, {month:'short', day:'numeric'})}`
    : from 
        ? `From ${new Date(from).toLocaleDateString()}`
        : "Filter by Date";

  // Simple Calendar Grid Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDateStr = new Date(year, month, d).toISOString().split('T')[0];
      const isSelected = (from === currentDateStr || to === currentDateStr);
      const isInRange = from && to && currentDateStr > from && currentDateStr < to;

      days.push(
        <button
          key={d}
          onClick={() => {
            if (!from || (from && to)) {
              onChange({ from: currentDateStr, to: '' });
            } else {
              // Decide swap
              if (currentDateStr < from) {
                 onChange({ from: currentDateStr, to: from });
              } else {
                 onChange({ from: from, to: currentDateStr });
              }
            }
          }}
          className={cn(
            "w-8 h-8 rounded-full text-xs flex items-center justify-center transition-colors",
            isSelected ? "bg-primary-500 text-white" : "",
            isInRange ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-slate-100 dark:hover:bg-slate-700",
            !isSelected && !isInRange ? "text-slate-700 dark:text-slate-300" : ""
          )}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-colors w-full sm:w-auto min-w-[200px]"
      >
        <CalendarIcon size={16} className="text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-300 flex-1 text-left truncate">
          {displayText}
        </span>
        {(from || to) && (
          <div onClick={clearDate} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full">
            <X size={12} className="text-slate-400" />
          </div>
        )}
      </button>

      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 z-50 w-[300px] animate-in fade-in zoom-in-95 duration-200 p-4" padding="none">
          {/* Header & Nav */}
          <div className="flex items-center justify-between mb-4">
             <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <ChevronLeft size={16} />
             </button>
             <span className="font-semibold text-sm">
                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
             </span>
             <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <ChevronRight size={16} />
             </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 text-center mb-4">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <span key={d} className="text-xs text-slate-400 font-medium">{d}</span>
            ))}
            {renderCalendar()}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button onClick={() => handlePreset('today')} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600">Today</button>
            <button onClick={() => handlePreset('week')} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600">Last 7 Days</button>
            <button onClick={() => handlePreset('month')} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600">This Month</button>
            <button onClick={() => handlePreset('lastMonth')} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded hover:bg-slate-200 dark:hover:bg-slate-600">Last Month</button>
          </div>
        </Card>
      )}
    </div>
  );
};