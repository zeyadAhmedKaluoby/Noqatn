import type { CSSProperties, ReactNode } from "react";

/*
 * Art for the wedding family: door/shutter leaves, the scenes revealed behind
 * them, and small hero ornaments. Fixed coordinates only, so the server and the
 * browser render identical SVG. Each leaf is drawn once and mirrored in CSS.
 */

/* ───────── Door leaves (one half; the other half is the same art mirrored) ───────── */

export function IronGateLeaf() {
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none">
      <g fill="none" stroke="#25301f" strokeLinecap="round">
        <rect x="4" y="40" width="92" height="256" strokeWidth="6" />
        <path d="M4 120 H96 M4 230 H96" strokeWidth="4" />
        {[18, 32, 46, 60, 74, 88].map((x) => (
          <path key={x} d={`M${x} 296 V52`} strokeWidth="3.2" />
        ))}
        {[18, 32, 46, 60, 74, 88].map((x) => (
          <path key={`t${x}`} d={`M${x - 5} 50 L${x} 36 L${x + 5} 50`} strokeWidth="3" />
        ))}
        <path d="M18 120 C18 100 46 100 46 120 M46 120 C46 100 74 100 74 120" strokeWidth="2.6" />
        <path d="M30 230 c-10 -16 10 -28 16 -12 M66 230 c10 -16 -10 -28 -16 -12" strokeWidth="2.6" />
        <circle cx="88" cy="175" r="5" strokeWidth="3" />
      </g>
    </svg>
  );
}

export function LatticeLeaf() {
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none">
      <defs>
        <pattern id="wm-lattice" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="none" stroke="#e2b46a" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2" fill="#e2b46a" />
        </pattern>
        <linearGradient id="wm-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a3417" />
          <stop offset="0.5" stopColor="#7a4a22" />
          <stop offset="1" stopColor="#5a3417" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="300" fill="url(#wm-wood)" />
      <rect x="10" y="12" width="80" height="150" rx="2" fill="#3a1f0c" />
      <rect x="10" y="12" width="80" height="150" rx="2" fill="url(#wm-lattice)" />
      <rect x="10" y="176" width="80" height="112" rx="2" fill="none" stroke="#c4924a" strokeWidth="2" />
      <path d="M20 190 H80 V274 H20 Z" fill="none" stroke="#c4924a" strokeWidth="1" opacity="0.7" />
      <circle cx="86" cy="170" r="4.5" fill="#e2b46a" />
    </svg>
  );
}

export function MoonDoorLeaf() {
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none">
      <rect x="0" y="0" width="100" height="300" fill="#e7a3b8" />
      <rect x="0" y="0" width="100" height="300" fill="none" stroke="#b86d87" strokeWidth="6" />
      <path d="M16 140 V60 C16 34 84 34 84 60 V140 Z" fill="#f2c3d1" stroke="#b86d87" strokeWidth="3" />
      <rect x="16" y="160" width="68" height="120" rx="4" fill="#f2c3d1" stroke="#b86d87" strokeWidth="3" />
      <circle cx="86" cy="150" r="5" fill="#e6c27a" />
    </svg>
  );
}

export function ShutterLeaf() {
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none">
      <rect x="0" y="0" width="100" height="300" fill="#f7f1fb" />
      <rect x="3" y="3" width="94" height="294" fill="none" stroke="#8d74a8" strokeWidth="6" />
      <path d="M3 150 H97" stroke="#8d74a8" strokeWidth="5" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M12 ${18 + i * 12} H88`} stroke="#b9a6d0" strokeWidth="5" strokeLinecap="round" />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <path key={`b${i}`} d={`M12 ${166 + i * 12} H88`} stroke="#b9a6d0" strokeWidth="5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ───────── Scenes revealed behind the doors ───────── */

export function GardenScene() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf4e4" />
          <stop offset="1" stopColor="#e7efe2" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#wg-sky)" />
      <circle cx="100" cy="96" r="44" fill="#fff6dc" />
      <path d="M0 150 C40 132 160 132 200 150 V300 H0 Z" fill="#a9c29a" />
      <path d="M84 150 L116 150 L170 300 L30 300 Z" fill="#ead9bd" />
      <path d="M70 150 C70 112 130 112 130 150" fill="none" stroke="#7d9a72" strokeWidth="7" />
      {[
        [72, 132], [80, 118], [96, 110], [112, 112], [126, 124], [130, 140],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#f0a7b8" />
      ))}
      {[
        [14, 200], [34, 236], [18, 272], [178, 206], [164, 244], [184, 280],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="16" fill="#7d9a72" />
          <circle cx={x - 5} cy={y - 4} r="5" fill="#f3b7c4" />
          <circle cx={x + 6} cy={y + 3} r="4" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

export function LanternScene() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="wm-glow" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#fff1c4" />
          <stop offset="0.5" stopColor="#f2b964" />
          <stop offset="1" stopColor="#7a4a22" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#wm-glow)" />
      {[50, 100, 150].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 0 V${50 + i * 14}`} stroke="#5a3417" strokeWidth="1.5" />
          <path d={`M${x - 10} ${54 + i * 14} H${x + 10} L${x + 13} ${84 + i * 14} H${x - 13} Z`} fill="#c4924a" />
          <rect x={x - 6} y={60 + i * 14} width="12" height="18" rx="5" fill="#fff4cf" />
        </g>
      ))}
      <path d="M0 230 H200 V300 H0 Z" fill="#8a5a2e" />
      {[0, 40, 80, 120, 160].map((x) => (
        <path key={x} d={`M${x} 230 L${x + 20} 300`} stroke="#6b4423" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

export function MoonScene() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141a33" />
          <stop offset="1" stopColor="#2c3768" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#wn-sky)" />
      <circle cx="132" cy="90" r="34" fill="#f6e7c4" />
      <circle cx="146" cy="82" r="30" fill="#2a3463" opacity="0.0" />
      {[
        [30, 40], [62, 74], [44, 120], [170, 150], [96, 30], [180, 40], [20, 170],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#f6e7c4" />
      ))}
      <path d="M0 220 H200 V300 H0 Z" fill="#1d2444" />
      <path d="M0 214 H200" stroke="#e6c27a" strokeWidth="3" />
      {[12, 36, 60, 84, 108, 132, 156, 180].map((x) => (
        <rect key={x} x={x} y="220" width="8" height="40" rx="3" fill="#2c3768" stroke="#e6c27a" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function LavenderScene() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="wl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9d9c4" />
          <stop offset="0.6" stopColor="#e9d3ef" />
          <stop offset="1" stopColor="#c7b6de" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#wl-sky)" />
      <circle cx="100" cy="126" r="28" fill="#fff0dc" />
      <path d="M0 150 H200 V300 H0 Z" fill="#9a84c0" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M100 150 L${-80 + i * 45} 300`} stroke="#6e58a0" strokeWidth={4 + i * 0.6} strokeLinecap="round" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={`h${i}`} d={`M100 150 L${-80 + i * 45} 300`} stroke="#b9a6d0" strokeWidth="1.4" strokeDasharray="2 6" />
      ))}
    </svg>
  );
}

/* ───────── Envelope seals ───────── */

export function SealFace({ kind }: { kind: "floral" | "plum" | "bismillah" }) {
  if (kind === "bismillah") {
    return (
      <span className="wd-seal-text" aria-hidden>
        بسم الله
      </span>
    );
  }
  return (
    <svg viewBox="0 0 40 40" width="60%" height="60%" aria-hidden>
      {kind === "floral" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="20" cy="20" r="4" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="20" cy="11" rx="4.5" ry="7" transform={`rotate(${a} 20 20)`} />
          ))}
        </g>
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M10 28 C14 10 26 10 30 28" />
          <path d="M14 22 H26" />
          <circle cx="20" cy="9" r="2.4" />
        </g>
      )}
    </svg>
  );
}

/* ───────── Hero ornaments ───────── */

const ornament = (children: ReactNode) => (
  <svg className="wd-ornament-svg" viewBox="0 0 160 48" aria-hidden>
    {children}
  </svg>
);

export const ORNAMENTS = {
  rose: () =>
    ornament(
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M10 30 C40 18 60 18 80 30 C100 18 120 18 150 30" />
        <circle cx="80" cy="24" r="7" fill="currentColor" opacity="0.25" />
        <path d="M80 17 c-4 4 -4 10 0 14 c4 -4 4 -10 0 -14 M73 24 c4 -4 10 -4 14 0 c-4 4 -10 4 -14 0" />
        <ellipse cx="48" cy="22" rx="7" ry="3" transform="rotate(-24 48 22)" fill="currentColor" opacity="0.4" />
        <ellipse cx="112" cy="22" rx="7" ry="3" transform="rotate(24 112 22)" fill="currentColor" opacity="0.4" />
      </g>,
    ),
  lattice: () =>
    ornament(
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M80 6 L96 24 L80 42 L64 24 Z" />
        <path d="M80 14 L88 24 L80 34 L72 24 Z" fill="currentColor" opacity="0.3" />
        <path d="M10 24 H58 M102 24 H150" />
        <circle cx="34" cy="24" r="3" fill="currentColor" />
        <circle cx="126" cy="24" r="3" fill="currentColor" />
      </g>,
    ),
  crescent: () =>
    ornament(
      <g fill="currentColor">
        <path d="M86 6 a18 18 0 1 0 0 36 a22 22 0 0 1 0 -36z" />
        <circle cx="104" cy="14" r="1.8" />
        <circle cx="58" cy="30" r="1.4" />
        <circle cx="120" cy="34" r="1.4" />
        <path d="M10 24 H50 M110 24 H150" stroke="currentColor" strokeWidth="1.2" />
      </g>,
    ),
  lavender: () =>
    ornament(
      <g>
        <path d="M80 44 V10 M80 44 C70 30 62 22 56 12 M80 44 C90 30 98 22 104 12" stroke="currentColor" strokeWidth="1.3" fill="none" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx="80" cy={10 + i * 5} rx="3" ry="2.4" fill="currentColor" opacity={0.85 - i * 0.1} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`l${i}`} cx={56 + i * 2} cy={12 + i * 5} rx="2.6" ry="2" fill="currentColor" opacity="0.7" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`r${i}`} cx={104 - i * 2} cy={12 + i * 5} rx="2.6" ry="2" fill="currentColor" opacity="0.7" />
        ))}
      </g>,
    ),
  wash: () =>
    ornament(
      <g>
        <path d="M14 26 C40 12 70 34 96 22 C118 12 136 22 148 18" stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.25" />
        <path d="M24 28 C48 18 76 34 100 24 C120 16 134 24 142 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>,
    ),
  seal: () =>
    ornament(
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="80" cy="24" r="16" />
        <circle cx="80" cy="24" r="11" fill="currentColor" opacity="0.2" />
        <path d="M10 24 H58 M102 24 H150" />
      </g>,
    ),
  royal: () =>
    ornament(
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M80 8 L92 24 L80 40 L68 24 Z" />
        <path d="M80 15 L86 24 L80 33 L74 24 Z" fill="currentColor" />
        <path d="M8 24 H56 M104 24 H152" />
        <path d="M56 24 C50 14 40 14 38 22 M104 24 C110 14 120 14 122 22" />
        <circle cx="30" cy="24" r="2.2" fill="currentColor" />
        <circle cx="130" cy="24" r="2.2" fill="currentColor" />
      </g>,
    ),
  bow: () =>
    ornament(
      <g fill="currentColor">
        <path d="M80 24 C70 8 54 10 56 22 C58 34 72 30 80 24 Z" opacity="0.85" />
        <path d="M80 24 C90 8 106 10 104 22 C102 34 88 30 80 24 Z" opacity="0.85" />
        <path d="M78 27 L68 44 L73 43 L75 46 L81 28 Z M82 27 L92 44 L87 43 L85 46 L79 28 Z" opacity="0.7" />
        <rect x="75" y="19" width="10" height="10" rx="3" />
        <path d="M10 24 H50 M110 24 H150" stroke="currentColor" strokeWidth="1.1" />
      </g>,
    ),
  line: () =>
    ornament(
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M24 24 H70 M90 24 H136" />
        <circle cx="80" cy="24" r="4" />
      </g>,
    ),
  star: () =>
    ornament(
      <g fill="currentColor">
        <path d="M80 6 C82 18 86 22 98 24 C86 26 82 30 80 42 C78 30 74 26 62 24 C74 22 78 18 80 6 Z" />
        <path d="M46 16 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 Z" opacity="0.7" />
        <path d="M114 16 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 Z" opacity="0.7" />
        <path d="M8 24 H38 M122 24 H152" stroke="currentColor" strokeWidth="1.1" />
      </g>,
    ),
  bismillah: () => (
    <span className="wd-ornament-bism" aria-hidden>
      بسم الله الرحمن الرحيم
    </span>
  ),
} as const;

export type OrnamentKey = keyof typeof ORNAMENTS;

/* ───────── Decorative falling petals / watercolour blobs ───────── */

export function Petals() {
  return (
    <span className="wd-petals" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} style={{ "--i": i, left: `${(i * 37 + 8) % 100}%` } as CSSProperties} />
      ))}
    </span>
  );
}

export function Wash() {
  return (
    <span className="wd-wash" aria-hidden>
      <i className="b1" />
      <i className="b2" />
      <i className="b3" />
      <i className="b4" />
    </span>
  );
}

/* ───────── Frames that draw themselves around the names ───────── */

/** Mirror a right-hand half onto the left. */
const MIRROR = "matrix(-1 0 0 1 200 0)";

function Halves({ children }: { children: ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform={MIRROR}>{children}</g>
    </>
  );
}

const bloom = (d: number, children: ReactNode, key?: string) => (
  <g key={key} className="wd-bloom" style={{ "--d": d } as CSSProperties}>
    {children}
  </g>
);

function RoyalStrokes({ draw }: { draw?: boolean }) {
  const len = draw ? { pathLength: 1 } : {};
  return (
    <Halves>
      <path d="M100 6 C152 6 194 30 194 76 V284 H100" strokeWidth="2.2" {...len} />
      <path d="M100 16 C146 16 184 38 184 80 V274 H100" strokeWidth="1" {...len} />
      <path d="M184 100 C168 100 162 114 170 122 C177 128 188 120 182 112" strokeWidth="1.3" {...len} />
      <path d="M184 254 C168 254 160 268 168 274 M174 274 C160 262 166 246 184 246" strokeWidth="1.3" {...len} />
      <path d="M116 274 C126 262 142 264 146 274" strokeWidth="1.1" {...len} />
    </Halves>
  );
}

export function RoyalFrame() {
  return (
    <svg className="wd-frame-svg" viewBox="0 -10 200 304" aria-hidden>
      <g className="wd-fr-ghost" fill="none" stroke="currentColor" strokeLinecap="round">
        <RoyalStrokes />
      </g>
      <g className="wd-fr-draw" fill="none" stroke="currentColor" strokeLinecap="round">
        <RoyalStrokes draw />
      </g>
      <g fill="currentColor">
        {bloom(0, <path d="M100 -6 L110 6 L100 18 L90 6 Z" />)}
        {bloom(1, <path d="M100 274 L108 284 L100 294 L92 284 Z" />)}
        {bloom(2, <circle cx="176" cy="114" r="3" />)}
        {bloom(2, <circle cx="24" cy="114" r="3" />)}
        {bloom(3, <circle cx="194" cy="284" r="4" />)}
        {bloom(3, <circle cx="6" cy="284" r="4" />)}
      </g>
    </svg>
  );
}

function Rose({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r / 9})`}>
      <ellipse cx="-10" cy="4" rx="7" ry="3.4" fill="#8aa37f" transform="rotate(-28 -10 4)" />
      <ellipse cx="10" cy="5" rx="7" ry="3.4" fill="#7f9a78" transform="rotate(24 10 5)" />
      <circle r="9" fill="#f3b7c4" />
      <circle r="6.4" fill="#ea9fb1" />
      <path d="M-3.5 -0.5 a3.6 3.6 0 1 1 3.6 3.6 a2 2 0 0 1 -1.6 -3" fill="none" stroke="#c4707f" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function Leaf({ x, y, a }: { x: number; y: number; a: number }) {
  return <ellipse cx={x} cy={y} rx="7" ry="3.2" fill="#8aa37f" transform={`rotate(${a} ${x} ${y})`} />;
}

function GardenVine({ draw }: { draw?: boolean }) {
  const len = draw ? { pathLength: 1 } : {};
  return (
    <Halves>
      <path d="M100 8 C162 8 194 70 194 145 C194 222 158 282 100 282" strokeWidth="2" {...len} />
      <path d="M100 18 C154 18 184 76 184 145 C184 214 152 272 100 272" strokeWidth="0.8" strokeDasharray={draw ? undefined : "2 4"} {...len} />
      <path d="M190 104 C178 98 176 86 184 82 M188 192 C176 196 172 208 180 212" strokeWidth="1.1" {...len} />
    </Halves>
  );
}

export function GardenFrame() {
  const side = (mirror: boolean) => {
    const k = mirror ? "l" : "r";
    return (
      <g transform={mirror ? MIRROR : undefined}>
        {bloom(1, <Leaf x={140} y={14} a={-12} />, `${k}1`)}
        {bloom(2, <Leaf x={186} y={84} a={64} />, `${k}2`)}
        {bloom(3, <Rose x={170} y={48} r={7} />, `${k}3`)}
        {bloom(4, <Rose x={194} y={145} r={10} />, `${k}4`)}
        {bloom(5, <Leaf x={190} y={196} a={-70} />, `${k}5`)}
        {bloom(6, <Rose x={169} y={242} r={7} />, `${k}6`)}
        {bloom(7, <Leaf x={140} y={276} a={14} />, `${k}7`)}
      </g>
    );
  };
  return (
    <svg className="wd-frame-svg" viewBox="0 -10 200 304" aria-hidden>
      <g className="wd-fr-ghost" fill="none" stroke="#7f9a78" strokeLinecap="round">
        <GardenVine />
      </g>
      <g className="wd-fr-draw" fill="none" stroke="#6f8a68" strokeLinecap="round">
        <GardenVine draw />
      </g>
      {side(false)}
      {side(true)}
      {bloom(0, <Rose x={100} y={8} r={12} />)}
      {bloom(8, <Rose x={100} y={282} r={12} />)}
    </svg>
  );
}

/* ───────── Letter ties ───────── */

export function BowKnot() {
  return (
    <svg viewBox="0 0 120 76" aria-hidden>
      <g className="wd-bow-loop l">
        <path d="M60 30 C42 2 6 8 12 30 C18 52 46 44 60 30 Z" fill="var(--lt-ribbon)" />
        <path d="M54 30 C42 14 22 14 22 28" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g className="wd-bow-loop r">
        <path d="M60 30 C78 2 114 8 108 30 C102 52 74 44 60 30 Z" fill="var(--lt-ribbon)" />
        <path d="M66 30 C78 14 98 14 98 28" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g className="wd-bow-tails" fill="var(--lt-ribbon-dark)">
        <path d="M56 34 L38 74 L46 70 L50 76 L62 36 Z" />
        <path d="M64 34 L82 74 L74 70 L70 76 L58 36 Z" />
      </g>
      <rect className="wd-bow-knot" x="51" y="21" width="18" height="18" rx="5" fill="var(--lt-ribbon-dark)" />
    </svg>
  );
}
