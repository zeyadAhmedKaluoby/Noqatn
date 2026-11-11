import { Flower } from "@/components/invitation/decor";
import {
  BismillahOpening,
  BowOpening,
  GardenGateOpening,
  GiftBurstOpening,
  LavenderOpening,
  MashrabiyaOpening,
  MoonDoorOpening,
  RingBoxOpening,
  WatercolorOpening,
  WaxOpening,
} from "@/components/invitation/theme-openings";
import { PosterStage } from "@/components/invitation/poster";
import { displayNames, formatArabicDate } from "@/lib/format";
import { getSong } from "@/lib/songs";
import { EVENT_TYPES } from "@/lib/templates";
import type { InvitationEvent } from "@/lib/types";

export type OpeningProps = {
  event: InvitationEvent;
  onOpen: () => void;
};

function Kicker({ event, light = false }: { event: InvitationEvent; light?: boolean }) {
  return (
    <p className={`text-xs font-bold tracking-[0.22em] ${light ? "text-[#e6d3b0]" : "text-[var(--muted)]"}`}>
      {EVENT_TYPES[event.type].kicker}
    </p>
  );
}

function Title({ event, light = false }: { event: InvitationEvent; light?: boolean }) {
  return (
    <h1 className={`font-display text-4xl leading-[1.45] ${light ? "text-[#f6e7c8]" : ""}`}>
      {displayNames(event.details.honoreeNames)}
    </h1>
  );
}

export function FloralOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="relative grid min-h-svh place-items-center px-5 py-16">
      <Flower className="flower -top-2 right-0" />
      <Flower className="flower bottom-6 left-0" />
      <div className="relative z-10 w-full max-w-sm text-center">
        <Kicker event={event} />
        <div className="envelope mt-6">
          <div className="envelope-flap" />
          <button type="button" className="seal-btn" onClick={onOpen}>
            <span className="seal-dot" />
            <span>افتح الدعوة</span>
          </button>
          <div className="envelope-body">
            <Title event={event} />
            <p className="mt-3 text-sm text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
          </div>
        </div>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function RoyalOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="relative grid min-h-svh place-items-center px-6 py-16 text-center">
      <svg className="pointer-events-none absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] text-[var(--gold)]" viewBox="0 0 100 160" aria-hidden>
        <rect className="frame-line" x="2" y="2" width="96" height="156" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <rect className="frame-line" x="5" y="5" width="90" height="150" fill="none" stroke="currentColor" strokeWidth="0.25" />
      </svg>
      <div className="relative z-10 max-w-sm">
        <Kicker event={event} light />
        <div className="mt-8">
          <Title event={event} light />
        </div>
        <p className="mt-4 text-sm text-[#cbb892]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-10" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} light />
      </div>
    </div>
  );
}

export function MinimalOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="grid min-h-svh place-items-center px-6 py-16 text-center">
      <div className="max-w-sm">
        <Kicker event={event} />
        <div className="mt-8">
          <Title event={event} />
        </div>
        <div className="hairline" />
        <p className="mt-6 text-sm text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-10" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function GardenOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="relative grid min-h-svh place-items-center px-6 py-16 text-center">
      <Flower className="flower top-4 right-2" />
      <Flower className="flower top-16 left-1" />
      <Flower className="flower bottom-10 right-4" />
      <div className="relative z-10 max-w-sm rounded-[2rem] border border-[color:var(--gold)] bg-[var(--card)] px-6 py-12">
        <Kicker event={event} />
        <div className="mt-6">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{event.details.venueName}</p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
      </div>
    </div>
  );
}

export function EngagementOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="grid min-h-svh place-items-center px-6 py-16 text-center">
      <div className="max-w-sm">
        <svg viewBox="0 0 140 80" className="mx-auto h-20 w-36 text-[var(--gold)]" aria-hidden>
          <circle className="ring-draw" cx="54" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle className="ring-draw delay" cx="86" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
        <Kicker event={event} />
        <div className="mt-5">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function SebouOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="relative grid min-h-svh place-items-center px-6 py-16 text-center">
      <Lantern className="absolute top-0 right-8 h-24 text-[var(--gold)]" />
      <Lantern className="absolute top-6 left-8 h-16 text-[var(--accent)]" />
      <div className="relative z-10 max-w-sm">
        <Kicker event={event} />
        <p className="mt-6 text-sm text-[var(--muted)]">مولودنا</p>
        <div className="mt-2">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          {displayNames(event.details.hosts)}
        </p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function PartyOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden px-6 py-16 text-center">
      <span className="party-blob left-[-2rem] top-10 h-28 w-28 bg-[var(--gold)]" />
      <span className="party-blob right-[-1.5rem] top-24 h-20 w-20 bg-[var(--accent)]" />
      <span className="party-blob bottom-16 left-8 h-16 w-16 bg-[var(--petal)]" />
      <div className="relative z-10 max-w-sm">
        <p className="party-kicker">{EVENT_TYPES[event.type].kicker}</p>
        <div className="mt-6">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm font-semibold text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function BirthdayOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="grid min-h-svh place-items-center px-6 py-16 text-center">
      <div className="max-w-sm">
        <Candles />
        <Kicker event={event} />
        <div className="mt-5">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function AqiqahOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="grid min-h-svh place-items-center px-6 py-16 text-center">
      <div className="max-w-sm">
        <Olive />
        <Kicker event={event} />
        <div className="mt-5">
          <Title event={event} />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{formatArabicDate(event.details.date)}</p>
        <button type="button" className="open-btn mt-8" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} />
      </div>
    </div>
  );
}

export function PosterOpening({ event, onOpen }: OpeningProps) {
  return (
    <div className="poster-sheet" dir="ltr">
      <PosterStage event={event} />
      <div className="poster-actions" dir="rtl">
        <button type="button" className="poster-open" onClick={onOpen}>
          افتح الدعوة
        </button>
        <MusicHint event={event} light />
      </div>
    </div>
  );
}

function MusicHint({ event, light = false }: { event: InvitationEvent; light?: boolean }) {
  if (!event.design.music) return null;
  const song = getSong(event.design.song, event.type);
  return (
    <p className={`mt-6 text-sm ${light ? "text-[#cbb892]" : "text-[var(--muted)]"}`}>
      الأغنية: {song.title}. تبدأ مع الفتح، ويمكن كتمها
    </p>
  );
}

function Lantern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 78" className={`lantern ${className ?? ""}`} aria-hidden>
      <path d="M20 0 v10" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="12" width="24" height="34" rx="8" fill="currentColor" opacity="0.9" />
      <path d="M12 46 h16 l-8 18 z" fill="currentColor" />
    </svg>
  );
}

function Candles() {
  return (
    <svg viewBox="0 0 140 72" className="mx-auto mb-4 h-16 w-36" aria-hidden>
      <path className="candle-flame" d="M46 18c4 6 4 10 0 14-4-4-4-8 0-14z" fill="#f2d48a" />
      <path className="candle-flame" d="M70 8c4 6 4 10 0 14-4-4-4-8 0-14z" fill="#f6e7c1" />
      <path className="candle-flame delay" d="M94 18c4 6 4 10 0 14-4-4-4-8 0-14z" fill="#f2d48a" />
      <rect x="42" y="32" width="8" height="28" rx="2" fill="var(--gold)" />
      <rect x="66" y="22" width="8" height="38" rx="2" fill="var(--gold)" />
      <rect x="90" y="32" width="8" height="28" rx="2" fill="var(--gold)" />
    </svg>
  );
}

function Olive() {
  return (
    <svg viewBox="0 0 140 46" className="mx-auto mb-4 h-12 w-40 text-[var(--accent)]" aria-hidden>
      <path d="M10 28c24-18 40-18 60-4 20-14 36-14 60 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="38" cy="20" rx="7" ry="4" transform="rotate(-30 38 20)" fill="currentColor" opacity="0.7" />
      <ellipse cx="102" cy="20" rx="7" ry="4" transform="rotate(30 102 20)" fill="currentColor" opacity="0.7" />
      <circle cx="70" cy="24" r="3" fill="var(--gold)" />
    </svg>
  );
}

export const invitationTemplates = {
  "elegant-floral": FloralOpening,
  "royal-gold": RoyalOpening,
  "minimal-modern": MinimalOpening,
  "garden-romance": GardenOpening,
  "romantic-engagement": EngagementOpening,
  "sebou-lanterns": SebouOpening,
  "aqiqah-olive": AqiqahOpening,
  "birthday-candles": BirthdayOpening,
  "birthday-confetti": PartyOpening,
  "sebou-festival": SebouOpening,
  "poster-dance": PosterOpening,
  "wax-roses": WaxOpening,
  "bow-letter": BowOpening,
  "watercolor-seal": WatercolorOpening,
  "bismillah-seal": BismillahOpening,
  "garden-gate": GardenGateOpening,
  "lavender-window": LavenderOpening,
  "mashrabiya-door": MashrabiyaOpening,
  "moon-door": MoonDoorOpening,
  "ring-box": RingBoxOpening,
  "gift-burst": GiftBurstOpening,
} as const;
