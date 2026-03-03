import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink,
  Phone,
  Mail,
  Copy,
  ChevronRight,
  Zap,
  Settings,
  Layout,
  Database,
  Bot,
  Globe,
  Shield,
  Bell,
  Info,
  Building2,
  FileText,
  Briefcase,
  PieChart,
  CreditCard,
  Plus
} from "lucide-react";

import { UKCompanyFormation } from "./UKCompanyFormation";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { ClientManager } from "./ClientManager";
import { ProjectTracker } from "./ProjectTracker";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  value: number;
  status: 'New' | 'Contacted' | 'Closed';
  timestamp: string;
  notes?: string;
  ai_qualified?: boolean;
}

export const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clients' | 'projects' | 'invoices' | 'automation' | 'formation' | 'strategy'>('overview');
  const [webhookUrl, setWebhookUrl] = useState("https://n8n.digitechinov.com/webhook/propriety-links");
  const [isAiActive, setIsAiActive] = useState(true);

  useEffect(() => {
    const savedLeads = localStorage.getItem('moustapha_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      const sampleLeads: Lead[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@kensington.com',
          phone: '07926325725',
          service: 'Kitchen Renovation',
          value: 18500,
          status: 'New',
          timestamp: new Date().toISOString(),
          ai_qualified: true
        },
        {
          id: '2',
          name: 'Sarah Jones',
          email: 'sarah@chelsea.co.uk',
          phone: '07926325725',
          service: 'Luxury Bathroom',
          value: 12000,
          status: 'Contacted',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setLeads(sampleLeads);
      localStorage.setItem('moustapha_leads', JSON.stringify(sampleLeads));
    }
  }, []);

  const totalValue = leads.reduce((acc, lead) => acc + lead.value, 0);
  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const getWhatsAppLink = (lead: Lead) => {
    const message = `Hi ${lead.name}, it's Moustapha from ProprietyLinks. I saw you just used our online tool for a ${lead.service} estimate (£${lead.value.toLocaleString()}). Would you be free for a 10-minute site visit this week?`;
    return `https://wa.me/${lead.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-charcoal text-white sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-charcoal group-hover:rotate-12 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-none">COMMAND CENTRE</h1>
                <p className="text-[10px] text-gold font-mono uppercase tracking-widest mt-1">ProprietyLinks v2.0</p>
              </div>
            </a>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: 'overview', label: 'Overview', icon: PieChart },
                { id: 'leads', label: 'Leads', icon: Users },
                { id: 'clients', label: 'Clients', icon: Users },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'invoices', label: 'Invoices', icon: FileText },
                { id: 'automation', label: 'AI & Automation', icon: Zap },
                { id: 'formation', label: 'UK Formation', icon: Building2 },
                { id: 'strategy', label: 'Strategy', icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                    activeTab === tab.id 
                      ? 'bg-gold text-charcoal shadow-lg shadow-gold/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Live</span>
            </div>
            <button className="p-2 text-white/60 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border-2 border-charcoal" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-6 md:p-10">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Monthly Revenue', value: '£34,200', icon: CreditCard, color: 'blue', trend: '+12%' },
                { label: 'Pending Invoices', value: '£8,450', icon: FileText, color: 'orange', trend: '3 items' },
                { label: 'Active Projects', value: '5', icon: Briefcase, color: 'gold', trend: '+1 this week' },
                { label: 'Client Satisfaction', value: '98%', icon: CheckCircle2, color: 'green', trend: '48 reviews' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-gold/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  Revenue Growth
                </h3>
                <div className="h-64 flex items-end gap-2">
                  {[45, 60, 40, 75, 90, 85, 100].map((height, i) => (
                    <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gold rounded-t-lg transition-all duration-1000 group-hover:bg-gold-dark" 
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold" />
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {[
                    { action: 'Invoice Paid', target: 'James Kensington', time: '2 hours ago', icon: CreditCard, color: 'green' },
                    { action: 'New Lead', target: 'Sarah Miller', time: '5 hours ago', icon: Users, color: 'blue' },
                    { action: 'Project Updated', target: 'Kitchen Renovation', time: '1 day ago', icon: Briefcase, color: 'gold' },
                    { action: 'Quote Sent', target: 'Robert Wilson', time: '2 days ago', icon: FileText, color: 'purple' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-slate-50 text-slate-600`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-500">{item.target}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Pipeline', value: `£${totalValue.toLocaleString()}`, icon: TrendingUp, color: 'blue', trend: '+18%' },
                { label: 'Active Leads', value: leads.length, icon: Users, color: 'gold', trend: '+4' },
                { label: 'AI Qualified', value: leads.filter(l => l.ai_qualified).length, icon: Bot, color: 'purple', trend: '85%' },
                { label: 'Avg. Response', value: '4.2m', icon: Clock, color: 'green', trend: '-12%' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-gold/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Leads Management Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Incoming Opportunities</h2>
                  <p className="text-sm text-slate-500">Manage and follow up with your latest website leads.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">Export CSV</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
                      <th className="px-8 py-5">Client Profile</th>
                      <th className="px-8 py-5">Project Focus</th>
                      <th className="px-8 py-5">Valuation</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Engagement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-2">
                                {lead.name}
                                {lead.ai_qualified && (
                                  <span className="p-1 bg-purple-100 text-purple-600 rounded-md" title="AI Qualified Lead">
                                    <Bot className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400">{lead.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-semibold text-slate-700">{lead.service}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-1">{new Date(lead.timestamp).toLocaleString()}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-blue-600">£{lead.value.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Market Rate Est.</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            lead.status === 'New' ? 'bg-orange-100 text-orange-600' : 
                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              lead.status === 'New' ? 'bg-orange-600' : 
                              lead.status === 'Contacted' ? 'bg-blue-600' : 
                              'bg-green-600'
                            }`} />
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <a 
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                            >
                              <MessageSquare className="w-4 h-4" />
                              WhatsApp
                            </a>
                            <button className="p-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-slate-900 hover:border-slate-900 transition-all">
                              <ExternalLink className="w-4 h-4" />
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
        )}

        {activeTab === 'growth' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gold/10 rounded-2xl text-gold-dark">
                  <Layout className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Growth Pack: Custom Lead Capture</h2>
                  <p className="text-slate-500">This is the "Advanced Form" that qualifies leads for Moustapha.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Interactive Demo</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Budget</label>
                      <select className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all">
                        <option>£5,000 - £10,000</option>
                        <option>£10,000 - £25,000</option>
                        <option>£25,000 - £50,000</option>
                        <option>£50,000+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Preferred Start Date</label>
                      <select className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all">
                        <option>Immediately</option>
                        <option>Within 30 Days</option>
                        <option>Next 3-6 Months</option>
                        <option>Just Researching</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Upload Project Photos</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-gold transition-colors cursor-pointer bg-white">
                      <Database className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Drag and drop photos of your current space</p>
                    </div>
                  </div>
                  <button type="button" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                    Submit Project Brief
                  </button>
                </form>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Why this sells:</strong> Instead of a generic "Contact Us", this form makes the client feel like they are starting a professional consultation. It filters out low-budget leads automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && <ClientManager />}
        {activeTab === 'projects' && <ProjectTracker />}
        {activeTab === 'invoices' && <InvoiceGenerator />}

        {activeTab === 'automation' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI & Automation Hub</h2>
                    <p className="text-slate-500">Connect your website to n8n and AI Agents.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Status:</span>
                  <button 
                    onClick={() => setIsAiActive(!isAiActive)}
                    className={`w-12 h-6 rounded-full transition-all relative ${isAiActive ? 'bg-green-500' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAiActive ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    n8n Webhook Endpoint
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-xs focus:ring-2 focus:ring-gold outline-none transition-all"
                    />
                    <button className="px-6 py-4 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all">Test Connection</button>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">This URL receives all lead data in real-time for processing by your n8n workflows.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      AI Qualification Agent
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Scans incoming leads, checks property values in the area, and flags high-priority opportunities.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Active & Monitoring
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      WhatsApp Auto-Responder
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Sends an immediate professional greeting to new leads via WhatsApp Business API.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                      Awaiting API Key
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-charcoal text-white rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full -mr-16 -mt-16" />
                  <h4 className="text-lg font-serif italic text-gold mb-4">Demonstration Tip</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Show Moustapha how the <strong>AI Qualification Agent</strong> works by submitting a test lead with a "Kensington" address. The agent will automatically flag it as "High Value" and highlight it in purple on the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formation' && <UKCompanyFormation />}

        {activeTab === 'strategy' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-8">Agency Growth Strategy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <TrendingUp className="w-5 h-5 text-gold-dark" />
                    Phase 1: The Outreach
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Reach out to high-value businesses (Builders, Landscapers) with a "Gift" prototype. Show them their own brand on this technology.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs relative group">
                    <button className="absolute top-2 right-2 p-1 hover:bg-slate-200 rounded transition-colors opacity-0 group-hover:opacity-100">
                      <Copy className="w-3 h-3" />
                    </button>
                    "Hi [Name], I built a modern prototype for [Business] to show you how we can automate your lead generation. Check it out here: [Link]"
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Phase 2: The Action Tiers
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-bold">Launch Pack</span>
                      <span className="text-xs font-bold text-blue-600">£750</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-sm font-bold">Growth Pack</span>
                      <span className="text-xs font-bold text-blue-600">£1,250</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-charcoal text-white rounded-lg">
                      <span className="text-sm font-bold">AI Agent Upsell</span>
                      <span className="text-xs font-bold text-gold">£1,950</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-charcoal text-white p-10 rounded-3xl relative overflow-hidden shadow-2xl shadow-charcoal/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-3xl rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold mb-6 italic text-gold">The "Show, Don't Tell" Method</h2>
                <div className="space-y-6">
                  {[
                    "Find a business with high-ticket services but a poor website.",
                    "Duplicate this prototype and swap their logo/photos.",
                    "Send them the link to their own proposal page.",
                    "Close the deal by showing them the 'Quote Engine' in action."
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 bg-gold text-charcoal rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

