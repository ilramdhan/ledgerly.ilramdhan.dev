import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowLeft, FileText } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const TermsOfService: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-[#0F1724] text-slate-900 dark:text-slate-100 font-sans">
      <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-500 cursor-pointer" onClick={onBack}>
             <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">L</div>
             Ledgerly
          </div>
          <Button variant="ghost" onClick={onBack} size="sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
             <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">1. Agreement to Terms</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    By accessing or using the Ledgerly application, you agree to be bound by these Terms of Service and our Privacy Policy. 
                    If you disagree with any part of the terms, then you may not access the service.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ledgerly provides a web-based financial tracking interface that allows users to record income, expenses, and manage budgets. 
                    The application currently operates in a "local-first" mode, meaning data is stored on your device via the browser.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">3. User Responsibilities</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    You are responsible for your use of the Service and for any consequences thereof. You agree that you will use the Service in compliance with all applicable local, state, national, and international laws, rules and regulations.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                    <li>You are responsible for backing up your own data (e.g., via CSV export).</li>
                    <li>You are responsible for securing access to your device to prevent unauthorized viewing of your financial data.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">4. No Financial Advice</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ledgerly is a tool for tracking and visualization. Nothing contained in the Service constitutes professional financial, legal, or tax advice. 
                    You should consult with a qualified professional before making any financial decisions based on data tracked in this application.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The service is provided on an "AS-IS" and "AS AVAILABLE" basis. Ledgerly makes no representations or warranties of any kind, express or implied, 
                    as to the operation of the service or the information, content, or materials included therein.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">6. Changes to Terms</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
            </section>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12">
        <p>&copy; {new Date().getFullYear()} Ledgerly App. All rights reserved.</p>
      </footer>
    </div>
  );
};