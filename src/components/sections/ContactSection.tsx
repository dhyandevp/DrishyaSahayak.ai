'use client';

import React from 'react';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { LINKS } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            CONTACT
          </p>
          <h2
            id="contact-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Get in touch with us
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Questions about setting up Drishya Sahayak V1, accessibility feedback, or partnership inquiries—write anytime.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="paper-grain flex flex-col justify-between rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-peach)] p-7 shadow-[var(--shadow-card)] sm:p-10">
            <div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif-display text-3xl font-medium text-[var(--fg-primary)]">
                    Drishya Sahayak Labs
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
                    Built in Kannur, Kerala by Lead Developer &amp; Founder Dhyandev P. We welcome accessibility testers, Python contributors, and community organizations.
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2.5">
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--cta-primary-fg)] shadow-sm transition-transform hover:-translate-y-0.5 sm:text-sm"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Email us</span>
                  </a>
                  <a
                    href={LINKS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Kannur, Kerala, India in Google Maps (opens in a new tab)"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card-inner)] px-4 py-2 text-xs font-semibold text-[var(--fg-primary)] shadow-sm transition-transform hover:-translate-y-0.5 sm:text-sm"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[var(--fg-primary)]" aria-hidden="true" />
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Email
                    </dt>
                  </div>
                  <dd className="mt-2 text-sm font-semibold text-[var(--fg-primary)]">
                    <a
                      href={`mailto:${LINKS.email}`}
                      className="break-all underline-offset-4 hover:underline"
                    >
                      {LINKS.email}
                    </a>
                  </dd>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[var(--fg-primary)]" aria-hidden="true" />
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Phone
                    </dt>
                  </div>
                  <dd className="tabular mt-2 text-sm font-semibold text-[var(--fg-primary)]">
                    <a href={LINKS.phoneHref} className="underline-offset-4 hover:underline">
                      {LINKS.phone}
                    </a>
                  </dd>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--fg-primary)]" aria-hidden="true" />
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Location
                    </dt>
                  </div>
                  <dd className="mt-2 text-sm font-semibold text-[var(--fg-primary)]">
                    {LINKS.address}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
