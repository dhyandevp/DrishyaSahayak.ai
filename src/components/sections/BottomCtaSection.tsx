import React from 'react';
import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';
import { LINKS } from '@/content';
import { DitheredCloud } from '@/components/ui/DitheredCloud';
import { Reveal } from '@/components/ui/MotionPrimitives';
import { GitHubIcon } from '@/components/ui/SocialIcons';

export function BottomCtaSection() {
  return (
    <section
      id="download"
      aria-labelledby="bottom-cta-heading"
      className="mx-auto w-full max-w-[1380px] px-3 py-8 sm:px-6 sm:py-12"
    >
      <Reveal>
        <div className="cta-sky-gradient paper-grain relative overflow-hidden rounded-[28px] border border-[var(--border-subtle)] px-6 py-16 text-center shadow-[var(--shadow-card)] sm:rounded-[36px] sm:px-12 sm:py-24">
          <DitheredCloud
            direction="left"
            className="absolute top-6 -left-12 w-56 opacity-80 sm:w-72"
          />
          <DitheredCloud
            direction="right"
            className="absolute -right-12 bottom-4 w-56 opacity-80 sm:w-72"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2
              id="bottom-cta-heading"
              className="font-serif-display text-3xl leading-[1.1] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl lg:text-[3.35rem]"
            >
              Start for free. <span className="italic font-normal">No credit card required.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[var(--fg-secondary)] sm:text-lg">
              Clone Drishya Sahayak V1 under the MIT License, add your Gemini API key, and explore the world through voice.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="#quickstart"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-7 py-3 text-sm font-semibold text-[var(--cta-primary-fg)] shadow-[var(--shadow-pill)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--cta-primary-hover)] sm:text-base"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Free</span>
              </Link>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Drishya Sahayak on GitHub (opens in a new tab)"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-7 py-3 text-sm font-semibold text-[var(--fg-primary)] shadow-[var(--shadow-pill)] transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>View on GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-75" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
