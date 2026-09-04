import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PortfolioItem } from '../types';
import { PORTFOLIO_DATA as DEFAULT_PORTFOLIO_DATA } from '../data/websiteData';

interface PortfolioContextType {
  portfolioItems: PortfolioItem[];
  addProject: (item: Omit<PortfolioItem, 'id'>) => PortfolioItem;
  updateProject: (id: string, updated: Partial<PortfolioItem>) => void;
  deleteProject: (id: string) => void;
  resetToDefault: () => void;
  exportCodeSnippet: () => string;
  importFromCodeOrJson: (rawText: string) => { success: boolean; count?: number; error?: string };
  getProjectById: (id: string) => PortfolioItem | undefined;
}

const STORAGE_KEY = 'jasa_design_website_portfolio_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_PORTFOLIO_DATA;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Gagal membaca data portofolio tersimpan, menggunakan data bawaan.', e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  // Sync state to local storage on modification
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioItems));
    } catch (e) {
      console.error('Gagal menyimpan portofolio ke localStorage', e);
    }
  }, [portfolioItems]);

  const addProject = (item: Omit<PortfolioItem, 'id'>): PortfolioItem => {
    const slug = item.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'proyek';
    const newId = `${slug}-${Date.now().toString().slice(-4)}`;

    const newProject: PortfolioItem = {
      ...item,
      id: newId,
    };

    setPortfolioItems((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updated: Partial<PortfolioItem>) => {
    setPortfolioItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteProject = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setPortfolioItems(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Gagal reset storage', e);
    }
  };

  const exportCodeSnippet = (): string => {
    return `export const PORTFOLIO_DATA: PortfolioItem[] = ${JSON.stringify(portfolioItems, null, 2)};`;
  };

  const importFromCodeOrJson = (rawText: string): { success: boolean; count?: number; error?: string } => {
    try {
      let cleaned = rawText.trim();
      // If user pasted TypeScript code snippet
      if (cleaned.includes('export const PORTFOLIO_DATA') || cleaned.includes('PORTFOLIO_DATA =')) {
        const match = cleaned.match(/=\s*(\[[\s\S]*\]);?/);
        if (match && match[1]) {
          cleaned = match[1];
        }
      }

      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) {
        return { success: false, error: 'Format data harus berupa array daftar portofolio.' };
      }

      // Basic validation
      const validItems: PortfolioItem[] = parsed.map((item, index) => ({
        id: item.id || `project-${Date.now()}-${index}`,
        name: item.name || 'Proyek Tanpa Nama',
        category: item.category || 'Business',
        categoryLabel: item.categoryLabel || 'Business Website',
        shortDescription: item.shortDescription || '',
        designDirection: item.designDirection || 'Swiss Layout Minimalist',
        technology: Array.isArray(item.technology) ? item.technology : ['React', 'Tailwind CSS'],
        previewType: item.previewType === 'interface' ? 'interface' : 'mockup',
        mockupAccent: item.mockupAccent || '#0A1F44',
        isPlaceholder: typeof item.isPlaceholder === 'boolean' ? item.isPlaceholder : true,
        businessGoal: item.businessGoal || 'Meningkatkan kredibilitas bisnis secara digital.',
        liveUrl: item.liveUrl || undefined,
        imageUrl: item.imageUrl || undefined,
      }));

      setPortfolioItems(validItems);
      return { success: true, count: validItems.length };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Gagal memproses JSON. Pastikan format valid.' };
    }
  };

  const getProjectById = (id: string) => {
    return portfolioItems.find((item) => item.id === id);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioItems,
        addProject,
        updateProject,
        deleteProject,
        resetToDefault,
        exportCodeSnippet,
        importFromCodeOrJson,
        getProjectById,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio harus digunakan di dalam PortfolioProvider');
  }
  return context;
};
