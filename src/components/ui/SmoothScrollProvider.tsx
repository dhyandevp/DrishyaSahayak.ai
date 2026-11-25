'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

interface SmoothScrollContextValue {
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: (target, options) => {
    if (typeof window === 'undefined') return;
    if (typeof target === 'number') {
      window.scrollTo({ top: target + (options?.offset ?? 0), behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  },
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [contextValue] = useState<SmoothScrollContextValue>(() => ({
    scrollTo: (target, options) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.0,
        });
        return;
      }
      if (typeof window === 'undefined') return;
      if (typeof target === 'number') {
        window.scrollTo({ top: target + (options?.offset ?? 0), behavior: 'auto' });
      } else if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({ behavior: 'auto' });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    },
  }));

  useEffect(() => {
    if (shouldReduceMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    }

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
