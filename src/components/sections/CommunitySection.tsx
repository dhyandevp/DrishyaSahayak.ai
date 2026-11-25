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
import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { COMMUNITY_CARDS, CommunityCard } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';
import { GitHubIcon, YouTubeIcon } from '@/components/ui/SocialIcons';

const TILE_TONES: Record<CommunityCard['tone'], string> = {
  periwinkle: 'bg-[var(--pastel-periwinkle)]',
  peach: 'bg-[var(--pastel-peach)]',
  mint: 'bg-[var(--pastel-mint)]',
  butter: 'bg-[var(--pastel-butter)]',
};

const TILE_ICONS = {
  github: GitHubIcon,
  youtube: YouTubeIcon,
  linktree: Globe,
  email: Mail,
} as const;

const FAN_ANGLES = [-4, -1.5, 1.5, 4] as const;

interface CommunityTileProps {
  card: CommunityCard;
  index: number;
  startOffset: { x: number; y: number };
  progress: MotionValue<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  setRef: (el: HTMLAnchorElement | null) => void;
}

function CommunityTile({
  card,
  index,
  startOffset,
  progress,
  reducedMotion,
  isMobile,
  setRef,
}: CommunityTileProps) {
  const Icon = TILE_ICONS[card.id as keyof typeof TILE_ICONS] ?? Globe;

  const x = useTransform(progress, [0, 1], [startOffset.x * 0.72, 0]);
  const y = useTransform(progress, [0, 1], [startOffset.y * 0.72 + 16, 0]);
  const scale = useTransform(progress, [0, 1], [0.84, 1]);
  const rotate = useTransform(
    progress,
    [0, 1],
    [isMobile ? 0 : FAN_ANGLES[index], 0]
  );
  const opacity = useTransform(progress, [0, 0.45], [0.55, 1]);

  return (
    <motion.a
      ref={setRef}
      href={card.href}
      target={card.external ? '_blank' : undefined}
      rel={card.external ? 'noopener noreferrer' : undefined}
      aria-label={`${card.title}: ${card.handle}${card.external ? ' (opens in a new tab)' : ''}`}
      style={
        reducedMotion
          ? undefined
          : {
              x,
              y,
              scale,
              rotate,
              opacity,
              willChange: 'transform, opacity',
            }
      }
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className={`group paper-grain flex flex-col justify-between rounded-[26px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] ${TILE_TONES[card.tone]} p-6 shadow-sm`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <ArrowUpRight
            className="h-5 w-5 text-[var(--fg-primary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        <h3 className="font-serif-display mt-6 text-2xl font-medium text-[var(--fg-primary)]">
          {card.title}
        </h3>
        <p className="mt-1 text-xs font-semibold break-words text-[var(--fg-primary)]">
          {card.handle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)]">
          {card.description}
        </p>
      </div>

      <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-[var(--fg-primary)] uppercase underline-offset-4 group-hover:underline">
        {card.ctaLabel}
      </span>
    </motion.a>
  );
}

export function CommunitySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    COMMUNITY_CARDS.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (shouldReduceMotion) return;

    const measure = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cx = grid.offsetWidth / 2;
      const cy = grid.offsetHeight / 2;
      setOffsets(
        COMMUNITY_CARDS.map((_, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return { x: 0, y: 0 };
          return {
            x: Math.round(cx - (el.offsetLeft + el.offsetWidth / 2)),
            y: Math.round(cy - (el.offsetTop + el.offsetHeight / 2)),
          };
        })
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 92%', 'center 58%'],
  });

  const fallbackProgress = useMotionValue(1);
  const progress = shouldReduceMotion ? fallbackProgress : scrollYProgress;

  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            COMMUNITY
          </p>
          <h2
            id="community-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Open code, open conversation
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Star the project on GitHub, watch the V1 walkthrough film, or connect directly with the creator.
          </p>
        </div>
      </Reveal>

      <div
        ref={gridRef}
        className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {COMMUNITY_CARDS.map((card, idx) => (
          <CommunityTile
            key={card.id}
            card={card}
            index={idx}
            startOffset={offsets[idx] ?? { x: 0, y: 0 }}
            progress={progress}
            reducedMotion={shouldReduceMotion}
            isMobile={isMobile}
            setRef={(el) => {
              cardRefs.current[idx] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
