'use client';

import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { LINKS } from '@/content';
import { Reveal } from '@/components/ui/MotionPrimitives';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';

export function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<'General' | 'Support' | 'Partnership'>('General');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { announce } = useAccessibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    const nextErrors: Record<string, string> = {};
    if (firstName.trim().length < 2) {
      nextErrors.firstName = 'Please enter your first name.';
    }
    if (lastName.trim().length < 1) {
      nextErrors.lastName = 'Please enter your last name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      announce('Please fix the highlighted fields in the contact form.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          website: honeypot,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Unable to send your message right now. Please try email directly.');
        announce('Contact form submission failed.');
        return;
      }

      setSubmitted(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubject('General');
      setMessage('');
      announce('Your message has been sent to Drishya Sahayak.');
    } catch {
      setErrorMsg('Network error while sending. You can also write directly to drishyasahayak@gmail.com.');
      announce('Network error submitting contact form.');
    } finally {
      setSubmitting(false);
    }
  };

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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Contact Details + Kannur Maps Card */}
          <div className="paper-grain flex flex-col justify-between rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--pastel-peach)] p-7 shadow-[var(--shadow-card)] sm:p-9 lg:col-span-5">
            <div>
              <h3 className="font-serif-display text-3xl font-medium text-[var(--fg-primary)]">
                Drishya Sahayak Labs
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
                Built in Kannur, Kerala by Lead Developer & Founder Dhyandev P. We welcome accessibility testers, Python contributors, and community organizations.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Email
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[var(--fg-primary)]">
                      <a
                        href={`mailto:${LINKS.email}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {LINKS.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Phone
                    </dt>
                    <dd className="tabular mt-0.5 text-sm font-semibold text-[var(--fg-primary)]">
                      <a href={LINKS.phoneHref} className="underline-offset-4 hover:underline">
                        {LINKS.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card-inner)] text-[var(--fg-primary)]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                      Location
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold text-[var(--fg-primary)]">
                      {LINKS.address}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <a
                href={LINKS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Kannur, Kerala, India in Google Maps (opens in a new tab)"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card-inner)] px-5 py-2.5 text-sm font-semibold text-[var(--fg-primary)] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Open in Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 shadow-[var(--shadow-card)] sm:p-9 lg:col-span-7">
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex h-full flex-col items-start justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--pastel-mint-pill)] p-6 sm:p-8"
              >
                <div className="flex items-center gap-2.5 text-lg font-semibold text-[var(--fg-primary)]">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  <span>Message received</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-secondary)] sm:text-base">
                  Thank you for reaching out to Drishya Sahayak Labs. We will respond via email as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex min-h-[42px] items-center rounded-full bg-[var(--cta-primary-bg)] px-5 py-2 text-sm font-semibold text-[var(--cta-primary-fg)]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-first-name"
                      className="block text-sm font-semibold text-[var(--fg-primary)]"
                    >
                      First Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-first-name"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.firstName)}
                      aria-describedby={fieldErrors.firstName ? 'contact-first-err' : undefined}
                      placeholder="Meera"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                    />
                    {fieldErrors.firstName && (
                      <p id="contact-first-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-last-name"
                      className="block text-sm font-semibold text-[var(--fg-primary)]"
                    >
                      Last Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-last-name"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.lastName)}
                      aria-describedby={fieldErrors.lastName ? 'contact-last-err' : undefined}
                      placeholder="Menon"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                    />
                    {fieldErrors.lastName && (
                      <p id="contact-last-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                        {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-[var(--fg-primary)]"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'contact-email-err' : undefined}
                      placeholder="meera@example.com"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                    />
                    {fieldErrors.email && (
                      <p id="contact-email-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-[var(--fg-primary)]"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={subject}
                      onChange={(e) =>
                        setSubject(e.target.value as 'General' | 'Support' | 'Partnership')
                      }
                      className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)]"
                    >
                      <option value="General">General</option>
                      <option value="Support">Support</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-[var(--fg-primary)]"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'contact-message-err' : undefined}
                    placeholder="Share how we can help or collaborate..."
                    className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2.5 text-sm text-[var(--fg-primary)] placeholder:text-[var(--fg-muted)]"
                  />
                  {fieldErrors.message && (
                    <p id="contact-message-err" className="mt-1 text-xs font-semibold text-red-700 dark:text-red-300">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-600/40 bg-red-50 px-4 py-3 text-xs font-semibold text-red-900 dark:bg-red-950/60 dark:text-red-200"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[var(--cta-primary-bg)] px-7 py-3 text-sm font-semibold text-[var(--cta-primary-fg)] transition-colors hover:bg-[var(--cta-primary-hover)] disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  <span>{submitting ? 'Sending message...' : 'Send message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
