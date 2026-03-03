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

export const ExpenseTracker = () => {
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Expense & Bill Tracking</h2>
          <p className="text-slate-500 text-sm">Record your business costs for tax and profit analysis.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm">
            <Download className="w-4 h-4" />
            Export for Accountant
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold text-sm shadow-lg shadow-red-100"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Outgoings (YTD)</p>
            <h3 className="text-3xl font-bold text-slate-900">£{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tax Deductible Estimate</p>
          <p className="text-lg font-bold text-green-600">£{(totalExpenses * 0.19).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {isAdding && (
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Receipt className="w-5 h-5 text-gold" />
            New Business Expense
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Description</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                placeholder="e.g. New Drill Bits"
                value={newExpense.description || ''}
                onChange={e => setNewExpense({...newExpense, description: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Category</label>
              <select 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                value={newExpense.category}
                onChange={e => setNewExpense({...newExpense, category: e.target.value as any})}
              >
                <option value="Materials">Materials</option>
                <option value="Fuel">Fuel</option>
                <option value="Tools">Tools</option>
                <option value="Insurance">Insurance</option>
                <option value="Subcontractor">Subcontractor</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Amount (£)</label>
              <input 
                type="number" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                placeholder="0.00"
                value={newExpense.amount || ''}
                onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Vendor</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                placeholder="e.g. B&Q"
                value={newExpense.vendor || ''}
                onChange={e => setNewExpense({...newExpense, vendor: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Date</label>
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                value={newExpense.date}
                onChange={e => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            <div className="flex items-end gap-3">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 border border-white/10 rounded-xl font-bold text-xs hover:bg-white/5 transition-all"
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Vendor</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{expense.description}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                      <Tag className="w-3 h-3" />
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm text-slate-600">{expense.vendor}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-red-600">-£{expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => deleteExpense(expense.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
