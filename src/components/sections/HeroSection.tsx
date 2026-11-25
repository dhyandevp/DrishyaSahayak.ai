'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Play } from 'lucide-react';
import { HERO } from '@/content';
import { DitheredCloud } from '@/components/ui/DitheredCloud';
import { TornPaperCollage } from '@/components/ui/TornPaperCollage';
import { AppWindowMockup } from '@/components/ui/AppWindowMockup';
import { WatchFilmModal } from './WatchFilmModal';

export function HeroSection() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-[1380px] px-3 pt-2 pb-10 sm:px-6 sm:pb-16"
    >
      <div className="hero-sky-gradient paper-grain relative overflow-hidden rounded-[28px] border border-[var(--border-subtle)] px-4 pt-10 pb-10 shadow-[var(--shadow-card)] sm:rounded-[36px] sm:px-10 sm:pt-14 sm:pb-14 lg:px-16 lg:pt-16">
        {/* Decorative Dithered Clouds */}
        <DitheredCloud
          direction="left"
          intensity="medium"
          className="absolute top-12 -left-16 w-64 sm:-left-10 sm:w-80 lg:w-96"
        />
        <DitheredCloud
          direction="right"
          intensity="medium"
          className="absolute top-20 -right-16 w-64 sm:-right-8 sm:w-80 lg:w-96"
        />

        {/* Faint Outline Display Watermark behind Headline (Craft signature) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-32 flex justify-center overflow-hidden opacity-25 select-none [[data-contrast='high']_&]:hidden"
        >
          <svg
            viewBox="0 0 1100 180"
            className="w-full max-w-[1050px]"
            fill="none"
          >
            <text
              x="50%"
              y="142"
              textAnchor="middle"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              fontSize="148"
              fontWeight="700"
              letterSpacing="12"
              className="font-sans text-[#111318] dark:text-white"
            >
              DRISHYA
            </text>
          </svg>
        </div>

        {/* Center Hero Typography & Pill CTAs */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            id="hero-heading"
            className="font-serif-display text-[2.65rem] leading-[1.06] font-medium tracking-[-0.03em] text-[var(--fg-primary)] sm:text-[4rem] lg:text-[4.85rem]"
          >
            {HERO.headlinePrimary}{' '}
            <span className="italic font-normal">{HERO.headlineItalic}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[60ch] text-base leading-relaxed font-normal text-[var(--fg-secondary)] sm:text-lg">
            {HERO.subline}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              id="hero-download-cta"
              href="#quickstart"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-7 py-3 text-sm font-semibold text-[var(--cta-primary-fg)] shadow-[var(--shadow-pill)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--cta-primary-hover)] sm:text-base"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>{HERO.primaryCta}</span>
            </Link>

            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/92 px-7 py-3 text-sm font-semibold text-[var(--fg-primary)] shadow-[var(--shadow-pill)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--bg-surface)] sm:text-base"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{HERO.secondaryCta}</span>
            </button>
          </div>
        </div>

        {/* Torn Paper Collage Framing Lower Edge */}
        <TornPaperCollage />

        {/* Desktop Tkinter App Mockup Overlapping Lower Hero */}
        <div className="relative z-10 mt-10 sm:mt-14">
          <AppWindowMockup />
        </div>
      </div>

      <WatchFilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </section>
  );
}
