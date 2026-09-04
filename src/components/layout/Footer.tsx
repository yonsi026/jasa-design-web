import React from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { Container } from '../common/Container';
import { BUSINESS_INFO } from '../../data/websiteData';
import { MessageSquare, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export const Footer: React.FC = () => {
  const { navigate, openWhatsAppConsultation } = useRouter();

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { source: 'footer' });
    openWhatsAppConsultation();
  };

  return (
    <footer className="bg-[#06152E] text-white border-t border-[#123A73] pt-16 pb-12">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="text-xl font-black tracking-tighter text-white flex items-center mb-4">
              <span>JASA DESIGN WEBSITE</span>
              <span className="text-slate-400">.</span>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-md mb-6">
              Kami membantu bisnis membangun kehadiran digital melalui website yang modern, profesional, dan dirancang sesuai kebutuhan.
            </p>

            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div>LOKASI: {BUSINESS_INFO.address}</div>
              <div>JAM KERJA: {BUSINESS_INFO.hours}</div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4">
              NAVIGASI
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/80 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/proses" className="text-white/80 hover:text-white transition-colors">
                  Proses Kerja
                </Link>
              </li>
              <li>
                <Link to="/harga" className="text-white/80 hover:text-white transition-colors">
                  Harga & Paket
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-white/80 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10 mt-2">
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1.5 transition-colors">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Admin Portofolio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Directory */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4">
              LAYANAN WEBSITE
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Landing Page
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Business Website
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Portfolio Website
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-white/80 hover:text-white transition-colors">
                  Custom Website
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4">
              HUBUNGI KAMI
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors text-left"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{BUSINESS_INFO.instagram}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 Jasa Design Website. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate('/faq')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => navigate('/faq')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="font-mono text-[10px] text-white/30">SWISS GRID ARCHITECTURE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
