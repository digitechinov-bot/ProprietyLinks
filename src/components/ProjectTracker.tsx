import { useState, useEffect } from "react";
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Calendar,
  User,
  MapPin,
  TrendingUp
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  value: number;
  startDate: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
}

export const ProjectTracker = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        title: 'Kitchen Extension & Renovation',
        client: 'James Kensington',
        location: 'Kensington W8',
        value: 28500,
        startDate: '2026-02-15',
        status: 'In Progress',
        progress: 65
      },
      {
        id: '2',
        title: 'Luxury Bathroom Suite',
        client: 'Sarah Miller',
        location: 'Chelsea SW3',
        value: 12500,
        startDate: '2026-03-01',
        status: 'Planning',
        progress: 15
      },
      {
        id: '3',
        title: 'Full House Rewiring',
        client: 'Robert Wilson',
        location: 'Westminster SE1',
        value: 8500,
        startDate: '2026-01-20',
        status: 'Completed',
        progress: 100
      }
    ];
    setProjects(sampleProjects);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Tracker</h2>
          <p className="text-slate-500 text-sm">Monitor ongoing jobs and site progress.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold text-sm shadow-lg shadow-slate-200">
          <Plus className="w-4 h-4" />
          Create New Project
        </button>
      </div>

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

              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-gold transition-colors">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <User className="w-4 h-4" />
                  {project.client}
                </div>
              </div>

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
                  <span className="text-slate-500">Completion Progress</span>
                  <span className="text-slate-900">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold transition-all duration-1000" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  Started: {new Date(project.startDate).toLocaleDateString()}
                </div>
                <button className="text-xs font-bold text-slate-900 hover:underline">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
