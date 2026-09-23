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
  X,
  Copy,
  Check,
  Camera,
  Sun,
  Users,
  Film,
  Sparkles,
  Layers,
  Clock,
  Clapperboard,
  Volume2,
  ShieldCheck,
  FileCode,
  Type,
  FileText,
  Tag
} from "lucide-react";

interface PromptDetailsModalProps {
  short: ShortPrompt;
  onClose: () => void;
}

export function PromptDetailsModal({ short, onClose }: PromptDetailsModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showJsonView, setShowJsonView] = useState(false);

  const ytTitle = getYouTubeTitle(short);
  const ytDescription = getYouTubeDescription(short);
  const ytTags = getYouTubeTags(short);
  const fullVideoPrompt = getFullVideoGeneratorPrompt(short);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const copyAudioScript = () => {
    const audioPromptText = `[AUDIO & DIALOGUE GENERATION SPECIFICATION]
Target Voice Profile: British young female voice, expressive, dramatic comedic timing, crisp RP cadence.
Scene Context: ${short.title} (${short.category})

Dialogue Lines:
${short.dialogueScript
  .map((d) => `[${d.timeRange}] ${d.speaker} (${d.mood}): "${d.text}"`)
  .join("\n")}
`;
    copyToClipboard(audioPromptText, "audio");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center font-mono font-bold text-xs">
              #{short.id}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {short.title}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-medium border border-neutral-700">
                  {short.category}
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                10s Hollywood Clean Joke Prompt • 9:16 Vertical Safe Zones • Runway / Sora / Kling Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowJsonView(!showJsonView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors border border-neutral-700"
            >
              <FileCode className="w-3.5 h-3.5 text-neutral-400" />
              <span>{showJsonView ? "Spec Sheet" : "Raw JSON"}</span>
            </button>

            <button
              onClick={() => copyToClipboard(fullVideoPrompt, "master")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
            >
              {copiedType === "master" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === "master" ? "Copied Prompt!" : "Copy Video Prompt"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-neutral-200">
          
          {showJsonView ? (
            <div className="p-4 rounded-2xl bg-black border border-neutral-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
              {JSON.stringify(
                {
                  ...short,
                  youtubeTitle: ytTitle,
                  youtubeDescription: ytDescription,
                  youtubeTags: ytTags,
                  fullVideoGeneratorPrompt: fullVideoPrompt
                },
                null,
                2
              )}
            </div>
          ) : (
            <>
              {/* YouTube Quick Copy Buttons Bar */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5 text-red-400" />
                    YouTube Shorts Publishing Copy Suite
                  </span>
                  <span className="text-[11px] text-amber-400">1-Click Direct Copy</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <button
                    onClick={() => copyToClipboard(fullVideoPrompt, "m_prompt")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      copiedType === "m_prompt" ? "bg-emerald-600 text-white" : "bg-red-600 hover:bg-red-500 text-white"
                    }`}
                  >
                    {copiedType === "m_prompt" ? <Check className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
                    <span>{copiedType === "m_prompt" ? "Copied Prompt!" : "Copy Video Prompt"}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(ytTitle, "m_title")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      copiedType === "m_title"
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                    }`}
                  >
                    {copiedType === "m_title" ? <Check className="w-3.5 h-3.5" /> : <Type className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{copiedType === "m_title" ? "Copied Title!" : "Copy YouTube Title"}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(ytDescription, "m_desc")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      copiedType === "m_desc"
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                    }`}
                  >
                    {copiedType === "m_desc" ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{copiedType === "m_desc" ? "Copied Description!" : "Copy Description"}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(ytTags, "m_tags")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      copiedType === "m_tags"
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                    }`}
                  >
                    {copiedType === "m_tags" ? <Check className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5 text-purple-400" />}
                    <span>{copiedType === "m_tags" ? "Copied Tags!" : "Copy YouTube Tags"}</span>
                  </button>
                </div>
              </div>

              {/* Clean Joke Core & Visual Metaphor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block mb-2">
                    Multi-Generational Clean Joke Core
                  </span>
                  <p className="text-sm font-semibold text-white mb-2">
                    &ldquo;{short.cleanJokeCore.setup}&rdquo;
                  </p>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block mb-0.5">Punchline:</span>
                    <p className="text-xs font-bold text-amber-200">
                      {short.cleanJokeCore.punchline}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 block mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Visual Metaphor (Punchline Made Physical)
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      {short.visualMetaphor}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400">
                      Aspect Ratio: {short.aspectRatio}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                      Duration: {short.targetDuration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Master Video Generator Prompt Box */}
              <div className="p-4 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Film className="w-4 h-4" />
                    Master Video Generator Prompt (Runway Gen-3 / Sora / Kling / Luma)
                  </span>
                  <button
                    onClick={() => copyToClipboard(fullVideoPrompt, "box")}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedType === "box" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === "box" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/80 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed selection:bg-red-900 whitespace-pre-wrap">
                  {fullVideoPrompt}
                </div>
              </div>

              {/* YouTube Description Box */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    YouTube Description Specification
                  </span>
                  <button
                    onClick={() => copyToClipboard(ytDescription, "desc_box")}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedType === "desc_box" ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === "desc_box" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-black/80 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {ytDescription}
                </div>
              </div>

              {/* 10-Second Visual Storytelling Prompt (Beats 0-3s, 3-7s, 7-10s) */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Clapperboard className="w-4 h-4" />
                    Visual Storytelling Prompt (10-Second Progression)
                  </span>
                  <button
                    onClick={() => copyToClipboard(short.visualStorytellingPrompt, "visual")}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedType === "visual" ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === "visual" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {short.visualStorytellingPrompt}
                </p>
              </div>

              {/* Camera Angles & Lighting Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Camera Angle Breakdown */}
                <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      Camera Choreography Prompt
                    </span>
                    <button
                      onClick={() => copyToClipboard(short.cameraAngle, "cam")}
                      className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedType === "cam" ? <Check className="w-3 h-3 text-sky-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {short.cameraAngle}
                  </p>
                </div>

                {/* Lighting Setup */}
                <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      Hollywood Lighting & Color Palette Prompt
                    </span>
                    <button
                      onClick={() => copyToClipboard(short.lighting, "light")}
                      className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedType === "light" ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {short.lighting}
                  </p>
                </div>
              </div>

              {/* Character Audio & British Voice Dialogue Script Prompt */}
              <div className="p-5 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" />
                      Audio & Voice Prompt Specification (For Video/Audio Generation)
                    </span>
                    <p className="text-[11px] text-neutral-400">
                      Target Voice: <strong>British Young Female Voice</strong> (expressive, dramatic comedic timing, crisp RP cadence)
                    </p>
                  </div>

                  <button
                    onClick={copyAudioScript}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-rose-300 text-xs font-semibold border border-neutral-700 transition-colors"
                  >
                    {copiedType === "audio" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === "audio" ? "Copied Audio Prompt" : "Copy Audio & Dialogue Prompt"}</span>
                  </button>
                </div>

                {/* Characters List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {short.characters.map((char, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-xs">{char.name}</h4>
                        <span className="text-[10px] text-amber-400 font-mono">{char.role}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">
                        {char.visualDescription}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        <strong className="text-neutral-300">Voice Mood: </strong> {char.voiceMood}
                      </p>
                      <p className="text-[11px] text-amber-400/90 italic">
                        &ldquo;{char.vocalPerformanceNotes}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dialogue Script Progression */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                    10-Second Dialogue Progression:
                  </span>
                  {short.dialogueScript.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3 text-xs"
                    >
                      <span className="px-2 py-0.5 rounded bg-neutral-800 font-mono text-[10px] text-amber-400 shrink-0">
                        {line.timeRange}
                      </span>
                      <div className="flex-1">
                        <span className="font-bold text-white mr-1.5">{line.speaker}:</span>
                        <span className="text-neutral-200">&ldquo;{line.text}&rdquo;</span>
                        <span className="text-[10px] text-neutral-400 block mt-0.5 font-mono">
                          Delivery Direction: {line.mood} (British young female voice delivery)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Overlay & YouTube Shorts Safe Zone Layout Guidelines */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Embedded Text Overlay & YouTube 9:16 Safe Zones
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Protects YouTube Title & Description
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold block mb-1">
                      0-3s Hook Text:
                    </span>
                    <p className="font-bold text-white uppercase">{short.textOverlay.hookText}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block mb-1">
                      3-7s Escalation Text:
                    </span>
                    <p className="font-bold text-white uppercase">{short.textOverlay.escalationText}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                      7-10s Punchline Text:
                    </span>
                    <p className="font-bold text-white uppercase">{short.textOverlay.punchlineText}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-1">
                  <p className="text-neutral-300">
                    <strong className="text-amber-400 font-mono">Safe Position: </strong>
                    {short.textOverlay.safeZonePosition}
                  </p>
                  <p className="text-neutral-300">
                    <strong className="text-amber-400 font-mono">Backdrop Style: </strong>
                    {short.textOverlay.styleGuide} (A neutral matte backing guarantees crisp contrast and legibility without clashing with YouTube&apos;s UI).
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {short.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-400 text-[11px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
