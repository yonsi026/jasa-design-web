import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CtaBanner } from '../components/common/CtaBanner';
import { PROCESS_STEPS } from '../data/websiteData';
import { useRouter } from '../context/RouterContext';
import { ArrowRight, CheckCircle2, Clock, FileText } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const ProsesPage: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();

  const handleStartProject = () => {
    trackEvent('hero_cta_click', { source: 'proses_start_project' });
    navigate('/kontak');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#E5E7EB] bg-[#F5F7FA]">
        <Container withGridLines>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 bg-[#0A1F44]" />
              <span className="text-xs font-mono tracking-widest text-[#123A73] uppercase font-bold">
                03 — PROSES KERJA
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1] mb-6">
              Dari Ide hingga Website Siap Digunakan.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed max-w-3xl">
              Alur kerja terstruktur yang dirancang untuk memastikan transparansi, ketepatan waktu, dan kesesuaian hasil dengan tujuan bisnis Anda tanpa kejutan teknis di akhir proyek.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Process Timeline & Large Numbered Grid */}
      <section className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <Container>
          <div className="space-y-12 sm:space-y-16">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 p-6 sm:p-10 border border-[#E5E7EB] bg-white hover:border-[#0A1F44] transition-colors relative"
              >
                {/* Left Number & Step Title */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] pb-6 lg:pb-0 lg:pr-8 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-5xl sm:text-6xl font-extrabold text-[#0A1F44] block mb-2">
                      {step.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight uppercase">
                      {step.title}
                    </h2>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5E7EB] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                      <Clock className="w-3.5 h-3.5 text-[#123A73]" />
                      <span>Estimasi Durasi: {step.durationEstimate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0A1F44] font-semibold">
                      <FileText className="w-3.5 h-3.5 text-[#123A73]" />
                      <span>Status: Terverifikasi</span>
                    </div>
                  </div>
                </div>

                {/* Right Details & Deliverable */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-[#0B1220] mb-4 leading-relaxed">
                      {step.summary}
                    </p>

                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block">
                        AKTIVITAS DETAIL:
                      </span>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#64748B]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] bg-[#F5F7FA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#64748B] uppercase">
                      OUTPUT SERAH TERIMA FASE INI:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0A1F44]">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mid-Page Action */}
          <div className="mt-16 p-8 bg-[#F5F7FA] border border-[#E5E7EB] text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#0B1220] mb-2">
              Ingin Menyesuaikan Timeline Proyek Anda?
            </h3>
            <p className="text-sm text-[#64748B] mb-6">
              Jadwal di atas dapat disesuaikan dengan urgensi tanggal peluncuran dan kesiapan bahan dari tim Anda.
            </p>
            <button
              type="button"
              onClick={handleStartProject}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0A1F44] text-white font-bold text-sm tracking-wider uppercase hover:bg-[#123A73] transition-colors"
            >
              <span>Mulai Diskusikan Project Anda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Siap Memulai Tahap Pertama Bersama Kami?"
        description="Langkah awal selalu dimulai dari sesi konsultasi gratis untuk memetakan kebutuhan bisnis Anda secara objektif."
        primaryCtaText="Mulai Konsultasi Gratis"
        sourceContext="proses_bottom_cta"
      />
    </div>
  );
};
