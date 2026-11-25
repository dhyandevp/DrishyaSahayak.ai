'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ExternalLink, KeyRound, Terminal } from 'lucide-react';
import { INSTALL_TABS, LINKS, REQUIREMENTS } from '@/content';
import { CopyButton, Reveal } from '@/components/ui/MotionPrimitives';

export function QuickStartSection() {
  const [activeTabId, setActiveTabId] = useState<(typeof INSTALL_TABS)[number]['id']>('standard');
  const activeTab = INSTALL_TABS.find((t) => t.id === activeTabId) ?? INSTALL_TABS[0];

  const allCommands = activeTab.steps.map((s) => s.command).join('\n');

  return (
    <section
      id="quickstart"
      aria-labelledby="quickstart-heading"
      className="mx-auto w-full max-w-[1140px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            QUICK START
          </p>
          <h2
            id="quickstart-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Run Drishya Sahayak V1 in four steps
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Free, open-source Python software. Clone the GitHub repository, install dependencies, add your Gemini API key, and launch.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]">
          {/* Tab Strip + Copy All */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-muted)] px-4 py-3.5 sm:px-6">
            <div role="tablist" aria-label="Operating system installation instructions" className="flex flex-wrap gap-1.5">
              {INSTALL_TABS.map((tab) => {
                const active = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={active}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                      active
                        ? 'bg-[var(--cta-primary-bg)] text-[var(--cta-primary-fg)]'
                        : 'text-[var(--fg-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--fg-primary)]'
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <CopyButton value={allCommands} label="all installation commands" />
          </div>

          {/* Active Tab Panel */}
          <div
            role="tabpanel"
            id={`panel-${activeTab.id}`}
            aria-labelledby={`tab-${activeTab.id}`}
            className="divide-y divide-[var(--border-subtle)] p-5 sm:p-8"
          >
            {activeTab.steps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="tabular inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--pastel-sky-solid)] text-xs font-bold text-[var(--fg-primary)]">
                      {step.step}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--fg-primary)]">
                      {step.title}
                    </h3>
                  </div>

                  <pre className="font-mono-code mt-2.5 overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[#0E1117] px-4 py-3 text-xs leading-relaxed text-slate-100 sm:text-[13px]">
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
                        className="inline-flex items-center gap-1 font-semibold text-[var(--fg-primary)] underline underline-offset-4"
                      >
                        <span>Get free API key at Google AI Studio</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </p>
                  )}
                </div>

                <CopyButton
                  value={step.command}
                  label={`step ${step.step}: ${step.title}`}
                  className="self-start sm:self-center"
                />
              </div>
            ))}
          </div>

          {/* Requirements Note Footer */}
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-muted)] px-5 py-5 sm:px-8">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                  Requirements
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {REQUIREMENTS.map((req) => (
                    <li
                      key={req}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--fg-primary)] sm:text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--fg-primary)]" aria-hidden="true" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/docs"
                className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2 text-xs font-semibold text-[var(--fg-primary)] hover:bg-[var(--bg-canvas)] sm:text-sm"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Full Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
