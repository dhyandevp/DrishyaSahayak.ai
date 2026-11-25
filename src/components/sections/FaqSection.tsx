'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-[920px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            id="faq-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Honest answers before you install
          </h2>
        </div>

        <div className="mt-10 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const btnId = `faq-btn-${item.id}`;

            return (
              <div key={item.id} className="px-6 py-1 sm:px-8">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[var(--fg-primary)] transition-colors hover:opacity-80 sm:text-lg"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }
                      }
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
