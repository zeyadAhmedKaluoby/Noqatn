import type { CSSProperties } from "react";

/*
 * Olive branch drawings for the Aqiqah story. Leaf positions are computed from
 * the stem geometry and rounded, so the server and the browser render the same
 * SVG attributes (unrounded floats cause hydration mismatches).
 */

const r1 = (value: number) => Math.round(value * 10) / 10;

function Leaf({ x, y, angle, index, size = 1 }: { x: number; y: number; angle: number; index: number; size?: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)}) scale(${size})`}>
      <g className="aq-leaf" style={{ "--i": index } as CSSProperties}>
        <path d="M0 0 C6 -7 22 -8 34 0 C22 8 6 7 0 0Z" fill="url(#aq-leaf-fill)" />
        <path d="M2 0 L30 0" stroke="#e7efd9" strokeOpacity="0.55" strokeWidth="0.9" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Gradients used by every olive drawing; render once per SVG. */
export function OliveDefs() {
  return (
    <defs>
      <linearGradient id="aq-leaf-fill" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8fa982" />
        <stop offset="1" stopColor="#56755a" />
      </linearGradient>
      <radialGradient id="aq-olive-fill" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#8a9a62" />
        <stop offset="1" stopColor="#4a5a34" />
      </radialGradient>
    </defs>
  );
}

function cubic(t: number, p: readonly [number, number][]) {
  const u = 1 - t;
  const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
  const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
  const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const STEM: readonly [number, number][] = [
  [62, 330],
  [34, 236],
  [196, 206],
  [168, 46],
];

/** A single tall branch for the cover. Leaves start folded; CSS unfolds them in order. */
export function OliveBranch() {
  const steps = 12;
  const leaves = Array.from({ length: steps }, (_, i) => {
    const t = 0.1 + (i / (steps - 1)) * 0.86;
    const point = cubic(t, STEM);
    const side = i % 2 === 0 ? -1 : 1;
    return { ...point, angle: point.angle + side * 52, size: 1.05 - (i / steps) * 0.3, side };
  });
  const tip = cubic(1, STEM);
  const olives = [2, 5, 8].map((i) => ({ x: leaves[i].x, y: leaves[i].y, side: leaves[i].side }));

  return (
    <svg className="aq-branch" viewBox="0 0 240 350" aria-hidden>
      <OliveDefs />
      <path
        className="aq-stem"
        d={`M${STEM[0][0]} ${STEM[0][1]} C${STEM[1][0]} ${STEM[1][1]} ${STEM[2][0]} ${STEM[2][1]} ${STEM[3][0]} ${STEM[3][1]}`}
        fill="none"
        stroke="#6b5b3e"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
      />
      {leaves.map((leaf, i) => (
        <Leaf key={i} x={leaf.x} y={leaf.y} angle={leaf.angle} index={i} size={leaf.size} />
      ))}
      <Leaf x={tip.x} y={tip.y} angle={tip.angle} index={steps} size={0.9} />
      {olives.map((olive, i) => (
        <ellipse
          key={i}
          className="aq-olive"
          style={{ "--i": steps + 1 + i } as CSSProperties}
          cx={r1(olive.x + olive.side * 7)}
          cy={r1(olive.y + 9)}
          rx="6.4"
          ry="8.6"
          fill="url(#aq-olive-fill)"
        />
      ))}
    </svg>
  );
}

/** Two olive branches meeting at the top, forming a wreath around the baby's name. */
export function OliveWreath() {
  const cx = 110;
  const cy = 110;
  const radius = 78;
  const per = 8;
  const leaves = (["left", "right"] as const).flatMap((side) =>
    Array.from({ length: per }, (_, k) => {
      const phi = ((k + 1) / (per + 1)) * Math.PI;
      const sign = side === "left" ? -1 : 1;
      const x = cx + sign * radius * Math.sin(phi);
      const y = cy + radius * Math.cos(phi);
      const tangent = (Math.atan2(-Math.sin(phi), sign === -1 ? -Math.cos(phi) : Math.cos(phi)) * 180) / Math.PI;
      const outward = k % 2 === 0 ? 40 : -40;
      return { x, y, angle: tangent + outward, index: k * 2 + (side === "left" ? 0 : 1) };
    }),
  );

  return (
    <svg className="aq-wreath" viewBox="0 0 220 220" aria-hidden>
      <OliveDefs />
      <path
        className="aq-wreath-stem"
        d={`M${cx} ${cy + radius} A${radius} ${radius} 0 0 1 ${cx} ${cy - radius}`}
        fill="none"
        stroke="#6b5b3e"
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={1}
      />
      <path
        className="aq-wreath-stem"
        d={`M${cx} ${cy + radius} A${radius} ${radius} 0 0 0 ${cx} ${cy - radius}`}
        fill="none"
        stroke="#6b5b3e"
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={1}
      />
      {leaves.map((leaf) => (
        <Leaf key={leaf.index} x={leaf.x} y={leaf.y} angle={leaf.angle} index={leaf.index} size={0.78} />
      ))}
      {[3, 8, 12].map((i) => (
        <ellipse
          key={i}
          className="aq-olive"
          style={{ "--i": 16 + i } as CSSProperties}
          cx={r1(leaves[i].x)}
          cy={r1(leaves[i].y + 7)}
          rx="5"
          ry="6.8"
          fill="url(#aq-olive-fill)"
        />
      ))}
    </svg>
  );
}

/** Small sprig for dividers and the closing section. */
export function OliveSprig({ size = 54 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 40" width={size} height={size / 2} aria-hidden>
      <OliveDefs />
      <path d="M6 20 H74" stroke="#6b5b3e" strokeWidth="1.6" strokeLinecap="round" />
      {[14, 26, 38, 50, 62].map((x, i) => (
        <g key={x} transform={`translate(${x} 20) rotate(${i % 2 ? 48 : -48}) scale(0.5)`}>
          <path d="M0 0 C6 -7 22 -8 34 0 C22 8 6 7 0 0Z" fill="url(#aq-leaf-fill)" />
        </g>
      ))}
    </svg>
  );
}
