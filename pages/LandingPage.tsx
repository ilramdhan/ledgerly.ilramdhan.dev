import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { 
  PieChart, 
  ScanLine, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  TrendingUp,
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../utils';

interface Props {
  onLogin: () => void;
  onGetStarted: () => void;
  onViewPrivacy: () => void;
  onViewToS: () => void;
  onViewPricing: () => void;
  onViewRoadmap: () => void;
  onViewAbout: () => void;
  onViewBlog: () => void;
  onViewContact: () => void;
}

export const LandingPage: React.FC<Props> = ({ 
    onLogin, onGetStarted, onViewPrivacy, onViewToS,
    onViewPricing, onViewRoadmap, onViewAbout, onViewBlog, onViewContact
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-[#0F1724] text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 h-16" : "bg-transparent h-20"
      )}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-500 font-bold text-xl tracking-tight cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
              L
            </div>
            Ledgerly
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Stories</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQ</button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <button 
              onClick={onLogin}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Log In
            </button>
            <Button size="sm" onClick={onGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                <button onClick={() => scrollToSection('features')} className="text-sm text-left font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">Features</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-sm text-left font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">Stories</button>
                <button onClick={() => scrollToSection('faq')} className="text-sm text-left font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">FAQ</button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>
                <button onClick={onLogin} className="w-full text-left text-sm font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">Log In</button>
                <Button className="w-full" onClick={onGetStarted}>Get Started</Button>
            </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold border border-primary-100 dark:border-primary-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New: Privacy Mode Enabled
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
            <Button size="lg" onClick={onGetStarted} className="group shadow-glow hover:shadow-lg transition-all">
              Start for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" onClick={onLogin}>
              Sign In
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 bg-cover" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`}} />
               ))}
            </div>
            <div className="flex flex-col">
                <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xs">Loved by 10,000+ users</p>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="flex-1 w-full relative animate-in zoom-in-95 fade-in duration-1000 delay-200 hidden md:block">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl filter opacity-50 animate-pulse"></div>
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl filter opacity-50"></div>
            
            <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 rotate-2 hover:rotate-0 transition-transform duration-500 max-w-md mx-auto">
               {/* Abstract UI Representation */}
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                      <div className="h-5 w-24 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                      <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="flex gap-4">
                      <div className="flex-1 h-36 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg flex items-center justify-center flex-col gap-1 text-white">
                         <span className="text-xs opacity-80">Total Balance</span>
                         <span className="text-3xl font-bold">$12,450</span>
                         <div className="w-16 h-1 bg-white/30 rounded mt-2"></div>
                      </div>
                      <div className="flex-1 h-36 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-600 p-4">
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                        <div className="h-2 w-2/3 bg-slate-200 dark:bg-slate-600 rounded"></div>
                        <div className="mt-auto h-16 w-full flex items-end gap-1">
                             {[40, 70, 50, 90, 60].map((h, i) => (
                                 <div key={i} className="flex-1 bg-indigo-300 dark:bg-indigo-500/50 rounded-t" style={{height: `${h}%`}}></div>
                             ))}
                        </div>
                      </div>
                  </div>
                  <div className="space-y-3">
                      {[1,2,3].map(i => (
                          <div key={i} className="h-14 w-full bg-white dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 rounded-xl flex items-center px-4 justify-between shadow-sm">
                              <div className="flex gap-3 items-center">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i===1 ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-500'}`}>
                                      <div className="w-4 h-4 bg-current rounded-sm"></div>
                                  </div>
                                  <div>
                                     <div className="w-24 h-3 bg-slate-100 dark:bg-slate-600 rounded mb-1"></div>
                                     <div className="w-16 h-2 bg-slate-50 dark:bg-slate-700 rounded"></div>
                                  </div>
                              </div>
                              <div className="w-12 h-4 bg-slate-100 dark:bg-slate-600 rounded"></div>
                          </div>
                      ))}
                  </div>
               </div>
            </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-slate-800 py-24 border-t border-slate-100 dark:border-slate-700 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Features</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Everything you need to grow</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Powerful features wrapped in a simple, elegant design. Managing personal finance has never been this satisfying.</p>
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
                    <div key={idx} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-soft hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-[#F7F9FB] dark:bg-[#0F1724] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What our users say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        quote: "Ledgerly is the first finance app that doesn't feel like a spreadsheet. It's actually fun to use.",
                        author: "Sarah J.",
                        role: "Freelance Designer"
                    },
                    {
                        quote: "I love that my data stays on my device. Privacy was my #1 concern and Ledgerly nailed it.",
                        author: "Michael T.",
                        role: "Software Engineer"
                    },
                    {
                        quote: "The receipt scanning feature saves me hours every month. Highly recommended!",
                        author: "Elena R.",
                        role: "Small Business Owner"
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex text-yellow-400 mb-4">
                            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">"{item.quote}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 20})`}}></div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{item.author}</p>
                                <p className="text-slate-500 text-xs">{item.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 scroll-mt-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {[
                    { q: "Is Ledgerly really free?", a: "Yes, the core features of Ledgerly are completely free to use." },
                    { q: "Where is my data stored?", a: "We use a 'Local First' approach. Your data is stored in your browser's local storage. We don't see your bank details." },
                    { q: "Can I export my data?", a: "Absolutely. You can export your transactions to CSV or PDF at any time." },
                    { q: "Does it support multiple currencies?", a: "Yes, you can set your preferred currency in the settings." }
                ].map((item, i) => (
                    <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 bg-slate-50 dark:bg-slate-800/50">
                                <span className="text-slate-900 dark:text-white">{item.q}</span>
                                <span className="transition group-open:rotate-180">
                                    <ChevronDown size={20} className="text-slate-500" />
                                </span>
                            </summary>
                            <div className="text-slate-600 dark:text-slate-400 p-5 bg-white dark:bg-slate-800 leading-relaxed border-t border-slate-100 dark:border-slate-700">
                                {item.a}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white text-center px-6">
          <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to take control?</h2>
              <p className="text-slate-400 text-lg">Join thousands of users who are mastering their finances with Ledgerly today.</p>
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white border-none" onClick={onGetStarted}>
                  Create Free Account
              </Button>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">L</div>
                        Ledgerly
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The simple, private way to track your wealth and spending habits.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><button onClick={() => scrollToSection('features')} className="hover:text-primary-600">Features</button></li>
                        <li><button onClick={onViewPricing} className="hover:text-primary-600">Pricing</button></li>
                        <li><button onClick={onViewRoadmap} className="hover:text-primary-600">Roadmap</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><button onClick={onViewAbout} className="hover:text-primary-600">About</button></li>
                        <li><button onClick={onViewBlog} className="hover:text-primary-600">Blog</button></li>
                        <li><button onClick={onViewContact} className="hover:text-primary-600">Contact</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><button onClick={onViewPrivacy} className="hover:text-primary-600">Privacy Policy</button></li>
                        <li><button onClick={onViewToS} className="hover:text-primary-600">Terms of Service</button></li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-400">
                <p>&copy; {new Date().getFullYear()} Ledgerly App. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};