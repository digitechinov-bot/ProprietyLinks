import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Building2, 
  FileCheck, 
  TrendingUp, 
  AlertCircle, 
  Download,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calculator
} from "lucide-react";

export const AccountingHub = () => {
  const [isVatRegistered, setIsVatRegistered] = useState(true);
  const [isCorpTaxApplicable, setIsCorpTaxApplicable] = useState(true);
  
  const [stats, setStats] = useState({
    revenue: 34200,
    expenses: 12450,
    vatDue: 4350,
    corpTax: 4132,
    netProfit: 17418
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Compliance & Accounting Hub</h2>
          <p className="text-slate-500 text-sm">Real-time tax estimates and Companies House readiness.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-4 bg-white border border-slate-200 px-4 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VAT Registered?</span>
              <button 
                onClick={() => setIsVatRegistered(!isVatRegistered)}
                className={`w-8 h-4 rounded-full transition-all relative ${isVatRegistered ? 'bg-gold' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isVatRegistered ? 'left-4.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Corp Tax?</span>
              <button 
                onClick={() => setIsCorpTaxApplicable(!isCorpTaxApplicable)}
                className={`w-8 h-4 rounded-full transition-all relative ${isCorpTaxApplicable ? 'bg-gold' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isCorpTaxApplicable ? 'left-4.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20">
            <Download className="w-4 h-4" />
            Download Tax Report
          </button>
        </div>
      </div>

      {/* Financial Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12% vs last month</span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Gross Revenue</p>
            <h3 className="text-3xl font-bold text-slate-900">£{stats.revenue.toLocaleString()}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>Based on paid invoices</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <PieChart className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">36% of revenue</span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Expenses</p>
            <h3 className="text-3xl font-bold text-slate-900">£{stats.expenses.toLocaleString()}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ArrowDownRight className="w-3 h-3" />
            <span>Materials & Overheads</span>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="flex justify-between items-start relative z-10">
            <div className="p-3 bg-white/10 text-gold rounded-2xl">
              <Calculator className="w-6 h-6" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-sm text-white/50 font-medium">Estimated Net Profit</p>
            <h3 className="text-3xl font-bold text-gold">
              £{(stats.revenue - stats.expenses - (isVatRegistered ? stats.vatDue : 0) - (isCorpTaxApplicable ? stats.corpTax : 0)).toLocaleString()}
            </h3>
          </div>
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold relative z-10">After Tax Estimates</p>
        </div>
      </div>

      {/* Tax Liabilities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            HMRC Tax Liabilities (Estimated)
          </h3>
          <div className="space-y-6">
            {isVatRegistered && (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-slate-400">VAT</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">VAT (20%)</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Next Return: April 1st</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">£{stats.vatDue.toLocaleString()}</p>
                  <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Action Required</p>
                </div>
              </div>
            )}

            {isCorpTaxApplicable && (
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-slate-400">CT</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Corporation Tax</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Estimated @ 19%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">£{stats.corpTax.toLocaleString()}</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Provisioned</p>
                </div>
              </div>
            )}

            {!isVatRegistered && !isCorpTaxApplicable && (
              <div className="p-8 text-center space-y-2">
                <ShieldCheck className="w-12 h-12 text-slate-200 mx-auto" />
                <p className="text-sm text-slate-500">No tax liabilities currently active based on your settings.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gold-dark" />
            Companies House Compliance
          </h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
              <div className="w-12 h-12 bg-gold/10 text-gold-dark rounded-full flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Confirmation Statement</h4>
                <p className="text-xs text-slate-500">Last filed: Jan 2026. Next due: Jan 2027.</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Up to Date</span>
            </div>

            <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Annual Accounts</h4>
                <p className="text-xs text-slate-500">Period ending March 31st. Prepare data now.</p>
              </div>
              <button className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-slate-800 transition-all">Start Prep</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-charcoal text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl rounded-full -mr-32 -mt-32" />
        <div className="relative z-10 flex gap-6 items-center">
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold">
              <Calculator className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-serif italic text-gold mb-2">Accountant-Ready Data</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Your data is automatically formatted for standard UK accounting software (Xero, QuickBooks, FreeAgent). When it's time for your end-of-year filing, simply click "Export" to send everything to your accountant in one clean file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
