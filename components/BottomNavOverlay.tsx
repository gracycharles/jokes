"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { ShortPrompt } from "@/lib/shorts-data";

interface BottomNavOverlayProps {
  shorts: ShortPrompt[];
  onSelectPrompt?: (short: ShortPrompt) => void;
}

export function BottomNavOverlay({ shorts }: BottomNavOverlayProps) {
  const [currentId, setCurrentId] = useState<number>(1);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll position to detect active prompt in viewport & show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 250);

      // Find visible prompt card
      for (const short of shorts) {
        const el = document.getElementById(`prompt-${short.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setCurrentId(short.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shorts]);

  const scrollToPrompt = (id: number) => {
    const target = document.getElementById(`prompt-${id}`);
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setCurrentId(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setCurrentId(1);
  };

  const currentIndex = shorts.findIndex((s) => s.id === currentId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const handlePrev = () => {
    if (safeIndex > 0) {
      scrollToPrompt(shorts[safeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (safeIndex < shorts.length - 1) {
      scrollToPrompt(shorts[safeIndex + 1].id);
    }
  };

  // Generate concise visible numbers around current prompt
  const total = shorts.length;
  const currentNum = shorts[safeIndex]?.id || 1;

  // Compute a concise range of numbers to show (e.g. 1, 2, 3...)
  const visibleNumbers: number[] = [];
  const start = Math.max(1, currentNum - 1);
  const end = Math.min(total, currentNum + 1);

  for (let i = start; i <= end; i++) {
    visibleNumbers.push(i);
  }

  if (shorts.length === 0) return null;

  return (
    <aside aria-label="Quick Navigation" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 select-none">
      
      {/* Concise Bottom Quick Navigation Bar */}
      <nav aria-label="Prompt navigation" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/95 border border-neutral-700/80 backdrop-blur-lg shadow-2xl shadow-black/80 ring-1 ring-white/10 text-xs">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={safeIndex === 0}
          aria-label="Previous Prompt"
          className="p-1 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Previous Prompt"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Quick Numbers (e.g., 1, 2, 3...) */}
        <div className="flex items-center gap-1 px-1">
          {start > 1 && (
            <>
              <button
                onClick={() => scrollToPrompt(1)}
                className={`w-6 h-6 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all ${
                  currentNum === 1
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                1
              </button>
              {start > 2 && <span className="text-neutral-600 text-[10px]">..</span>}
            </>
          )}

          {visibleNumbers.map((num) => (
            <button
              key={num}
              onClick={() => scrollToPrompt(num)}
              className={`w-6 h-6 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all ${
                currentNum === num
                  ? "bg-red-600 text-white shadow-sm ring-1 ring-red-400"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {num}
            </button>
          ))}

          {end < total && (
            <>
              {end < total - 1 && <span className="text-neutral-600 text-[10px]">..</span>}
              <button
                onClick={() => scrollToPrompt(total)}
                className={`w-6 h-6 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all ${
                  currentNum === total
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {total}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={safeIndex >= shorts.length - 1}
          aria-label="Next Prompt"
          className="p-1 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
          title="Next Prompt"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </nav>

      {/* Move to Top Icon Button */}
      <button
        onClick={scrollToTop}
        aria-label="Move to top"
        className={`p-2 rounded-full bg-neutral-900/95 border border-neutral-700/80 backdrop-blur-lg shadow-2xl shadow-black/80 ring-1 ring-white/10 text-neutral-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-75 scale-95"
        }`}
        title="Move to top"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

    </aside>
  );
}
