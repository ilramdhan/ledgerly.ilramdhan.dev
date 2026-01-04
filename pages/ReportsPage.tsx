import React, { useMemo, useState } from 'react';
import { Card } from '../components/ui/Card';
import { useData } from '../contexts/DataContext';
import { formatCurrency } from '../utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const ReportsPage: React.FC = () => {
  const { transactions } = useData();
  const [reportType, setReportType] = useState<'expense' | 'income'>('expense');

  const categoryData = useMemo(() => {
    const filtered = transactions.filter(t => t.type === reportType);
    const grouped: Record<string, number> = {};
    
    filtered.forEach(t => {
      const cat = t.category || 'Uncategorized';
      grouped[cat] = (grouped[cat] || 0) + Math.abs(t.amount);
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, reportType]);

  const COLORS = ['#5B86E5', '#3FB77F', '#F6C85F', '#EF6B6B', '#8EA6FF', '#A6B0BD'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Breakdown by category.</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
          <button
            onClick={() => setReportType('expense')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              reportType === 'expense' 
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setReportType('income')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              reportType === 'income' 
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 capitalize">{reportType} by Category</h3>
          
          {categoryData.length > 0 ? (
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     formatter={(value: number) => formatCurrency(value)}
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="flex-1 flex items-center justify-center text-slate-400">
               No data available for {reportType}
             </div>
          )}
        </Card>

        <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 capitalize">Top {reportType} Categories</h3>
          <div className="space-y-4">
            {categoryData.length > 0 ? categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="font-medium text-slate-700 dark:text-slate-200">{cat.name}</span>
                </div>
                <span className="font-mono font-medium text-slate-900 dark:text-white tabular-nums">
                  {formatCurrency(cat.value)}
                </span>
              </div>
            )) : (
              <p className="text-slate-400 text-sm">No transactions found.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};