'use client';

import React, { useId } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface DitheredCloudProps {
  className?: string;
  direction?: 'left' | 'right';
  intensity?: 'soft' | 'medium';
}

export function DitheredCloud({
  className = '',
  direction = 'left',
  intensity = 'soft',
}: DitheredCloudProps) {
  const id = useId().replace(/:/g, '');
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const yOffset = useTransform(
    scrollY,
    [0, 1200],
    shouldReduceMotion ? [0, 0] : [0, direction === 'left' ? 32 : -28]
  );

  const dotOpacity = intensity === 'medium' ? '0.68' : '0.46';

  return (
    <motion.div
      aria-hidden="true"
      style={{ y: yOffset }}
      className={`pointer-events-none select-none [[data-contrast='high']_&]:hidden ${className}`}
    >
      <svg
        viewBox="0 0 360 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        <defs>
          <pattern
            id={`dither-${id}`}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="2" height="2" fill="#FFFFFF" fillOpacity={dotOpacity} />
            <rect x="3" y="3" width="2" height="2" fill="#E8F4FD" fillOpacity={dotOpacity} />
            <rect x="3" y="0" width="1.5" height="1.5" fill="#7FBEEB" fillOpacity="0.32" />
          </pattern>
          <radialGradient id={`cloud-fade-${id}`} cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#F5FAFF" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#B4DEFA" stopOpacity="0" />
          </radialGradient>
          <filter id={`cloud-blur-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <g filter={`url(#cloud-blur-${id})`} opacity="0.82">
          <ellipse cx="145" cy="110" rx="102" ry="52" fill={`url(#cloud-fade-${id})`} />
          <ellipse cx="220" cy="100" rx="86" ry="48" fill={`url(#cloud-fade-${id})`} />
          <ellipse cx="180" cy="74" rx="68" ry="44" fill={`url(#cloud-fade-${id})`} />
          <ellipse cx="95" cy="122" rx="64" ry="34" fill={`url(#cloud-fade-${id})`} />
        </g>

        <g opacity="0.9">
          <path
            d="M42 130 C35 100 62 78 96 86 C110 52 158 40 194 58 C218 42 264 52 276 84 C312 88 330 116 312 138 C295 156 235 162 178 160 C115 160 50 156 42 130 Z"
            fill={`url(#dither-${id})`}
          />
        </g>
      </svg>
    </motion.div>
  );
}
