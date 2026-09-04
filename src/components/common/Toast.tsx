import React, { useEffect, useState } from 'react';
import { AnalyticsEvent } from '../../types';
import { subscribeAnalytics } from '../../utils/analytics';
import { Activity, X } from 'lucide-react';

export const AnalyticsToast: React.FC = () => {
  const [lastEvent, setLastEvent] = useState<AnalyticsEvent | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeAnalytics((event) => {
      setLastEvent(event);
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, []);

  if (!isVisible || !lastEvent) return null;

  const formatEventName = (name: string) => {
    switch (name) {
      case 'hero_cta_click':
        return 'CTA Click Tracked';
      case 'whatsapp_click':
        return 'WhatsApp Conversion Triggered';
      case 'pricing_click':
        return 'Pricing Inquiry Logged';
      case 'contact_form_submit':
        return 'Lead Form Submitted';
      case 'portfolio_view':
        return 'Portfolio Inspection Active';
      default:
        return 'Interaction Tracked';
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 bg-[#06152E] text-white border border-[#123A73] p-3 shadow-xl max-w-sm flex items-start gap-3 text-xs"
    >
      <div className="p-1 bg-[#123A73] text-white mt-0.5">
        <Activity className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1">
        <div className="font-mono text-[10px] text-white/60 tracking-wider uppercase">
          CONVERSION METRICS // REAL-TIME
        </div>
        <div className="font-semibold text-white mt-0.5">{formatEventName(lastEvent.eventName)}</div>
        <div className="text-white/70 font-mono text-[10px] mt-0.5">
          Event: {lastEvent.eventName} ({lastEvent.timestamp.toLocaleTimeString()})
        </div>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="text-white/50 hover:text-white p-1"
        aria-label="Tutup notifikasi"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
