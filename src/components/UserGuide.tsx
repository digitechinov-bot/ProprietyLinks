import { useState } from "react";
import { 
  BookOpen, 
  MousePointer2, 
  Zap, 
  FileText, 
  Receipt, 
  Calculator, 
  Users, 
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export const UserGuide = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'workflow' | 'strategy'>('workflow');

  const steps = [
    {
      title: "1. Lead Capture",
      desc: "Customers use the Quote Engine on your landing page. Leads appear instantly in the 'Leads' tab.",
      icon: Users,
      color: "blue"
    },
    {
      title: "2. Project Setup",
      desc: "Convert a lead into a 'Project' to track site progress and milestones.",
      icon: Briefcase,
      color: "gold"
    },
    {
      title: "3. Invoicing",
      desc: "Create an invoice for the project. Send it directly to the client via email.",
      icon: FileText,
      color: "purple"
    },
    {
      title: "4. Expense Logging",
      desc: "Record every material receipt or fuel bill in 'Expenses' as they happen.",
      icon: Receipt,
      color: "red"
    },
    {
      title: "5. Tax & Compliance",
      desc: "The 'Accounting' hub automatically calculates your VAT and Profit based on steps 3 and 4.",
      icon: Calculator,
      color: "green"
    }
  ];

  return (
    <div className={`max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <section className="text-center space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] uppercase tracking-widest font-mono ${
          theme === 'dark' ? 'bg-gold/10 border-gold/20 text-gold' : 'bg-gold/5 border-gold/20 text-gold'
        }`}>
          <BookOpen className="w-3 h-3" />
          Official Documentation
        </div>
        <h2 className={`text-4xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Command Centre User Guide</h2>
        <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
          Welcome, Moustapha. This guide explains how to use your new business management system to save time and stay compliant.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
          <button 
            onClick={() => setActiveSubTab('workflow')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeSubTab === 'workflow' ? 'bg-gold text-charcoal shadow-lg shadow-gold/20' : 
              theme === 'dark' ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Workflow Guide
          </button>
          <button 
            onClick={() => setActiveSubTab('strategy')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeSubTab === 'strategy' ? 'bg-gold text-charcoal shadow-lg shadow-gold/20' : 
              theme === 'dark' ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Growth Strategy
          </button>
        </div>
      </section>

      {activeSubTab === 'workflow' ? (
        <>
          {/* The Workflow */}
          <div className="grid grid-cols-1 gap-6">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <Zap className="w-5 h-5 text-gold" />
              The Daily Workflow
            </h3>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className={`p-6 rounded-2xl border flex gap-6 items-start group transition-all ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 hover:border-gold/50' : 'bg-white border-slate-200 hover:border-gold'
                }`}>
                  <div className={`p-4 rounded-xl group-hover:scale-110 transition-transform ${
                    theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-slate-50 text-slate-500'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{step.title}</h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{step.desc}</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center h-full pt-4">
                    {i < steps.length - 1 && <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-white/10' : 'text-slate-200'}`} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Deep Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl border space-y-6 relative overflow-hidden ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16" />
              <h3 className={`text-xl font-bold flex items-center gap-2 relative z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <Calculator className="w-5 h-5 text-gold" />
                Accounting & Tax
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "VAT is calculated automatically at 20% of your paid invoices.",
                  "Corporation Tax is estimated at 19% of your net profit.",
                  "Always record expenses to reduce your tax bill.",
                  "Use the 'Export' button to send data to your accountant."
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-3xl border space-y-6 ${
              theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <MousePointer2 className="w-5 h-5 text-blue-500" />
                Pro Tips
              </h3>
              <ul className="space-y-4">
                {[
                  "Hover over any icon to see what it does.",
                  "The hidden dot below the footer logo is your secret entrance.",
                  "Mark invoices as 'Paid' to see your profit update in real-time.",
                  "Use the 'UK Formation' tab if you need to register a new entity."
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h2 className={`text-3xl font-serif font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Agency Growth Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl shadow-sm border ${
                theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <TrendingUp className="w-5 h-5 text-gold" />
                  Phase 1: The Outreach
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  Reach out to high-value businesses (Builders, Landscapers) with a "Gift" prototype. Show them their own brand on this technology.
                </p>
                <div className={`p-4 rounded-xl border font-mono text-xs relative group ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <button className={`absolute top-2 right-2 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 ${
                    theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-200'
                  }`}>
                    <TrendingUp className="w-3 h-3 text-gold" />
                  </button>
                  "Hi [Name], I built a modern prototype for [Business] to show you how we can automate your lead generation. Check it out here: [Link]"
                </div>
              </div>
              <div className={`p-8 rounded-2xl shadow-sm border ${
                theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Phase 2: The Action Tiers
                </h3>
                <div className="space-y-4">
                  <div className={`flex justify-between items-center p-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Launch Pack</span>
                    <span className="text-xs font-bold text-blue-500">£750</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg border ${
                    theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Growth Pack</span>
                    <span className="text-xs font-bold text-blue-500">£1,250</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-lg border ${
                    theme === 'dark' ? 'bg-charcoal border-white/10 text-white' : 'bg-slate-900 border-slate-800 text-white'
                  }`}>
                    <span className="text-sm font-bold">AI Agent Upsell</span>
                    <span className="text-xs font-bold text-gold">£1,950</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`p-10 rounded-3xl relative overflow-hidden shadow-2xl ${
            theme === 'dark' ? 'bg-charcoal text-white shadow-charcoal/20' : 'bg-slate-900 text-white shadow-slate-900/20'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-2xl font-serif font-bold mb-6 italic text-gold">The "Show, Don't Tell" Method</h2>
              <div className="space-y-6">
                {[
                  "Find a business with high-ticket services but a poor website.",
                  "Duplicate this prototype and swap their logo/photos.",
                  "Send them the link to their own proposal page.",
                  "Close the deal by showing them the 'Quote Engine' in action."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 bg-gold text-charcoal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-slate-300'}`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Support Section */}
      <section className={`p-10 rounded-3xl text-center space-y-6 border ${
        theme === 'dark' ? 'bg-gold/5 border-gold/20' : 'bg-gold/5 border-gold/20'
      }`}>
        <h3 className={`text-2xl font-serif font-bold italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Need Technical Support?</h3>
        <p className={`text-sm max-w-md mx-auto ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
          If you encounter any issues with the Command Centre or need custom features added, contact your development team.
        </p>
        <div className="flex justify-center gap-4">
          <a href="mailto:support@digitechinov.com" className="px-6 py-3 bg-gold text-charcoal rounded-xl font-bold text-sm hover:bg-gold-light transition-all">
            Email Support
          </a>
          <a href="https://wa.me/447926325725" className={`px-6 py-3 border rounded-xl font-bold text-sm transition-all ${
            theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}>
            WhatsApp Mory
          </a>
        </div>
      </section>
    </div>
  );
};
