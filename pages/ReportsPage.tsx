import React, { useMemo, useState } from 'react';
import { Card } from '../components/ui/Card';
import { useData } from '../contexts/DataContext';
import { formatCurrency, exportToPDF, getMonthlyTrendData } from '../utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Button } from '../components/ui/Button';
import { Download } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { transactions } = useData();
  const [reportType, setReportType] = useState<'expense' | 'income'>('expense');

  // Logic for Pie Chart
  const filteredTransactions = useMemo(() => {
     return transactions.filter(t => t.type === reportType);
  }, [transactions, reportType]);

  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};
    
    filteredTransactions.forEach(t => {
      const cat = t.category || 'Uncategorized';
      grouped[cat] = (grouped[cat] || 0) + Math.abs(t.amount);
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Logic for Bar Chart (Trend)
  const trendData = useMemo(() => {
    return getMonthlyTrendData(transactions);
  }, [transactions]);

  const COLORS = ['#5B86E5', '#3FB77F', '#F6C85F', '#EF6B6B', '#8EA6FF', '#A6B0BD'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Financial Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Deep dive into your financial health.</p>
        </div>
        
        <div className="flex gap-3">
            <Button size="sm" variant="secondary" onClick={() => exportToPDF(filteredTransactions, `Financial Report`)}>
                <Download size={16} className="mr-2" /> Export PDF
            </Button>
        </div>
      </div>

      {/* New Section: Monthly Trend Analysis */}
      <Card>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Income vs Expense (Last 6 Months)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6ECF1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend verticalAlign="top" height={36} iconType="circle"/>
                <Bar dataKey="income" name="Income" fill="#3FB77F" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="expense" name="Expense" fill="#EF6B6B" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white capitalize">Spending Distribution</h3>
              <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
                <button
                    onClick={() => setReportType('expense')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${reportType === 'expense' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}
                >
                    Expense
                </button>
                <button
                    onClick={() => setReportType('income')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${reportType === 'income' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}
                >
                    Income
                </button>
              </div>
          </div>
          
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
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 capitalize">Top Categories Breakdown</h3>
          <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scroll pr-2">
            {categoryData.length > 0 ? categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="font-medium text-slate-700 dark:text-slate-200">{cat.name}</span>
                </div>
                <div className="text-right">
                    <span className="font-mono font-medium text-slate-900 dark:text-white tabular-nums block">
                    {formatCurrency(cat.value)}
                    </span>
                    <span className="text-xs text-slate-400">
                        {((cat.value / categoryData.reduce((a,b) => a+b.value, 0)) * 100).toFixed(1)}%
                    </span>
                </div>
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