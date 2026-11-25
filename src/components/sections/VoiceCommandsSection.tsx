'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Mic, Play, RotateCcw, Square, Volume2 } from 'lucide-react';
import { VOICE_COMMANDS, VoiceCommandDemo } from '@/content';
import { Reveal, VoiceWaveform } from '@/components/ui/MotionPrimitives';
import { useAccessibility } from '@/components/accessibility/AccessibilityProvider';

export function VoiceCommandsSection() {
  const [activeId, setActiveId] = useState<string>(VOICE_COMMANDS[0].id);
  const [typedUserLength, setTypedUserLength] = useState<number>(
    VOICE_COMMANDS[0].samplePrompt.length
  );
  const [typedReplyLength, setTypedReplyLength] = useState<number>(
    VOICE_COMMANDS[0].sampleResponse.length
  );
  const [phase, setPhase] = useState<'idle' | 'typing-user' | 'speaking-reply' | 'complete'>(
    'complete'
  );
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { announce } = useAccessibility();

  const selected: VoiceCommandDemo =
    VOICE_COMMANDS.find((cmd) => cmd.id === activeId) ?? VOICE_COMMANDS[0];

  const triggerCommand = (cmd: VoiceCommandDemo) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    }

    setActiveId(cmd.id);
    announce(`Simulating voice command ${cmd.phrases.join(' or ')}. ${cmd.sampleResponse}`);

    if (shouldReduceMotion) {
      setTypedUserLength(cmd.samplePrompt.length);
      setTypedReplyLength(cmd.sampleResponse.length);
      setPhase('complete');
      return;
    }

    setTypedUserLength(0);
    setTypedReplyLength(0);
    setPhase('typing-user');
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    if (phase === 'typing-user') {
      if (typedUserLength < selected.samplePrompt.length) {
        const timer = window.setTimeout(() => {
          setTypedUserLength((prev) => prev + 1);
        }, 26);
        return () => window.clearTimeout(timer);
      }
      const nextTimer = window.setTimeout(() => {
        setPhase('speaking-reply');
      }, 220);
      return () => window.clearTimeout(nextTimer);
    }

    if (phase === 'speaking-reply') {
      if (typedReplyLength < selected.sampleResponse.length) {
        const timer = window.setTimeout(() => {
          setTypedReplyLength((prev) => Math.min(selected.sampleResponse.length, prev + 2));
        }, 18);
        return () => window.clearTimeout(timer);
      }
      const doneTimer = window.setTimeout(() => {
        setPhase('complete');
      }, 20);
      return () => window.clearTimeout(doneTimer);
    }
  }, [phase, typedUserLength, typedReplyLength, selected, shouldReduceMotion]);

  const toggleSpeakDemo = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      announce('Browser speech synthesis is not available in this environment.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `Command: ${selected.samplePrompt}. Response: ${selected.sampleResponse}`
    );
    utterance.rate = 1.0;
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);
    setIsReadingAloud(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section
      id="commands"
      aria-labelledby="commands-heading"
      className="mx-auto w-full max-w-[1220px] px-3 py-14 sm:px-6 sm:py-20"
    >
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--fg-muted)] uppercase">
            VOICE COMMANDS
          </p>
          <h2
            id="commands-heading"
            className="font-serif-display mt-3 text-3xl leading-[1.12] font-medium tracking-[-0.025em] text-[var(--fg-primary)] sm:text-5xl"
          >
            Just speak naturally
          </h2>
          <p className="mt-4 text-base text-[var(--fg-secondary)]">
            Select any &ldquo;try saying&rdquo; card below to preview how Drishya listens, processes, and speaks back. Full text transcripts and captions are always visible.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive Try-Saying Cards */}
        <div
          role="list"
          aria-label="Interactive voice command examples"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7"
        >
          {VOICE_COMMANDS.map((cmd) => {
            const isSelected = cmd.id === activeId;
            return (
              <button
                key={cmd.id}
                type="button"
                onClick={() => triggerCommand(cmd)}
                aria-pressed={isSelected}
                className={`group flex flex-col justify-between rounded-[22px] border-[length:var(--card-border-width)] p-5 text-left transition-all ${
                  isSelected
                    ? 'border-[var(--cta-primary-bg)] bg-[var(--pastel-sky-solid)] shadow-md'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--fg-primary)]">
                      <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{cmd.phrases.join(' / ')}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-[var(--cta-primary-bg)] text-[var(--cta-primary-fg)]'
                          : 'bg-[var(--bg-muted)] text-[var(--fg-secondary)]'
                      }`}
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-secondary)]">
                    {cmd.summary}
                  </p>
                </div>

                <p className="mt-4 text-[11px] font-semibold tracking-wide text-[var(--fg-muted)] uppercase">
                  {cmd.processingMode}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Simulated Conversation Player + Live Transcript Captions */}
        <div
          aria-live="polite"
          className="flex flex-col justify-between rounded-[28px] border-[length:var(--card-border-width)] border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8 lg:col-span-5"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pastel-periwinkle-pill)] text-[var(--fg-primary)]">
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--fg-primary)]">
                    Simulated Voice Output
                  </p>
                  <p className="text-xs text-[var(--fg-secondary)]">{selected.processingMode}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerCommand(selected)}
                aria-label={`Replay simulation for ${selected.phrases[0]}`}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-3 py-1 text-xs font-semibold text-[var(--fg-primary)] hover:bg-[var(--border-subtle)]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Replay</span>
              </button>
            </div>

            {/* Typed User Line */}
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-4">
                <p className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                  You say (SpeechRecognition STT)
                </p>
                <p className="mt-1.5 text-base font-semibold text-[var(--fg-primary)]">
                  &ldquo;{selected.samplePrompt.slice(0, typedUserLength)}
                  {phase === 'typing-user' && <span aria-hidden="true">|</span>}&rdquo;
                </p>
              </div>

              {/* Spoken Response + Waveform */}
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--pastel-mint-pill)] p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold tracking-wider text-[var(--fg-primary)] uppercase">
                    Drishya speaks (pyttsx3 TTS)
                  </p>
                  <VoiceWaveform
                    active={phase === 'speaking-reply' || isReadingAloud}
                    label={
                      phase === 'speaking-reply' || isReadingAloud
                        ? 'Simulated voice playback active'
                        : 'Playback complete'
                    }
                  />
                </div>
                <p className="text-base leading-relaxed font-medium text-[var(--fg-primary)]">
                  &ldquo;{selected.sampleResponse.slice(0, typedReplyLength)}
                  {phase === 'speaking-reply' && <span aria-hidden="true">|</span>}&rdquo;
                </p>
              </div>
            </div>

            {/* Accessible Text Captions */}
            <div className="mt-4 rounded-xl border border-dashed border-[var(--border-strong)] px-4 py-3 text-xs text-[var(--fg-secondary)]">
              <span className="font-bold text-[var(--fg-primary)]">Caption / Pipeline Note: </span>
              {selected.caption}
            </div>
          </div>

          {/* Explicit Click-to-Hear Option (never autoplays) */}
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
            <span className="text-xs text-[var(--fg-secondary)]">
              No autoplay audio. Optional browser voice preview:
            </span>
            <button
              type="button"
              onClick={toggleSpeakDemo}
              className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full bg-[var(--cta-primary-bg)] px-4 py-1.5 text-xs font-semibold text-[var(--cta-primary-fg)] hover:bg-[var(--cta-primary-hover)]"
            >
              {isReadingAloud ? (
                <>
                  <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Listen Aloud</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
