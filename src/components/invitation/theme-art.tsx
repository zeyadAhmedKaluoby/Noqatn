import type { OpeningKind } from "@/lib/templates";

type Face = "a" | "b";

const script = "var(--font-ruqaa), serif";
const display = "var(--font-messiri), serif";

export function ThemePair({
  kind,
  names,
  date,
}: {
  kind: OpeningKind;
  names: string;
  date: string;
}) {
  const panel = panelColor(kind);
  return (
    <svg viewBox="0 0 340 236" className="h-full w-full" role="img" aria-hidden>
      <rect width="340" height="236" fill={panel} />
      <g transform="translate(24,16) scale(0.73)">
        <Scene kind={kind} face="a" names={names} date={date} />
      </g>
      <g transform="translate(168,16) scale(0.73)">
        <Scene kind={kind} face="b" names={names} date={date} />
      </g>
    </svg>
  );
}

export function ThemePhone({
  kind,
  names,
  date,
  kicker,
}: {
  kind: OpeningKind;
  names: string;
  date: string;
  kicker: string;
}) {
  return (
    <svg viewBox="0 0 160 280" className="mx-auto h-auto max-h-[68svh] w-auto max-w-full drop-shadow-[0_18px_40px_rgba(60,40,20,0.16)]" role="img" aria-label={names}>
      <Scene kind={kind} face="a" names={names} date={date} kicker={kicker} />
    </svg>
  );
}

function Scene({
  kind,
  face,
  names,
  date,
  kicker,
}: {
  kind: OpeningKind;
  face: Face;
  names: string;
  date: string;
  kicker?: string;
}) {
  const paper = paperColor(kind, face);
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill={paper} stroke="rgba(80,50,30,0.08)" />
      {draw(kind, face, names, date, kicker)}
    </g>
  );
}

function draw(kind: OpeningKind, face: Face, names: string, date: string, kicker?: string) {
  if (kind === "bow") return face === "a" ? <BowCard names={names} date={date} /> : <LetterCard names={names} date={date} />;
  if (kind === "watercolor") return face === "a" ? <EnvelopeWash /> : <WaterCard names={names} date={date} />;
  if (kind === "bismillah") return face === "a" ? <BismSeal names={names} /> : <BismLetter names={names} date={date} />;
  if (kind === "gate") return face === "a" ? <GardenArch /> : <GardenCard names={names} date={date} />;
  if (kind === "lavender") return face === "a" ? <LavenderWindow /> : <LavenderWreath names={names} />;
  if (kind === "mashrabiya") return face === "a" ? <MashDoor /> : <LanternCard names={names} date={date} />;
  if (kind === "moon") return face === "a" ? <MoonDoor /> : <Terrace names={names} />;
  if (kind === "ringbox") return face === "a" ? <RingBox /> : <RingsCard names={names} date={date} />;
  if (kind === "gift") return face === "a" ? <GiftBox /> : <ConfettiCard names={names} />;
  return face === "a" ? <WaxCard names={names} date={date} kicker={kicker} /> : <BowCard names={names} date={date} />;
}

function WaxCard({ names, date, kicker }: { names: string; date: string; kicker?: string }) {
  return (
    <g>
      <Wash color="#f6d5de" />
      <text x="80" y="46" textAnchor="middle" fill="#a68446" fontSize="11" fontFamily={display}>
        {kicker ?? "دعوة زفاف"}
      </text>
      <Name y={78} size={18} fill="#6a3148">
        {names}
      </Name>
      <Seal cx={80} cy={148} fill="#f4e4e2" edge="#e7cfcb" ink="#b07a86" />
      <Rose cx={80} cy={146} color="#c46b86" />
      <text x="80" y="236" textAnchor="middle" fill="#8d5b6c" fontSize="11" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function BowCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff8f6" />
      <Bow x={80} y={52} color="#e7a3b8" />
      <Sparkle x={28} y={40} />
      <Sparkle x={132} y={70} />
      <Name y={128} size={20} fill="#6a3148">
        {names}
      </Name>
      <text x="80" y="168" textAnchor="middle" fill="#c4a0aa" fontSize="11" fontFamily={display}>
        {date}
      </text>
      <Sprig x={18} y={230} />
      <Sprig x={118} y={236} flip />
    </g>
  );
}

function LetterCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <Wash color="#f8d5df" />
      <Bow x={80} y={42} color="#d98aa4" />
      <text x="80" y="108" textAnchor="middle" fill="#b07a86" fontSize="11" fontFamily={display}>
        بكل الود
      </text>
      <Name y={148} size={22} fill="#6a3148">
        {names}
      </Name>
      <text x="80" y="188" textAnchor="middle" fill="#a07a86" fontSize="12" fontFamily={display}>
        {date}
      </text>
      <Rose cx={126} cy={232} color="#d98aa4" scale={0.7} />
    </g>
  );
}

function EnvelopeWash() {
  return (
    <g>
      <ellipse cx="30" cy="36" rx="40" ry="28" fill="#e7d4ea" opacity="0.7" />
      <ellipse cx="130" cy="210" rx="50" ry="36" fill="#d9c4b4" opacity="0.55" />
      <path d="M22 78 L80 118 L138 78 L138 210 L22 210 Z" fill="#fffaf6" stroke="#e4d5c8" />
      <path d="M22 78 L80 40 L138 78" fill="#fffdfb" stroke="#e4d5c8" />
      <Seal cx={80} cy={128} fill="#6d4c66" edge="#8a6878" ink="#f6efe8" />
      <text x="80" y="132" textAnchor="middle" fill="#f6efe8" fontSize="13" fontFamily={script}>
        خ
      </text>
      <path d="M80 150 v36" stroke="#8d6a86" strokeWidth="6" />
      <path d="M80 186 c-16 10 -10 28 0 22 c10 6 16 -12 0 -22" fill="#8d6a86" />
      <Sprig x={18} y={196} color="#8d6a86" />
    </g>
  );
}

function WaterCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <ellipse cx="120" cy="30" rx="46" ry="24" fill="#ead6ea" opacity="0.8" />
      <Sparkle x={30} y={48} />
      <Sparkle x={126} y={78} />
      <Name y={96} size={20} fill="#4a3b46">
        {names}
      </Name>
      <text x="80" y="128" textAnchor="middle" fill="#8d6a86" fontSize="12" fontFamily={display}>
        {date}
      </text>
      <path d="M30 188 q50 -28 100 0 v62 h-100z" fill="#f3e6df" />
      <path d="M48 214 q16 -20 32 0 q16 -18 32 0" fill="none" stroke="#c4a27a" strokeWidth="2" />
      <circle cx="64" cy="206" r="5" fill="#e7b7c6" />
      <circle cx="96" cy="202" r="4" fill="#d7c4ea" />
      <rect x="70" y="214" width="20" height="16" rx="2" fill="#fff" stroke="#c4a27a" />
    </g>
  );
}

function BismSeal({ names }: { names: string }) {
  return (
    <g>
      <rect x="16" y="16" width="128" height="248" rx="8" fill="none" stroke="#d7c29a" strokeWidth="1.4" />
      <rect x="22" y="22" width="116" height="236" rx="4" fill="none" stroke="#ead7b0" />
      <text x="80" y="62" textAnchor="middle" fill="#b08a45" fontSize="15" fontFamily={script}>
        بسم الله
      </text>
      <Seal cx={80} cy={130} fill="#f8f1e4" edge="#b08a45" ink="#b08a45" />
      <text x="80" y="126" textAnchor="middle" fill="#b08a45" fontSize="11" fontFamily={script}>
        بسم
      </text>
      <text x="80" y="142" textAnchor="middle" fill="#b08a45" fontSize="11" fontFamily={script}>
        الله
      </text>
      <Name y={214} size={16} fill="#3a2e22">
        {names}
      </Name>
    </g>
  );
}

function BismLetter({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <path d="M18 70 h124 v150 h-124z" fill="#fffaf3" stroke="#e6d3ae" />
      <path d="M18 70 l62 42 l62 -42" fill="#f8f1e4" stroke="#e6d3ae" />
      <Seal cx={80} cy={128} fill="#b08a45" edge="#8c6a30" ink="#fffaf3" />
      <text x="80" y="132" textAnchor="middle" fill="#fffaf3" fontSize="12" fontFamily={script}>
        بسم
      </text>
      <Name y={214} size={16} fill="#3a2e22">
        {names}
      </Name>
      <text x="80" y="242" textAnchor="middle" fill="#8a7356" fontSize="11" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function GardenArch() {
  return (
    <g>
      <rect x="1" y="150" width="158" height="129" fill="#e7efe2" />
      <path d="M28 196 V108 Q80 36 132 108 V196" fill="none" stroke="#8ea37a" strokeWidth="3" />
      <rect x="64" y="132" width="32" height="64" rx="3" fill="#c4a27a" />
      <rect x="70" y="140" width="20" height="28" rx="10" fill="#fffdf9" />
      <circle cx="42" cy="96" r="7" fill="#f0c3cf" />
      <circle cx="118" cy="96" r="7" fill="#f0c3cf" />
      <circle cx="58" cy="72" r="6" fill="#e7b7c6" />
      <circle cx="102" cy="72" r="6" fill="#e7b7c6" />
      <circle cx="80" cy="58" r="6" fill="#f6d5de" />
      <path d="M20 210 q20 -16 30 0 q16 -18 28 0" fill="none" stroke="#6d8a62" strokeWidth="2" />
      <path d="M100 214 q18 -14 26 0 q14 -16 28 0" fill="none" stroke="#6d8a62" strokeWidth="2" />
    </g>
  );
}

function GardenCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="120" fill="#e7efe2" />
      <circle cx="30" cy="30" r="10" fill="#f0c3cf" />
      <circle cx="126" cy="40" r="8" fill="#e7b7c6" />
      <path d="M20 90 Q80 40 140 90" fill="none" stroke="#8ea37a" strokeWidth="2" />
      <Name y={168} size={18} fill="#3d3a34">
        {names}
      </Name>
      <text x="80" y="204" textAnchor="middle" fill="#7d7368" fontSize="12" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function LavenderWindow() {
  return (
    <g>
      <path d="M28 250 V120 Q80 28 132 120 V250 Z" fill="#d7c4ea" />
      <path d="M36 250 V128 Q80 44 124 128 V250 Z" fill="#f6e7c8" />
      <circle cx="92" cy="92" r="14" fill="#f2c98a" />
      <path d="M48 168 q8 -20 6 -36 M64 176 q6 -24 4 -42 M80 180 q2 -28 0 -48 M96 176 q-4 -22 -2 -40 M112 168 q-6 -18 -4 -34" stroke="#8d74a8" strokeWidth="2" fill="none" />
      <circle cx="54" cy="132" r="3" fill="#6a5088" />
      <circle cx="70" cy="124" r="3" fill="#6a5088" />
      <circle cx="88" cy="120" r="3" fill="#6a5088" />
      <circle cx="104" cy="128" r="3" fill="#6a5088" />
      <path d="M80 120 V40" stroke="#c4a27a" strokeWidth="2" />
    </g>
  );
}

function LavenderWreath({ names }: { names: string }) {
  return (
    <g>
      <ellipse cx="80" cy="120" rx="48" ry="62" fill="none" stroke="#8d74a8" strokeWidth="8" opacity="0.35" />
      <ellipse cx="80" cy="120" rx="48" ry="62" fill="none" stroke="#c7b6de" strokeWidth="3" strokeDasharray="2 7" />
      <Name y={124} size={16} fill="#3d3450">
        {names}
      </Name>
    </g>
  );
}

function MashDoor() {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" fill="#f4ecdf" />
      <path d="M36 36 h88 v200 h-88z" fill="#8c5a32" />
      <path d="M36 36 Q80 8 124 36" fill="none" stroke="#c4924a" strokeWidth="4" />
      <rect x="46" y="52" width="68" height="120" fill="#e7c48a" />
      {Array.from({ length: 20 }).map((_, index) => (
        <circle key={index} cx={56 + (index % 4) * 16} cy={66 + Math.floor(index / 4) * 20} r="3.2" fill="#5c3a22" />
      ))}
      <circle cx="108" cy="196" r="3" fill="#f4ecdf" />
      <path d="M70 250 q10 -16 20 0" fill="none" stroke="#c4924a" strokeWidth="2" />
    </g>
  );
}

function LanternCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <circle cx="80" cy="78" r="28" fill="#f6e7c1" />
      <rect x="68" y="70" width="24" height="30" rx="4" fill="#c4924a" />
      <path d="M68 78 h24 M80 70 v30" stroke="#f4ecdf" />
      <Name y={156} size={18} fill="#3a2918">
        {names}
      </Name>
      <text x="80" y="192" textAnchor="middle" fill="#8a6a45" fontSize="12" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function MoonDoor() {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" fill="#141a33" />
      <circle cx="118" cy="48" r="16" fill="#f6e7c1" />
      <circle cx="124" cy="44" r="14" fill="#141a33" />
      <rect x="48" y="96" width="52" height="120" rx="26" fill="#e7a3b8" />
      <circle cx="86" cy="156" r="2.4" fill="#e6c27a" />
      <rect x="36" y="78" width="8" height="14" rx="2" fill="#e6c27a" />
      <rect x="108" y="86" width="8" height="14" rx="2" fill="#e6c27a" />
      <path d="M20 230 Q80 200 140 230" fill="none" stroke="#2a3358" strokeWidth="8" />
    </g>
  );
}

function Terrace({ names }: { names: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" fill="#1b2344" />
      <circle cx="40" cy="40" r="3" fill="#f6e7c1" />
      <circle cx="70" cy="28" r="2" fill="#f6e7c1" />
      <circle cx="120" cy="36" r="2.4" fill="#f6e7c1" />
      <path d="M16 190 h128 v70 h-128z" fill="#243056" />
      <circle cx="48" cy="168" r="10" fill="#f6e7c1" opacity="0.8" />
      <circle cx="108" cy="164" r="12" fill="#e7a3b8" opacity="0.9" />
      <Name y={124} size={16} fill="#f6efe4">
        {names}
      </Name>
    </g>
  );
}

function RingBox() {
  return (
    <g>
      <ellipse cx="80" cy="210" rx="46" ry="10" fill="#eadfd6" />
      <path d="M40 150 h80 v48 h-80z" fill="#9a5b63" />
      <path d="M40 150 l40 -28 40 28" fill="#c48b74" />
      <circle cx="64" cy="168" r="10" fill="none" stroke="#fff9f6" strokeWidth="3" />
      <circle cx="96" cy="168" r="10" fill="none" stroke="#fff9f6" strokeWidth="3" />
      <circle cx="64" cy="168" r="3" fill="#e6c27a" />
    </g>
  );
}

function RingsCard({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <Sprig x={18} y={70} color="#8d74a8" />
      <Sprig x={108} y={78} color="#8d74a8" flip />
      <circle cx="62" cy="120" r="16" fill="none" stroke="#c48b74" strokeWidth="3" />
      <circle cx="98" cy="120" r="16" fill="none" stroke="#c48b74" strokeWidth="3" />
      <Name y={180} size={18} fill="#3a2a2a">
        {names}
      </Name>
      <text x="80" y="214" textAnchor="middle" fill="#8a6d66" fontSize="12" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function GiftBox() {
  return (
    <g>
      <circle cx="36" cy="40" r="4" fill="#ff5a8a" />
      <circle cx="120" cy="36" r="5" fill="#7c5cff" />
      <circle cx="100" cy="70" r="3" fill="#ffe14a" />
      <rect x="36" y="120" width="88" height="72" rx="6" fill="#ff5a8a" />
      <rect x="74" y="120" width="12" height="72" fill="#ffe14a" />
      <path d="M80 120 c-18 -26 -40 -8 -22 8 h22 M80 120 c18 -26 40 -8 22 8 h-22" fill="#ffe14a" />
      <rect x="36" y="112" width="88" height="16" rx="3" fill="#7c5cff" />
    </g>
  );
}

function ConfettiCard({ names }: { names: string }) {
  return (
    <g>
      <rect x="20" y="40" width="10" height="4" fill="#ff5a8a" transform="rotate(20 25 42)" />
      <rect x="120" y="60" width="12" height="4" fill="#7c5cff" transform="rotate(-16 126 62)" />
      <rect x="40" y="90" width="8" height="4" fill="#ffe14a" />
      <circle cx="110" cy="100" r="4" fill="#ff5a8a" />
      <Name y={150} size={22} fill="#3a2148">
        {names}
      </Name>
      <text x="80" y="190" textAnchor="middle" fill="#8a4d78" fontSize="13" fontFamily={display}>
        يوم سعيد
      </text>
    </g>
  );
}

function Name({ y, size, fill, children }: { y: number; size: number; fill: string; children: string }) {
  return (
    <text x="80" y={y} textAnchor="middle" fill={fill} fontSize={size} fontFamily={script}>
      {children}
    </text>
  );
}

function Seal({ cx, cy, fill, edge, ink }: { cx: number; cy: number; fill: string; edge: string; ink: string }) {
  const r = 34;
  const bumps = 18;
  const d = Array.from({ length: bumps }, (_, index) => {
    const a0 = (index / bumps) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((index + 0.5) / bumps) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((index + 1) / bumps) * Math.PI * 2 - Math.PI / 2;
    const point = (angle: number, radius: number) => [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
    const [x1, y1] = point(a0, r);
    const [x2, y2] = point(a1, r * 1.14);
    const [x3, y3] = point(a2, r);
    return `${index === 0 ? "M" : "L"}${x1.toFixed(1)},${y1.toFixed(1)} Q${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      <path d={`${d} Z`} fill={fill} stroke={edge} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke={ink} strokeWidth="1.2" opacity="0.7" />
    </g>
  );
}

function Rose({ cx, cy, color, scale = 1 }: { cx: number; cy: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle cx="0" cy="-7" r="5.5" fill={color} opacity="0.75" />
      <circle cx="6.5" cy="-2" r="5.5" fill={color} opacity="0.85" />
      <circle cx="4" cy="6" r="5.5" fill={color} />
      <circle cx="-4" cy="6" r="5.5" fill={color} />
      <circle cx="-6.5" cy="-2" r="5.5" fill={color} opacity="0.85" />
      <circle r="3.2" fill="#fff6f4" />
      <path d="M2 10 q6 8 2 16" fill="none" stroke="#7d9a72" strokeWidth="1.4" />
    </g>
  );
}

function Bow({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 4 C-16 -20 -42 -8 -36 8 C-24 6 -12 12 0 20 C12 12 24 6 36 8 C42 -8 16 -20 0 4 Z" fill={color} />
      <circle r="5" cy="8" fill="#c46b86" />
      <path d="M-4 12 C-12 28 -2 34 2 28" fill="none" stroke={color} strokeWidth="3" />
      <path d="M4 12 C12 28 2 34 -2 28" fill="none" stroke={color} strokeWidth="3" />
    </g>
  );
}

function Wash({ color }: { color: string }) {
  return (
    <g>
      <ellipse cx="24" cy="28" rx="36" ry="22" fill={color} opacity="0.55" />
      <ellipse cx="136" cy="250" rx="40" ry="24" fill={color} opacity="0.4" />
    </g>
  );
}

function Sparkle({ x, y }: { x: number; y: number }) {
  return <path d={`M${x} ${y - 6} L${x + 1.4} ${y - 1.4} L${x + 6} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 6} L${x - 1.4} ${y + 1.4} L${x - 6} ${y} L${x - 1.4} ${y - 1.4} Z`} fill="#c4a15a" />;
}

function Sprig({ x, y, flip = false, color = "#7d9a72" }: { x: number; y: number; flip?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M0 0 q16 -8 28 -2" fill="none" stroke={color} strokeWidth="1.4" />
      <ellipse cx="10" cy="-6" rx="5" ry="3" fill="#f0c3cf" />
      <ellipse cx="22" cy="-4" rx="4" ry="2.4" fill="#e7b7c6" />
    </g>
  );
}

function panelColor(kind: OpeningKind) {
  if (kind === "moon") return "#1a2140";
  if (kind === "lavender") return "#efe6f4";
  if (kind === "watercolor" || kind === "bismillah") return "#f3ece4";
  if (kind === "gate" || kind === "mashrabiya") return "#f3eee6";
  if (kind === "gift") return "#fff1e4";
  if (kind === "ringbox") return "#f6eee8";
  return "#f6e7ea";
}

function paperColor(kind: OpeningKind, face: Face) {
  if (kind === "moon") return face === "a" ? "#141a33" : "#1b2344";
  if (kind === "lavender") return "#fbf8fd";
  if (kind === "watercolor") return "#f7f1ea";
  if (kind === "bismillah") return "#f8f1e4";
  if (kind === "mashrabiya") return "#f4ecdf";
  if (kind === "gate") return "#f7f4ef";
  if (kind === "gift") return "#fff7f2";
  if (kind === "ringbox") return "#fff9f6";
  return face === "a" ? "#f8ecee" : "#fff8f6";
}
