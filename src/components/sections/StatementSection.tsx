import React from 'react';
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

        <ul
          aria-label="Core daily capabilities"
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {STATEMENT.capabilities.map((cap) => {
            const Icon = CAPABILITY_ICONS[cap.id];
            return (
              <li key={cap.id}>
                <span className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-2.5 text-sm font-medium text-[var(--fg-primary)] shadow-sm">
                  <Icon className="h-4 w-4 text-[var(--fg-secondary)]" aria-hidden="true" />
                  <span>{cap.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
