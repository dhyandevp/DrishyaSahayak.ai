'use client';

import React, { useEffect } from 'react';
import { ExternalLink, PlayCircle, X } from 'lucide-react';
import { LINKS } from '@/content';

export function WatchFilmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="watch-film-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm overscroll-contain touch-pan-y pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-primary)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <PlayCircle className="h-5 w-5" aria-hidden="true" />
            <h2 id="watch-film-title" className="font-serif-display text-xl font-medium">
              Drishya Sahayak V1 — Demo Film
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo film dialog"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] text-[var(--fg-primary)] transition-colors hover:bg-[var(--border-subtle)]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/7CZvz8eTNHY?rel=0"
              title="Drishya Sahayak V1 demonstration video on YouTube"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-4 text-sm text-[var(--fg-secondary)]">
            <p className="font-semibold text-[var(--fg-primary)]">Text Summary of Demo Film</p>
            <p className="mt-1">
              The film demonstrates the Python Tkinter desktop application running real-time YOLOv8 object detection alongside natural voice prompts (&ldquo;Describe&rdquo;, &ldquo;Read text&rdquo;, &ldquo;What&apos;s the weather?&rdquo;) answered via Google Gemini 2.5 Flash and spoken aloud via offline pyttsx3 text-to-speech.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <a
              href={LINKS.demoFilm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--fg-primary)] hover:bg-[var(--bg-muted)]"
            >
              <span>Open directly on YouTube</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--cta-primary-bg)] px-5 py-2 text-sm font-semibold text-[var(--cta-primary-fg)] hover:bg-[var(--cta-primary-hover)]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
