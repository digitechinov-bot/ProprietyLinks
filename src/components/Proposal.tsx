import { FileText, Printer, CheckCircle2, Award, Calculator, ShieldCheck, Info, TrendingUp } from "lucide-react";

export const Proposal = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8 md:p-16 font-sans print:p-0 print:m-0">
      <div className="max-w-4xl mx-auto print:max-w-none">
        {/* Print Button - Hidden on Print */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-center print-hidden bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Proposal Ready</h1>
              <p className="text-sm text-gray-500">Press the button to save as PDF</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a 
              href="/"
              className="flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Back to Website
            </a>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              <Printer className="w-5 h-5" />
              Print to PDF
            </button>
          </div>
        </div>

        {/* Page 1: Launch Pack */}
        <section className="flex flex-col justify-between mb-12 md:mb-20 print:mb-0 print:break-after-page print:min-h-[250mm] print:pt-4">
          <div>
            {/* Header - Repeated or kept on first page */}
            <header className="border-b-4 border-gray-900 pb-6 md:pb-12 mb-8 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 flex items-center justify-center rounded-sm rotate-45">
                    <div className="-rotate-45 text-white font-serif text-xl md:text-2xl font-bold">D</div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">DIGITECHINOV</h2>
                </div>
                <p className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest">Digital Presence & Growth Proposal</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm md:text-base font-bold">Prepared for:</p>
                <p className="text-xl md:text-2xl font-serif italic">ProprietyLinks</p>
                <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">March 2026</p>
              </div>
            </header>

            <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-6 md:mb-8 border-b border-blue-100 pb-2">Page 01: The "Launch" Pack</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed italic">
              "A high-impact entry point to establish your digital authority in London."
            </p>

            <div className="border-2 border-gray-100 p-6 md:p-10 rounded-2xl relative overflow-hidden bg-gray-50/30">
              <div className="absolute top-0 right-0 bg-gray-900 text-white px-4 md:px-6 py-1 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-bl-lg">Entry Level</div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">The "Launch" Pack</h3>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 md:mb-8">£750</div>
              <ul className="space-y-4 md:space-y-6">
                {[
                  "High-Spec Single Page Site (React/Vite)",
                  "Interactive London Quote Engine",
                  "WhatsApp Business Integration",
                  "Professional Copywriting & SEO Meta Tags",
                  "Mobile-First Engineering for Android/iOS",
                  "Google Maps Integration"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4 text-base md:text-lg">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden print:block text-xs text-gray-400 font-mono text-center pb-4">Page 1 of 4 — DigitechInov</div>
        </section>

        {/* Page 2: Growth Pack */}
        <section className="flex flex-col justify-between mb-12 md:mb-20 print:mb-0 print:break-after-page print:min-h-[250mm] print:pt-4">
          <div>
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-6 md:mb-8 border-b border-blue-100 pb-2">Page 02: The "Growth" Pack</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed italic">
              "The full-scale solution for dominating the London renovation market."
            </p>

            <div className="border-2 border-blue-600 p-6 md:p-10 rounded-2xl relative overflow-hidden bg-blue-50/30 shadow-xl shadow-blue-100">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 md:px-6 py-1 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-bl-lg">Recommended</div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">The "Growth" Pack</h3>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 md:mb-8">£1,250</div>
              <ul className="space-y-4 md:space-y-6">
                {[
                  "Full 5-Page Website (Home, Services, About, Gallery, Contact)",
                  "Advanced Local SEO Strategy for Kensington & Westminster",
                  "Professional Project Gallery with High-Res Optimization",
                  "Google Business Profile Setup & Optimization",
                  "Priority Launch Support & Training",
                  "Custom Lead Capture Forms"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4 text-base md:text-lg">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden print:block text-xs text-gray-400 font-mono text-center pb-4">Page 2 of 4 — DigitechInov</div>
        </section>

        {/* Page 3: Hosting & Setup */}
        <section className="flex flex-col justify-between mb-12 md:mb-20 print:mb-0 print:break-after-page print:min-h-[250mm] print:pt-4">
          <div>
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-6 md:mb-8 border-b border-blue-100 pb-2">Page 03: Hosting & Technical Setup</h2>
            
            <div className="space-y-8 md:space-y-12">
              <div className="bg-gray-50 p-6 md:p-10 rounded-2xl border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Option 1: Managed Hosting</h3>
                    <p className="text-base text-gray-500 italic">"The hands-free solution for busy professionals."</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-3xl md:text-4xl font-bold">£15<span className="text-sm text-gray-400">/mo</span></div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest">£0 Setup Fee</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    <span className="text-sm md:text-base font-medium">SSL Security Included</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Calculator className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    <span className="text-sm md:text-base font-medium">Monthly Health Checks</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    <span className="text-sm md:text-base font-medium">Daily Backups</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-10 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Option 2: Self-Managed</h3>
                    <p className="text-base text-gray-500 italic">"Full independence for tech-comfortable owners."</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-3xl md:text-4xl font-bold">£0<span className="text-sm text-gray-400">/mo</span></div>
                    <div className="text-xs font-bold text-red-600 uppercase tracking-widest">£150 Setup Fee</div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 md:p-6 rounded-lg flex gap-4 md:gap-6 items-start">
                  <Info className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base md:text-lg font-bold text-red-900 mb-2">Why the £150 Setup Fee?</p>
                    <p className="text-sm md:text-base text-red-800 leading-relaxed">
                      This covers the manual labour of configuring your specific server environment, setting up security protocols, and ensuring React-based files are compatible with your hosting provider.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Important: Domain Registration
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  The domain name (e.g., <strong>moustapha-partners.co.uk</strong>) must be purchased by the client directly upon agreement. This ensures you maintain full legal ownership of your digital identity from day one. We will provide a direct link for purchase (approx. £10-£20/year).
                </p>
              </div>
            </div>
          </div>
          <div className="hidden print:block text-xs text-gray-400 font-mono text-center pb-4">Page 3 of 4 — DigitechInov</div>
        </section>

        {/* Page 4: About & Next Steps */}
        <section className="flex flex-col justify-between mb-12 md:mb-20 print:mb-0 print:min-h-[250mm] print:pt-4">
          <div>
            <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-6 md:mb-8 border-b border-blue-100 pb-2">Page 04: About & Next Steps</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-16">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Beyond the Website: <br /><span className="text-blue-600 italic">AI Business Solutions</span></h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                    We build your **private automation server** with full code handover. No expensive monthly subscriptions—just ~£20–£30/mo in utility costs.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="font-bold text-sm">The Reputation Booster</span>
                      <span className="font-bold text-blue-600">£950</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="font-bold text-sm">The Revenue Guard</span>
                      <span className="font-bold text-blue-600">£1,450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="font-bold text-sm">The Digital Front Desk</span>
                      <span className="font-bold text-blue-600">£1,950</span>
                    </div>
                    <a 
                      href="https://digitechinov.com/pricing" 
                      target="_blank" 
                      rel="noopener"
                      className="block text-center text-xs text-blue-600 font-bold hover:underline mt-2"
                    >
                      View full details at digitechinov.com/pricing →
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Payment Milestones</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium">1. Deposit & Setup</span>
                      <span className="text-sm font-bold text-blue-600">30% + Setup Fee</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-sm font-medium">2. Development Draft</span>
                      <span className="text-sm font-bold text-blue-600">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">3. Final Launch</span>
                      <span className="text-sm font-bold text-blue-600">40%</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4 italic">
                    *Setup fee only applies to Option 2 (Self-Managed).
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 p-6 md:p-10 rounded-2xl text-white">
                <h4 className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-4">The Next Step</h4>
                <p className="text-xl md:text-2xl font-serif italic mb-6 md:mb-8">"Ready to transform your business?"</p>
                <div className="space-y-4 md:space-y-6">
                  <a 
                    href="https://digitechinov.com/tools" 
                    target="_blank" 
                    rel="noopener"
                    className="block group"
                  >
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1 group-hover:text-blue-400 transition-colors">1. Secure Domain</p>
                    <p className="text-sm md:text-base font-bold underline decoration-blue-400/30 underline-offset-4">digitechinov.com/tools</p>
                  </a>
                  <a 
                    href="https://wa.me/447926325725?text=START" 
                    target="_blank" 
                    rel="noopener"
                    className="block group"
                  >
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1 group-hover:text-blue-400 transition-colors">2. Confirm Plan</p>
                    <p className="text-sm md:text-base font-bold underline decoration-blue-400/30 underline-offset-4">Reply 'START' to Mory</p>
                  </a>
                </div>
              </div>
            </div>

            <footer className="border-t border-gray-100 pt-8 md:pt-12 flex flex-col md:flex-row justify-between gap-6 md:gap-8">
              <div className="flex flex-col gap-1 md:gap-2">
                <p className="text-base font-bold">Mory</p>
                <p className="text-sm text-gray-500">Founder, DigitechInov</p>
              </div>
              <div className="flex flex-col gap-1 md:gap-2 md:text-right">
                <a href="tel:+447926325725" className="text-sm md:text-base font-medium hover:text-blue-600 transition-colors">07926 325725</a>
                <a href="mailto:digitechinov@gmail.com" className="text-sm md:text-base font-medium hover:text-blue-600 transition-colors">digitechinov@gmail.com</a>
                <a href="https://digitechinov.com" target="_blank" rel="noopener" className="text-sm md:text-base font-medium text-blue-600 hover:underline">digitechinov.com</a>
              </div>
            </footer>
          </div>
          <div className="hidden print:block text-xs text-gray-400 font-mono text-center pb-4">Page 4 of 4 — DigitechInov</div>
        </section>
      </div>
    </div>
  );
};
