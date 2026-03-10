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
import { SupplierInvoicing } from "./SupplierInvoicing";
import { TeamManagement } from "./TeamManagement";
import { SchedulingDiary } from "./SchedulingDiary";
import { FormsCertificates } from "./FormsCertificates";

import { fetchLeads } from "../services/supabaseService";

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
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clients' | 'projects' | 'proposals' | 'invoices' | 'expenses' | 'accounting' | 'automation' | 'formation' | 'strategy' | 'guide' | 'settings' | 'suppliers' | 'team' | 'scheduling' | 'forms'>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("https://n8n.digitechinov.com/webhook/propriety-links");
  const [isAiActive, setIsAiActive] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [autoOpenModal, setAutoOpenModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchLeads();
        if (data && data.length > 0) {
          setLeads(data);
        } else {
          // Fallback to local storage or sample data if Supabase is empty
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
        }
      } catch (error) {
        console.error('Failed to fetch leads from Supabase:', error);
        // Fallback to local storage on error
        const savedLeads = localStorage.getItem('moustapha_leads');
        if (savedLeads) setLeads(JSON.parse(savedLeads));
      }
    };

    loadLeads();
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
      title: "Core",
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads', icon: Target },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'invoices', label: 'Invoices', icon: FileCheck },
      ]
    },
    ...(!isFocusMode ? [
      {
        title: "Operations",
        items: [
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'scheduling', label: 'Scheduling & Diary', icon: Clock },
          { id: 'team', label: 'Team Management', icon: Users },
          { id: 'forms', label: 'Forms & Certificates', icon: FileCheck },
        ]
      },
      {
        title: "Finance",
        items: [
          { id: 'expenses', label: 'Expenses', icon: Receipt },
          { id: 'suppliers', label: 'Supplier Bills', icon: Building2 },
          { id: 'accounting', label: 'Accounting', icon: Calculator },
        ]
      },
      {
        title: "Growth",
        items: [
          { id: 'proposals', label: 'Proposals', icon: FileText },
          { id: 'automation', label: 'AI & Automation', icon: Zap },
          { id: 'strategy', label: 'Strategy', icon: TrendingUp },
          { id: 'formation', label: 'UK Formation', icon: Building2 },
        ]
      }
    ] : []),
    {
      title: "System",
      items: [
        { id: 'guide', label: 'User Guide', icon: BookOpen },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${theme === 'dark' ? 'bg-charcoal text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5 text-white' : 'bg-white border-slate-200 shadow-xl text-slate-900'
        } transition-all duration-300 flex flex-col fixed lg:sticky top-0 h-screen z-[70] border-r`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'hidden'}`}>
            <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-gold' : 'bg-slate-900'} rounded-lg flex items-center justify-center text-charcoal`}>
              <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-charcoal' : 'text-white'}`} />
            </div>
            <div>
              <h1 className={`text-sm font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>COMMAND CENTRE</h1>
              <p className="text-[8px] text-gold font-mono uppercase tracking-widest">v2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}
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
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold border group ${
                theme === 'dark' ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                theme === 'dark' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white group-hover:bg-slate-50'
              }`}>
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
                <p className={`px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
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
                        ? (theme === 'dark' ? 'bg-gold text-charcoal shadow-lg shadow-gold/10' : 'bg-slate-900 text-white')
                        : (theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${activeTab === item.id ? (theme === 'dark' ? 'text-charcoal' : 'text-white') : (theme === 'dark' ? 'text-white/20 group-hover:text-gold' : 'text-slate-400 group-hover:text-slate-900')}`} />
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
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${!isSidebarOpen && 'justify-center'} ${
            theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
          }`}>
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold">
              <UserCircle className="w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden text-left">
                <p className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Admin User</p>
                <p className={`text-[10px] truncate ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>digitechinov@gmail.com</p>
              </div>
            )}
            {isSidebarOpen && (
              <button className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'
              }`}>
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className={`h-20 border-b sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-lg lg:hidden ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className={`text-lg md:text-xl font-bold capitalize truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {activeTab.replace('-', ' ')}
            </h2>
            <div className={`h-4 w-px hidden sm:block ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Focus Mode</span>
              <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`w-10 h-5 rounded-full transition-all relative ${isFocusMode ? 'bg-gold' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isFocusMode ? 'left-6' : 'left-1'}`} />
              </button>
              <Info className="w-3 h-3 text-white/20 cursor-help" title="Hides non-essential tools to help you focus on growth and delivery." />
            </div>
            <div className="relative hidden md:block">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
              <input 
                type="text" 
                placeholder="Search everything..."
                className={`pl-10 pr-4 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-gold outline-none w-64 transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-xl transition-all border ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-gold hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? <Zap className="w-5 h-5" /> : <Database className="w-5 h-5" />}
              </button>
              <button className={`p-2.5 rounded-xl transition-all relative ${theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}>
                <Bell className="w-5 h-5" />
                <span className={`absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full border-2 ${theme === 'dark' ? 'border-[#0A0A0A]' : 'border-white'}`} />
              </button>
              <button className={`p-2.5 rounded-xl transition-all ${theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className={`text-3xl font-serif font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {getGreeting()}, Admin
                    </h1>
                    <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Here's what's happening with your business today.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className={`px-4 py-2 border rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <p className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Local Time</p>
                      <p className={`text-sm font-mono ${theme === 'dark' ? 'text-gold' : 'text-slate-900'}`}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className={`px-4 py-2 border rounded-xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <p className={`text-[10px] uppercase font-bold tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>System Status</p>
                      <p className="text-sm font-bold text-green-500">Optimal</p>
                    </div>
                  </div>
                </div>

                {/* Consultant's Note */}
                <div className={`p-6 rounded-2xl border flex gap-4 items-start ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'}`}>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gold/20 text-gold' : 'bg-blue-500 text-white'}`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Expert Recommendation for Busy Clients</h4>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                      "As an expert, I've enabled <strong>Focus Mode</strong> for you. Busy clients often get overwhelmed by too many options. I've prioritized the 4 core areas (Leads, Projects, Invoices, Overview) that drive 80% of your business value. You can toggle Focus Mode off in the header if you need to access advanced operational tools."
                    </p>
                  </div>
                </div>

                {/* Priority Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gold/10 border border-gold/20 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Target className="w-12 h-12 text-gold" />
                    </div>
                    <h3 className="text-gold font-bold mb-2">3 New Leads</h3>
                    <p className="text-xs text-gold/60 mb-4">Incoming requests from Kensington and Chelsea.</p>
                    <button 
                      onClick={() => setActiveTab('leads')}
                      className="px-4 py-2 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gold-light transition-all"
                    >
                      Review Now
                    </button>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Clock className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-blue-500 font-bold mb-2">2 Projects Due</h3>
                    <p className="text-xs text-blue-500/60 mb-4">Kitchen Renovation is reaching Phase 3.</p>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className="px-4 py-2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Check Status
                    </button>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <CreditCard className="w-12 h-12 text-purple-500" />
                    </div>
                    <h3 className="text-purple-500 font-bold mb-2">£4,200 Pending</h3>
                    <p className="text-xs text-purple-500/60 mb-4">2 invoices are awaiting client payment.</p>
                    <button 
                      onClick={() => setActiveTab('invoices')}
                      className="px-4 py-2 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-purple-600 transition-all"
                    >
                      View Invoices
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Revenue (YTD)', value: '£34,200', icon: CreditCard, color: 'blue', trend: '+12%' },
                    { label: 'Total Expenses', value: '£12,450', icon: Receipt, color: 'red', trend: '36% of rev' },
                    { label: 'Active Projects', value: '8', icon: Briefcase, color: 'gold', trend: '3 near completion' },
                    { label: 'Net Profit', value: '£13,268', icon: TrendingUp, color: 'green', trend: 'Ready for HMRC' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-2xl shadow-sm border group hover:border-gold/50 transition-all ${
                      theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl transition-all ${
                          theme === 'dark' ? 'bg-white/5 text-white/20 group-hover:bg-gold/10 group-hover:text-gold' : 'bg-slate-50 text-slate-400 group-hover:bg-gold/10 group-hover:text-gold'
                        }`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : (theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-500')
                        }`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{stat.label}</p>
                      <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h4>
                    </div>
                  ))}
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl shadow-sm border ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <TrendingUp className="w-5 h-5 text-gold" />
                  Revenue Growth
                </h3>
                <div className="h-64 flex items-end gap-2">
                  {[45, 60, 40, 75, 90, 85, 100].map((height, i) => (
                    <div key={i} className={`flex-1 rounded-t-lg relative group ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gold rounded-t-lg transition-all duration-1000 group-hover:bg-gold-light" 
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className={`flex justify-between mt-4 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              <div className={`p-8 rounded-2xl shadow-sm border ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <Zap className="w-5 h-5 text-gold" />
                  Your Daily Workflow
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, action: 'Check New Opportunities', desc: 'See who is interested in your services.', tab: 'leads' },
                    { step: 2, action: 'Update Active Jobs', desc: 'Keep your projects moving forward.', tab: 'projects' },
                    { step: 3, action: 'Send Out Invoices', desc: 'Get paid for your hard work.', tab: 'invoices' },
                    { step: 4, action: 'Review Your Growth', desc: 'Check your profit and tax position.', tab: 'accounting' },
                  ].map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveTab(item.tab as any)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all text-left border ${
                        theme === 'dark' 
                          ? 'hover:bg-white/5 border-transparent hover:border-white/10' 
                          : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="w-6 h-6 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.action}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-8 rounded-2xl shadow-sm border lg:col-span-2 ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
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
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-slate-50 text-slate-400'}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.action}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{item.target}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Friendly Intro */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Incoming Opportunities</h2>
                <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>You have {leads.filter(l => l.status === 'New').length} new leads waiting for your attention.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Exporting leads list to CSV...')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  theme === 'dark' ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}>
                  Export List
                </button>
                <button className="px-4 py-2 bg-gold text-charcoal text-xs font-bold rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20">
                  Add Lead Manually
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Pipeline', value: `£${totalValue.toLocaleString()}`, icon: TrendingUp, color: 'blue', trend: '+18%' },
                { label: 'Active Leads', value: leads.length, icon: Users, color: 'gold', trend: '+4' },
                { label: 'AI Qualified', value: leads.filter(l => l.ai_qualified).length, icon: Bot, color: 'purple', trend: '85%' },
                { label: 'Avg. Response', value: '4.2m', icon: Clock, color: 'green', trend: '-12%' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl shadow-sm border group hover:border-gold/50 transition-all ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${
                      theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-slate-50 text-slate-400'
                    }`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>{stat.trend}</span>
                  </div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{stat.label}</p>
                  <h3 className={`text-3xl font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Leads Management Table */}
            <div className={`rounded-2xl shadow-sm border overflow-hidden ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`text-[10px] uppercase tracking-[0.2em] font-bold ${theme === 'dark' ? 'bg-white/[0.02] text-white/40' : 'bg-slate-50 text-slate-400'}`}>
                      <th className="px-8 py-5">Client Profile</th>
                      <th className="px-8 py-5">Project Focus</th>
                      <th className="px-8 py-5">Valuation</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-slate-100'}`}>
                    {leads.map((lead) => (
                      <tr key={lead.id} className={`transition-colors group ${theme === 'dark' ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm ${
                              theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-100 border-slate-200 text-slate-400'
                            }`}>
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className={`font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {lead.name}
                                {lead.ai_qualified && (
                                  <span className="p-1 bg-purple-500/10 text-purple-500 rounded-md" title="AI Qualified Lead">
                                    <Bot className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{lead.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{lead.service}</div>
                          <div className={`text-[10px] font-mono mt-1 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>{new Date(lead.timestamp).toLocaleString()}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-blue-500">£{lead.value.toLocaleString()}</div>
                          <div className={`text-[10px] uppercase tracking-widest mt-1 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>Market Rate Est.</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            lead.status === 'New' ? 'bg-orange-500/10 text-orange-500' : 
                            lead.status === 'Contacted' ? 'bg-blue-500/10 text-blue-500' : 
                            'bg-green-500/10 text-green-500'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              lead.status === 'New' ? 'bg-orange-500' : 
                              lead.status === 'Contacted' ? 'bg-blue-500' : 
                              'bg-green-500'
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
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-900/20"
                            >
                              <MessageSquare className="w-4 h-4" />
                              WhatsApp
                            </a>
                            <button 
                              className={`p-2 border rounded-lg transition-all ${
                                theme === 'dark' ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/40' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400'
                              }`}
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

        {activeTab === 'automation' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-10 rounded-3xl shadow-sm border ${
              theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                  <Layout className="w-8 h-8" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Growth Pack: Custom Lead Capture</h2>
                  <p className={theme === 'dark' ? 'text-white/40' : 'text-slate-500'}>This is the "Advanced Form" that qualifies leads for Moustapha.</p>
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>Interactive Demo</h3>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Lead capture form submitted successfully!'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Project Budget</label>
                      <select className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-[#0A0A0A] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>£5,000 - £10,000</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>£10,000 - £25,000</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>£25,000 - £50,000</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>£50,000+</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Preferred Start Date</label>
                      <select className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-[#0A0A0A] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Immediately</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Within 30 Days</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Next 3-6 Months</option>
                        <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Just Researching</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Upload Project Photos</label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center hover:border-gold transition-colors cursor-pointer ${
                      theme === 'dark' ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}>
                      <Database className={`w-8 h-8 mx-auto mb-2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`} />
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Drag and drop photos of your current space</p>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg shadow-gold/20">
                    Submit Project Brief
                  </button>
                </form>
              </div>

              <div className={`mt-8 p-6 rounded-2xl border flex gap-4 ${
                theme === 'dark' ? 'bg-gold/5 border-gold/10' : 'bg-gold/5 border-gold/20'
              }`}>
                <Info className="w-6 h-6 text-gold flex-shrink-0" />
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gold/80' : 'text-slate-700'}`}>
                  <strong>Why this sells:</strong> Instead of a generic "Contact Us", this form makes the client feel like they are starting a professional consultation. It filters out low-budget leads automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <ClientManager 
            theme={theme}
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
            theme={theme}
            autoOpen={autoOpenModal === 'project'} 
            initialData={modalData}
            onModalClose={() => {
              setAutoOpenModal(null);
              setModalData(null);
            }} 
            onAction={(action) => setActiveTab(action as any)}
          />
        )}
        {activeTab === 'proposals' && <ProposalGenerator theme={theme} clients={JSON.parse(localStorage.getItem('propriety_clients') || '[]')} />}
        {activeTab === 'invoices' && <InvoiceGenerator theme={theme} clients={JSON.parse(localStorage.getItem('propriety_clients') || '[]')} />}
        {activeTab === 'expenses' && <ExpenseTracker theme={theme} />}
        {activeTab === 'suppliers' && <SupplierInvoicing theme={theme} />}
        {activeTab === 'team' && <TeamManagement theme={theme} />}
        {activeTab === 'scheduling' && <SchedulingDiary theme={theme} />}
        {activeTab === 'forms' && <FormsCertificates theme={theme} />}
        {activeTab === 'accounting' && <AccountingHub theme={theme} />}
        {activeTab === 'guide' && <UserGuide theme={theme} />}

        {activeTab === 'settings' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-8 rounded-2xl shadow-sm border ${
              theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Business Settings & Growth Hub</h3>
              <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Configure your agency and access advanced growth tools.</p>
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
                  className={`p-8 rounded-3xl border shadow-sm hover:border-gold transition-all text-left space-y-4 group ${
                    theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-2xl group-hover:bg-gold/10 group-hover:text-gold transition-colors w-fit ${
                    theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.label}</h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className={`p-8 rounded-2xl shadow-sm border ${
              theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>General Preferences</h4>
              <div className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email Notifications</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Receive alerts for new leads and paid invoices.</p>
                  </div>
                  <div className="w-10 h-5 bg-gold rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <div className={`flex items-center justify-between p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Currency Display</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Set your primary currency for accounting.</p>
                  </div>
                  <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>GBP (£)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-10 rounded-3xl shadow-sm border ${
              theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI & Automation Hub</h2>
                    <p className={theme === 'dark' ? 'text-white/40' : 'text-slate-500'}>Connect your website to n8n and AI Agents.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>AI Status:</span>
                  <button 
                    onClick={() => setIsAiActive(!isAiActive)}
                    className={`w-12 h-6 rounded-full transition-all relative ${isAiActive ? 'bg-green-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAiActive ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                    <Globe className="w-4 h-4" />
                    n8n Webhook Endpoint
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className={`flex-1 border p-4 rounded-xl font-mono text-xs focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                    <button 
                      onClick={() => alert(`Testing connection to ${webhookUrl}...`)}
                      className="px-6 py-4 bg-gold text-charcoal text-xs font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                    >
                      Test Connection
                    </button>
                  </div>
                  <p className={`text-[10px] italic ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>This URL receives all lead data in real-time for processing by your n8n workflows.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`font-bold text-sm mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <Bot className="w-4 h-4 text-purple-500" />
                      AI Qualification Agent
                    </h4>
                    <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                      Scans incoming leads, checks property values in the area, and flags high-priority opportunities.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Active & Monitoring
                    </div>
                  </div>
                  <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`font-bold text-sm mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      WhatsApp Auto-Responder
                    </h4>
                    <p className={`text-xs leading-relaxed mb-4 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                      Sends an immediate professional greeting to new leads via WhatsApp Business API.
                    </p>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'}`} />
                      Awaiting API Key
                    </div>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl border relative overflow-hidden ${
                  theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-gold/5 border-gold/20'
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-2xl rounded-full -mr-16 -mt-16" />
                  <h4 className="text-lg font-serif italic text-gold mb-4">Demonstration Tip</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-slate-700'}`}>
                    Show Moustapha how the <strong>AI Qualification Agent</strong> works by submitting a test lead with a "Kensington" address. The agent will automatically flag it as "High Value" and highlight it in purple on the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'formation' && <UKCompanyFormation theme={theme} />}

        {activeTab === 'strategy' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
              <h2 className={`text-3xl font-serif font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Agency Growth Strategy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-8 rounded-2xl shadow-sm border ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <TrendingUp className="w-5 h-5 text-gold" />
                    Phase 1: The Outreach
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                    Reach out to high-value businesses (Builders, Landscapers) with a "Gift" prototype. Show them their own brand on this technology.
                  </p>
                  <div className={`p-4 rounded-xl border font-mono text-xs relative group ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText('Reach out to high-value businesses...');
                        alert('Strategy text copied to clipboard!');
                      }}
                      className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Copy className="w-3 h-3 text-gold" />
                    </button>
                    "Hi [Name], I built a modern prototype for [Business] to show you how we can automate your lead generation. Check it out here: [Link]"
                  </div>
                </div>
                <div className={`p-8 rounded-2xl shadow-sm border ${
                  theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Phase 2: The Action Tiers
                  </h3>
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center p-3 rounded-lg border ${
                      theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Launch Pack</span>
                      <span className="text-xs font-bold text-blue-500">£750</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg border ${
                      theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Growth Pack</span>
                      <span className="text-xs font-bold text-blue-500">£1,250</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg border ${
                      theme === 'dark' ? 'bg-charcoal border-white/10 text-white' : 'bg-slate-900 border-slate-800 text-white'
                    }`}>
                      <span className="text-sm font-bold">AI Agent Upsell</span>
                      <span className="text-xs font-bold text-gold">£1,950</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={`p-10 rounded-3xl relative overflow-hidden shadow-2xl border ${
              theme === 'dark' ? 'bg-charcoal border-white/5 shadow-black/20' : 'bg-slate-900 border-slate-800 shadow-slate-900/20 text-white'
            }`}>
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
                      <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-slate-300'}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className={`lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t z-50 flex items-center justify-around px-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-2xl'
        }`}>
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Home' },
            { id: 'leads', icon: Target, label: 'Leads' },
            { id: 'projects', icon: Briefcase, label: 'Jobs' },
            { id: 'invoices', icon: FileCheck, label: 'Bills' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === item.id 
                  ? 'text-gold' 
                  : (theme === 'dark' ? 'text-white/40' : 'text-slate-400')
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

