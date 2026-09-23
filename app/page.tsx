"use client";

import React, { useState, useMemo } from "react";
import { SHORTS_DATABASE, ShortPrompt } from "@/lib/shorts-data";
import { ShortCard } from "@/components/ShortCard";
import { PromptDetailsModal } from "@/components/PromptDetailsModal";
import { GeneratorModal } from "@/components/GeneratorModal";
import { BatchExportModal } from "@/components/BatchExportModal";
import { WakeLockAndFullscreen } from "@/components/WakeLockAndFullscreen";
import {
  Search,
  Download,
  Plus,
  Clapperboard,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

export default function HomePage() {
  const [shorts, setShorts] = useState<ShortPrompt[]>(SHORTS_DATABASE);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inspectingShort, setInspectingShort] = useState<ShortPrompt | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    shorts.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [shorts]);

  // Filtered shorts (kept in prompt 1 onwards order)
  const filteredShorts = useMemo(() => {
    return shorts
      .filter((item) => {
        const matchesCategory =
          activeCategory === "All" || item.category.toLowerCase() === activeCategory.toLowerCase();
        const q = searchQuery.toLowerCase().trim();
        if (!q) return matchesCategory;

        const matchesSearch =
          item.title.toLowerCase().includes(q) ||
          item.cleanJokeCore.setup.toLowerCase().includes(q) ||
          item.cleanJokeCore.punchline.toLowerCase().includes(q) ||
          item.visualMetaphor.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.cameraAngle.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.id - b.id);
  }, [shorts, activeCategory, searchQuery]);

  const handleAddNewShort = (newShort: ShortPrompt) => {
    setShorts([...shorts, newShort]);
  };

  const handleJumpTo = (id: number) => {
    const el = document.getElementById(`prompt-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-900 selection:text-white">
      
      {/* Clean Header Bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 p-0.5 shadow-md shadow-red-600/20">
              <div className="w-full h-full rounded-[10px] bg-neutral-950 flex items-center justify-center">
                <Clapperboard className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-white">
                  ShortsLens Studio
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 font-bold border border-red-500/30 font-mono">
                  {shorts.length} PROMPTS
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                10s Hollywood Clean Joke Video & Audio Prompts (British Voice)
              </p>
            </div>
          </div>

          {/* Right Action Tools: WakeLock (Always-On), Fullscreen, Batch Export, Create */}
          <div className="flex items-center gap-2">
            <WakeLockAndFullscreen />

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-all shadow-sm"
              title="Export all 75 prompts with YouTube metadata to JSON, CSV, or Markdown"
            >
              <Download className="w-3.5 h-3.5 text-neutral-300" />
              <span className="hidden sm:inline">Export All ({shorts.length})</span>
              <span className="sm:hidden">Export</span>
            </button>

            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Prompt #{shorts.length + 1}+</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container: Distraction-Free Starting Directly with Prompt 1 Onwards */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Streamlined Filter & Jump Toolbar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-3">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 75 shorts by joke, punchline, metaphor, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Jump Dropdown */}
            <div className="relative shrink-0 flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono hidden md:inline">Jump to:</span>
              <select
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val) handleJumpTo(val);
                }}
                className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                defaultValue="1"
              >
                {shorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    Prompt #{s.id}: {s.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all text-xs ${
                  activeCategory === cat
                    ? "bg-red-600 text-white font-bold shadow-sm"
                    : "bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Counter */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/60 font-mono text-[11px]">
            <span>
              Showing <strong className="text-white">{filteredShorts.length}</strong> of{" "}
              <strong className="text-white">{shorts.length}</strong> prompts (Starting from Prompt 1)
            </span>
            <span className="text-neutral-500 hidden sm:inline">
              Prompt format: 10s • 9:16 Vertical • British Voice Cues • Safe Zones
            </span>
          </div>
        </div>

        {/* PROMPT 1 ONWARDS LIST */}
        <div className="space-y-6">
          {filteredShorts.length > 0 ? (
            filteredShorts.map((short) => (
              <ShortCard
                key={short.id}
                short={short}
                onOpenDetails={() => setInspectingShort(short)}
              />
            ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-3">
              <Search className="w-8 h-8 text-neutral-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No matching prompts found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try clearing your search query to see all prompts starting from Prompt 1.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-200 text-xs font-semibold hover:bg-neutral-700 transition-colors"
              >
                Reset to Prompt 1
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Clean Footer */}
      <footer className="mt-12 border-t border-neutral-800/80 bg-neutral-950 px-6 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>ShortsLens Studio • {shorts.length} Hollywood 10-Second Clean Joke Video Prompts</p>
          <p className="text-neutral-400 text-[11px]">
            British Young Female Voice Prompt Audio Specs • YouTube Title, Description & Tags Ready
          </p>
        </div>
      </footer>

      {/* Modals */}
      {inspectingShort && (
        <PromptDetailsModal
          short={inspectingShort}
          onClose={() => setInspectingShort(null)}
        />
      )}

      {isGeneratorOpen && (
        <GeneratorModal
          onClose={() => setIsGeneratorOpen(false)}
          onAddShort={handleAddNewShort}
        />
      )}

      {isExportOpen && (
        <BatchExportModal
          shorts={shorts}
          onClose={() => setIsExportOpen(false)}
        />
      )}

    </div>
  );
}
