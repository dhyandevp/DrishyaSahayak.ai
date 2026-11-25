import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { Footer } from '@/components/layout/Footer';

export function SubpageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <FloatingNavbar />

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1100px] px-4 py-10 focus:outline-none sm:px-6 sm:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to home</span>
          </Link>
        </div>

        <header className="paper-grain rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-sky-solid)] p-7 shadow-[var(--shadow-card)] sm:p-12">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-primary)] uppercase">
            {eyebrow}
          </p>
          <h1 className="font-serif-display mt-3 text-3xl leading-[1.1] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[var(--fg-secondary)] sm:text-lg">
            {subtitle}
          </p>
        </header>

        <div className="mt-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
