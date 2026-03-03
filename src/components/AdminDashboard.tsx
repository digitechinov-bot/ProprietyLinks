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
  Plus,
  Receipt,
  Calculator,
  BookOpen,
  UserPlus,
  Menu,
  X,
  LayoutDashboard,
  Target,
  FileCheck,
  UserCircle,
  LogOut,
  Search
} from "lucide-react";

import { UKCompanyFormation } from "./UKCompanyFormation";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { ProposalGenerator } from "./ProposalGenerator";
import { ClientManager } from "./ClientManager";
import { ProjectTracker } from "./ProjectTracker";
import { ExpenseTracker } from "./ExpenseTracker";
import { AccountingHub } from "./AccountingHub";
import { UserGuide } from "./UserGuide";

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
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clients' | 'projects' | 'proposals' | 'invoices' | 'expenses' | 'accounting' | 'automation' | 'formation' | 'strategy' | 'guide' | 'settings'>('overview');
  const [webhookUrl, setWebhookUrl] = useState("https://n8n.digitechinov.com/webhook/propriety-links");
  const [isAiActive, setIsAiActive] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [autoOpenModal, setAutoOpenModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

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

  const convertToClient = (lead: Lead) => {
    // In a real app, this would call an API. For now, we simulate by updating local storage.
    const existingClients = JSON.parse(localStorage.getItem('propriety_clients') || '[]');
    const newClient = {
      id: Math.random().toString(36).substr(2, 9),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      address: 'Address from lead...',
      totalProjects: 1,
      totalSpent: 0,
      lastActive: new Date().toISOString(),
      status: 'Active'
    };
    localStorage.setItem('propriety_clients', JSON.stringify([...existingClients, newClient]));
    
    // Remove from leads
    const updatedLeads = leads.filter(l => l.id !== lead.id);
    setLeads(updatedLeads);
    localStorage.setItem('moustapha_leads', JSON.stringify(updatedLeads));
    
    alert(`${lead.name} has been converted to a client!`);
    setActiveTab('clients');
  };

  const menuGroups = [
    {
      title: "Main",
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      ]
    },
    {
      title: "Growth",
      items: [
        { id: 'leads', label: 'Leads', icon: Target },
        { id: 'proposals', label: 'Proposals', icon: FileText },
      ]
    },
    {
      title: "Operations",
      items: [
        { id: 'clients', label: 'Clients', icon: Users },
        { id: 'projects', label: 'Projects', icon: Briefcase },
      ]
    },
    {
      title: "Finance",
      items: [
        { id: 'invoices', label: 'Invoices', icon: FileCheck },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'accounting', label: 'Accounting', icon: Calculator },
      ]
    },
    {
      title: "System",
      items: [
        { id: 'guide', label: 'User Guide', icon: BookOpen },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Navigation */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-charcoal text-white transition-all duration-300 flex flex-col sticky top-0 h-screen z-50 border-r border-white/5`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-charcoal">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">COMMAND CENTRE</h1>
              <p className="text-[8px] text-gold font-mono uppercase tracking-widest">v2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Quick Launch Actions */}
        {isSidebarOpen && (
          <div className="px-6 py-6 border-b border-white/5 space-y-3">
            <button 
              onClick={() => {
                setActiveTab('clients');
                setAutoOpenModal('client');
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gold text-charcoal hover:bg-gold-light transition-all text-xs font-bold shadow-lg shadow-gold/20 group"
            >
              <div className="w-8 h-8 rounded-lg bg-charcoal/10 flex items-center justify-center group-hover:bg-charcoal/20 transition-colors">
                <UserPlus className="w-4 h-4" />
              </div>
              New Client
            </button>
            <button 
              onClick={() => {
                setActiveTab('projects');
                setAutoOpenModal('project');
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-xs font-bold border border-white/10 group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Plus className="w-4 h-4 text-gold" />
              </div>
              New Project
            </button>
          </div>
        )}

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              {isSidebarOpen && (
                <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      activeTab === item.id 
                        ? 'bg-gold text-charcoal shadow-lg shadow-gold/10' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? 'text-charcoal' : 'group-hover:text-gold'}`} />
                    {isSidebarOpen && (
                      <span className="text-sm font-bold flex-1 text-left">{item.label}</span>
                    )}
                    {isSidebarOpen && activeTab === item.id && (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold">
              <UserCircle className="w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden text-left">
                <p className="text-xs font-bold truncate">Admin User</p>
                <p className="text-[10px] text-white/40 truncate">digitechinov@gmail.com</p>
              </div>
            )}
            {isSidebarOpen && (
              <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Live</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search everything..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-gold outline-none w-64 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border-2 border-white" />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Revenue (YTD)', value: '£34,200', icon: CreditCard, color: 'blue', trend: '+12%' },
                    { label: 'Total Expenses', value: '£12,450', icon: Receipt, color: 'red', trend: '36% of rev' },
                    { label: 'Active Projects', value: '8', icon: Briefcase, color: 'gold', trend: '3 near completion' },
                    { label: 'Net Profit', value: '£13,268', icon: TrendingUp, color: 'green', trend: 'Ready for HMRC' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group hover:border-gold/50 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-gold/10 group-hover:text-gold transition-all`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
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
                  <Zap className="w-5 h-5 text-gold" />
                  Recommended Workflow
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, action: 'Review New Leads', desc: 'Check incoming requests from your website.', tab: 'leads' },
                    { step: 2, action: 'Manage Clients', desc: 'Convert leads or add new clients manually.', tab: 'clients' },
                    { step: 3, action: 'Create Project', desc: 'Launch a new job and track its site progress.', tab: 'projects' },
                    { step: 4, action: 'Issue Invoice', desc: 'Bill your clients and mark them as paid.', tab: 'invoices' },
                    { step: 5, action: 'Log Expenses', desc: 'Record material costs for tax deduction.', tab: 'expenses' },
                    { step: 6, action: 'Accounting Hub', desc: 'Check your tax liabilities and profit.', tab: 'accounting' },
                  ].map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveTab(item.tab as any)}
                      className="w-full flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all text-left border border-transparent hover:border-slate-100"
                    >
                      <div className="w-6 h-6 bg-gold/10 text-gold-dark rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
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
                            <button 
                              onClick={() => convertToClient(lead)}
                              className="flex items-center gap-2 px-4 py-2 bg-gold text-charcoal text-xs font-bold rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/10"
                              title="Convert to Client"
                            >
                              <UserPlus className="w-4 h-4" />
                              Convert
                            </button>
                            <a 
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noopener"
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                            >
                              <MessageSquare className="w-4 h-4" />
                              WhatsApp
                            </a>
                            <button 
                              className="p-2 bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-slate-900 hover:border-slate-900 transition-all"
                              title="View Full Lead Details"
                            >
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

        {activeTab === 'clients' && (
          <ClientManager 
            autoOpen={autoOpenModal === 'client'} 
            onModalClose={() => {
              setAutoOpenModal(null);
              setModalData(null);
            }} 
            onAction={(action, data) => {
              if (action === 'create-project') {
                setActiveTab('projects');
                setAutoOpenModal('project');
                setModalData(data);
              }
            }}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectTracker 
            autoOpen={autoOpenModal === 'project'} 
            initialData={modalData}
            onModalClose={() => {
              setAutoOpenModal(null);
              setModalData(null);
            }} 
            onAction={(action) => setActiveTab(action as any)}
          />
        )}
        {activeTab === 'proposals' && <ProposalGenerator clients={JSON.parse(localStorage.getItem('propriety_clients') || '[]')} />}
        {activeTab === 'invoices' && <InvoiceGenerator clients={JSON.parse(localStorage.getItem('propriety_clients') || '[]')} />}
        {activeTab === 'expenses' && <ExpenseTracker />}
        {activeTab === 'accounting' && <AccountingHub />}
        {activeTab === 'guide' && <UserGuide />}

        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Business Settings & Growth Hub</h3>
              <p className="text-slate-500 text-sm">Configure your agency and access advanced growth tools.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'automation', label: 'AI & Automation', icon: Zap, desc: 'Connect n8n & AI Agents' },
                { id: 'formation', label: 'UK Formation', icon: Building2, desc: 'Register new companies' },
                { id: 'strategy', label: 'Strategy', icon: TrendingUp, desc: 'Agency growth tactics' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-gold transition-all text-left space-y-4 group"
                >
                  <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-gold/10 group-hover:text-gold transition-colors w-fit">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.label}</h3>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">General Preferences</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive alerts for new leads and paid invoices.</p>
                  </div>
                  <div className="w-10 h-5 bg-gold rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Currency Display</p>
                    <p className="text-xs text-slate-500">Set your primary currency for accounting.</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">GBP (£)</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
          </div>
        </main>
      </div>
    </div>
  );
};

