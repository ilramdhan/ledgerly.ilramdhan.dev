import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Shield } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<Props> = ({ onBack }) => {
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
                <Shield size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Welcome to Ledgerly. We respect your privacy and are committed to protecting your personal data. 
                    This privacy policy will inform you as to how we look after your personal data when you visit our website 
                    and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">2. Data We Collect</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Ledgerly is designed with a <strong>privacy-first approach</strong>. Currently, the application operates primarily on 
                    your local device.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                    <li><strong>Local Storage Data:</strong> Your transactions, budgets, accounts, and settings are stored locally in your browser's "Local Storage". We do not have access to this data on our servers.</li>
                    <li><strong>Usage Data:</strong> We may collect anonymous usage statistics (e.g., page visits) to improve the application performance.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">3. How We Use Your Data</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Since your financial data resides on your device, we do not use, sell, or analyze your personal financial information. 
                    The data is used solely by the application running in your browser to generate reports, charts, and dashboards for your personal view.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. 
                    However, please note that because data is stored in your browser, clearing your browser cache or local storage will result in the loss of your data unless you have backed it up.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">5. Third-Party Services</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We may use third-party libraries (such as chart rendering or PDF generation tools) that run locally in your browser. These libraries do not transmit your data to external servers.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">6. Contact Us</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:support@ledgerly.app" className="text-primary-600 hover:underline">support@ledgerly.app</a>.
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