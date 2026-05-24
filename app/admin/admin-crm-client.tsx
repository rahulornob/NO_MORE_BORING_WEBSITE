"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  addWebsiteAction,
  updateWebsiteAction,
  deleteWebsiteAction,
} from "@/app/actions";
import type { WebsiteItem, Category, Platform } from "@/lib/types";
import {
  Plus,
  Edit2,
  Trash2,
  Lock,
  Search,
  Check,
  Eye,
  RefreshCw,
  Sliders,
} from "lucide-react";
import {
  categories as allCategories,
  platforms as allPlatforms,
  styles as allStyles,
  interactions as allInteractions,
  colors as allColors,
  layouts as allLayouts,
} from "@/lib/sites";

const initialFormState = {
  id: "",
  title: "",
  url: "",
  screenshot: "",
  industry: "",
  categories: [] as Category[],
  platforms: [] as Platform[],
  styles: [] as string[],
  interactions: [] as string[],
  colors: [] as string[],
  layout: [] as string[],
  score: {
    taste: 8.5,
    motion: 8.5,
    originality: 8.5,
  },
  curatorNote: "",
  breakdown: "",
};

export function AdminCRMClient({ initialSites }: { initialSites: WebsiteItem[] }) {
  const { user, setIsSigningIn } = useAuth();
  const [sites, setSites] = useState<WebsiteItem[]>(initialSites);
  const [activeTab, setActiveTab] = useState<"library" | "form">("library");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  if (!user || user.role !== "admin") {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex size-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-500/80">
            <Lock className="size-9" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Access Restricted</h1>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              This CRM module requires Administrator credentials. Please sign in as an **Admin Curator** to manage the curation library.
            </p>
          </div>
          <button
            onClick={() => setIsSigningIn(true)}
            className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-violet-300 hover:bg-violet-500/20 transition duration-200"
          >
            Sign in as Admin
          </button>
        </div>
      </main>
    );
  }

  // Filtered sites for list view
  const filteredSites = sites.filter((site) =>
    site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
    setMsg(null);
  };

  const handleUrlChange = (urlVal: string) => {
    // Quality of life: Auto-generate ID from Title and Screenshot from URL
    const idVal = urlVal
      .replace(/https?:\/\/(www\.)?/, "")
      .split(".")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    const screenshotVal = `https://image.thum.io/get/width/1400/crop/940/noanimate/${urlVal}`;

    setForm((prev) => ({
      ...prev,
      url: urlVal,
      id: prev.id || idVal,
      screenshot: prev.screenshot || screenshotVal,
    }));
  };

  // Checkbox lists togglers
  const toggleItem = <T,>(listKey: string, val: T) => {
    setForm((prev: any) => {
      const arr = prev[listKey] as T[];
      const nextArr = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
      return { ...prev, [listKey]: nextArr };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.url) {
      setMsg({ text: "ID, Title, and URL are required.", type: "error" });
      return;
    }

    setLoading(true);
    setMsg(null);

    const siteData: WebsiteItem = {
      ...form,
      featuredAt: editingId
        ? sites.find((s) => s.id === editingId)?.featuredAt || new Date().toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    };

    if (editingId) {
      // Update
      const success = await updateWebsiteAction(siteData);
      if (success) {
        setSites((prev) => prev.map((s) => (s.id === editingId ? siteData : s)));
        setMsg({ text: `Successfully updated "${form.title}"`, type: "success" });
        setTimeout(() => setActiveTab("library"), 1000);
      } else {
        setMsg({ text: "Failed to update website entry.", type: "error" });
      }
    } else {
      // Create
      const success = await addWebsiteAction(siteData);
      if (success) {
        setSites((prev) => [siteData, ...prev]);
        setMsg({ text: `Successfully added "${form.title}"`, type: "success" });
        resetForm();
        setTimeout(() => setActiveTab("library"), 1000);
      } else {
        setMsg({ text: "Failed to create. ID might already exist.", type: "error" });
      }
    }
    setLoading(false);
  };

  const handleEditClick = (site: WebsiteItem) => {
    setEditingId(site.id);
    setForm({
      id: site.id,
      title: site.title,
      url: site.url,
      screenshot: site.screenshot,
      industry: site.industry,
      categories: site.categories,
      platforms: site.platforms,
      styles: site.styles,
      interactions: site.interactions,
      colors: site.colors,
      layout: site.layout,
      score: { ...site.score },
      curatorNote: site.curatorNote,
      breakdown: site.breakdown,
    });
    setMsg(null);
    setActiveTab("form");
  };

  const handleDeleteClick = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    const success = await deleteWebsiteAction(id);
    if (success) {
      setSites((prev) => prev.filter((s) => s.id !== id));
      alert(`Deleted "${title}" successfully.`);
    } else {
      alert("Failed to delete website curation entry.");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Sliders className="size-8 text-violet-400" />
            Curation CRM Panel
          </h1>
          <p className="text-sm text-muted mt-1">
            Publish, edit, and audit curations displayed in the gallery.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab("library"); setMsg(null); }}
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "library"
                ? "bg-white/10 text-white"
                : "text-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            Curation Library ({sites.length})
          </button>
          <button
            onClick={() => { resetForm(); setActiveTab("form"); }}
            className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "form" && !editingId
                ? "bg-violet-500 text-white"
                : "bg-white/5 text-muted hover:bg-white/10 hover:text-white"
            }`}
          >
            <Plus className="size-4" /> Add Curation
          </button>
        </div>
      </div>

      {activeTab === "library" ? (
        // TABLE / LIST TAB
        <div className="rounded-2xl border border-white/10 bg-[#111318]/40 p-6 shadow-md backdrop-blur-md">
          {/* Search bar */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-muted" />
            <input
              type="text"
              placeholder="Search by title, industry, or url..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-[#08090a] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition"
            />
          </div>

          {/* CRM Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted">
                  <th className="py-3 px-4">Title / ID</th>
                  <th className="py-3 px-4">URL</th>
                  <th className="py-3 px-4">Scores</th>
                  <th className="py-3 px-4">Tags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSites.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-muted">
                      No curations match search query.
                    </td>
                  </tr>
                ) : (
                  filteredSites.map((site) => {
                    const avgScore = ((site.score.taste + site.score.motion + site.score.originality) / 3).toFixed(1);
                    return (
                      <tr key={site.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-4 px-4">
                          <div className="font-semibold text-white">{site.title}</div>
                          <div className="text-[10px] text-muted font-mono">{site.id}</div>
                        </td>
                        <td className="py-4 px-4 text-white/70 max-w-[200px] truncate font-mono text-xs">
                          <a href={site.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            {site.url.replace(/https?:\/\//, "")}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-white font-mono text-xs">
                          T:{site.score.taste.toFixed(1)} M:{site.score.motion.toFixed(1)} O:{site.score.originality.toFixed(1)} (★ {avgScore})
                        </td>
                        <td className="py-4 px-4 max-w-[220px]">
                          <div className="flex flex-wrap gap-1">
                            <span className="rounded bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 text-[9px] text-violet-300">
                              {site.industry}
                            </span>
                            {site.categories.slice(0, 2).map((cat) => (
                              <span key={cat} className="rounded bg-white/5 border border-white/5 px-1.5 py-0.5 text-[9px] text-white/50">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/site/${site.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full p-2 text-white/40 hover:bg-white/5 hover:text-white transition"
                              title="Preview"
                            >
                              <Eye className="size-4" />
                            </a>
                            <button
                              onClick={() => handleEditClick(site)}
                              className="rounded-full p-2 text-white/40 hover:bg-white/5 hover:text-white transition"
                              title="Edit"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(site.id, site.title)}
                              className="rounded-full p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400 transition"
                              title="Delete"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // FORM TAB (Add/Edit)
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#111318]/40 p-6 shadow-md backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {editingId ? `Edit Curation: "${form.title}"` : "Create New Curation Entry"}
          </h2>

          {msg && (
            <div className={`p-4 rounded-xl border mb-6 text-sm ${
              msg.type === "success" 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Title & URL */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">Website Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stripe"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">Website URL</label>
                <input
                  type="url"
                  required
                  placeholder="e.g. https://stripe.com"
                  value={form.url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Unique ID & Industry */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">Unique ID (URL Slug)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingId}
                  placeholder="e.g. stripe (auto-generated)"
                  value={form.id}
                  onChange={(e) => setForm({ ...form, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                  className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted">Industry</label>
                <input
                  type="text"
                  placeholder="e.g. Fintech"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Screenshot URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center justify-between">
                <span>Screenshot URL</span>
                <span className="text-[10px] text-muted tracking-normal normal-case">Generated via thum.io</span>
              </label>
              <input
                type="text"
                placeholder="e.g. https://image.thum.io/get/width/1400/crop/940/noanimate/https://stripe.com"
                value={form.screenshot}
                onChange={(e) => setForm({ ...form, screenshot: e.target.value })}
                className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition font-mono text-xs"
              />
            </div>

            {/* Checkbox selectors for Categories */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">Categories (Multi-Select)</label>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.map((cat) => {
                  const isChecked = form.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleItem<Category>("categories", cat)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition ${
                        isChecked 
                          ? "bg-white text-black border-white" 
                          : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {isChecked && <Check className="size-3" />}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkbox selectors for Platforms */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted block mb-2">Platforms</label>
              <div className="flex flex-wrap gap-1.5">
                {allPlatforms.map((plat) => {
                  const isChecked = form.platforms.includes(plat);
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => toggleItem<Platform>("platforms", plat)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition ${
                        isChecked 
                          ? "bg-violet-500 text-white border-violet-500" 
                          : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {isChecked && <Check className="size-3" />}
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic comma separated tag fields for Styles, Interactions, Colors, Layouts */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Styles & Aesthetics", listKey: "styles", defaults: allStyles },
                { label: "Interactions & Motion", listKey: "interactions", defaults: allInteractions },
                { label: "Color Profiles", listKey: "colors", defaults: allColors },
                { label: "Layouts", listKey: "layout", defaults: allLayouts },
              ].map((field) => (
                <div key={field.listKey} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted">{field.label}</label>
                  <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-[#08090a] p-2.5 min-h-[90px] items-start">
                    {field.defaults.map((tag) => {
                      const isSelected = (form as any)[field.listKey].includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleItem(field.listKey, tag)}
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold transition uppercase tracking-wider ${
                            isSelected 
                              ? "bg-white/20 text-white border border-white/30" 
                              : "bg-white/[0.02] border border-white/5 text-white/40 hover:text-white/70"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Sliders for Curation Scores (Taste, Motion, Originality) */}
            <div className="rounded-xl border border-white/5 bg-[#111318]/50 p-4 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/75">Curation Scores (1.0 to 10.0)</span>
              
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Taste Score", key: "taste", color: "text-pink-400" },
                  { label: "Motion Score", key: "motion", color: "text-violet-400" },
                  { label: "Originality Score", key: "originality", color: "text-emerald-400" },
                ].map((slider) => {
                  const val = (form.score as any)[slider.key];
                  return (
                    <div key={slider.key} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className={slider.color}>{slider.label}</span>
                        <span className="text-white font-mono">{val.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={val}
                        onChange={(e) => setForm({
                          ...form,
                          score: { ...form.score, [slider.key]: parseFloat(e.target.value) }
                        })}
                        className="w-full accent-violet-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Curator Note */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Curator Note</label>
              <textarea
                placeholder="Write a concise overview of what makes this curation outstanding..."
                rows={3}
                value={form.curatorNote}
                onChange={(e) => setForm({ ...form, curatorNote: e.target.value })}
                className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition"
              />
            </div>

            {/* Design Breakdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted">Design & Motion Breakdown</label>
              <textarea
                placeholder="Write a detailed analysis study of components, animations, triggers, and visual system..."
                rows={5}
                value={form.breakdown}
                onChange={(e) => setForm({ ...form, breakdown: e.target.value })}
                className="rounded-xl border border-white/10 bg-[#08090a] px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:outline-none transition"
              />
            </div>

            {/* Form actions */}
            <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => { resetForm(); setActiveTab("library"); }}
                className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-full bg-white px-8 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading && <RefreshCw className="size-3.5 animate-spin" />}
                {editingId ? "Update Curation" : "Publish Curation"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
