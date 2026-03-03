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
  Zap
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

export const ProjectTracker = ({ autoOpen, onModalClose, onAction, initialData }: { autoOpen?: boolean, onModalClose?: () => void, onAction?: (action: string) => void, initialData?: any }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    client: initialData?.clientName || '',
    location: '',
    value: 0
  });

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {selectedProject ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <button 
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      selectedProject.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
                      selectedProject.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {selectedProject.status}
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-4">{selectedProject.title}</h2>
                    <p className="text-slate-500 mt-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Client: {selectedProject.client}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Value</p>
                    <p className="text-3xl font-bold text-gold">£{selectedProject.value.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProject.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Start Date</p>
                    <p className="text-sm font-bold text-slate-700">{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProject.progress}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</p>
                    <p className="text-sm font-bold text-slate-700">#{selectedProject.id.toUpperCase()}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Project Evolution & Stages</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /> Done</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gold" /> Active</div>
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200" /> Next</div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
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
                              'bg-white border-2 border-slate-200 text-slate-400'
                            }`}
                          >
                            {stage.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{index + 1}</span>}
                          </button>
                          
                          <div className={`flex-1 p-5 rounded-2xl border transition-all ${
                            stage.status === 'current' ? 'bg-gold/5 border-gold/20 shadow-sm' : 
                            stage.status === 'completed' ? 'bg-slate-50 border-slate-100' : 
                            'bg-white border-transparent'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-bold ${stage.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{stage.name}</p>
                                <p className="text-xs text-slate-500 mt-1">
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
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Checklist</p>
                                {stage.checklist.map(task => (
                                  <button 
                                    key={task.id}
                                    onClick={() => toggleChecklistItem(selectedProject.id, stage.id, task.id)}
                                    className="flex items-center gap-2 w-full text-left group/task"
                                  >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                      task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 bg-white'
                                    }`}>
                                      {task.completed && <CheckCircle2 className="w-3 h-3" />}
                                    </div>
                                    <span className={`text-xs ${task.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
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
                    <h3 className="font-bold text-slate-900">Project Timeline</h3>
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-4">
                      {[
                        { event: 'Project Launched', date: '2026-02-15', icon: Zap, color: 'gold' },
                        { event: 'Planning Approved', date: '2026-02-20', icon: CheckCircle2, color: 'green' },
                        { event: 'Site Team Assigned', date: '2026-02-22', icon: Briefcase, color: 'blue' },
                        { event: 'Initial Materials Delivered', date: '2026-02-25', icon: Clock, color: 'orange' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-white text-slate-600 shadow-sm`}>
                            <item.icon className="w-3 h-3" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-900">{item.event}</p>
                            <p className="text-[10px] text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Project Team</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Thompson', role: 'Project Manager', initial: 'AT' },
                    { name: 'David Miller', role: 'Lead Electrician', initial: 'DM' },
                    { name: 'Sarah Chen', role: 'Interior Designer', initial: 'SC' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {member.initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{member.name}</p>
                        <p className="text-[10px] text-slate-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 hover:border-gold hover:text-gold transition-all">
                    + Assign Member
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => onAction?.('invoices')}
                    className="w-full p-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all text-left flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    Generate Invoice
                  </button>
                  <button 
                    onClick={() => onAction?.('accounting')}
                    className="w-full p-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all text-left flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Calculator className="w-4 h-4" />
                    </div>
                    Update Budget
                  </button>
                  <button 
                    onClick={() => onAction?.('expenses')}
                    className="w-full p-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all text-left flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Clock className="w-4 h-4" />
                    </div>
                    Log Site Hours
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4">Project Notes</h3>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm focus:ring-2 focus:ring-gold outline-none min-h-[200px]"
                  placeholder="Add site updates, snagging lists, or client requests..."
                />
                <button className="w-full mt-4 bg-charcoal text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Projects</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900">{projects.filter(p => p.status === 'In Progress').length}</h4>
              <p className="text-[10px] text-slate-500 mt-1">Currently on site</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gold/10 text-gold-dark rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline Value</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900">£{projects.reduce((acc, p) => acc + p.value, 0).toLocaleString()}</h4>
              <p className="text-[10px] text-slate-500 mt-1">Total across all stages</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</span>
              </div>
              <h4 className="text-2xl font-bold text-slate-900">{projects.filter(p => p.status === 'Completed').length}</h4>
              <p className="text-[10px] text-slate-500 mt-1">Successfully delivered</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Project Directory</h2>
              <p className="text-slate-500 text-sm">Monitor ongoing jobs and site progress.</p>
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
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Create New Project</h3>
                  <button onClick={() => setIsAddingProject(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <form onSubmit={handleAddProject} className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Title</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="e.g. Loft Conversion"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Client</label>
                    {clients.length > 0 ? (
                      <select 
                        required
                        value={newProject.client}
                        onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all text-sm"
                      >
                        <option value="">Choose a client...</option>
                        {clients.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        required
                        type="text" 
                        value={newProject.client}
                        onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                        placeholder="e.g. James Kensington"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</label>
                    <input 
                      required
                      type="text" 
                      value={newProject.location}
                      onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                      placeholder="e.g. Fulham SW6"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Value (£)</label>
                    <input 
                      required
                      type="number" 
                      value={newProject.value}
                      onChange={(e) => setNewProject({...newProject, value: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all"
                    />
                  </div>
                  <button type="submit" className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all mt-4 shadow-lg shadow-gold/20">
                    Launch Project
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-gold/50 transition-all">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
                      project.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                      project.status === 'Planning' ? 'bg-orange-100 text-orange-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {project.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <button onClick={() => setSelectedProject(project)} className="w-full text-left">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-gold transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <User className="w-4 h-4" />
                      {project.client}
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</p>
                      <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                        <TrendingUp className="w-3 h-3" />
                        £{project.value.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.startDate).toLocaleDateString()}
                    </div>
                    <button onClick={() => setSelectedProject(project)} className="text-xs font-bold text-slate-900 hover:underline">
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
