import React, { useState, useEffect } from "react";
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

export const ClientManager = ({ autoOpen, onModalClose, onAction }: { autoOpen?: boolean, onModalClose?: () => void, onAction?: (action: string, data?: any) => void }) => {
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Client Directory</h2>
          <p className="text-slate-500 text-sm">Manage your customer relationships and project history.</p>
        </div>
        <button 
          onClick={() => setIsAddingClient(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold text-sm shadow-lg shadow-slate-200"
        >
          <UserPlus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      {isAddingClient && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Add New Client</h3>
              <button onClick={() => setIsAddingClient(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="07926 000000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Address</label>
                <input 
                  required
                  type="text" 
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                  placeholder="123 Street, London"
                />
              </div>
              <button type="submit" className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all mt-4 shadow-lg shadow-gold/20">
                Save Client
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clients by name or email..."
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-xs">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Projects</th>
                <th className="px-8 py-5">Total Revenue</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold-dark flex items-center justify-center font-bold text-sm">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{client.name}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {client.address.split(',')[0]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {client.email}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-2">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-300" />
                      <span className="text-sm font-bold text-slate-700">{client.totalProjects} Jobs</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-900">£{client.totalSpent.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Lifetime Value</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      client.status === 'Active' ? 'bg-green-100 text-green-600' : 
                      client.status === 'Lead' ? 'bg-blue-100 text-blue-600' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        client.status === 'Active' ? 'bg-green-600' : 
                        client.status === 'Lead' ? 'bg-blue-600' : 
                        'bg-slate-600'
                      }`} />
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onAction?.('create-project', { clientName: client.name })}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-all shadow-sm"
                        title="Create Project for this Client"
                      >
                        <Plus className="w-3 h-3" />
                        Create Project
                      </button>
                      <button 
                        className="p-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-slate-900 hover:border-slate-900 transition-all"
                        title="View Client Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-slate-900 hover:border-slate-900 transition-all"
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
