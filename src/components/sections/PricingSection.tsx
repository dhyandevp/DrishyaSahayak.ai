import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { PRICING } from '@/content';
import { DitheredCloud } from '@/components/ui/DitheredCloud';
import { Reveal } from '@/components/ui/MotionPrimitives';

export function PricingSection() {
  const { eyebrow, headline, subtitle, freeTier, glassesTier } = PRICING;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative mx-auto w-full max-w-[1140px] px-3 py-16 sm:px-6 sm:py-24"
    >
      <DitheredCloud
        direction="right"
        className="absolute top-0 right-4 w-56 opacity-75 sm:w-72"
      />

      <Reveal>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            {eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            {headline}
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">{subtitle}</p>
        </div>

        <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* White Free & Open Source Card (Craft Free card layout) */}
          <div className="flex flex-col justify-between rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-card)] sm:p-10">
            <div>
              <h3 className="font-serif-display text-3xl font-medium text-[var(--fg-primary)]">
                {freeTier.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
                {freeTier.description}
              </p>

              <div className="mt-8 flex items-baseline gap-2.5">
                <span className="tabular font-serif-display text-5xl font-medium text-[var(--fg-primary)]">
                  {freeTier.price}
                </span>
                <span className="text-sm font-medium text-[var(--fg-secondary)]">
                  / {freeTier.period}
                </span>
              </div>

              <div className="mt-7">
                <Link
                  href={freeTier.ctaHref}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[var(--cta-primary-bg)] px-7 py-2.5 text-sm font-semibold text-[var(--cta-primary-fg)] transition-colors hover:bg-[var(--cta-primary-hover)]"
                >
                  {freeTier.ctaLabel}
                </Link>
              </div>
            </div>

            <ul className="mt-8 space-y-3 border-t border-[var(--border-subtle)] pt-6">
              {freeTier.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-[var(--fg-secondary)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--fg-primary)]" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Black Glasses Edition Concept Card (Craft Plus black card layout) */}
          <div className="paper-grain flex flex-col justify-between rounded-[28px] border border-white/15 bg-[var(--surface-dark)] p-8 text-[var(--surface-dark-fg)] shadow-[var(--shadow-card)] sm:p-10">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif-display text-3xl font-medium text-white">
                  {glassesTier.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wider text-[#08080A] uppercase">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>{glassesTier.badge}</span>
                </span>
              </div>

              <p className="mt-3 text-base leading-relaxed text-[var(--surface-dark-muted)]">
                {glassesTier.description}
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-2.5">
                <span className="font-serif-display text-5xl font-medium text-white">
                  {glassesTier.price}
                </span>
                <span className="tabular text-sm font-medium text-[var(--surface-dark-muted)]">
                  / {glassesTier.period}
                </span>
              </div>

              <div className="mt-7">
                <Link
                  href={glassesTier.ctaHref}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-[#08080A] transition-colors hover:bg-slate-200"
                >
                  {glassesTier.ctaLabel}
                </Link>
              </div>
            </div>

            <ul className="mt-8 space-y-3 border-t border-white/15 pt-6">
              {glassesTier.features.map((feat) => (
                <li
                  key={feat}
                  className="flex items-start gap-2.5 text-sm text-[var(--surface-dark-muted)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
