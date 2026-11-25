import React from 'react';

export function TornPaperCollage() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden select-none [[data-contrast='high']_&]:opacity-25"
    >
      <svg
        viewBox="0 0 1440 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-[190px] w-full sm:h-[260px] lg:h-[310px]"
      >
        <defs>
          <filter id="paper-shadow" x="-5%" y="-10%" width="110%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#111318" floodOpacity="0.09" />
          </filter>
          <pattern id="ruled-lines" width="40" height="22" patternUnits="userSpaceOnUse">
            <line x1="0" y1="21" x2="40" y2="21" stroke="#D5BC5C" strokeWidth="1" strokeOpacity="0.45" />
          </pattern>
        </defs>

        {/* Left spiral-notebook paper cutout */}
        <g transform="rotate(-5 180 280)" filter="url(#paper-shadow)">
          <path
            d="M-30 148 L560 112 L595 360 L-40 360 Z"
            fill="var(--bg-surface)"
          />
          {/* Spiral notebook teeth along top edge */}
          {Array.from({ length: 22 }).map((_, i) => (
            <path
              key={i}
              d={`M${i * 26 - 8} 134 C${i * 26 - 4} 122, ${i * 26 + 8} 122, ${i * 26 + 10} 135 L${
                i * 26 + 4
              } 147 Z`}
              fill="var(--pastel-sky-mid)"
            />
          ))}
          {/* Watercolor wash blob on left sheet */}
          <path
            d="M95 215 C140 160 265 170 295 225 C325 280 270 330 190 332 C110 334 65 268 95 215 Z"
            fill="var(--pastel-periwinkle)"
            fillOpacity="0.65"
          />
        </g>

        {/* Right layered torn paper sheets + ruled butter yellow sheet */}
        <g filter="url(#paper-shadow)">
          {/* White crinkled cloud-edge paper behind */}
          <path
            d="M780 210 L812 178 L845 162 L882 128 L926 112 L968 124 L998 148 L1038 175 L1085 215 L1120 355 L765 355 Z"
            fill="var(--bg-surface)"
          />
          {/* Soft warm gray inner tear */}
          <path
            d="M808 228 L844 185 L886 154 L924 144 L956 160 L995 198 L1042 252 L1068 355 L790 355 Z"
            fill="var(--bg-muted)"
          />
          {/* Dark charcoal torn accent strip */}
          <path
            d="M975 218 L1005 186 L1042 178 L1076 196 L1112 204 L1148 212 L1176 238 L1132 295 L965 275 Z"
            fill="#14161D"
            fillOpacity="0.9"
          />
          {/* Ruled butter-yellow paper angled on right */}
          <g transform="rotate(9 1240 275)">
            <path
              d="M1010 218 L1490 168 L1510 390 L995 390 Z"
              fill="var(--pastel-butter)"
            />
            <path
              d="M1010 218 L1490 168 L1510 390 L995 390 Z"
              fill="url(#ruled-lines)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
