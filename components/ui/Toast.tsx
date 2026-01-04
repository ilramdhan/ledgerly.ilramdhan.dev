import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import { cn } from '../../utils';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-bottom-5 duration-300",
      type === 'success' 
        ? "bg-white dark:bg-slate-800 border-green-200 dark:border-green-900 text-slate-800 dark:text-slate-100"
        : "bg-white dark:bg-slate-800 border-red-200 dark:border-red-900 text-slate-800 dark:text-slate-100"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        type === 'success' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      )}>
        {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
      </div>
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-2">
        <X size={16} />
      </button>
    </div>
  );
};