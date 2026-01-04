import React from 'react';
import { Button } from '../components/ui/Button';
import { 
  PieChart, 
  ScanLine, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp 
} from 'lucide-react';
import { cn } from '../utils';

interface Props {
  onLogin: () => void;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<Props> = ({ onLogin, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-[#0F1724] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-500 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
            L
          </div>
          Ledgerly
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onLogin}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Log In
          </button>
          <Button size="sm" onClick={onGetStarted} className="hidden sm:flex">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold border border-primary-100 dark:border-primary-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            v1.1.0 Now Available
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            Master your money <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-600">
              with clarity.
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Stop guessing where your money goes. Ledgerly provides a soft, intuitive interface to track expenses, manage budgets, and achieve financial goals effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onGetStarted} className="group">
              Start for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" onClick={onLogin}>
              Sign In
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700" />
               ))}
            </div>
            <p>Trusted by 10,000+ users</p>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex-1 w-full relative animate-in zoom-in-95 fade-in duration-1000 delay-200">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl filter opacity-50 animate-pulse"></div>
            <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* Abstract UI Representation */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                      <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="h-8 w-8 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="flex gap-4">
                      <div className="flex-1 h-32 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-800 flex items-center justify-center flex-col gap-2">
                         <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">$4,250</span>
                         <span className="text-xs text-primary-400">Total Balance</span>
                      </div>
                      <div className="flex-1 h-32 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700"></div>
                  </div>
                  <div className="space-y-2">
                      {[1,2,3].map(i => (
                          <div key={i} className="h-12 w-full bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center px-4 justify-between">
                              <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                                  <div className="w-24 h-4 bg-slate-200 dark:bg-slate-600 rounded my-auto"></div>
                              </div>
                              <div className="w-12 h-4 bg-slate-200 dark:bg-slate-600 rounded"></div>
                          </div>
                      ))}
                  </div>
               </div>
            </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white dark:bg-slate-800 py-20 border-t border-slate-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to grow</h2>
                <p className="text-slate-500 dark:text-slate-400">Powerful features wrapped in a simple, elegant design. Managing personal finance has never been this satisfying.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: <PieChart className="text-indigo-500" />,
                        title: "Smart Budgeting",
                        desc: "Set monthly or yearly limits for categories and track your progress visually."
                    },
                    {
                        icon: <ScanLine className="text-primary-500" />,
                        title: "Receipt Scanning",
                        desc: "Snap a photo of your receipt and let AI extract the transaction details."
                    },
                    {
                        icon: <TrendingUp className="text-green-500" />,
                        title: "Deep Analytics",
                        desc: "Understand your spending habits with detailed charts and trend analysis."
                    },
                    {
                        icon: <ShieldCheck className="text-orange-500" />,
                        title: "Privacy First",
                        desc: "Your data is stored locally in your browser. Secure, private, and yours."
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-soft transition-all">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-slate-400 dark:text-slate-600 bg-[#F7F9FB] dark:bg-[#0F1724]">
        <p>&copy; {new Date().getFullYear()} Ledgerly App. All rights reserved.</p>
      </footer>
    </div>
  );
};