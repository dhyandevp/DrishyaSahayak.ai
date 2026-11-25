'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Cloud, ShieldCheck, Zap } from 'lucide-react';
import { HYBRID_EXPLAINER } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

export function HybridExplainerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 88%', 'center 52%'],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-24, 0]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [1.5, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.65], [0.45, 1]);
  const bannerY = useTransform(scrollYProgress, [0.3, 1], [18, 0]);
  const bannerOpacity = useTransform(scrollYProgress, [0.3, 1], [0.3, 1]);

  return (
    <section
      id="hybrid"
      aria-labelledby="hybrid-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            {HYBRID_EXPLAINER.eyebrow}
          </p>
          <h2
            id="hybrid-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            {HYBRID_EXPLAINER.headline}
          </h2>
        </div>
      </Reveal>

      <div ref={containerRef}>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Offline Column */}
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: leftX,
                    rotate: leftRotate,
                    opacity: cardOpacity,
                    willChange: 'transform, opacity',
                  }
            }
            className="paper-grain rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-mint)] p-7 shadow-[var(--shadow-card)] sm:p-9"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] px-3.5 py-1 text-xs font-bold text-[var(--fg-primary)]">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{HYBRID_EXPLAINER.offline.badge}</span>
            </span>
            <h3 className="font-serif-display mt-5 text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl">
              {HYBRID_EXPLAINER.offline.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
              {HYBRID_EXPLAINER.offline.description}
            </p>
            <ul className="mt-6 space-y-3">
              {HYBRID_EXPLAINER.offline.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium text-[var(--fg-primary)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Online Column */}
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: rightX,
                    rotate: rightRotate,
                    opacity: cardOpacity,
                    willChange: 'transform, opacity',
                  }
            }
            className="paper-grain rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-periwinkle)] p-7 shadow-[var(--shadow-card)] sm:p-9"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] px-3.5 py-1 text-xs font-bold text-[var(--fg-primary)]">
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{HYBRID_EXPLAINER.online.badge}</span>
            </span>
            <h3 className="font-serif-display mt-5 text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl">
              {HYBRID_EXPLAINER.online.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
              {HYBRID_EXPLAINER.online.description}
            </p>
            <ul className="mt-6 space-y-3">
              {HYBRID_EXPLAINER.online.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium text-[var(--fg-primary)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Honest Privacy Banner */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: bannerY,
                  opacity: bannerOpacity,
                  willChange: 'transform, opacity',
                }
          }
          className="mt-6 flex items-start gap-3.5 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:px-7 sm:py-5"
        >
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0 text-[var(--fg-primary)]"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-[var(--fg-secondary)]">
            <strong className="font-semibold text-[var(--fg-primary)]">Transparent data flow: </strong>
            {HYBRID_EXPLAINER.privacyNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
