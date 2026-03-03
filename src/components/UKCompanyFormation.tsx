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

export const UKCompanyFormation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "Limited by Shares",
    directors: [{ name: "", address: "", nationality: "", occupation: "" }],
    registeredOffice: "",
    shareCapital: "100",
    sicCode: "",
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">UK Company Formation (2026)</h2>
            <p className="text-slate-500">Collect required data for Companies House registration.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all ${step >= i ? 'bg-blue-600' : 'bg-slate-100'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              Company Identity
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Proposed Company Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. ProprietyLinks Limited"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-24"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">.LTD</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Business Activity (SIC Code)</label>
                <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                  <option>41202 - Construction of domestic buildings</option>
                  <option>43220 - Plumbing, heat and air-conditioning installation</option>
                  <option>62012 - Business and domestic software development</option>
                  <option>Other...</option>
                </select>
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Next: Director Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              Director & Shareholder
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Legal Name</label>
                  <input type="text" className="w-full bg-white border border-slate-200 p-3 rounded-xl outline-none" placeholder="As per Passport" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nationality</label>
                  <input type="text" className="w-full bg-white border border-slate-200 p-3 rounded-xl outline-none" placeholder="British" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Address</label>
                <input type="text" className="w-full bg-white border border-slate-200 p-3 rounded-xl outline-none" placeholder="Residential or Office address" />
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-[10px] text-blue-800 leading-relaxed">
                  <strong>GDPR Compliance:</strong> Director details are submitted to Companies House and will appear on the public register. We recommend using a professional service address if you wish to keep your home address private.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button onClick={nextStep} className="flex-[2] bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Next: Registered Office
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
              Registered Office
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Registered Office Address</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none" placeholder="Must be a physical UK address (not a PO Box)"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 cursor-pointer transition-all bg-slate-50">
                  <div className="font-bold text-sm mb-1">Use Home Address</div>
                  <div className="text-[10px] text-slate-400 uppercase">Free</div>
                </div>
                <div className="p-4 border border-blue-500 rounded-xl bg-blue-50 cursor-pointer transition-all">
                  <div className="font-bold text-sm mb-1">Virtual Office</div>
                  <div className="text-[10px] text-blue-600 uppercase">£15/mo</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button onClick={nextStep} className="flex-[2] bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Next: Review & Submit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest">
              <CheckCircle2 className="w-5 h-5" />
              Review Information
            </div>
            <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Company Name</div>
                  <div className="font-serif text-lg">ProprietyLinks Limited</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Type</div>
                  <div className="font-serif text-lg">Private Limited</div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Director</div>
                <div className="font-serif text-lg">Moustapha [Surname Pending]</div>
              </div>
            </div>
            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
              <Info className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <p className="text-sm text-orange-800 leading-relaxed">
                <strong>Final Step:</strong> Once you click submit, this data will be packaged into a formation request. Companies House typically approves new formations within 3-24 hours.
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevStep} className="flex-1 border border-slate-200 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button className="flex-[2] bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Submit to Formation Agent
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <FileText className="w-6 h-6 text-blue-600 mb-4" />
          <h4 className="font-bold text-sm mb-2">Articles of Association</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Standard model articles will be used unless custom ones are provided.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <CreditCard className="w-6 h-6 text-green-600 mb-4" />
          <h4 className="font-bold text-sm mb-2">Formation Fee</h4>
          <p className="text-xs text-slate-500 leading-relaxed">£50.00 government filing fee applies at the final stage.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <ShieldCheck className="w-6 h-6 text-purple-600 mb-4" />
          <h4 className="font-bold text-sm mb-2">AML Check</h4>
          <p className="text-xs text-slate-500 leading-relaxed">Anti-Money Laundering checks will be performed on all directors.</p>
        </div>
      </div>
    </div>
  );
};
