import { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  Zap
} from "lucide-react";

interface DigitalForm {
  id: string;
  title: string;
  type: 'Gas Safety' | 'Electrical' | 'Risk Assessment' | 'Job Sheet';
  client: string;
  date: string;
  status: 'Draft' | 'Signed' | 'Sent';
  engineer: string;
}

export const FormsCertificates = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [forms, setForms] = useState<DigitalForm[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('propriety_forms');
    if (saved) {
      setForms(JSON.parse(saved));
    } else {
      const sample: DigitalForm[] = [
        {
          id: '1',
          title: 'CP12 Gas Safety Certificate',
          type: 'Gas Safety',
          client: 'James Kensington',
          date: '2026-03-01',
          status: 'Signed',
          engineer: 'Alex Thompson'
        },
        {
          id: '2',
          title: 'EICR - Electrical Inspection',
          type: 'Electrical',
          client: 'Sarah Jones',
          date: '2026-02-28',
          status: 'Draft',
          engineer: 'David Miller'
        },
        {
          id: '3',
          title: 'Site Risk Assessment',
          type: 'Risk Assessment',
          client: 'Michael Brown',
          date: '2026-03-04',
          status: 'Sent',
          engineer: 'Alex Thompson'
        }
      ];
      setForms(sample);
      localStorage.setItem('propriety_forms', JSON.stringify(sample));
    }
  }, []);

  const formTemplates = [
    { title: 'Gas Safety (CP12)', icon: ShieldCheck, color: 'orange' },
    { title: 'Electrical (EICR)', icon: Zap, color: 'blue' },
    { title: 'Risk Assessment', icon: AlertTriangle, color: 'red' },
    { title: 'Job Sheet', icon: FileCheck, color: 'green' },
    { title: 'PAT Testing', icon: Zap, color: 'purple' },
    { title: 'Minor Works', icon: FileText, color: 'gold' }
  ];

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Forms & Certificates</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Access your library of 50+ digital industry forms.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Launching new digital form builder...')}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            New Digital Form
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {formTemplates.map((template, i) => (
          <button 
            key={i} 
            onClick={() => alert(`Opening ${template.title} template...`)}
            className={`p-6 rounded-2xl border transition-all group text-center space-y-3 ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 hover:border-gold/50' : 'bg-white border-slate-200 hover:border-gold shadow-sm'
          }`}>
            <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
            }`}>
              <template.icon className={`w-6 h-6 group-hover:text-gold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`} />
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-widest leading-tight ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{template.title}</p>
          </button>
        ))}
      </div>

      <div className={`rounded-3xl border overflow-hidden ${
        theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recent Certificates</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
              <input 
                type="text" 
                placeholder="Search forms..."
                className={`w-full border pl-10 pr-4 py-2 rounded-xl text-xs outline-none focus:ring-1 focus:ring-gold ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => alert('Opening form filters...')}
              className={`p-2 border rounded-xl transition-all ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'
            }`}>
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
                theme === 'dark' ? 'bg-white/[0.02] text-white/40' : 'bg-slate-50 text-slate-500'
              }`}>
                <th className="px-8 py-5">Form Title</th>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Engineer</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
              {forms.map((form) => (
                <tr key={form.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <FileText className="w-4 h-4 text-gold" />
                      </div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{form.title}</div>
                    </div>
                  </td>
                  <td className={`px-8 py-6 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{form.client}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold ${
                        theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {form.engineer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{form.engineer}</span>
                    </div>
                  </td>
                  <td className={`px-8 py-6 text-sm ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{new Date(form.date).toLocaleDateString()}</td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      form.status === 'Signed' ? 'bg-green-500/10 text-green-500' : 
                      form.status === 'Sent' ? 'bg-blue-500/10 text-blue-500' : 
                      theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => alert(`Downloading ${form.title} as PDF...`)}
                        className={`p-2 transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-gold' : 'text-slate-300 hover:text-gold'}`} 
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${form.title}?`)) {
                            setForms(forms.filter(f => f.id !== form.id));
                          }
                        }}
                        className={`p-2 transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-red-500' : 'text-slate-300 hover:text-red-500'}`} 
                        title="Delete"
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

      <div className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-8 ${
        theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
          <Clock className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Offline Sync Enabled</h4>
          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-500'}`}>
            Your engineers can complete forms even without a signal. The app will automatically sync and back up all data once a connection is restored.
          </p>
        </div>
        <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
          <CheckCircle2 className="w-4 h-4" />
          System Ready
        </div>
      </div>
    </div>
  );
};
