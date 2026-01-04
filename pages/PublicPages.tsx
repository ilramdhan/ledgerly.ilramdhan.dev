import React from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Check, MapPin, Mail, Phone, Calendar, User, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils';

// --- Shared Layout Component ---
const PublicLayout: React.FC<{ title: string; children: React.ReactNode; onBack: () => void }> = ({ title, children, onBack }) => (
  <div className="min-h-screen bg-[#F7F9FB] dark:bg-[#0F1724] text-slate-900 dark:text-slate-100 font-sans">
    <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-500 cursor-pointer" onClick={onBack}>
           <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">L</div>
           Ledgerly
        </div>
        <Button variant="ghost" onClick={onBack} size="sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Button>
      </div>
    </nav>
    <main className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
        <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
      </div>
      {children}
    </main>
    <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12">
      <p>&copy; {new Date().getFullYear()} Ledgerly App. All rights reserved.</p>
    </footer>
  </div>
);

// --- Pricing Page ---
export const PricingPage: React.FC<{ onBack: () => void; onGetStarted: () => void }> = ({ onBack, onGetStarted }) => {
  return (
    <PublicLayout title="Simple, Transparent Pricing" onBack={onBack}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Tier */}
        <Card className="p-8 border-slate-200 dark:border-slate-700 relative">
          <h3 className="text-xl font-bold mb-2">Starter</h3>
          <div className="text-4xl font-bold mb-4">$0 <span className="text-sm font-normal text-slate-500">/mo</span></div>
          <p className="text-slate-500 mb-6">Perfect for individuals just getting started.</p>
          <ul className="space-y-3 mb-8">
            {['Unlimited Transactions', 'Basic Budgeting', 'Manual Tracking', '7-Day History'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> {item}</li>
            ))}
          </ul>
          <Button variant="secondary" className="w-full" onClick={onGetStarted}>Get Started</Button>
        </Card>

        {/* Pro Tier */}
        <Card className="p-8 border-primary-500 ring-2 ring-primary-500/20 relative shadow-xl transform md:-translate-y-4">
          <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
          <h3 className="text-xl font-bold mb-2 text-primary-600">Pro</h3>
          <div className="text-4xl font-bold mb-4">$9 <span className="text-sm font-normal text-slate-500">/mo</span></div>
          <p className="text-slate-500 mb-6">For power users who want deep insights.</p>
          <ul className="space-y-3 mb-8">
            {['Everything in Starter', 'Receipt OCR Scanning', 'Unlimited History', 'Advanced Analytics', 'Export to PDF/CSV'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm"><Check size={16} className="text-primary-500" /> {item}</li>
            ))}
          </ul>
          <Button className="w-full" onClick={onGetStarted}>Start Free Trial</Button>
        </Card>

        {/* Enterprise Tier */}
        <Card className="p-8 border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-2">Family</h3>
          <div className="text-4xl font-bold mb-4">$19 <span className="text-sm font-normal text-slate-500">/mo</span></div>
          <p className="text-slate-500 mb-6">Manage finances for the whole household.</p>
          <ul className="space-y-3 mb-8">
            {['Everything in Pro', 'Up to 5 Users', 'Shared Budgets', 'Role-based Access', 'Priority Support'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> {item}</li>
            ))}
          </ul>
          <Button variant="secondary" className="w-full" onClick={onGetStarted}>Contact Sales</Button>
        </Card>
      </div>
    </PublicLayout>
  );
};

// --- Roadmap Page ---
export const RoadmapPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const items = [
    { quarter: 'Q4 2023', title: 'Launch v1.0', desc: 'Core tracking, budgeting, and local storage.', status: 'done' },
    { quarter: 'Q1 2024', title: 'OCR Receipt Scanning', desc: 'AI-powered receipt extraction.', status: 'done' },
    { quarter: 'Q2 2024', title: 'Cloud Sync (Optional)', desc: 'Encrypted cloud backup for multi-device support.', status: 'active' },
    { quarter: 'Q3 2024', title: 'Mobile App', desc: 'Native iOS and Android applications.', status: 'planned' },
    { quarter: 'Q4 2024', title: 'Bank API Integration', desc: 'Direct connection to 10,000+ banks.', status: 'planned' },
  ];

  return (
    <PublicLayout title="Product Roadmap" onBack={onBack}>
      <div className="max-w-3xl mx-auto relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-0 pl-8 md:pl-0">
        {items.map((item, idx) => (
          <div key={idx} className="mb-10 md:flex items-center justify-between w-full">
            <div className="hidden md:block w-5/12 text-right pr-8">
               <h3 className={`font-bold text-lg ${item.status === 'active' ? 'text-primary-600' : ''}`}>{item.title}</h3>
               <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.quarter}</span>
            </div>
            
            <div className={`absolute left-[-9px] md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full border-2 ${
                item.status === 'done' ? 'bg-green-500 border-green-500' : 
                item.status === 'active' ? 'bg-primary-500 border-primary-500 ring-4 ring-primary-200 dark:ring-primary-900' : 
                'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
            }`}></div>

            <div className="md:w-5/12 md:pl-8">
               <div className="md:hidden mb-1">
                   <h3 className={`font-bold text-lg ${item.status === 'active' ? 'text-primary-600' : ''}`}>{item.title}</h3>
                   <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.quarter}</span>
               </div>
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PublicLayout>
  );
};

// --- About Page ---
export const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <PublicLayout title="About Us" onBack={onBack}>
      <div className="max-w-3xl mx-auto space-y-8 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Ledgerly was born from a simple frustration: financial apps were either too complex, too expensive, or didn't respect user privacy.
        </p>
        <p>
          We believe that managing your wealth shouldn't require a finance degree or surrendering your personal data to advertisers. 
          That's why we built a <strong>local-first</strong> platform. Your data stays on your device, encrypted and secure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">10k+</div>
                <div className="text-sm text-slate-500">Active Users</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">1M+</div>
                <div className="text-sm text-slate-500">Transactions Tracked</div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">Our Mission</h2>
        <p>
            To empower individuals to achieve financial freedom through clarity, control, and privacy.
        </p>
      </div>
    </PublicLayout>
  );
};

// --- Blog Page ---
export const BlogPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const posts = [
    { title: "5 Tips to Save for Your First Home", category: "Savings", date: "Oct 24, 2023", read: "5 min read" },
    { title: "Understanding Zero-Based Budgeting", category: "Budgeting", date: "Oct 18, 2023", read: "8 min read" },
    { title: "Why Local-First Apps are the Future", category: "Tech", date: "Sep 30, 2023", read: "4 min read" },
    { title: "How to Track Investments Manually", category: "Investing", date: "Sep 12, 2023", read: "6 min read" },
  ];

  return (
    <PublicLayout title="The Ledgerly Blog" onBack={onBack}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, i) => (
            <Card key={i} className="group cursor-pointer hover:shadow-lg transition-all">
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                    Image Placeholder
                </div>
                <div className="flex items-center gap-2 text-xs text-primary-600 font-medium mb-2">
                    <span>{post.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                </h3>
                <div className="flex items-center text-sm text-slate-500">
                    {post.read} <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Card>
        ))}
      </div>
    </PublicLayout>
  );
};

// --- Contact Page ---
export const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <PublicLayout title="Get in Touch" onBack={onBack}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
            <p className="text-slate-600 dark:text-slate-400">
                Have questions or feedback? We'd love to hear from you. Fill out the form or reach us via email.
            </p>
            
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <Mail className="text-primary-500" />
                    <span>support@ledgerly.app</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <MapPin className="text-primary-500" />
                    <span>123 Finance Way, San Francisco, CA</span>
                </div>
            </div>
        </div>

        <Card className="p-6">
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input type="text" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input type="text" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea rows={4} className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900"></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
            </form>
        </Card>
      </div>
    </PublicLayout>
  );
};
