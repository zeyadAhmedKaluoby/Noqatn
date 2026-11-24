import type { CSSProperties } from "react";

/*
 * Cover art, hero decoration and icons for the festive stories (birthday and
 * sebou party templates). Fixed coordinates only, so server and browser render
 * identical SVG. Colours come from CSS (--pt-a … --pt-d) or fixed hex values.
 */

/* ───────── Confetti / sweets burst (deterministic, no Math.random) ───────── */

const BURST_COLORS = ["#ff4f8b", "#3ec6ff", "#ffe14a", "#7b3ff2", "#ff8a2a", "#22d3c5", "#ffffff"];

const RADIAL = Array.from({ length: 36 }, (_, index) => {
  const angle = (index / 36) * Math.PI * 2 + (index % 3) * 0.19;
  const reach = 100 + ((index * 41) % 120);
  return {
    x: Math.round(Math.cos(angle) * reach),
    y: Math.round(Math.sin(angle) * reach * 0.85),
    color: BURST_COLORS[index % BURST_COLORS.length],
    delay: (index % 6) * 24,
    shape: index % 3,
  };
});

const UPWARD = Array.from({ length: 36 }, (_, index) => {
  const spread = ((index * 37) % 200) - 100;
  const rise = 150 + ((index * 59) % 150);
  return {
    x: spread,
    y: -rise,
    color: BURST_COLORS[index % BURST_COLORS.length],
    delay: (index % 7) * 26,
    shape: index % 3,
  };
});

/** Pieces fly out when the cover opens. `up` shoots them upward (gift box). */
export function Beads({ mode = "radial" }: { mode?: "radial" | "up" }) {
  const pieces = mode === "up" ? UPWARD : RADIAL;
  return (
    <span className="pt-beads" aria-hidden>
      {pieces.map((piece, index) => (
        <i
          key={index}
          className={`s${piece.shape}`}
          style={
            {
              "--x": `${piece.x}px`,
              "--y": `${piece.y}px`,
              "--d": `${piece.delay}ms`,
              background: piece.color,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

/* ───────── Birthday candles: a cake whose flames go out ───────── */

export function CandlesArt() {
  const candles = [
    { x: 88, color: "#ff4f8b" },
    { x: 120, color: "#3ec6ff" },
    { x: 152, color: "#ffd21f" },
  ];
  return (
    <svg className="pt-art" viewBox="0 0 240 260" aria-hidden>
      <ellipse cx="120" cy="240" rx="106" ry="12" fill="#351848" opacity="0.14" />
      <ellipse cx="120" cy="228" rx="102" ry="14" fill="#ffffff" stroke="#e5d4f2" strokeWidth="1.5" />
      <rect x="40" y="152" width="160" height="74" rx="14" fill="#ff8fb5" />
      <path d="M40 152 V166 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 q10 16 20 0 V152 Z" fill="#ffe0ec" />
      <rect x="68" y="108" width="104" height="48" rx="12" fill="#a371ff" />
      <path d="M68 108 V120 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 q6.5 14 13 0 V108 Z" fill="#e6d9ff" />
      {[56, 84, 112, 140, 168].map((x, i) => (
        <rect key={x} x={x} y={188 + (i % 2) * 14} width="9" height="4" rx="2" fill={["#ffe14a", "#3ec6ff", "#ffffff", "#7b3ff2", "#ffe14a"][i]} transform={`rotate(${i % 2 ? -20 : 20} ${x} ${190 + (i % 2) * 14})`} />
      ))}
      <circle cx="120" cy="104" r="0" fill="none" />
      {candles.map((candle, index) => (
        <g key={candle.x}>
          <rect x={candle.x - 3.5} y="68" width="7" height="42" rx="2" fill={candle.color} />
          <path d={`M${candle.x - 3.5} 80 l7 -5 M${candle.x - 3.5} 92 l7 -5 M${candle.x - 3.5} 104 l7 -5`} stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
          <path className="bc-smoke" style={{ "--i": index } as CSSProperties} d={`M${candle.x} 62 c-7 -10 7 -18 0 -30`} fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <g className="bc-flame" style={{ "--i": index } as CSSProperties}>
            <path d={`M${candle.x} 66 c-6 -7 -5 -15 0 -24 c5 9 6 17 0 24z`} fill="#ffa43a" />
            <path d={`M${candle.x} 64 c-3 -4 -2 -8 0 -13 c2 5 3 9 0 13z`} fill="#fff4b8" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ───────── Confetti party: a cluster of balloons that pop one by one ───────── */

const BALLOONS = [
  { cx: 70, cy: 104, rx: 40, ry: 48, color: "#ff5a1f" },
  { cx: 190, cy: 104, rx: 40, ry: 48, color: "#22d3c5" },
  { cx: 130, cy: 72, rx: 44, ry: 52, color: "#ff3d7f" },
  { cx: 100, cy: 154, rx: 38, ry: 46, color: "#7c5cff" },
  { cx: 160, cy: 154, rx: 38, ry: 46, color: "#ffb703" },
  { cx: 130, cy: 124, rx: 36, ry: 44, color: "#3ec6ff" },
];

export function BalloonsArt() {
  return (
    <svg className="pt-art" viewBox="0 0 260 290" aria-hidden>
      <ellipse cx="130" cy="278" rx="50" ry="6" fill="#1d1a4a" opacity="0.15" />
      <g className="bf-strings" fill="none" stroke="#1d1a4a" strokeOpacity="0.45" strokeWidth="1.2">
        <path d="M70 152 C80 200 120 230 130 258" />
        <path d="M190 152 C180 200 140 230 130 258" />
        <path d="M130 124 C126 190 134 230 130 258" />
        <path d="M100 200 C108 224 124 240 130 258" />
        <path d="M160 200 C152 224 136 240 130 258" />
      </g>
      <rect x="116" y="256" width="28" height="18" rx="5" fill="#1d1a4a" />
      {BALLOONS.map((balloon, index) => (
        <g key={index} className="bf-balloon" style={{ "--i": index } as CSSProperties}>
          <ellipse cx={balloon.cx} cy={balloon.cy} rx={balloon.rx} ry={balloon.ry} fill={balloon.color} stroke="#1d1a4a" strokeWidth="3" />
          <ellipse cx={balloon.cx - balloon.rx * 0.35} cy={balloon.cy - balloon.ry * 0.38} rx={balloon.rx * 0.2} ry={balloon.ry * 0.3} fill="#fff" opacity="0.5" transform={`rotate(-24 ${balloon.cx - balloon.rx * 0.35} ${balloon.cy - balloon.ry * 0.38})`} />
          <circle className="bf-ring" cx={balloon.cx} cy={balloon.cy} r={balloon.rx * 0.9} fill="none" stroke={balloon.color} strokeWidth="4" />
        </g>
      ))}
    </svg>
  );
}

/* ───────── Gift burst: a box whose ribbon unties and lid pops ───────── */

export function GiftArt() {
  return (
    <svg className="pt-art" viewBox="0 0 240 270" aria-hidden>
      <ellipse cx="120" cy="250" rx="100" ry="11" fill="#3a2148" opacity="0.16" />
      <g className="gx-card">
        <rect x="78" y="102" width="84" height="72" rx="7" fill="#ffffff" stroke="#3a2148" strokeWidth="2.5" />
        <path d="M120 112 l4 10 11 1 -8.5 7 3 10.5 -9.5 -6 -9.5 6 3 -10.5 -8.5 -7 11 -1z" fill="#ffe14a" stroke="#3a2148" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M92 156 H148 M100 164 H140" stroke="#7b3ff2" strokeWidth="3" strokeLinecap="round" />
      </g>
      <rect x="52" y="126" width="136" height="108" rx="9" fill="#ff5a8a" stroke="#3a2148" strokeWidth="3" />
      <rect x="108" y="126" width="24" height="108" fill="#7b3ff2" stroke="#3a2148" strokeWidth="2.5" />
      <path d="M62 140 H98 M62 152 H88" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
      <g className="gx-lid">
        <rect x="40" y="94" width="160" height="38" rx="9" fill="#ff7aa3" stroke="#3a2148" strokeWidth="3" />
        <rect x="108" y="94" width="24" height="38" fill="#7b3ff2" stroke="#3a2148" strokeWidth="2.5" />
        <g className="gx-bow">
          <path className="gx-loop-l" d="M120 94 C88 52 54 74 96 96 Z" fill="#ffe14a" stroke="#3a2148" strokeWidth="3" strokeLinejoin="round" />
          <path className="gx-loop-r" d="M120 94 C152 52 186 74 144 96 Z" fill="#ffe14a" stroke="#3a2148" strokeWidth="3" strokeLinejoin="round" />
          <path className="gx-tail-l" d="M114 98 L96 126 L108 122 L112 132 L122 102Z" fill="#ffc400" stroke="#3a2148" strokeWidth="2.5" strokeLinejoin="round" />
          <path className="gx-tail-r" d="M126 98 L144 126 L132 122 L128 132 L118 102Z" fill="#ffc400" stroke="#3a2148" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="108" y="84" width="24" height="20" rx="7" fill="#ffe14a" stroke="#3a2148" strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}

/* ───────── Sebou party: the sieve (الغربال) full of sweets ───────── */

const CANDIES = [
  { x: 96, y: 104, r: 10, color: "#ff4d6d", dx: -60, dy: 110 },
  { x: 130, y: 92, r: 9, color: "#ffb703", dx: 10, dy: 130 },
  { x: 164, y: 104, r: 10, color: "#7c5cff", dx: 70, dy: 120 },
  { x: 84, y: 134, r: 9, color: "#22b8cf", dx: -90, dy: 90 },
  { x: 116, y: 124, r: 11, color: "#ffffff", dx: -30, dy: 140 },
  { x: 148, y: 128, r: 10, color: "#ff4d6d", dx: 40, dy: 135 },
  { x: 178, y: 136, r: 9, color: "#ffb703", dx: 95, dy: 95 },
  { x: 100, y: 160, r: 10, color: "#7c5cff", dx: -70, dy: 120 },
  { x: 134, y: 156, r: 9, color: "#22b8cf", dx: 15, dy: 140 },
  { x: 164, y: 164, r: 11, color: "#ffffff", dx: 60, dy: 125 },
  { x: 118, y: 184, r: 9, color: "#ffb703", dx: -25, dy: 120 },
  { x: 148, y: 188, r: 10, color: "#ff4d6d", dx: 35, dy: 118 },
];

export function SieveArt() {
  return (
    <svg className="pt-art" viewBox="0 0 260 260" aria-hidden>
      <defs>
        <pattern id="sf-mesh" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0 H10 M0 0 V10" stroke="#b9803f" strokeWidth="0.8" opacity="0.7" />
        </pattern>
      </defs>
      <ellipse cx="130" cy="246" rx="86" ry="9" fill="#1c2a4a" opacity="0.14" />
      <g className="sf-sieve">
        <circle cx="130" cy="130" r="92" fill="#fff6dd" fillOpacity="0.55" />
        <circle cx="130" cy="130" r="92" fill="url(#sf-mesh)" />
        <circle cx="130" cy="130" r="100" fill="none" stroke="#a9702f" strokeWidth="16" />
        <circle cx="130" cy="130" r="92" fill="none" stroke="#d9a45f" strokeWidth="4" />
        <path d="M60 78 A84 84 0 0 1 112 46" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
        {CANDIES.map((candy, index) => (
          <circle
            key={index}
            className="sf-candy"
            style={{ "--i": index, "--dx": `${candy.dx}px`, "--dy": `${candy.dy}px` } as CSSProperties}
            cx={candy.x}
            cy={candy.y}
            r={candy.r}
            fill={candy.color}
            stroke="#1c2a4a"
            strokeWidth="2.4"
          />
        ))}
      </g>
    </svg>
  );
}

/* ───────── Hero decoration ───────── */

const FLAG_POINTS = [
  [0, 0],
  [38, 0],
  [19, 36],
];

/** A string of pennants across the top. Colours come from CSS classes f0…f3. */
export function Bunting() {
  return (
    <svg className="pt-bunting" viewBox="0 0 400 54" preserveAspectRatio="none" aria-hidden>
      <path d="M0 4 C100 22 300 22 400 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = 4 + i * 43;
        const dropY = [2, 8, 13, 17, 19, 17, 13, 8, 2][i];
        return (
          <polygon
            key={i}
            className={`pt-flag f${i % 4}`}
            points={FLAG_POINTS.map(([px, py]) => `${x + px},${py + dropY}`).join(" ")}
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}

/** Streamers draped diagonally from the top corners. */
export function Streamers() {
  return (
    <svg className="pt-streamers" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden>
      <path className="pt-stream a" d="M0 0 C60 40 120 20 190 70" fill="none" strokeWidth="9" strokeLinecap="round" />
      <path className="pt-stream b" d="M0 18 C54 62 116 40 176 96" fill="none" strokeWidth="9" strokeLinecap="round" />
      <path className="pt-stream c" d="M400 0 C340 40 280 20 210 70" fill="none" strokeWidth="9" strokeLinecap="round" />
      <path className="pt-stream d" d="M400 18 C346 62 284 40 224 96" fill="none" strokeWidth="9" strokeLinecap="round" />
      {[40, 90, 150, 250, 310, 360].map((x, i) => (
        <circle key={x} className={`pt-dot f${i % 4}`} cx={x} cy={[30, 70, 48, 52, 74, 32][i]} r="4.5" />
      ))}
    </svg>
  );
}

/** Ribbon corners, like the corners of a wrapped present. */
export function RibbonCorners() {
  return (
    <svg className="pt-corners" viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden>
      <path className="pt-stream a" d="M0 36 L150 0" fill="none" strokeWidth="26" />
      <path className="pt-stream b" d="M400 36 L250 0" fill="none" strokeWidth="26" />
      <path className="pt-stream c" d="M0 64 L110 34" fill="none" strokeWidth="9" />
      <path className="pt-stream c" d="M400 64 L290 34" fill="none" strokeWidth="9" />
    </svg>
  );
}

/* ───────── Icons for the three "moments" cards ───────── */

export type IconName = "cake" | "game" | "gift" | "balloon" | "star" | "music" | "sweet" | "light" | "camera";

export function Icon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 32 32", width: 28, height: 28, fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "cake":
      return (
        <svg {...common}>
          <rect x="6" y="15" width="20" height="11" rx="2" />
          <path d="M6 20 q3.3 3 6.6 0 q3.3 3 6.6 0 q3.3 3 6.8 0" />
          <path d="M16 15 V9 M16 4 c1.8 2 1.8 3.8 0 5.2 c-1.8 -1.4 -1.8 -3.2 0 -5.2z" />
        </svg>
      );
    case "game":
      return (
        <svg {...common}>
          <rect x="3" y="10" width="26" height="14" rx="7" />
          <path d="M10 14 V20 M7 17 H13" />
          <circle cx="21" cy="15" r="1.4" fill="currentColor" />
          <circle cx="24.5" cy="19" r="1.4" fill="currentColor" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="5" y="13" width="22" height="14" rx="2" />
          <rect x="3" y="9" width="26" height="5" rx="1.5" />
          <path d="M16 9 V27 M16 9 c-4 -6 -9 -2 -5 0 M16 9 c4 -6 9 -2 5 0" />
        </svg>
      );
    case "balloon":
      return (
        <svg {...common}>
          <ellipse cx="16" cy="12" rx="8" ry="9" />
          <path d="M16 21 L14.5 24 H17.5 Z M16 24 c-2 2 2 3 0 6" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M16 4 l3.6 7.6 8.4 1 -6.2 5.7 1.7 8.3 -7.5 -4.2 -7.5 4.2 1.7 -8.3 -6.2 -5.7 8.4 -1z" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M12 23 V8 l13 -3 v15" />
          <circle cx="9" cy="23" r="3.2" fill="currentColor" />
          <circle cx="22" cy="20" r="3.2" fill="currentColor" />
        </svg>
      );
    case "sweet":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="7" />
          <path d="M9 16 L3 11 V21 Z M23 16 L29 11 V21 Z" />
        </svg>
      );
    case "light":
      return (
        <svg {...common}>
          <path d="M10 12 h12 l2 12 h-16 z M13 12 c0 -4 6 -4 6 0 M16 5 V3 M9 7 L7.5 5.5 M23 7 L24.5 5.5" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="24" height="16" rx="3" />
          <circle cx="16" cy="18" r="4.5" />
          <path d="M11 10 L13 6 H19 L21 10" />
        </svg>
      );
  }
}
