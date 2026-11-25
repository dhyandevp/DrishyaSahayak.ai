import React from 'react';
import { ArrowDown, ArrowRight, Camera, Cpu, Mic, Sparkles } from 'lucide-react';
import { HOW_IT_WORKS, PipelineStep } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

const STEP_TONES: Record<PipelineStep['tone'], string> = {
  sky: 'bg-[var(--pastel-sky-solid)]',
  periwinkle: 'bg-[var(--pastel-periwinkle)]',
  mint: 'bg-[var(--pastel-mint)]',
  peach: 'bg-[var(--pastel-peach)]',
};

const STEP_ICONS = [Camera, Cpu, Sparkles, Mic] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <ol className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
          {HOW_IT_WORKS.map((step, idx) => {
            const Icon = STEP_ICONS[idx];
            const isLast = idx === HOW_IT_WORKS.length - 1;
            return (
              <li key={step.stepNumber} className="relative flex flex-col">
                <div
                  className={`paper-grain flex h-full flex-col justify-between rounded-[26px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] ${STEP_TONES[step.tone]} p-6 shadow-sm`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="tabular font-mono-code rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] px-3 py-1 text-xs font-bold text-[var(--fg-primary)]">
                        Step {step.stepNumber}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="font-serif-display mt-6 text-2xl font-medium text-[var(--fg-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-[var(--fg-primary)] uppercase">
                      {step.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)]">
                      {step.detail}
                    </p>
                  </div>

                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="mt-5 flex items-center justify-end text-[var(--fg-primary)] xl:hidden"
                    >
                      <ArrowDown className="h-4 w-4 md:hidden" />
                      <ArrowRight className="hidden h-4 w-4 md:block" />
                    </div>
                  )}
                </div>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -right-3.5 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1.5 text-[var(--fg-primary)] shadow-sm xl:flex"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
