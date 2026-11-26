'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowRight, Camera, Cpu, Mic, Sparkles } from 'lucide-react';
import { HOW_IT_WORKS, PipelineStep } from '@/content';

/**
 * Tweakable parameters for the "How it works" fan-out pipeline.
 * - scrollLengthDesktopVh: total pinned scroll length on tablet/desktop (150–200vh)
 * - scrollLengthMobileVh: shorter pinned scroll length on mobile (< 768px)
 * - startScale: starting scale of the collapsed card stack (~0.6)
 * - fanRotationsDeg: starting fan rotation per card on tablet/desktop (0deg on mobile)
 */
export const PIPELINE_CONFIG = {
  scrollLengthDesktopVh: 185,
  scrollLengthMobileVh: 130,
  startScale: 0.6,
  fanRotationsDeg: [-6, -2, 2, 6] as const,
} as const;

const STEP_TONES: Record<PipelineStep['tone'], string> = {
  sky: 'bg-[var(--pastel-sky-solid)]',
  periwinkle: 'bg-[var(--pastel-periwinkle)]',
  mint: 'bg-[var(--pastel-mint)]',
  peach: 'bg-[var(--pastel-peach)]',
};

const STEP_ICONS = [Camera, Cpu, Sparkles, Mic] as const;

interface CardOffset {
  x: number;
  y: number;
}

const ZERO_OFFSETS: CardOffset[] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

interface PipelineCardProps {
  step: PipelineStep;
  index: number;
  startOffset: CardOffset;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  isLast: boolean;
  setCardRef: (el: HTMLLIElement | null) => void;
}

function PipelineCard({
  step,
  index,
  startOffset,
  progress,
  reducedMotion,
  isMobile,
  isLast,
  setCardRef,
}: PipelineCardProps) {
  const Icon = STEP_ICONS[index];

  // Cards fan out from exact container center [0.04 -> 0.48]
  const cardX = useTransform(progress, [0.04, 0.48], [startOffset.x, 0]);
  const cardY = useTransform(progress, [0.04, 0.48], [startOffset.y, 0]);
  const cardScale = useTransform(
    progress,
    [0.04, 0.48],
    [PIPELINE_CONFIG.startScale, 1]
  );
  const startRotate = isMobile ? 0 : PIPELINE_CONFIG.fanRotationsDeg[index];
  const cardRotate = useTransform(progress, [0.04, 0.48], [startRotate, 0]);

  // Content staggers in as cards fan out so all 4 cards are 100% visible well before unpinning
  const isTopCard = index === 0;
  const contentBase = 0.24 + index * 0.04;

  const pillOpacity = useTransform(
    progress,
    [contentBase, contentBase + 0.1],
    [isTopCard ? 1 : 0, 1]
  );
  const pillY = useTransform(
    progress,
    [contentBase, contentBase + 0.1],
    [isTopCard ? 0 : 8, 0]
  );

  const iconOpacity = useTransform(
    progress,
    [contentBase + 0.04, contentBase + 0.14],
    [isTopCard ? 1 : 0, 1]
  );
  const iconScale = useTransform(
    progress,
    [contentBase + 0.04, contentBase + 0.11, contentBase + 0.16],
    [isTopCard ? 1 : 0.6, isTopCard ? 1 : 1.1, 1]
  );

  const copyOpacity = useTransform(
    progress,
    [contentBase + 0.08, contentBase + 0.2],
    [isTopCard ? 1 : 0, 1]
  );
  const copyY = useTransform(
    progress,
    [contentBase + 0.08, contentBase + 0.2],
    [isTopCard ? 0 : 12, 0]
  );

  // Gap arrow button: scales in left-to-right after cards land, then pulses once
  const arrowInStart = 0.5 + index * 0.06;
  const arrowInEnd = arrowInStart + 0.09;
  const pulseStart = 0.72 + index * 0.03;
  const arrowScale = useTransform(
    progress,
    [arrowInStart, arrowInEnd, pulseStart, pulseStart + 0.04, pulseStart + 0.08],
    [0, 1, 1, 1.24, 1]
  );
  const arrowOpacity = useTransform(
    progress,
    [arrowInStart, arrowInEnd],
    [0, 1]
  );

  // Keep Step 01 on top of the collapsed stack (z-14 -> z-11) so only its content shows
  const stackZClass = ['z-[14]', 'z-[13]', 'z-[12]', 'z-[11]'][index] ?? 'z-10';

  return (
    <li
      ref={setCardRef}
      className={`relative flex flex-col ${reducedMotion ? '' : stackZClass}`}
    >
      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                x: cardX,
                y: cardY,
                scale: cardScale,
                rotate: cardRotate,
                willChange: 'transform',
              }
        }
        className={`paper-grain flex h-full flex-col justify-between rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] ${STEP_TONES[step.tone]} p-6 shadow-sm`}
      >
        <div>
          <div className="flex items-center justify-between">
            <motion.span
              style={
                reducedMotion
                  ? undefined
                  : {
                      opacity: pillOpacity,
                      y: pillY,
                      willChange: 'transform, opacity',
                    }
              }
              className="tabular font-mono-code rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] px-3 py-1 text-xs font-bold text-[var(--fg-primary)]"
            >
              Step {step.stepNumber}
            </motion.span>
            <motion.span
              style={
                reducedMotion
                  ? undefined
                  : {
                      opacity: iconOpacity,
                      scale: iconScale,
                      willChange: 'transform, opacity',
                    }
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </div>

          <motion.div
            style={
              reducedMotion
                ? undefined
                : {
                    opacity: copyOpacity,
                    y: copyY,
                    willChange: 'transform, opacity',
                  }
            }
          >
            <h3 className="font-serif-display mt-6 text-2xl font-medium text-[var(--fg-primary)]">
              {step.title}
            </h3>
            <p className="mt-1 text-xs font-semibold tracking-wide text-[var(--fg-primary)] uppercase">
              {step.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)]">
              {step.detail}
            </p>
          </motion.div>
        </div>

        {!isLast && (
          <motion.div
            aria-hidden="true"
            style={
              reducedMotion
                ? undefined
                : {
                    opacity: arrowOpacity,
                    scale: arrowScale,
                    willChange: 'transform, opacity',
                  }
            }
            className="mt-5 flex items-center justify-end text-[var(--fg-primary)] lg:hidden"
          >
            <ArrowDown className="h-4 w-4 md:hidden" />
            <ArrowRight className="hidden h-4 w-4 md:block" />
          </motion.div>
        )}
      </motion.div>

      {!isLast && (
        <motion.div
          aria-hidden="true"
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: arrowOpacity,
                  scale: arrowScale,
                  willChange: 'transform, opacity',
                }
          }
          className="pointer-events-none absolute top-1/2 -right-3.5 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1.5 text-[var(--fg-primary)] shadow-sm lg:flex"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.div>
      )}
    </li>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);
  const [startOffsets, setStartOffsets] = useState<CardOffset[]>(ZERO_OFFSETS);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const centerX = grid.offsetWidth / 2;
      const centerY = grid.offsetHeight / 2;

      const nextOffsets = HOW_IT_WORKS.map((_, idx) => {
        const card = cardRefs.current[idx];
        if (!card) return { x: 0, y: 0 };
        const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
        const cardCenterY = card.offsetTop + card.offsetHeight / 2;
        return {
          x: Math.round(centerX - cardCenterX),
          y: Math.round(centerY - cardCenterY),
        };
      });

      setStartOffsets(nextOffsets);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end 70%'],
  });

  const fallbackProgress = useMotionValue(1);
  const effectiveProgress = prefersReducedMotion
    ? fallbackProgress
    : scrollYProgress;

  // Intro text fades up slightly before the cards start moving
  const introOpacity = useTransform(effectiveProgress, [0, 0.12], [0.72, 1]);
  const introY = useTransform(effectiveProgress, [0, 0.12], [12, 0]);

  // Thin connecting line draws behind cards left-to-right
  const lineScaleX = useTransform(effectiveProgress, [0.42, 0.64], [0, 1]);

  const scrollHeightVh = isMobile
    ? PIPELINE_CONFIG.scrollLengthMobileVh
    : PIPELINE_CONFIG.scrollLengthDesktopVh;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      style={
        prefersReducedMotion ? undefined : { minHeight: `${scrollHeightVh}svh` }
      }
      className="relative z-10 mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <div
        className={
          prefersReducedMotion
            ? ''
            : 'sticky top-20 flex flex-col justify-center py-4 sm:top-24'
        }
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: introOpacity,
                  y: introY,
                  willChange: 'transform, opacity',
                }
          }
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            HOW IT WORKS
          </p>
          <h2
            id="how-it-works-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            From camera frame to spoken clarity
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Four clear stages work together so everyday object detection stays immediate while deeper visual understanding leverages Gemini 2.5 Flash.
          </p>
        </motion.div>

        <div className="relative mt-10 sm:mt-12">
          {/* Thin background data-flow line (desktop row) */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{
                scaleX: lineScaleX,
                transformOrigin: 'left center',
                willChange: 'transform',
              }}
              className="pointer-events-none absolute top-1/2 right-8 left-8 z-0 hidden h-px -translate-y-1/2 bg-[var(--border-strong)] lg:block"
            />
          )}

          <ol
            ref={gridRef}
            className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {HOW_IT_WORKS.map((step, idx) => (
              <PipelineCard
                key={step.stepNumber}
                step={step}
                index={idx}
                startOffset={startOffsets[idx] ?? { x: 0, y: 0 }}
                progress={effectiveProgress}
                reducedMotion={prefersReducedMotion}
                isMobile={isMobile}
                isLast={idx === HOW_IT_WORKS.length - 1}
                setCardRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
