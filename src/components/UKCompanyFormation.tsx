import { useState } from "react";
import { 
  Building2, 
  User, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  CreditCard,
  ArrowRight
} from "lucide-react";

export const UKCompanyFormation = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "Limited by Shares",
    directors: [{ name: "", address: "", nationality: "", occupation: "", directorId: "" }],
    registeredOffice: "",
    shareCapital: "100",
    sicCode: "",
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className={`max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
      <div className={`p-8 md:p-12 rounded-3xl shadow-sm border ${
        theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-gold/10 rounded-2xl text-gold">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>UK Company Formation (2026)</h2>
            <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Collect required data for Companies House registration.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= i ? 'bg-gold' : theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px]">1</span>
              Company Identity
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Proposed Company Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. ProprietyLinks Limited"
                    className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all pr-24 ${
                      theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>.LTD</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Business Activity (SIC Code)</label>
                <select className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-gold outline-none transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>41202 - Construction of domestic buildings</option>
                  <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>43220 - Plumbing, heat and air-conditioning installation</option>
                  <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>62012 - Business and domestic software development</option>
                  <option className={theme === 'dark' ? 'bg-charcoal' : 'bg-white'}>Other...</option>
                </select>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2">
              Next: Director Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px]">2</span>
              Director & Shareholder
            </div>
            <div className={`p-6 rounded-2xl border space-y-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Full Legal Name</label>
                  <input type="text" className={`w-full border p-3 rounded-xl outline-none ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`} placeholder="As per Passport" />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Nationality</label>
                  <input type="text" className={`w-full border p-3 rounded-xl outline-none ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`} placeholder="British" />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Director ID (Required for 2026)</label>
                  <input type="text" className={`w-full border p-3 rounded-xl outline-none ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`} placeholder="15-digit code" />
                  <p className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-white/30' : 'text-slate-400'}`}>
                    Don't have a Director ID? <a href="https://www.gov.uk/guidance/apply-for-a-director-identification-number" target="_blank" className="text-gold hover:underline">Apply here via GOV.UK</a>. You will receive a 15-digit code to enter above.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Service Address</label>
                <input type="text" className={`w-full border p-3 rounded-xl outline-none ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`} placeholder="Residential or Office address" />
              </div>
              <div className="p-4 bg-gold/10 rounded-xl border border-gold/20 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-[10px] text-gold/80 leading-relaxed">
                  <strong>GDPR Compliance:</strong> Director details are submitted to Companies House and will appear on the public register. We recommend using a professional service address if you wish to keep your home address private.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className={`flex-1 border py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                theme === 'dark' ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}>Back</button>
              <button onClick={nextStep} className="flex-[2] bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2">
                Next: Registered Office
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-gold text-charcoal flex items-center justify-center text-[10px]">3</span>
              Registered Office
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Registered Office Address</label>
                <textarea rows={3} className={`w-full border p-4 rounded-xl outline-none ${
                  theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`} placeholder="Must be a physical UK address (not a PO Box)"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 border rounded-xl hover:border-gold cursor-pointer transition-all ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Use Home Address</div>
                  <div className={`text-[10px] uppercase ${theme === 'dark' ? 'text-white/20' : 'text-slate-300'}`}>Free</div>
                </div>
                <div className="p-4 border border-gold rounded-xl bg-gold/10 cursor-pointer transition-all">
                  <div className="font-bold text-sm mb-1 text-gold">Virtual Office</div>
                  <div className="text-[10px] text-gold/60 uppercase">£15/mo</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className={`flex-1 border py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                theme === 'dark' ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}>Back</button>
              <button onClick={nextStep} className="flex-[2] bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2">
                Next: Review & Submit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
              <CheckCircle2 className="w-5 h-5" />
              Review Information
            </div>
            <div className={`p-8 rounded-2xl border space-y-6 ${
              theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className={`text-[10px] uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Company Name</div>
                  <div className="font-serif text-lg">ProprietyLinks Limited</div>
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Type</div>
                  <div className="font-serif text-lg">Private Limited</div>
                </div>
              </div>
              <div className={`border-t pt-6 ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                <div className={`text-[10px] uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Director</div>
                <div className="font-serif text-lg">Moustapha [Surname Pending]</div>
              </div>
            </div>
            <div className="p-6 bg-orange-500/10 rounded-2xl border border-orange-500/20 flex gap-4">
              <Info className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-orange-200/80' : 'text-orange-800'}`}>
                <strong>Final Step:</strong> Once you click submit, this data will be packaged into a formation request. Companies House typically approves new formations within 3-24 hours.
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className={`flex-1 border py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                theme === 'dark' ? 'border-white/10 text-white/60 hover:bg-white/5' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}>Back</button>
              <button 
                onClick={() => alert('Submitting application to formation agent...')}
                className="flex-[2] bg-gold text-charcoal py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
              >
                Submit to Formation Agent
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <FileText className="w-6 h-6 text-blue-500 mb-4" />
          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Articles of Association</h4>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Standard model articles will be used unless custom ones are provided.</p>
        </div>
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <CreditCard className="w-6 h-6 text-green-500 mb-4" />
          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Formation Fee</h4>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>£50.00 government filing fee applies at the final stage.</p>
        </div>
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <ShieldCheck className="w-6 h-6 text-purple-500 mb-4" />
          <h4 className={`font-bold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AML Check</h4>
          <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Anti-Money Laundering checks will be performed on all directors.</p>
        </div>
      </div>
    </div>
  );
};
