import React from 'react';
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

export function CommunitySection() {
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY_CARDS.map((card) => {
            const Icon = TILE_ICONS[card.id as keyof typeof TILE_ICONS] ?? Globe;
            return (
              <a
                key={card.id}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                aria-label={`${card.title}: ${card.handle}${card.external ? ' (opens in a new tab)' : ''}`}
                className={`group paper-grain flex flex-col justify-between rounded-[26px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] ${TILE_TONES[card.tone]} p-6 shadow-sm transition-transform hover:-translate-y-1`}
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
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
