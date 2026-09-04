import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PageRoute } from '../types';
import { trackEvent } from '../utils/analytics';

interface RouterContextType {
  currentRoute: PageRoute;
  navigate: (to: PageRoute) => void;
  openWhatsAppConsultation: (messageSnippet?: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const ROUTE_METADATA: Record<PageRoute, { title: string; description: string }> = {
  '/': {
    title: 'Jasa Pembuatan Website Profesional | Jasa Design Website',
    description: 'Jasa pembuatan website profesional untuk UMKM, bisnis, perusahaan, dan personal. Website modern, responsive, cepat, dan dirancang untuk membantu bisnis membangun kredibilitas serta berkembang secara digital.',
  },
  '/layanan': {
    title: 'Layanan Pembuatan Website | Jasa Design Website',
    description: 'Solusi website lengkap: Landing Page, Company Profile, Business Website, Portfolio Website, E-Commerce, dan Custom Website dirancang sesuai tujuan bisnis Anda.',
  },
  '/portfolio': {
    title: 'Portfolio & Eksplorasi Desain | Jasa Design Website',
    description: 'Lihat ragam eksplorasi desain website dengan pendekatan International Typographic Style, struktur grid rapi, dan estetika fungsional berorientasi hasil.',
  },
  '/proses': {
    title: 'Alur & Proses Kerja Transparan | Jasa Design Website',
    description: 'Tahapan perancangan website yang terstruktur dari konsultasi, planning, design, development, testing hingga peluncuran dan handover resmi.',
  },
  '/harga': {
    title: 'Paket & Investasi Website | Jasa Design Website',
    description: 'Pilihan paket pembuatan website transparan: Starter, Business, Professional, dan Custom. Investasi tepat untuk pertumbuhan bisnis digital Anda.',
  },
  '/faq': {
    title: 'Pertanyaan yang Sering Ditanyakan (FAQ) | Jasa Design Website',
    description: 'Jawaban jelas dan transparan mengenai proses, teknologi, integrasi WhatsApp, domain, hosting, dan dukungan purna jual website Anda.',
  },
  '/kontak': {
    title: 'Konsultasi & Kontak Resmi | Jasa Design Website',
    description: 'Mulai diskusikan kebutuhan website bisnis Anda bersama tim kami. Tersedia konsultasi langsung via WhatsApp atau formulir kebutuhan proyek.',
  },
};

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getInitialRoute = (): PageRoute => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname as PageRoute;
    const validRoutes: PageRoute[] = ['/', '/layanan', '/portfolio', '/proses', '/harga', '/faq', '/kontak'];
    return validRoutes.includes(path) ? path : '/';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);

  const updateMetadata = (route: PageRoute) => {
    const meta = ROUTE_METADATA[route] || ROUTE_METADATA['/'];
    if (typeof document !== 'undefined') {
      document.title = meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', meta.description);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', meta.title);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', meta.description);
      }
    }
  };

  const navigate = (to: PageRoute) => {
    if (to === currentRoute) return;

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setCurrentRoute(to);
    updateMetadata(to);
    trackEvent('navigation_click', { targetPage: to });
  };

  const openWhatsAppConsultation = (customMessage?: string) => {
    const defaultMsg = 'Halo Jasa Design Website, saya ingin berkonsultasi mengenai kebutuhan website untuk bisnis saya.';
    const text = encodeURIComponent(customMessage || defaultMsg);
    const waUrl = `https://wa.me/6281234567890?text=${text}`;
    trackEvent('whatsapp_click', { message: customMessage || 'default' });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      const validRoutes: PageRoute[] = ['/', '/layanan', '/portfolio', '/proses', '/harga', '/faq', '/kontak'];
      const targetRoute = validRoutes.includes(path) ? path : '/';
      setCurrentRoute(targetRoute);
      updateMetadata(targetRoute);
    };

    window.addEventListener('popstate', handlePopState);
    updateMetadata(currentRoute);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentRoute]);

  return (
    <RouterContext.Provider value={{ currentRoute, navigate, openWhatsAppConsultation }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: PageRoute;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className = '', activeClassName = '', ...props }) => {
  const { currentRoute, navigate } = useRouter();
  const isActive = currentRoute === to;

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
};
