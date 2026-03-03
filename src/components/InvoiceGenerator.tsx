import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  Save, 
  FileText,
  User,
  Calendar,
  Hash,
  CreditCard
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  notes: string;
}

export const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    id: Math.random().toString(36).substr(2, 9),
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [{ id: '1', description: 'Initial Consultation', quantity: 1, rate: 0 }],
    status: 'Draft',
    notes: "Thank you for your business!"
  });

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (id: string) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Invoice Generator</h2>
          <p className="text-slate-500 text-sm">Create professional invoices for your clients.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold text-sm shadow-lg shadow-slate-200"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Client Information
                </h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Client Name"
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                    value={invoice.clientName}
                    onChange={(e) => setInvoice({...invoice, clientName: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Client Email"
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                    value={invoice.clientEmail}
                    onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})}
                  />
                  <textarea 
                    placeholder="Client Address"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm resize-none"
                    value={invoice.clientAddress}
                    onChange={(e) => setInvoice({...invoice, clientAddress: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Invoice Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-24">Number:</span>
                    <input 
                      type="text" 
                      className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm font-mono"
                      value={invoice.invoiceNumber}
                      onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-24">Date:</span>
                    <input 
                      type="date" 
                      className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      value={invoice.date}
                      onChange={(e) => setInvoice({...invoice, date: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-24">Due Date:</span>
                    <input 
                      type="date" 
                      className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      value={invoice.dueDate}
                      onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Line Items
              </h3>
              <div className="space-y-3">
                {invoice.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start group">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Description"
                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <input 
                        type="number" 
                        placeholder="Qty"
                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm text-center"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">£</span>
                        <input 
                          type="number" 
                          placeholder="Rate"
                          className="w-full bg-slate-50 border border-slate-200 p-3 pl-7 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addItem}
                  className="flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-dark transition-colors px-2 py-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Line Item
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Additional Notes</label>
              <textarea 
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm resize-none"
                value={invoice.notes}
                onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Summary & Preview */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-white/5 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="font-bold">£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">VAT (20%)</span>
                <span className="font-bold">£{vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-bold text-gold">£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Bank Details</p>
                <p className="text-xs font-mono">ProprietyLinks Ltd</p>
                <p className="text-xs font-mono">Sort: 20-45-77</p>
                <p className="text-xs font-mono">Account: 88342210</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                <Calendar className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
