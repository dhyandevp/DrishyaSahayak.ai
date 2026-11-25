'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import { MotionConfig } from 'framer-motion';

export type TextScale = 'normal' | 'large' | 'xlarge';

interface A11yPrefs {
  highContrast: boolean;
  textScale: TextScale;
}

interface AccessibilityContextValue extends A11yPrefs {
  announcement: string;
  toggleHighContrast: () => void;
  cycleTextScale: () => void;
  setTextScale: (scale: TextScale) => void;
  announce: (msg: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const STORAGE_KEY = 'drishya-a11y-prefs-v2';
const SERVER_SNAPSHOT: A11yPrefs = {
  highContrast: false,
  textScale: 'normal',
};

let cachedClientSnapshot: A11yPrefs | null = null;
const listeners = new Set<() => void>();

function readInitialPrefs(): A11yPrefs {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<A11yPrefs>;
      return {
        highContrast: Boolean(parsed.highContrast),
        textScale:
          parsed.textScale === 'large' || parsed.textScale === 'xlarge'
            ? parsed.textScale
            : 'normal',
      };
    }
    return {
      highContrast: window.matchMedia('(prefers-contrast: more)').matches,
      textScale: 'normal',
    };
  } catch {
    return SERVER_SNAPSHOT;
  }
}

function getClientSnapshot(): A11yPrefs {
  if (!cachedClientSnapshot) {
    cachedClientSnapshot = readInitialPrefs();
  }
  return cachedClientSnapshot;
}

function getServerSnapshot(): A11yPrefs {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function updatePrefs(updater: (prev: A11yPrefs) => A11yPrefs) {
  const prev = getClientSnapshot();
  const next = updater(prev);
  cachedClientSnapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage restriction errors
  }
  listeners.forEach((listener) => listener());
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const prefs = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [announcement, setAnnouncement] = useState('');

  // Always enforce white/light mode cleanly on the root document
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = 'light';
    root.dataset.contrast = prefs.highContrast ? 'high' : 'standard';
    root.dataset.textScale = prefs.textScale;
  }, [prefs]);

  const announce = useCallback((msg: string) => {
    setAnnouncement('');
    window.requestAnimationFrame(() => {
      setAnnouncement(msg);
    });
  }, []);

  const toggleHighContrast = useCallback(() => {
    const nextHC = !getClientSnapshot().highContrast;
    updatePrefs((prev) => ({ ...prev, highContrast: nextHC }));
    announce(nextHC ? 'High contrast mode enabled' : 'High contrast mode disabled');
  }, [announce]);

  const setTextScale = useCallback(
    (scale: TextScale) => {
      updatePrefs((prev) => ({ ...prev, textScale: scale }));
      const labels: Record<TextScale, string> = {
        normal: 'Standard text size (100%)',
        large: 'Large text size (112%)',
        xlarge: 'Extra large text size (125%)',
      };
      announce(labels[scale]);
    },
    [announce]
  );

  const cycleTextScale = useCallback(() => {
    const order: TextScale[] = ['normal', 'large', 'xlarge'];
    const idx = order.indexOf(getClientSnapshot().textScale);
    const next = order[(idx + 1) % order.length];
    setTextScale(next);
  }, [setTextScale]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast: prefs.highContrast,
        textScale: prefs.textScale,
        announcement,
        toggleHighContrast,
        cycleTextScale,
        setTextScale,
        announce,
      }}
    >
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return ctx;
}
