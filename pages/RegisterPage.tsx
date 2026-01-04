import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { Loader2 } from 'lucide-react';

interface Props {
    onSwitch: () => void;
}

export const RegisterPage: React.FC<Props> = ({ onSwitch }) => {
  const { register } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    
    setIsLoading(true);
    await register(name, email);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] dark:bg-[#0F1724] p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                L
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400">Start your financial journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                    type="text" 
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input 
                    type="email" 
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input 
                    type="password" 
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button className="w-full h-11 text-base mt-2" type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Create Account'}
            </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button onClick={onSwitch} className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
            </button>
        </div>
      </Card>
    </div>
  );
};