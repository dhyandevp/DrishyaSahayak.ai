'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Menu, X } from 'lucide-react';
import { NAVBAR } from '@/content';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';

export function FloatingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-[calc(0.5rem+env(safe-area-inset-top,0px))] z-50 mx-auto w-full max-w-[1260px] px-3 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className="flex items-center justify-between gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 px-4 py-2 shadow-[var(--shadow-pill)] backdrop-blur-md [[data-contrast='high']_&]:bg-[var(--bg-surface)] [[data-contrast='high']_&]:backdrop-blur-none sm:px-6"
      >
        <Link
          href="/"
          aria-label="Drishya Sahayak Home"
          className="inline-flex min-h-[44px] items-center rounded-full py-1 pr-2 transition-opacity hover:opacity-85"
        >
          <BrandLogo size="sm" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAVBAR.links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex min-h-[38px] items-center rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--fg-primary)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={NAVBAR.ghostLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Drishya Sahayak source code on GitHub (opens in a new tab)"
            className="hidden min-h-[38px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)] sm:inline-flex"
          >
            <span>{NAVBAR.ghostLink.label}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-75" aria-hidden="true" />
          </a>

          <Link
            href={NAVBAR.primaryCta.href}
            className="inline-flex min-h-[38px] items-center justify-center whitespace-nowrap rounded-full bg-[var(--cta-primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--cta-primary-fg)] transition-colors hover:bg-[var(--cta-primary-hover)] sm:min-h-[40px] sm:px-5 sm:text-sm"
          >
            {NAVBAR.primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Accessible Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] lg:hidden"
        >
          <ul className="space-y-1">
            {NAVBAR.links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center rounded-xl px-3.5 py-2 text-base font-medium text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={NAVBAR.ghostLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2 text-base font-medium text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)]"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">
            <p className="mb-2 text-xs font-semibold tracking-wider text-[var(--fg-muted)] uppercase">
              Accessibility Options
            </p>
            <AccessibilityControls compact />
          </div>
        </div>
      )}
    </header>
  );
}
