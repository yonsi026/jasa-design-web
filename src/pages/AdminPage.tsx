import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useRouter } from '../context/RouterContext';
import { PortfolioItem } from '../types';
import { Container } from '../components/common/Container';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Check,
  Eye,
  X,
  Search,
  Layers,
  ArrowLeft,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const CATEGORY_OPTIONS: Array<{ value: PortfolioItem['category']; label: string }> = [
  { value: 'Business', label: 'Business Website' },
  { value: 'UMKM', label: 'UMKM / Bisnis Retail' },
  { value: 'Company', label: 'Company Profile' },
  { value: 'Portfolio', label: 'Personal & Portfolio' },
  { value: 'E-Commerce', label: 'E-Commerce Website' },
];

const PRESET_COLORS = [
  { name: 'Swiss Navy', hex: '#0A1F44' },
  { name: 'Deep Navy', hex: '#06152E' },
  { name: 'Navy Cobalt', hex: '#123A73' },
  { name: 'Slate Dark', hex: '#1E293B' },
  { name: 'Emerald Forest', hex: '#0F766E' },
  { name: 'Amber Bronze', hex: '#92400E' },
  { name: 'Crimson Red', hex: '#991B1B' },
];

const COMMON_TECH_SUGGESTIONS = [
  'React',
  'Tailwind CSS',
  'TypeScript',
  'Next.js Concept',
  'Vite',
  'WhatsApp API',
  'Semantic SEO',
  'Responsive Grid Engine',
  'E-Commerce Catalog',
  'Interactive Filter',
];

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();
  const {
    portfolioItems,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault,
    exportCodeSnippet,
    importFromCodeOrJson,
  } = usePortfolio();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Form State (for adding or editing)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<PortfolioItem['category']>('Business');
  const [categoryLabel, setCategoryLabel] = useState('Business Website');
  const [shortDescription, setShortDescription] = useState('');
  const [designDirection, setDesignDirection] = useState('');
  const [businessGoal, setBusinessGoal] = useState('');
  const [technologyInput, setTechnologyInput] = useState('');
  const [technologyList, setTechnologyList] = useState<string[]>(['React', 'Tailwind CSS']);
  const [previewType, setPreviewType] = useState<'mockup' | 'interface'>('mockup');
  const [mockupAccent, setMockupAccent] = useState('#0A1F44');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Modals & Feedback
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewModalItem, setPreviewModalItem] = useState<PortfolioItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // Handle Category Change
  const handleCategoryChange = (val: PortfolioItem['category']) => {
    setCategory(val);
    const found = CATEGORY_OPTIONS.find((c) => c.value === val);
    if (found) {
      setCategoryLabel(found.label);
    }
  };

  // Add technology tag
  const handleAddTechTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !technologyList.includes(trimmed)) {
      setTechnologyList([...technologyList, trimmed]);
      setTechnologyInput('');
    }
  };

  const handleRemoveTechTag = (tagToRemove: string) => {
    setTechnologyList(technologyList.filter((t) => t !== tagToRemove));
  };

  // Reset form
  const resetForm = () => {
    setName('');
    setCategory('Business');
    setCategoryLabel('Business Website');
    setShortDescription('');
    setDesignDirection('');
    setBusinessGoal('');
    setTechnologyList(['React', 'Tailwind CSS']);
    setTechnologyInput('');
    setPreviewType('mockup');
    setMockupAccent('#0A1F44');
    setIsPlaceholder(true);
    setLiveUrl('');
    setImageUrl('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Open form for Create
  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Open form for Edit
  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setCategoryLabel(item.categoryLabel);
    setShortDescription(item.shortDescription);
    setDesignDirection(item.designDirection);
    setBusinessGoal(item.businessGoal);
    setTechnologyList(item.technology || []);
    setPreviewType(item.previewType);
    setMockupAccent(item.mockupAccent || '#0A1F44');
    setIsPlaceholder(item.isPlaceholder);
    setLiveUrl(item.liveUrl || '');
    setImageUrl(item.imageUrl || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Save form (Add or Update)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      category,
      categoryLabel: categoryLabel.trim() || 'Website Proyek',
      shortDescription: shortDescription.trim() || 'Website representasi profesional berorientasi hasil.',
      designDirection: designDirection.trim() || 'Struktur kisi Swiss, hierarki tipografi tegas, dan ruang negatif seimbang.',
      businessGoal: businessGoal.trim() || 'Meningkatkan kredibilitas dan konversi prospek bisnis.',
      technology: technologyList.length > 0 ? technologyList : ['React', 'Tailwind CSS'],
      previewType,
      mockupAccent,
      isPlaceholder,
      liveUrl: liveUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    };

    if (editingId) {
      updateProject(editingId, payload);
      trackEvent('portfolio_admin_update', { id: editingId, name: payload.name });
    } else {
      addProject(payload);
      trackEvent('portfolio_admin_create', { name: payload.name });
    }

    resetForm();
  };

  // Copy Code to Clipboard
  const handleCopyCode = () => {
    const code = exportCodeSnippet();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Handle Import
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = importFromCodeOrJson(importJsonText);
    if (res.success) {
      setImportStatus({
        type: 'success',
        message: `Berhasil mengimpor ${res.count} portofolio ke sistem!`,
      });
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus(null);
        setImportJsonText('');
      }, 1500);
    } else {
      setImportStatus({
        type: 'error',
        message: res.error || 'Gagal memproses data.',
      });
    }
  };

  // Filtered List
  const filteredList = portfolioItems.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.shortDescription.toLowerCase().includes(query) ||
      item.businessGoal.toLowerCase().includes(query) ||
      item.technology.some((t) => t.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Top Admin Sub-Header */}
      <section className="bg-[#06152E] text-white border-b border-white/10 pt-10 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase font-bold">
                  SISTEM MANAJEMEN KONTEN // STUDIO ADMIN
                </span>
                <span className="text-[11px] font-mono text-white/50 border border-white/20 px-2 py-0.5">
                  STORAGE: BROWSER + SYNC
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
                Kelola Portofolio Website<span className="text-blue-500">.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-2 leading-relaxed">
                Tambah portofolio karya baru, perbarui deskripsi dan arah desain, atau ekspor data kode secara instan.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/portfolio')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/20"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Lihat Web Publik</span>
              </button>

              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A1F44] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-[#0A1F44]" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/5 p-4 border border-white/10">
              <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">TOTAL PORTOFOLIO</span>
              <span className="text-2xl font-extrabold font-mono text-white">{portfolioItems.length}</span>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">KATEGORI TERDAFTAR</span>
              <span className="text-2xl font-extrabold font-mono text-white">
                {new Set(portfolioItems.map((i) => i.category)).size}
              </span>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">PROYEK LIVE CLIENT</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400">
                {portfolioItems.filter((i) => !i.isPlaceholder).length}
              </span>
            </div>
            <div className="bg-white/5 p-4 border border-white/10">
              <span className="text-[10px] font-mono text-white/60 uppercase block mb-1">STATUS SINKRONISASI</span>
              <span className="text-xs font-mono text-blue-300 font-bold flex items-center gap-1.5 mt-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Aktif & Siap Ditampilkan
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Educational Recommendation Banner (Menjawab pertanyaan user tentang metode update terbaik) */}
      <section className="bg-white border-b border-slate-200 py-4">
        <Container>
          <div className="bg-blue-50/70 border border-blue-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-[#0A1F44] rounded-xs shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0A1F44] tracking-tight">
                  Metode Terbaik untuk Memperbarui Portofolio Anda
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-light mt-0.5">
                  Anda dapat menggunakan halaman admin ini untuk menambah/mengedit portofolio secara instan.
                  Bila Anda ingin agar portofolio baru <span className="font-semibold text-slate-800">permanen di kode website selamanya untuk semua pengunjung</span> saat di-deploy, gunakan tombol <span className="font-semibold text-blue-700">"Salin Kode Data (TypeScript)"</span> di bawah dan tempelkan ke file kode data website.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-800 hover:text-blue-950 uppercase tracking-wider underline whitespace-nowrap"
            >
              <span>{showGuide ? 'Tutup Panduan' : 'Pelajari Detailnya'}</span>
            </button>
          </div>

          {/* Detailed Guide Accordion */}
          {showGuide && (
            <div className="mt-4 p-5 bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-4 animate-fadeIn">
              <h3 className="font-bold text-[#0A1F44] text-base">
                Perbandingan 3 Cara Pengelolaan Portofolio:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#0A1F44] mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    1. Admin UI (Saat ini Aktif)
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Sangat mudah dan tanpa perlu menyentuh kode. Data tersimpan di memori browser Anda dan langsung tampil di halaman depan maupun halaman portfolio.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#0A1F44] mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    2. Ekspor Kode JSON (Paling Permanen)
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Klik tombol "Ekspor Kode", lalu salin teks TypeScript ke <code className="bg-slate-200 px-1 py-0.5 rounded-xs font-mono text-[11px]">src/data/websiteData.ts</code>. Seluruh pengunjung publik akan melihat portofolio baru Anda secara permanen.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <div className="font-bold text-[#0A1F44] mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    3. Cloud Database (Opsional Mendatang)
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    Bila ke depannya ada banyak staf admin yang ingin mengunggah karya dari komputer berbeda tanpa menyentuh kode, database cloud (seperti Firestore/Cloud SQL) dapat dihubungkan kapan saja.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="pt-8">
        {/* Actions Bar: Search, Category Filter & Data Tools */}
        <div className="bg-white p-4 sm:p-6 border border-slate-200 shadow-xs mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama proyek, teknologi, atau kata kunci..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0A1F44] focus:bg-white transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase mr-1 whitespace-nowrap">
              KATEGORI:
            </span>
            {['All', 'Business', 'UMKM', 'Company', 'Portfolio', 'E-Commerce'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
                    : 'bg-slate-50 text-slate-600 hover:text-[#0A1F44] border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Data Utility Buttons */}
          <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0A1F44] text-xs font-bold uppercase tracking-wider border border-slate-300 transition-colors"
              title="Ekspor data kode TypeScript"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Kode</span>
            </button>

            <button
              type="button"
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#0A1F44] text-xs font-bold uppercase tracking-wider border border-slate-300 transition-colors"
              title="Impor dari JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Impor JSON</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Kembalikan seluruh daftar portofolio ke data bawaan awal?')) {
                  resetToDefault();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-200 transition-colors"
              title="Reset ke data awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Form Section: Tambah / Edit Portfolio */}
        {isFormOpen && (
          <div className="bg-white border-2 border-[#0A1F44] p-6 sm:p-8 shadow-xl mb-10 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-bold block">
                  {editingId ? 'FORMULIR EDIT' : 'FORMULIR TAMBAH BARU'}
                </span>
                <h2 className="text-2xl font-extrabold text-[#0A1F44] tracking-tight">
                  {editingId ? `Perbarui Data: ${name || 'Proyek'}` : 'Tambah Portofolio Karya Baru'}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Form Inputs (8 Columns) */}
                <div className="lg:col-span-8 space-y-5">
                  {/* Name & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nama Proyek / Klien <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: PT Surya Tirta Mandiri"
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Kategori Website <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value as PortfolioItem['category'])}
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#0A1F44] transition-colors"
                      >
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label} ({opt.value})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category Sub-label */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Label Tampilan Kategori
                    </label>
                    <input
                      type="text"
                      value={categoryLabel}
                      onChange={(e) => setCategoryLabel(e.target.value)}
                      placeholder="Contoh: Company Profile & Portal Klien"
                      className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44] transition-colors"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Deskripsi Singkat Proyek <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Jelaskan ringkasan website, bidang usaha klien, dan apa yang disajikan dalam website ini..."
                      className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44] transition-colors"
                    />
                  </div>

                  {/* Design Direction & Business Outcome */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Arah Desain (Design Direction)
                      </label>
                      <textarea
                        rows={3}
                        value={designDirection}
                        onChange={(e) => setDesignDirection(e.target.value)}
                        placeholder="Contoh: Tata letak Swiss minimalis, hierarki tipografi tegas, tipografi monokrom..."
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tujuan Hasil Bisnis (Business Outcome)
                      </label>
                      <textarea
                        rows={3}
                        value={businessGoal}
                        onChange={(e) => setBusinessGoal(e.target.value)}
                        placeholder="Contoh: Meningkatkan konversi formulir penawaran B2B dan kredibilitas di hadapan investor..."
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Technology Stack Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Teknologi & Fitur Utama
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={technologyInput}
                        onChange={(e) => setTechnologyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechTag(technologyInput);
                          }
                        }}
                        placeholder="Ketik nama teknologi (misal: Next.js) lalu tekan Tambah"
                        className="flex-1 px-3.5 py-2 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddTechTag(technologyInput)}
                        className="px-4 py-2 bg-slate-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-900"
                      >
                        Tambah Tag
                      </button>
                    </div>

                    {/* Tag Suggestions */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[11px] text-slate-400 self-center mr-1">Rekomendasi:</span>
                      {COMMON_TECH_SUGGESTIONS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddTechTag(tag)}
                          className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>

                    {/* Active Tags */}
                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 min-h-[44px]">
                      {technologyList.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0A1F44] text-white text-xs font-mono"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTechTag(tag)}
                            className="text-white/60 hover:text-white"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Optional URLs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tautan Demo / Live Website (Opsional)
                      </label>
                      <input
                        type="url"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://contoh-klien.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        URL Gambar Screenshot Kustom (Opsional)
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://.../screenshot.jpg"
                        className="w-full px-3.5 py-2.5 border border-slate-300 text-sm focus:outline-none focus:border-[#0A1F44]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Form Column: Visual Settings & Realtime Card Preview (4 Columns) */}
                <div className="lg:col-span-4 bg-slate-50 p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A1F44] mb-4 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#123A73]" />
                      <span>Pengaturan Visual Mockup</span>
                    </h3>

                    {/* Color Accent Picker */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Warna Aksen Visual Header
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {PRESET_COLORS.map((col) => (
                          <button
                            key={col.hex}
                            type="button"
                            onClick={() => setMockupAccent(col.hex)}
                            title={col.name}
                            className={`w-7 h-7 rounded-none border-2 transition-all ${
                              mockupAccent === col.hex ? 'border-blue-600 scale-110 shadow-md' : 'border-white'
                            }`}
                            style={{ backgroundColor: col.hex }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="color"
                          value={mockupAccent}
                          onChange={(e) => setMockupAccent(e.target.value)}
                          className="w-8 h-8 cursor-pointer border border-slate-300 p-0"
                        />
                        <span className="font-mono text-xs text-slate-600 uppercase">{mockupAccent}</span>
                      </div>
                    </div>

                    {/* Preview Type Radio */}
                    <div className="mb-5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Gaya Mockup
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewType('mockup')}
                          className={`py-2 px-3 text-xs font-bold uppercase tracking-wider border ${
                            previewType === 'mockup'
                              ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          Browser Frame
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewType('interface')}
                          className={`py-2 px-3 text-xs font-bold uppercase tracking-wider border ${
                            previewType === 'interface'
                              ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          Interface Canvas
                        </button>
                      </div>
                    </div>

                    {/* Is Placeholder Switch */}
                    <div className="mb-6 p-3.5 bg-white border border-slate-200">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isPlaceholder}
                          onChange={(e) => setIsPlaceholder(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-[#0A1F44] focus:ring-0"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            Tandai sebagai "Project Preview"
                          </span>
                          <span className="text-[11px] text-slate-500 font-light leading-snug block mt-0.5">
                            Centang jika proyek merupakan eksplorasi konseptual/desain showcase. Hilangkan centang jika ini adalah klien langsung yang telah go-live.
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* Live Miniature Card Preview */}
                    <div>
                      <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mb-2">
                        PRATINJAU KARTU LANGSUNG:
                      </div>
                      <div className="border border-slate-300 bg-white shadow-xs overflow-hidden">
                        <div
                          className="h-28 p-3 flex flex-col justify-between text-white relative overflow-hidden"
                          style={{ backgroundColor: mockupAccent }}
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono opacity-75">
                            <span>00 // {category.toUpperCase()}</span>
                            <span>{isPlaceholder ? 'PREVIEW' : 'LIVE'}</span>
                          </div>
                          <div className="text-sm font-extrabold truncate">{name || 'Nama Proyek Anda'}</div>
                        </div>
                        <div className="p-3">
                          <div className="text-[10px] font-mono text-blue-700 uppercase font-bold mb-1">
                            {categoryLabel || 'Kategori'}
                          </div>
                          <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {shortDescription || 'Deskripsi singkat portofolio akan muncul di sini...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      className="flex-1 bg-[#0A1F44] hover:bg-[#123A73] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all text-center"
                    >
                      {editingId ? 'Simpan Perubahan' : 'Terbitkan Portofolio'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors text-center"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Portfolio Items Directory (Table & Grid View) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#0A1F44] tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#123A73]" />
              <span>Daftar Portofolio ({filteredList.length} Proyek)</span>
            </h2>
            <div className="text-xs text-slate-500 font-mono">
              Menampilkan {filteredList.length} dari total {portfolioItems.length} proyek
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="bg-white p-12 text-center border border-slate-200">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Tidak ada portofolio yang cocok</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau ganti filter kategori di bagian atas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-slate-100 text-xs font-bold uppercase text-slate-700 hover:bg-slate-200"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredList.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-[#0A1F44] transition-all flex flex-col justify-between group shadow-2xs"
                >
                  {/* Card Visual Header */}
                  <div>
                    <div
                      className="h-44 p-4 flex flex-col justify-between text-white relative overflow-hidden transition-colors"
                      style={{ backgroundColor: item.mockupAccent || '#06152E' }}
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/80 relative z-10">
                        <span className="px-1.5 py-0.5 bg-black/30 backdrop-blur-xs">
                          {String(index + 1).padStart(2, '0')} // {item.category}
                        </span>
                        <span className="px-1.5 py-0.5 bg-white/20 uppercase font-bold text-[9px]">
                          {item.isPlaceholder ? 'PREVIEW' : 'CLIENT'}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-extrabold text-white tracking-tight line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="text-[11px] font-mono text-white/70 truncate">
                          {item.categoryLabel}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {item.shortDescription}
                      </p>

                      <div className="p-2.5 bg-slate-50 border border-slate-200 text-xs mb-4">
                        <span className="font-bold text-[#0A1F44] block mb-0.5">Tujuan Bisnis:</span>
                        <span className="text-slate-600 line-clamp-2 font-light">{item.businessGoal}</span>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.technology.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technology.length > 3 && (
                          <span className="text-[10px] font-mono bg-slate-50 text-slate-400 px-1.5 py-0.5">
                            +{item.technology.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 pt-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewModalItem(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0A1F44] uppercase tracking-wider py-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 bg-white border border-slate-300 text-slate-700 hover:text-[#0A1F44] hover:border-[#0A1F44] transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus portofolio "${item.name}"?`)) {
                            deleteProject(item.id);
                          }
                        }}
                        className="p-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* MODAL 1: Ekspor Kode TypeScript */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white border border-[#0A1F44] max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-fadeIn">
            <div className="p-4 sm:p-5 bg-[#06152E] text-white flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                  PERMANENT CODE SYNC // TYPESCRIPT
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  Ekspor Data Portofolio untuk File Kode
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="p-3 bg-blue-50 border border-blue-200 text-slate-700 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#0A1F44] block">Cara Membuat Data Permanen:</span>
                  Salin kode di bawah ini lalu gantikan isi <code className="bg-blue-100 px-1 py-0.5 rounded-xs font-mono font-bold">export const PORTFOLIO_DATA</code> di dalam file <code className="font-mono text-[11px] bg-white px-1 border">src/data/websiteData.ts</code>. Dengan begitu, seluruh pengunjung publik akan melihat portofolio Anda secara permanen!
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-emerald-300 font-mono text-[11px] sm:text-xs overflow-x-auto max-h-80 border border-slate-700">
                  {exportCodeSnippet()}
                </pre>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-white text-[#0A1F44] text-xs font-bold uppercase tracking-wider hover:bg-slate-100 shadow-md flex items-center gap-1.5"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="px-5 py-2.5 bg-[#0A1F44] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123A73]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Impor Data JSON */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white border border-[#0A1F44] max-w-2xl w-full shadow-2xl animate-fadeIn">
            <div className="p-4 sm:p-5 bg-[#06152E] text-white flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold block">
                  DATA INGESTION // JSON
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  Impor Portofolio dari JSON / Kode
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleImportSubmit} className="p-5 sm:p-6 space-y-4">
              <p className="text-xs text-slate-600">
                Tempelkan array JSON portofolio atau potongan kode data portofolio di bawah ini. Format akan otomatis diselaraskan.
              </p>

              <textarea
                rows={8}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[ { "name": "Nama Proyek", "category": "Business", ... } ]'
                className="w-full p-3 font-mono text-xs border border-slate-300 focus:outline-none focus:border-[#0A1F44]"
              />

              {importStatus && (
                <div
                  className={`p-3 text-xs flex items-center gap-2 border ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {importStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{importStatus.message}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-bold uppercase text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0A1F44] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123A73]"
                >
                  Proses Impor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Detail Modal Preview (Sama persis seperti di halaman Portfolio publik) */}
      {previewModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-[#0A1F44] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-[#06152E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-white/10 z-10">
              <div>
                <div className="text-[11px] font-mono text-white/60 uppercase">
                  SPESIFIKASI PROYEK // {previewModalItem.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                  {previewModalItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalItem(null)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-3 bg-[#F5F7FA] border-l-4 border-[#0A1F44] text-xs sm:text-sm text-[#0B1220]">
                <span className="font-bold">Kategori:</span> {previewModalItem.categoryLabel}
                <span className="block text-[#64748B] mt-0.5">
                  Status: {previewModalItem.isPlaceholder ? 'Project Preview — Placeholder' : 'Live Client Project'}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Deskripsi & Konteks Kebutuhan
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                  {previewModalItem.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Arah Desain (Design Direction)
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed p-4 bg-slate-50 border border-slate-200">
                  {previewModalItem.designDirection}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Tujuan Hasil Bisnis (Business Outcome)
                </h4>
                <p className="text-sm sm:text-base text-[#0A1F44] font-medium leading-relaxed">
                  {previewModalItem.businessGoal}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                  Komponen Arsitektur & Teknologi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {previewModalItem.technology.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#0A1F44] text-white text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {previewModalItem.liveUrl && (
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] mb-2">
                    Tautan Live Demo
                  </h4>
                  <a
                    href={previewModalItem.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-700 font-bold hover:underline"
                  >
                    <span>{previewModalItem.liveUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewModalItem(null)}
                  className="px-6 py-3 bg-[#0A1F44] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#123A73]"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
