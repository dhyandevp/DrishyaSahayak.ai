'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CloudSun, Eye, FileText, MessageSquare, Mic } from 'lucide-react';
import { STATEMENT } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

const CAPABILITY_ICONS = {
  describe: Eye,
  read: FileText,
  ask: MessageSquare,
  'time-weather': CloudSun,
  'hands-free': Mic,
} as const;

export function StatementSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="product"
      aria-labelledby="statement-heading"
      className="mx-auto w-full max-w-[1040px] px-4 py-14 text-center sm:px-6 sm:py-20"
    >
      <Reveal>
        <h2
          id="statement-heading"
          className="font-serif-display mx-auto max-w-2xl text-3xl leading-[1.14] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
        >
          {STATEMENT.headline}
        </h2>
      </Reveal>

      <ul
        aria-label="Core daily capabilities"
        className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {STATEMENT.capabilities.map((cap, idx) => {
          const Icon = CAPABILITY_ICONS[cap.id];
          return (
            <motion.li
              key={cap.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.42,
                delay: shouldReduceMotion ? 0 : idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            >
              <span className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-medium text-[var(--fg-primary)] shadow-sm">
                <Icon className="h-4 w-4 text-[var(--fg-secondary)]" aria-hidden="true" />
                <span>{cap.label}</span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
