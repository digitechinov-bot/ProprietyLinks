/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Navbar, 
  Hero, 
  Services, 
  Network, 
  Management, 
  PostcodeSearch, 
  StickyContactHub,
  Testimonials,
  Footer,
  QuickQuoteModal
} from "./components/LandingPage";
import { Proposal } from "./components/Proposal";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (path === '/proposal') {
    return <Proposal />;
  }

  if (path === '/admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal relative">
      <div className="grain-overlay" />
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />
      <main>
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <Services />
        <Network />
        <Management />
        <Testimonials />
        <PostcodeSearch />
      </main>
      <StickyContactHub onOpenQuote={() => setIsQuoteOpen(true)} />
      <Footer />
      
      <QuickQuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
      />
    </div>
  );
}
