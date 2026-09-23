"use client";

import React, { useState } from "react";
import { ShortPrompt } from "@/lib/shorts-data";
import { X, Sparkles, Loader2, Plus, Film, Volume2, Check, Copy } from "lucide-react";

interface GeneratorModalProps {
  onClose: () => void;
  onAddShort: (newShort: ShortPrompt) => void;
}

export function GeneratorModal({ onClose, onAddShort }: GeneratorModalProps) {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("Sci-Fi Cinema");
  const [characterCount, setCharacterCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<ShortPrompt | null>(null);
  const [copied, setCopied] = useState(false);

  const GENRES = [
    "Sci-Fi Cinema",
    "Film Noir Mystery",
    "Culinary Epic",
    "Corporate Satire",
    "High Fashion Parody",
    "Medieval Fantasy",
    "Steampunk Romance",
    "Psychological Thriller",
    "Deep Sea Thriller",
    "Historical Period Drama"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic || "Unexpected Everyday Phenomenon",
          genre,
          characterCount
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedResult(data.data);
      }
    } catch (err) {
      console.error("Failed to generate:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAndClose = () => {
    if (generatedResult) {
      onAddShort(generatedResult);
      onClose();
    }
  };

  const handleCopyPrompt = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult.generatorCopyPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Generate Custom 10s Hollywood Short Prompt
            </h3>
            <p className="text-xs text-neutral-400">
              Create new prompts with clean jokes, distinct visual metaphors, and British female voice narration
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!generatedResult ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                Core Subject / Topic / Object:
              </label>
              <input
                type="text"
                placeholder="e.g. Sourdough Starter, Quantum Toaster, Antique Clock, Chameleon..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Cinematic Hollywood Genre:
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-500"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                  Character Cast Count:
                </label>
                <select
                  value={characterCount}
                  onChange={(e) => setCharacterCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-500"
                >
                  <option value={1}>1 Lead Character (Monologue)</option>
                  <option value={2}>2 Characters (Rapid Banter Duo)</option>
                  <option value={3}>3+ Characters (Ensemble)</option>
                </select>
              </div>
            </div>

            {/* Constraints Reminder */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 space-y-1">
              <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">
                Automated Production Constraints:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                <li>Strictly 10-second duration breakdown (0-3s, 3-7s, 7-10s)</li>
                <li>9:16 vertical orientation (YouTube Shorts safe zones preserved)</li>
                <li>Visual metaphor physically manifesting the clean joke punchline</li>
                <li>British young female voice narration script with emotional cues</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Directing Scene...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Short Prompt</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 font-mono font-bold">
                  {generatedResult.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">10s • 9:16 Shorts</span>
              </div>
              <h4 className="text-base font-bold text-white">{generatedResult.title}</h4>
              <p className="text-xs text-neutral-300 italic">
                &ldquo;{generatedResult.cleanJokeCore.setup}&rdquo;
              </p>
              <p className="text-xs text-amber-300 font-bold">
                Punchline: {generatedResult.cleanJokeCore.punchline}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <strong className="text-purple-400 font-mono text-[11px] block">Visual Metaphor:</strong>
              <p className="text-xs">{generatedResult.visualMetaphor}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-neutral-800 font-mono text-xs text-neutral-300 max-h-36 overflow-y-auto">
              <strong className="text-emerald-400 text-[10px] block mb-1">RUNWAY GEN-3 / SORA PROMPT:</strong>
              {generatedResult.generatorCopyPrompt}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setGeneratedResult(null)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ← Generate Another
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Prompt"}</span>
                </button>

                <button
                  onClick={handleAddAndClose}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Studio Library</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
