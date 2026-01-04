import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { User, AlertTriangle, Check, Tag, Plus, X, Globe, LogOut } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, categories, updateUser, addCategory, deleteCategory, resetData, logout } = useData();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currency, setCurrency] = useState(user.currency || 'USD');
  const [saved, setSaved] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, currency });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your profile and data preferences.</p>
        </div>
        <Button variant="secondary" onClick={logout} className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:bg-red-900/10">
            <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Profile & Preferences */}
        <div className="space-y-6">
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
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                        <Globe size={14}/> Primary Currency
                    </label>
                    <select 
                        className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">USD - US Dollar ($)</option>
                        <option value="IDR">IDR - Indonesian Rupiah (Rp)</option>
                        <option value="EUR">EUR - Euro (€)</option>
                        <option value="GBP">GBP - British Pound (£)</option>
                        <option value="JPY">JPY - Japanese Yen (¥)</option>
                        <option value="SGD">SGD - Singapore Dollar (S$)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">This changes the default currency symbol across the app.</p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                    <Button type="submit">Save Changes</Button>
                    {saved && <span className="text-green-600 flex items-center text-sm animate-in fade-in"><Check size={16} className="mr-1"/> Saved</span>}
                </div>
                </form>
            </Card>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-6">
            <Card className="h-full">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Tag size={20} /> Manage Categories
                </h3>
                <p className="text-sm text-slate-500 mb-4">Add or remove categories used for transactions and budgets.</p>
                
                <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                <input 
                    type="text" 
                    className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="New category name..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Button type="submit" variant="secondary">
                    <Plus size={18} />
                    </Button>
                </form>

                <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <div key={cat} className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    <span>{cat}</span>
                    <button 
                        onClick={() => deleteCategory(cat)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={14} />
                    </button>
                    </div>
                ))}
                </div>
            </Card>
        </div>
      </div>

      {/* Full Width: Danger Zone */}
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
        Ledgerly v1.1.0 • Secure Local Storage
      </div>
    </div>
  );
};