import React from 'react';
import Link from 'next/link';
import { Globe, Link2, Mail } from 'lucide-react';
import { FOOTER_COLUMNS, LINKS, SITE_META } from '@/content';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { GitHubIcon, YouTubeIcon } from '@/components/ui/SocialIcons';

export function Footer() {
  const socialLinks = [
    {
      label: 'Drishya Sahayak GitHub repository',
      href: LINKS.github,
      icon: GitHubIcon,
      external: true,
    },
    {
      label: 'Drishya Sahayak YouTube demo film',
      href: LINKS.demoFilm,
      icon: YouTubeIcon,
      external: true,
    },
    {
      label: 'Developer links (links.dhyandev.sbs)',
      href: LINKS.linktree,
      icon: Link2,
      external: true,
    },
    {
      label: 'Developer website (dhyandev.sbs)',
      href: LINKS.website,
      icon: Globe,
      external: true,
    },
    {
      label: 'Email developer',
      href: `mailto:${LINKS.email}`,
      icon: Mail,
      external: false,
    },
  ];

  return (
    <footer className="mx-auto w-full max-w-[1380px] px-3 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-10">
      <div className="paper-grain overflow-hidden rounded-[28px] border border-white/10 bg-[var(--surface-dark)] px-6 py-12 text-[var(--surface-dark-fg)] sm:px-10 sm:py-16 lg:px-14">
        {/* Top Wordmark Row */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-white/15 pb-8 sm:flex-row sm:items-center">
          <BrandLogo inverted />
          <p className="max-w-md text-sm text-[var(--surface-dark-muted)]">
            {SITE_META.meaning} · Free, open-source Python desktop software under the{' '}
            <span className="font-semibold text-white">{SITE_META.license} License</span>.
          </p>
        </div>

        {/* 6 Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 border-b border-white/15 pb-2.5 text-xs font-bold tracking-wider text-white uppercase">
                {col.title}
              </h2>
              <ul className="space-y-2.5">
                {col.links.map((item) => {
                  const isExternal = 'external' in item && item.external;
                  return (
                    <li key={item.label}>
                      {isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[28px] items-center text-sm text-[var(--surface-dark-muted)] transition-colors hover:text-white"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="inline-flex min-h-[28px] items-center text-sm text-[var(--surface-dark-muted)] transition-colors hover:text-white"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center">
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-medium text-white">
              {SITE_META.copyright} MIT License.
            </p>
            <p className="text-[var(--surface-dark-muted)]">{SITE_META.creatorCredit}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5" aria-label="Social and community links">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={external ? `${label} (opens in a new tab)` : label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/5 text-white transition-colors hover:bg-white hover:text-[#08080A]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
