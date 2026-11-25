import React from 'react';
import { MISSION_QUOTE } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';
import { Users } from 'lucide-react';

export function MissionQuoteSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="mx-auto w-full max-w-[980px] px-4 py-16 text-center sm:px-6 sm:py-24"
    >
      <Reveal>
        <p
          id="mission-heading"
          className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase"
        >
          {MISSION_QUOTE.eyebrow}
        </p>

        <blockquote className="mt-6">
          <p className="font-serif-display text-2xl leading-[1.3] font-normal tracking-[-0.02em] text-[var(--fg-primary)] sm:text-4xl lg:text-[2.65rem]">
            &ldquo;{MISSION_QUOTE.quoteBefore}
            <em className="italic">{MISSION_QUOTE.quoteItalicOne}</em>
            {MISSION_QUOTE.quoteMiddle}
            <em className="italic">{MISSION_QUOTE.quoteItalicTwo}</em>
            {MISSION_QUOTE.quoteAfter}&rdquo;
          </p>

          <footer className="mt-8 flex flex-col items-center justify-center gap-3">
            <div>
              <p className="text-base font-semibold text-[var(--fg-primary)]">
                {MISSION_QUOTE.author}
              </p>
              <p className="text-sm text-[var(--fg-secondary)]">
                {MISSION_QUOTE.role} · {MISSION_QUOTE.organization}
              </p>
            </div>

            {/* Collaborators recognition badge */}
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 shadow-sm">
              <Users className="h-3.5 w-3.5 text-[var(--fg-muted)]" aria-hidden="true" />
              <span className="text-xs font-medium text-[var(--fg-secondary)]">
                Collaborators:{' '}
                <strong className="font-semibold text-[var(--fg-primary)]">
                  {MISSION_QUOTE.collaborators.map((c) => c.name).join(' & ')}
                </strong>
              </span>
            </div>
          </footer>
        </blockquote>
      </Reveal>
    </section>
  );
}
