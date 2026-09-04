import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withGridLines?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  id,
  withGridLines = false,
}) => {
  return (
    <div
      id={id}
      className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative ${className}`}
    >
      {withGridLines && (
        <div className="absolute inset-0 pointer-events-none flex justify-between px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto z-0">
          <div className="w-px h-full bg-[#0A1F44] opacity-[0.06]" />
          <div className="hidden md:block w-px h-full bg-[#0A1F44] opacity-[0.06]" />
          <div className="hidden lg:block w-px h-full bg-[#0A1F44] opacity-[0.06]" />
          <div className="w-px h-full bg-[#0A1F44] opacity-[0.06]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
