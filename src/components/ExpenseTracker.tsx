import { useState, useEffect } from "react";
import { 
  Plus, 
  Receipt, 
  TrendingDown, 
  Filter, 
  Download,
  Trash2,
  Tag,
  Calendar,
  CreditCard
} from "lucide-react";

interface Expense {
  id: string;
  description: string;
  category: 'Materials' | 'Fuel' | 'Tools' | 'Insurance' | 'Subcontractor' | 'Other';
  amount: number;
  date: string;
  vendor: string;
  status: 'Paid' | 'Pending';
}

export const ExpenseTracker = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    category: 'Materials',
    status: 'Paid',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const savedExpenses = localStorage.getItem('propriety_expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      const sampleExpenses: Expense[] = [
        {
          id: '1',
          description: 'Copper Piping & Fittings',
          category: 'Materials',
          amount: 450.25,
          date: '2026-02-28',
          vendor: 'Screwfix',
          status: 'Paid'
        },
        {
          id: '2',
          description: 'Van Fuel',
          category: 'Fuel',
          amount: 85.00,
          date: '2026-03-01',
          vendor: 'Shell',
          status: 'Paid'
        },
        {
          id: '3',
          description: 'Public Liability Insurance',
          category: 'Insurance',
          amount: 1200.00,
          date: '2026-01-15',
          vendor: 'Direct Line',
          status: 'Paid'
        }
      ];
      setExpenses(sampleExpenses);
      localStorage.setItem('propriety_expenses', JSON.stringify(sampleExpenses));
    }
  }, []);

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Math.random().toString(36).substr(2, 9),
        description: newExpense.description,
        category: newExpense.category as any,
        amount: Number(newExpense.amount),
        date: newExpense.date || new Date().toISOString().split('T')[0],
        vendor: newExpense.vendor || 'Unknown',
        status: newExpense.status as any
      };
      const updated = [expense, ...expenses];
      setExpenses(updated);
      localStorage.setItem('propriety_expenses', JSON.stringify(updated));
      setIsAdding(false);
      setNewExpense({ category: 'Materials', status: 'Paid', date: new Date().toISOString().split('T')[0] });
    }
  };

  const deleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    localStorage.setItem('propriety_expenses', JSON.stringify(updated));
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Expense & Bill Tracking</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Record your business costs for tax and profit analysis.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Exporting expenses for accountant...')}
            className={`flex items-center gap-2 px-4 py-2 border transition-all font-bold text-sm rounded-xl ${
            theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}>
            <Download className="w-4 h-4" />
            Export for Accountant
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold text-sm shadow-lg shadow-red-900/20"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total Outgoings (YTD)</p>
            <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border flex flex-col justify-center ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>Tax Deductible Estimate</p>
          <p className="text-lg font-bold text-green-500">£{(totalExpenses * 0.19).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {isAdding && (
        <div className={`p-8 rounded-2xl shadow-xl border space-y-6 animate-in zoom-in-95 duration-200 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Receipt className="w-5 h-5 text-gold" />
            New Business Expense
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Description</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="e.g. New Drill Bits"
                value={newExpense.description || ''}
                onChange={e => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Category</label>
              <select 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newExpense.category}
                onChange={e => setNewExpense({...newExpense, category: e.target.value as any})}
              >
                <option value="Materials" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Materials</option>
                <option value="Fuel" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Fuel</option>
                <option value="Tools" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Tools</option>
                <option value="Insurance" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Insurance</option>
                <option value="Subcontractor" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Subcontractor</option>
                <option value="Other" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Amount (£)</label>
              <input 
                type="number" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="0.00"
                value={newExpense.amount || ''}
                onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Vendor</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="e.g. B&Q"
                value={newExpense.vendor || ''}
                onChange={e => setNewExpense({...newExpense, vendor: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Date</label>
              <input 
                type="date" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newExpense.date}
                onChange={e => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            <div className="flex items-end gap-3">
              <button 
                onClick={() => setIsAdding(false)}
                className={`flex-1 py-3 border rounded-xl font-bold text-xs transition-all ${
                  theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={handleAddExpense}
                className="flex-1 py-3 bg-gold text-charcoal rounded-xl font-bold text-xs hover:bg-gold-light transition-all"
              >
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`rounded-2xl shadow-sm border overflow-hidden ${
        theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Transactions</h3>
          <button 
            onClick={() => alert('Opening expense filters...')}
            className={`p-2 transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                theme === 'dark' ? 'bg-white/[0.02] text-white/40' : 'bg-slate-50 text-slate-500'
              }`}>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Vendor</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
              {expenses.map((expense) => (
                <tr key={expense.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                      <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{expense.description}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                      theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Tag className="w-3 h-3" />
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{expense.vendor}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-red-500">-£{expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => deleteExpense(expense.id)}
                      className={`p-2 transition-colors opacity-0 group-hover:opacity-100 ${
                        theme === 'dark' ? 'text-white/10 hover:text-red-500' : 'text-slate-300 hover:text-red-500'
                      }`}
                      title="Delete Expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
