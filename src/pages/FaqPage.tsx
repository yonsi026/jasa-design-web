import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CtaBanner } from '../components/common/CtaBanner';
import { FAQ_DATA } from '../data/websiteData';
import { useRouter } from '../context/RouterContext';
import { ChevronDown, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const FaqPage: React.FC = () => {
  const { openWhatsAppConsultation } = useRouter();
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id, FAQ_DATA[1].id]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const q = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q)
    );
  });

  const handleAskWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'faq_page_unresolved' });
    openWhatsAppConsultation('Halo Jasa Design Website, saya memiliki pertanyaan mengenai layanan website yang belum tercantum di FAQ.');
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
                05 — TANYA JAWAB
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1] mb-6">
              Pertanyaan yang Sering Ditanyakan.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed max-w-3xl">
              Penjelasan langsung dan objektif mengenai proses kerja, aspek teknis, domain, integrasi, dan dukungan purna jual.
            </p>

            {/* Quick Search Input */}
            <div className="mt-8 max-w-md relative">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan (misal: domain, WhatsApp, SEO)..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Accordion List */}
      <section className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <Container>
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center border border-[#E5E7EB] bg-[#F5F7FA]">
                <p className="text-sm text-[#64748B] mb-3">
                  Tidak ditemukan pertanyaan dengan kata kunci "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold uppercase tracking-wider text-[#0A1F44] underline"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="border border-[#E5E7EB] bg-white transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-hidden hover:bg-[#F5F7FA]/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs text-[#123A73] font-bold mt-0.5">
                          0{index + 1}
                        </span>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#0B1220] tracking-tight">
                            {faq.question}
                          </h3>
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block mt-1">
                            KATEGORI: {faq.category}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`p-1 text-[#0A1F44] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E5E7EB] text-sm sm:text-base text-[#64748B] leading-relaxed bg-[#F5F7FA]/40">
                        <div className="pl-6 sm:pl-7">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Unresolved Question Notice Box */}
            <div className="mt-12 p-6 sm:p-8 bg-[#F5F7FA] border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-[#0B1220] mb-1">
                  Punya Pertanyaan Lain yang Belum Terjawab?
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Tim kami siap menjawab pertanyaan teknis dan spesifikasi khusus untuk bisnis Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAskWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1F44] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123A73] transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Tanya via WhatsApp</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Sudah Menemukan Jawaban yang Anda Butuhkan?"
        description="Mulai langkah berikutnya dengan mendiskusikan kebutuhan arsitektur website bisnis Anda bersama kami."
        primaryCtaText="Jadwalkan Konsultasi"
        sourceContext="faq_bottom_cta"
      />
    </div>
  );
};
