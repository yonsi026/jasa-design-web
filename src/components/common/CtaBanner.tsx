import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Container } from './Container';
import { useRouter } from '../../context/RouterContext';
import { trackEvent } from '../../utils/analytics';

interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  sourceContext?: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  title = 'Siap Membawa Bisnis Anda ke Level Berikutnya?',
  description = 'Konsultasikan kebutuhan website Anda bersama kami. Gratis dan tanpa komitmen.',
  primaryCtaText = 'Mulai Konsultasi Gratis',
  sourceContext = 'general_cta',
}) => {
  const { navigate, openWhatsAppConsultation } = useRouter();

  const handlePrimaryClick = () => {
    trackEvent('hero_cta_click', { source: sourceContext, action: 'navigate_kontak' });
    navigate('/kontak');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { source: sourceContext });
    openWhatsAppConsultation('Halo Jasa Design Website, saya ingin berdiskusi mengenai proyek website untuk bisnis kami.');
  };

  return (
    <section className="bg-[#06152E] text-white py-16 sm:py-24 border-t border-b border-[#123A73] relative overflow-hidden">
      {/* Swiss grid accent background marks */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-white" />
              <span className="text-[11px] font-bold tracking-[0.3em] text-slate-400 uppercase">
                KONSULTASI GRATIS TANPA KOMITMEN
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.98] text-white mb-5">
              {title}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#0A1F44] font-bold text-[11px] sm:text-[12px] tracking-widest uppercase hover:bg-slate-100 transition-all text-center"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white font-bold text-[11px] sm:text-[12px] tracking-widest uppercase hover:bg-white/10 transition-all border border-white/25 text-center"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Chat via WhatsApp</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
