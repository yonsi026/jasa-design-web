import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { useRouter, Link } from '../../context/RouterContext';
import { Container } from '../common/Container';
import { PageRoute } from '../../types';
import { trackEvent } from '../../utils/analytics';

const NAV_ITEMS: { label: string; href: PageRoute }[] = [
  { label: 'Home', href: '/' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Proses', href: '/proses' },
  { label: 'Harga', href: '/harga' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontak', href: '/kontak' },
];

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, openWhatsAppConsultation } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentRoute]);

  const handleCtaClick = () => {
    trackEvent('hero_cta_click', { source: 'navbar_primary_cta' });
    navigate('/kontak');
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden"
            aria-label="Jasa Design Website Beranda"
          >
            <div className="text-xl font-black tracking-tighter text-[#0A1F44] flex items-center">
              <span>JASA DESIGN WEBSITE</span>
              <span className="text-slate-300">.</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-[0.15em] uppercase" aria-label="Navigasi Utama">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors pb-1 ${
                    isActive
                      ? 'text-[#0A1F44] border-b-2 border-[#0A1F44]'
                      : 'text-slate-400 hover:text-[#0A1F44]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={handleCtaClick}
              className="bg-[#0A1F44] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#123A73] transition-all border border-[#0A1F44]"
            >
              <span>KONSULTASI GRATIS</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button (Min 44x44px target) */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center text-[#0A1F44] hover:bg-[#F5F7FA] border border-slate-200 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Side / Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[81px] bottom-0 bg-[#06152E] text-white z-50 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
                MENU NAVIGASI
              </span>
              <span className="text-xs text-emerald-400 font-mono">STATUS: ONLINE</span>
            </div>

            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentRoute === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between py-3.5 px-3 min-h-[44px] text-base font-semibold border-b border-white/10 transition-colors ${
                      isActive ? 'bg-white/10 text-white pl-4' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-white/40">0{index + 1}</span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ArrowRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}

              <Link
                to="/admin"
                className="flex items-center justify-between py-3.5 px-3 min-h-[44px] text-sm font-mono text-emerald-400 border-b border-white/10 hover:bg-white/5 transition-colors mt-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span>Studio Admin (Kelola Portofolio)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#0A1F44] font-bold text-sm tracking-wider uppercase hover:bg-white/90 transition-colors"
            >
              <span>KONSULTASI GRATIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                openWhatsAppConsultation();
                setIsMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-white border border-white/30 font-semibold text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>CHAT VIA WHATSAPP</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
