'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const BAR_HEIGHTS = [0.42, 0.78, 1.0, 0.64, 0.88, 0.52, 0.94, 0.7, 0.45, 0.82, 0.6];

export function VoiceWaveform({
  active = true,
  label = 'Audio waveform indicator',
  barClassName = 'bg-[var(--fg-primary)]',
}: {
  active?: boolean;
  label?: string;
  barClassName?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-7 items-center gap-1"
    >
      {BAR_HEIGHTS.map((ratio, idx) => {
        const minH = Math.round(ratio * 10) + 4;
        const maxH = Math.round(ratio * 24) + 4;
        return (
          <motion.span
            key={idx}
            className={`w-1 rounded-full ${barClassName}`}
            initial={{ height: active ? minH : 6 }}
            animate={
              active && !shouldReduceMotion
                ? {
                    height: [minH, maxH, Math.max(6, Math.round(minH * 0.8))],
                  }
                : { height: active ? maxH * 0.68 : 6 }
            }
            transition={
              active && !shouldReduceMotion
                ? {
                    duration: 0.9 + (idx % 4) * 0.14,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: idx * 0.05,
                  }
                : { duration: 0.2 }
            }
          />
        );
      })}
    </div>
  );
}

export function CopyButton({
  value,
  label = 'Copy command',
  className = '',
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { announce } = useAccessibility();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      announce(`Copied ${label} to clipboard`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      announce('Clipboard copy unavailable');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={`inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--fg-primary)] transition-colors hover:bg-[var(--bg-muted)] ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
