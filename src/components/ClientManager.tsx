import React, { useState, useEffect } from "react";
import { fetchClients } from "../services/supabaseService";
import { 
  UserPlus, 
  Search, 
  MoreVertical, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase,
  ExternalLink,
  Filter,
  X,
  Plus
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalProjects: number;
  totalSpent: number;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Lead';
}

export const ClientManager = ({ autoOpen, onModalClose, onAction, theme = 'dark' }: { autoOpen?: boolean, onModalClose?: () => void, onAction?: (action: string, data?: any) => void, theme?: 'dark' | 'light' }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsAddingClient(true);
      if (onModalClose) onModalClose();
    }
  }, [autoOpen]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        if (data && data.length > 0) {
          setClients(data);
        } else {
          // Fallback to local storage or sample data
          const savedClients = localStorage.getItem('propriety_clients');
          if (savedClients) {
            setClients(JSON.parse(savedClients));
          } else {
            const sampleClients: Client[] = [
              {
                id: '1',
                name: 'James Kensington',
                email: 'james@kensington-estates.com',
                phone: '07926 325725',
                address: '12 Kensington High St, London W8 4PT',
                totalProjects: 3,
                totalSpent: 45000,
                lastActive: new Date().toISOString(),
                status: 'Active'
              },
              {
                id: '2',
                name: 'Sarah Miller',
                email: 'sarah.m@gmail.com',
                phone: '07926 325725',
                address: '45 Chelsea Manor, London SW3 5RP',
                totalProjects: 1,
                totalSpent: 12500,
                lastActive: new Date(Date.now() - 15 * 86400000).toISOString(),
                status: 'Active'
              },
              {
                id: '3',
                name: 'Robert Wilson',
                email: 'robert@wilson-arch.com',
                phone: '07926 325725',
                address: '88 Westminster Bridge Rd, London SE1 7RW',
                totalProjects: 0,
                totalSpent: 0,
                lastActive: new Date(Date.now() - 2 * 86400000).toISOString(),
                status: 'Lead'
              }
            ];
            setClients(sampleClients);
            localStorage.setItem('propriety_clients', JSON.stringify(sampleClients));
          }
        }
      } catch (error) {
        console.error('Failed to fetch clients from Supabase:', error);
        const savedClients = localStorage.getItem('propriety_clients');
        if (savedClients) setClients(JSON.parse(savedClients));
      }
    };

    loadClients();
  }, []);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client: Client = {
      id: Math.random().toString(36).substr(2, 9),
      ...newClient,
      totalProjects: 0,
      totalSpent: 0,
      lastActive: new Date().toISOString(),
      status: 'Active'
    };
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    localStorage.setItem('propriety_clients', JSON.stringify(updatedClients));
    setIsAddingClient(false);
    setNewClient({ name: '', email: '', phone: '', address: '' });
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Client Directory</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Manage your customer relationships and project history.</p>
        </div>
        <button 
          onClick={() => setIsAddingClient(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
        >
          <UserPlus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      {isAddingClient && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md ${theme === 'dark' ? 'bg-[#0A0A0A]/90' : 'bg-slate-900/60'}`}>
          <div className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border ${
            theme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-8 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5 bg-[#121212]' : 'border-slate-100 bg-white'}`}>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Add New Client</h3>
              <button onClick={() => setIsAddingClient(false)} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className={`p-8 space-y-6 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                  }`}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                  }`}
                  placeholder="07926 000000"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Address</label>
                <input 
                  required
                  type="text" 
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                  }`}
                  placeholder="123 Street, London"
                />
              </div>
              <button type="submit" className="w-full bg-gold text-charcoal py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all mt-4 shadow-xl shadow-gold/20">
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`rounded-2xl shadow-sm border overflow-hidden ${
        theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-6 border-b flex flex-col sm:flex-row gap-4 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`} />
            <input 
              type="text" 
              placeholder="Search clients by name or email..."
              className={`w-full border pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => alert('Opening client filters...')}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all font-bold text-xs ${
            theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}>
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[10px] uppercase tracking-[0.2em] font-bold ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-50 text-slate-500'}`}>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Projects</th>
                <th className="px-8 py-5">Total Revenue</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
              {filteredClients.map((client) => (
                <tr key={client.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{client.name}</div>
                        <div className={`text-xs flex items-center gap-1 mt-0.5 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                          <MapPin className="w-3 h-3" />
                          {client.address.split(',')[0]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className={`text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                        <Mail className={`w-3 h-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                        {client.email}
                      </div>
                      <div className={`text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                        <Phone className={`w-3 h-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                      <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{client.totalProjects} Jobs</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-gold">£{client.totalSpent.toLocaleString()}</div>
                    <div className={`text-[10px] uppercase tracking-widest mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Lifetime Value</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      client.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                      client.status === 'Lead' ? 'bg-blue-500/10 text-blue-500' : 
                      theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Active' ? 'bg-green-500' : 
                        client.status === 'Lead' ? 'bg-blue-500' : 
                        theme === 'dark' ? 'bg-white/40' : 'bg-slate-400'
                      }`} />
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onAction?.('create-project', { clientName: client.name })}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gold text-charcoal text-[10px] font-bold rounded-lg hover:bg-gold-light transition-all shadow-sm"
                        title="Create Project for this Client"
                      >
                        <Plus className="w-3 h-3" />
                        Create Project
                      </button>
                      <button 
                        onClick={() => alert(`Viewing profile for ${client.name}...`)}
                        className={`p-2 border rounded-lg transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-gold' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
                        }`}
                        title="View Client Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => alert('More options for this client...')}
                        className={`p-2 border rounded-lg transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-gold' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
                        }`}
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
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
