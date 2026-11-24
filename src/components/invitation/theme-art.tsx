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
  if (kind === "ringbox") return face === "a" ? <RingBox names={names} date={date} /> : <RingsCard names={names} date={date} />;
  if (kind === "lanterns") return face === "a" ? <LanternCover names={names} date={date} /> : <LanternHero names={names} date={date} />;
  if (kind === "olive") return face === "a" ? <OliveCover names={names} date={date} /> : <OliveHero names={names} />;
  if (kind === "shamadan") return face === "a" ? <ShamadanCover names={names} date={date} /> : <ShamadanArch names={names} date={date} />;
  if (kind === "balloons") return face === "a" ? <GoldBalloons names={names} date={date} /> : <GoldNight names={names} date={date} />;
  if (kind === "ribbon") return face === "a" ? <RibbonLetter names={names} date={date} /> : <PromiseRings names={names} date={date} />;
  if (kind === "envelope") return face === "a" ? <EnvelopeCover names={names} date={date} /> : <EnvelopeHero names={names} date={date} />;
  if (kind === "rings") return face === "a" ? <PolaroidCover names={names} date={date} /> : <PolaroidHero names={names} date={date} />;
  if (kind === "candles") return face === "a" ? <CandlesCover names={names} date={date} /> : <CandlesHero names={names} date={date} />;
  if (kind === "confetti") return face === "a" ? <ConfettiCover names={names} date={date} /> : <ConfettiHero names={names} date={date} />;
  if (kind === "gift") return face === "a" ? <GiftCover names={names} date={date} /> : <GiftHero names={names} date={date} />;
  if (kind === "sieve") return face === "a" ? <SieveCover names={names} date={date} /> : <SieveHero names={names} date={date} />;
  if (kind === "rosegate") return face === "a" ? <RoseHeroMini names={names} date={date} /> : <RosePlanMini />;
  if (kind === "classic") return face === "a" ? <ClassicMini names={names} date={date} /> : <ClassicQuoteMini />;
  if (kind === "navy") return face === "a" ? <NavyMini names={names} date={date} /> : <NavyPlanMini names={names} />;
  if (kind === "bab") return face === "a" ? <BabMini names={names} date={date} /> : <BabOpenMini names={names} />;
  if (kind === "sage" || kind === "mist" || kind === "sand" || kind === "ivory" || kind === "ember" || kind === "blush") {
    return face === "a" ? <SharedCoverMini kind={kind} names={names} date={date} /> : <SharedOpenMini kind={kind} names={names} />;
  }
  return face === "a" ? <WaxCard names={names} date={date} kicker={kicker} /> : <BowCard names={names} date={date} />;
}

function SharedCoverMini({
  kind,
  names,
  date,
}: {
  kind: "sage" | "mist" | "sand" | "ivory" | "ember" | "blush";
  names: string;
  date: string;
}) {
  const dark = kind === "ember";
  const ink = dark ? "#f4ead7" : "#3a2e22";
  const gold = kind === "mist" ? "#8d74a8" : kind === "sage" ? "#a38b52" : "#c2a267";
  return (
    <g>
      {kind === "blush" ? <circle cx="80" cy="96" r="26" fill={gold} opacity="0.9" /> : null}
      {kind === "ivory" || kind === "ember" ? (
        <rect x="28" y="42" width="104" height="160" rx="6" fill="none" stroke={gold} strokeWidth="2" />
      ) : null}
      <Name y={kind === "blush" ? 150 : 110} size={12} fill={ink}>
        {names}
      </Name>
      <text x="80" y={kind === "blush" ? 172 : 132} textAnchor="middle" fill={gold} fontSize="8" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function SharedOpenMini({ kind, names }: { kind: "sage" | "mist" | "sand" | "ivory" | "ember" | "blush"; names: string }) {
  const ink = kind === "ember" ? "#f4ead7" : "#3a2e22";
  return (
    <g>
      <Name y={100} size={13} fill={ink}>
        {names}
      </Name>
      <rect x="40" y="128" width="80" height="8" rx="4" fill={kind === "mist" ? "#d7c4ea" : "#d9d3c5"} />
      <rect x="48" y="148" width="64" height="8" rx="4" fill={kind === "sage" ? "#d5e0c8" : "#ead7b0"} />
    </g>
  );
}

function ClassicMini({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="18" y="28" width="124" height="170" rx="8" fill="#efe6d8" />
      <circle cx="80" cy="108" r="28" fill="#c9a45c" opacity="0.85" />
      <circle cx="80" cy="108" r="18" fill="#8a6a32" />
      <text x="80" y="112" textAnchor="middle" fill="#f8f1e4" fontSize="10" fontFamily={script}>
        ختم
      </text>
      <Name y={188} size={13} fill="#3a2e22">
        {names}
      </Name>
      <text x="80" y="208" textAnchor="middle" fill="#7a6a58" fontSize="8" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function ClassicQuoteMini() {
  return (
    <g>
      <rect x="18" y="36" width="124" height="190" rx="8" fill="#fffaf3" />
      <text x="80" y="78" textAnchor="middle" fill="#b08a45" fontSize="9" fontFamily={display}>
        بِسْمِ اللهِ
      </text>
      <text x="80" y="118" textAnchor="middle" fill="#3a2e22" fontSize="9" fontFamily={display}>
        وَجَعَلَ بَيْنَكُمْ
      </text>
      <text x="80" y="138" textAnchor="middle" fill="#3a2e22" fontSize="9" fontFamily={display}>
        مَوَدَّةً وَرَحْمَةً
      </text>
      <ellipse cx="80" cy="188" rx="36" ry="12" fill="#ead7b0" opacity="0.7" />
    </g>
  );
}

function NavyMini({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="14" y="22" width="132" height="220" rx="10" fill="#1a2744" />
      <path d="M40 70 h80 v90 h-80 z" fill="#f4efe6" opacity="0.92" />
      <path d="M52 70 v-18 h56 v18" fill="none" stroke="#c9a45c" strokeWidth="2" />
      <Name y={120} size={12} fill="#1a2744">
        {names}
      </Name>
      <text x="80" y="142" textAnchor="middle" fill="#5c6a82" fontSize="8" fontFamily={display}>
        {date}
      </text>
      <text x="80" y="210" textAnchor="middle" fill="#f4efe6" fontSize="8" fontFamily={display}>
        اضغط لفتح الدعوة
      </text>
    </g>
  );
}

function NavyPlanMini({ names }: { names: string }) {
  return (
    <g>
      <rect x="18" y="30" width="124" height="200" rx="8" fill="#fbf8f1" />
      <Name y={88} size={13} fill="#1a2744">
        {names}
      </Name>
      <rect x="36" y="118" width="88" height="10" rx="4" fill="#dfe3ea" />
      <rect x="44" y="140" width="72" height="10" rx="4" fill="#dfe3ea" />
      <rect x="52" y="162" width="56" height="10" rx="4" fill="#dfe3ea" />
    </g>
  );
}

function BabMini({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="18" y="36" width="58" height="170" rx="4" fill="#d9c4a4" />
      <rect x="84" y="36" width="58" height="170" rx="4" fill="#d2bb98" />
      <circle cx="70" cy="120" r="5" fill="#8a6f5a" />
      <circle cx="90" cy="120" r="5" fill="#8a6f5a" />
      <Name y={230} size={11} fill="#4a3a2e">
        {names}
      </Name>
      <text x="80" y="26" textAnchor="middle" fill="#7d6b59" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function BabOpenMini({ names }: { names: string }) {
  return (
    <g>
      <rect x="18" y="36" width="124" height="190" rx="8" fill="#fffdf8" />
      <ellipse cx="80" cy="96" rx="40" ry="28" fill="#e7d3b4" opacity="0.7" />
      <Name y={150} size={13} fill="#4a3a2e">
        {names}
      </Name>
      <text x="80" y="176" textAnchor="middle" fill="#7d6b59" fontSize="8" fontFamily={display}>
        الباب اتفتح
      </text>
    </g>
  );
}

function RoseHeroMini({ names, date }: { names: string; date: string }) {
  const parts = names.split(/\s(?:و|&)\s/).filter(Boolean);
  const first = parts[0] ?? names;
  const second = parts[1];
  return (
    <g>
      <ellipse cx="18" cy="28" rx="40" ry="26" fill="#f4dee0" opacity="0.9" />
      <ellipse cx="146" cy="118" rx="42" ry="28" fill="#e3ecdf" opacity="0.85" />
      <text x="80" y="48" textAnchor="middle" fill="#7A6992" fontSize="8" fontStyle="italic" fontFamily="var(--font-amiri), serif">
        وراء كل باب حكاية
      </text>
      <Name y={second ? 86 : 108} size={16} fill="#7A4E55">
        {first}
      </Name>
      {second && (
        <text x="80" y="104" textAnchor="middle" fill="#C2A267" fontSize="13" fontStyle="italic" fontFamily="var(--font-amiri), serif">
          &
        </text>
      )}
      {second && (
        <Name y={128} size={16} fill="#7A4E55">
          {second}
        </Name>
      )}
      <text x="80" y="156" textAnchor="middle" fill="#8A5E64" fontSize="9" fontFamily={display}>
        {date}
      </text>
      <path d="M46 248 V214 C46 188 114 188 114 214 V248" fill="#f7e7e8" stroke="#C2A267" strokeWidth="1.4" />
      <path d="M58 248 V220 C58 202 102 202 102 220 V248" fill="#fbf7f4" stroke="#e4d3b8" />
      <Rose cx={46} cy={206} color="#e7b7c4" scale={0.55} />
      <Rose cx={114} cy={210} color="#f0c3cf" scale={0.48} />
      <Rose cx={80} cy={186} color="#f3c6d0" scale={0.5} />
    </g>
  );
}

function RosePlanMini() {
  const rows = [
    [78, "استقبال"],
    [118, "كتب الكتاب"],
    [158, "العشاء"],
  ] as const;
  return (
    <g>
      <text x="80" y="40" textAnchor="middle" fill="#7A4E55" fontSize="13" fontFamily={script}>
        برنامج الحفل
      </text>
      <path d="M80 54 v132" stroke="#C2A267" strokeWidth="1" />
      {rows.map(([y, label]) => (
        <g key={label}>
          <circle cx="80" cy={y} r="3.2" fill="#C2A267" />
          <text x="92" y={y + 4} fill="#8A5E64" fontSize="9" fontFamily={display}>
            {label}
          </text>
        </g>
      ))}
      <text x="80" y="214" textAnchor="middle" fill="#C2A267" fontSize="11" fontStyle="italic" fontFamily="var(--font-amiri), serif">
        مستنيينكم
      </text>
      <Rose cx={80} cy={246} color="#e7b7c4" scale={0.7} />
    </g>
  );
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

function RingBox({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#f1ddd3" />
      <ellipse cx="80" cy="150" rx="58" ry="52" fill="#fff" opacity="0.4" />
      <text x="80" y="38" textAnchor="middle" fill="#8f5640" fontSize="8" fontFamily={display}>
        دعوة خطوبة
      </text>
      <Name y={68} size={16} fill="#552632">
        {names}
      </Name>
      <ellipse cx="80" cy="214" rx="56" ry="6" fill="#552632" opacity="0.2" />
      <path d="M32 160 H128 L124 212 Q123 217 118 217 H42 Q37 217 36 212 Z" fill="#6f3342" />
      <path d="M32 160 H128 L120 128 H40 Z" fill="#9a5566" />
      <path d="M32 160 H128 L127 180 Q127 183 124 183 H36 Q33 183 33 180 Z" fill="#5b2a36" />
      <rect x="74" y="164" width="12" height="10" rx="2.5" fill="#c48b74" />
      <text x="80" y="250" textAnchor="middle" fill="#7a5a60" fontSize="7" fontFamily={display}>
        {date}
      </text>
      <circle cx="80" cy="266" r="6" fill="none" stroke="#7d3d4c" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

function RingsCard({ names, date }: { names: string; date: string }) {
  const parts = names.split(" و ");
  const first = Array.from(parts[0]?.trim() ?? "")[0] ?? "";
  const second = Array.from(parts[1]?.trim() ?? parts[0]?.trim() ?? "")[0] ?? "";
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#f8efe9" />
      <text x="80" y="42" textAnchor="middle" fill="#8f5640" fontSize="7.5" fontFamily={display}>
        قالوا نعم… وقلوبنا اتفقت
      </text>
      <circle cx="62" cy="104" r="32" fill="none" stroke="#c48b74" strokeWidth="3.5" />
      <circle cx="98" cy="104" r="32" fill="none" stroke="#c48b74" strokeWidth="3.5" />
      <path d="M98 66 l6 6 -6 8 -6 -8z" fill="#fff9f2" stroke="#c48b74" strokeWidth="1.4" strokeLinejoin="round" />
      <text x="46" y="116" textAnchor="middle" fill="#552632" fontSize="26" fontFamily={script} fontWeight="700">
        {first}
      </text>
      <text x="114" y="116" textAnchor="middle" fill="#552632" fontSize="26" fontFamily={script} fontWeight="700">
        {second}
      </text>
      <Name y={176} size={16} fill="#3a2a2a">
        {names}
      </Name>
      <rect x="34" y="198" width="92" height="20" rx="10" fill="none" stroke="#c48b74" strokeWidth="0.8" />
      <text x="80" y="211" textAnchor="middle" fill="#3a2a2a" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      {[40, 68, 96, 124].map((x) => (
        <circle key={x} cx={x} cy="246" r="9" fill="none" stroke="#c48b74" strokeWidth="1.6" />
      ))}
    </g>
  );
}

function PartyBunting({ y = 22 }: { y?: number }) {
  const colors = ["#7b3ff2", "#ff4f8b", "#3ec6ff", "#ffd21f", "#7b3ff2", "#ff4f8b"];
  return (
    <g>
      <path d={`M8 ${y - 8} C50 ${y + 6} 110 ${y + 6} 152 ${y - 8}`} fill="none" stroke="#351848" strokeWidth="1.2" />
      {colors.map((color, i) => (
        <path key={i} d={`M${14 + i * 24} ${y - 4 + (i === 2 || i === 3 ? 4 : 0)} h18 l-9 16z`} fill={color} stroke="#351848" strokeWidth="1" strokeLinejoin="round" />
      ))}
    </g>
  );
}

function CandlesCover({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#ffe0ee" />
      <rect x="32" y="34" width="96" height="17" rx="8.5" fill="#7b3ff2" stroke="#351848" strokeWidth="1.4" />
      <text x="80" y="46" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily={display}>
        دعوة عيد ميلاد
      </text>
      <Name y={92} size={26} fill="#351848">
        {names}
      </Name>
      <ellipse cx="80" cy="226" rx="58" ry="8" fill="#fff" stroke="#e5d4f2" />
      <rect x="34" y="172" width="92" height="52" rx="9" fill="#ff8fb5" />
      <path d="M34 172 V180 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 10 0 V172Z" fill="#ffe0ec" />
      <rect x="50" y="140" width="60" height="36" rx="8" fill="#a371ff" />
      {[66, 80, 94].map((x, i) => (
        <g key={x}>
          <rect x={x - 2.5} y="112" width="5" height="30" rx="1.5" fill={["#ff4f8b", "#3ec6ff", "#ffd21f"][i]} />
          <path d={`M${x} 110 c-4 -5 -3 -10 0 -16 c3 6 4 11 0 16z`} fill="#ffa43a" />
        </g>
      ))}
      <text x="80" y="256" textAnchor="middle" fill="#6b3f7c" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function CandlesHero({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff1f7" />
      <PartyBunting />
      <rect x="40" y="82" width="80" height="18" rx="9" fill="#7b3ff2" stroke="#351848" strokeWidth="1.4" />
      <text x="80" y="95" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily={display}>
        كل سنة وانت طيب
      </text>
      <text x="83" y="140" textAnchor="middle" fill="#ff4f8b" fontSize="30" fontFamily={script}>
        {names}
      </text>
      <Name y={137} size={30} fill="#351848">
        {names}
      </Name>
      <rect x="32" y="162" width="96" height="20" rx="10" fill="#fff" stroke="#351848" strokeWidth="1.4" />
      <text x="80" y="175" textAnchor="middle" fill="#351848" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="22" y={196 + i * 26} width="116" height="20" rx="8" fill="#fff" stroke="#351848" strokeWidth="1.2" />
          <circle cx="126" cy={206 + i * 26} r="6" fill={["#7b3ff2", "#ff4f8b", "#3ec6ff"][i]} stroke="#351848" strokeWidth="1" />
        </g>
      ))}
    </g>
  );
}

function ConfettiCover({ names, date }: { names: string; date: string }) {
  const balloons = [
    [46, 120, 22, 27, "#ff5a1f"],
    [114, 120, 22, 27, "#22d3c5"],
    [80, 100, 25, 30, "#ff3d7f"],
    [62, 150, 21, 26, "#7c5cff"],
    [98, 150, 21, 26, "#ffb703"],
  ] as const;
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff3a8" />
      <rect x="40" y="34" width="80" height="17" rx="8.5" fill="#ffe14a" stroke="#1d1a4a" strokeWidth="1.4" />
      <text x="80" y="46" textAnchor="middle" fill="#1d1a4a" fontSize="8" fontWeight="700" fontFamily={display}>
        دعوة حفلة
      </text>
      <Name y={86} size={24} fill="#1d1a4a">
        {names}
      </Name>
      <g transform="translate(0 16)"><path d="M46 146 C60 190 78 204 80 214 M114 146 C100 190 82 204 80 214 M80 126 C78 170 82 200 80 214" fill="none" stroke="#1d1a4a" strokeOpacity="0.5" strokeWidth="1" />
      {balloons.map(([cx, cy, rx, ry, fill]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} stroke="#1d1a4a" strokeWidth="1.6" />
      ))}
      <rect x="73" y="212" width="14" height="10" rx="3" fill="#1d1a4a" /></g>
      <text x="80" y="256" textAnchor="middle" fill="#54497a" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function ConfettiHero({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff8d4" />
      <path d="M2 4 C30 20 60 12 90 34" fill="none" stroke="#ff5a1f" strokeWidth="5" strokeLinecap="round" />
      <path d="M158 4 C130 20 100 12 70 34" fill="none" stroke="#22d3c5" strokeWidth="5" strokeLinecap="round" />
      <path d="M2 14 C28 32 56 24 82 44" fill="none" stroke="#ff3d7f" strokeWidth="5" strokeLinecap="round" />
      <path d="M158 14 C132 32 104 24 78 44" fill="none" stroke="#7c5cff" strokeWidth="5" strokeLinecap="round" />
      <rect x="36" y="86" width="88" height="18" rx="9" fill="#ffe14a" stroke="#1d1a4a" strokeWidth="1.4" />
      <text x="80" y="99" textAnchor="middle" fill="#1d1a4a" fontSize="8" fontWeight="700" fontFamily={display}>
        حفلة ألوان
      </text>
      <text x="83" y="144" textAnchor="middle" fill="#ff3d7f" fontSize="30" fontFamily={script}>
        {names}
      </text>
      <Name y={141} size={30} fill="#1d1a4a">
        {names}
      </Name>
      <rect x="32" y="166" width="96" height="20" rx="10" fill="#fff" stroke="#1d1a4a" strokeWidth="1.4" />
      <text x="80" y="179" textAnchor="middle" fill="#1d1a4a" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="22" y={202 + i * 24} width="116" height="18" rx="8" fill="#fff" stroke="#1d1a4a" strokeWidth="1.2" />
      ))}
    </g>
  );
}

function GiftCover({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#ffe6d2" />
      <rect x="34" y="34" width="92" height="17" rx="8.5" fill="#ffe14a" stroke="#3a2148" strokeWidth="1.4" />
      <text x="80" y="46" textAnchor="middle" fill="#3a2148" fontSize="8" fontWeight="700" fontFamily={display}>
        مفاجأة عيد ميلاد
      </text>
      <Name y={88} size={24} fill="#3a2148">
        {names}
      </Name>
      <rect x="54" y="132" width="52" height="40" rx="4" fill="#fff" stroke="#3a2148" strokeWidth="1.4" transform="rotate(-5 80 152)" />
      <rect x="36" y="170" width="88" height="62" rx="6" fill="#ff5a8a" stroke="#3a2148" strokeWidth="1.8" />
      <rect x="68" y="170" width="24" height="62" fill="#7b3ff2" stroke="#3a2148" strokeWidth="1.4" />
      <rect x="28" y="150" width="104" height="24" rx="6" fill="#ff7aa3" stroke="#3a2148" strokeWidth="1.8" transform="rotate(-8 80 162)" />
      <path d="M80 148 C60 124 40 140 70 150 Z M80 148 C100 124 120 140 90 150 Z" fill="#ffe14a" stroke="#3a2148" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="80" y="256" textAnchor="middle" fill="#6f4b7e" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function GiftHero({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff4ea" />
      <path d="M2 24 L60 4" stroke="#7b3ff2" strokeWidth="14" />
      <path d="M158 24 L100 4" stroke="#ff5a8a" strokeWidth="14" />
      <rect x="36" y="86" width="88" height="18" rx="9" fill="#ffe14a" stroke="#3a2148" strokeWidth="1.4" />
      <text x="80" y="99" textAnchor="middle" fill="#3a2148" fontSize="8" fontWeight="700" fontFamily={display}>
        ده كارت دعوتك
      </text>
      <text x="83" y="144" textAnchor="middle" fill="#ff5a8a" fontSize="30" fontFamily={script}>
        {names}
      </text>
      <Name y={141} size={30} fill="#3a2148">
        {names}
      </Name>
      <rect x="32" y="166" width="96" height="20" rx="10" fill="#fff" stroke="#3a2148" strokeWidth="1.4" />
      <text x="80" y="179" textAnchor="middle" fill="#3a2148" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="22" y={202 + i * 24} width="116" height="18" rx="8" fill="#fff" stroke="#3a2148" strokeWidth="1.2" />
      ))}
    </g>
  );
}

function SieveCover({ names, date }: { names: string; date: string }) {
  const candies = [
    [62, 112, "#ff4d6d"],
    [82, 104, "#ffb703"],
    [102, 112, "#7c5cff"],
    [72, 134, "#22b8cf"],
    [94, 132, "#ffffff"],
    [58, 140, "#ffb703"],
    [106, 140, "#ff4d6d"],
  ] as const;
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#c8fbee" />
      <rect x="40" y="34" width="80" height="17" rx="8.5" fill="#ffb703" stroke="#1c2a4a" strokeWidth="1.4" />
      <text x="80" y="46" textAnchor="middle" fill="#1c2a4a" fontSize="8" fontWeight="700" fontFamily={display}>
        دعوة سبوع
      </text>
      <Name y={90} size={26} fill="#1c2a4a">
        {names}
      </Name>
      <circle cx="80" cy="170" r="58" fill="#fff6dd" fillOpacity="0.6" />
      <circle cx="80" cy="170" r="58" fill="none" stroke="#a9702f" strokeWidth="9" />
      {[-30, -15, 0, 15, 30].map((o) => (
        <path key={`v${o}`} d={`M${80 + o} 118 V222`} stroke="#b9803f" strokeWidth="0.6" opacity="0.6" />
      ))}
      {[-30, -15, 0, 15, 30].map((o) => (
        <path key={`h${o}`} d={`M28 ${170 + o} H132`} stroke="#b9803f" strokeWidth="0.6" opacity="0.6" />
      ))}
      {candies.map(([x, y, fill]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y + 30} r="6.5" fill={fill} stroke="#1c2a4a" strokeWidth="1.4" />
      ))}
      <text x="80" y="256" textAnchor="middle" fill="#3d6b78" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function SieveHero({ names, date }: { names: string; date: string }) {
  const colors = ["#ff4d6d", "#ffb703", "#7c5cff", "#22b8cf", "#ff4d6d", "#ffb703"];
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#eafff8" />
      <path d="M8 14 C50 28 110 28 152 14" fill="none" stroke="#1c2a4a" strokeWidth="1.2" />
      {colors.map((color, i) => (
        <path key={i} d={`M${14 + i * 24} ${18 + (i === 2 || i === 3 ? 4 : 0)} h18 l-9 16z`} fill={color} stroke="#1c2a4a" strokeWidth="1" strokeLinejoin="round" />
      ))}
      <rect x="44" y="82" width="72" height="18" rx="9" fill="#ffb703" stroke="#1c2a4a" strokeWidth="1.4" />
      <text x="80" y="95" textAnchor="middle" fill="#1c2a4a" fontSize="8.5" fontWeight="700" fontFamily={display}>
        ألف مبروك
      </text>
      <Name y={140} size={32} fill="#1c2a4a">
        {names}
      </Name>
      <rect x="32" y="164" width="96" height="20" rx="10" fill="#fff" stroke="#1c2a4a" strokeWidth="1.4" />
      <text x="80" y="177" textAnchor="middle" fill="#1c2a4a" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x="22" y={202 + i * 24} width="116" height="18" rx="8" fill="#fff" stroke="#1c2a4a" strokeWidth="1.2" />
      ))}
    </g>
  );
}

function PolaroidCover({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#efdcc9" />
      <ellipse cx="80" cy="140" rx="60" ry="70" fill="#fff" opacity="0.4" />
      <text x="80" y="40" textAnchor="middle" fill="#9a4a36" fontSize="8" fontFamily={display}>
        دعوة خطوبة
      </text>
      <g transform="rotate(-4 80 138)">
        <rect x="34" y="62" width="92" height="124" fill="#fffdf9" />
        <rect x="42" y="70" width="76" height="76" fill="#dcd0be" />
        <ellipse cx="80" cy="108" rx="26" ry="22" fill="#fff" opacity="0.35" />
        <Name y={170} size={13} fill="#3b2a28">
          {names}
        </Name>
        <rect x="38" y="56" width="26" height="9" fill="#f2c6b0" opacity="0.9" transform="rotate(-28 51 60)" />
        <rect x="96" y="56" width="26" height="9" fill="#f2c6b0" opacity="0.9" transform="rotate(26 109 60)" />
      </g>
      <text x="80" y="224" textAnchor="middle" fill="#7a5a52" fontSize="7" fontFamily={display}>
        {date}
      </text>
      <circle cx="80" cy="248" r="9" fill="none" stroke="#6e382c" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

function PolaroidHero({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#f6ede2" />
      <text x="80" y="40" textAnchor="middle" fill="#9a4a36" fontSize="10" fontFamily={script}>
        لقطة من حكايتنا
      </text>
      <g transform="rotate(-3 80 112)">
        <rect x="30" y="54" width="100" height="132" fill="#fffdf9" />
        <rect x="38" y="62" width="84" height="84" fill="#f2c6b0" />
        <circle cx="68" cy="108" r="20" fill="none" stroke="#b8604a" strokeWidth="3.5" />
        <circle cx="92" cy="108" r="20" fill="none" stroke="#b8604a" strokeWidth="3.5" />
        <path d="M92 84 l5 5 -5 6 -5 -6z" fill="#fffdf9" stroke="#b8604a" strokeWidth="1.2" strokeLinejoin="round" />
        <Name y={172} size={14} fill="#3b2a28">
          {names}
        </Name>
        <rect x="34" y="48" width="28" height="9" fill="#f2c6b0" opacity="0.9" transform="rotate(-28 48 52)" />
        <rect x="98" y="48" width="28" height="9" fill="#f2c6b0" opacity="0.9" transform="rotate(26 112 52)" />
      </g>
      <text x="80" y="214" textAnchor="middle" fill="#3b2a28" fontSize="8.5" fontFamily={display}>
        لقطة واحدة… وحكاية كاملة
      </text>
      <rect x="34" y="226" width="92" height="20" rx="4" fill="none" stroke="#b8604a" strokeWidth="0.8" strokeDasharray="3 2" />
      <text x="80" y="239" textAnchor="middle" fill="#3b2a28" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function EnvelopeCover({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#efe2cf" />
      <text x="80" y="44" textAnchor="middle" fill="#84642f" fontSize="8" fontFamily={display}>
        دعوة زفاف
      </text>
      <Name y={80} size={17} fill="#2a2118">
        {names}
      </Name>
      <rect x="22" y="118" width="116" height="80" rx="3" fill="#e3d2b8" />
      <path d="M22 118 L80 166 L138 118 V198 H22 Z" fill="#f2e6d4" />
      <path d="M22 118 H138 L80 166 Z" fill="#ecdcc4" stroke="#d8c4a6" strokeWidth="0.6" />
      <circle cx="80" cy="162" r="11" fill="#b08a52" />
      <circle cx="80" cy="162" r="6" fill="none" stroke="#fff4dc" strokeWidth="1" />
      {[[34, 100], [118, 96], [52, 224], [112, 230], [26, 210]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3" ry="4.5" fill="#efc3cb" transform={`rotate(30 ${x} ${y})`} />
      ))}
      <text x="80" y="250" textAnchor="middle" fill="#6b594a" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function EnvelopeHero({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#f7f1e7" />
      <path d="M40 46 C54 38 66 38 80 46 C94 38 106 38 120 46" fill="none" stroke="#b08a52" strokeWidth="1" />
      <circle cx="80" cy="42" r="4" fill="#b08a52" opacity="0.4" />
      <text x="80" y="72" textAnchor="middle" fill="#84642f" fontSize="7" fontFamily="var(--font-amiri), serif">
        ﴿ وجعل بينكم مودة ورحمة ﴾
      </text>
      <Name y={126} size={20} fill="#2a2118">
        {names}
      </Name>
      <path d="M34 156 H62 M98 156 H126 M34 172 H62 M98 172 H126" stroke="#b08a52" strokeWidth="0.6" />
      <text x="80" y="170" textAnchor="middle" fill="#84642f" fontSize="18" fontWeight="700" fontFamily={display}>
        ٢١
      </text>
      <text x="80" y="196" textAnchor="middle" fill="#6b594a" fontSize="7" fontFamily={display}>
        {date}
      </text>
      <rect x="40" y="218" width="80" height="44" rx="3" fill="none" stroke="#b08a52" strokeWidth="0.8" />
    </g>
  );
}

function RibbonLetter({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#3d1019" />
      <ellipse cx="80" cy="122" rx="58" ry="74" fill="#e8b4bc" opacity="0.07" />
      <text x="80" y="40" textAnchor="middle" fill="#e2c597" fontSize="9" fontFamily={display}>
        دعوة خطوبة
      </text>
      <rect x="30" y="56" width="100" height="134" rx="3" fill="#fffaf6" />
      <rect x="36" y="62" width="88" height="122" rx="2" fill="none" stroke="#b98a56" strokeWidth="0.8" opacity="0.7" />
      <circle cx="75" cy="84" r="5" fill="none" stroke="#b98a56" strokeWidth="1.2" />
      <circle cx="85" cy="84" r="5" fill="none" stroke="#b98a56" strokeWidth="1.2" />
      <Name y={114} size={13} fill="#4a1a26">
        {names}
      </Name>
      <rect x="30" y="140" width="100" height="10" fill="#d993a0" />
      <path d="M80 145 C70 132 54 134 56 144 C58 152 72 150 80 146z" fill="#e3a5af" />
      <path d="M80 145 C90 132 106 134 104 144 C102 152 88 150 80 146z" fill="#e3a5af" />
      <path d="M78 147 L70 166 L76 163 L78 168 L82 149z M82 147 L90 166 L84 163 L82 168 L78 149z" fill="#c97f8c" />
      <rect x="76" y="141" width="8" height="8" rx="2.5" fill="#c97f8c" />
      <text x="80" y="178" textAnchor="middle" fill="#7d5560" fontSize="7" fontFamily={display}>
        {date}
      </text>
      <circle cx="80" cy="228" r="11" fill="none" stroke="#e2c597" strokeWidth="0.8" opacity="0.7" />
      <text x="80" y="256" textAnchor="middle" fill="#fbf4ee" fontSize="7.5" fontFamily={display} opacity="0.85">
        المس الفيونكة
      </text>
    </g>
  );
}

function PromiseRings({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <circle cx="68" cy="96" r="20" fill="none" stroke="#b98a56" strokeWidth="3" />
      <circle cx="92" cy="96" r="20" fill="none" stroke="#b98a56" strokeWidth="3" />
      <path d="M92 70 l5 5 -5 6 -5 -6z" fill="#fbf4ee" stroke="#b98a56" strokeWidth="1.2" strokeLinejoin="round" />
      <text x="80" y="140" textAnchor="middle" fill="#b98a56" fontSize="8" fontFamily={display}>
        من نظرة… لكلمة… لوعد
      </text>
      <Name y={172} size={16} fill="#4a1a26">
        {names}
      </Name>
      <rect x="34" y="196" width="92" height="20" rx="10" fill="none" stroke="#b98a56" strokeWidth="0.8" />
      <text x="80" y="209" textAnchor="middle" fill="#4a1a26" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      <path d="M30 240 C50 230 62 250 80 240 S110 230 130 240" fill="none" stroke="#e8b4bc" strokeWidth="1.4" />
    </g>
  );
}

function MiniCandelabra({ x, y, s = 1, lit = true }: { x: number; y: number; s?: number; lit?: boolean }) {
  const cups = [
    [-30, 0],
    [-15, 0],
    [15, 0],
    [30, 0],
    [-18, -22],
    [18, -22],
    [0, -40],
  ] as const;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 10 C-14 10 -28 8 -30 2 M0 10 C14 10 28 8 30 2 M0 6 C-8 6 -14 4 -15 2 M0 6 C8 6 14 4 15 2 M0 -14 C-10 -14 -17 -17 -18 -20 M0 -14 C10 -14 17 -17 18 -20" fill="none" stroke="#c08a3e" strokeWidth="2" strokeLinecap="round" />
      <rect x="-2" y="-40" width="4" height="86" fill="#c08a3e" />
      <path d="M-16 50 C-10 42 -4 40 0 40 C4 40 10 42 16 50z" fill="#c08a3e" />
      {cups.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          {lit && <circle cx={cx} cy={cy - 14} r="7" fill="#ffc35a" opacity="0.28" />}
          <rect x={cx - 2} y={cy - 10} width="4" height="10" fill="#fffaf0" />
          {lit && <path d={`M${cx} ${cy - 11} c-2.4 -2.4 -2 -6 0 -9 c2 3 2.4 6.6 0 9z`} fill="#ffb347" />}
          <path d={`M${cx - 4} ${cy} h8 l-2 3 h-4z`} fill="#c08a3e" />
        </g>
      ))}
    </g>
  );
}

function ShamadanCover({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#21121a" />
      <ellipse cx="80" cy="150" rx="60" ry="56" fill="#ffc46e" opacity="0.07" />
      <text x="80" y="38" textAnchor="middle" fill="#e6c27e" fontSize="8" fontFamily={display}>
        دعوة زفاف
      </text>
      <Name y={66} size={15} fill="#f6e9d2">
        {names}
      </Name>
      <MiniCandelabra x={80} y={150} s={1.25} />
      <text x="80" y="234" textAnchor="middle" fill="#f6e9d2" fontSize="7" fontFamily={display} opacity="0.75">
        {date}
      </text>
      <circle cx="80" cy="252" r="8" fill="none" stroke="#e6c27e" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

function ShamadanArch({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <ellipse cx="80" cy="64" rx="66" ry="44" fill="#ffc46e" opacity="0.16" />
      <path d="M20 262 V98 C20 60 48 34 80 34 C112 34 140 60 140 98 V262" fill="none" stroke="#c08a3e" strokeWidth="1.2" />
      <path d="M26 262 V100 C26 66 50 40 80 40 C110 40 134 66 134 100 V262" fill="none" stroke="#c08a3e" strokeWidth="0.6" opacity="0.7" />
      <circle cx="80" cy="34" r="13" fill="#f8f0e3" />
      <MiniCandelabra x={80} y={34} s={0.32} />
      <text x="80" y="86" textAnchor="middle" fill="#7a5d48" fontSize="7" fontFamily="var(--font-amiri), serif">
        بسم الله الرحمن الرحيم
      </text>
      <text x="80" y="104" textAnchor="middle" fill="#8a5f26" fontSize="8" fontFamily="var(--font-amiri), serif">
        ﴿ مودةً ورحمة ﴾
      </text>
      <Name y={150} size={17} fill="#3b2417">
        {names}
      </Name>
      <line x1="48" y1="180" x2="112" y2="180" stroke="#c08a3e" strokeWidth="0.6" />
      <text x="80" y="196" textAnchor="middle" fill="#3b2417" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function GoldBalloons({ names, date }: { names: string; date: string }) {
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#0f0d0b" />
      <ellipse cx="80" cy="96" rx="62" ry="54" fill="#f3e3bf" opacity="0.06" />
      <text x="80" y="34" textAnchor="middle" fill="#d9b46a" fontSize="8" fontFamily={display}>
        دعوة عيد ميلاد
      </text>
      <text x="80" y="54" textAnchor="middle" fill="#f3e3bf" fontSize="15" fontFamily="var(--font-pinyon), cursive">
        Happy Birthday
      </text>
      <path d="M52 112 C56 136 72 150 80 166 M80 106 C78 130 82 150 80 166 M110 116 C104 138 88 152 80 166" fill="none" stroke="#d9b46a" strokeWidth="0.6" opacity="0.6" />
      <ellipse cx="52" cy="92" rx="18" ry="21" fill="#d8a08f" />
      <ellipse cx="110" cy="96" rx="17" ry="20" fill="#efe6d6" />
      <ellipse cx="80" cy="82" rx="22" ry="26" fill="#d9b46a" />
      <ellipse cx="73" cy="72" rx="5" ry="8" fill="#fff" opacity="0.4" />
      <path d="M80 164 c-5 -4 -10 -1 -6 3 c2 2 6 0 6 -3 c0 3 4 5 6 3 c4 -4 -1 -7 -6 -3z" fill="#d9b46a" />
      <text x="80" y="198" textAnchor="middle" fill="#f5ead6" fontSize="17" fontWeight="700" fontFamily={display}>
        {names}
      </text>
      <text x="80" y="216" textAnchor="middle" fill="#c8b89a" fontSize="7" fontFamily={display}>
        {date}
      </text>
      <circle cx="80" cy="240" r="10" fill="none" stroke="#d9b46a" strokeWidth="0.8" opacity="0.7" />
      <text x="80" y="264" textAnchor="middle" fill="#f5ead6" fontSize="7" fontFamily={display} opacity="0.8">
        المس البالونة الدهبي
      </text>
    </g>
  );
}

function GoldNight({ names, date }: { names: string; date: string }) {
  const bits = [
    [30, 40, "#d9b46a"], [128, 34, "#d8a08f"], [50, 70, "#f3e3bf"], [116, 64, "#d9b46a"],
    [24, 110, "#d8a08f"], [138, 104, "#f3e3bf"], [40, 150, "#d9b46a"], [124, 140, "#efe6d6"],
  ] as const;
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#0f0d0b" />
      {bits.map(([x, y, fill], index) => (
        <rect key={index} x={x} y={y} width="4" height={index % 2 ? 4 : 8} rx="1" fill={fill} transform={`rotate(${index * 37} ${x} ${y})`} />
      ))}
      <g stroke="#d9b46a" strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, index) => {
          const a = (index / 12) * Math.PI * 2;
          return <line key={index} x1={Math.round(80 + Math.cos(a) * 18)} y1={Math.round(70 + Math.sin(a) * 18)} x2={Math.round(80 + Math.cos(a) * 28)} y2={Math.round(70 + Math.sin(a) * 28)} />;
        })}
      </g>
      <ellipse cx="80" cy="68" rx="8" ry="9" fill="#d9b46a" />
      <text x="80" y="124" textAnchor="middle" fill="#f3e3bf" fontSize="16" fontFamily="var(--font-pinyon), cursive">
        Happy Birthday
      </text>
      <text x="80" y="158" textAnchor="middle" fill="#d9b46a" fontSize="22" fontWeight="700" fontFamily={display}>
        {names}
      </text>
      <rect x="34" y="176" width="92" height="20" rx="10" fill="none" stroke="#d9b46a" strokeWidth="0.8" />
      <text x="80" y="189" textAnchor="middle" fill="#f5ead6" fontSize="7.5" fontFamily={display}>
        {date}
      </text>
      <rect x="0" y="214" width="160" height="66" fill="#d9b46a" />
      <rect x="20" y="228" width="26" height="26" rx="5" fill="#15110c" />
      <rect x="52" y="228" width="26" height="26" rx="5" fill="#15110c" />
      <rect x="84" y="228" width="26" height="26" rx="5" fill="#15110c" />
      <rect x="116" y="228" width="26" height="26" rx="5" fill="#15110c" />
    </g>
  );
}

const r1 = (value: number) => Math.round(value * 10) / 10;

function MiniLeaf({ x, y, angle, scale = 0.5 }: { x: number; y: number; angle: number; scale?: number }) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)}) scale(${scale})`}>
      <path d="M0 0 C6 -7 22 -8 34 0 C22 8 6 7 0 0Z" fill="#6e8b6a" />
    </g>
  );
}

function OliveCover({ names, date }: { names: string; date: string }) {
  const leaves = Array.from({ length: 8 }, (_, i) => {
    const t = 0.15 + (i / 7) * 0.8;
    const x = 48 + t * 64 + Math.sin(t * 5) * 8;
    const y = 214 - t * 130;
    return { x, y, angle: (i % 2 ? 1 : -1) * 52 - 70 };
  });
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#dbe5d0" />
      <ellipse cx="80" cy="112" rx="52" ry="70" fill="#fff" opacity="0.28" />
      <text x="80" y="36" textAnchor="middle" fill="#7a6637" fontSize="8" fontFamily={display}>
        دعوة عقيقة
      </text>
      <text x="80" y="52" textAnchor="middle" fill="#5b6b5d" fontSize="8" fontFamily="var(--font-amiri), serif">
        بسم الله ما شاء الله
      </text>
      <path d="M52 214 C44 170 112 150 102 82" fill="none" stroke="#6b5b3e" strokeWidth="2" strokeLinecap="round" />
      {leaves.map((leaf, i) => (
        <MiniLeaf key={i} x={leaf.x} y={leaf.y} angle={leaf.angle} />
      ))}
      <Name y={244} size={18} fill="#243028">
        {names}
      </Name>
      <text x="80" y="262" textAnchor="middle" fill="#5b6b5d" fontSize="7" fontFamily={display}>
        {date}
      </text>
    </g>
  );
}

function OliveHero({ names }: { names: string }) {
  const leaves = (["l", "r"] as const).flatMap((side) =>
    Array.from({ length: 7 }, (_, k) => {
      const phi = ((k + 1) / 8) * Math.PI;
      const sign = side === "l" ? -1 : 1;
      const tangent = (Math.atan2(-Math.sin(phi), side === "l" ? -Math.cos(phi) : Math.cos(phi)) * 180) / Math.PI;
      return {
        key: `${side}${k}`,
        x: 80 + sign * 44 * Math.sin(phi),
        y: 118 + 44 * Math.cos(phi),
        angle: tangent + (k % 2 ? -40 : 40),
      };
    }),
  );
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#f3f5ef" />
      <text x="80" y="40" textAnchor="middle" fill="#7a6637" fontSize="7.5" fontFamily="var(--font-amiri), serif">
        ﴿ المال والبنون زينة الحياة الدنيا ﴾
      </text>
      <path d="M80 162 A44 44 0 0 1 80 74 M80 162 A44 44 0 0 0 80 74" fill="none" stroke="#6b5b3e" strokeWidth="1.6" strokeLinecap="round" />
      {leaves.map((leaf) => (
        <MiniLeaf key={leaf.key} x={leaf.x} y={leaf.y} angle={leaf.angle} scale={0.42} />
      ))}
      <text x="80" y="108" textAnchor="middle" fill="#5b6b5d" fontSize="6.5" fontFamily={display}>
        رزقنا الله بـ
      </text>
      <Name y={130} size={19} fill="#2f4237">
        {names}
      </Name>
      <rect x="34" y="190" width="92" height="20" rx="10" fill="none" stroke="#6e8b6a" strokeWidth="0.8" />
      <path d="M44 232 H116" stroke="#6e8b6a" strokeWidth="0.8" opacity="0.5" />
      <rect x="40" y="244" width="22" height="14" rx="6" fill="#2f4237" opacity="0.85" />
      <rect x="68" y="244" width="22" height="14" rx="6" fill="#2f4237" opacity="0.85" />
      <rect x="96" y="244" width="22" height="14" rx="6" fill="#2f4237" opacity="0.85" />
    </g>
  );
}

function MiniLantern({ x, y, scale, color, lit = true }: { x: number; y: number; scale: number; color: string; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {lit ? <circle cx="0" cy="34" r="26" fill="#ffc46e" opacity="0.28" /> : null}
      <path d="M0 0 V10" stroke="#7a6a58" strokeWidth="1.4" />
      <path d="M-8 14 H8 L11 20 H-11 Z" fill="#c9a24a" />
      <path d="M-11 20 H11 L14 58 H-14 Z" fill={color} />
      <rect x="-6" y="26" width="12" height="22" rx="6" fill={lit ? "#fff0c4" : "#d8ccb2"} />
      {lit ? <path d="M0 30 C-3 36 -3 40 0 45 C3 40 3 36 0 30 Z" fill="#ffa43a" /> : null}
      <path d="M-14 58 H14 L11 64 H-11 Z" fill="#c9a24a" />
    </g>
  );
}

function LanternCover({ names, date }: { names: string; date: string }) {
  const colors = ["#2bb8b0", "#f08a24", "#e8648c", "#3b4a74", "#2bb8b0"];
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#1d2640" />
      <path d="M12 26 C50 40 110 40 148 26" fill="none" stroke="#7a6a58" strokeWidth="1" />
      {colors.map((color, i) => (
        <MiniLantern key={i} x={20 + i * 30} y={i % 2 ? 36 : 28} scale={0.5 + (i === 1 || i === 3 ? 0.08 : 0)} color={color} lit={false} />
      ))}
      <text x="80" y="104" textAnchor="middle" fill="#ffd36a" fontSize="8" fontFamily={display}>
        دعوة سبوع
      </text>
      <Name y={136} size={24} fill="#fff6ea">
        {names}
      </Name>
      <path d="M52 192 H108 L103 232 C102 236 99 238 96 238 H64 C61 238 58 236 57 232 Z" fill="#c47a42" />
      <ellipse cx="80" cy="192" rx="28" ry="5" fill="#2a1408" />
      <rect x="77" y="150" width="6" height="46" rx="3" fill="#e9a46a" transform="rotate(-12 80 196)" />
      <text x="80" y="262" textAnchor="middle" fill="#f6e9d2" fontSize="7" fontFamily={display} opacity="0.75">
        {date}
      </text>
    </g>
  );
}

function LanternHero({ names, date }: { names: string; date: string }) {
  const colors = ["#2bb8b0", "#f08a24", "#e8648c", "#3b4a74", "#2bb8b0"];
  return (
    <g>
      <rect x="1" y="1" width="158" height="278" rx="22" fill="#fff6ea" />
      <path d="M12 26 C50 40 110 40 148 26" fill="none" stroke="#7a6a58" strokeWidth="1" />
      {colors.map((color, i) => (
        <MiniLantern key={i} x={20 + i * 30} y={i % 2 ? 36 : 28} scale={0.5 + (i === 1 || i === 3 ? 0.08 : 0)} color={color} />
      ))}
      <text x="80" y="126" textAnchor="middle" fill="#a85a0c" fontSize="9" fontWeight="700" fontFamily={display}>
        ألف مبروك
      </text>
      <text x="80" y="142" textAnchor="middle" fill="#5f5472" fontSize="7" fontFamily={display}>
        نوّرت الدنيا يا
      </text>
      <Name y={176} size={26} fill="#24304a">
        {names}
      </Name>
      <rect x="42" y="196" width="76" height="14" rx="7" fill="#2bb8b0" opacity="0.25" />
      <text x="80" y="206" textAnchor="middle" fill="#0f7a74" fontSize="7" fontWeight="700" fontFamily={display}>
        سبوع {names}
      </text>
      <rect x="34" y="222" width="92" height="20" rx="10" fill="none" stroke="#f08a24" strokeWidth="0.8" />
      <text x="80" y="235" textAnchor="middle" fill="#24304a" fontSize="7.5" fontFamily={display}>
        {date}
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
  if (kind === "navy") return "#d8dee8";
  if (kind === "ember") return "#0d1c16";
  if (kind === "lavender" || kind === "mist") return "#efe6f4";
  if (kind === "sage") return "#e8eee4";
  if (kind === "sand") return "#eceae4";
  if (kind === "watercolor" || kind === "bismillah" || kind === "classic" || kind === "ivory") return "#f3ece4";
  if (kind === "rosegate" || kind === "bab" || kind === "blush") return "#f3ece8";
  if (kind === "gate" || kind === "mashrabiya") return "#f3eee6";
  if (kind === "gift") return "#ffe6d2";
  if (kind === "rings") return "#e9d2bd";
  if (kind === "envelope") return "#e8d7bf";
  if (kind === "candles") return "#ffd9e8";
  if (kind === "confetti") return "#fff3a8";
  if (kind === "sieve") return "#bff7ea";
  if (kind === "ringbox") return "#f1ddd3";
  if (kind === "ribbon") return "#2e0b13";
  if (kind === "balloons") return "#070605";
  if (kind === "shamadan") return "#150b10";
  if (kind === "olive") return "#e3e8dc";
  if (kind === "lanterns") return "#161e33";
  return "#f6e7ea";
}

function paperColor(kind: OpeningKind, face: Face) {
  if (kind === "moon") return face === "a" ? "#141a33" : "#1b2344";
  if (kind === "navy") return face === "a" ? "#1a2744" : "#fbf8f1";
  if (kind === "ember") return face === "a" ? "#10241d" : "#173128";
  if (kind === "lavender" || kind === "mist") return "#fbf8fd";
  if (kind === "sage") return "#fbfcf8";
  if (kind === "sand") return "#ffffff";
  if (kind === "watercolor") return "#f7f1ea";
  if (kind === "bismillah" || kind === "classic" || kind === "ivory") return "#f8f1e4";
  if (kind === "mashrabiya") return "#f4ecdf";
  if (kind === "rosegate") return "#fbf7f4";
  if (kind === "bab") return "#f7f3ec";
  if (kind === "blush") return "#fffaf6";
  if (kind === "gate") return "#f7f4ef";
  if (kind === "gift") return face === "a" ? "#ffe6d2" : "#fff4ea";
  if (kind === "rings") return face === "a" ? "#efdcc9" : "#f6ede2";
  if (kind === "envelope") return face === "a" ? "#efe2cf" : "#f7f1e7";
  if (kind === "candles") return face === "a" ? "#ffe0ee" : "#fff1f7";
  if (kind === "confetti") return face === "a" ? "#fff3a8" : "#fff8d4";
  if (kind === "sieve") return face === "a" ? "#c8fbee" : "#eafff8";
  if (kind === "ringbox") return face === "a" ? "#f1ddd3" : "#f8efe9";
  if (kind === "ribbon") return face === "a" ? "#3d1019" : "#fbf4ee";
  if (kind === "balloons") return "#0f0d0b";
  if (kind === "shamadan") return face === "a" ? "#21121a" : "#f8f0e3";
  if (kind === "olive") return face === "a" ? "#dbe5d0" : "#f3f5ef";
  if (kind === "lanterns") return face === "a" ? "#1d2640" : "#fff6ea";
  return face === "a" ? "#f8ecee" : "#fff8f6";
}
