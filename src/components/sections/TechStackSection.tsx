import React from 'react';
import { Code2, Eye, LayoutTemplate, Mic, Sparkles, Volume2 } from 'lucide-react';
import { TECH_STACK } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

const STACK_ICONS = [
  Code2,
  LayoutTemplate,
  Eye,
  Sparkles,
  Mic,
  Volume2,
] as const;

export function TechStackSection() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            ARCHITECTURE
          </p>
          <h2
            id="architecture-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Built on an open Python stack
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Simple enough to inspect and hack on in Python 3.10+, modular enough to extend across new sensors and speech engines.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((item, idx) => {
            const Icon = STACK_ICONS[idx];
            return (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-[24px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] text-[var(--fg-primary)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-3 py-1 text-[11px] font-semibold text-[var(--fg-primary)]">
                      {item.execution}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                    {item.category}
                  </p>
                  <h3 className="font-serif-display mt-1 text-2xl font-medium text-[var(--fg-primary)]">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-secondary)]">
                    {item.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
