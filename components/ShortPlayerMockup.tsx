"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShortPrompt } from "@/lib/shorts-data";
import {
  playTimedShortAudio,
  stopNarration,
  analyzeShortAudioTiming
} from "@/lib/audio-voice";
import {
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Layers,
  Camera,
  Film,
  Sun,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Sliders,
  ChevronRight,
  Volume2,
  VolumeX
} from "lucide-react";

interface ShortPlayerMockupProps {
  short: ShortPrompt;
  onOpenDetails?: () => void;
}

export function ShortPlayerMockup({ short, onOpenDetails }: ShortPlayerMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 10 seconds
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const audioTiming = analyzeShortAudioTiming(
    short.cleanJokeCore.setup,
    short.cleanJokeCore.punchline
  );

  const startVoiceAudio = () => {
    if (!isVoiceEnabled) return;
    setIsAudioSpeaking(true);
    playTimedShortAudio(
      short.cleanJokeCore.setup,
      short.cleanJokeCore.punchline,
      {
        onEnd: () => setIsAudioSpeaking(false),
        onError: () => setIsAudioSpeaking(false)
      }
    );
  };

  // Stop timer and audio on unmount or when short changes
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopNarration();
    };
  }, [short.id]);

  // Handle 10-second playback loop for scrubbing/animating the prompt timeline
  useEffect(() => {
    if (isPlaying) {
      const interval = 100; // 100ms ticks
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 10) {
            setIsPlaying(false);
            setIsAudioSpeaking(false);
            stopNarration();
            return 0;
          }
          return Math.min(10, +(prev + 0.1).toFixed(1));
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= 9.8 || currentTime === 0) {
        setCurrentTime(0);
        startVoiceAudio();
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setIsAudioSpeaking(false);
      stopNarration();
    }
  };

  const handleRestart = () => {
    stopNarration();
    setCurrentTime(0);
    setIsPlaying(true);
    startVoiceAudio();
  };

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      stopNarration();
      setIsAudioSpeaking(false);
      setIsVoiceEnabled(false);
    } else {
      setIsVoiceEnabled(true);
    }
  };

  const copyMasterPrompt = () => {
    navigator.clipboard.writeText(short.generatorCopyPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine current active text overlay based on 10s timeline
  const activeOverlay =
    currentTime < 3.5
      ? { text: short.textOverlay.hookText, tag: "0-3.5s SETUP & HOOK", beat: 1 }
      : currentTime < 6.5
      ? { text: short.textOverlay.escalationText, tag: "3.5-6.5s ESCALATION", beat: 2 }
      : { text: short.textOverlay.punchlineText, tag: "6.5-10.0s PUNCHLINE CLIMAX", beat: 3 };

  // Current active dialogue line based on time
  const currentDialogue = short.dialogueScript.find((d) => {
    const parts = d.timeRange.split("-").map((p) => p.trim());
    if (parts.length === 2) {
      const startSec = parseSeconds(parts[0]);
      const endSec = parseSeconds(parts[1]);
      return currentTime >= startSec && currentTime <= endSec;
    }
    return false;
  }) || short.dialogueScript[0];

  function parseSeconds(timeStr: string): number {
    const match = timeStr.match(/(\d+):(\d+)/);
    if (match) {
      return parseInt(match[1], 10) * 60 + parseFloat(match[2]);
    }
    const num = parseFloat(timeStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* 9:16 Vertical Prompt & Layout Viewport Container */}
      <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 border border-neutral-800 select-none flex flex-col justify-between p-4">
        
        {/* Background Grid & Framing Crosshairs */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full border border-red-500/30 grid grid-cols-3 grid-rows-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="border border-neutral-700/30" />
            ))}
          </div>
          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-t border-b border-red-500/60 flex items-center justify-center">
            <div className="w-0.5 h-8 bg-red-500/60" />
          </div>
        </div>

        {/* TOP BAR: Aspect Ratio & Safe Zone Tag */}
        <div className="relative z-20 flex items-center justify-between text-[11px] pt-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md">
            <Film className="w-3 h-3 text-red-500" />
            <span className="font-mono font-bold text-white tracking-wider">9:16 VERTICAL</span>
          </div>
          <button
            onClick={() => setShowSafeZones(!showSafeZones)}
            className={`px-2 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
              showSafeZones
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-neutral-900/80 text-neutral-400 border-neutral-800"
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Safe Zones {showSafeZones ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* MIDDLE SECTION: Upper Safe Zone Text Overlay (15% to 45% Y) */}
        <div className="relative z-20 flex-1 flex flex-col justify-center py-2">
          
          {/* Upper Safe Zone Guide Box */}
          <div
            className={`transition-all duration-300 p-3 rounded-2xl ${
              showSafeZones
                ? "border-2 border-dashed border-amber-500/40 bg-neutral-900/70 backdrop-blur-sm shadow-lg shadow-amber-500/5"
                : "bg-neutral-900/40"
            }`}
          >
            {showSafeZones && (
              <div className="flex items-center justify-between text-[9px] font-mono text-amber-400 font-bold mb-2 uppercase tracking-wider">
                <span>Safe Zone Overlay (15%-45% Y)</span>
                <span>{activeOverlay.tag}</span>
              </div>
            )}

            {/* Embedded Text Overlay on Neutral Matte Container */}
            <div className="p-3 rounded-xl bg-neutral-950/95 border border-neutral-700 shadow-xl text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block font-mono">
                Embedded On-Screen Text
              </span>
              <p className="text-sm font-black tracking-tight text-white uppercase leading-snug drop-shadow-md">
                {activeOverlay.text}
              </p>
            </div>

            {/* Visual Metaphor Beat Callout */}
            <div className="mt-2.5 p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[10px] text-neutral-300 flex items-start gap-1.5">
              <Sparkles className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-purple-300 font-semibold">Visual Beat: </strong>
                <span>{short.visualMetaphor}</span>
              </div>
            </div>
          </div>

          {/* Current Camera Motion & Voice Prompt Preview */}
          <div className="mt-3 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[10px] space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-[9px]">
              <span className="flex items-center gap-1 text-sky-400 font-bold">
                <Camera className="w-3 h-3" />
                CAMERA PROMPT
              </span>
              <span className="text-amber-400 font-bold">BEAT {activeOverlay.beat} OF 3</span>
            </div>
            <p className="text-neutral-200 text-[10px] leading-tight line-clamp-2">
              {short.cameraAngle}
            </p>
          </div>

          {/* Audio Dialogue Prompt Preview (British Young Female Delivery) */}
          <div className="mt-2 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[10px] space-y-1 backdrop-blur-sm">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-[9px]">
              <span className="text-rose-400 font-bold">AUDIO PROMPT: BRITISH VOICE</span>
              <span className="text-neutral-400">{currentDialogue?.timeRange}</span>
            </div>
            <p className="text-white text-[11px] font-semibold italic">
              &ldquo;{currentDialogue?.text}&rdquo;
            </p>
            <span className="text-[9px] text-neutral-400 block">
              Character: {currentDialogue?.speaker} • Mood: {currentDialogue?.mood}
            </span>
          </div>

        </div>

        {/* BOTTOM SECTION: YouTube Danger Zone (Bottom 22%) */}
        <div className="relative z-20">
          <div
            className={`p-2.5 rounded-xl transition-all ${
              showSafeZones
                ? "bg-red-950/40 border border-red-500/30 text-red-200"
                : "bg-neutral-900/60 border border-neutral-800 text-neutral-400"
            }`}
          >
            <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase">
              <span className="flex items-center gap-1 text-red-400">
                <AlertTriangle className="w-3 h-3" />
                YT Protected Danger Zone (Bottom 22%)
              </span>
              <span className="text-[8px] bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">NO TEXT</span>
            </div>
            <p className="text-[9px] text-neutral-400 mt-1 leading-tight">
              Reserved for YouTube UI: Channel avatar, video title, subscribe CTA, sound disc & comments.
            </p>
          </div>
        </div>

      </div>

      {/* 10-Second Timeline Navigation & Director Controls */}
      <div className="w-full max-w-[340px] mt-4 space-y-3">
        
        {/* Playback Scrubbing Bar */}
        <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-amber-400 font-bold">
              {currentTime.toFixed(1)}s / 10.0s
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
              {currentTime < 3.5 ? "Beat 1: Setup" : currentTime < 6.5 ? "Beat 2: Escalation" : "Beat 3: Climax Payoff"}
            </span>
          </div>

          {/* Timeline Slider */}
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={currentTime}
            onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />

          {/* Timeline Beats Indicator */}
          <div className="grid grid-cols-3 gap-1 pt-1">
            <button
              onClick={() => setCurrentTime(1.5)}
              className={`py-1 text-[9px] font-mono rounded font-bold transition-colors ${
                currentTime < 3.5
                  ? "bg-red-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              0-3.5s SETUP
            </button>
            <button
              onClick={() => setCurrentTime(5.0)}
              className={`py-1 text-[9px] font-mono rounded font-bold transition-colors ${
                currentTime >= 3.5 && currentTime < 6.5
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              3.5-6.5s ESCALATE
            </button>
            <button
              onClick={() => setCurrentTime(8.5)}
              className={`py-1 text-[9px] font-mono rounded font-bold transition-colors ${
                currentTime >= 6.5
                  ? "bg-amber-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              6.5-10s PAYOFF
            </button>
          </div>

          {/* Controls: Play/Pause, Voice Toggle & Reset */}
          <div className="flex items-center justify-between pt-1 gap-2">
            <button
              onClick={togglePlay}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current text-green-400" />
              )}
              <span>{isPlaying ? "Pause" : "Play 10s Preview"}</span>
            </button>

            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                isVoiceEnabled
                  ? "bg-rose-950/60 text-rose-300 border-rose-500/40 hover:bg-rose-900/60"
                  : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white"
              }`}
              title={isVoiceEnabled ? "Voice narration enabled (plays on timeline start)" : "Voice muted"}
            >
              {isVoiceEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
              )}
              <span className="text-[11px]">{isVoiceEnabled ? "Voice ON" : "Voice OFF"}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
              title="Reset to 0.0s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio Timing Fit Verification Meter */}
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1 text-emerald-400 font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Audio: {audioTiming.totalEstimatedDuration}s / 10s</span>
            </div>
            <span className="text-[9px] text-neutral-400 font-mono">
              Setup: {audioTiming.estimatedSetupDuration}s • Payoff: {audioTiming.estimatedPunchlineDuration}s
            </span>
          </div>

        </div>

        {/* 1-Click Copy Master Generator Prompt */}
        <button
          onClick={copyMasterPrompt}
          className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied Video Generator Prompt!" : "Copy Video Generator Prompt"}</span>
        </button>

      </div>
    </div>
  );
}
