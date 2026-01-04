import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  PieChart, 
  FileText, 
  Settings, 
  LogOut,
  Moon,
  Sun,
  Target,
  CalendarClock
} from 'lucide-react';
import { cn } from '../../utils';
import { PageRoute } from '../../types';
import { useData } from '../../contexts/DataContext';

interface SidebarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute, onNavigate, isDark, onToggleTheme }) => {
  const { logout } = useData();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'subscriptions', label: 'Subscriptions', icon: CalendarClock },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-500 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
            L
          </div>
          Ledgerly
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageRoute)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <button 
          onClick={onToggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};