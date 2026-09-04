import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnalyticsToast } from './components/common/Toast';

// All Dedicated Pages
import { HomePage } from './pages/HomePage';
import { LayananPage } from './pages/LayananPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProsesPage } from './pages/ProsesPage';
import { HargaPage } from './pages/HargaPage';
import { FaqPage } from './pages/FaqPage';
import { KontakPage } from './pages/KontakPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useRouter();

  const renderActivePage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/layanan':
        return <LayananPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/proses':
        return <ProsesPage />;
      case '/harga':
        return <HargaPage />;
      case '/faq':
        return <FaqPage />;
      case '/kontak':
        return <KontakPage />;
      case '/admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B1220] selection:bg-[#0A1F44] selection:text-white">
      {/* Persistent Sticky Swiss Navbar */}
      <Navbar />

      {/* Dynamic Multi-Page Content */}
      <main className="flex-1" id="main-content">
        {renderActivePage()}
      </main>

      {/* Persistent Deep Navy Footer */}
      <Footer />

      {/* Real-time Analytics & Conversion Feedback Notification */}
      <AnalyticsToast />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </PortfolioProvider>
  );
}
