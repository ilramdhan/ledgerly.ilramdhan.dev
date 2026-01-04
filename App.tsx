import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { GoalsPage } from './pages/GoalsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { PageRoute } from './types';
import { Menu, X } from 'lucide-react';
import { cn } from './utils';
import { DataProvider, useData } from './contexts/DataContext';
import { Toast } from './components/ui/Toast';

const AppContent: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<PageRoute>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const { toast, hideToast } = useData();

  // Initialize theme based on system pref
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch(activeRoute) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <TransactionsPage />;
      case 'budgets': return <BudgetsPage />;
      case 'goals': return <GoalsPage />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      default: return (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p>The {activeRoute} module is under construction.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FB] dark:bg-[#0F1724]">
      {/* Desktop Sidebar */}
      <Sidebar 
        activeRoute={activeRoute} 
        onNavigate={setActiveRoute} 
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-40 px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg text-primary-600">Ledgerly</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-slate-800 z-30 pt-20 px-6 space-y-4 md:hidden animate-in slide-in-from-top-10 duration-200">
          {['dashboard', 'transactions', 'budgets', 'goals', 'reports', 'settings'].map((route) => (
            <button
              key={route}
              onClick={() => {
                setActiveRoute(route as PageRoute);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full text-left py-3 px-4 rounded-lg text-lg font-medium capitalize",
                activeRoute === route 
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20" 
                  : "text-slate-600 dark:text-slate-400"
              )}
            >
              {route}
            </button>
          ))}
           <button onClick={toggleTheme} className="w-full text-left py-3 px-4 rounded-lg text-lg font-medium text-slate-600 dark:text-slate-400 mt-8 border-t border-slate-100 dark:border-slate-700">
            {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden pt-20 md:pt-8 relative">
        {renderContent()}
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;