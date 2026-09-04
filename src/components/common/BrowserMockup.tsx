import React, { useState } from 'react';
import { Laptop, Tablet, Smartphone, ExternalLink, Check, ArrowRight } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export const BrowserMockup: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'grid' | 'metrics'>('overview');

  const handleDeviceChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceMode(mode);
    trackEvent('portfolio_view', { previewDevice: mode });
  };

  return (
    <div className="w-full bg-[#06152E] p-3 sm:p-5 border border-[#123A73] shadow-2xl relative">
      {/* Swiss subtle corner registration marks */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/40 pointer-events-none" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/40 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/40 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/40 pointer-events-none" />

      {/* Browser Chrome Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
          <span className="ml-2 font-mono text-[11px] text-white/50 tracking-wider hidden sm:inline">
            PREVIEW // SWISS_ENGINE_V1
          </span>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-sm mx-2 px-3 py-1 bg-[#0A1F44] border border-white/10 text-white/70 font-mono text-[11px] flex items-center justify-between rounded-sm">
          <span className="truncate">https://client-preview.jasadesignwebsite.id</span>
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">SSL 256-bit</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center border border-white/10 divide-x divide-white/10 bg-[#0A1F44]">
          <button
            type="button"
            onClick={() => handleDeviceChange('desktop')}
            className={`p-1.5 transition-colors ${deviceMode === 'desktop' ? 'bg-[#123A73] text-white' : 'text-white/60 hover:text-white'}`}
            title="Desktop View (12-Col Grid)"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeviceChange('tablet')}
            className={`p-1.5 transition-colors ${deviceMode === 'tablet' ? 'bg-[#123A73] text-white' : 'text-white/60 hover:text-white'}`}
            title="Tablet View (8-Col Grid)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeviceChange('mobile')}
            className={`p-1.5 transition-colors ${deviceMode === 'mobile' ? 'bg-[#123A73] text-white' : 'text-white/60 hover:text-white'}`}
            title="Mobile View (Ergonomic Touch)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Browser Viewport Area */}
      <div className="bg-[#F5F7FA] text-[#0B1220] transition-all duration-300 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between overflow-hidden relative">
        {/* Device Frame Constraint Simulation */}
        <div
          className={`mx-auto w-full transition-all duration-300 flex-1 flex flex-col ${
            deviceMode === 'mobile'
              ? 'max-w-[320px] bg-white border-x border-[#E5E7EB] my-2 shadow-md'
              : deviceMode === 'tablet'
              ? 'max-w-[620px] bg-white border-x border-[#E5E7EB] my-2 shadow-md'
              : 'w-full bg-white'
          }`}
        >
          {/* Inner Client Header */}
          <div className="px-4 sm:px-6 py-3 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#0A1F44]" />
              <span className="font-bold tracking-tight text-xs sm:text-sm text-[#0A1F44] uppercase">
                ATELIER // STUDIO
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium text-[#64748B]">
              <span className="text-[#0A1F44] font-semibold border-b border-[#0A1F44]">PROYEK</span>
              <span className="hidden sm:inline">LAYANAN</span>
              <span className="hidden sm:inline">TENTANG</span>
              <span className="px-2 py-0.5 bg-[#0A1F44] text-white text-[10px] tracking-wider uppercase font-semibold">
                KONTAK
              </span>
            </div>
          </div>

          {/* Inner Content Showcase */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#123A73] bg-[#E5E7EB] px-1.5 py-0.5 font-semibold">
                  CASE STUDY 01
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">RESIDENTIAL ARCHITECTURE</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1220] tracking-tight leading-tight mb-3">
                Ruang, Bentuk & Keberlanjutan Arsitektural.
              </h3>

              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-xl mb-4">
                Sistem antarmuka berbasis International Typographic Style dirancang dengan perataan grid asimetris untuk memperkuat status kredibilitas di hadapan klien kelas korporat.
              </p>

              {/* Swiss Visual Composition Block */}
              <div className="grid grid-cols-12 gap-2 my-3">
                <div className="col-span-8 bg-[#0A1F44] text-white p-3 sm:p-4 flex flex-col justify-between min-h-[110px]">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-white/60">GRID RATIO: 1.618</span>
                    <div className="w-2 h-2 bg-white/40" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-white/70">STRUKTUR VISUAL</div>
                    <div className="text-xs sm:text-sm font-bold tracking-tight">KONTRAST TINGGI & TIPOGRAFI TEGAS</div>
                  </div>
                </div>
                <div className="col-span-4 bg-[#E5E7EB] p-3 flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] font-mono text-[#64748B]">INDEX 01</span>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-[#0A1F44]/20" />
                    <div className="h-1.5 w-3/4 bg-[#0A1F44]/40" />
                    <div className="h-1.5 w-1/2 bg-[#0A1F44]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Proof Metrics Inside Mockup */}
            <div className="pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between text-[11px] gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <Check className="w-3 h-3" /> Core Web Vitals: 98/100
                </span>
                <span className="text-[#64748B] hidden sm:inline">• Responsive Breakpoints</span>
              </div>
              <span className="font-mono text-[#0A1F44] text-[10px] font-bold">
                JASA DESIGN WEBSITE SPEC
              </span>
            </div>
          </div>
        </div>

        {/* Mockup Mode Selector Bar at Bottom */}
        <div className="bg-[#06152E] px-4 py-2 text-white flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-4">
            <span className="text-white/60 font-mono hidden sm:inline">MODE INSPEKSI:</span>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`font-semibold uppercase tracking-wider text-[10px] ${activeTab === 'overview' ? 'text-white underline underline-offset-4' : 'text-white/50 hover:text-white'}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('grid')}
              className={`font-semibold uppercase tracking-wider text-[10px] ${activeTab === 'grid' ? 'text-white underline underline-offset-4' : 'text-white/50 hover:text-white'}`}
            >
              12-Col Grid
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={`font-semibold uppercase tracking-wider text-[10px] ${activeTab === 'metrics' ? 'text-white underline underline-offset-4' : 'text-white/50 hover:text-white'}`}
            >
              Standard Output
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-white/70">
            <span>DEVICE: {deviceMode.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
