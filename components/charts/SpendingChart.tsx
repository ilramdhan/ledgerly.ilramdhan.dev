import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils';

interface Props {
  data: any[];
}

export const SpendingChart: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-slate-400">No data available</div>;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3FB77F" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3FB77F" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B86E5" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#5B86E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6ECF1" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: '1px solid #E6ECF1',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
            formatter={(value: number) => formatCurrency(value)}
            labelStyle={{ color: '#64748b' }}
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="#3FB77F" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
            name="Income"
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke="#5B86E5" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExpense)" 
            name="Expense"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};