import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CtaBanner } from '../components/common/CtaBanner';
import { PRICING_PLANS } from '../data/websiteData';
import { useRouter } from '../context/RouterContext';
import { Check, ArrowRight, HelpCircle, Shield, Info } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const HargaPage: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();

  const handlePlanSelect = (planName: string) => {
    trackEvent('pricing_click', { selectedPlan: planName });
    openWhatsAppConsultation(`Halo Jasa Design Website, saya ingin menanyakan rincian penawaran untuk paket ${planName}.`);
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
                04 — HARGA
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1] mb-6">
              Pilih Solusi yang Sesuai dengan Kebutuhan Anda.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed max-w-3xl">
              Investasi website dengan cakupan kerja yang terdefinisi jelas. Tanpa biaya tersembunyi, dirancang untuk mendukung tujuan bisnis nyata.
            </p>

            {/* Pricing Transparency Disclaimer */}
            <div className="mt-6 p-4 bg-white border border-[#E5E7EB] max-w-2xl flex items-start gap-3 text-xs text-[#64748B]">
              <Info className="w-4 h-4 text-[#123A73] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0A1F44] block mb-0.5">KEBIJAKAN TRANSPARANSI BIAYA:</span>
                Setiap proyek website memiliki kompleksitas konten dan integrasi yang unik. Kami menggunakan estimasi acuan <span className="font-mono text-[#0A1F44] font-semibold">“Mulai dari Rp X.xxx.xxx”</span> dan memberikan penawaran resmi tertulis setelah memetakan kebutuhan Anda.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Swiss Editorial Pricing Grid */}
      <section className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'border-[#0A1F44] bg-[#06152E] text-white shadow-xl relative'
                    : 'border-[#E5E7EB] bg-white text-[#0B1220] hover:border-[#0A1F44]'
                }`}
              >
                <div>
                  {plan.badge && (
                    <div className="mb-3 inline-block px-2.5 py-1 bg-white text-[#0A1F44] text-[10px] font-mono uppercase font-bold tracking-wider">
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex items-baseline justify-between mb-1">
                    <h2
                      className={`text-2xl font-extrabold tracking-tight uppercase ${
                        plan.isPopular ? 'text-white' : 'text-[#0B1220]'
                      }`}
                    >
                      {plan.name}
                    </h2>
                  </div>

                  <div
                    className={`text-xs font-mono mb-4 min-h-[36px] ${
                      plan.isPopular ? 'text-white/70' : 'text-[#64748B]'
                    }`}
                  >
                    {plan.targetAudience}
                  </div>

                  {/* Price Tag */}
                  <div
                    className={`py-4 border-y mb-6 ${
                      plan.isPopular ? 'border-white/15' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <div
                      className={`text-xs font-mono uppercase tracking-wider mb-1 ${
                        plan.isPopular ? 'text-white/60' : 'text-[#64748B]'
                      }`}
                    >
                      ESTIMASI INVESTASI:
                    </div>
                    <div
                      className={`text-xl sm:text-2xl font-extrabold font-mono tracking-tight ${
                        plan.isPopular ? 'text-emerald-400' : 'text-[#0A1F44]'
                      }`}
                    >
                      {plan.priceDisplay}
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${
                        plan.isPopular ? 'text-white/60' : 'text-[#64748B]'
                      }`}
                    >
                      {plan.priceNote}
                    </div>
                  </div>

                  {/* Scope Checklist */}
                  <div className="space-y-3 mb-8">
                    <div
                      className={`text-xs font-mono uppercase tracking-wider font-bold ${
                        plan.isPopular ? 'text-white/70' : 'text-[#0A1F44]'
                      }`}
                    >
                      CAKUPAN FITUR & LAYANAN:
                    </div>
                    {plan.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={plan.isPopular ? 'text-white/90' : 'text-[#0B1220]'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-inherit">
                  <button
                    type="button"
                    onClick={() => handlePlanSelect(plan.name)}
                    className={`w-full py-3.5 px-4 text-xs font-bold tracking-wider uppercase transition-colors text-center inline-flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-white text-[#0A1F44] hover:bg-white/90'
                        : 'bg-[#0A1F44] text-white hover:bg-[#123A73]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Matrix / Comparison Table in Swiss Editorial Style */}
      <section className="py-16 sm:py-24 bg-[#F5F7FA] border-b border-[#E5E7EB]">
        <Container>
          <SectionHeader
            label="KOMPARASI TEKNIS"
            title="Perbandingan Fitur Antar Paket."
            description="Tinjauan menyeluruh cakupan teknis dan kapabilitas implementasi untuk setiap kategori."
          />

          <div className="overflow-x-auto border border-[#E5E7EB] bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#06152E] text-white font-mono uppercase tracking-wider">
                  <th className="p-4 sm:p-5 w-1/3">Spesifikasi & Kapabilitas</th>
                  <th className="p-4 sm:p-5 text-center">Starter</th>
                  <th className="p-4 sm:p-5 text-center bg-[#123A73]">Business</th>
                  <th className="p-4 sm:p-5 text-center">Professional</th>
                  <th className="p-4 sm:p-5 text-center">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Jumlah Halaman</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">1 Halaman (Landing)</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-[#0A1F44] bg-[#F5F7FA]">5 – 7 Halaman</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">8 – 15 Halaman</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">Fleksibel Sesuai Scope</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Custom UI/UX Design</td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center bg-[#F5F7FA]"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Full Responsive Mobile & Tablet</td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center bg-[#F5F7FA]"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Integrasi WhatsApp & Kontak</td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center bg-[#F5F7FA]"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Struktur Fondasi SEO Semantik</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">Dasar</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-[#0A1F44] bg-[#F5F7FA]">Standar Bisnis</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">Advanced + Schema</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">Komprehensif</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Integrasi Sistem / API Khusus</td>
                  <td className="p-4 sm:p-5 text-center text-[#94A3B8]">—</td>
                  <td className="p-4 sm:p-5 text-center text-[#94A3B8] bg-[#F5F7FA]">—</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">Tersedia (Scope Tertentu)</td>
                  <td className="p-4 sm:p-5 text-center"><Check className="w-4 h-4 mx-auto text-emerald-600" /></td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-[#0B1220]">Dukungan Purna Jual & Warranty</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">14 Hari</td>
                  <td className="p-4 sm:p-5 text-center font-bold text-[#0A1F44] bg-[#F5F7FA]">30 Hari</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">60 Hari Prioritas</td>
                  <td className="p-4 sm:p-5 text-center text-[#64748B]">SLA Sesuai Kontrak</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Butuh Estimasi Biaya untuk Kebutuhan Tertentu?"
        description="Sampaikan rencana proyek Anda dan kami akan mengirimkan rincian penawaran transparan tanpa komitmen."
        primaryCtaText="Minta Penawaran Resmi"
        sourceContext="harga_bottom_cta"
      />
    </div>
  );
};
