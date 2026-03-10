import { useState, useEffect } from "react";
import { 
  Users, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Trash2, 
  ShieldCheck, 
  Briefcase,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: 'Lead Engineer' | 'Engineer' | 'Apprentice' | 'Subcontractor';
  specialty: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Site' | 'Off Duty';
  location?: string;
  rating: number;
}

export const TeamManagement = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    role: 'Engineer',
    status: 'Active',
    rating: 5
  });

  useEffect(() => {
    const saved = localStorage.getItem('propriety_team');
    if (saved) {
      setTeam(JSON.parse(saved));
    } else {
      const sample: TeamMember[] = [
        {
          id: '1',
          name: 'Alex Thompson',
          role: 'Lead Engineer',
          specialty: 'Gas Safe / Plumbing',
          phone: '07926325725',
          email: 'alex@propriety.com',
          status: 'On Site',
          location: 'Kensington W8',
          rating: 5
        },
        {
          id: '2',
          name: 'David Miller',
          role: 'Engineer',
          specialty: 'Electrical / Smart Home',
          phone: '07926325725',
          email: 'david@propriety.com',
          status: 'Active',
          rating: 4.8
        },
        {
          id: '3',
          name: 'Sarah Chen',
          role: 'Subcontractor',
          specialty: 'Interior Design',
          phone: '07926325725',
          email: 'sarah@chen.com',
          status: 'Off Duty',
          rating: 5
        }
      ];
      setTeam(sample);
      localStorage.setItem('propriety_team', JSON.stringify(sample));
    }
  }, []);

  const handleAdd = () => {
    if (newMember.name && newMember.role) {
      const member: TeamMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: newMember.name,
        role: newMember.role as any,
        specialty: newMember.specialty || 'General',
        phone: newMember.phone || '07926325725',
        email: newMember.email || 'pending@propriety.com',
        status: newMember.status as any,
        rating: newMember.rating || 5
      };
      const updated = [...team, member];
      setTeam(updated);
      localStorage.setItem('propriety_team', JSON.stringify(updated));
      setIsAdding(false);
      setNewMember({ role: 'Engineer', status: 'Active', rating: 5 });
    }
  };

  const deleteMember = (id: string) => {
    const updated = team.filter(m => m.id !== id);
    setTeam(updated);
    localStorage.setItem('propriety_team', JSON.stringify(updated));
  };

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Team & Staff Management</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Manage your engineers, track locations, and assign roles.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            Add Team Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total Staff</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{team.length}</h3>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>On Site Now</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{team.filter(m => m.status === 'On Site').length}</h3>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className={`p-8 rounded-2xl shadow-xl border space-y-6 animate-in zoom-in-95 duration-200 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Plus className="w-5 h-5 text-gold" />
            New Team Member
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Full Name</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="e.g. John Doe"
                value={newMember.name || ''}
                onChange={e => setNewMember({...newMember, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Role</label>
              <select 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={newMember.role}
                onChange={e => setNewMember({...newMember, role: e.target.value as any})}
              >
                <option value="Lead Engineer" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Lead Engineer</option>
                <option value="Engineer" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Engineer</option>
                <option value="Apprentice" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Apprentice</option>
                <option value="Subcontractor" className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Subcontractor</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Specialty</label>
              <input 
                type="text" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="e.g. Gas Safe"
                value={newMember.specialty || ''}
                onChange={e => setNewMember({...newMember, specialty: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Phone</label>
              <input 
                type="tel" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="07..."
                value={newMember.phone || ''}
                onChange={e => setNewMember({...newMember, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Email</label>
              <input 
                type="email" 
                className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="email@propriety.com"
                value={newMember.email || ''}
                onChange={e => setNewMember({...newMember, email: e.target.value})}
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
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className={`rounded-2xl border overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 hover:border-gold/50' : 'bg-white border-slate-200 hover:border-gold'
          }`}>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{member.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteMember(member.id)}
                  className={`p-2 transition-colors opacity-0 group-hover:opacity-100 ${
                    theme === 'dark' ? 'text-white/10 hover:text-red-500' : 'text-slate-300 hover:text-red-500'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                  <Briefcase className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                  {member.specialty}
                </div>
                <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                  <Phone className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                  {member.phone}
                </div>
                <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                  <Mail className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                  {member.email}
                </div>
              </div>

              <div className={`pt-6 border-t flex items-center justify-between ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    member.status === 'On Site' ? 'bg-green-500 animate-pulse' : 
                    member.status === 'Active' ? 'bg-blue-500' : 'bg-white/10'
                  }`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>{member.status}</span>
                </div>
                {member.location && (
                  <div className={`flex items-center gap-1 text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                    <MapPin className="w-3 h-3" />
                    {member.location}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 border ${
        theme === 'dark' ? 'bg-gold/5 border-gold/20' : 'bg-gold/10 border-gold/30'
      }`}>
        <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Live GPS Tracking & Safety</h4>
          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
            All engineers on site are tracked via the mobile app. This ensures safety compliance and allows for real-time customer updates on arrival times.
          </p>
        </div>
        <button 
          onClick={() => alert('Opening live GPS tracking map...')}
          className="px-6 py-3 bg-gold text-charcoal rounded-xl font-bold text-sm hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
        >
          View Live Map
        </button>
      </div>
    </div>
  );
};
