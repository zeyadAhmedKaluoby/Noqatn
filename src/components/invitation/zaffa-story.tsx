"use client";

import { type CSSProperties } from "react";
import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import { useStoryPhase } from "@/components/invitation/story-kit/use-story-phase";
import {
  Countdown,
  dottedDate,
  FormSection,
  HandIcon,
  StoryFooter,
  VenueActions,
} from "@/components/invitation/story-kit/parts";
import { formatArabicDate, formatTime } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

export const ZAFFA_OPEN_MS = 2300;

/* cup positions on the candelabra + lighting order (inner → outer → upper → crown) */
const CANDLES = [
  { x: 65, y: 176, order: 0 },
  { x: 135, y: 176, order: 0 },
  { x: 30, y: 176, order: 1 },
  { x: 170, y: 176, order: 1 },
  { x: 60, y: 126, order: 2 },
  { x: 140, y: 126, order: 2 },
  { x: 100, y: 86, order: 3 },
] as const;

export function ZaffaStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const [first, second] = event.details.honoreeNames.map((name) => name.trim()).filter(Boolean);
  const hosts = event.details.hosts.filter(Boolean);
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "zf", openMs: ZAFFA_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();

  return (
    <div ref={root} className={`zf ${still ? "is-still" : ""}`}>
      {/* ───────── Cover: the unlit candelabra ───────── */}
      <button {...cover("نوّر الشمعدان وافتح الدعوة")}>
        <span className="zf-night" aria-hidden />
        <span className="zf-glow" aria-hidden />
        <span className="zf-dawn" aria-hidden />

        <span className="zf-cover-kicker">دعوة زفاف</span>
        <span className="zf-cover-names">
          {first}
          {second && (
            <>
              <span className="zf-amp">&</span>
              {second}
            </>
          )}
        </span>

        <span className="zf-cover-art" aria-hidden>
          <Shamadan />
        </span>

        <span className="zf-cover-date">{dottedDate(event.details.date)}</span>
        <span className="zf-cover-hint">
          <span className="zf-tap" aria-hidden>
            <HandIcon />
          </span>
          المس الشمعدان وخلّي الزفة تنوّر
        </span>
      </button>

      {/* ───────── Hero: the brass arch ───────── */}
      <section className={`zf-hero ${phase === "open" ? "zf-on" : ""}`}>
        <div className="zf-arch">
          <svg className="zf-arch-line" viewBox="0 0 320 520" preserveAspectRatio="none" aria-hidden>
            <path d="M14 516 V170 C14 82 80 14 160 14 C240 14 306 82 306 170 V516" pathLength={1} />
            <path d="M26 516 V172 C26 92 86 26 160 26 C234 26 294 92 294 172 V516" pathLength={1} />
          </svg>

          <span className="zf-arch-crown" aria-hidden>
            <MiniShamadan lit />
          </span>

          <p className="zf-line d1 zf-basmala">بسم الله الرحمن الرحيم</p>
          <p className="zf-line d2 zf-verse">﴿ وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾</p>

          {hosts.length > 0 && (
            <p className="zf-line d3 zf-hosts">
              يتشرف {hosts.join(" و ")}
              <br />
              بدعوتكم لحضور حفل زفاف
            </p>
          )}

          <h1 className="zf-names">
            <span className="zf-line d4 block">{first}</span>
            {second && (
              <>
                <span className="zf-line d5 zf-names-amp block">&</span>
                <span className="zf-line d6 block">{second}</span>
              </>
            )}
          </h1>

          <p className="zf-line d7 zf-hero-copy">والليلة تحلى وتنوّر بوجودكم</p>

          <p className="zf-line d8 zf-date">
            <span>{formatArabicDate(event.details.date)}</span>
            <span className="zf-date-sep" aria-hidden />
            <span>{formatTime(event.details.startTime)}</span>
          </p>
        </div>
        <span className="zf-line d8 zf-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {event.details.wording && (
        <section className="zf-section pt-4">
          <figure className="zf-note zf-reveal">
            <Corners />
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown band ───────── */}
      <section className="zf-band">
        <p className="zf-kicker zf-reveal">على ميعادنا</p>
        <h2 className="zf-title zf-reveal">باقي على الزفة</h2>
        <Countdown prefix="zf" target={target} todayText="الليلة ليلة الفرح" />
      </section>

      {/* ───────── Programme: every item lights its own candle ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="zf-section">
          <p className="zf-kicker zf-reveal">الزفة</p>
          <h2 className="zf-title zf-reveal">برنامج الليلة</h2>
          <ol className="zf-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="zf-step zf-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="zf-step-candle" aria-hidden>
                  <StepCandle />
                </span>
                <span className="zf-step-time">{formatTime(item.time)}</span>
                <span className="zf-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="zf-section">
        <div className="zf-venue zf-reveal">
          <Corners />
          <p className="zf-kicker">مكان الفرح</p>
          <h2 className="zf-title">{event.details.venueName}</h2>
          {event.details.address && <p className="zf-muted mt-1">{event.details.address}</p>}
          <p className="zf-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="zf" event={event} mapLabel="الوصول للقاعة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      <Divider />

      {event.settings.allowRsvp && (
        <FormSection
          prefix="zf"
          eyebrow="تأكيد الحضور"
          title="تشرفونا؟"
          hint="نرجو الرد قبل يوم الفرح، عشان نجهّز لكم مكانكم"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="zf" eyebrow="من القلب" title="دعوة حلوة للعروسين">
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="zf"
          eyebrow="النقطة"
          title="نقطة العروسين"
          hint="نقطتك بتوصل للعروسين مع اسمك ودعوتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing prayer ───────── */}
      <section className="zf-closing">
        <span className="zf-reveal zf-closing-mark" aria-hidden>
          <MiniShamadan lit />
        </span>
        <p className="zf-dua zf-reveal">
          بارك الله لكما، وبارك عليكما،
          <br />
          وجمع بينكما في خير
        </p>
        <p className="zf-closing-names zf-reveal">
          {first}
          {second && (
            <>
              <span className="zf-amp mx-2">&</span>
              {second}
            </>
          )}
        </p>
      </section>

      <StoryFooter prefix="zf" />
    </div>
  );
}

function Shamadan() {
  return (
    <svg className="zf-shamadan" viewBox="0 0 200 300">
      <defs>
        <linearGradient id="zf-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a5424" />
          <stop offset="0.45" stopColor="#e6c27e" />
          <stop offset="0.6" stopColor="#c99a4e" />
          <stop offset="1" stopColor="#6e4a1e" />
        </linearGradient>
        <linearGradient id="zf-wax" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9dcc4" />
          <stop offset="0.5" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#d8c8ab" />
        </linearGradient>
        <radialGradient id="zf-halo">
          <stop offset="0" stopColor="#ffe3a3" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#ffb85c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff9a3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="zf-fire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff8a2a" />
          <stop offset="0.45" stopColor="#ffc35a" />
          <stop offset="1" stopColor="#fff4d6" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="url(#zf-brass)" strokeWidth="4" strokeLinecap="round">
        <path d="M100 205 C70 205 34 200 30 182" />
        <path d="M100 205 C130 205 166 200 170 182" />
        <path d="M100 196 C86 196 67 192 65 182" />
        <path d="M100 196 C114 196 133 192 135 182" />
        <path d="M100 152 C80 152 62 146 60 132" />
        <path d="M100 152 C120 152 138 146 140 132" />
      </g>
      <rect x="96" y="90" width="8" height="186" rx="3" fill="url(#zf-brass)" />
      <ellipse cx="100" cy="152" rx="10" ry="6" fill="url(#zf-brass)" />
      <ellipse cx="100" cy="205" rx="12" ry="7" fill="url(#zf-brass)" />
      <ellipse cx="100" cy="240" rx="8" ry="5" fill="url(#zf-brass)" />
      <path d="M66 288 C76 270 90 262 100 262 C110 262 124 270 134 288z" fill="url(#zf-brass)" />
      <ellipse cx="100" cy="289" rx="38" ry="6" fill="#6e4a1e" />

      {CANDLES.map((candle) => (
        <g key={`${candle.x}-${candle.y}`} className="zf-candle" style={{ "--i": candle.order } as CSSProperties}>
          <circle className="zf-halo" cx={candle.x} cy={candle.y - 32} r="22" fill="url(#zf-halo)" />
          <rect x={candle.x - 4} y={candle.y - 26} width="8" height="26" rx="1.5" fill="url(#zf-wax)" />
          <path d={`M${candle.x} ${candle.y - 26} v-4`} stroke="#3b2417" strokeWidth="1" />
          <path
            className="zf-fire"
            d={`M${candle.x} ${candle.y - 29} c-5 -5 -4 -12 0 -19 c4 7 5 14 0 19z`}
            fill="url(#zf-fire)"
          />
          <path d={`M${candle.x - 9} ${candle.y} h18 l-4 6 h-10z`} fill="url(#zf-brass)" />
        </g>
      ))}
    </svg>
  );
}

function MiniShamadan({ lit = false }: { lit?: boolean }) {
  return (
    <svg viewBox="0 0 60 60" width="54" height="54" className={lit ? "zf-mini is-lit" : "zf-mini"}>
      <path d="M30 42 C20 42 12 40 11 33 M30 42 C40 42 48 40 49 33 M30 36 C24 36 20 34 19 30 M30 36 C36 36 40 34 41 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M29 20 h2 v34 h-2z M22 56 C25 51 28 50 30 50 C32 50 35 51 38 56z" fill="currentColor" />
      {[
        [11, 33],
        [19, 30],
        [41, 30],
        [49, 33],
        [30, 20],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 1.5} y={y - 8} width="3" height="8" fill="#f5ead6" stroke="currentColor" strokeWidth="0.5" />
          {lit && <path className="zf-mini-fire" d={`M${x} ${y - 9} c-2 -2 -1.6 -5 0 -7 c1.6 2 2 5 0 7z`} fill="#f2a43a" />}
        </g>
      ))}
    </svg>
  );
}

function StepCandle() {
  return (
    <svg viewBox="0 0 24 44" width="22" height="40">
      <circle className="zf-step-halo" cx="12" cy="10" r="10" fill="#ffd27a" opacity="0" />
      <path className="zf-step-fire" d="M12 13 c-4 -3 -3 -8 0 -12 c3 4 4 9 0 12z" fill="#f2a43a" />
      <rect x="8" y="15" width="8" height="22" rx="1.5" fill="#fffaf0" stroke="#c08a3e" strokeWidth="1" />
      <path d="M4 37 h16 l-3 5 h-10z" fill="#c08a3e" />
    </svg>
  );
}

function Corners() {
  return (
    <>
      {["ts", "te", "bs", "be"].map((corner) => (
        <svg key={corner} className={`zf-corner is-${corner}`} viewBox="0 0 32 32" aria-hidden>
          <path d="M2 30 V10 Q2 2 10 2 H30" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 30 V14 Q8 8 14 8 H30" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <circle cx="10" cy="10" r="1.8" fill="currentColor" />
        </svg>
      ))}
    </>
  );
}

function Divider() {
  return (
    <div className="zf-divider zf-reveal" aria-hidden>
      <span />
      <svg viewBox="0 0 20 20" width="14" height="14">
        <path d="M10 0C11 6 14 9 20 10C14 11 11 14 10 20C9 14 6 11 0 10C6 9 9 6 10 0Z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

