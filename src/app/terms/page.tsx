import type { Metadata } from 'next';
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { LINKS, SITE_META } from '@/content';
import { SubpageShell } from '@/components/sections/SubpageShell';

export const metadata: Metadata = {
  title: 'Terms of Use & Safety Notice',
  description:
    'MIT License terms and essential safe-use guidelines for Drishya Sahayak V1 assistive visual software.',
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'article',
    title: 'Terms of Use & Safety Notice | Drishya Sahayak',
    description:
      'MIT License terms and essential safe-use boundaries for Drishya Sahayak V1 assistive visual software.',
    url: '/terms',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Drishya Sahayak Terms and Safety Notice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use & Safety Notice | Drishya Sahayak',
    description:
      'MIT License terms and essential safe-use boundaries for Drishya Sahayak V1 assistive visual software.',
    images: ['/og-image.png'],
  },
};

export default function TermsPage() {
  return (
    <SubpageShell
      eyebrow="TERMS OF USE & SAFETY"
      title="Safe use & open-source MIT terms"
      subtitle="Please read these essential safety boundaries before using Drishya Sahayak V1 in daily life."
    >
      <div className="max-w-[74ch] space-y-8">
        <div
          role="note"
          aria-label="Critical mobility and safety warning"
          className="rounded-[24px] border-2 border-[var(--border-strong)] bg-[var(--pastel-peach)] p-6 text-[var(--fg-primary)] shadow-sm sm:p-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-serif-display text-2xl font-medium">
                Visual Aid Only — Not a Replacement for a Cane, Guide Dog, or Human Guide
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
                Drishya Sahayak V1 is an assistive software companion designed to describe objects, read visible text, and answer spoken questions. It is <strong>not</strong> a medical device, certified mobility instrument, or safety-critical navigation system. Never rely on Drishya Sahayak instead of a white cane, guide dog, orientation and mobility training, or human guidance. Always exercise caution when walking, crossing streets, using stairs, or handling hot or sharp objects.
              </p>
            </div>
          </div>
        </div>

        <article className="space-y-8 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-sm sm:p-10">
          <section>
            <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
              1. AI Accuracy & Verification
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
              Object bounding boxes (YOLOv8), scene descriptions, and OCR text recognition (Gemini 2.5 Flash) depend on camera focus, lighting conditions, network availability, and probabilistic AI models. AI systems can misidentify objects, miss hazards outside the camera frame, or misread blurred text. Double-check critical details such as medication dosages, expiry dates, allergies, and financial figures with trusted human assistance or tactile verification.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
              2. MIT License
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
              {SITE_META.name} source code is released under the{' '}
              <a
                href={`${LINKS.github}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--fg-primary)] underline underline-offset-4"
              >
                MIT License
              </a>
              . You are free to use, copy, modify, merge, publish, and distribute the software in accordance with that license.
            </p>
            <p className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-4 text-sm leading-relaxed text-[var(--fg-secondary)]">
              THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY ARISING FROM THE USE OF THE SOFTWARE.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
              3. Hardware Roadmap & Waitlist Disclaimer
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
              References to the Raspberry Pi 5 wearable smart-glasses edition describe an early research concept only. Any projected build cost (such as ₹20,667 est.) is an early hardware estimate only and does not constitute a purchase, reservation contract, or shipping guarantee.
            </p>
          </section>

          <section className="border-t border-[var(--border-subtle)] pt-6">
            <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
              4. Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
              Drishya Sahayak ·{' '}
              <a
                href={`mailto:${LINKS.email}`}
                className="font-semibold text-[var(--fg-primary)] underline underline-offset-4"
              >
                {LINKS.email}
              </a>
            </p>
          </section>
        </article>
      </div>
    </SubpageShell>
  );
}
