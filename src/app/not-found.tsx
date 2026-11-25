import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <FloatingNavbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[820px] flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28"
      >
        <div className="paper-grain w-full rounded-[28px] border border-[var(--border-subtle)] bg-[var(--pastel-sky-solid)] p-10 shadow-[var(--shadow-card)] sm:p-14">
          <p className="tabular font-mono-code text-xs font-bold tracking-[0.16em] text-[var(--fg-primary)] uppercase">
            404 · PAGE NOT FOUND
          </p>
          <h1 className="font-serif-display mt-3 text-4xl font-medium tracking-[-0.02em] text-[var(--fg-primary)] sm:text-5xl">
            We couldn&apos;t locate that page
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-[var(--fg-secondary)]">
            Return to the Drishya Sahayak V1 home page or jump straight into the installation documentation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--cta-primary-fg)] hover:bg-[var(--cta-primary-hover)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-6 py-2.5 text-sm font-semibold text-[var(--fg-primary)] hover:bg-[var(--bg-muted)]"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Read Docs</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
