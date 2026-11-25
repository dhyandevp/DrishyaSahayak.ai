'use client';

import React from 'react';
import { Mic, Sparkles, Volume2 } from 'lucide-react';
import { HERO } from '@/content';
import { VoiceWaveform } from './MotionPrimitives';

export function AppWindowMockup() {
  const { windowTitle, engineBadge, userPrompt, assistantReply, micStatus, ttsStatus, detections } =
    HERO.mockup;

  return (
    <figure
      aria-label="Mockup of the Drishya Sahayak V1 desktop application window showing a live webcam feed with YOLOv8 bounding boxes around a laptop, cup, and dining table, alongside a voice transcript panel and listening waveform"
      className="relative z-10 mx-auto w-full max-w-[1040px] overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[0_32px_90px_-20px_rgba(17,19,24,0.22)]"
    >
      {/* Desktop Window Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-muted)] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        </div>
        <p className="text-xs font-semibold tracking-tight text-[var(--fg-primary)] sm:text-sm">
          {windowTitle}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-[11px] font-medium text-[var(--fg-secondary)]">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          <span>{engineBadge}</span>
        </span>
      </div>

      {/* Tkinter Split Body: Camera Feed + Transcript/Voice Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Camera Feed + YOLO Bounding Boxes */}
        <div className="relative border-b border-[var(--border-subtle)] bg-[#0E131A] p-4 sm:p-5 lg:col-span-7 lg:border-r lg:border-b-0">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-200">
            <span className="inline-flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Sample Camera Preview (YOLOv8)
            </span>
            <span className="tabular font-mono-code rounded bg-white/10 px-2 py-0.5 text-[11px] text-slate-100">
              3 sample detections
            </span>
          </div>

          {/* Authored SVG Room/Desk Scene with Overlays */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#1B222C]">
            <svg
              viewBox="0 0 640 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              role="img"
              aria-label="Simulated webcam view of a wooden desk with an open laptop and a steaming cup of tea, each marked with YOLOv8 confidence bounding boxes"
            >
              {/* Soft indoor room background */}
              <rect width="640" height="400" fill="#1E2530" />
              <rect x="0" y="0" width="640" height="236" fill="#2A3342" />
              {/* Window light gradient */}
              <rect x="38" y="24" width="160" height="175" rx="8" fill="#3B495E" />
              <rect x="46" y="32" width="144" height="159" rx="4" fill="#A6D8FA" fillOpacity="0.22" />

              {/* Wooden Table Surface */}
              <path d="M24 236 L616 236 L640 400 L0 400 Z" fill="#8C6239" />
              <path d="M24 236 L616 236 L624 252 L16 252 Z" fill="#A6784B" />
              <line x1="65" y1="286" x2="575" y2="286" stroke="#75502D" strokeWidth="2" opacity="0.5" />
              <line x1="35" y1="336" x2="605" y2="336" stroke="#75502D" strokeWidth="2" opacity="0.4" />

              {/* Open Laptop */}
              <path d="M148 92 L338 92 L346 228 L140 228 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
              <rect x="158" y="102" width="170" height="114" rx="4" fill="#0F172A" />
              <rect x="172" y="118" width="84" height="10" rx="3" fill="#9FD4FA" fillOpacity="0.65" />
              <rect x="172" y="136" width="132" height="8" rx="3" fill="#64748B" fillOpacity="0.55" />
              <rect x="172" y="152" width="110" height="8" rx="3" fill="#64748B" fillOpacity="0.55" />
              {/* Laptop Keyboard Base */}
              <path d="M140 228 L346 228 L374 274 L112 274 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
              <path d="M158 236 L328 236 L342 256 L144 256 Z" fill="#334155" />

              {/* Steaming Ceramic Cup of Tea */}
              <path d="M432 192 L506 192 L498 258 C496 266 442 266 440 258 Z" fill="#F8FAFC" />
              <ellipse cx="469" cy="192" rx="37" ry="10" fill="#E2E8F0" />
              <ellipse cx="469" cy="193" rx="31" ry="7" fill="#92400E" />
              <path
                d="M505 204 C522 204 522 238 502 240"
                stroke="#F8FAFC"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              {/* Subtle Steam Wisps */}
              <path d="M454 172 C448 158 462 146 456 132" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <path d="M478 168 C472 152 486 142 480 126" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

              {/* YOLO Bounding Boxes */}
              {/* Box 1: Laptop */}
              <g>
                <rect
                  x={detections[0].x * 6.4}
                  y={detections[0].y * 4}
                  width={detections[0].w * 6.4}
                  height={detections[0].h * 4}
                  rx="6"
                  stroke="#9FD4FA"
                  strokeWidth="2.5"
                  fill="#9FD4FA"
                  fillOpacity="0.08"
                />
                <rect x={detections[0].x * 6.4} y={detections[0].y * 4 - 24} width="108" height="22" rx="4" fill="#9FD4FA" />
                <text
                  x={detections[0].x * 6.4 + 8}
                  y={detections[0].y * 4 - 9}
                  fill="#111318"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  laptop 0.94
                </text>
              </g>

              {/* Box 2: Cup */}
              <g>
                <rect
                  x={detections[1].x * 6.4}
                  y={detections[1].y * 4}
                  width={detections[1].w * 6.4}
                  height={detections[1].h * 4}
                  rx="6"
                  stroke="#A4DFB9"
                  strokeWidth="2.5"
                  fill="#A4DFB9"
                  fillOpacity="0.1"
                />
                <rect x={detections[1].x * 6.4} y={detections[1].y * 4 - 24} width="84" height="22" rx="4" fill="#A4DFB9" />
                <text
                  x={detections[1].x * 6.4 + 8}
                  y={detections[1].y * 4 - 9}
                  fill="#111318"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  cup 0.91
                </text>
              </g>

              {/* Box 3: Dining Table */}
              <g>
                <rect
                  x={detections[2].x * 6.4}
                  y={detections[2].y * 4}
                  width={detections[2].w * 6.4}
                  height={detections[2].h * 4}
                  rx="6"
                  stroke="#FCEB9F"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <rect x={detections[2].x * 6.4} y={detections[2].y * 4 - 24} width="144" height="22" rx="4" fill="#FCEB9F" />
                <text
                  x={detections[2].x * 6.4 + 8}
                  y={detections[2].y * 4 - 9}
                  fill="#111318"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="monospace"
                >
                  dining table 0.88
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Transcript & Voice Controls Panel */}
        <div className="flex flex-col justify-between bg-[var(--bg-surface)] p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-[var(--fg-muted)] uppercase">
                Voice Transcript
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--pastel-mint-pill)] px-2.5 py-1 text-[11px] font-semibold text-[var(--fg-primary)]">
                <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{ttsStatus}</span>
              </span>
            </div>

            <div className="space-y-3 text-left">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] p-3.5">
                <p className="text-xs font-semibold text-[var(--fg-muted)]">Spoken Command (STT)</p>
                <p className="mt-1 text-sm font-semibold text-[var(--fg-primary)]">{userPrompt}</p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--pastel-periwinkle-pill)] p-4">
                <p className="text-xs font-semibold text-[var(--fg-primary)]">
                  Gemini 2.5 Flash + pyttsx3 Response
                </p>
                <p className="mt-1.5 text-sm leading-relaxed font-medium text-[var(--fg-primary)]">
                  {assistantReply}
                </p>
              </div>
            </div>
          </div>

          {/* Mic-Listening Waveform Footer */}
          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-muted)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--cta-primary-bg)] text-[var(--cta-primary-fg)]">
                <Mic className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-[var(--fg-primary)]">{micStatus}</p>
                <p className="text-[11px] text-[var(--fg-secondary)]">
                  Say &ldquo;Describe&rdquo;, &ldquo;Read text&rdquo;, or &ldquo;Exit&rdquo;
                </p>
              </div>
            </div>
            <VoiceWaveform active label="Microphone listening waveform animation" />
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Interactive-style preview of the Drishya Sahayak V1 desktop application showing YOLOv8 object detection and Gemini 2.5 Flash voice response.
      </figcaption>
    </figure>
  );
}
