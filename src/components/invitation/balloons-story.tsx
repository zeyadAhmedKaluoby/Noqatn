"use client";

import { type CSSProperties } from "react";
import Image from "next/image";
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
import { photoAlt, resolvePhoto } from "@/lib/photos";
import type { InvitationEvent } from "@/lib/types";

export const BALLOONS_OPEN_MS = 1800;

const BURST_COLORS = ["#d9b46a", "#f3e3bf", "#d8a08f", "#efe6d6", "#b88a3e"];
const FALL_COLORS = ["#d9b46a", "#f3e3bf", "#d8a08f", "#efe6d6"];

/* deterministic burst trajectories: no Math.random so SSR and client agree */
const BURST = Array.from({ length: 30 }, (_, index) => {
  const angle = (index / 30) * Math.PI * 2 + (index % 3) * 0.17;
  const reach = 110 + ((index * 37) % 90);
  return {
    x: Math.round(Math.cos(angle) * reach),
    y: Math.round(Math.sin(angle) * reach * 0.9 + 40),
    r: (index * 47) % 360,
    color: BURST_COLORS[index % BURST_COLORS.length],
    shape: index % 3,
    delay: (index % 5) * 18,
  };
});

const FALL = Array.from({ length: 22 }, (_, index) => ({
  left: (index * 41 + 7) % 100,
  delay: (index % 7) * 0.16,
  duration: 2.2 + (index % 4) * 0.35,
  color: FALL_COLORS[index % FALL_COLORS.length],
  shape: index % 3,
  drift: ((index % 5) - 2) * 14,
}));

export function BalloonsStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const name = event.details.honoreeNames.map((item) => item.trim()).filter(Boolean).join(" و ");
  const { phase, root, level, still, cover } = useStoryPhase({ event, prefix: "gb", openMs: BALLOONS_OPEN_MS, onOpen });
  const photo = resolvePhoto(event);
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();

  return (
    <div ref={root} className={`gb story-dark ${still ? "is-still" : ""}`}>
      {/* ───────── Cover: a cluster of foil balloons ───────── */}
      <button {...cover("افرقع البالونة وافتح الدعوة")}>
        <span className="gb-spot" aria-hidden />
        <span className="gb-cover-kicker">دعوة عيد ميلاد</span>
        <span className="gb-cover-script" dir="ltr">
          Happy Birthday
        </span>

        <span className="gb-cluster" aria-hidden>
          <Balloons />
          <span className="gb-burst">
            {BURST.map((piece, index) => (
              <i
                key={index}
                className={`gb-bit s${piece.shape}`}
                style={
                  {
                    "--x": `${piece.x}px`,
                    "--y": `${piece.y}px`,
                    "--r": `${piece.r}deg`,
                    background: piece.color,
                    animationDelay: `${piece.delay}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
          <span className="gb-rays" />
        </span>

        <span className="gb-cover-name">{name}</span>
        <span className="gb-cover-date">{dottedDate(event.details.date)}</span>

        <span className="gb-cover-hint">
          <span className="gb-tap" aria-hidden>
            <HandIcon />
          </span>
          المس البالونة الدهبي
        </span>
      </button>

      {/* ───────── Hero ───────── */}
      <section className={`gb-hero ${phase === "open" ? "gb-on" : ""}`}>
        {level === "FULL" && phase === "open" && (
          <div className="gb-fall" aria-hidden>
            {FALL.map((piece, index) => (
              <i
                key={index}
                className={`gb-bit s${piece.shape}`}
                style={
                  {
                    left: `${piece.left}%`,
                    background: piece.color,
                    animationDelay: `${piece.delay}s`,
                    animationDuration: `${piece.duration}s`,
                    "--drift": `${piece.drift}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

        <p className="gb-line d0 gb-kicker">عيد ميلاد سعيد</p>
        <div className="gb-sun" aria-hidden>
          <Sunburst />
        </div>
        <p className="gb-line d1 gb-script" dir="ltr">
          Happy Birthday
        </p>
        <h1 className="gb-line d2 gb-name">{name}</h1>
        <p className="gb-line d3 gb-hero-copy">
          سنة جديدة، وضحكة أحلى،
          <br />
          ولمّة حلوة تكمّل الفرحة
        </p>
        <p className="gb-line d4 gb-date-pill">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="gb-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="gb-line d5 gb-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {/* ───────── Photo in a gold polaroid ───────── */}
      {photo && (
        <section className="gb-section pt-4">
          <figure className="gb-polaroid gb-reveal">
            {photo.startsWith("data:") ? (
              // Uploaded photos live in this browser as data URLs, not remote images.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={photoAlt(event, photo)} />
            ) : (
              <Image src={photo} alt={photoAlt(event, photo)} width={800} height={800} />
            )}
            <figcaption>{name}</figcaption>
          </figure>
        </section>
      )}

      {/* ───────── Three wishes ───────── */}
      <section className="gb-section">
        <p className="gb-eyebrow gb-reveal">الليلة دي</p>
        <h2 className="gb-title gb-reveal">ضحكة، أغنية، وأمنية</h2>
        <ul className="gb-wishes">
          {WISHES.map((wish, index) => (
            <li key={wish.title} className="gb-wish gb-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="gb-wish-icon" aria-hidden>
                {wish.icon}
              </span>
              <span className="gb-wish-title">{wish.title}</span>
              <span className="gb-wish-body">{wish.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="gb-section pt-0">
          <figure className="gb-note gb-reveal">
            <span className="gb-note-star" aria-hidden>
              <Star size={18} />
            </span>
            <blockquote>{event.details.wording}</blockquote>
            <figcaption>{event.details.hosts.length ? event.details.hosts.join(" · ") : "مع كل الحب"}</figcaption>
          </figure>
        </section>
      )}

      {/* ───────── Countdown + programme ───────── */}
      <section className="gb-band">
        <p className="gb-eyebrow gb-reveal">العد التنازلي</p>
        <h2 className="gb-title gb-reveal">باقي على الحفلة</h2>
        <Countdown prefix="gb" target={target} todayText="النهارده الحفلة!" />

        {event.details.schedule.length > 0 && (
          <>
            <h3 className="gb-subtitle gb-reveal">فقرات الليلة</h3>
            <ol className="gb-programme">
              {event.details.schedule.map((item, index) => (
                <li key={`${item.time}-${item.label}`} className="gb-reveal" style={{ transitionDelay: `${index * 110}ms` }}>
                  <span className="gb-programme-time">{formatTime(item.time)}</span>
                  <span className="gb-programme-label">{item.label}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>

      {/* ───────── Venue ───────── */}
      <section className="gb-section">
        <div className="gb-ticket gb-reveal">
          <div className="gb-ticket-main">
            <p className="gb-eyebrow">المكان</p>
            <h2 className="gb-title">{event.details.venueName}</h2>
            {event.details.address && <p className="gb-muted mt-1">{event.details.address}</p>}
          </div>
          <div className="gb-ticket-stub">
            <span>{formatArabicDate(event.details.date)}</span>
            <span className="gb-ticket-time">{formatTime(event.details.startTime)}</span>
          </div>
          <VenueActions prefix="gb" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection
          prefix="gb"
          eyebrowClass="eyebrow"
          eyebrow="تأكيد الحضور"
          title="جاي تحتفل معانا؟"
          hint="قولنا بدري عشان نحسب حسابك في التورتة"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="gb" eyebrowClass="eyebrow" eyebrow="أمنيات" title={<>اكتب أمنية لـ{name}</>}>
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="gb"
          eyebrowClass="eyebrow"
          eyebrow="الهدية"
          title="نقطة العيد"
          hint="هديتك بتوصل لصاحب العيد مع اسمك وأمنيتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="gb-closing">
        <span className="gb-reveal gb-closing-mark" aria-hidden>
          <MiniBalloons />
        </span>
        <p className="gb-closing-line gb-reveal">كل سنة وانتوا طيبين</p>
        <p className="gb-closing-sub gb-reveal">وعقبال مية سنة يا {name}</p>
      </section>

      <StoryFooter prefix="gb" />
    </div>
  );
}

const WISHES = [
  {
    title: "هات ضحكتك",
    body: "أحلى هدية إنك تكون موجود",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="11.5" cy="13" r="1.6" fill="currentColor" />
        <circle cx="20.5" cy="13" r="1.6" fill="currentColor" />
        <path d="M10 18.5c1.6 3 3.6 4.2 6 4.2s4.4-1.2 6-4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "غنّي معانا",
    body: "سنة حلوة يا جميل… بصوت عالي",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M12 23V8l13-3v15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="9" cy="23" r="3.2" fill="currentColor" />
        <circle cx="22" cy="20" r="3.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "اتمنّى أمنية",
    body: "ونطفي الشمع كلنا مع بعض",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <rect x="9" y="14" width="14" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 14V9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 3c2.2 2.4 2.2 4.6 0 6-2.2-1.4-2.2-3.6 0-6z" fill="currentColor" />
      </svg>
    ),
  },
] as const;

function Balloons() {
  return (
    <svg className="gb-balloons" viewBox="0 0 240 300">
      <defs>
        <radialGradient id="gb-gold" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff3d2" />
          <stop offset="0.35" stopColor="#e6c582" />
          <stop offset="0.8" stopColor="#b88a3e" />
          <stop offset="1" stopColor="#7d5a22" />
        </radialGradient>
        <radialGradient id="gb-rose" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffe9e1" />
          <stop offset="0.4" stopColor="#e2b0a0" />
          <stop offset="1" stopColor="#9c5e4f" />
        </radialGradient>
        <radialGradient id="gb-pearl" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#efe6d6" />
          <stop offset="1" stopColor="#a8987c" />
        </radialGradient>
      </defs>

      <g className="gb-strings" fill="none" stroke="#d9b46a" strokeOpacity="0.55" strokeWidth="1">
        <path d="M62 128 C70 180 104 220 120 268" />
        <path d="M120 116 C116 170 124 220 120 268" />
        <path d="M180 138 C170 186 136 222 120 268" />
      </g>

      <g className="gb-b gb-b-side gb-b-a">
        <ellipse cx="62" cy="88" rx="38" ry="44" fill="url(#gb-rose)" />
        <path d="M57 131 l5 -3 5 3 -5 3z" fill="#9c5e4f" />
        <ellipse cx="50" cy="70" rx="9" ry="14" fill="#fff" opacity="0.35" transform="rotate(-20 50 70)" />
      </g>

      <g className="gb-b gb-b-side gb-b-c">
        <ellipse cx="180" cy="98" rx="36" ry="42" fill="url(#gb-pearl)" />
        <path d="M175 139 l5 -3 5 3 -5 3z" fill="#a8987c" />
        <ellipse cx="168" cy="82" rx="8" ry="13" fill="#fff" opacity="0.5" transform="rotate(-20 168 82)" />
      </g>

      <g className="gb-b gb-b-pop">
        <ellipse cx="120" cy="66" rx="46" ry="54" fill="url(#gb-gold)" />
        <path d="M114 119 l6 -4 6 4 -6 4z" fill="#7d5a22" />
        <ellipse cx="104" cy="44" rx="11" ry="17" fill="#fff" opacity="0.4" transform="rotate(-22 104 44)" />
        <path d="M120 40 l3.2 8.4 8.8 0.6 -6.8 5.6 2.2 8.6 -7.4 -4.8 -7.4 4.8 2.2 -8.6 -6.8 -5.6 8.8 -0.6z" fill="#fff6dd" opacity="0.9" />
      </g>

      <g className="gb-knot">
        <path d="M120 268 c-10 -8 -20 -2 -12 6 c4 4 12 0 12 -6 c0 6 8 10 12 6 c8 -8 -2 -14 -12 -6z" fill="#d9b46a" />
        <path d="M118 272 l-6 22 M122 272 l6 22" stroke="#d9b46a" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Sunburst() {
  return (
    <svg viewBox="0 0 120 120" width="112" height="112">
      <g className="gb-sun-rays" stroke="#d9b46a" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 16 }, (_, index) => {
          const angle = (index / 16) * Math.PI * 2;
          const inner = index % 2 ? 30 : 26;
          const outer = index % 2 ? 42 : 52;
          return (
            <line
              key={index}
              x1={round(60 + Math.cos(angle) * inner)}
              y1={round(60 + Math.sin(angle) * inner)}
              x2={round(60 + Math.cos(angle) * outer)}
              y2={round(60 + Math.sin(angle) * outer)}
              style={{ animationDelay: `${index * 35}ms` }}
            />
          );
        })}
      </g>
      <g className="gb-sun-core">
        <ellipse cx="60" cy="56" rx="13" ry="15" fill="#d9b46a" />
        <path d="M57 71 l3 -2 3 2 -3 2z" fill="#b88a3e" />
        <path d="M60 73 c-2 6 2 10 0 16" fill="none" stroke="#d9b46a" strokeWidth="1.2" />
        <ellipse cx="55.5" cy="50" rx="3" ry="5" fill="#fff" opacity="0.45" transform="rotate(-20 55.5 50)" />
      </g>
    </svg>
  );
}

/* rounded so server and client render identical SVG attributes */
function round(value: number) {
  return Math.round(value * 100) / 100;
}

function MiniBalloons() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56">
      <ellipse cx="22" cy="22" rx="11" ry="13" fill="#d8a08f" />
      <ellipse cx="42" cy="20" rx="12" ry="14" fill="#d9b46a" />
      <path d="M22 35 C26 44 30 50 32 58 M42 34 C38 44 34 50 32 58" fill="none" stroke="#d9b46a" strokeWidth="1" />
    </svg>
  );
}

function Star({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      <path d="M10 0C11 6 14 9 20 10C14 11 11 14 10 20C9 14 6 11 0 10C6 9 9 6 10 0Z" fill="currentColor" />
    </svg>
  );
}

