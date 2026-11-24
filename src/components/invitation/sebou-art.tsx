import type { CSSProperties } from "react";

/*
 * Drawings for the Sebou story: festival lanterns, the mortar and pestle (الهون)
 * and a garland. Coordinates are fixed numbers (no maths), so server and browser
 * render identical SVG.
 */

const PALETTE = {
  teal: { body: "#2bb8b0", dark: "#1a8a84" },
  orange: { body: "#f08a24", dark: "#c46a12" },
  navy: { body: "#3b4a74", dark: "#24304a" },
  pink: { body: "#e8648c", dark: "#b8406a" },
} as const;

export type LanternColor = keyof typeof PALETTE;

/** A festival lantern. The flame and glow are lit by CSS (.sb-lit or a delay var --i). */
export function Lantern({ color, index = 0 }: { color: LanternColor; index?: number }) {
  const c = PALETTE[color];
  return (
    <svg className="sb-lantern" viewBox="0 0 64 124" style={{ "--i": index } as CSSProperties} aria-hidden>
      <circle className="sb-glow" cx="32" cy="66" r="34" fill="url(#sb-glow-fill)" />
      <path d="M32 0 V14" stroke="#7a6a58" strokeWidth="1.6" />
      <circle cx="32" cy="16" r="3.4" fill="none" stroke="#c9a24a" strokeWidth="2" />
      <path d="M22 26 C22 20 27 18 32 18 C37 18 42 20 42 26 Z" fill={c.dark} />
      <path d="M18 28 H46 L50 36 H14 Z" fill="#c9a24a" />
      <path d="M14 36 H50 L54 92 H10 Z" fill={c.body} />
      <path d="M32 36 V92 M22 36 L18 92 M42 36 L46 92" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" />
      <rect x="20" y="46" width="24" height="36" rx="12" fill="#fff6dc" className="sb-pane" />
      <path
        className="sb-flame"
        d="M32 52 C26 60 27 68 32 76 C37 68 38 60 32 52 Z"
        fill="url(#sb-flame-fill)"
      />
      <path d="M10 92 H54 L50 100 H14 Z" fill="#c9a24a" />
      <path d="M16 100 H48 L44 108 H20 Z" fill={c.dark} />
      <path d="M32 108 V118 M27 108 L25 120 M37 108 L39 120" stroke="#c9a24a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Gradients shared by every lantern; render once per page area. */
export function SebouDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <radialGradient id="sb-glow-fill">
          <stop offset="0" stopColor="#ffe08a" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffb85c" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sb-flame-fill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff8a2a" />
          <stop offset="0.5" stopColor="#ffc35a" />
          <stop offset="1" stopColor="#fff4d6" />
        </linearGradient>
        <linearGradient id="sb-copper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a4a22" />
          <stop offset="0.4" stopColor="#e9a46a" />
          <stop offset="0.62" stopColor="#c47a42" />
          <stop offset="1" stopColor="#7a3f1c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** The mortar. The pestle strikes it three times when the cover opens. */
export function Mortar() {
  return (
    <svg className="sb-mortar" viewBox="0 0 200 190" aria-hidden>
      <ellipse cx="100" cy="176" rx="64" ry="8" fill="#24304a" opacity="0.18" />
      <g className="sb-pestle">
        <rect x="92" y="34" width="16" height="76" rx="8" fill="url(#sb-copper)" />
        <circle cx="100" cy="36" r="13" fill="url(#sb-copper)" />
        <rect x="90" y="96" width="20" height="16" rx="6" fill="#c47a42" />
      </g>
      <path d="M34 98 H166 L152 168 C150 174 144 178 138 178 H62 C56 178 50 174 48 168 Z" fill="url(#sb-copper)" />
      <ellipse cx="100" cy="98" rx="66" ry="12" fill="#6a3418" />
      <ellipse cx="100" cy="97" rx="58" ry="8.4" fill="#2a1408" />
      <path d="M52 124 H148 M56 142 H144" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M70 178 V184 M130 178 V184" stroke="#7a3f1c" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** A row of lanterns hanging from a string. */
export function Garland({ className = "" }: { className?: string }) {
  const lanterns: { color: LanternColor; scale: number }[] = [
    { color: "teal", scale: 0.82 },
    { color: "orange", scale: 1 },
    { color: "pink", scale: 0.9 },
    { color: "navy", scale: 1.04 },
    { color: "teal", scale: 0.8 },
  ];
  return (
    <div className={`sb-garland ${className}`.trim()} aria-hidden>
      <svg className="sb-garland-string" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path d="M0 4 C100 22 300 22 400 4" fill="none" stroke="#7a6a58" strokeWidth="1.6" />
      </svg>
      {lanterns.map((lantern, i) => (
        <span key={i} className="sb-garland-item" style={{ "--s": lantern.scale, "--d": `${i * 0.35}s` } as CSSProperties}>
          <Lantern color={lantern.color} index={i} />
        </span>
      ))}
    </div>
  );
}
