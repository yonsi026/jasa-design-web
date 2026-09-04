import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { BUSINESS_INFO } from '../data/websiteData';
import { ContactFormData } from '../types';
import { useRouter } from '../context/RouterContext';
import { MessageSquare, Mail, Instagram, Clock, MapPin, CheckCircle2, ArrowRight, Send, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const WEBSITE_TYPES = [
  'Landing Page (1 Halaman)',
  'Company Profile (Multi-Halaman)',
  'Business Website / Katalog',
  'Portfolio Website',
  'E-Commerce (Toko Online)',
  'Custom Website Khusus',
];

const BUDGET_RANGES = [
  'Di bawah Rp 5 Juta (Paket Starter)',
  'Rp 5 Juta – Rp 10 Juta (Paket Business)',
  'Rp 10 Juta – Rp 20 Juta (Paket Professional)',
  'Di atas Rp 20 Juta (Kebutuhan Custom)',
  'Belum Ditentukan / Butuh Saran',
];

export const KontakPage: React.FC = () => {
  const { openWhatsAppConsultation } = useRouter();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    email: '',
    whatsappNumber: '',
    websiteType: WEBSITE_TYPES[0],
    budgetRange: BUDGET_RANGES[1],
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.whatsappNumber.trim()) {
      setErrorMessage('Mohon lengkapi Nama dan Nomor WhatsApp agar kami dapat menghubungi Anda.');
      return;
    }

    trackEvent('contact_form_submit', {
      websiteType: formData.websiteType,
      budgetRange: formData.budgetRange,
      businessName: formData.businessName,
    });

    setFormSubmitted(true);
  };

  const handleForwardToWhatsApp = () => {
    const compiledMessage = `Halo Jasa Design Website, saya telah mengirimkan formulir konsultasi:
- Nama: ${formData.fullName}
- Bisnis: ${formData.businessName || '-'}
- Jenis Website: ${formData.websiteType}
- Estimasi Budget: ${formData.budgetRange}
- Catatan: ${formData.message || 'Mohon informasi penawaran lebih lanjut.'}`;

    openWhatsAppConsultation(compiledMessage);
  };

  const handleDirectWhatsAppChat = () => {
    trackEvent('whatsapp_click', { source: 'kontak_direct_button' });
    openWhatsAppConsultation('Halo Jasa Design Website, saya ingin berdiskusi langsung mengenai pembuatan website.');
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
                06 — KONTAK
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1] mb-6">
              Mari Diskusikan Website untuk Bisnis Anda.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed max-w-3xl">
              Ceritakan kebutuhan Anda. Kami akan membantu memahami kebutuhan website dan menentukan solusi yang paling sesuai.
            </p>
          </div>
        </Container>
      </section>

      {/* Main 2-Column Contact Layout */}
      <section className="py-16 sm:py-24 border-b border-[#E5E7EB]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#123A73] uppercase font-bold block mb-2">
                  INFORMASI KONTAK RESMI
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight mb-4">
                  Terhubung Langsung dengan Tim Kami.
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  Kami mengutamakan respon cepat dan komunikasi objektif tanpa jargon membingungkan.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="space-y-4">
                <div className="p-5 border border-[#E5E7EB] bg-white flex items-start gap-4">
                  <div className="p-2.5 bg-[#0A1F44] text-white shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#64748B] font-bold">WHATSAPP</div>
                    <div className="text-base font-bold text-[#0B1220]">{BUSINESS_INFO.whatsappDisplay}</div>
                    <p className="text-xs text-[#64748B] mt-0.5">Respon cepat pada jam kerja operasional.</p>
                  </div>
                </div>

                <div className="p-5 border border-[#E5E7EB] bg-white flex items-start gap-4">
                  <div className="p-2.5 bg-[#0A1F44] text-white shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#64748B] font-bold">EMAIL RESMI</div>
                    <div className="text-base font-bold text-[#0B1220]">{BUSINESS_INFO.email}</div>
                    <p className="text-xs text-[#64748B] mt-0.5">Untuk proposal tender & dokumen RFP resmi.</p>
                  </div>
                </div>

                <div className="p-5 border border-[#E5E7EB] bg-white flex items-start gap-4">
                  <div className="p-2.5 bg-[#0A1F44] text-white shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#64748B] font-bold">INSTAGRAM</div>
                    <div className="text-base font-bold text-[#0B1220]">{BUSINESS_INFO.instagram}</div>
                    <p className="text-xs text-[#64748B] mt-0.5">Kajian tipografi & pembaruan karya berkala.</p>
                  </div>
                </div>
              </div>

              {/* Hours & Studio Address */}
              <div className="p-6 bg-[#F5F7FA] border border-[#E5E7EB] space-y-3 text-xs sm:text-sm text-[#64748B]">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#0A1F44] shrink-0" />
                  <span>{BUSINESS_INFO.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#0A1F44] shrink-0" />
                  <span>{BUSINESS_INFO.address} (Melayani Klien Seluruh Indonesia)</span>
                </div>
              </div>

              {/* Alternative Direct WhatsApp CTA */}
              <div className="p-6 bg-[#06152E] text-white border border-[#123A73]">
                <h3 className="text-base font-bold text-white mb-2">
                  Atau konsultasi langsung melalui WhatsApp.
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mb-4">
                  Jika Anda lebih menyukai obrolan langsung tanpa mengisi formulir panjang.
                </p>
                <button
                  type="button"
                  onClick={handleDirectWhatsAppChat}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat via WhatsApp Sekarang</span>
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-xs">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-6 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">
                      Permintaan Konsultasi Berhasil Dikirim!
                    </h3>
                    <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">
                      Terima kasih, <strong className="text-[#0B1220]">{formData.fullName}</strong>. Tim kami akan segera meninjau kebutuhan website untuk <strong className="text-[#0B1220]">{formData.businessName || 'bisnis Anda'}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 bg-[#F5F7FA] border border-[#E5E7EB] text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
                    <div className="font-mono uppercase text-[#0A1F44] font-bold text-xs mb-2">
                      RINGKASAN DATA KEBUTUHAN:
                    </div>
                    <div><span className="text-[#64748B]">WhatsApp:</span> {formData.whatsappNumber}</div>
                    <div><span className="text-[#64748B]">Jenis Website:</span> {formData.websiteType}</div>
                    <div><span className="text-[#64748B]">Estimasi Budget:</span> {formData.budgetRange}</div>
                  </div>

                  {/* Instant WhatsApp Send Action */}
                  <div className="space-y-3 max-w-md mx-auto pt-4">
                    <button
                      type="button"
                      onClick={handleForwardToWhatsApp}
                      className="w-full py-4 px-6 bg-[#0A1F44] hover:bg-[#123A73] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Teruskan Rincian Ini ke WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-semibold text-[#64748B] hover:text-[#0A1F44] underline"
                    >
                      Kirim Formulir Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] tracking-tight">
                      Formulir Konsultasi Proyek
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                      Seluruh informasi bersifat rahasia dan hanya digunakan untuk merumuskan penawaran resmi.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                      >
                        Nama Lengkap *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Contoh: Budi Pratama"
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="businessName"
                        className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                      >
                        Nama Bisnis / Perusahaan
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Contoh: PT Sumber Rejeki / Kopi Kita"
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                      >
                        Alamat Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@bisnis.com"
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label
                        htmlFor="whatsappNumber"
                        className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                      >
                        Nomor WhatsApp *
                      </label>
                      <input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Website Type */}
                  <div>
                    <label
                      htmlFor="websiteType"
                      className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                    >
                      Jenis Website yang Dibutuhkan
                    </label>
                    <select
                      id="websiteType"
                      name="websiteType"
                      value={formData.websiteType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                    >
                      {WEBSITE_TYPES.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label
                      htmlFor="budgetRange"
                      className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                    >
                      Perkiraan Anggaran (Budget Range)
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors"
                    >
                      {BUDGET_RANGES.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider font-bold text-[#0A1F44] mb-2"
                    >
                      Deskripsi Kebutuhan atau Catatan Proyek
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ceritakan tentang profil bisnis, target pelanggan, fitur yang diharapkan, atau referensi website yang Anda sukai..."
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] text-sm text-[#0B1220] focus:outline-hidden focus:border-[#0A1F44] transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 bg-[#0A1F44] hover:bg-[#123A73] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Permintaan Konsultasi</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
