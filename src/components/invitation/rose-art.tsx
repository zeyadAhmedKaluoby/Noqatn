export type RoseMotifKind = "gate" | "arch" | "ring" | "couple" | "roses" | "cake";

export function RoseMotif({ kind, className }: { kind: RoseMotifKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {kind === "gate" && <Gate />}
      {kind === "arch" && <Arch />}
      {kind === "ring" && <Ring />}
      {kind === "couple" && <Couple />}
      {kind === "roses" && <RoseCluster />}
      {kind === "cake" && <Cake />}
    </svg>
  );
}

function Blossom({ x, y, s = 1, color = "#e7b7c4" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-7" r="7" fill={color} opacity="0.75" />
      <circle cx="7" cy="-1" r="7" fill={color} />
      <circle cx="4" cy="7" r="7" fill={color} opacity="0.92" />
      <circle cx="-5" cy="6" r="7" fill={color} opacity="0.85" />
      <circle cx="-7" cy="-2" r="7" fill={color} opacity="0.7" />
      <circle r="3.4" fill="#f8e6cf" />
    </g>
  );
}

function Leaf({ x, y, flip = false, s = 1 }: { x: number; y: number; flip?: boolean; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 q16 -18 28 -6 q-14 4 -28 6z" fill="#b7c9ae" />
      <path d="M4 -1 q12 -8 22 -4" fill="none" stroke="#7f9774" strokeWidth="0.8" />
    </g>
  );
}

function Gate() {
  return (
    <g>
      <ellipse cx="100" cy="178" rx="72" ry="12" fill="#e3ecdf" />
      <path d="M40 176 V90 C40 40 160 40 160 90 V176" fill="#f6e4e6" stroke="#c2a267" strokeWidth="2.2" />
      <path d="M56 176 V102 C56 68 144 68 144 102 V176" fill="#fbf7f4" stroke="#e4d4bc" strokeWidth="1.5" />
      <path d="M100 84 V176" stroke="#ecdcc8" strokeWidth="1.3" />
      <path d="M56 132 H144" stroke="#ecdcc8" strokeWidth="1.3" />
      <circle cx="92" cy="132" r="2.1" fill="#c2a267" />
      <circle cx="108" cy="132" r="2.1" fill="#c2a267" />
      <Blossom x={40} y={76} s={0.62} />
      <Blossom x={160} y={82} s={0.55} color="#f0c3cf" />
      <Blossom x={100} y={36} s={0.58} color="#f3c6d0" />
      <Blossom x={20} y={122} s={0.48} />
      <Blossom x={180} y={128} s={0.46} color="#e7b7c6" />
      <Blossom x={28} y={158} s={0.36} color="#f0c3cf" />
      <Leaf x={16} y={98} />
      <Leaf x={184} y={104} flip />
      <Leaf x={52} y={54} s={0.8} />
    </g>
  );
}

function Arch() {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="64" ry="10" fill="#e7f0e4" />
      <path d="M34 172 V96 C34 46 166 46 166 96 V172" fill="none" stroke="#c2a267" strokeWidth="2" />
      <path d="M52 172 V108 C52 70 148 70 148 108 V172" fill="#f8ecec" stroke="#e7d3c0" />
      <Blossom x={34} y={86} s={0.52} />
      <Blossom x={166} y={90} s={0.48} color="#f0c3cf" />
      <Blossom x={100} y={40} s={0.5} color="#f3c6d0" />
      <Blossom x={18} y={128} s={0.38} />
      <Blossom x={182} y={134} s={0.36} color="#e7b7c6" />
      <Leaf x={22} y={106} />
      <Leaf x={178} y={110} flip />
    </g>
  );
}

function Ring() {
  return (
    <g>
      <ellipse cx="100" cy="128" rx="50" ry="18" fill="none" stroke="#c2a267" strokeWidth="3" />
      <ellipse cx="100" cy="128" rx="36" ry="11" fill="none" stroke="#e4d3b0" strokeWidth="1.5" />
      <path d="M100 74 l16 24 h-32 z" fill="#fffaf6" stroke="#c2a267" strokeWidth="1.6" />
      <path d="M100 84 l8 12 h-16 z" fill="#f6efe4" stroke="#c2a267" strokeWidth="1" />
      <path d="M100 58 l3.2 8.2 8.4 1.6 -6.6 5 2.2 8.2 -7.2-4.6 -7.2 4.6 2.2-8.2 -6.6-5 8.4-1.6 z" fill="#c2a267" />
    </g>
  );
}

function Couple() {
  return (
    <g>
      <ellipse cx="100" cy="176" rx="58" ry="9" fill="#e3ecdf" />
      <circle cx="76" cy="58" r="14" fill="#f4d5d4" />
      <path d="M60 88 h32 l8 80 H54 Z" fill="#7a4e55" />
      <path d="M68 88 h16 v12 H68 Z" fill="#fbf7f4" />
      <circle cx="126" cy="56" r="14" fill="#f8e3e4" />
      <path d="M108 86 c16 12 30 8 38 -2 l16 92 H94 Z" fill="#f3d0d6" />
      <path d="M114 78 q14 18 28 0" fill="none" stroke="#c2a267" strokeWidth="1.5" />
      <Blossom x={154} y={124} s={0.32} />
    </g>
  );
}

function RoseCluster() {
  return (
    <g>
      <Leaf x={62} y={124} s={1.35} />
      <Leaf x={138} y={132} flip s={1.25} />
      <Leaf x={96} y={78} s={1.05} />
      <Blossom x={74} y={108} s={0.82} />
      <Blossom x={118} y={94} s={0.92} color="#f0c3cf" />
      <Blossom x={102} y={136} s={0.68} color="#e8c4b0" />
      <Blossom x={148} y={124} s={0.5} />
    </g>
  );
}

function Cake() {
  return (
    <g>
      <ellipse cx="100" cy="172" rx="62" ry="10" fill="#eadfd4" />
      <path d="M40 150 h120 l-8 16 H48 z" fill="#fffaf6" stroke="#c2a267" strokeWidth="1.4" />
      <path d="M54 120 h92 l-6 30 H60 z" fill="#fffdfb" stroke="#c2a267" strokeWidth="1.4" />
      <path d="M68 94 h64 l-6 26 H74 z" fill="#fff" stroke="#c2a267" strokeWidth="1.4" />
      <path d="M78 120 h44 M70 150 h60" stroke="#f0d5c8" strokeWidth="2" />
      <Blossom x={100} y={76} s={0.42} />
      <Blossom x={54} y={146} s={0.28} />
      <Blossom x={146} y={140} s={0.26} color="#f0c3cf" />
    </g>
  );
}
