export type PageRoute = 
  | '/'
  | '/layanan'
  | '/portfolio'
  | '/proses'
  | '/harga'
  | '/faq'
  | '/kontak'
  | '/admin';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string[];
  deliverables: string[];
  businessOutcomes: string[];
  recommendedFor: string;
}

export interface PortfolioItem {
  id: string;
  name: string;
  category: 'Business' | 'UMKM' | 'Company' | 'Portfolio' | 'E-Commerce';
  categoryLabel: string;
  shortDescription: string;
  designDirection: string;
  technology: string[];
  previewType: 'mockup' | 'interface';
  mockupAccent: string;
  isPlaceholder: boolean;
  businessGoal: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  details: string[];
  durationEstimate: string;
  deliverable: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  targetAudience: string;
  priceNote: string;
  priceDisplay: string;
  scope: string[];
  notIncluded?: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  fullName: string;
  businessName: string;
  email: string;
  whatsappNumber: string;
  websiteType: string;
  budgetRange: string;
  message: string;
}

export interface AnalyticsEvent {
  eventName: 'hero_cta_click' | 'portfolio_view' | 'pricing_click' | 'whatsapp_click' | 'contact_form_submit' | 'navigation_click' | 'portfolio_admin_update' | 'portfolio_admin_create';
  payload?: Record<string, unknown>;
  timestamp: Date;
}
