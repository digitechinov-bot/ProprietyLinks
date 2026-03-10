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
  CreditCard,
  Building2,
  FileText,
  CheckCircle2,
  Clock
} from "lucide-react";

interface SupplierInvoice {
  id: string;
  supplierName: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  category: string;
  description: string;
}

export const SupplierInvoicing = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [invoices, setInvoices] = useState<SupplierInvoice[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Partial<SupplierInvoice>>({
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    const saved = localStorage.getItem('propriety_supplier_invoices');
    if (saved) {
      setInvoices(JSON.parse(saved));
    } else {
      const sample: SupplierInvoice[] = [
        {
          id: '1',
          supplierName: 'Screwfix',
          invoiceNumber: 'INV-SF-9921',
          amount: 1250.40,
          date: '2026-03-01',
          dueDate: '2026-03-31',
          status: 'Pending',
          category: 'Materials',
          description: 'Copper pipes and fittings for Kensington project'
        },
        {
          id: '2',
          supplierName: 'Travis Perkins',
          invoiceNumber: 'TP-8821',
          amount: 4500.00,
          date: '2026-02-15',
          dueDate: '2026-03-15',
          status: 'Paid',
          category: 'Materials',
          description: 'Structural timber for extension'
        }
      ];
      setInvoices(sample);
      localStorage.setItem('propriety_supplier_invoices', JSON.stringify(sample));
    }
  }, []);

  const handleAdd = () => {
    if (newInvoice.supplierName && newInvoice.amount) {
      const invoice: SupplierInvoice = {
        id: Math.random().toString(36).substr(2, 9),
        supplierName: newInvoice.supplierName,
        invoiceNumber: newInvoice.invoiceNumber || `SUP-${Math.floor(Math.random() * 10000)}`,
        amount: Number(newInvoice.amount),
        date: newInvoice.date || new Date().toISOString().split('T')[0],
        dueDate: newInvoice.dueDate || new Date().toISOString().split('T')[0],
        status: newInvoice.status as any,
        category: newInvoice.category || 'Materials',
        description: newInvoice.description || ''
      };
      const updated = [invoice, ...invoices];
      setInvoices(updated);
      localStorage.setItem('propriety_supplier_invoices', JSON.stringify(updated));
      setIsAdding(false);
      setNewInvoice({ status: 'Pending', date: new Date().toISOString().split('T')[0] });
    }
  };

  const deleteInvoice = (id: string) => {
    const updated = invoices.filter(i => i.id !== id);
    setInvoices(updated);
    localStorage.setItem('propriety_supplier_invoices', JSON.stringify(updated));
  };

  const toggleStatus = (id: string) => {
    const updated = invoices.map(i => {
      if (i.id === id) {
        return { ...i, status: i.status === 'Paid' ? 'Pending' : 'Paid' as any };
      }
      return i;
    });
    setInvoices(updated);
    localStorage.setItem('propriety_supplier_invoices', JSON.stringify(updated));
  };

  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Supplier Invoicing</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Manage and track bills from your trade suppliers.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            Add Supplier Bill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total Accounts Payable</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{totalPending.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Paid This Month</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className={`p-8 rounded-2xl shadow-xl border space-y-6 animate-in zoom-in-95 duration-200 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gold" />
            New Supplier Invoice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Supplier Name</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="e.g. Travis Perkins"
                value={newInvoice.supplierName || ''}
                onChange={e => setNewInvoice({...newInvoice, supplierName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Invoice #</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="INV-001"
                value={newInvoice.invoiceNumber || ''}
                onChange={e => setNewInvoice({...newInvoice, invoiceNumber: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Amount (£)</label>
              <input 
                type="number" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="0.00"
                value={newInvoice.amount || ''}
                onChange={e => setNewInvoice({...newInvoice, amount: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Date</label>
              <input 
                type="date" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newInvoice.date}
                onChange={e => setNewInvoice({...newInvoice, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Due Date</label>
              <input 
                type="date" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newInvoice.dueDate}
                onChange={e => setNewInvoice({...newInvoice, dueDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Category</label>
              <select 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newInvoice.category}
                onChange={e => setNewInvoice({...newInvoice, category: e.target.value})}
              >
                <option value="Materials" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Materials</option>
                <option value="Subcontractor" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Subcontractor</option>
                <option value="Tools" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Tools</option>
                <option value="Fuel" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Fuel</option>
                <option value="Other" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Other</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Description</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="What was this for?"
                value={newInvoice.description || ''}
                onChange={e => setNewInvoice({...newInvoice, description: e.target.value})}
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
                onClick={handleAdd}
                className="flex-1 py-3 bg-gold text-charcoal rounded-xl font-bold text-xs hover:bg-gold-light transition-all"
              >
                Save Bill
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`rounded-2xl shadow-sm border overflow-hidden ${
        theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Supplier Bills & Invoices</h3>
          <button 
            onClick={() => alert('Opening supplier invoice filters...')}
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
                <th className="px-8 py-5">Supplier</th>
                <th className="px-8 py-5">Invoice #</th>
                <th className="px-8 py-5">Due Date</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                  <td className="px-8 py-6">
                    <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{invoice.supplierName}</div>
                    <div className={`text-[10px] uppercase tracking-widest mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{invoice.category}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`text-sm font-mono ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{invoice.invoiceNumber}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                      <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(invoice.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                        invoice.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 
                        invoice.status === 'Overdue' ? 'bg-red-500/10 text-red-500' : 
                        'bg-orange-500/10 text-orange-500'
                      }`}
                    >
                      {invoice.status}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className={`flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all`}>
                      <button 
                        onClick={() => deleteInvoice(invoice.id)}
                        className={`p-2 transition-colors ${theme === 'dark' ? 'text-white/10 hover:text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
