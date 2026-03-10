import { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Filter
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  client: string;
  engineer: string;
  location: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  type: 'Service' | 'Installation' | 'Emergency' | 'Quote';
}

export const SchedulingDiary = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('propriety_jobs');
    if (saved) {
      setJobs(JSON.parse(saved));
    } else {
      const sample: Job[] = [
        {
          id: '1',
          title: 'Boiler Service',
          client: 'James Kensington',
          engineer: 'Alex Thompson',
          location: 'Kensington W8',
          startTime: '09:00',
          endTime: '10:30',
          status: 'Completed',
          type: 'Service'
        },
        {
          id: '2',
          title: 'Full Rewire - Phase 1',
          client: 'Sarah Jones',
          engineer: 'David Miller',
          location: 'Chelsea SW3',
          startTime: '11:00',
          endTime: '16:00',
          status: 'In Progress',
          type: 'Installation'
        },
        {
          id: '3',
          title: 'Emergency Leak Repair',
          client: 'Michael Brown',
          engineer: 'Alex Thompson',
          location: 'Fulham SW6',
          startTime: '16:30',
          endTime: '18:00',
          status: 'Scheduled',
          type: 'Emergency'
        }
      ];
      setJobs(sample);
      localStorage.setItem('propriety_jobs', JSON.stringify(sample));
    }
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Scheduling & Diary</h2>
          <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm`}>Drag-and-drop job management for your entire team.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold text-charcoal rounded-xl hover:bg-gold-light transition-all font-bold text-sm shadow-lg shadow-gold/20"
          >
            <Plus className="w-4 h-4" />
            Schedule Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-gold/10 text-gold rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Total Jobs</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{jobs.length}</h3>
          </div>
        </div>
        <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Pending</p>
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{jobs.filter(j => j.status === 'Scheduled').length}</h3>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Timeline View */}
        <div className="space-y-6">
          <div className={`rounded-3xl border overflow-hidden ${
            theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'}`}>
              <div className="flex items-center gap-4">
                <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Daily Schedule</h3>
                <span className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{currentDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Switching to day view...')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  theme === 'dark' ? 'bg-white/5 text-white/60 hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}>Day</button>
                <button 
                  onClick={() => alert('Switching to week view...')}
                  className="px-4 py-2 bg-gold text-charcoal rounded-xl text-xs font-bold transition-all"
                >Week</button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="flex gap-6 group">
                    <div className="w-20 pt-2 text-right">
                      <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>{job.startTime}</span>
                    </div>
                    <div className="flex-1 relative pb-4">
                      <div className={`absolute left-[-13px] top-3 w-6 h-6 rounded-full border-4 z-10 ${
                        theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-white border-slate-100'
                      }`} />
                      <div className={`absolute left-[-1px] top-6 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} />
                      
                      <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${
                        job.status === 'Completed' ? 'bg-green-500/5 border-green-500/20' : 
                        job.status === 'In Progress' ? 'bg-blue-500/5 border-blue-500/20' : 
                        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                                job.type === 'Emergency' ? 'bg-red-500 text-white' : 
                                job.type === 'Installation' ? 'bg-blue-500 text-white' : 
                                theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {job.type}
                              </span>
                              <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{job.title}</h4>
                            </div>
                            <div className={`flex items-center gap-4 text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {job.client}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert('More options for this job...')}
                            className={`transition-colors ${theme === 'dark' ? 'text-white/10 hover:text-white' : 'text-slate-300 hover:text-slate-900'}`}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className={`flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center text-[8px] font-bold ${
                              theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {job.engineer.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{job.engineer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className={`w-3 h-3 ${theme === 'dark' ? 'text-white/20' : 'text-slate-400'}`} />
                            <span className={`text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>{job.startTime} - {job.endTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`p-8 rounded-3xl border flex items-center gap-6 ${
            theme === 'dark' ? 'bg-charcoal border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center text-gold">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Unassigned Leads</h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>You have 3 new leads that need to be scheduled this week.</p>
            </div>
            <button 
              onClick={() => alert('Opening unassigned leads...')}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
              View Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
