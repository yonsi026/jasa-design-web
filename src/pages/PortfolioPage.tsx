import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CtaBanner } from '../components/common/CtaBanner';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioItem } from '../types';
import { useRouter } from '../context/RouterContext';
import { ArrowRight, ExternalLink, X, Check, Eye, Layers, Compass, PlusCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CATEGORIES: ('All' | 'Business' | 'UMKM' | 'Company' | 'Portfolio' | 'E-Commerce')[] = [
  'All',
  'Business',
  'UMKM',
  'Company',
  'Portfolio',
  'E-Commerce',
];

export const PortfolioPage: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();
  const { portfolioItems } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === selectedCategory);

  const handleOpenModal = (project: PortfolioItem) => {
    setActiveModalItem(project);
    trackEvent('portfolio_view', { project: project.name, category: project.category });
  };

  const handleConsultProject = (projectName: string) => {
    trackEvent('hero_cta_click', { projectReferenced: projectName });
    openWhatsAppConsultation(`Halo Jasa Design Website, saya tertarik dengan konsep desain seperti pada ${projectName}. Bisakah kita mendiskusikan implementasinya untuk bisnis saya?`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-slate-200 bg-[#F5F7FA]">
        <Container withGridLines>
          <div className="max-w-4xl">
            <div className="text-[12px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0A1F44]" />
              <span>02 &mdash; PORTFOLIO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A1F44] tracking-tighter leading-[0.98] mb-6">
              Desain yang Tidak Hanya Terlihat Baik, tetapi Memiliki Tujuan<span className="text-blue-600">.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl">
              Eksplorasi tata letak grid internasional, hierarki tipografi tegas, dan alur konversi yang dirancang khusus untuk masing-masing model bisnis.
            </p>

            {/* Explicit Honest Standard Notice */}
            <div className="mt-8 p-4 bg-white border border-slate-200 max-w-2xl flex items-start gap-3 text-xs text-slate-600 font-light">
              <div className="w-2 h-2 bg-[#123A73] mt-1 shrink-0" />
              <div>
                <span className="font-bold text-[#0A1F44] block mb-0.5">STANDAR TRANSPARANSI KARYA:</span>
                Seluruh proyek berikut disajikan dengan tanda <span className="font-mono text-[#0A1F44] font-bold">“Project Preview — Placeholder”</span> untuk menunjukkan pendekatan visual, arah tipografi, dan spesifikasi teknis tanpa klaim metrik fiktif.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filters Bar */}
      <section className="py-5 border-b border-slate-200 bg-white sticky top-20 z-20 shadow-2xs">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mr-2 hidden sm:inline">
                FILTER KATEGORI:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors border ${
                    selectedCategory === cat
                      ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
                      : 'bg-[#F5F7FA] text-slate-500 hover:text-[#0A1F44] border-slate-200 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Admin Access */}
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-[#0A1F44] text-slate-700 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all border border-slate-300"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Kelola / Tambah Portofolio</span>
            </button>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group border border-slate-200 bg-white hover:border-[#0A1F44] transition-all flex flex-col justify-between"
              >
                {/* Visual Header / Mockup Representation */}
                <div className="h-60 bg-[#06152E] text-white p-5 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#123A73_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                  <div className="flex items-center justify-between text-xs font-mono relative z-10">
                    <span className="text-white/70 px-2 py-0.5 bg-white/10 uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[10px] text-amber-300 font-semibold px-1.5 py-0.5 bg-amber-400/20 uppercase">
                      Preview Spec
                    </span>
                  </div>

                  <div className="my-auto text-center px-4 relative z-10">
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1">
                      SWISS GRID SPECIFICATION
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-white/60 relative z-10">
                    <span>12-COL ASYMMETRIC</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#123A73] uppercase font-bold mb-1">
                      {project.category}
                    </div>
                    <h4 className="text-xl font-extrabold text-[#0A1F44] tracking-tight mb-3">
                      {project.name}
                    </h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    <div className="p-3 bg-[#F5F7FA] border border-slate-200 text-xs text-[#0B1220] mb-4">
                      <span className="font-bold block mb-1 text-[#0A1F44]">Tujuan Bisnis:</span>
                      <span className="text-slate-600 font-light">{project.businessGoal}</span>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                        Teknologi & Engine:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technology.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono bg-white text-[#0A1F44] px-2 py-0.5 border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(project)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A1F44] hover:text-[#123A73] transition-colors group-hover:translate-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Spesifikasi Proyek</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Modal / Project Specification Inspector */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-[#0A1F44] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Header */}
            <div className="sticky top-0 bg-[#06152E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-white/10 z-10">
              <div>
                <div className="text-[11px] font-mono text-white/60 uppercase">
                  SPESIFIKASI PROYEK // {activeModalItem.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                  {activeModalItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-3 bg-[#F5F7FA] border-l-4 border-[#0A1F44] text-xs sm:text-sm text-[#0B1220]">
                <span className="font-bold">Kategori:</span> {activeModalItem.categoryLabel}
                <span className="block text-[#64748B] mt-0.5">
                  Label: Project Preview — Placeholder (Eksplorasi Konseptual)
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Deskripsi & Konteks Kebutuhan
                </h4>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  {activeModalItem.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Arah Desain (Design Direction)
                </h4>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed p-4 bg-[#F5F7FA] border border-[#E5E7EB]">
                  {activeModalItem.designDirection}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Tujuan Hasil Bisnis (Business Outcome)
                </h4>
                <p className="text-sm sm:text-base text-[#0B1220] font-medium leading-relaxed">
                  {activeModalItem.businessGoal}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Komponen Arsitektur & Teknologi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.technology.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#0A1F44] text-white text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleConsultProject(activeModalItem.name);
                    setActiveModalItem(null);
                  }}
                  className="flex-1 px-6 py-3.5 bg-[#0A1F44] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#123A73] transition-colors text-center"
                >
                  Diskusikan Konsep Serupa
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-3.5 bg-white text-[#0B1220] border border-[#E5E7EB] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F5F7FA] transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <CtaBanner
        title="Ingin Tampilan Website yang Sesuai Karakter Bisnis Anda?"
        description="Kami membantu merumuskan visual direction yang matang sebelum baris kode pertama ditulis."
        primaryCtaText="Konsultasi Desain Gratis"
        sourceContext="portfolio_bottom_cta"
      />
    </div>
  );
};
