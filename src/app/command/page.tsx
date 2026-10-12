"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  project_tier?: string;
  project_scope: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'ARCHIVED';
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  status: string;
  badge: string;
  image: string;
  tagline?: string;
  description?: string;
  stack?: string;
  access?: string;
  price_tag?: string;
  url: string;
  sort_order?: number;
}

interface TactileItem {
  id: string;
  name: string;
  status: string;
  badge: string;
  price_tag: string;
  image: string;
  description?: string;
  materials?: string;
  url: string;
  sort_order?: number;
}

interface SystemProject {
  id: string;
  name: string;
  category: string;
  url: string;
  display_url?: string;
  type_badge?: string;
  metric1_label?: string;
  metric1_value?: string;
  metric1_sub?: string;
  metric2_label?: string;
  metric2_value?: string;
  metric2_sub?: string;
  deliverables?: string[];
  sort_order?: number;
}

export default function CommandPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [accessKey, setAccessKey] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // Active Tab: 'inbox' | 'products' | 'goods' | 'systems' | 'channels'
  const [activeTab, setActiveTab] = useState<'inbox' | 'products' | 'goods' | 'systems' | 'channels'>('inbox');

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState<boolean>(false);
  const [inquirySearch, setInquirySearch] = useState<string>('');
  const [inquiryFilter, setInquiryFilter] = useState<string>('ALL');

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsTableMissing, setProductsTableMissing] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Goods State
  const [goods, setGoods] = useState<TactileItem[]>([]);
  const [goodsLoading, setGoodsLoading] = useState<boolean>(false);
  const [goodsTableMissing, setGoodsTableMissing] = useState<boolean>(false);
  const [editingGoods, setEditingGoods] = useState<TactileItem | null>(null);
  const [isGoodsModalOpen, setIsGoodsModalOpen] = useState<boolean>(false);

  // Projects State
  const [projects, setProjects] = useState<SystemProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);
  const [projectsTableMissing, setProjectsTableMissing] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<SystemProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Check auth on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
      if (data.authenticated) {
        fetchAllData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) {
      setAuthError('Master Passphrase is required.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: accessKey.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAccessKey('');
        fetchAllData();
        showToast('CLEARANCE GRANTED // Welcome to Studio Command.');
      } else {
        setAuthError(data.error || 'Access denied. Invalid Passphrase.');
      }
    } catch {
      setAuthError('Connection error. Verify server is online.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    showToast('TERMINAL LOCKED // Session ended.');
  };

  const fetchAllData = () => {
    fetchInquiries();
    fetchProducts();
    fetchGoods();
    fetchProjects();
  };

  // INQUIRIES
  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
        showToast(`Inquiry marked as ${status}`);
      }
    } catch {
      showToast('Error updating inquiry status');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Permanently delete this inquiry from studio records?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showToast('Inquiry permanently removed');
      }
    } catch {
      showToast('Error deleting inquiry');
    }
  };

  // PRODUCTS
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setProductsTableMissing(Boolean(data.tableMissing));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      id: editingProduct?.id,
      name: formData.get('name') as string,
      status: formData.get('status') as string,
      badge: formData.get('badge') as string,
      image: formData.get('image') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string,
      stack: formData.get('stack') as string,
      access: formData.get('access') as string,
      price_tag: formData.get('price_tag') as string,
      url: formData.get('url') as string,
      sort_order: Number(formData.get('sort_order') || 0),
    };

    try {
      const isEdit = Boolean(editingProduct?.id);
      const res = await fetch('/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
        showToast(isEdit ? 'Product updated successfully' : 'Product created successfully');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save product');
      }
    } catch {
      alert('Error communicating with database');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product from studio inventory?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast('Product removed');
      }
    } catch {
      showToast('Error deleting product');
    }
  };

  // GOODS
  const fetchGoods = async () => {
    setGoodsLoading(true);
    try {
      const res = await fetch('/api/admin/goods');
      if (res.ok) {
        const data = await res.json();
        setGoods(data.goods || []);
        setGoodsTableMissing(Boolean(data.tableMissing));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGoodsLoading(false);
    }
  };

  const handleSaveGoods = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      id: editingGoods?.id,
      name: formData.get('name') as string,
      status: formData.get('status') as string,
      badge: formData.get('badge') as string,
      price_tag: formData.get('price_tag') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      materials: formData.get('materials') as string,
      url: formData.get('url') as string,
      sort_order: Number(formData.get('sort_order') || 0),
    };

    try {
      const isEdit = Boolean(editingGoods?.id);
      const res = await fetch('/api/admin/goods', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsGoodsModalOpen(false);
        setEditingGoods(null);
        fetchGoods();
        showToast(isEdit ? 'Capsule item updated' : 'Capsule item created');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save goods item');
      }
    } catch {
      alert('Error communicating with database');
    }
  };

  const handleDeleteGoods = async (id: string) => {
    if (!confirm('Delete this tactile goods item from inventory?')) return;
    try {
      const res = await fetch(`/api/admin/goods?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGoods((prev) => prev.filter((g) => g.id !== id));
        showToast('Capsule item deleted');
      }
    } catch {
      showToast('Error deleting capsule item');
    }
  };

  // PROJECTS
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
        setProjectsTableMissing(Boolean(data.tableMissing));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const deliverablesRaw = (formData.get('deliverables') as string) || '';
    const deliverables = deliverablesRaw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      id: editingProject?.id,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      url: formData.get('url') as string,
      display_url: formData.get('display_url') as string,
      type_badge: formData.get('type_badge') as string,
      metric1_label: formData.get('metric1_label') as string,
      metric1_value: formData.get('metric1_value') as string,
      metric1_sub: formData.get('metric1_sub') as string,
      metric2_label: formData.get('metric2_label') as string,
      metric2_value: formData.get('metric2_value') as string,
      metric2_sub: formData.get('metric2_sub') as string,
      deliverables,
      sort_order: Number(formData.get('sort_order') || 0),
    };

    try {
      const isEdit = Boolean(editingProject?.id);
      const res = await fetch('/api/admin/projects', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsProjectModalOpen(false);
        setEditingProject(null);
        fetchProjects();
        showToast(isEdit ? 'Project updated' : 'Project added to portfolio');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save project');
      }
    } catch {
      alert('Error communicating with database');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Remove this project from systems portfolio?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast('Project removed');
      }
    } catch {
      showToast('Error removing project');
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter =
      inquiryFilter === 'ALL' || inq.status === inquiryFilter;
    const q = inquirySearch.toLowerCase();
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.project_scope && inq.project_scope.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'NEW').length;

  // 1. Initial Loading State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full bg-[#152319] flex items-center justify-center text-[#E5E7EB] font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs tracking-widest text-[#D4AF37]">// VERIFYING STUDIO CLEARANCE...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#152319] text-[#E5E7EB] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none font-sans">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="relative h-12 w-28">
              <Image src="/logo.png" alt="[ALN] Logo" fill className="object-contain" priority />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#D4AF37] bg-black/40 px-3 py-1 rounded-full border border-[#D4AF37]/30 uppercase mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                RESTRICTED TERMINAL // HQ TANGIER
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#E5E7EB]">
                STUDIO COMMAND CENTER
              </h1>
              <p className="text-xs text-[#E5E7EB]/60 font-mono mt-1">
                ENTER MASTER ACCESS PASSPHRASE
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                Master Security Key / Passphrase
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="aln_studio_tangier_••••"
                className="w-full bg-[#152319] border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]/30 font-mono outline-none transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-mono flex items-center gap-2">
                <span>⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-[#152319] border-t-transparent rounded-full animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>[ UNLOCK COMMAND CENTER ]</span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-[11px] font-mono text-[#E5E7EB]/50 hover:text-[#D4AF37] transition-colors"
            >
              ← RETURN TO PUBLIC SITE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Studio Command Center
  return (
    <div className="min-h-screen w-full bg-[#152319] text-[#E5E7EB] font-sans selection:bg-[#D4AF37] selection:text-[#1B291F]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B291F] border border-[#D4AF37] text-[#D4AF37] px-5 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-3 animate-bounce">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-40 bg-[#1B291F]/95 backdrop-blur-md border-b border-[#D4AF37]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-7 w-20">
              <Image src="/logo.png" alt="[ALN] Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-mono text-xs font-extrabold tracking-widest text-[#E5E7EB]">
                STUDIO COMMAND <span className="text-[#D4AF37]">v2.4</span>
              </span>
              <span className="font-mono text-[9px] text-[#D4AF37]">
                TANGIER HQ // 35.7595° N, 5.8340° W
              </span>
            </div>
          </Link>
        </div>

        {/* Action Deck & Session Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#E5E7EB]/80 hover:text-[#D4AF37] bg-black/30 border border-white/10 hover:border-[#D4AF37]/40 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>LIVE SITE</span>
            <span>↗</span>
          </Link>

          <button
            onClick={fetchAllData}
            className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#E5E7EB]/80 hover:text-[#D4AF37] bg-black/30 border border-white/10 hover:border-[#D4AF37]/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            title="Refresh All Data"
          >
            <span>SYNC</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>LOCK</span>
          </button>
        </div>
      </header>

      {/* Main Command Workspace */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-[#D4AF37] text-[#152319] shadow-lg'
                : 'bg-[#1B291F] text-[#E5E7EB]/70 hover:text-white hover:bg-[#243528]'
            }`}
          >
            <span>01 // INBOX</span>
            {newInquiriesCount > 0 && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeTab === 'inbox'
                    ? 'bg-[#152319] text-[#D4AF37]'
                    : 'bg-[#D4AF37] text-[#152319]'
                }`}
              >
                {newInquiriesCount} NEW
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#D4AF37] text-[#152319] shadow-lg'
                : 'bg-[#1B291F] text-[#E5E7EB]/70 hover:text-white hover:bg-[#243528]'
            }`}
          >
            <span>02 // DIGITAL PRODUCTS</span>
            <span className="text-[10px] opacity-70">({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('goods')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'goods'
                ? 'bg-[#D4AF37] text-[#152319] shadow-lg'
                : 'bg-[#1B291F] text-[#E5E7EB]/70 hover:text-white hover:bg-[#243528]'
            }`}
          >
            <span>03 // TACTILE GOODS</span>
            <span className="text-[10px] opacity-70">({goods.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('systems')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'systems'
                ? 'bg-[#D4AF37] text-[#152319] shadow-lg'
                : 'bg-[#1B291F] text-[#E5E7EB]/70 hover:text-white hover:bg-[#243528]'
            }`}
          >
            <span>04 // SYSTEMS PORTFOLIO</span>
            <span className="text-[10px] opacity-70">({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'channels'
                ? 'bg-[#D4AF37] text-[#152319] shadow-lg'
                : 'bg-[#1B291F] text-[#E5E7EB]/70 hover:text-white hover:bg-[#243528]'
            }`}
          >
            <span>05 // CHANNELS & DB</span>
          </button>
        </div>

        {/* TAB 1: INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#1B291F] p-4 rounded-2xl border border-white/10">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search inquiries by client name, email, company, scope..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] placeholder-[#E5E7EB]/40 font-mono outline-none"
                />
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px] overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'NEW', 'CONTACTED', 'ARCHIVED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                      inquiryFilter === st
                        ? 'bg-[#D4AF37] text-[#152319]'
                        : 'bg-[#152319] text-[#E5E7EB]/60 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries List */}
            {inquiriesLoading ? (
              <div className="p-12 text-center text-xs font-mono text-[#D4AF37]">
                SYNCING CLIENT INQUIRIES FROM SUPABASE...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-[#1B291F]/60 border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-2">
                <p className="font-mono text-sm text-[#E5E7EB]/60">NO INQUIRIES FOUND</p>
                <p className="text-xs text-[#E5E7EB]/40 font-mono">
                  {inquirySearch ? 'Try clearing your search query' : 'New inquiries from the website contact form will appear here in real time.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-[#1B291F] border rounded-2xl p-6 transition-all space-y-4 ${
                      inq.status === 'NEW'
                        ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : 'border-white/10 opacity-90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-base text-[#E5E7EB]">
                          {inq.name}
                        </span>
                        {inq.company && (
                          <span className="font-mono text-[10px] text-[#D4AF37] bg-[#152319] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                            {inq.company}
                          </span>
                        )}
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            inq.status === 'NEW'
                              ? 'bg-[#D4AF37] text-[#152319]'
                              : inq.status === 'CONTACTED'
                              ? 'bg-blue-900/60 text-blue-200 border border-blue-400/40'
                              : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <span className="font-mono text-[11px] text-[#E5E7EB]/40">
                        {new Date(inq.created_at).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Metadata Strip */}
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#E5E7EB]/70">
                      <div>
                        <span className="text-[#D4AF37]">EMAIL: </span>
                        <a
                          href={`mailto:${inq.email}?subject=ALL%20IN%20Studio%20//%20Follow-up%20on%20your%20Inquiry`}
                          className="hover:underline text-white font-semibold"
                        >
                          {inq.email}
                        </a>
                      </div>

                      {inq.phone && (
                        <div>
                          <span className="text-[#D4AF37]">TEL / WA: </span>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-white"
                          >
                            {inq.phone}
                          </a>
                        </div>
                      )}

                      {inq.service_interest && (
                        <div>
                          <span className="text-[#D4AF37]">SERVICE: </span>
                          <span className="text-white">{inq.service_interest}</span>
                        </div>
                      )}

                      {inq.project_tier && (
                        <div>
                          <span className="text-[#D4AF37]">BUDGET TIER: </span>
                          <span className="text-white">{inq.project_tier}</span>
                        </div>
                      )}
                    </div>

                    {/* Scope / Message Body */}
                    <div className="bg-[#152319] p-4 rounded-xl border border-white/5 font-sans text-xs sm:text-sm text-[#E5E7EB]/90 leading-relaxed whitespace-pre-wrap">
                      {inq.project_scope}
                    </div>

                    {/* Action Deck */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-xs text-[#E5E7EB]/50">STATUS:</span>
                        {(['NEW', 'CONTACTED', 'ARCHIVED'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateInquiryStatus(inq.id, st)}
                            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                              inq.status === st
                                ? 'bg-[#D4AF37] text-[#152319] font-bold'
                                : 'bg-[#152319] text-[#E5E7EB]/60 hover:text-white border border-white/5'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${inq.email}?subject=ALL%20IN%20Studio%20//%20Follow-up%20on%20your%20Inquiry`}
                          className="font-mono text-xs font-bold bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>REPLY VIA MAIL</span>
                          <span>✉</span>
                        </a>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="font-mono text-xs font-bold text-red-400 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 border border-red-500/20 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1B291F] p-4 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-base font-bold text-[#E5E7EB]">
                  DIGITAL RELEASE LAB & MULTIDISCIPLINARY REPOSITORY
                </h2>
                <p className="text-xs text-[#E5E7EB]/60 font-mono">
                  Manage books, indie games, wallpapers, asset packs, software tools, and digital templates dispatched via Gumroad.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>+ ADD DIGITAL PRODUCT</span>
              </button>
            </div>

            {productsTableMissing && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] space-y-1">
                <p className="font-bold">⚠️ Supabase Table `studio_products` not created yet.</p>
                <p className="text-[#E5E7EB]/70">
                  Go to tab <button onClick={() => setActiveTab('channels')} className="underline text-[#D4AF37] font-bold">04 // CHANNELS & DB</button> and copy the SQL schema script to execute in Supabase SQL Editor.
                </p>
              </div>
            )}

            {productsLoading ? (
              <div className="p-12 text-center text-xs font-mono text-[#D4AF37]">
                LOADING STUDIO PRODUCTS...
              </div>
            ) : products.length === 0 ? (
              <div className="bg-[#1B291F]/60 border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-3">
                <p className="font-mono text-sm text-[#E5E7EB]/60">NO PRODUCTS IN DATABASE</p>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="font-mono text-xs bg-[#D4AF37] text-[#152319] px-4 py-2 rounded-lg font-bold"
                >
                  Create First Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1B291F] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Thumbnail */}
                      <div className="relative w-full h-48 bg-[#152319] overflow-hidden border-b border-white/10">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized={p.image.startsWith('http')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-white/30">
                            NO THUMBNAIL
                          </div>
                        )}
                        <span className="absolute top-3 left-3 font-mono text-[9px] font-bold bg-black/80 text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                          {p.badge || 'PRODUCT'}
                        </span>
                        {p.price_tag && (
                          <span className="absolute top-3 right-3 font-mono text-[10px] font-extrabold bg-[#D4AF37] text-[#152319] px-2.5 py-1 rounded-full">
                            {p.price_tag}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <h3 className="font-extrabold text-base text-[#E5E7EB]">
                          {p.name}
                        </h3>
                        {p.tagline && (
                          <p className="text-xs text-[#D4AF37] font-mono line-clamp-1">
                            {p.tagline}
                          </p>
                        )}
                        {p.description && (
                          <p className="text-xs text-[#E5E7EB]/70 font-sans line-clamp-2">
                            {p.description}
                          </p>
                        )}
                        {p.stack && (
                          <div className="pt-2 font-mono text-[10px] text-[#E5E7EB]/50">
                            STACK: {p.stack}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-4">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1"
                      >
                        <span>VIEW ON GUMROAD</span>
                        <span>↗</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsProductModalOpen(true);
                          }}
                          className="font-mono text-[11px] font-bold bg-[#152319] hover:bg-[#243528] text-white px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="font-mono text-[11px] font-bold text-red-400 hover:text-red-200 bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-500/20 cursor-pointer"
                        >
                          DEL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TACTILE GOODS */}
        {activeTab === 'goods' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1B291F] p-4 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-base font-bold text-[#E5E7EB]">
                  TACTILE GOODS & CAPSULE APPAREL
                </h2>
                <p className="text-xs text-[#E5E7EB]/60 font-mono">
                  Physical garments, machined hardware artifacts, and limited capsule drops linked to your Etsy boutique.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingGoods(null);
                  setIsGoodsModalOpen(true);
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>+ ADD CAPSULE DROP</span>
              </button>
            </div>

            {goodsTableMissing && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] space-y-1">
                <p className="font-bold">⚠️ Supabase Table `studio_goods` not created yet.</p>
                <p className="text-[#E5E7EB]/70">
                  Go to tab <button onClick={() => setActiveTab('channels')} className="underline text-[#D4AF37] font-bold">05 // CHANNELS & DB</button> and copy the SQL schema script to execute in Supabase SQL Editor.
                </p>
              </div>
            )}

            {goodsLoading ? (
              <div className="p-12 text-center text-xs font-mono text-[#D4AF37]">
                LOADING STUDIO CAPSULES...
              </div>
            ) : goods.length === 0 ? (
              <div className="bg-[#1B291F]/60 border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-3">
                <p className="font-mono text-sm text-[#E5E7EB]/60">NO CAPSULE DROPS IN DATABASE</p>
                <button
                  onClick={() => {
                    setEditingGoods(null);
                    setIsGoodsModalOpen(true);
                  }}
                  className="font-mono text-xs bg-[#D4AF37] text-[#152319] px-4 py-2 rounded-lg font-bold"
                >
                  Create First Capsule Drop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goods.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1B291F] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative w-full h-52 bg-[#152319] overflow-hidden border-b border-white/10">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized={item.image.startsWith('http')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-white/30">
                            NO IMAGE
                          </div>
                        )}
                        <span className="absolute top-3 left-3 font-mono text-[9px] font-bold bg-black/80 text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                          {item.badge || 'CAPSULE DROP'}
                        </span>
                        {item.price_tag && (
                          <span className="absolute top-3 right-3 font-mono text-[10px] font-extrabold bg-[#D4AF37] text-[#152319] px-2.5 py-1 rounded-full">
                            {item.price_tag}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-extrabold text-base text-[#E5E7EB] line-clamp-1">
                            {item.name}
                          </h3>
                        </div>

                        <span className="inline-block font-mono text-[10px] text-emerald-400 bg-[#152319] px-2 py-0.5 rounded border border-emerald-500/20">
                          {item.status}
                        </span>

                        {item.materials && (
                          <p className="text-[11px] text-[#D4AF37] font-mono line-clamp-1">
                            {item.materials}
                          </p>
                        )}

                        {item.description && (
                          <p className="text-xs text-[#E5E7EB]/70 font-sans line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1"
                      >
                        <span>VIEW ON ETSY</span>
                        <span>↗</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingGoods(item);
                            setIsGoodsModalOpen(true);
                          }}
                          className="font-mono text-[11px] font-bold bg-[#152319] hover:bg-[#243528] text-white px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDeleteGoods(item.id)}
                          className="font-mono text-[11px] font-bold text-red-400 hover:text-red-200 bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-500/20 cursor-pointer"
                        >
                          DEL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SYSTEMS */}
        {activeTab === 'systems' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1B291F] p-4 rounded-2xl border border-white/10">
              <div>
                <h2 className="text-base font-bold text-[#E5E7EB]">
                  SYSTEMS & LIVE PORTFOLIO PLATFORMS
                </h2>
                <p className="text-xs text-[#E5E7EB]/60 font-mono">
                  Client case studies and bespoke web architectures shown on the /systems showcase and landing page.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>+ ADD SYSTEMS PROJECT</span>
              </button>
            </div>

            {projectsTableMissing && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] space-y-1">
                <p className="font-bold">⚠️ Supabase Table `studio_projects` not created yet.</p>
                <p className="text-[#E5E7EB]/70">
                  Go to tab <button onClick={() => setActiveTab('channels')} className="underline text-[#D4AF37] font-bold">04 // CHANNELS & DB</button> to copy and execute the SQL migration script in Supabase.
                </p>
              </div>
            )}

            {projectsLoading ? (
              <div className="p-12 text-center text-xs font-mono text-[#D4AF37]">
                LOADING SYSTEMS PORTFOLIO...
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-[#1B291F]/60 border border-dashed border-white/10 rounded-2xl p-12 text-center space-y-3">
                <p className="font-mono text-sm text-[#E5E7EB]/60">NO PORTFOLIO PROJECTS IN DATABASE</p>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setIsProjectModalOpen(true);
                  }}
                  className="font-mono text-xs bg-[#D4AF37] text-[#152319] px-4 py-2 rounded-lg font-bold"
                >
                  Create First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#1B291F] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-[#D4AF37] bg-black/40 px-2.5 py-1 rounded-full border border-[#D4AF37]/30 uppercase">
                          {proj.type_badge || proj.category}
                        </span>
                        <h3 className="font-bold text-lg text-[#E5E7EB] mt-2">
                          {proj.name}
                        </h3>
                      </div>

                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#D4AF37] hover:underline shrink-0"
                      >
                        {proj.display_url || 'LIVE BUILD ↗'}
                      </a>
                    </div>

                    {/* Metrics preview */}
                    <div className="grid grid-cols-2 gap-3 bg-[#152319] p-3 rounded-xl border border-white/5 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#E5E7EB]/50 block">
                          {proj.metric1_label || 'METRIC 1'}
                        </span>
                        <span className="text-[#D4AF37] font-bold text-sm">
                          {proj.metric1_value || '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#E5E7EB]/50 block">
                          {proj.metric2_label || 'METRIC 2'}
                        </span>
                        <span className="text-[#D4AF37] font-bold text-sm">
                          {proj.metric2_value || '—'}
                        </span>
                      </div>
                    </div>

                    {/* Deliverables tags */}
                    {proj.deliverables && proj.deliverables.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.deliverables.slice(0, 3).map((d, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] text-[#E5E7EB]/70 bg-white/5 px-2 py-0.5 rounded-md"
                          >
                            • {d}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsProjectModalOpen(true);
                        }}
                        className="font-mono text-xs font-bold bg-[#152319] hover:bg-[#243528] text-white px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="font-mono text-xs font-bold text-red-400 hover:text-red-200 bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-500/20 cursor-pointer"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CHANNELS & DB */}
        {activeTab === 'channels' && (
          <div className="space-y-8">
            {/* External Channel Links */}
            <div className="bg-[#1B291F] border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#E5E7EB] flex items-center gap-2">
                <span>ESTABLISHED STUDIO CHANNELS</span>
                <span className="font-mono text-[10px] text-[#D4AF37] bg-black/40 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  MONITORED
                </span>
              </h2>
              <p className="text-xs text-[#E5E7EB]/60 font-mono">
                Direct external shopfronts where client transactions and checkout streams operate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#152319] p-5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      01 // GUMROAD STORE
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      ACTIVE (2 PRODUCTS)
                    </span>
                  </div>
                  <a
                    href="https://chillguystore.gumroad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white hover:text-[#D4AF37] break-all block"
                  >
                    https://chillguystore.gumroad.com ↗
                  </a>
                  <p className="text-[11px] text-[#E5E7EB]/60">
                    Host for digital downloads, landing page templates, and design vectors.
                  </p>
                </div>

                <div className="bg-[#152319] p-5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      02 // ETSY BOUTIQUE
                    </span>
                    <span className="font-mono text-[10px] text-amber-300 font-bold">
                      STOREFRONT CONNECTED
                    </span>
                  </div>
                  <a
                    href="https://chillguyso.etsy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-white hover:text-[#D4AF37] break-all block"
                  >
                    https://chillguyso.etsy.com ↗
                  </a>
                  <p className="text-[11px] text-[#E5E7EB]/60">
                    Host for future limited-run tactile apparel capsules and artisanal goods.
                  </p>
                </div>
              </div>
            </div>

            {/* Supabase SQL Migration Script Copier */}
            <div className="bg-[#1B291F] border border-[#D4AF37]/30 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#E5E7EB] flex items-center gap-2">
                    <span>SUPABASE SQL SCHEMA & INITIAL SEED</span>
                  </h3>
                  <p className="text-xs text-[#E5E7EB]/60 font-mono mt-1">
                    Execute this SQL script once in Supabase SQL Editor to initialize `studio_products` and `studio_projects` tables.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/admin/schema-sql');
                      const data = await res.json();
                      if (data.sql) {
                        await navigator.clipboard.writeText(data.sql);
                        showToast('SQL SCHEMA COPIED TO CLIPBOARD');
                      } else {
                        // Fallback copy
                        await navigator.clipboard.writeText(`-- Run schema.sql from the project repo.`);
                        showToast('SQL Copied');
                      }
                    } catch {
                      showToast('Could not access clipboard');
                    }
                  }}
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
                >
                  [ COPY SQL SCHEMA ]
                </button>
              </div>

              <div className="bg-[#152319] p-4 rounded-xl border border-white/5 font-mono text-[11px] text-[#E5E7EB]/70 max-h-48 overflow-y-auto space-y-2">
                <p className="text-[#D4AF37]">// Quick Steps to initialize in Supabase:</p>
                <p>1. Open your Supabase Dashboard: <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline">supabase.com/dashboard</a></p>
                <p>2. Select project `ccbgsanikzwcwodzoybt`</p>
                <p>3. Go to the <b>SQL Editor</b> in the left sidebar</p>
                <p>4. Paste the schema from `supabase/schema.sql` and click <b>RUN</b></p>
                <p>5. Return to this Command Center and click <b>SYNC</b></p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT MODAL (ADD / EDIT) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-[#E5E7EB]">
                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW DIGITAL PRODUCT'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-white/50 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Product Title *
                </label>
                <input
                  name="name"
                  defaultValue={editingProduct?.name || ''}
                  required
                  placeholder="e.g. THE MULTIDISCIPLINARY LAB, GRID SHIFTER, 6K WALLPAPERS"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Category Badge *
                  </label>
                  <input
                    name="badge"
                    id="product-badge-input"
                    defaultValue={editingProduct?.badge || 'UTILITY'}
                    placeholder="e.g. BOOK, GAME, WALLPAPER, ASSET PACK, UTILITY, SOFTWARE"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['BOOK', 'GAME', 'WALLPAPER', 'ASSET PACK', 'UTILITY', 'SOFTWARE'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={(e) => {
                          const input = (e.currentTarget.closest('div')?.previousElementSibling as HTMLInputElement);
                          if (input) input.value = cat;
                        }}
                        className="text-[9px] font-mono bg-black/40 hover:bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30 transition-colors"
                      >
                        +{cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Price Tag
                  </label>
                  <input
                    name="price_tag"
                    defaultValue={editingProduct?.price_tag || '$10.00'}
                    placeholder="e.g. $10.00, $15.00, FREE"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Gumroad / Product URL *
                </label>
                <input
                  name="url"
                  defaultValue={editingProduct?.url || ''}
                  required
                  placeholder="https://chillguystore.gumroad.com/l/..."
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Thumbnail Image URL *
                </label>
                <input
                  name="image"
                  defaultValue={editingProduct?.image || ''}
                  required
                  placeholder="https://public-files.gumroad.com/... or /DigitalProducts.jfif"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  One-Sentence Payoff (Tagline)
                </label>
                <input
                  name="tagline"
                  defaultValue={editingProduct?.tagline || ''}
                  placeholder="e.g. Field Guide to Independent Creative Technology & Digital Craft"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-sans outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingProduct?.description || ''}
                  rows={3}
                  placeholder="Overview of digital product contents, formats, and deliverables..."
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-sans outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Format / Engine / Stack
                  </label>
                  <input
                    name="stack"
                    defaultValue={editingProduct?.stack || ''}
                    placeholder="e.g. PDF + ePub, HTML5 Canvas, 6K PNGs, Vector SVG"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={editingProduct?.sort_order ?? 0}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-mono text-xs text-[#E5E7EB]/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SYSTEMS PROJECT MODAL (ADD / EDIT) */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-[#E5E7EB]">
                {editingProject ? 'EDIT SYSTEMS PROJECT' : 'ADD NEW SYSTEMS PROJECT'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-white/50 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Project Title *
                </label>
                <input
                  name="name"
                  defaultValue={editingProject?.name || ''}
                  required
                  placeholder="e.g. RihlatBladna — Direct Moroccan Travel Network"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProject?.category || 'saas'}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  >
                    <option value="marketplace">marketplace</option>
                    <option value="saas">saas</option>
                    <option value="ecommerce">ecommerce</option>
                    <option value="interactive">interactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Type Badge
                  </label>
                  <input
                    name="type_badge"
                    defaultValue={editingProject?.type_badge || 'FEATURED LIVE BUILD // SAAS'}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Live URL *
                  </label>
                  <input
                    name="url"
                    defaultValue={editingProject?.url || ''}
                    required
                    placeholder="https://example.vercel.app/"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Display URL
                  </label>
                  <input
                    name="display_url"
                    defaultValue={editingProject?.display_url || ''}
                    placeholder="example.vercel.app"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#D4AF37] mb-1">
                    Metric 1 Label
                  </label>
                  <input
                    name="metric1_label"
                    defaultValue={editingProject?.metric1_label || 'UPTIME'}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#D4AF37] mb-1">
                    Metric 1 Value
                  </label>
                  <input
                    name="metric1_value"
                    defaultValue={editingProject?.metric1_value || '99.99%'}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#D4AF37] mb-1">
                    Metric 1 Hint
                  </label>
                  <input
                    name="metric1_sub"
                    defaultValue={editingProject?.metric1_sub || 'Edge cloud'}
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Deliverables (1 per line)
                </label>
                <textarea
                  name="deliverables"
                  defaultValue={editingProject?.deliverables?.join('\n') || ''}
                  rows={3}
                  placeholder="Interactive Dashboard&#10;Real-Time Telemetry&#10;Instant Checkout"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-sans outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-mono text-xs text-[#E5E7EB]/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GOODS MODAL (ADD / EDIT) */}
      {isGoodsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1B291F] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-[#E5E7EB]">
                {editingGoods ? 'EDIT CAPSULE ITEM' : 'ADD NEW CAPSULE ITEM'}
              </h3>
              <button
                onClick={() => setIsGoodsModalOpen(false)}
                className="text-white/50 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoods} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Item / Capsule Name *
                </label>
                <input
                  name="name"
                  defaultValue={editingGoods?.name || ''}
                  required
                  placeholder="e.g. CAPSULE 001 // TANGIER DOCK FLEECE"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Badge
                  </label>
                  <input
                    name="badge"
                    defaultValue={editingGoods?.badge || 'LIMITED CAPSULE // 50 PIECES'}
                    placeholder="e.g. LIMITED CAPSULE // 50 PIECES"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Price Tag
                  </label>
                  <input
                    name="price_tag"
                    defaultValue={editingGoods?.price_tag || '$160.00 USD'}
                    placeholder="e.g. $160.00 USD"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Status
                  </label>
                  <input
                    name="status"
                    defaultValue={editingGoods?.status || 'STUDIO GRAPHIC EDITION // LIVE ON ETSY'}
                    placeholder="e.g. STUDIO GRAPHIC EDITION, LIVE ON ETSY"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                    Etsy / Store Link *
                  </label>
                  <input
                    name="url"
                    defaultValue={editingGoods?.url || 'https://chillguyso.etsy.com'}
                    required
                    placeholder="https://chillguyso.etsy.com"
                    className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Thumbnail Image URL *
                </label>
                <input
                  name="image"
                  defaultValue={editingGoods?.image || '/TactileGoods.jfif'}
                  required
                  placeholder="/TactileGoods.jfif, /Lifestyle, Black (1).jpeg, or Etsy image URL"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Materials & Specs
                </label>
                <input
                  name="materials"
                  defaultValue={editingGoods?.materials || 'Curated Heavyweight Streetwear Cotton / DTG Print'}
                  placeholder="e.g. Curated Heavyweight Streetwear Cotton / DTG Print"
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#D4AF37] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingGoods?.description || ''}
                  rows={3}
                  placeholder="Detailed capsule description, graphic concept, blank specifications, Etsy dispatch..."
                  className="w-full bg-[#152319] border border-white/10 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#E5E7EB] font-sans outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsGoodsModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-mono text-xs text-[#E5E7EB]/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#E5C158] text-[#152319] font-mono font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Save Capsule Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
