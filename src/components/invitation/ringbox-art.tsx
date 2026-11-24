/*
 * Drawings for the ring-box engagement story: the velvet box whose lid swings
 * open, and the two-ring monogram. Fixed coordinates only (no maths), so server
 * and browser render identical SVG.
 */

/** Gradients used by every drawing here; render once near the story root. */
export function RingDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="rb-velvet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d4858" />
          <stop offset="1" stopColor="#552632" />
        </linearGradient>
        <linearGradient id="rb-velvet-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a35b6c" />
          <stop offset="1" stopColor="#7d3d4c" />
        </linearGradient>
        <linearGradient id="rb-lining" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dcd2" />
          <stop offset="1" stopColor="#e2b4a7" />
        </linearGradient>
        <linearGradient id="rb-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1cfae" />
          <stop offset="0.5" stopColor="#c48b74" />
          <stop offset="1" stopColor="#92583f" />
        </linearGradient>
        <radialGradient id="rb-beam" cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#fff3dc" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffd9b8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffd9b8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Velvet ring box. CSS opens the lid, lifts the rings and fires the glint. */
export function RingBoxArt() {
  return (
    <svg className="rb-box" viewBox="0 -30 240 270" aria-hidden>
      <ellipse cx="120" cy="214" rx="96" ry="9" fill="#552632" opacity="0.22" />

      <ellipse className="rb-beam" cx="120" cy="62" rx="96" ry="78" fill="url(#rb-beam)" />

      {/* opened lid, seen from inside, behind the box */}
      <g className="rb-lid back">
        <path d="M26 114 H214 L200 78 H40 Z" fill="url(#rb-lining)" />
        <path d="M60 110 L72 80 M90 110 L98 80 M120 110 V80 M150 110 L142 80 M180 110 L168 80" stroke="#c99a8c" strokeOpacity="0.55" strokeWidth="1" />
        <path d="M26 114 H214 L212 146 Q212 150 208 150 H32 Q28 150 28 146 Z" fill="#d6a395" />
        <path d="M30 118 H210" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.2" />
      </g>

      {/* base */}
      <path d="M28 114 H212 L206 198 Q205 205 198 205 H42 Q35 205 34 198 Z" fill="url(#rb-velvet)" />
      <path d="M28 114 H212 L198 78 H42 Z" fill="url(#rb-velvet-top)" />
      <path d="M38 110 H202 L192 84 H48 Z" fill="url(#rb-lining)" />
      <path d="M58 104 H182 L175 90 H65 Z" fill="#b98577" opacity="0.55" />
      <path d="M44 124 H196" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.4" />

      {/* rings standing in the slot */}
      <g className="rb-rings">
        <circle cx="96" cy="99" r="15" fill="none" stroke="url(#rb-gold)" strokeWidth="5" />
        <circle cx="144" cy="99" r="15" fill="none" stroke="url(#rb-gold)" strokeWidth="5" />
        <path d="M144 80 l7 7 -7 8 -7 -8z" fill="#fff9f2" stroke="url(#rb-gold)" strokeWidth="2" strokeLinejoin="round" />
        <path
          className="rb-glint"
          d="M144 74 l2.4 7 7 2.4 -7 2.4 -2.4 7 -2.4 -7 -7 -2.4 7 -2.4z"
          fill="#fffdf6"
        />
      </g>

      {/* closed lid, in front; fades out as the opening lid turns edge-on */}
      <g className="rb-lid front">
        <path d="M26 114 H214 L200 78 H40 Z" fill="url(#rb-velvet-top)" />
        <path d="M40 78 H200" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
        <path d="M26 114 H214 L212 146 Q212 150 208 150 H32 Q28 150 28 146 Z" fill="#6c3140" />
        <path d="M30 118 H210" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.2" />
        <rect x="111" y="121" width="18" height="15" rx="3.5" fill="url(#rb-gold)" />
        <circle cx="120" cy="128.5" r="2" fill="#552632" />
      </g>
    </svg>
  );
}

/** Two interlocking rings with the couple's initials. Rings turn into place; a sheen crosses them. */
export function Monogram({ a, b }: { a: string; b: string }) {
  return (
    <svg className="rb-mono" viewBox="0 0 260 170" aria-hidden>
      <g className="rb-ring-a">
        <circle cx="98" cy="88" r="52" fill="none" stroke="url(#rb-gold)" strokeWidth="6" />
        <circle className="rb-sheen" cx="98" cy="88" r="52" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" pathLength={1} />
      </g>
      <g className="rb-ring-b">
        <circle cx="162" cy="88" r="52" fill="none" stroke="url(#rb-gold)" strokeWidth="6" />
        <circle className="rb-sheen" cx="162" cy="88" r="52" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="2.4" strokeLinecap="round" pathLength={1} />
        <path className="rb-gem" d="M162 22 l10 10 -10 12 -10 -12z" fill="#fff9f2" stroke="url(#rb-gold)" strokeWidth="2.2" strokeLinejoin="round" />
      </g>
      <text className="rb-letter" x="74" y="104" textAnchor="middle">
        {a}
      </text>
      <text className="rb-letter" x="186" y="104" textAnchor="middle">
        {b}
      </text>
    </svg>
  );
}

/** A single ring used as a bullet. It draws itself when revealed. */
export function RingBullet() {
  return (
    <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden>
      <circle className="rb-bullet" cx="14" cy="14" r="10" fill="none" stroke="#c48b74" strokeWidth="3" pathLength={1} />
    </svg>
  );
}
