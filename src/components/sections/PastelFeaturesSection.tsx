'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Clock,
  CloudSun,
  Eye,
  FileText,
  HelpCircle,
  MessageCircle,
  Mic,
  ScanText,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { FeatureCardContent, PASTEL_FEATURES } from '@/content';
import { useSmoothScroll } from '@/components/ui/SmoothScrollProvider';

/**
 * Tweakable parameters for the stacked card deck.
 * - baseTopDesktop / topStepDesktop: sticky `top` offsets on >= 768px (84px, 104px, 124px, 144px)
 * - baseTopMobile / topStepMobile: tighter sticky `top` offsets on < 768px (68px, 78px, 88px, 98px)
 * - buriedScale: target scale when a card is covered by the next card (1 -> 0.94)
 * - buriedDimOpacity: scrim opacity (0 -> 0.10) for subtle ~0.9 brightness dimming
 * - buriedRotationDeg: alternating tilt in degrees on desktop (disabled on mobile)
 * - slotSpacerVh: scroll travel distance between cards; tailSpacerVh: release travel after KNOW
 */
export const STACK_CONFIG = {
  baseTopDesktop: 84,
  topStepDesktop: 20,
  baseTopMobile: 68,
  topStepMobile: 10,
  buriedScale: 0.94,
  buriedDimOpacity: 0.1,
  buriedRotationDeg: 1.4,
  slotSpacerVh: 52,
  tailSpacerVh: 28,
} as const;

const CARD_THEMES: Record<
  FeatureCardContent['tone'],
  { bg: string; pill: string; accent: string; dot: string }
> = {
  periwinkle: {
    bg: 'bg-[var(--pastel-periwinkle)]',
    pill: 'bg-[var(--pastel-periwinkle-pill)]',
    accent: 'text-[var(--fg-primary)]',
    dot: 'bg-[var(--pastel-periwinkle)]',
  },
  mint: {
    bg: 'bg-[var(--pastel-mint)]',
    pill: 'bg-[var(--pastel-mint-pill)]',
    accent: 'text-[var(--fg-primary)]',
    dot: 'bg-[var(--pastel-mint)]',
  },
  peach: {
    bg: 'bg-[var(--pastel-peach)]',
    pill: 'bg-[var(--pastel-peach-pill)]',
    accent: 'text-[var(--fg-primary)]',
    dot: 'bg-[var(--pastel-peach)]',
  },
  butter: {
    bg: 'bg-[var(--pastel-butter)]',
    pill: 'bg-[var(--pastel-butter-pill)]',
    accent: 'text-[var(--fg-primary)]',
    dot: 'bg-[var(--pastel-butter)]',
  },
};

const YOLO_DETECTIONS = [
  { label: 'Wooden Desk', score: '0.88' },
  { label: 'Open Laptop', score: '0.94' },
  { label: 'Ceramic Tea Cup', score: '0.91' },
] as const;

const READ_VOICE_TEXT =
  '“Prescription label: Take one tablet after breakfast. Follow-up check on Friday morning.”';

interface PreviewProps {
  localProgress: MotionValue<number>;
  reducedMotion: boolean;
}

function SeeMiniPreview({ localProgress, reducedMotion }: PreviewProps) {
  const row0Opacity = useTransform(localProgress, [0.02, 0.2], [0, 1]);
  const row0Y = useTransform(localProgress, [0.02, 0.2], [14, 0]);
  const row1Opacity = useTransform(localProgress, [0.16, 0.34], [0, 1]);
  const row1Y = useTransform(localProgress, [0.16, 0.34], [14, 0]);
  const row2Opacity = useTransform(localProgress, [0.3, 0.48], [0, 1]);
  const row2Y = useTransform(localProgress, [0.3, 0.48], [14, 0]);

  const geminiOpacity = useTransform(localProgress, [0.48, 0.78], [0, 1]);
  const geminiY = useTransform(localProgress, [0.48, 0.78], [36, 0]);

  const rowAnimations = [
    { opacity: row0Opacity, y: row0Y },
    { opacity: row1Opacity, y: row1Y },
    { opacity: row2Opacity, y: row2Y },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[490px] pt-2 pb-4">
      {/* Background stacked window */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-5 shadow-md sm:mr-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          </div>
          <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--fg-secondary)]">
            YOLOv8 Local Objects
          </span>
        </div>
        <ul className="space-y-2 text-xs text-[var(--fg-primary)]">
          {YOLO_DETECTIONS.map((item, idx) => (
            <motion.li
              key={item.label}
              style={
                reducedMotion
                  ? undefined
                  : {
                      opacity: rowAnimations[idx].opacity,
                      y: rowAnimations[idx].y,
                      willChange: 'transform, opacity',
                    }
              }
              className="flex items-center justify-between rounded-xl bg-[var(--bg-muted)] px-3 py-2"
            >
              <span className="font-medium">{item.label}</span>
              <span className="tabular font-mono-code text-[11px] font-semibold">
                {item.score}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Overlapping foreground scene summary card */}
      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                opacity: geminiOpacity,
                y: geminiY,
                willChange: 'transform, opacity',
              }
        }
        className="relative -mt-6 ml-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--pastel-peach-pill)] p-5 shadow-xl sm:ml-14"
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <Eye className="h-4 w-4" aria-hidden="true" />
          <span>Gemini 2.5 Flash Scene Description</span>
        </div>
        <p className="font-serif-display text-lg font-medium text-[var(--fg-primary)]">
          Desk Overview
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-secondary)]">
          &ldquo;Your laptop sits centered in front of you. A notebook rests slightly to the left, and a warm cup of tea is positioned safely near the right edge.&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[var(--fg-primary)]">
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Spoken aloud automatically</span>
        </div>
      </motion.div>
    </div>
  );
}

function ReadMiniPreview({ localProgress, reducedMotion }: PreviewProps) {
  const [typedCount, setTypedCount] = useState(
    reducedMotion ? READ_VOICE_TEXT.length : 0
  );

  const scanLineY = useTransform(localProgress, [0.06, 0.5], [0, 56]);
  const scanLineOpacity = useTransform(
    localProgress,
    [0.05, 0.14, 0.44, 0.54],
    [0, 1, 1, 0]
  );
  const readoutOpacity = useTransform(localProgress, [0.42, 0.6], [0.25, 1]);

  useMotionValueEvent(localProgress, 'change', (latest) => {
    if (reducedMotion) return;
    const ratio = Math.min(1, Math.max(0, (latest - 0.45) / 0.45));
    const nextCount = Math.round(ratio * READ_VOICE_TEXT.length);
    setTypedCount((prev) => (prev === nextCount ? prev : nextCount));
  });

  const visibleText = reducedMotion
    ? READ_VOICE_TEXT
    : READ_VOICE_TEXT.slice(0, typedCount);

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <ScanText className="h-4 w-4" aria-hidden="true" />
          <span>Handwritten Note</span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-muted)] p-3 text-xs leading-relaxed text-[var(--fg-secondary)] italic">
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{
                y: scanLineY,
                opacity: scanLineOpacity,
                willChange: 'transform, opacity',
              }}
              className="pointer-events-none absolute inset-x-0 top-1 h-0.5 bg-emerald-600/80 shadow-[0_0_8px_rgba(5,150,105,0.65)]"
            />
          )}
          &ldquo;Take 1 tablet after breakfast. Follow-up check on Friday morning.&rdquo;
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>Printed Document</span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--fg-secondary)]">
          Extracts headings, notices, receipts, and forms cleanly in reading order—even at slight camera angles.
        </p>
      </div>

      <motion.div
        style={
          reducedMotion
            ? undefined
            : { opacity: readoutOpacity, willChange: 'opacity' }
        }
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm sm:col-span-2"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-primary)]">
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            <span>Extracted Voice Readout</span>
          </span>
          <span className="rounded-full bg-[var(--pastel-mint-pill)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--fg-primary)]">
            &ldquo;Read text&rdquo;
          </span>
        </div>
        <p className="mt-2 min-h-[2.75rem] text-sm font-medium text-[var(--fg-primary)]">
          <span className="sr-only">{READ_VOICE_TEXT}</span>
          <span aria-hidden="true">{visibleText}</span>
        </p>
      </motion.div>
    </div>
  );
}

function TalkMiniPreview({ localProgress, reducedMotion }: PreviewProps) {
  const b0Opacity = useTransform(localProgress, [0.06, 0.3], [0, 1]);
  const b0Scale = useTransform(localProgress, [0.06, 0.3], [0.92, 1]);
  const b0Y = useTransform(localProgress, [0.06, 0.3], [16, 0]);

  const b1Opacity = useTransform(localProgress, [0.32, 0.58], [0, 1]);
  const b1Scale = useTransform(localProgress, [0.32, 0.58], [0.92, 1]);
  const b1Y = useTransform(localProgress, [0.32, 0.58], [16, 0]);

  const b2Opacity = useTransform(localProgress, [0.58, 0.85], [0, 1]);
  const b2Scale = useTransform(localProgress, [0.58, 0.85], [0.92, 1]);
  const b2Y = useTransform(localProgress, [0.58, 0.85], [16, 0]);

  const styleFor = (
    opacity: MotionValue<number>,
    scale: MotionValue<number>,
    y: MotionValue<number>
  ) =>
    reducedMotion
      ? undefined
      : { opacity, scale, y, willChange: 'transform, opacity' };

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-5 shadow-md">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Context-Aware Dialogue</span>
        </span>
        <span className="rounded-full bg-[var(--pastel-peach-pill)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--fg-primary)]">
          Memory Active
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <motion.div
          style={styleFor(b0Opacity, b0Scale, b0Y)}
          className="rounded-xl bg-[var(--bg-muted)] p-3"
        >
          <p className="text-[11px] font-bold tracking-wider text-[var(--fg-muted)] uppercase">
            You
          </p>
          <p className="mt-0.5 font-medium text-[var(--fg-primary)]">
            &ldquo;What is sitting beside the laptop?&rdquo;
          </p>
        </motion.div>

        <motion.div
          style={styleFor(b1Opacity, b1Scale, b1Y)}
          className="rounded-xl bg-[var(--pastel-periwinkle-pill)] p-3"
        >
          <p className="text-[11px] font-bold tracking-wider text-[var(--fg-primary)] uppercase">
            Drishya
          </p>
          <p className="mt-0.5 text-[var(--fg-primary)]">
            &ldquo;A closed blue notebook with a pen clipped to the cover.&rdquo;
          </p>
        </motion.div>

        <motion.div
          style={styleFor(b2Opacity, b2Scale, b2Y)}
          className="rounded-xl bg-[var(--bg-muted)] p-3"
        >
          <p className="text-[11px] font-bold tracking-wider text-[var(--fg-muted)] uppercase">
            You (follow-up)
          </p>
          <p className="mt-0.5 font-medium text-[var(--fg-primary)]">
            &ldquo;Can you read what is written on it?&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function KnowMiniPreview({ localProgress, reducedMotion }: PreviewProps) {
  const [minute, setMinute] = useState(reducedMotion ? 48 : 0);

  const weatherOpacity = useTransform(localProgress, [0.24, 0.56], [0, 1]);
  const weatherRotateX = useTransform(localProgress, [0.24, 0.56], [-28, 0]);
  const weatherY = useTransform(localProgress, [0.24, 0.56], [14, 0]);

  const qaOpacity = useTransform(localProgress, [0.48, 0.84], [0, 1]);
  const qaRotateX = useTransform(localProgress, [0.48, 0.84], [-28, 0]);
  const qaY = useTransform(localProgress, [0.48, 0.84], [18, 0]);

  useMotionValueEvent(localProgress, 'change', (latest) => {
    if (reducedMotion) return;
    const ratio = Math.min(1, Math.max(0, (latest - 0.06) / 0.46));
    const nextMin = Math.round(ratio * 48);
    setMinute((prev) => (prev === nextMin ? prev : nextMin));
  });

  const formattedTime = `06:${String(reducedMotion ? 48 : minute).padStart(2, '0')} AM`;

  return (
    <div
      className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
      style={{ perspective: '900px' }}
    >
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>Time & Date</span>
        </div>
        <div className="rounded-xl bg-[var(--pastel-sky-solid)] p-3">
          <p className="tabular text-lg font-bold text-[var(--fg-primary)]">
            <span className="sr-only">06:48 AM</span>
            <span aria-hidden="true">{formattedTime}</span>
          </p>
          <p className="text-xs font-medium text-[var(--fg-secondary)]">
            Wednesday, 25 Nov
          </p>
        </div>
      </div>

      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                opacity: weatherOpacity,
                rotateX: weatherRotateX,
                y: weatherY,
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
              }
        }
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm"
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <CloudSun className="h-4 w-4" aria-hidden="true" />
          <span>Local Weather</span>
        </div>
        <p className="text-xs font-semibold text-[var(--fg-primary)]">
          &ldquo;In Kannur, 29°C and partly cloudy with a gentle coastal breeze.&rdquo;
        </p>
      </motion.div>

      <motion.div
        style={
          reducedMotion
            ? undefined
            : {
                opacity: qaOpacity,
                rotateX: qaRotateX,
                y: qaY,
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
              }
        }
        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 shadow-sm sm:col-span-2"
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--fg-primary)]">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
          <span>General Knowledge</span>
        </div>
        <p className="text-xs text-[var(--fg-secondary)]">
          <strong className="text-[var(--fg-primary)]">You:</strong> &ldquo;Who is Louis Braille?&rdquo;
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--fg-primary)]">
          <strong className="text-[var(--fg-primary)]">Drishya:</strong> &ldquo;Louis Braille was a French educator who created the tactile six-dot Braille reading system.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}

const PREVIEW_COMPONENTS = {
  SEE: SeeMiniPreview,
  READ: ReadMiniPreview,
  TALK: TalkMiniPreview,
  KNOW: KnowMiniPreview,
} as const;

const HIGHLIGHT_ICONS = {
  SEE: [Eye, Sparkles, Volume2, BookOpen],
  READ: [FileText, ScanText, BookOpen, Volume2],
  TALK: [MessageCircle, Sparkles, Mic, Volume2],
  KNOW: [Clock, CloudSun, HelpCircle, Mic],
} as const;

interface StackedCardProps {
  feature: FeatureCardContent;
  index: number;
  total: number;
  sectionProgress: MotionValue<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  onFocusCard: (index: number) => void;
}

function StackedFeatureCard({
  feature,
  index,
  total,
  sectionProgress,
  reducedMotion,
  isMobile,
  onFocusCard,
}: StackedCardProps) {
  const theme = CARD_THEMES[feature.tone];
  const Preview = PREVIEW_COMPONENTS[feature.eyebrow];
  const icons = HIGHLIGHT_ICONS[feature.eyebrow];
  const previewFirst = feature.layout === 'preview-left';

  const segSize = 1 / total;
  const activeStart = index * segSize;
  const activeEnd = (index + 1) * segSize;
  const isLast = index === total - 1;

  // Local 0 -> 1 progress for the inner mockup animations while this card is active
  const localProgress = useTransform(
    sectionProgress,
    [activeStart, Math.min(1, activeEnd - segSize * 0.12)],
    [0, 1]
  );

  // Depth transforms as the *next* card covers this card
  const coverStart = activeEnd - segSize * 0.18;
  const coverEnd = Math.min(1, activeEnd + segSize * 0.15);

  const scale = useTransform(
    sectionProgress,
    [coverStart, coverEnd],
    [1, isLast ? 1 : STACK_CONFIG.buriedScale]
  );
  const dimOpacity = useTransform(
    sectionProgress,
    [coverStart, coverEnd],
    [0, isLast ? 0 : STACK_CONFIG.buriedDimOpacity]
  );
  const targetRotate =
    isLast || isMobile
      ? 0
      : (index % 2 === 0 ? -1 : 1) * STACK_CONFIG.buriedRotationDeg;
  const rotate = useTransform(
    sectionProgress,
    [coverStart, coverEnd],
    [0, targetRotate]
  );

  const stickyTop = isMobile
    ? STACK_CONFIG.baseTopMobile + index * STACK_CONFIG.topStepMobile
    : STACK_CONFIG.baseTopDesktop + index * STACK_CONFIG.topStepDesktop;

  const zIndexClass = ['z-10', 'z-20', 'z-30', 'z-40'][index] ?? 'z-10';

  return (
    <motion.article
      id={feature.id}
      aria-labelledby={`${feature.id}-title`}
      style={
        reducedMotion
          ? undefined
          : {
              position: 'sticky',
              top: `${stickyTop}px`,
              scale,
              rotate,
              transformOrigin: 'top center',
              willChange: 'transform',
            }
      }
      className={`paper-grain relative overflow-hidden rounded-[32px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] ${theme.bg} p-6 shadow-[var(--shadow-card)] sm:p-10 lg:p-14 ${
        reducedMotion ? '' : zIndexClass
      }`}
    >
      {/* GPU-friendly brightness dim scrim when buried */}
      {!reducedMotion && !isLast && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: dimOpacity, willChange: 'opacity' }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[32px] bg-black"
        />
      )}

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Preview Side (stacks under text on mobile) */}
        <div
          className={`lg:col-span-6 ${
            previewFirst ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
          }`}
        >
          <Preview localProgress={localProgress} reducedMotion={reducedMotion} />
        </div>

        {/* Copy Side */}
        <div
          className={`lg:col-span-6 ${
            previewFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
          }`}
        >
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-primary)] uppercase">
            {feature.eyebrow}
          </p>
          <h3
            id={`${feature.id}-title`}
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.02em] text-[var(--fg-primary)] sm:text-[2.55rem]"
          >
            {feature.headline}
          </h3>
          <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-[var(--fg-secondary)]">
            {feature.description}
          </p>

          <div className="mt-6">
            <Link
              href={feature.ctaHref}
              onFocus={() => onFocusCard(index)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-subtle)] ${theme.pill} px-5 py-2.5 text-sm font-semibold text-[var(--fg-primary)] shadow-sm transition-transform hover:-translate-y-0.5`}
            >
              <span>{feature.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2">
            {feature.highlights.map((item, idx) => {
              const ItemIcon = icons[idx];
              return (
                <div key={item.label} className="flex items-start gap-2.5">
                  <ItemIcon
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--fg-primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-semibold text-[var(--fg-primary)]">
                      {item.label}
                    </dt>
                    <dd className="text-xs leading-snug text-[var(--fg-secondary)]">
                      {item.detail}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </motion.article>
  );
}

export function PastelFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { scrollTo } = useSmoothScroll();

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const fallbackProgress = useMotionValue(1);
  const effectiveProgress = prefersReducedMotion
    ? fallbackProgress
    : scrollYProgress;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    const total = PASTEL_FEATURES.length;
    const idx = Math.min(
      total - 1,
      Math.max(0, Math.floor(latest * total + 0.12))
    );
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const scrollToTile = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
    const targetProgress = Math.min(
      0.96,
      index / PASTEL_FEATURES.length + 0.08
    );
    const targetY =
      index === 0 ? sectionTop - 64 : sectionTop + targetProgress * scrollable;
    scrollTo(targetY, { duration: 0.9 });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-label="Core assistive features"
      className="relative mx-auto w-full max-w-[1260px] px-3 py-6 sm:px-6 sm:py-10"
    >
      {/* Right-side vertical progress indicator */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none sticky top-1/2 z-40 float-right hidden h-0 -translate-y-1/2 xl:block">
          <nav
            aria-label="Feature stack progress"
            className="pointer-events-auto -mr-14 flex flex-col items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-2 py-3 shadow-[var(--shadow-pill)] backdrop-blur-md"
          >
            {PASTEL_FEATURES.map((feature, idx) => {
              const isActive = activeIndex === idx;
              const theme = CARD_THEMES[feature.tone];
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => scrollToTile(idx)}
                  aria-label={`Jump to ${feature.eyebrow} feature`}
                  aria-current={isActive ? 'step' : undefined}
                  title={feature.eyebrow}
                  className="group flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                >
                  <span
                    className={`block rounded-full border border-[var(--border-strong)] transition-all duration-200 ${
                      isActive
                        ? `h-6 w-2.5 ${theme.dot}`
                        : 'h-2.5 w-2.5 bg-[var(--bg-muted)] group-hover:scale-125'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Stacked Cards Container */}
      <div
        className={
          prefersReducedMotion
            ? 'mx-auto max-w-[1220px] space-y-10 sm:space-y-14'
            : 'mx-auto max-w-[1220px]'
        }
      >
        {PASTEL_FEATURES.map((feature, idx) => (
          <React.Fragment key={feature.id}>
            <StackedFeatureCard
              feature={feature}
              index={idx}
              total={PASTEL_FEATURES.length}
              sectionProgress={effectiveProgress}
              reducedMotion={prefersReducedMotion}
              isMobile={isMobile}
              onFocusCard={scrollToTile}
            />
            {!prefersReducedMotion && (
              <div
                aria-hidden="true"
                style={{
                  height: `${
                    idx === PASTEL_FEATURES.length - 1
                      ? STACK_CONFIG.tailSpacerVh
                      : STACK_CONFIG.slotSpacerVh
                  }vh`,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
