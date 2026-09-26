"use client";

import React, { useState } from "react";
import {
  ShortPrompt,
  getYouTubeTitle,
  getYouTubeDescription,
  getYouTubeTags,
  getFullVideoGeneratorPrompt
} from "@/lib/shorts-data";
import {
  playTimedShortAudio,
  stopNarration,
  analyzeShortAudioTiming
} from "@/lib/audio-voice";
import {
  Copy,
  Check,
  Film,
  Sparkles,
  Camera,
  Sun,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Tag,
  FileText,
  Type,
  ChevronDown,
  ChevronUp,
  Share2,
  ExternalLink,
  Layers
} from "lucide-react";

interface ShortCardProps {
  short: ShortPrompt;
  isSelected?: boolean;
  onSelect?: () => void;
  onOpenDetails: () => void;
}

export function ShortCard({ short, isSelected, onSelect, onOpenDetails }: ShortCardProps) {
  const [copiedField, setCopiedField] = useState<"prompt" | "title" | "desc" | "tags" | "all" | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const ytTitle = getYouTubeTitle(short);
  const ytDescription = getYouTubeDescription(short);
  const ytTags = getYouTubeTags(short);
  const fullVideoPrompt = getFullVideoGeneratorPrompt(short);

  const audioTiming = analyzeShortAudioTiming(
    short.cleanJokeCore.setup,
    short.cleanJokeCore.punchline
  );

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      stopNarration();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playTimedShortAudio(
        short.cleanJokeCore.setup,
        short.cleanJokeCore.punchline,
        {
          onStart: () => setIsPlayingAudio(true),
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        }
      );
    }
  };

  const copyText = (text: string, field: "prompt" | "title" | "desc" | "tags" | "all", e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllMetadata = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allText = `=== PROMPT #${short.id}: ${short.title.toUpperCase()} ===

[1] YOUTUBE TITLE:
${ytTitle}

[2] YOUTUBE DESCRIPTION:
${ytDescription}

[3] YOUTUBE TAGS:
${ytTags}

[4] VIDEO GENERATION PROMPT:
${fullVideoPrompt}
`;
    copyText(allText, "all");
  };

  return (
    <article
      id={`prompt-${short.id}`}
      className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-neutral-900/80 p-5 sm:p-6 space-y-5 ${
        isSelected
          ? "border-red-500 ring-2 ring-red-500/30 shadow-2xl shadow-red-950/40 bg-neutral-900/95"
          : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 shadow-lg"
      }`}
    >
      {/* Top Header: ID, Category, Runtime & Aspect Ratio */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl bg-red-600/15 text-red-400 font-mono text-xs font-black border border-red-500/30">
            PROMPT #{short.id}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {short.title}
          </h3>
          <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium border border-neutral-700">
            {short.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-neutral-950 text-amber-300 font-mono text-[11px] font-semibold border border-neutral-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            10s Runtime
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-neutral-950 text-neutral-300 font-mono text-[11px] font-semibold border border-neutral-800">
            9:16 Vertical
          </span>
        </div>
      </div>

      {/* 4 PRIMARY COPY BUTTONS BAR (Video Gen Prompt, YouTube Title, YouTube Description, YouTube Tags) */}
      <div className="p-3 rounded-2xl bg-neutral-950/90 border border-neutral-800/90 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
          <span className="font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
            <Copy className="w-3.5 h-3.5 text-red-400" />
            1-Click Copy Assets
          </span>
          <button
            onClick={copyAllMetadata}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            title="Copy Title, Description, Tags, and Video Prompt all together"
          >
            {copiedField === "all" ? <Check className="w-3 h-3 text-emerald-400" /> : <Layers className="w-3 h-3" />}
            <span>{copiedField === "all" ? "All 4 Assets Copied!" : "Copy All 4 Assets"}</span>
          </button>
        </div>

        {/* The 4 Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          
          {/* Button 1: Copy Video Generation Prompt */}
          <button
            onClick={(e) => copyText(fullVideoPrompt, "prompt", e)}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
              copiedField === "prompt"
                ? "bg-emerald-600 text-white shadow-emerald-900/30"
                : "bg-red-600 hover:bg-red-500 text-white shadow-red-950/40"
            }`}
          >
            {copiedField === "prompt" ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied Video Prompt!</span>
              </>
            ) : (
              <>
                <Film className="w-4 h-4" />
                <span>Copy Video Prompt</span>
              </>
            )}
          </button>

          {/* Button 2: Copy YouTube Title */}
          <button
            onClick={(e) => copyText(ytTitle, "title", e)}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              copiedField === "title"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700"
            }`}
          >
            {copiedField === "title" ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied Title!</span>
              </>
            ) : (
              <>
                <Type className="w-4 h-4 text-amber-400" />
                <span>Copy YouTube Title</span>
              </>
            )}
          </button>

          {/* Button 3: Copy YouTube Description */}
          <button
            onClick={(e) => copyText(ytDescription, "desc", e)}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              copiedField === "desc"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700"
            }`}
          >
            {copiedField === "desc" ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied Description!</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Copy YouTube Description</span>
              </>
            )}
          </button>

          {/* Button 4: Copy YouTube Tags */}
          <button
            onClick={(e) => copyText(ytTags, "tags", e)}
            className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              copiedField === "tags"
                ? "bg-emerald-600 text-white"
                : "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700"
            }`}
          >
            {copiedField === "tags" ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied Tags!</span>
              </>
            ) : (
              <>
                <Tag className="w-4 h-4 text-purple-400" />
                <span>Copy YouTube Tags</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Clean Joke Core & Visual Metaphor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Joke Setup & Punchline */}
        <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 block">
            Clean Joke Core
          </span>
          <p className="text-xs sm:text-sm font-medium text-white italic">
            &ldquo;{short.cleanJokeCore.setup}&rdquo;
          </p>
          <div className="pt-1.5 border-t border-neutral-800/80 flex items-start gap-1.5">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase shrink-0 mt-0.5">
              Punchline:
            </span>
            <p className="text-xs sm:text-sm font-bold text-amber-200">
              {short.cleanJokeCore.punchline}
            </p>
          </div>
        </div>

        {/* Visual Metaphor Punchline */}
        <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Visual Metaphor (Punchline Made Physical)
          </span>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
            {short.visualMetaphor}
          </p>
        </div>
      </div>

      {/* Key YouTube Publishing Data Display (Title & Tags quick look) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-amber-400 font-bold">YOUTUBE SHORTS TITLE</span>
            <button
              onClick={(e) => copyText(ytTitle, "title", e)}
              className="text-neutral-400 hover:text-white flex items-center gap-1"
            >
              {copiedField === "title" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="font-mono font-bold text-white text-xs truncate">
            {ytTitle}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span className="text-purple-400 font-bold">YOUTUBE TAGS (COMMA-SEPARATED)</span>
            <button
              onClick={(e) => copyText(ytTags, "tags", e)}
              className="text-neutral-400 hover:text-white flex items-center gap-1"
            >
              {copiedField === "tags" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
          </div>
          <p className="font-mono text-[11px] text-neutral-300 truncate">
            {ytTags}
          </p>
        </div>
      </div>

      {/* Expandable Section: Full Video Generator Prompt, YouTube Description, Camera, Lighting & British Voice */}
      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-neutral-800/80 animate-in fade-in duration-200">
          
          {/* Master Video Generator Prompt Box */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                Full Video Generation Prompt (Runway Gen-3 / Sora / Kling / Luma)
              </span>
              <button
                onClick={(e) => copyText(fullVideoPrompt, "prompt", e)}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                {copiedField === "prompt" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === "prompt" ? "Copied" : "Copy Prompt"}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-black/90 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
              {fullVideoPrompt}
            </div>
          </div>

          {/* YouTube Description Box */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                YouTube Description Text
              </span>
              <button
                onClick={(e) => copyText(ytDescription, "desc", e)}
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              >
                {copiedField === "desc" ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === "desc" ? "Copied" : "Copy Description"}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-black/80 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {ytDescription}
            </div>
          </div>

          {/* Camera Angles, Lighting & British Voice audio cues */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
              <span className="text-sky-400 font-bold font-mono text-[10px] flex items-center gap-1 uppercase">
                <Camera className="w-3.5 h-3.5" /> Camera Angles
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{short.cameraAngle}</p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
              <span className="text-amber-400 font-bold font-mono text-[10px] flex items-center gap-1 uppercase">
                <Sun className="w-3.5 h-3.5" /> Lighting & Color
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">{short.lighting}</p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-rose-400 font-bold font-mono text-[10px] flex items-center gap-1 uppercase">
                  <Volume2 className="w-3.5 h-3.5" /> British Voice
                </span>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {audioTiming.totalEstimatedDuration}s / 10s
                </span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                British young female voice delivery ({audioTiming.totalWordCount} words, calibrated for 10s).
              </p>
              <button
                onClick={handleToggleAudio}
                className={`w-full mt-1 flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-neutral-800 hover:bg-neutral-700 text-rose-300 border border-neutral-700"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current text-rose-400" />
                    <span>Listen to Narration</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Card Bottom Bar: Expand Toggle & Full Spec Sheet button */}
      <div className="pt-2 flex items-center justify-between border-t border-neutral-800/60 text-xs">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white font-medium py-1 transition-colors"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{isExpanded ? "Collapse Details" : "View Full Video Prompt & Description Preview"}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails();
          }}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 font-semibold px-2.5 py-1 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Full Spec Modal</span>
        </button>
      </div>

    </article>
  );
}
