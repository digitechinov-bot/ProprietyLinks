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

export const AccountingHub = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
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
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Compliance & Accounting Hub</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Real-time tax estimates and Companies House readiness.</p>
        </div>
        <div className="flex gap-3">
          <div className={`flex items-center gap-4 border px-4 py-2 rounded-xl ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>VAT Registered?</span>
              <button 
                onClick={() => setIsVatRegistered(!isVatRegistered)}
                className={`w-8 h-4 rounded-full transition-all relative ${isVatRegistered ? 'bg-gold' : theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isVatRegistered ? 'left-4.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className={`w-px h-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Corp Tax?</span>
              <button 
                onClick={() => setIsCorpTaxApplicable(!isCorpTaxApplicable)}
                className={`w-8 h-4 rounded-full transition-all relative ${isCorpTaxApplicable ? 'bg-gold' : theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isCorpTaxApplicable ? 'left-4.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
          <button 
            onClick={() => alert('Generating tax report for download...')}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
          >
            <Download className="w-4 h-4" />
            Download Tax Report
          </button>
        </div>
      </div>

      {/* Financial Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-8 rounded-3xl border shadow-sm space-y-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12% vs last month</span>
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Gross Revenue</p>
            <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{stats.revenue.toLocaleString()}</h3>
          </div>
          <div className={`flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>
            <ArrowUpRight className="w-3 h-3" />
            <span>Based on paid invoices</span>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border shadow-sm space-y-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
              <PieChart className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">36% of revenue</span>
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total Expenses</p>
            <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{stats.expenses.toLocaleString()}</h3>
          </div>
          <div className={`flex items-center gap-1 text-xs ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>
            <ArrowDownRight className="w-3 h-3" />
            <span>Materials & Overheads</span>
          </div>
        </div>

        <div className={`p-8 rounded-3xl shadow-xl border space-y-4 relative overflow-hidden ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="flex justify-between items-start relative z-10">
            <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10 text-gold' : 'bg-gold/10 text-gold'}`}>
              <Calculator className="w-6 h-6" />
            </div>
          </div>
          <div className="relative z-10">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>Estimated Net Profit</p>
            <h3 className="text-3xl font-bold text-gold">
              £{(stats.revenue - stats.expenses - (isVatRegistered ? stats.vatDue : 0) - (isCorpTaxApplicable ? stats.corpTax : 0)).toLocaleString()}
            </h3>
          </div>
          <p className={`text-[10px] uppercase tracking-widest font-bold relative z-10 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>After Tax Estimates</p>
        </div>
      </div>

      {/* Tax Liabilities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-8 rounded-3xl border shadow-sm ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            HMRC Tax Liabilities (Estimated)
          </h3>
          <div className="space-y-6">
            {isVatRegistered && (
              <div className={`flex items-center justify-between p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>VAT</span>
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>VAT (20%)</p>
                    <p className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Next Return: April 1st</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{stats.vatDue.toLocaleString()}</p>
                  <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Action Required</p>
                </div>
              </div>
            )}

            {isCorpTaxApplicable && (
              <div className={`flex items-center justify-between p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 ${
                theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>CT</span>
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Corporation Tax</p>
                    <p className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Estimated @ 19%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{stats.corpTax.toLocaleString()}</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Provisioned</p>
                </div>
              </div>
            )}

            {!isVatRegistered && !isCorpTaxApplicable && (
              <div className="p-8 text-center space-y-2">
                <ShieldCheck className={`w-12 h-12 mx-auto ${theme === 'dark' ? 'text-white/10' : 'text-slate-200'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>No tax liabilities currently active based on your settings.</p>
              </div>
            )}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border shadow-sm ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <Building2 className="w-5 h-5 text-gold" />
            Companies House Compliance
          </h3>
          <div className="space-y-6">
            <div className={`flex items-center gap-4 p-4 border rounded-2xl ${
              theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Confirmation Statement</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Last filed: Jan 2026. Next due: Jan 2027.</p>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Up to Date</span>
            </div>

            <div className={`flex items-center gap-4 p-4 border rounded-2xl ${
              theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Annual Accounts</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Period ending March 31st. Prepare data now.</p>
              </div>
              <button 
                onClick={() => alert('Starting annual accounts preparation...')}
                className="px-3 py-1 bg-gold text-charcoal text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-gold-light transition-all"
              >
                Start Prep
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className={`p-8 rounded-3xl relative overflow-hidden ${
        theme === 'dark' ? 'bg-charcoal text-white' : 'bg-slate-900 text-white'
      }`}>
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
