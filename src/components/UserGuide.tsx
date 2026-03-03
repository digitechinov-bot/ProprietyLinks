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

export const UserGuide = () => {
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
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] uppercase tracking-widest font-mono">
          <BookOpen className="w-3 h-3" />
          Official Documentation
        </div>
        <h2 className="text-4xl font-serif font-bold text-slate-900">Command Centre User Guide</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Welcome, Moustapha. This guide explains how to use your new business management system to save time and stay compliant.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
          <button 
            onClick={() => setActiveSubTab('workflow')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeSubTab === 'workflow' ? 'bg-gold text-charcoal shadow-lg shadow-gold/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Workflow Guide
          </button>
          <button 
            onClick={() => setActiveSubTab('strategy')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeSubTab === 'strategy' ? 'bg-gold text-charcoal shadow-lg shadow-gold/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold" />
              The Daily Workflow
            </h3>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-6 items-start group hover:border-gold/50 transition-all">
                  <div className={`p-4 rounded-xl bg-slate-50 text-slate-600 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center h-full pt-4">
                    {i < steps.length - 1 && <ArrowRight className="w-5 h-5 text-slate-200" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Deep Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16" />
              <h3 className="text-xl font-bold flex items-center gap-2 relative z-10">
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
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <MousePointer2 className="w-5 h-5 text-blue-600" />
                Pro Tips
              </h3>
              <ul className="space-y-4">
                {[
                  "Hover over any icon to see what it does.",
                  "The hidden dot below the footer logo is your secret entrance.",
                  "Mark invoices as 'Paid' to see your profit update in real-time.",
                  "Use the 'UK Formation' tab if you need to register a new entity."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
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
            <h2 className="text-3xl font-serif font-bold mb-8">Agency Growth Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <TrendingUp className="w-5 h-5 text-gold-dark" />
                  Phase 1: The Outreach
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Reach out to high-value businesses (Builders, Landscapers) with a "Gift" prototype. Show them their own brand on this technology.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs relative group">
                  <button className="absolute top-2 right-2 p-1 hover:bg-slate-200 rounded transition-colors opacity-0 group-hover:opacity-100">
                    <TrendingUp className="w-3 h-3" />
                  </button>
                  "Hi [Name], I built a modern prototype for [Business] to show you how we can automate your lead generation. Check it out here: [Link]"
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Phase 2: The Action Tiers
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-bold">Launch Pack</span>
                    <span className="text-xs font-bold text-blue-600">£750</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="text-sm font-bold">Growth Pack</span>
                    <span className="text-xs font-bold text-blue-600">£1,250</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-charcoal text-white rounded-lg">
                    <span className="text-sm font-bold">AI Agent Upsell</span>
                    <span className="text-xs font-bold text-gold">£1,950</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-charcoal text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl shadow-charcoal/20">
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
                    <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Support Section */}
      <section className="bg-gold/5 border border-gold/20 p-10 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Need Technical Support?</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          If you encounter any issues with the Command Centre or need custom features added, contact your development team.
        </p>
        <div className="flex justify-center gap-4">
          <a href="mailto:support@digitechinov.com" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
            Email Support
          </a>
          <a href="https://wa.me/447926325725" className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
            WhatsApp Mory
          </a>
        </div>
      </section>
    </div>
  );
};
