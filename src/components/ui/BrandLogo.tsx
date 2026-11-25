import React from 'react';
import { SITE_META } from '@/content';

export function BrandLogo({
  inverted = false,
  size = 'md',
}: {
  inverted?: boolean;
  size?: 'sm' | 'md';
}) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={size === 'sm' ? 24 : 28}
        height={size === 'sm' ? 24 : 28}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="36"
          height="36"
          rx="10"
          fill={inverted ? '#FFFFFF' : 'var(--cta-primary-bg)'}
        />
        <path
          d="M7.5 18C10.8 12.6 14.3 10 18 10C21.7 10 25.2 12.6 28.5 18C25.2 23.4 21.7 26 18 26C14.3 26 10.8 23.4 7.5 18Z"
          stroke={inverted ? '#111318' : 'var(--cta-primary-fg)'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="18"
          cy="18"
          r="3.8"
          fill={inverted ? '#111318' : 'var(--cta-primary-fg)'}
        />
        <circle
          cx="18"
          cy="18"
          r="1.4"
          fill={inverted ? '#FFFFFF' : 'var(--cta-primary-bg)'}
        />
      </svg>
      <span
        className={`font-serif-display translate-y-[0.05em] whitespace-nowrap leading-none font-semibold tracking-tight ${
          size === 'sm' ? 'text-base sm:text-lg' : 'text-xl'
        } ${inverted ? 'text-white' : 'text-[var(--fg-primary)]'}`}
      >
        {SITE_META.brandWordmark}
      </span>
    </span>
  );
}
