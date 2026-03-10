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

export const ProposalGenerator = ({ clients = [], theme = 'dark' }: { clients?: any[], theme?: 'dark' | 'light' }) => {
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
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Proposal Generator</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Create professional quotes for your leads and prospects.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSaveProposal}
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
            {isSending ? 'Sending...' : 'Send Proposal'}
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
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-8 rounded-3xl border shadow-sm space-y-8 ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
          }`}>
            {/* Header */}
            <div className={`flex justify-between items-start border-b pb-8 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold italic text-gold">PROPOSAL</h3>
                <div className={`flex items-center gap-2 text-xs font-mono ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>
                  <Hash className="w-3 h-3" />
                  {proposal.proposalNumber}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ProprietyLinks Ltd</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>London, United Kingdom</div>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <User className="w-3 h-3" />
                  Client Details
                </label>
                {clients.length > 0 ? (
                  <select 
                    className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                    value={proposal.clientName}
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
                    value={proposal.clientName}
                    onChange={e => setProposal({...proposal, clientName: e.target.value})}
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Client Email"
                  className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  value={proposal.clientEmail}
                  onChange={e => setProposal({...proposal, clientEmail: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <Calendar className="w-3 h-3" />
                  Dates
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Issue Date</span>
                    <input 
                      type="date" 
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-xs ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={proposal.date}
                      onChange={e => setProposal({...proposal, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Expiry Date</span>
                    <input 
                      type="date" 
                      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-xs ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={proposal.expiryDate}
                      onChange={e => setProposal({...proposal, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Scope of Work</label>
              <div className="space-y-3">
                {proposal.items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-200">
                    <input 
                      type="text" 
                      placeholder="Description"
                      className={`flex-1 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={item.description}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                    />
                    <input 
                      type="number" 
                      placeholder="Qty"
                      className={`w-20 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={item.quantity}
                      onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                    <input 
                      type="number" 
                      placeholder="Rate"
                      className={`w-32 border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                      value={item.rate}
                      onChange={e => updateItem(item.id, 'rate', Number(e.target.value))}
                    />
                    <button 
                      onClick={() => removeItem(item.id)}
                      className={`p-3 transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={addItem}
                className="flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-light transition-colors pt-2"
              >
                <Plus className="w-4 h-4" />
                Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div className={`border-t pt-8 flex justify-end ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="w-64 space-y-3">
                <div className={`flex justify-between text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <span>Subtotal</span>
                  <span>£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={`flex justify-between text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                  <span>VAT (20%)</span>
                  <span>£{vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className={`flex justify-between text-lg font-bold pt-3 border-t ${
                  theme === 'dark' ? 'text-white border-white/5' : 'text-slate-900 border-slate-100'
                }`}>
                  <span>Total Estimate</span>
                  <span className="text-gold">£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Terms & Conditions</label>
              <textarea 
                className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm min-h-[100px] ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
                value={proposal.notes}
                onChange={e => setProposal({...proposal, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h4 className={`text-sm font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Proposal Status</h4>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
              <div className={`w-3 h-3 rounded-full ${
                proposal.status === 'Draft' ? 'bg-white/20' : 
                proposal.status === 'Sent' ? 'bg-blue-500' : 
                proposal.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{proposal.status}</span>
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
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? '' : 'text-slate-500'}`}>Download</span>
              </button>
              <button 
                onClick={() => alert('Follow-up scheduled for this proposal.')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all group ${
                  theme === 'dark' ? 'bg-white/5 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 hover:bg-gold/10 hover:text-gold'
                }`}
                title="Schedule Follow-up"
              >
                <Clock className={`w-5 h-5 group-hover:text-gold ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? '' : 'text-slate-500'}`}>Follow-up</span>
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-gold/5 border-gold/20' : 'bg-gold/5 border-gold/20'
          }`}>
            <div className="flex items-center gap-2 text-gold font-bold text-xs mb-2">
              <Briefcase className="w-4 h-4" />
              CONVERSION TIP
            </div>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
              Proposals sent within 24 hours of a site visit have a 40% higher acceptance rate. Use our AI to draft the scope of work based on your notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
