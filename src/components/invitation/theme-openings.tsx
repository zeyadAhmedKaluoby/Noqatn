import { displayNames, formatArabicDate } from "@/lib/format";
import { getSong } from "@/lib/songs";
import { EVENT_TYPES, type OpeningKind } from "@/lib/templates";
import type { InvitationEvent } from "@/lib/types";
import { ThemePhone } from "@/components/invitation/theme-art";

type Props = { event: InvitationEvent; onOpen: () => void };

function Cover({
  kind,
  event,
  onOpen,
  light = false,
}: Props & { kind: OpeningKind; light?: boolean }) {
  const song = event.design.music ? getSong(event.design.song, event.type) : null;
  return (
    <div className="grid min-h-svh place-items-center px-5 py-12 text-center">
      <div className="w-full max-w-[340px]">
        <ThemePhone
          kind={kind}
          names={displayNames(event.details.honoreeNames)}
          date={formatArabicDate(event.details.date)}
          kicker={EVENT_TYPES[event.type].kicker}
        />
        <button type="button" className="open-btn mt-6" onClick={onOpen}>
          افتح الدعوة
        </button>
        {song && (
          <p className={`mt-4 text-sm ${light ? "text-[#cbb892]" : "text-[var(--muted)]"}`}>
            الأغنية: {song.title}. تبدأ مع الفتح، ويمكن كتمها
          </p>
        )}
      </div>
    </div>
  );
}

export function WaxOpening({ event, onOpen }: Props) {
  const [first, second] = event.details.honoreeNames;
  const names = second ? `${second} & ${first}` : first;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[#fae4cf] px-6 py-8 text-center md:min-h-[calc(100svh-3rem)]"
    >
      <span className="pointer-events-none absolute -top-16 end-[-3rem] h-52 w-52 rounded-full bg-[#f6e8e4] opacity-80 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-10 start-[-3rem] h-52 w-52 rounded-full bg-[#f6e8e4] opacity-70 blur-3xl" />
      <Star className="absolute end-[16%] top-[13%] text-[#c2a267]" />
      <Star className="absolute start-[14%] bottom-[17%] text-[#c2a267] opacity-70" />
      <p className="text-[13px] tracking-[0.42em] text-[#a0716c]">دعوة زفاف</p>
      <p className="mt-4 font-[family-name:var(--font-ruqaa)] text-[2.45rem] font-bold leading-none text-[#7e4f4c]">{names}</p>
      <img
        src="/themes/wax-seal.jpg"
        alt=""
        className="my-1 w-[min(64%,270px)] [mask-image:radial-gradient(closest-side,black_68%,transparent_92%)]"
      />
      <p className="mt-1 text-sm tracking-[0.42em] text-[#7e4f4c]">{dottedDate(event.details.date)}</p>
      <span className="wax-tap mt-4 grid h-14 w-14 place-items-center rounded-full border border-[#c4a9a4]/80 bg-white/70 text-[#7e4f4c]">
        <HandIcon />
      </span>
      <span className="mt-3 text-sm text-[#7e4f4c]">اضغط لفتح الدعوة</span>
    </button>
  );
}

function dottedDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const format = new Intl.NumberFormat("ar-EG", { useGrouping: false });
  return `${format.format(date.getDate())} . ${format.format(date.getMonth() + 1)} . ${format.format(date.getFullYear())}`;
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className ?? ""}`} aria-hidden>
      <path d="M10 0C11 6 14 9 20 10C14 11 11 14 10 20C9 14 6 11 0 10C6 9 9 6 10 0Z" fill="currentColor" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="currentColor"
        d="M9.2 11.2V5.6a1.3 1.3 0 0 1 2.6 0v4.2h.5V4.4a1.3 1.3 0 0 1 2.6 0v5.4h.5V6.1a1.3 1.3 0 0 1 2.6 0v8.2c0 3-2.2 5.2-5.4 5.2h-.6c-2.4 0-4.2-1-5.2-2.6l-2.7-4.2a1.4 1.4 0 0 1 2.2-1.7l1.5 1.6V11.2z"
      />
    </svg>
  );
}

export function RoseGateOpening(props: Props) {
  return <Cover kind="rosegate" {...props} />;
}

export function BowOpening(props: Props) {
  return <Cover kind="bow" {...props} />;
}

export function WatercolorOpening(props: Props) {
  return <Cover kind="watercolor" {...props} />;
}

export function BismillahOpening(props: Props) {
  return <Cover kind="bismillah" {...props} />;
}

export function GardenGateOpening(props: Props) {
  return <Cover kind="gate" {...props} />;
}

export function LavenderOpening(props: Props) {
  return <Cover kind="lavender" {...props} />;
}

export function MashrabiyaOpening(props: Props) {
  return <Cover kind="mashrabiya" {...props} />;
}

export function MoonDoorOpening(props: Props) {
  return <Cover kind="moon" light {...props} />;
}

export function RingBoxOpening(props: Props) {
  return <Cover kind="ringbox" {...props} />;
}

export function GiftBurstOpening(props: Props) {
  return <Cover kind="gift" {...props} />;
}

export function ClassicOpening(props: Props) {
  return <Cover kind="classic" {...props} />;
}

export function NavyOpening(props: Props) {
  return <Cover kind="navy" {...props} />;
}

export function BabOpening(props: Props) {
  return <Cover kind="bab" {...props} />;
}

export function SageOpening(props: Props) {
  return <Cover kind="sage" {...props} />;
}

export function BlushOpening(props: Props) {
  return <Cover kind="blush" {...props} />;
}

export function IvoryOpening(props: Props) {
  return <Cover kind="ivory" {...props} />;
}

export function EmberOpening(props: Props) {
  return <Cover kind="ember" light {...props} />;
}

export function MistOpening(props: Props) {
  return <Cover kind="mist" {...props} />;
}

export function SandOpening(props: Props) {
  return <Cover kind="sand" {...props} />;
}
