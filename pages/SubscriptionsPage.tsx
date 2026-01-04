import React, { useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { formatCurrency, formatDate } from '../utils';
import { CalendarClock, Zap, Tv, Music, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

export const SubscriptionsPage: React.FC = () => {
  const { transactions } = useData();

  // Find recurring-like transactions based on simple heuristics (same merchant, multiple times)
  // In a real app, this would be explicit. Here we mock it or filter by a flag.
  // For this demo, we'll assume transactions with 'Subscription' in name or specific categories are recurring.
  const subscriptions = useMemo(() => {
    return transactions.filter(t => 
      t.merchant.includes('Netflix') || 
      t.merchant.includes('Spotify') || 
      t.merchant.includes('Internet') ||
      t.category === 'Utilities' ||
      t.category === 'Entertainment'
    ).reduce((acc: any[], curr) => {
      // Deduplicate to find unique subscriptions, showing latest date
      const existing = acc.find(item => item.merchant === curr.merchant);
      if (!existing) {
        acc.push({ ...curr, cycle: 'Monthly', nextDate: getNextMonthDate(curr.date) });
      } else if (curr.date > existing.date) {
        // Update to latest
        existing.date = curr.date;
        existing.amount = curr.amount;
        existing.nextDate = getNextMonthDate(curr.date);
      }
      return acc;
    }, []);
  }, [transactions]);

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + Math.abs(sub.amount), 0);

  function getNextMonthDate(dateStr: string) {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  }

  function getIcon(merchant: string, category: string) {
    const m = merchant.toLowerCase();
    if (m.includes('netflix') || m.includes('tv') || m.includes('hulu')) return <Tv size={20} />;
    if (m.includes('spotify') || m.includes('music')) return <Music size={20} />;
    if (m.includes('utility') || m.includes('electric') || category === 'Utilities') return <Zap size={20} />;
    if (m.includes('insurance')) return <ShieldCheck size={20} />;
    return <Smartphone size={20} />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subscriptions</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage recurring payments and bills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Active Subscriptions</h3>
          {subscriptions.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No recurring payments detected.
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm">
                      {getIcon(sub.merchant, sub.category)}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">{sub.merchant}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <span>{sub.cycle}</span>
                        <span>•</span>
                        <span>Next: {formatDate(sub.nextDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(Math.abs(sub.amount))}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-primary-600 hover:text-primary-700">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary-600 text-white border-none">
            <h3 className="text-primary-100 text-sm font-medium mb-1">Total Monthly Cost</h3>
            <div className="text-3xl font-bold mb-4">{formatCurrency(totalMonthly)}</div>
            <p className="text-sm text-primary-100 opacity-90">
              You are spending about <strong>{formatCurrency(totalMonthly * 12)}</strong> per year on subscriptions.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Upcoming</h3>
            <div className="space-y-4">
              {subscriptions.slice(0, 3).map((sub, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{sub.merchant}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{formatDate(sub.nextDate)}</span>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="w-full mt-4 text-xs">
              View Calendar <ArrowRight size={14} className="ml-1" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};