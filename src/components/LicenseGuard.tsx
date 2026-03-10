import React, { useState, useEffect } from 'react';
import { fetchSubscription } from '../services/supabaseService';
import { ShieldAlert, Lock, CreditCard } from 'lucide-react';

interface LicenseGuardProps {
  children: React.ReactNode;
}

export const LicenseGuard: React.FC<LicenseGuardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isRestricted, setIsRestricted] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const checkLicense = async () => {
      try {
        const sub = await fetchSubscription();
        setSubscription(sub);

        if (sub) {
          // If fully owned, no restrictions ever
          if (sub.is_fully_owned) {
            setIsRestricted(false);
          } else {
            // If not fully owned, check for missed payments
            if (sub.status === 'Past Due') {
              setIsRestricted(true);
            }
          }
        }
      } catch (error) {
        console.error('Error checking license status:', error);
        // In case of error (e.g. table doesn't exist yet), we don't restrict
        // but in a real production app, you might want to fail-closed.
      } finally {
        setLoading(false);
      }
    };

    checkLicense();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (isRestricted) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0A0A0A] border border-red-500/20 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
            <p className="text-white/60 text-sm">
              Your "Rent-to-Own" license has been suspended due to a missed payment.
            </p>
          </div>
          
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/40 uppercase tracking-widest">Monthly Rate</span>
              <span className="text-white font-bold">£{subscription?.monthly_rate?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/40 uppercase tracking-widest">Total Paid</span>
              <span className="text-white font-bold">£{subscription?.total_paid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-white/5 pt-2">
              <span className="text-white/40 uppercase tracking-widest">Buyout Price</span>
              <span className="text-white font-bold">£{subscription?.buyout_price?.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-gold text-charcoal rounded-xl font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Pay Now to Restore Access
          </button>
          
          <p className="text-[10px] text-white/20 italic">
            Once fully owned (is_fully_owned = true), this restriction will be permanently removed.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
