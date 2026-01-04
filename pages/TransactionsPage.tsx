import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TransactionList } from '../components/data/TransactionList';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { AddTransactionModal } from '../components/modals/AddTransactionModal';
import { exportToCSV } from '../utils';
import { Transaction } from '../types';

export const TransactionsPage: React.FC = () => {
  const { transactions } = useData();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.merchant.toLowerCase().includes(search.toLowerCase()) || 
                            t.category.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [search, filterType, transactions]);

  const handleExport = () => {
    exportToCSV(filteredData, `ledgerly_transactions_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleEdit = (txn: Transaction) => {
    setTransactionToEdit(txn);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setTransactionToEdit(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {filteredData.length} entries found
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={16} className="mr-2" /> 
            Export
          </Button>
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={16} className="mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <Card className="flex-shrink-0" padding="sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search merchants, categories..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'expense', 'income', 'transfer'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  filterType === type 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-750'
                }`}
              >
                {type}
              </button>
            ))}
            <Button variant="secondary" className="px-3"><Filter size={18} /></Button>
          </div>
        </div>
      </Card>

      <Card className="flex-1 overflow-hidden flex flex-col" padding="none">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 grid grid-cols-12 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-6 md:col-span-5">Details</div>
          <div className="col-span-6 md:col-span-7 text-right">Amount / Status</div>
        </div>
        <div className="overflow-y-auto custom-scroll flex-1">
           <TransactionList transactions={filteredData} onEdit={handleEdit} />
           {filteredData.length === 0 && (
             <div className="p-12 text-center text-slate-500">
               No transactions found matching your criteria.
             </div>
           )}
        </div>
      </Card>
      
      <AddTransactionModal 
        isOpen={showAddModal} 
        onClose={handleCloseModal} 
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
};