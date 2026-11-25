import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ExternalLink, KeyRound, Terminal } from 'lucide-react';
import {
  HOW_IT_WORKS,
  HYBRID_EXPLAINER,
  INSTALL_TABS,
  LINKS,
  REQUIREMENTS,
  SITE_META,
  TECH_STACK,
  VOICE_COMMANDS,
} from '@/content';
import { SubpageShell } from '@/components/sections/SubpageShell';
import { CopyButton } from '@/components/ui/MotionPrimitives';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Installation, quick start guide, hybrid architecture, and voice command reference for Drishya Sahayak V1.',
  alternates: { canonical: '/docs' },
};

const DOC_SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'voice-commands', label: 'Voice Commands' },
];

export default function DocsPage() {
  const defaultSteps = INSTALL_TABS[0].steps;

  return (
    <SubpageShell
      eyebrow="DOCUMENTATION · V1"
      title="Drishya Sahayak Guide"
      subtitle="Everything needed to install, configure your Google Gemini API key, understand the hybrid architecture, and speak voice commands on Windows, macOS, or Linux."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sticky Sidebar TOC */}
        <aside aria-label="Documentation table of contents" className="lg:col-span-3">
          <nav className="sticky top-24 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm">
            <p className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
              On this page
            </p>
            <ul className="mt-3 space-y-1.5">
              {DOC_SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="flex min-h-[36px] items-center rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--fg-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--fg-primary)]"
                  >
                    {sec.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-primary)] underline-offset-4 hover:underline"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Docs Content */}
        <div className="space-y-12 lg:col-span-9">
          {/* Intro */}
          <section
            id="intro"
            aria-labelledby="docs-intro-heading"
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
          >
            <h2
              id="docs-intro-heading"
              className="font-serif-display text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl"
            >
              1. Introduction
            </h2>
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--fg-secondary)]">
              {SITE_META.name} ({SITE_META.meaning}) is a free, open-source Python desktop application licensed under MIT, created by Lead Developer Dhyandev P with collaborators Sreehid and Ashirwad. It pairs local real-time YOLOv8 object detection and offline speech synthesis (<code className="font-mono-code text-sm">pyttsx3</code>) with Google Gemini 2.5 Flash to help visually impaired users hear scene descriptions, read printed or handwritten text, and ask conversational questions.
            </p>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--pastel-peach-pill)] p-4 text-sm text-[var(--fg-primary)]">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-bold">Important Safety Notice</p>
                <p className="mt-1 leading-relaxed text-[var(--fg-secondary)]">
                  Drishya Sahayak is an informational visual aid, not a mobility tool. It does not replace a white cane, guide dog, or human guide. Always exercise caution around traffic, stairs, obstacles, and medication labels. See our{' '}
                  <Link href="/terms" className="font-semibold text-[var(--fg-primary)] underline underline-offset-4">
                    Terms & Safety Notice
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section
            id="installation"
            aria-labelledby="docs-install-heading"
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
          >
            <h2
              id="docs-install-heading"
              className="font-serif-display text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl"
            >
              2. Installation & Prerequisites
            </h2>
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--fg-secondary)]">
              Verify that your computer meets these prerequisites before cloning the repository:
            </p>

            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {REQUIREMENTS.map((req) => (
                <li
                  key={req}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-4 py-3 text-sm font-medium text-[var(--fg-primary)]"
                >
                  {req}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-4">
              {defaultSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg-primary)]">
                      <Terminal className="h-4 w-4" aria-hidden="true" />
                      <span>
                        Step {step.step}: {step.title}
                      </span>
                    </span>
                    <CopyButton value={step.command} label={`step ${step.step}`} />
                  </div>
                  <pre className="font-mono-code mt-2.5 overflow-x-auto rounded-xl bg-[#0E1117] px-4 py-3 text-xs text-slate-100 sm:text-sm">
                    <code>{step.command}</code>
                  </pre>
                  {step.note && (
                    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[var(--fg-secondary)]">
                      <KeyRound className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{step.note}</span>
                      <a
                        href={LINKS.geminiApiKey}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--fg-primary)] underline underline-offset-4"
                      >
                        https://aistudio.google.com/app/apikey
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Start */}
          <section
            id="quick-start"
            aria-labelledby="docs-quickstart-heading"
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
          >
            <h2
              id="docs-quickstart-heading"
              className="font-serif-display text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl"
            >
              3. Quick Start Workflow
            </h2>
            <ol className="mt-4 max-w-[68ch] list-decimal space-y-3 pl-5 text-base leading-relaxed text-[var(--fg-secondary)]">
              <li>
                Ensure your <code className="font-mono-code text-sm">.env</code> file is saved in the root <code className="font-mono-code text-sm">Drishya_Sahayak.ai</code> folder containing <code className="font-mono-code text-sm">GEMINI_API_KEY=your_api_key_here</code>.
              </li>
              <li>
                Connect or enable your webcam and microphone, then launch <code className="font-mono-code text-sm">python main.py</code>.
              </li>
              <li>
                Wait for the Tkinter window to appear and listen for the spoken startup cue via <code className="font-mono-code text-sm">pyttsx3</code>.
              </li>
              <li>
                Speak any supported command clearly—such as &ldquo;Describe&rdquo; or &ldquo;Read text&rdquo;—and wait for the spoken response. Say &ldquo;Stop&rdquo; or &ldquo;Exit&rdquo; when finished.
              </li>
            </ol>
          </section>

          {/* Architecture */}
          <section
            id="architecture"
            aria-labelledby="docs-arch-heading"
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
          >
            <h2
              id="docs-arch-heading"
              className="font-serif-display text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl"
            >
              4. Hybrid Architecture
            </h2>
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--fg-secondary)]">
              {HYBRID_EXPLAINER.privacyNote}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-4"
                >
                  <p className="tabular font-mono-code text-xs font-bold text-[var(--fg-muted)]">
                    STAGE {step.stepNumber}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[var(--fg-primary)]">
                    {step.title} — {step.subtitle}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-secondary)]">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                    <th className="py-3 pr-4">Component</th>
                    <th className="py-3 pr-4">Layer</th>
                    <th className="py-3 pr-4">Execution</th>
                    <th className="py-3">Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {TECH_STACK.map((item) => (
                    <tr key={item.name}>
                      <td className="py-3 pr-4 font-semibold text-[var(--fg-primary)]">{item.name}</td>
                      <td className="py-3 pr-4 text-[var(--fg-secondary)]">{item.category}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--fg-primary)]">
                          {item.execution}
                        </span>
                      </td>
                      <td className="py-3 text-[var(--fg-secondary)]">{item.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Voice Commands Reference */}
          <section
            id="voice-commands"
            aria-labelledby="docs-commands-heading"
            className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8"
          >
            <h2
              id="docs-commands-heading"
              className="font-serif-display text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl"
            >
              5. Voice Commands Reference
            </h2>
            <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--fg-secondary)]">
              Speak these phrases naturally once Drishya Sahayak is listening:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                    <th className="py-3 pr-4">Voice Command</th>
                    <th className="py-3 pr-4">Mode</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {VOICE_COMMANDS.map((cmd) => (
                    <tr key={cmd.id}>
                      <td className="py-3.5 pr-4 font-semibold text-[var(--fg-primary)]">
                        {cmd.phrases.join(' / ')}
                      </td>
                      <td className="py-3.5 pr-4 text-xs font-medium text-[var(--fg-secondary)]">
                        {cmd.processingMode}
                      </td>
                      <td className="py-3.5 text-[var(--fg-secondary)]">{cmd.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </SubpageShell>
  );
}
