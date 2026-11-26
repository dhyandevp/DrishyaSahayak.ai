import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { LINKS } from '@/content';
import { SubpageShell } from '@/components/sections/SubpageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Transparent breakdown of on-device processing vs Google Gemini cloud AI for Drishya Sahayak V1.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'article',
    title: 'Privacy Policy | Drishya Sahayak',
    description:
      'Transparent data handling breakdown for Drishya Sahayak V1 on-device detection and Google Gemini cloud AI.',
    url: '/privacy',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Drishya Sahayak Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Drishya Sahayak',
    description:
      'Transparent data handling breakdown for Drishya Sahayak V1 on-device detection and Google Gemini cloud AI.',
    images: ['/og-image.png'],
  },
};

export default function PrivacyPage() {
  return (
    <SubpageShell
      eyebrow="PRIVACY POLICY"
      title="Honest transparency on how your data moves"
      subtitle="Drishya Sahayak V1 uses a hybrid on-device and cloud design. Here is a clear breakdown of what stays on your computer and what is sent to Google Gemini."
    >
      <article className="max-w-[74ch] space-y-8 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-sm sm:p-10">
        <section>
          <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
            1. What runs on your device
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            Offline text-to-speech (<code className="font-mono-code text-sm">pyttsx3</code>) and real-time YOLOv8 object detection execute directly on your own computer. When you check the current system time or trigger immediate app controls such as &ldquo;Stop&rdquo; or &ldquo;Exit&rdquo;, processing stays on your machine with instant spoken feedback.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
            2. What is sent to Google Gemini (Cloud AI)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            Scene descriptions (&ldquo;Describe&rdquo; / &ldquo;Look around&rdquo;), optical character recognition (&ldquo;Read text&rdquo; / &ldquo;Scan this&rdquo;), and general-knowledge or conversational questions are sent over HTTPS directly from your desktop client to Google Gemini 2.5 Flash using your own personal <code className="font-mono-code text-sm">GEMINI_API_KEY</code>. Because cloud AI vision and OCR rely on Google&apos;s servers, Drishya Sahayak is a hybrid assistant—avoid pointing the camera at sensitive financial credentials, passwords, or private documents you do not wish processed by the Gemini API.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            Any requests made through your API key are governed by Google&apos;s Gemini API Terms of Service and privacy practices associated with your Google AI Studio account.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
            3. No central Drishya Sahayak telemetry servers
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            The desktop Python application does not include hidden analytics trackers, user accounts, or telemetry uploads to Drishya Sahayak. You run the open-source MIT code directly from your own directory.
          </p>
        </section>

        <section>
          <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
            4. Website forms & accessibility preferences
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            This marketing website stores your selected theme (light or dark), high-contrast mode, and text-scale choice locally in your browser&apos;s <code className="font-mono-code text-sm">localStorage</code> solely to preserve accessibility settings across visits. No advertising or cross-site tracking cookies are used.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            If you contact Drishya Sahayak via direct email, your name and email address are used strictly to respond to your inquiry.
          </p>
        </section>

        <section className="border-t border-[var(--border-subtle)] pt-6">
          <h2 className="font-serif-display text-2xl font-medium text-[var(--fg-primary)]">
            5. Contact for privacy inquiries
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--fg-secondary)]">
            Questions or requests regarding privacy may be sent to{' '}
            <a
              href={`mailto:${LINKS.email}`}
              className="font-semibold text-[var(--fg-primary)] underline underline-offset-4"
            >
              {LINKS.email}
            </a>{' '}
            or reviewed alongside our{' '}
            <Link href="/terms" className="font-semibold text-[var(--fg-primary)] underline underline-offset-4">
              Terms & Safety Notice
            </Link>
            .
          </p>
        </section>
      </article>
    </SubpageShell>
  );
}
