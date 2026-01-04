import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SpendingChart } from '../components/charts/SpendingChart';
import { TransactionList } from '../components/data/TransactionList';
import { formatCurrency, cn, getChartData } from '../utils';
import { TrendingUp, TrendingDown, Wallet, ArrowRight, ScanLine, Plus, Trash2, Pencil, Crown } from 'lucide-react';
import { StubOCR } from '../components/StubOCR';
import { useData } from '../contexts/DataContext';
import { AddTransactionModal } from '../components/modals/AddTransactionModal';
import { LinkAccountModal } from '../components/modals/LinkAccountModal';
import { CalendarWidget } from '../components/widgets/CalendarWidget';
import { Transaction, Account, PageRoute } from '../types';

interface DashboardProps {
  onNavigate: (route: PageRoute) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { metrics, transactions, accounts, user, deleteAccount } = useData();
  const [showOCR, setShowOCR] = useState(false);
  const [showAddTxn, setShowAddTxn] = useState(false);
  const [showLinkAccount, setShowLinkAccount] = useState(false);
  const [chartRange, setChartRange] = useState(7);
  const [ocrData, setOcrData] = useState<any>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);

  // Dynamic Chart Data based on selection
  const chartData = useMemo(() => {
    return getChartData(transactions, chartRange);
  }, [transactions, chartRange]);

  // Handle OCR Result
  const handleScanComplete = (data: any) => {
    setOcrData(data);
    setShowOCR(false);
    setShowAddTxn(true); // Open modal with data
  };

  const handleEditTxn = (txn: Transaction) => {
    setTransactionToEdit(txn);
    setShowAddTxn(true);
  }

  const handleCloseAddTxn = () => {
    setShowAddTxn(false);
    setOcrData(null);
    setTransactionToEdit(null);
  }

  const handleEditAccount = (acc: Account) => {
    setAccountToEdit(acc);
    setShowLinkAccount(true);
  }

  const handleCloseLinkAccount = () => {
    setShowLinkAccount(false);
    setAccountToEdit(null);
  }

  const handleProUpgrade = () => {
      // In a real app, this would redirect to Stripe or open a modal
      alert("Redirecting to payment gateway...");
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good Morning, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's your real-time financial overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowOCR(true)}>
            <ScanLine className="mr-2 h-4 w-4" />
            Scan Receipt
          </Button>
          <Button onClick={() => setShowAddTxn(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Row 1: Key Metrics (Full Width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, i) => (
        <Card key={i} className="relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</span>
            <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full flex items-center",
                metric.trend === 'up' ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                metric.trend === 'down' ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                "bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            )}>
                {metric.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : 
                metric.trend === 'down' ? <TrendingDown size={12} className="mr-1" /> : null}
                {Math.abs(metric.change)}%
            </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {formatCurrency(metric.value)}
            </div>
            <div className="h-1 mt-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500" style={{ width: '65%' }}></div>
            </div>
        </Card>
        ))}
      </div>

      {/* Row 2: Main Content (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Chart & Transactions) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Cash Flow</h3>
              <select 
                className="text-sm border-none bg-slate-50 dark:bg-slate-700 rounded-md px-3 py-1 text-slate-600 dark:text-slate-300 focus:ring-0 focus:outline-none cursor-pointer"
                value={chartRange}
                onChange={(e) => setChartRange(Number(e.target.value))}
              >
                <option value={7}>Last 7 Days</option>
                <option value={30}>Last 30 Days</option>
              </select>
            </div>
            <SpendingChart data={chartData} />
          </Card>

          <Card padding="none">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">Recent Transactions</h3>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('transactions')}>
                View All <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
            {/* Limit set to 6 for balance */}
            <TransactionList transactions={transactions} limit={6} onEdit={handleEditTxn} />
          </Card>
        </div>

        {/* Right Column (Widgets & Accounts) */}
        <div className="space-y-6">
            
          {/* 1. Pro Feature Banner (Top Visibility) */}
          <Card className="bg-gradient-to-br from-primary-600 to-indigo-700 text-white border-none shadow-lg shadow-primary-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Crown size={20} className="text-yellow-300" />
                    <h3 className="font-bold text-lg">Go Pro</h3>
                </div>
                <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                    Unlock unlimited budgets, AI receipts, and advanced exports.
                </p>
                <button 
                    onClick={handleProUpgrade}
                    className="w-full py-2.5 px-4 bg-white text-primary-700 font-bold rounded-lg text-sm hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                    Upgrade Now
                </button>
            </div>
          </Card>

          {/* 2. Accounts List (Moved UP for better utility) */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">My Accounts</h3>
              <Button variant="ghost" size="icon"><Wallet size={18} /></Button>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scroll pr-1">
              {accounts.map(account => (
                <div key={account.id} className="group p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 transition-colors bg-slate-50/50 dark:bg-slate-800/50 relative">
                  <div className="flex justify-between mb-1 pr-14 md:pr-0">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate pr-2">{account.name}</span>
                    <span className={cn("text-xs flex-shrink-0", account.lastSynced.includes('d') ? "text-red-400" : "text-green-500")}>
                      {account.lastSynced}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-slate-500 uppercase">{account.type}</span>
                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(account.balance, account.currency)}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
                     <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAccount(account);
                      }}
                      className="p-1.5 text-slate-400 hover:text-primary-500 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-100 dark:border-slate-700"
                    >
                      <Pencil size={12} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm(`Remove account ${account.name}?`)) deleteAccount(account.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-100 dark:border-slate-700"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="w-full mt-4" onClick={() => setShowLinkAccount(true)}>
              Link New Account
            </Button>
          </Card>

          {/* 3. Calendar Widget (Moved DOWN and Compacted) */}
          <div className="h-auto">
             <CalendarWidget />
          </div>

        </div>
      </div>
      
      {showOCR && <StubOCR onScanComplete={handleScanComplete} onClose={() => setShowOCR(false)} />}
      <AddTransactionModal 
        isOpen={showAddTxn} 
        onClose={handleCloseAddTxn} 
        initialData={ocrData}
        transactionToEdit={transactionToEdit}
      />
      <LinkAccountModal 
        isOpen={showLinkAccount} 
        onClose={handleCloseLinkAccount} 
        accountToEdit={accountToEdit}
      />
    </div>
  );
};