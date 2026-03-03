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
  Send,
  CheckCircle,
  Mail,
  Clock,
  Briefcase
} from "lucide-react";

interface ProposalItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface ProposalData {
  proposalNumber: string;
  clientName: string;
  clientEmail: string;
  date: string;
  expiryDate: string;
  items: ProposalItem[];
  notes: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
}

export const ProposalGenerator = ({ clients = [] }: { clients?: any[] }) => {
  const [proposal, setProposal] = useState<ProposalData>({
    proposalNumber: `PROP-${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: "",
    clientEmail: "",
    date: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    items: [
      { id: '1', description: 'Initial Consultation & Site Survey', quantity: 1, rate: 0 },
      { id: '2', description: 'Material Procurement & Logistics', quantity: 1, rate: 1200 },
    ],
    notes: "This proposal is valid for 30 days. Prices include standard labor and materials as discussed.",
    status: 'Draft'
  });

  const handleClientSelect = (clientName: string) => {
    const selectedClient = clients.find(c => c.name === clientName);
    if (selectedClient) {
      setProposal({
        ...proposal,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email || '',
      });
    } else {
      setProposal({ ...proposal, clientName });
    }
  };

  const [isSending, setIsSending] = useState(false);

  const addItem = () => {
    setProposal({
      ...proposal,
      items: [...proposal.items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (id: string) => {
    setProposal({
      ...proposal,
      items: proposal.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof ProposalItem, value: string | number) => {
    setProposal({
      ...proposal,
      items: proposal.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const handleSendEmail = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setProposal({ ...proposal, status: 'Sent' });
      alert(`Proposal ${proposal.proposalNumber} has been sent to ${proposal.clientEmail || 'the client'}`);
    }, 1500);
  };

  const handleSaveProposal = () => {
    const savedProposals = JSON.parse(localStorage.getItem('propriety_proposals') || '[]');
    localStorage.setItem('propriety_proposals', JSON.stringify([...savedProposals, proposal]));
    alert(`Proposal ${proposal.proposalNumber} has been saved.`);
  };

  const subtotal = proposal.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Proposal Generator</h2>
          <p className="text-slate-500 text-sm">Create professional quotes for your leads and prospects.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSaveProposal}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-bold text-sm"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button 
            onClick={handleSendEmail}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-100 disabled:opacity-50"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSending ? 'Sending...' : 'Send Proposal'}
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
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold italic text-gold-dark">PROPOSAL</h3>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Hash className="w-3 h-3" />
                  {proposal.proposalNumber}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900">ProprietyLinks Ltd</div>
                <div className="text-xs text-slate-500">London, United Kingdom</div>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Client Details
                </label>
                {clients.length > 0 ? (
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                    value={proposal.clientName}
                    onChange={(e) => handleClientSelect(e.target.value)}
                  >
                    <option value="">Select Existing Client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="custom">+ Add New Client Manually</option>
                  </select>
                ) : (
                  <input 
                    type="text" 
                    placeholder="Client Name"
                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                    value={proposal.clientName}
                    onChange={e => setProposal({...proposal, clientName: e.target.value})}
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Client Email"
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                  value={proposal.clientEmail}
                  onChange={e => setProposal({...proposal, clientEmail: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Dates
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">Issue Date</span>
                    <input 
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-xs"
                      value={proposal.date}
                      onChange={e => setProposal({...proposal, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">Expiry Date</span>
                    <input 
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-xs"
                      value={proposal.expiryDate}
                      onChange={e => setProposal({...proposal, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scope of Work</label>
              <div className="space-y-3">
                {proposal.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-200">
                    <input 
                      type="text" 
                      placeholder="Description"
                      className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      value={item.description}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                    />
                    <input 
                      type="number" 
                      placeholder="Qty"
                      className="w-20 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      value={item.quantity}
                      onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                    <input 
                      type="number" 
                      placeholder="Rate"
                      className="w-32 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      value={item.rate}
                      onChange={e => updateItem(item.id, 'rate', Number(e.target.value))}
                    />
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 text-xs font-bold text-gold-dark hover:text-gold transition-colors pt-2"
              >
                <Plus className="w-4 h-4" />
                Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div className="border-t border-slate-100 pt-8 flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>VAT (20%)</span>
                  <span>£{vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-100">
                  <span>Total Estimate</span>
                  <span>£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Terms & Conditions</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm min-h-[100px]"
                value={proposal.notes}
                onChange={e => setProposal({...proposal, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold mb-4">Proposal Status</h4>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${
                proposal.status === 'Draft' ? 'bg-slate-400' : 
                proposal.status === 'Sent' ? 'bg-blue-500' : 
                proposal.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-bold text-slate-700">{proposal.status}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h4 className="text-sm font-bold mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group"
                title="Download as PDF"
              >
                <Download className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
              </button>
              <button 
                className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group"
                title="Schedule Follow-up"
              >
                <Clock className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Follow-up</span>
              </button>
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-gold-dark font-bold text-xs mb-2">
              <Briefcase className="w-4 h-4" />
              CONVERSION TIP
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proposals sent within 24 hours of a site visit have a 40% higher acceptance rate. Use our AI to draft the scope of work based on your notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
