import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CtaBanner } from '../components/common/CtaBanner';
import { SERVICES_DATA } from '../data/websiteData';
import { useRouter } from '../context/RouterContext';
import { Check, ArrowRight, Layers, Users, TrendingUp, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const LayananPage: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('landing-page');

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleConsultService = (serviceTitle: string) => {
    trackEvent('hero_cta_click', { service: serviceTitle });
    openWhatsAppConsultation(`Halo Jasa Design Website, saya tertarik berkonsultasi mengenai pembuatan ${serviceTitle} untuk bisnis saya.`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-slate-200 bg-[#F5F7FA]">
        <Container withGridLines>
          <div className="max-w-4xl">
            <div className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0A1F44]" />
              <span>01 &mdash; LAYANAN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A1F44] tracking-tighter leading-[0.98] mb-6">
              Website yang Dibangun Sesuai Tujuan Bisnis Anda<span className="text-blue-600">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl">
              Setiap bisnis memiliki kebutuhan yang berbeda. Karena itu, kami menyediakan solusi website yang dapat disesuaikan dengan tujuan, audiens, dan kebutuhan bisnis Anda.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Service Navigator (Swiss Horizontal Tabs) */}
      <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-xs">
        <Container>
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 no-scrollbar">
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedServiceId(srv.id)}
                className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors border ${
                  selectedServiceId === srv.id
                    ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
                    : 'bg-white text-slate-400 hover:text-[#0A1F44] border-transparent hover:border-slate-200'
                }`}
              >
                {srv.number} — {srv.title}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Active Service Detailed Spotlight */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Overview & Target Audience */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-lg font-bold text-[#123A73]">
                    {activeService.number}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                    SPESIFIKASI LAYANAN
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1F44] tracking-tighter mb-2">
                  {activeService.title}
                </h2>
                <div className="text-xs font-mono text-[#123A73] uppercase font-semibold mb-4">
                  {activeService.tagline}
                </div>
                <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Target Audience / "Untuk:" */}
              <div className="p-6 bg-[#F5F7FA] border border-slate-200">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#0A1F44] uppercase mb-3">
                  <Users className="w-4 h-4 text-[#123A73]" />
                  <span>SANGAT TEPAT UNTUK:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.targetAudience.map((target, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#0B1220]">
                      <div className="w-1.5 h-1.5 bg-[#0A1F44]" />
                      <span>{target}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Summary Note */}
              <div className="border-l-2 border-[#0A1F44] pl-4 py-1 text-sm text-slate-600 font-light italic">
                “{activeService.recommendedFor}”
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleConsultService(activeService.title)}
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#06152E] text-white font-bold text-[11px] sm:text-[12px] tracking-widest uppercase hover:bg-[#123A73] transition-all"
                >
                  <span>Diskusikan Kebutuhan Website Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Deliverables & Business Outcomes */}
            <div className="lg:col-span-6 space-y-6">
              {/* Deliverables List */}
              <div className="p-6 sm:p-8 border border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#0A1F44] uppercase font-bold mb-4">
                  <Layers className="w-4 h-4 text-[#123A73]" />
                  <span>ITEM SERAH TERIMA & CAKUPAN KERJA</span>
                </div>
                <ul className="space-y-3">
                  {activeService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business Outcomes */}
              <div className="p-6 sm:p-8 bg-[#06152E] text-white border border-[#123A73]">
                <div className="flex items-center gap-2 text-[11px] font-mono text-white/60 uppercase tracking-widest font-bold mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>DAMPAK & HASIL BISNIS YANG DIHARAPKAN</span>
                </div>
                <ul className="space-y-3">
                  {activeService.businessOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/90 font-light">
                      <div className="w-1.5 h-1.5 bg-emerald-400 shrink-0 mt-2" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comprehensive Grid of All 6 Services */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
        <Container>
          <SectionHeader
            label="DIREKTORI LENGKAP"
            title="Pilih Jenis Website yang Relevan dengan Fase Bisnis Anda."
            description="Setiap model memiliki struktur konten, arsitektur teknis, dan target konversi yang telah disesuaikan."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => {
              const isCurrent = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  className={`p-6 sm:p-8 border bg-white flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'border-[#0A1F44] ring-2 ring-[#0A1F44]/10'
                      : 'border-slate-200 hover:border-[#0A1F44]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xl font-extrabold text-[#0A1F44]">
                        {service.number}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 bg-[#F5F7FA]">
                        READY SPEC
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0A1F44] tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-[#123A73] uppercase font-semibold mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-xs font-semibold text-[#0A1F44] block mb-2">
                        Cocok untuk:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.targetAudience.slice(0, 3).map((aud, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-[#F5F7FA] text-slate-700 px-2 py-0.5 border border-slate-200"
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#0A1F44] hover:text-[#123A73] inline-flex items-center gap-1.5"
                    >
                      <span>Lihat Spesifikasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <CtaBanner
        title="Belum Yakin Jenis Website yang Tepat?"
        description="Ceritakan model bisnis dan target pelanggan Anda. Kami akan memberikan saran arsitektur website yang paling efisien dan berdampak."
        primaryCtaText="Konsultasikan Kebutuhan Anda"
        sourceContext="layanan_page_bottom"
      />
    </div>
  );
};
