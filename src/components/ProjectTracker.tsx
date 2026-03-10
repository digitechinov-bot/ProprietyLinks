import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Calendar,
  User,
  MapPin,
  TrendingUp,
  X,
  Briefcase,
  ArrowLeft,
  FileText,
  Calculator,
  Zap,
  Search
} from "lucide-react";

interface ProjectStage {
  id: string;
  name: string;
  status: 'pending' | 'current' | 'completed';
  date?: string;
  checklist?: { id: string; task: string; completed: boolean }[];
}

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  value: number;
  startDate: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  stages: ProjectStage[];
  notes?: string;
  team?: string[];
}

const DEFAULT_STAGES: ProjectStage[] = [
  { 
    id: '1', 
    name: 'Planning & Design', 
    status: 'completed',
    checklist: [
      { id: 'c1', task: 'Site Survey', completed: true },
      { id: 'c2', task: 'Architectural Drawings', completed: true },
      { id: 'c3', task: 'Planning Permission', completed: true },
    ]
  },
  { 
    id: '2', 
    name: 'Quote & Contract', 
    status: 'completed',
    checklist: [
      { id: 'c4', task: 'Detailed Estimate', completed: true },
      { id: 'c5', task: 'Contract Signed', completed: true },
    ]
  },
  { 
    id: '3', 
    name: 'Deposit Paid', 
    status: 'current',
    checklist: [
      { id: 'c6', task: 'Invoice Issued', completed: true },
      { id: 'c7', task: 'Funds Received', completed: false },
    ]
  },
  { id: '4', name: 'Site Preparation', status: 'pending', checklist: [] },
  { id: '5', name: 'Main Construction', status: 'pending', checklist: [] },
  { id: '6', name: 'Final Fix & Snagging', status: 'pending', checklist: [] },
  { id: '7', name: 'Handover & Completion', status: 'pending', checklist: [] },
];

export const ProjectTracker = ({ autoOpen, onModalClose, onAction, initialData, theme = 'dark' }: { autoOpen?: boolean, onModalClose?: () => void, onAction?: (action: string) => void, initialData?: any, theme?: 'dark' | 'light' }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [tempValue, setTempValue] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProject, setNewProject] = useState({
    title: '',
    client: initialData?.clientName || '',
    location: '',
    value: 0
  });

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (autoOpen) {
      setIsAddingProject(true);
      if (initialData?.clientName) {
        setNewProject(prev => ({ ...prev, client: initialData.clientName }));
      }
      if (onModalClose) onModalClose();
    }
  }, [autoOpen, initialData]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('propriety_projects');
    const savedClients = localStorage.getItem('propriety_clients');
    
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      const withStages = parsed.map((p: any) => ({
        ...p,
        stages: p.stages || DEFAULT_STAGES
      }));
      setProjects(withStages);
    } else {
      const sampleProjects: Project[] = [
        {
          id: '1',
          title: 'Kitchen Extension & Renovation',
          client: 'James Kensington',
          location: 'Kensington W8',
          value: 28500,
          startDate: '2026-02-15',
          status: 'In Progress',
          progress: 65,
          stages: [
            { id: '1', name: 'Planning & Design', status: 'completed', checklist: [{ id: 'c1', task: 'Site Survey', completed: true }] },
            { id: '2', name: 'Quote & Contract', status: 'completed', checklist: [{ id: 'c4', task: 'Detailed Estimate', completed: true }] },
            { id: '3', name: 'Deposit Paid', status: 'completed', checklist: [{ id: 'c6', task: 'Invoice Issued', completed: true }] },
            { id: '4', name: 'Site Preparation', status: 'completed', checklist: [] },
            { id: '5', name: 'Main Construction', status: 'current', checklist: [] },
            { id: '6', name: 'Final Fix & Snagging', status: 'pending', checklist: [] },
            { id: '7', name: 'Handover & Completion', status: 'pending', checklist: [] },
          ]
        }
      ];
      setProjects(sampleProjects);
      localStorage.setItem('propriety_projects', JSON.stringify(sampleProjects));
    }

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, [isAddingProject]);

  const handleUpdateValue = (projectId: string) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        const updated = { ...p, value: tempValue };
        if (selectedProject?.id === projectId) setSelectedProject(updated);
        return updated;
      }
      return p;
    });
    setProjects(updatedProjects);
    localStorage.setItem('propriety_projects', JSON.stringify(updatedProjects));
    setIsEditingValue(false);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Math.random().toString(36).substr(2, 9),
      ...newProject,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Planning',
      progress: 0,
      stages: DEFAULT_STAGES
    };
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem('propriety_projects', JSON.stringify(updatedProjects));
    setIsAddingProject(false);
    setNewProject({ title: '', client: '', location: '', value: 0 });
  };

  const toggleChecklistItem = (projectId: string, stageId: string, taskId: string) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        const updatedStages = p.stages.map(s => {
          if (s.id === stageId) {
            const updatedChecklist = s.checklist?.map(t => {
              if (t.id === taskId) return { ...t, completed: !t.completed };
              return t;
            });
            return { ...s, checklist: updatedChecklist };
          }
          return s;
        });
        const updatedProject = { ...p, stages: updatedStages };
        if (selectedProject?.id === projectId) setSelectedProject(updatedProject);
        return updatedProject;
      }
      return p;
    });
    setProjects(updatedProjects);
    localStorage.setItem('propriety_projects', JSON.stringify(updatedProjects));
  };

  const updateStageStatus = (projectId: string, stageId: string, status: 'pending' | 'current' | 'completed') => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        const updatedStages = p.stages.map(s => {
          if (s.id === stageId) return { ...s, status };
          return s;
        });
        
        const completedCount = updatedStages.filter(s => s.status === 'completed').length;
        const newProgress = Math.round((completedCount / updatedStages.length) * 100);
        
        let newStatus = p.status;
        if (newProgress === 100) newStatus = 'Completed';
        else if (newProgress > 0) newStatus = 'In Progress';

        const updatedProject = { ...p, stages: updatedStages, progress: newProgress, status: newStatus };
        if (selectedProject?.id === projectId) setSelectedProject(updatedProject);
        return updatedProject;
      }
      return p;
    });
    setProjects(updatedProjects);
    localStorage.setItem('propriety_projects', JSON.stringify(updatedProjects));
  };

  return (
    <div className={`space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      {selectedProject ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <button 
            onClick={() => setSelectedProject(null)}
            className={`flex items-center gap-2 transition-colors font-bold text-sm ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className={`p-8 rounded-3xl border shadow-sm ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      selectedProject.status === 'In Progress' ? 'bg-gold/10 text-gold' : 
                      selectedProject.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                      theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {selectedProject.status}
                    </span>
                    <h2 className={`text-3xl font-bold mt-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedProject.title}</h2>
                    <p className={`mt-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                      <User className="w-4 h-4" />
                      Client: {selectedProject.client}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Project Value</p>
                    {isEditingValue ? (
                      <div className="flex items-center gap-2 justify-end mt-1">
                        <input 
                          type="number" 
                          className={`font-bold text-2xl w-32 p-1 rounded outline-none border ${
                            theme === 'dark' ? 'bg-white/5 border-gold/30 text-gold' : 'bg-white border-gold/50 text-gold-dark'
                          }`}
                          value={tempValue}
                          onChange={(e) => setTempValue(Number(e.target.value))}
                          autoFocus
                        />
                        <button 
                          onClick={() => handleUpdateValue(selectedProject.id)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setIsEditingValue(false)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-end group">
                        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>£{selectedProject.value.toLocaleString()}</p>
                        <button 
                          onClick={() => {
                            setTempValue(selectedProject.value);
                            setIsEditingValue(true);
                          }}
                          className={`p-1.5 opacity-0 group-hover:opacity-100 transition-all ${theme === 'dark' ? 'text-white/20 hover:text-gold' : 'text-slate-300 hover:text-gold'}`}
                          title="Edit Project Value (e.g. after site visit)"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Location</p>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{selectedProject.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Start Date</p>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Progress</p>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{selectedProject.progress}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>ID</p>
                    <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>#{selectedProject.id.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Evolution & Stages</h3>
                    <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Done</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gold" /> Active</div>
                      <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`} /> Next</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} />
                    <div className="space-y-8 relative">
                      {selectedProject.stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-start gap-6 group">
                          <button 
                            onClick={() => {
                              const nextStatus = stage.status === 'completed' ? 'pending' : stage.status === 'current' ? 'completed' : 'current';
                              updateStageStatus(selectedProject.id, stage.id, nextStatus);
                            }}
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                              stage.status === 'completed' ? 'bg-green-500 text-white' : 
                              stage.status === 'current' ? 'bg-gold text-charcoal ring-4 ring-gold/20' : 
                              theme === 'dark' ? 'bg-[#0A0A0A] border-2 border-white/10 text-white/20' : 'bg-white border-2 border-slate-200 text-slate-300'
                            }`}
                          >
                            {stage.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{index + 1}</span>}
                          </button>
                          
                          <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                            stage.status === 'current' ? (theme === 'dark' ? 'bg-gold/5 border-gold/20 shadow-sm' : 'bg-gold/10 border-gold/30 shadow-sm') : 
                            stage.status === 'completed' ? (theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100') : 
                            'bg-transparent border-transparent'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-bold ${stage.status === 'pending' ? (theme === 'dark' ? 'text-white/20' : 'text-slate-300') : (theme === 'dark' ? 'text-white' : 'text-slate-900')}`}>{stage.name}</p>
                                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                                  {stage.status === 'completed' ? 'Verified & Completed' : stage.status === 'current' ? 'Work in progress' : 'Scheduled stage'}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                {stage.status !== 'completed' && (
                                  <button 
                                    onClick={() => updateStageStatus(selectedProject.id, stage.id, 'completed')}
                                    className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold hover:bg-green-100 transition-colors"
                                  >
                                    Complete
                                  </button>
                                )}
                                {stage.status === 'pending' && (
                                  <button 
                                    onClick={() => updateStageStatus(selectedProject.id, stage.id, 'current')}
                                    className="px-3 py-1 bg-gold/10 text-gold-dark rounded-lg text-[10px] font-bold hover:bg-gold/20 transition-colors"
                                  >
                                    Activate
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {stage.checklist && stage.checklist.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`}>Checklist</p>
                                {stage.checklist.map(task => (
                                  <button 
                                    key={task.id}
                                    onClick={() => toggleChecklistItem(selectedProject.id, stage.id, task.id)}
                                    className="flex items-center gap-2 w-full text-left group/task"
                                  >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                      task.completed ? 'bg-green-500 border-green-500 text-white' : (theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white')
                                    }`}>
                                      {task.completed && <CheckCircle2 className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-xs ${task.completed ? (theme === 'dark' ? 'text-white/20 line-through' : 'text-slate-400 line-through') : (theme === 'dark' ? 'text-white/60' : 'text-slate-600')}`}>
                                      {task.task}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Timeline</h3>
                    <div className={`p-4 rounded-2xl space-y-4 border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      {[
                        { event: 'Project Launched', date: '2026-02-15', icon: Zap, color: 'gold' },
                        { event: 'Planning Approved', date: '2026-02-20', icon: CheckCircle2, color: 'green' },
                        { event: 'Site Team Assigned', date: '2026-02-22', icon: Briefcase, color: 'blue' },
                        { event: 'Initial Materials Delivered', date: '2026-02-25', icon: Clock, color: 'orange' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-white text-slate-400 border border-slate-100'}`}>
                            <item.icon className="w-3 h-3" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.event}</p>
                            <p className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border shadow-sm ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Team</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Thompson', role: 'Project Manager', initial: 'AT' },
                    { name: 'David Miller', role: 'Lead Electrician', initial: 'DM' },
                    { name: 'Sarah Chen', role: 'Interior Designer', initial: 'SC' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {member.initial}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{member.name}</p>
                        <p className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => alert('Assigning new team member to project...')}
                    className={`w-full py-2 border-2 border-dashed rounded-xl text-[10px] font-bold transition-all ${
                    theme === 'dark' ? 'border-white/10 text-white/20 hover:border-gold hover:text-gold' : 'border-slate-200 text-slate-400 hover:border-gold hover:text-gold'
                  }`}>
                    + Assign Member
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => onAction?.('invoices')}
                    className={`w-full p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 group ${
                      theme === 'dark' ? 'bg-white/5 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 text-slate-600 hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    Generate Invoice
                  </button>
                  <button 
                    onClick={() => onAction?.('accounting')}
                    className={`w-full p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 group ${
                      theme === 'dark' ? 'bg-white/5 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 text-slate-600 hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Calculator className="w-4 h-4" />
                    </div>
                    Update Budget
                  </button>
                  <button 
                    onClick={() => onAction?.('expenses')}
                    className={`w-full p-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 group ${
                      theme === 'dark' ? 'bg-white/5 text-white/60 hover:bg-gold/10 hover:text-gold' : 'bg-slate-50 text-slate-600 hover:bg-gold/10 hover:text-gold'
                    }`}
                  >
                    <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Clock className="w-4 h-4" />
                    </div>
                    Log Site Hours
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm ${
                theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Notes</h3>
                <textarea 
                  className={`w-full p-4 rounded-xl text-sm focus:ring-2 focus:ring-gold outline-none min-h-[200px] border ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                  placeholder="Add site updates, snagging lists, or client requests..."
                />
                <button className="w-full mt-4 bg-gold text-charcoal py-3 rounded-xl font-bold text-sm hover:bg-gold-light transition-all">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border shadow-sm ${
              theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Active Projects</span>
              </div>
              <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{projects.filter(p => p.status === 'In Progress').length}</h4>
              <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Currently on site</p>
            </div>
            <div className={`p-6 rounded-2xl border shadow-sm ${
              theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gold/10 text-gold rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Pipeline Value</span>
              </div>
              <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>£{projects.reduce((acc, p) => acc + p.value, 0).toLocaleString()}</h4>
              <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total across all stages</p>
            </div>
            <div className={`p-6 rounded-2xl border shadow-sm ${
              theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Completed</span>
              </div>
              <h4 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{projects.filter(p => p.status === 'Completed').length}</h4>
              <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Successfully delivered</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Project Directory</h2>
              <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Monitor ongoing jobs and site progress.</p>
            </div>
            <button 
              onClick={() => setIsAddingProject(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
            >
              <Plus className="w-4 h-4" />
              Launch New Project
            </button>
          </div>

          {isAddingProject && (
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md ${theme === 'dark' ? 'bg-[#0A0A0A]/90' : 'bg-slate-900/60'}`}>
              <div className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border ${
                theme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-200'
              }`}>
                <div className={`p-8 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5 bg-[#121212]' : 'border-slate-100 bg-white'}`}>
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Create New Project</h3>
                  <button onClick={() => setIsAddingProject(false)} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/5 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleAddProject} className={`p-8 space-y-6 ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}`}>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Project Title</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                      }`}
                      placeholder="e.g. Loft Conversion"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Select Client</label>
                    {clients.length > 0 ? (
                      <select 
                        required
                        value={newProject.client}
                        onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="" className={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}>Choose a client...</option>
                        {clients.map(c => (
                          <option key={c.id} value={c.name} className={theme === 'dark' ? 'bg-[#121212]' : 'bg-white'}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        required
                        type="text" 
                        value={newProject.client}
                        onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                        }`}
                        placeholder="e.g. James Kensington"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Location</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.location}
                      onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                      className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/10' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-300'
                      }`}
                      placeholder="e.g. Fulham SW6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Project Value (£)</label>
                    <input 
                      required
                      type="number" 
                      value={newProject.value}
                      onChange={(e) => setNewProject({...newProject, value: Number(e.target.value)})}
                      className={`w-full border p-4 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                  <button type="submit" className="w-full bg-gold text-charcoal py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all mt-4 shadow-xl shadow-gold/20">
                    Launch Project
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`} />
              <input 
                type="text" 
                placeholder="Search projects by title or client..."
                className={`w-full border pl-10 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20' : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`rounded-3xl shadow-sm border overflow-hidden group transition-all duration-300 ${
                theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:border-gold/50' : 'bg-white border-slate-200 hover:border-gold'
              }`}>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      project.status === 'In Progress' ? 'bg-gold/10 text-gold' : 
                      project.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                      project.status === 'Planning' ? 'bg-blue-500/10 text-blue-500' : 
                      theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {project.status}
                    </span>
                    <button 
                      onClick={() => alert('More options for this project...')}
                      className={`transition-colors ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-slate-300 hover:text-slate-900'}`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <button onClick={() => setSelectedProject(project)} className="w-full text-left">
                    <h3 className={`font-bold text-xl group-hover:text-gold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                    <div className={`flex items-center gap-2 text-sm mt-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                      <User className="w-4 h-4" />
                      {project.client}
                    </div>
                  </button>

                  <div className={`grid grid-cols-2 gap-6 py-6 border-y ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                    <div className="space-y-1">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Location</p>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Value</p>
                      <div className="flex items-center gap-1 text-xs font-bold text-gold">
                        <TrendingUp className="w-3 h-3" />
                        £{project.value.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className={theme === 'dark' ? 'text-white/40' : 'text-slate-400'}>Progress</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{project.progress}%</span>
                    </div>
                    <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                      <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                      <Calendar className="w-4 h-4" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)} 
                      className={`px-4 py-2 border rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest ${
                        theme === 'dark' ? 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-gold hover:bg-gold/10' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
