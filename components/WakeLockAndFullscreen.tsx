"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff, Maximize, Minimize, ShieldCheck, Sun } from "lucide-react";

export function WakeLockAndFullscreen() {
  const [isWakeLocked, setIsWakeLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Request Wake Lock
  const requestWakeLock = useCallback(async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      return;
    }
    try {
      const sentinel = await (navigator as any).wakeLock.request("screen");
      setIsWakeLocked(true);

      sentinel.addEventListener("release", () => {
        setIsWakeLocked(false);
      });
    } catch (err: any) {
      console.warn("Wake Lock error:", err);
      setIsWakeLocked(false);
    }
  }, []);

  // Release Wake Lock
  const releaseWakeLock = useCallback(() => {
    setIsWakeLocked(false);
  }, []);

  // Initialize and enable Always-On screen lock prevention automatically as requested
  useEffect(() => {
    if (typeof window === "undefined" || !("wakeLock" in navigator)) {
      return;
    }

    const timer = setTimeout(() => {
      requestWakeLock();
    }, 0);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [requestWakeLock]);

  // Fullscreen detection & handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle error:", err);
    }
  };

  const toggleWakeLock = () => {
    if (isWakeLocked) {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* WakeLock Status Badge & Toggle */}
      <button
        onClick={toggleWakeLock}
        title={isWakeLocked ? "Screen lock disabled: Display stays awake" : "Click to enable Always-On Screen"}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
          isWakeLocked
            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25"
            : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-neutral-200"
        }`}
      >
        {isWakeLocked ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Always-On Active
            </span>
          </>
        ) : (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            <span>Enable Always-On</span>
          </>
        )}
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen Mode"}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-all shadow-sm"
      >
        {isFullscreen ? (
          <>
            <Minimize className="w-3.5 h-3.5 text-sky-400" />
            <span>Exit Fullscreen</span>
          </>
        ) : (
          <>
            <Maximize className="w-3.5 h-3.5 text-sky-400" />
            <span>Fullscreen Mode</span>
          </>
        )}
      </button>
    </div>
  );
}
