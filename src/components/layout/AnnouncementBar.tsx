'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ANNOUNCEMENT } from '@/content';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';

export function AnnouncementBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[1260px] px-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] pb-1.5 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2.5 sm:flex-row sm:items-center">
        {/* Left: Star on GitHub Announcement pill */}
        <a
          href={ANNOUNCEMENT.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ANNOUNCEMENT.text} (opens in a new tab)`}
          className="group inline-flex min-h-[34px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[#111318] px-3.5 py-1 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#20242e] sm:text-[13px]"
        >
          <motion.span
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex text-[#9FD4FA]"
          >
            <Sparkles className="h-3.5 w-3.5" />
          </motion.span>
          <span>{ANNOUNCEMENT.text}</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Right: Accessibility Controls aligned to the right edge */}
        <div className="flex items-center">
          <AccessibilityControls />
        </div>
      </div>
    </div>
  );
}
