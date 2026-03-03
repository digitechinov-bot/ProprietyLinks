import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";
import { 
  Phone, 
  MessageCircle, 
  Wrench, 
  Home, 
  ShieldCheck, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Droplets,
  Hammer,
  Layout,
  Clock,
  Award,
  Calculator,
  X,
  ChevronRight,
  Info
} from "lucide-react";

const Navbar = ({ onOpenQuote }: { onOpenQuote: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 cursor-pointer group scale-90 md:scale-100 origin-left"
      >
        <div className="w-10 h-10 gold-gradient flex items-center justify-center rounded-sm rotate-45 group-hover:scale-110 transition-transform relative">
          <Wrench className="text-charcoal -rotate-45 w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-charcoal animate-pulse" title="Live & Available Now"></div>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif text-lg font-bold tracking-tight leading-none">PROPRIETYLINKS</span>
          <span className="text-[10px] tracking-[0.2em] text-gold uppercase font-mono">London Construction & Plumbing</span>
        </div>
      </button>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
        <a href="#services" className="hover:text-gold transition-colors" aria-label="View our construction and plumbing services">Services</a>
        <a href="#network" className="hover:text-gold transition-colors" aria-label="Learn about our London trades network">The Network</a>
        <a href="#management" className="hover:text-gold transition-colors" aria-label="Our project management approach">Management</a>
        <button onClick={onOpenQuote} className="hover:text-gold transition-colors uppercase tracking-widest cursor-pointer" aria-label="Get a quick quote">Quick Quote</button>
      </div>

      <a 
        href="https://wa.me/447926325725" 
        target="_blank"
        rel="noopener"
        aria-label="Contact us on WhatsApp for a quick quote"
        className="gold-gradient text-charcoal px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  </nav>
);

const QuickQuoteModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [details, setDetails] = useState({ size: 0, urgency: "standard", quality: "premium" });
  const [estimate, setEstimate] = useState<{ min: number, max: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const saveLead = (leadData: any) => {
    const savedLeads = localStorage.getItem('moustapha_leads');
    const leads = savedLeads ? JSON.parse(savedLeads) : [];
    const newLead = {
      id: Math.random().toString(36).substr(2, 9),
      ...leadData,
      status: 'New',
      timestamp: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem('moustapha_leads', JSON.stringify(leads));
  };

  const calculateEstimate = () => {
    setIsCalculating(true);
    
    // Simulate complex calculation for "Magic" feel
    setTimeout(() => {
      let min = 0;
      let max = 0;

      switch (service) {
        case "Plumbing":
          min = details.urgency === "emergency" ? 120 : 80;
          max = details.urgency === "emergency" ? 250 : 180;
          break;
        case "Bathroom":
          min = details.quality === "luxury" ? 12000 : 6000;
          max = details.quality === "luxury" ? 25000 : 12000;
          break;
        case "Extension":
          const rate = details.quality === "luxury" ? 3500 : 2500;
          min = details.size * rate;
          max = details.size * (rate + 1000);
          break;
        case "Maintenance":
          min = 50;
          max = 150;
          break;
      }

      setEstimate({ min, max });
      setIsCalculating(false);
      setStep(3);

      // Save lead automatically when estimate is generated
      saveLead({
        name: "Website Visitor", // Placeholder until we add name field
        email: "Pending...",
        phone: "07926325725",
        service: service,
        value: min
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/90 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-gold" />
                <h2 className="text-xl font-serif">London Price Estimator</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <p className="text-sm text-white/50 font-mono uppercase tracking-widest">Step 1: Select Service</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Plumbing", "Bathroom", "Extension", "Maintenance"].map((s) => (
                      <button 
                        key={s}
                        onClick={() => { setService(s); setStep(2); }}
                        className="p-6 border border-white/5 bg-white/5 hover:border-gold/50 hover:bg-gold/5 transition-all text-left group rounded-sm cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg">{s}</span>
                          <ChevronRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <p className="text-sm text-white/50 font-mono uppercase tracking-widest">Step 2: Project Details</p>
                  
                  {service === "Extension" && (
                    <div className="space-y-4">
                      <label className="block text-xs uppercase tracking-widest text-white/40 font-mono">Approximate Size (m²)</label>
                      <input 
                        type="number" 
                        onChange={(e) => setDetails({ ...details, size: Number(e.target.value) })}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-serif focus:border-gold outline-none transition-colors"
                        placeholder="e.g. 25"
                      />
                    </div>
                  )}

                  {(service === "Bathroom" || service === "Extension") && (
                    <div className="space-y-4">
                      <label className="block text-xs uppercase tracking-widest text-white/40 font-mono">Finish Quality</label>
                      <div className="flex gap-4">
                        {["standard", "luxury"].map((q) => (
                          <button 
                            key={q}
                            onClick={() => setDetails({ ...details, quality: q })}
                            className={`flex-1 py-4 border rounded-sm uppercase tracking-widest text-[10px] font-bold transition-all cursor-pointer ${details.quality === q ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/40'}`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {service === "Plumbing" && (
                    <div className="space-y-4">
                      <label className="block text-xs uppercase tracking-widest text-white/40 font-mono">Urgency</label>
                      <div className="flex gap-4">
                        {["standard", "emergency"].map((u) => (
                          <button 
                            key={u}
                            onClick={() => setDetails({ ...details, urgency: u })}
                            className={`flex-1 py-4 border rounded-sm uppercase tracking-widest text-[10px] font-bold transition-all cursor-pointer ${details.urgency === u ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/40'}`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 rounded-sm uppercase tracking-widest text-[10px] font-bold hover:bg-white/5 cursor-pointer">Back</button>
                    <button 
                      onClick={calculateEstimate} 
                      disabled={isCalculating}
                      className="flex-[2] gold-gradient text-charcoal py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] cursor-pointer relative overflow-hidden"
                    >
                      {isCalculating ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-3 h-3 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></div>
                          <span>Analysing Market Rates...</span>
                        </div>
                      ) : (
                        "Calculate Estimate"
                      )}
                      {isCalculating && (
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-white/20 skew-x-12"
                        />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && estimate && (
                <div className="text-center space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] uppercase tracking-widest font-mono">
                    <Info className="w-3 h-3" />
                    Estimated London Pricing
                  </div>
                  
                  <div>
                    <h3 className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-mono mb-4">Projected Cost Range</h3>
                    <div className="text-4xl md:text-6xl font-serif text-gold-gradient">
                      £{estimate.min.toLocaleString()} - £{estimate.max.toLocaleString()}
                    </div>
                  </div>

                  <p className="text-sm text-white/50 leading-relaxed max-w-md mx-auto">
                    This is a preliminary estimate based on current London market rates. Final pricing depends on site survey and specific material choices.
                  </p>

                  <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`https://wa.me/447926325725?text=Hi Moustapha, I used your estimator for a ${service} project and got a range of £${estimate.min} - £${estimate.max}. I'd like to discuss this further.`}
                      target="_blank"
                      rel="noopener"
                      className="flex-1 gold-gradient text-charcoal py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Confirm with Moustapha
                    </a>
                    <button onClick={() => setStep(1)} className="flex-1 border border-white/10 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 cursor-pointer">
                      New Estimate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ onOpenQuote }: { onOpenQuote: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-24 md:pt-20 overflow-hidden">
    {/* Background Image with Optimization */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" 
        alt="Luxury Bathroom Renovation in Kensington, London" 
        className="w-full h-full object-cover opacity-40"
        width="1200"
        height="800"
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 md:pt-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 rounded-full bg-gold/5 mb-12 md:mb-20">
          <Award className="w-3 h-3 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-mono">Gas Safe Certified # [Placeholder]</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-6">
          Expert Construction & <br />
          <span className="text-gold-gradient italic">Plumbing Management</span> <br />
          Across London.
        </h1>
        
        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg">
          From 24/7 emergency repairs to bespoke renovations in Kensington, we provide a single point of contact for elite craftsmanship and certified London tradesmen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={onOpenQuote}
            className="gold-gradient text-charcoal px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Get Instant Quote
          </button>
          <a 
            href="tel:+447926325725"
            rel="noopener"
            aria-label="Call ProprietyLinks for emergency plumbing"
            className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Trust Bar / Recent Activity */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 pt-12 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Recent Activity</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Emergency repair completed in Kensington</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Response Time</span>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gold" />
              <span className="text-xs font-medium">45 Mins Average (Central London)</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-1">Active Projects</span>
            <div className="flex items-center gap-2">
              <Hammer className="w-3 h-3 text-gold" />
              <span className="text-xs font-medium">12 Sites across Greater London</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
      <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
      <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    {
      title: "Luxury Bathroom Fitting",
      desc: "Bespoke design and installation of high-end sanitary ware and tiling in Westminster and Kensington.",
      tldr: "TL;DR: High-spec bathroom renovations with designer finishes and structural plumbing integration.",
      icon: Droplets,
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Emergency Plumbing",
      desc: "24/7 rapid response for high-priority leaks, blockages, and heating failures across all 32 London Boroughs.",
      tldr: "TL;DR: Guaranteed 60-minute response for urgent plumbing and heating emergencies in Greater London.",
      icon: Clock,
      img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Home Extensions",
      desc: "Bespoke structural expansions managed to the highest London building standards and planning regulations.",
      tldr: "TL;DR: End-to-end management of residential extensions, from foundations to high-end interior finishing.",
      icon: Home,
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Property Maintenance",
      desc: "Comprehensive preventative care for premium residential portfolios and estates in Central London.",
      tldr: "TL;DR: Scheduled maintenance and rapid-fix services for luxury property managers and private landlords.",
      icon: ShieldCheck,
      img: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="services" className="py-32 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Certified Expertise</span>
            <h2 className="text-3xl md:text-5xl font-serif">Bespoke Renovations & <br />Emergency Plumber Westminster</h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed">
            We specialise in high-spec finishes and technical excellence, ensuring every detail of your London property is handled with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] overflow-hidden rounded-sm border border-white/5 bg-charcoal"
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              <img 
                src={s.img} 
                alt={s.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                width="400"
                height="500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="p-3 bg-white/5 rounded-sm border border-white/10 text-[10px] text-gold font-mono uppercase tracking-wider leading-tight">
                  {s.tldr}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Network = () => (
  <section id="network" className="py-32 bg-white text-charcoal relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-sm overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
              alt="Certified London Tradesmen on Site" 
              className="w-full h-full object-cover"
              width="1000"
              height="1000"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-charcoal text-white p-10 max-w-xs hidden md:block">
            <div className="flex items-center gap-4 mb-4">
              <Users className="text-gold w-8 h-8" />
              <span className="font-serif text-2xl">Hand-Picked</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed uppercase tracking-widest">
              Only the most skilled tradespeople make it into our network.
            </p>
          </div>
        </div>

        <div>
          <span className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-4 block">The Advantage</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-8 text-charcoal">The London Trades Network</h2>
          <p className="text-lg text-charcoal/70 mb-10 leading-relaxed">
            We deploy a hand-picked team of certified specialists for every project, ensuring the right expert for the specific job. Our network includes Gas Safe registered engineers and NICEIC approved electricians.
          </p>
          
          <div className="space-y-6">
            {[
              "Gas Safe Registered Engineers (LPG & Natural Gas)",
              "NICEIC Approved Electricians for Smart Homes",
              "Master Carpenters & Joiners for Bespoke Cabinetry",
              "Specialist Tilers & Stone Masons for Luxury Finishes"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-charcoal/10 pb-4">
                <CheckCircle2 className="text-gold w-5 h-5 flex-shrink-0" />
                <span className="font-medium tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Management = () => (
  <section id="management" className="py-32 bg-charcoal overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-[#1a1a1a] p-12 md:p-20 rounded-sm border border-white/5 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Direct Oversight</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-8">Bespoke Project Management</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Moustapha personally oversees every project from start to finish. This ensures that every detail meets stringent London building standards and our own uncompromising quality benchmarks for luxury renovations.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-serif text-gold mb-2">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">On-Site Supervision</div>
              </div>
              <div>
                <div className="text-3xl font-serif text-gold mb-2">Elite</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Craftsmanship</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400" alt="Site Management London" className="w-full h-full object-cover" width="400" height="533" loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400" alt="Architecture Planning" className="w-full h-full object-cover" width="400" height="400" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400" alt="Plumbing Installation Westminster" className="w-full h-full object-cover" width="400" height="400" loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[3/4] rounded-sm overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=400" alt="Construction Tools" className="w-full h-full object-cover" width="400" height="533" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PostcodeSearch = () => (
  <section className="py-24 bg-gold text-charcoal">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <MapPin className="w-10 h-10 mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-serif mb-4">Serving all 32 London Boroughs within the M25</h2>
      <p className="text-charcoal/70 uppercase tracking-[0.2em] text-xs font-bold font-mono">
        Kensington • Westminster • Chelsea • Hammersmith • Fulham • Camden • Islington
      </p>
    </div>
  </section>
);

const StickyContactHub = ({ onOpenQuote }: { onOpenQuote: () => void }) => (
  <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-charcoal/95 backdrop-blur-lg border-t border-white/10 p-4 flex gap-4">
    <button 
      onClick={onOpenQuote}
      className="flex-1 bg-white text-charcoal py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer"
    >
      <Calculator className="w-4 h-4" />
      Quick Quote
    </button>
    <a 
      href="https://wa.me/447926325725"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp ProprietyLinks"
      className="flex-1 gold-gradient text-charcoal py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
    >
      <MessageCircle className="w-4 h-4" />
      WhatsApp
    </a>
  </div>
);

const Testimonials = () => (
  <section className="py-32 bg-white text-charcoal">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 md:mb-20">
        <span className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Client Feedback</span>
        <h2 className="text-3xl md:text-5xl font-serif">Trusted by London's <br />Most Discerning Residents</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            quote: "Moustapha managed our full bathroom renovation in Chelsea. The attention to detail and finish quality was exceptional.",
            author: "James W.",
            location: "Chelsea, SW3"
          },
          {
            quote: "An emergency leak at 2 AM was handled within 45 minutes. Professional, clean, and highly effective service.",
            author: "Sarah L.",
            location: "Westminster, SW1"
          },
          {
            quote: "The trades network they deploy is top-tier. Every specialist was certified and clearly a master of their trade.",
            author: "Robert D.",
            location: "Kensington, W8"
          }
        ].map((t, i) => (
          <div key={i} className="space-y-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Award key={i} className="w-4 h-4 text-gold fill-gold" />)}
            </div>
            <p className="text-lg font-serif italic leading-relaxed">"{t.quote}"</p>
            <div>
              <div className="font-bold tracking-tight">{t.author}</div>
              <div className="text-xs text-charcoal/40 uppercase tracking-widest font-mono">{t.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const leadData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      email: 'Enquiry via Footer',
      value: 0 // Will be determined after contact
    };

    const savedLeads = localStorage.getItem('moustapha_leads');
    const leads = savedLeads ? JSON.parse(savedLeads) : [];
    leads.unshift({
      id: Math.random().toString(36).substr(2, 9),
      ...leadData,
      status: 'New',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('moustapha_leads', JSON.stringify(leads));
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <footer id="contact" className="bg-charcoal pt-32 pb-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Ready to start your <br /><span className="text-gold italic">next project?</span></h2>
            <p className="text-white/50 mb-12 max-w-md leading-relaxed">
              Contact us today for a consultation or emergency plumbing assistance. We are available 24/7 for high-priority calls across Greater London.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="tel:+447926325725" rel="noopener" aria-label="Call our London office" className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">Call Us</div>
                  <div className="text-lg font-medium">07926 325725</div>
                </div>
              </a>
              
              <a href="https://wa.me/447926325725" target="_blank" rel="noopener" aria-label="Message us on WhatsApp" className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">WhatsApp</div>
                  <div className="text-lg font-medium">Message Now</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-sm border border-white/5">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif">Enquiry Sent</h3>
                <p className="text-white/50 text-sm">Moustapha will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Full Name</label>
                    <input name="name" required type="text" aria-label="Enter your full name" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Phone Number</label>
                    <input name="phone" required type="tel" aria-label="Enter your phone number" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Service Required</label>
                  <select name="service" aria-label="Select the service you require" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors appearance-none">
                    <option className="bg-charcoal">Luxury Bathroom Fitting</option>
                    <option className="bg-charcoal">Emergency Plumbing</option>
                    <option className="bg-charcoal">Home Extension</option>
                    <option className="bg-charcoal">Property Maintenance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Project Details</label>
                  <textarea name="details" rows={3} aria-label="Enter project details" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-gold outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full gold-gradient text-charcoal py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 gold-gradient flex items-center justify-center rounded-sm rotate-45 group-hover:scale-110 transition-transform">
              <Wrench className="text-charcoal -rotate-45 w-4 h-4" />
            </div>
            <span className="font-serif text-sm font-bold tracking-tight">PROPRIETYLINKS</span>
          </button>
          {/* Secret Admin Access Point */}
          <a 
            href="/admin" 
            className="opacity-10 hover:opacity-100 transition-opacity ml-1 mt-1"
            title="Admin Access"
          >
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          </a>
        </div>
        
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">
          © 2026 ProprietyLinks. Gas Safe Certified # [Placeholder].
        </p>
        
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/40 font-mono">
          <a href="/admin" className="opacity-20 hover:opacity-100 transition-opacity">Management</a>
          <a href="/proposal" className="hover:text-gold transition-colors">View Proposal PDF</a>
          <a href="#" rel="noopener" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" rel="noopener" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export { Navbar, Hero, Services, Network, Management, PostcodeSearch, StickyContactHub, Testimonials, Footer, QuickQuoteModal };
