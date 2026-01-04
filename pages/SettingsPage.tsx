import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { User, AlertTriangle, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUser, resetData } = useData();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your profile and data preferences.</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <User size={20} /> Profile Information
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
            <input 
              type="text" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pt-2 flex items-center gap-2">
            <Button type="submit">Save Changes</Button>
            {saved && <span className="text-green-600 flex items-center text-sm"><Check size={16} className="mr-1"/> Saved</span>}
          </div>
        </form>
      </Card>

      <Card className="border-red-100 dark:border-red-900/30">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle size={20} /> Danger Zone
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Resetting your data will clear all transactions, accounts, and budgets stored in your browser's local storage. This action cannot be undone.
        </p>
        <Button variant="danger" onClick={resetData}>
          Reset All Data
        </Button>
      </Card>

      <div className="text-center text-xs text-slate-400 py-4">
        Ledgerly v1.0.0 • Secure Local Storage
      </div>
    </div>
  );
};