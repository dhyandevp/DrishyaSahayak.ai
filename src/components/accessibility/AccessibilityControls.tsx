'use client';

import React from 'react';
import { Contrast, Type } from 'lucide-react';
import { useAccessibility } from './AccessibilityProvider';

export function AccessibilityControls({ compact = false }: { compact?: boolean }) {
  const { highContrast, textScale, toggleHighContrast, cycleTextScale } =
    useAccessibility();

  const scaleLabel =
    textScale === 'normal' ? '100%' : textScale === 'large' ? '112%' : '125%';

  return (
    <div
      role="region"
      aria-label="Display and accessibility options"
      className={`inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-1 text-xs font-medium text-[var(--fg-primary)] shadow-sm sm:gap-1.5 sm:px-2.5 ${
        compact ? 'w-full justify-between' : ''
      }`}
    >
      <button
        type="button"
        onClick={cycleTextScale}
        aria-label={`Increase text size. Current size: ${scaleLabel}. Activate to cycle sizes.`}
        className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:bg-[var(--bg-muted)]"
      >
        <Type className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>Text size</span>
        <span className="tabular rounded-full bg-[var(--bg-muted)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--fg-secondary)]">
          {scaleLabel}
        </span>
      </button>

      <span className="h-3.5 w-px bg-[var(--border-subtle)]" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label="Toggle high contrast mode"
        className={`inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
          highContrast
            ? 'bg-[var(--cta-primary-bg)] text-[var(--cta-primary-fg)] font-semibold'
            : 'hover:bg-[var(--bg-muted)] text-[var(--fg-secondary)]'
        }`}
      >
        <Contrast className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>High contrast</span>
      </button>
    </div>
  );
}
