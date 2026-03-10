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
  CreditCard,
  Send,
  CheckCircle,
  Mail
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

export const InvoiceGenerator = ({ clients = [], theme = 'dark' }: { clients?: any[], theme?: 'dark' | 'light' }) => {
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

  const handleClientSelect = (clientName: string) => {
    const selectedClient = clients.find(c => c.name === clientName);
    if (selectedClient) {
      setInvoice({
        ...invoice,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email || '',
        clientAddress: selectedClient.address || ''
      });
    } else {
      setInvoice({ ...invoice, clientName });
    }
  };

  const [isSending, setIsSending] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

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

  const handleSendEmail = () => {
    setIsSending(true);
    // Simulate email sending
    setTimeout(() => {
      setIsSending(false);
      alert(`Invoice ${invoice.invoiceNumber} has been sent to ${invoice.clientEmail || 'the client'}`);
    }, 1500);
  };

  const handleMarkAsPaid = () => {
    setIsPaid(true);
    setInvoice({ ...invoice, status: 'Paid' });
  };

  const handleSaveInvoice = () => {
    const savedInvoices = JSON.parse(localStorage.getItem('propriety_invoices') || '[]');
    localStorage.setItem('propriety_invoices', JSON.stringify([...savedInvoices, invoice]));
    alert(`Invoice ${invoice.invoiceNumber} has been saved.`);
  };

  const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Invoice Generator</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Create professional invoices for your clients.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleMarkAsPaid}
            disabled={isPaid}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all font-bold text-sm ${
              isPaid 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {isPaid ? <CheckCircle className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
            {isPaid ? 'Paid' : 'Mark Paid'}
          </button>
          <button 
            onClick={handleSaveInvoice}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all font-bold text-sm ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button 
            onClick={handleSendEmail}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20 disabled:opacity-50"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSending ? 'Sending...' : 'Send Email'}
          </button>
          <button 
            onClick={() => window.print()}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all font-bold text-sm shadow-lg ${
              theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20 shadow-black/20' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'
            }`}
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-8 rounded-2xl shadow-sm border space-y-8 ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
          }`}>
            {/* Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <User className="w-4 h-4" />
                  Client Information
                </h3>
                <div className="space-y-3">
                  {clients.length > 0 ? (
                    <select 
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={invoice.clientName}
                      onChange={(e) => handleClientSelect(e.target.value)}
                    >
                      <option value="" className={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}>Select Existing Client...</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.name} className={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}>{c.name}</option>
                      ))}
                      <option value="custom" className={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}>+ Add New Client Manually</option>
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      placeholder="Client Name"
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={invoice.clientName}
                      onChange={(e) => setInvoice({...invoice, clientName: e.target.value})}
                    />
                  )}
                  <input 
                    type="email" 
                    placeholder="Client Email"
                    className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    value={invoice.clientEmail}
                    onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})}
                  />
                  <textarea 
                    placeholder="Client Address"
                    rows={3}
                    className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm resize-none ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    value={invoice.clientAddress}
                    onChange={(e) => setInvoice({...invoice, clientAddress: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <Hash className="w-4 h-4" />
                  Invoice Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold w-24 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Number:</span>
                    <input 
                      type="text" 
                      className={`flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm font-mono ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={invoice.invoiceNumber}
                      onChange={(e) => setInvoice({...invoice, invoiceNumber: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold w-24 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Date:</span>
                    <input 
                      type="date" 
                      className={`flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={invoice.date}
                      onChange={(e) => setInvoice({...invoice, date: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold w-24 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Due Date:</span>
                    <input 
                      type="date" 
                      className={`flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={invoice.dueDate}
                      onChange={(e) => setInvoice({...invoice, dueDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
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
                        className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <input 
                        type="number" 
                        placeholder="Qty"
                        className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm text-center ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="w-32">
                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>£</span>
                        <input 
                          type="number" 
                          placeholder="Rate"
                          className={`w-full border p-3 pl-7 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                            theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className={`p-3 transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={addItem}
                  className="flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-light transition-colors px-2 py-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Line Item
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Additional Notes</label>
              <textarea 
                rows={3}
                className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm resize-none ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
                value={invoice.notes}
                onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Summary & Preview */}
        <div className="space-y-6">
          <div className={`p-8 rounded-2xl shadow-xl border space-y-6 ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
              <CreditCard className="w-4 h-4" />
              Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className={theme === 'dark' ? 'text-white/60' : 'text-slate-500'}>Subtotal</span>
                <span className="font-bold">£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className={theme === 'dark' ? 'text-white/60' : 'text-slate-500'}>VAT (20%)</span>
                <span className="font-bold">£{vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={`h-px my-2 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-bold text-gold">£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="pt-4">
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Bank Details</p>
                <p className="text-xs font-mono">ProprietyLinks Ltd</p>
                <p className="text-xs font-mono">Sort: 20-45-77</p>
                <p className="text-xs font-mono">Account: 88342210</p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h4 className={`text-sm font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => alert('Generating PDF for download...')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all group ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 hover:bg-gold/10 hover:text-gold'
                }`}
                title="Download as PDF"
              >
                <Download className={`w-5 h-5 group-hover:text-gold ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>Download</span>
              </button>
              <button 
                onClick={() => alert('Payment reminder scheduled for this client.')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all group ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 hover:bg-gold/10 hover:text-gold'
                }`}
                title="Schedule Payment Reminder"
              >
                <Calendar className={`w-5 h-5 group-hover:text-gold ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
