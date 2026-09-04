import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { BrowserMockup } from '../components/common/BrowserMockup';
import { CtaBanner } from '../components/common/CtaBanner';
import { CORE_VALUES, BUSINESS_PROBLEMS, BUSINESS_SOLUTIONS, SERVICES_DATA, PORTFOLIO_DATA, PROCESS_STEPS } from '../data/websiteData';
import { ArrowRight, Check, ShieldCheck, Sparkles, Smartphone, Zap } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const HomePage: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();

  const handleHeroConsultation = () => {
    trackEvent('hero_cta_click', { source: 'home_hero_primary' });
    navigate('/kontak');
  };

  const handleViewPortfolio = () => {
    trackEvent('portfolio_view', { source: 'home_hero_secondary' });
    navigate('/portfolio');
  };

  return (
    <div className="bg-white relative">
      {/* Subtle Vertical Rail Text (Editorial Stamp) */}
      <div className="hidden 2xl:block fixed bottom-44 right-[-130px] rotate-90 text-[9px] font-bold tracking-[0.5em] text-slate-300 uppercase whitespace-nowrap pointer-events-none z-30">
        STRATEGIC DESIGN &bull; MODERN TECHNOLOGY &bull; BUSINESS GROWTH
      </div>

      {/* 01 — HERO SECTION (Editorial Split Layout) */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-200 relative overflow-hidden">
        <Container withGridLines>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pr-6">
              <div className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0A1F44]" />
                <span>01 &mdash; JASA PEMBUATAN WEBSITE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[76px] leading-[0.96] font-extrabold tracking-tighter text-[#0A1F44] mb-7">
                Website Profesional<br className="hidden sm:inline" /> untuk Bisnis yang<br className="hidden sm:inline" /> Ingin Tumbuh<span className="text-blue-600">.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-9 leading-relaxed font-light">
                Kami membantu UMKM, profesional, dan perusahaan memiliki website modern yang dirancang khusus untuk membangun kepercayaan dan mendukung pertumbuhan bisnis secara digital.
              </p>

              {/* Action CTAs with Editorial Styling */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-8 mb-10">
                <button
                  type="button"
                  onClick={handleHeroConsultation}
                  className="bg-[#06152E] text-white px-8 sm:px-10 py-4 sm:py-5 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase hover:shadow-xl hover:bg-[#123A73] transition-all text-center"
                >
                  Mulai Konsultasi
                </button>

                <button
                  type="button"
                  onClick={handleViewPortfolio}
                  className="group flex items-center justify-center sm:justify-start gap-4 text-[11px] sm:text-[12px] font-bold tracking-widest uppercase text-[#0A1F44] py-3"
                >
                  <span>Lihat Portfolio</span>
                  <div className="w-10 sm:w-12 h-px bg-[#0A1F44] group-hover:w-16 transition-all" />
                </button>
              </div>

              {/* Trust Points Badges */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1F44]">
                  <Smartphone className="w-3.5 h-3.5 text-[#123A73]" />
                  <span>Responsive</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1F44]">
                  <Sparkles className="w-3.5 h-3.5 text-[#123A73]" />
                  <span>Custom Design</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1F44]">
                  <Zap className="w-3.5 h-3.5 text-[#123A73]" />
                  <span>SEO Friendly</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A1F44]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#123A73]" />
                  <span>Professional Support</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column (Swiss Composition) */}
            <div className="lg:col-span-5 bg-[#F5F7FA] border border-slate-200 relative flex flex-col justify-between p-6 sm:p-8">
              {/* Top Watermark */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-bold block">
                    DIGITAL PARTNER
                  </span>
                  <span className="text-xs font-mono text-[#0A1F44] font-semibold">
                    INDONESIA // 2026
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-slate-200 leading-none tracking-tighter select-none">
                  2026
                </div>
              </div>

              {/* Integrated Interactive Mockup */}
              <div className="my-2">
                <BrowserMockup />
              </div>

              {/* Bottom Editorial Callout Indicators */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-1 bg-[#0A1F44]" />
                  <div className="text-[11px] font-bold tracking-widest uppercase text-[#0A1F44]">
                    High-Performance Loading
                  </div>
                  <p className="text-[13px] text-slate-500 leading-snug font-light">
                    Kecepatan muat optimal untuk retensi pengunjung dan rasio konversi maksimal.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-1 bg-[#0A1F44] opacity-30" />
                  <div className="text-[11px] font-bold tracking-widest uppercase text-[#0A1F44]">
                    Strategic SEO Architecture
                  </div>
                  <p className="text-[13px] text-slate-500 leading-snug font-light">
                    Struktur semantik ramah mesin pencari yang dirancang matang sejak awal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* EDITORIAL TRUST & SERVICES BAR */}
      <section className="border-b border-slate-200 bg-white py-6 sm:py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-y-4 md:gap-y-0">
            <div className="pr-4 sm:pr-8 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">02 &mdash; LAYANAN</span>
              <span className="text-[15px] font-bold text-[#0A1F44] tracking-tight">Landing Page</span>
            </div>
            <div className="px-4 sm:px-8 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">03 &mdash; LAYANAN</span>
              <span className="text-[15px] font-bold text-[#0A1F44] tracking-tight">Company Profile</span>
            </div>
            <div className="px-4 sm:px-8 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">04 &mdash; LAYANAN</span>
              <span className="text-[15px] font-bold text-[#0A1F44] tracking-tight">E-Commerce</span>
            </div>
            <div className="pl-4 sm:pl-8 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">05 &mdash; LAYANAN</span>
              <span className="text-[15px] font-bold text-[#0A1F44] tracking-tight">Custom Web Apps</span>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST / CREDIBILITY SECTION */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase block mb-3">
              NILAI FUNDAMENTAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F44] tracking-tighter leading-[1.02]">
              Website yang Dibangun untuk Mendukung Bisnis Anda.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              Fokus pada estetika fungsional, performa beban rendah, dan struktur pesan yang jelas untuk mengubah pengunjung menjadi pelanggan setia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CORE_VALUES.map((val) => (
              <div
                key={val.number}
                className="bg-white p-6 sm:p-8 border border-slate-200 flex flex-col justify-between hover:border-[#0A1F44] transition-colors"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0A1F44] mb-4">
                    {val.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#0A1F44] mb-2 tracking-tight">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-[#123A73]">
                  <span>STANDAR RESMI</span>
                  <div className="w-1.5 h-1.5 bg-[#0A1F44]" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 02 — PROBLEM SECTION */}
      <section className="py-16 sm:py-24 border-b border-slate-200">
        <Container>
          <SectionHeader
            label="02 — MASALAH"
            title="Bisnis Anda Sudah Berkembang. Apakah Website Anda Sudah Mengikutinya?"
            description="Banyak bisnis kehilangan kredibilitas dan peluang pasar karena aset digital yang belum tertata profesional."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {BUSINESS_PROBLEMS.map((problem) => (
              <div
                key={problem.number}
                className="p-6 sm:p-8 border border-slate-200 bg-white hover:border-[#0A1F44] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#123A73] px-2 py-0.5 bg-[#F5F7FA]">
                      KENDALA {problem.number}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">RISIKO KONVERSI</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0A1F44] mb-2 tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-4">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-[#0A1F44] bg-[#F5F7FA] p-3">
                  <span className="font-semibold block mb-1">Dampak terhadap bisnis:</span>
                  <span className="text-slate-600 font-light">{problem.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SOLUTION SECTION (Navy Background) */}
      <section className="py-16 sm:py-24 bg-[#0A1F44] text-white border-b border-[#06152E]">
        <Container>
          <SectionHeader
            label="SOLUSI KAMI"
            title="Kami Mengubah Kebutuhan Bisnis Menjadi Website yang Siap Digunakan."
            description="Pendekatan terpadu antara strategi komunikasi, estetika editorial Swiss, dan ketepatan teknis modern."
            theme="navy"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BUSINESS_SOLUTIONS.map((sol) => (
              <div
                key={sol.number}
                className="p-6 sm:p-8 border border-white/15 bg-[#06152E] flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold font-mono text-white/40 mb-4">
                    {sol.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    {sol.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>TERMASUK DALAM PROSES</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — SERVICES PREVIEW */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase block mb-3">
                03 — LAYANAN
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F44] tracking-tighter leading-[1.02]">
                Solusi Website untuk Berbagai Kebutuhan Bisnis.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/layanan')}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A1F44] hover:text-[#123A73] border-b-2 border-[#0A1F44] pb-1 w-fit"
            >
              <span>Lihat Semua Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="border border-slate-200 p-6 sm:p-8 bg-white hover:border-[#0A1F44] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-lg font-bold text-[#0A1F44]">
                      {service.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      WEBSITE SPEC
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0A1F44] mb-2 tracking-tight group-hover:text-[#123A73]">
                    {service.title}
                  </h3>
                  <div className="text-xs font-mono text-[#123A73] uppercase font-semibold mb-3">
                    {service.tagline}
                  </div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => navigate('/layanan')}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A1F44] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Detail Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — PORTFOLIO PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase block mb-3">
                04 — PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F44] tracking-tighter leading-[1.02]">
                Pekerjaan Terbaik Dimulai dari Strategi yang Tepat.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 font-light">
                Setiap pratinjau dirancang dengan eksplorasi arsitektur informasi terstruktur dan pendekatan desain visual yang berbobot.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/portfolio')}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A1F44] hover:text-[#123A73] border-b-2 border-[#0A1F44] pb-1 w-fit"
            >
              <span>Lihat Semua Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PORTFOLIO_DATA.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-[#0A1F44] transition-all flex flex-col"
              >
                {/* Mockup Preview Area */}
                <div className="h-52 bg-[#06152E] text-white p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                    <span>{item.categoryLabel}</span>
                    <span className="px-1.5 py-0.5 bg-white/20 text-white text-[10px] uppercase font-semibold">
                      Project Preview — Placeholder
                    </span>
                  </div>

                  <div className="my-auto text-center px-4">
                    <div className="text-xs font-mono tracking-widest text-white/50 uppercase mb-1">
                      CONCEPT DIRECTION
                    </div>
                    <div className="text-lg font-bold text-white tracking-tight">
                      {item.name}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-white/50">
                    <span>SWISS ARCHITECTURE</span>
                    <span className="text-emerald-400">READY SPEC</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#123A73] uppercase font-bold mb-1">
                      {item.category}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0A1F44] mb-2 tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigate('/portfolio')}
                      className="text-xs font-bold uppercase tracking-wider text-[#0A1F44] inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>Lihat Detail Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — PROCESS PREVIEW */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase block mb-3">
                05 — CARA KERJA
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F44] tracking-tighter leading-[1.02]">
                Proses yang Jelas. Dari Ide hingga Website Siap Digunakan.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/proses')}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A1F44] hover:text-[#123A73] border-b-2 border-[#0A1F44] pb-1 w-fit"
            >
              <span>Pelajari Proses Kami</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-6 sm:p-8 border border-slate-200 bg-white flex flex-col justify-between hover:border-[#0A1F44] transition-colors"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#0A1F44] mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#0A1F44] uppercase tracking-wider mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs font-mono text-[#123A73]">
                  <span>DELIVERABLE: {step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BIG NAVY CTA SECTION */}
      <CtaBanner sourceContext="home_bottom_cta" />
    </div>
  );
};
