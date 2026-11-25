'use client';

import React, { useState } from 'react';
import { CheckCircle2, Cpu, Glasses, Loader2, Radio, Sparkles } from 'lucide-react';
import { ROADMAP } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';

export function RoadmapSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { announce } = useAccessibility();

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      announce('Please fix the highlighted errors in the waitlist form.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website: honeypot,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Could not register right now. Please try again shortly.');
        announce('Waitlist submission failed.');
        return;
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      announce('You have joined the Glasses Edition concept waitlist.');
    } catch {
      setErrorMsg('Network error while submitting. Please check your connection and try again.');
      announce('Network error while joining waitlist.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="paper-grain overflow-hidden rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-sky-solid)] p-6 shadow-[var(--shadow-card)] sm:p-10 lg:p-14">
          {/* Header + Concept Badge */}
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--border-subtle)] pb-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card-inner)] px-3.5 py-1 text-[11px] font-bold tracking-wider text-[var(--fg-primary)] uppercase">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{ROADMAP.badge}</span>
              </span>

              <p className="mt-5 text-xs font-bold tracking-[0.14em] text-[var(--fg-primary)] uppercase">
                {ROADMAP.eyebrow}
              </p>
              <h2
                id="roadmap-heading"
                className="font-serif-display mt-2 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
              >
                {ROADMAP.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--fg-secondary)]">
                {ROADMAP.description}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-4 text-xs text-[var(--fg-secondary)] lg:max-w-xs">
              <p className="font-bold text-[var(--fg-primary)]">Estimate Only — Not For Sale</p>
              <p className="mt-1 leading-relaxed">{ROADMAP.estimateNote}</p>
            </div>
          </div>

          {/* Concept Architecture Illustration + Hardware Specs */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Concept Illustration + Specs + Timeline */}
            <div className="space-y-6 lg:col-span-7">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--fg-primary)] uppercase">
                    <Glasses className="h-4 w-4" aria-hidden="true" />
                    <span>Concept Architecture Schematic</span>
                  </span>
                  <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--fg-secondary)]">
                    Unshipped Prototype
                  </span>
                </div>

                {/* Authored SVG Glasses Concept Schematic */}
                <div className="my-5 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-4">
                  <svg
                    viewBox="0 0 600 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Conceptual schematic of smart glasses showing a Raspberry Pi 5 compute unit, front micro camera, bone-conduction audio pads behind the ear, and haptic vibration module"
                  >
                    {/* Glasses Temple & Frame Outline */}
                    <path
                      d="M75 78 L155 58 L275 58 Q300 72 325 58 L445 58 L525 78"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-[var(--fg-primary)]"
                    />
                    <rect
                      x="150"
                      y="54"
                      width="115"
                      height="66"
                      rx="18"
                      fill="#9FD4FA"
                      fillOpacity="0.35"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-[var(--fg-primary)]"
                    />
                    <rect
                      x="335"
                      y="54"
                      width="115"
                      height="66"
                      rx="18"
                      fill="#9FD4FA"
                      fillOpacity="0.35"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-[var(--fg-primary)]"
                    />
                    {/* Forward Camera */}
                    <circle cx="300" cy="60" r="8" fill="#111318" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="300" cy="60" r="3" fill="#A4DFB9" />
                    {/* Bone Conduction + Haptic Modules */}
                    <rect x="64" y="68" width="38" height="20" rx="8" fill="#A4DFB9" stroke="#111318" strokeWidth="2" />
                    <rect x="498" y="68" width="38" height="20" rx="8" fill="#FFD6BA" stroke="#111318" strokeWidth="2" />

                    {/* Callout Labels */}
                    <text x="20" y="148" fill="currentColor" fontSize="11" fontWeight="700" className="text-[var(--fg-primary)]">
                      Bone-Conduction Audio
                    </text>
                    <text x="238" y="148" fill="currentColor" fontSize="11" fontWeight="700" className="text-[var(--fg-primary)]">
                      Camera + Raspberry Pi 5 Link
                    </text>
                    <text x="454" y="148" fill="currentColor" fontSize="11" fontWeight="700" className="text-[var(--fg-primary)]">
                      Haptic Feedback
                    </text>
                    <line x1="82" y1="90" x2="82" y2="132" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 3" className="text-[var(--fg-primary)]" />
                    <line x1="300" y1="70" x2="300" y2="132" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 3" className="text-[var(--fg-primary)]" />
                    <line x1="516" y1="90" x2="516" y2="132" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 3" className="text-[var(--fg-primary)]" />
                  </svg>
                </div>

                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ROADMAP.hardwareSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-3.5 py-2.5"
                    >
                      <dt className="text-[11px] font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                        {spec.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-[var(--fg-primary)]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Timeline */}
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-[var(--fg-primary)] uppercase">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                  <span>Project Timeline</span>
                </h3>

                <ol className="mt-4 space-y-4">
                  {ROADMAP.timeline.map((item) => (
                    <li
                      key={item.period}
                      className="flex flex-col gap-1 border-b border-[var(--border-subtle)] pb-3.5 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="tabular font-mono-code rounded-full bg-[var(--bg-muted)] px-2.5 py-0.5 text-xs font-bold text-[var(--fg-primary)]">
                            {item.period}
                          </span>
                          <span className="text-sm font-semibold text-[var(--fg-primary)]">
                            {item.title}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--fg-secondary)] sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          item.status === 'Shipped'
                            ? 'bg-[var(--pastel-mint-pill)] text-[var(--fg-primary)]'
                            : item.status === 'Concept (Not Shipped)'
                            ? 'bg-[var(--pastel-peach-pill)] text-[var(--fg-primary)]'
                            : 'bg-[var(--bg-muted)] text-[var(--fg-secondary)]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right: Glasses Waitlist Form */}
            <div
              id="waitlist-form"
              className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] p-6 shadow-md lg:col-span-5"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                  <Radio className="h-4 w-4" aria-hidden="true" />
                  <span>Wearable Concept Waitlist</span>
                </div>
                <h3 className="font-serif-display mt-2 text-2xl font-medium text-[var(--fg-primary)] sm:text-3xl">
                  Stay updated on Glasses Edition
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-secondary)]">
                  Joining the waitlist does not place an order or charge anything. We will notify you as Raspberry Pi 5 hardware schematics and prototypes evolve.
                </p>

                {submitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--pastel-mint-pill)] p-5"
                  >
                    <div className="flex items-center gap-2.5 text-sm font-bold text-[var(--fg-primary)]">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <span>You&apos;re on the waitlist</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--fg-secondary)]">
                      Thank you for your interest in the Drishya Sahayak wearable smart-glasses concept.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 inline-flex min-h-[38px] items-center rounded-full bg-[var(--cta-primary-bg)] px-4 py-1.5 text-xs font-semibold text-[var(--cta-primary-fg)]"
                    >
                      Add another entry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} noValidate className="mt-6 space-y-4">
                    {/* Honeypot field hidden from users and assistive tech */}
                    <div aria-hidden="true" className="hidden">
                      <label htmlFor="waitlist-website">Website</label>
                      <input
                        id="waitlist-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="waitlist-name"
                        className="block text-sm font-semibold text-[var(--fg-primary)]"
                      >
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? 'waitlist-name-err' : undefined}
                        placeholder="Aarav Nair"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                      />
                      {fieldErrors.name && (
                        <p id="waitlist-name-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="block text-sm font-semibold text-[var(--fg-primary)]"
                      >
                        Email Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'waitlist-email-err' : undefined}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                      />
                      {fieldErrors.email && (
                        <p id="waitlist-email-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="waitlist-message"
                        className="block text-sm font-semibold text-[var(--fg-primary)]"
                      >
                        Optional Message
                      </label>
                      <textarea
                        id="waitlist-message"
                        name="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what assistive features matter most to you..."
                        className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                      />
                    </div>

                    {errorMsg && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-600/40 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-900 dark:bg-red-950/60 dark:text-red-200"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--cta-primary-fg)] transition-colors hover:bg-[var(--cta-primary-hover)] disabled:opacity-60"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                      <span>{submitting ? 'Joining waitlist...' : 'Join the waitlist'}</span>
                    </button>
                  </form>
                )}
              </div>

              <p className="mt-4 border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--fg-secondary)]">
                <strong className="text-[var(--fg-primary)]">Estimate notice:</strong> Waitlist: ₹20,667 est. reflects projected prototype parts only and is not a retail price.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
