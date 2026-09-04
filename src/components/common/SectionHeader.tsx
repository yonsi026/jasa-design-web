import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  theme?: 'light' | 'navy';
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  theme = 'light',
  className = '',
  align = 'left',
}) => {
  const isNavy = theme === 'navy';

  return (
    <div className={`mb-10 sm:mb-14 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {label && (
        <div className={`flex items-center gap-3 mb-3 sm:mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          {align === 'center' && <div className={`h-[1px] w-6 ${isNavy ? 'bg-white/40' : 'bg-[#0A1F44]/40'}`} />}
          <span
            className={`text-[11px] sm:text-[12px] font-bold tracking-[0.3em] uppercase ${
              isNavy ? 'text-slate-400' : 'text-slate-400'
            }`}
          >
            {label}
          </span>
          {align === 'center' && <div className={`h-[1px] w-6 ${isNavy ? 'bg-white/40' : 'bg-[#0A1F44]/40'}`} />}
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.02] ${
          isNavy ? 'text-white' : 'text-[#0A1F44]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg max-w-3xl leading-relaxed font-light ${
            isNavy ? 'text-slate-300' : 'text-slate-600'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
