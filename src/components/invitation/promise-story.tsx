"use client";

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

export const PROMISE_OPEN_MS = 1900;

export function PromiseStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const [first, second] = event.details.honoreeNames.map((name) => name.trim()).filter(Boolean);
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "pr", openMs: PROMISE_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();

  return (
    <div ref={root} className={`promise ${still ? "is-still" : ""}`}>
      {/* ───────── Cover: a letter tied with a satin bow ───────── */}
      <button {...cover("فك الشريطة وافتح الدعوة")}>
        <span className="pr-velvet" aria-hidden />
        <span className="pr-cover-kicker">دعوة خطوبة</span>

        <span className="pr-letter">
          <span className="pr-letter-inner">
            <span className="pr-letter-mark" aria-hidden>
              <RingsMark size={34} />
            </span>
            <span className="pr-letter-names">
              {first}
              {second && (
                <>
                  <span className="pr-amp">&</span>
                  {second}
                </>
              )}
            </span>
            <span className="pr-letter-date">{dottedDate(event.details.date)}</span>
          </span>

          <span className="pr-ribbon pr-ribbon-a" aria-hidden />
          <span className="pr-ribbon pr-ribbon-b" aria-hidden />
          <Bow />
        </span>

        <span className="pr-cover-hint">
          <span className="pr-tap" aria-hidden>
            <HandIcon />
          </span>
          المس الفيونكة لفك الشريطة
        </span>
      </button>

      {/* ───────── Hero: the rings meet ───────── */}
      <section className={`pr-hero ${phase === "open" ? "pr-on" : ""}`}>
        <p className="pr-line d0 pr-basmala">بسم الله، وعلى بركة الله</p>
        <div className="pr-rings" aria-hidden>
          <HeroRings />
        </div>
        <p className="pr-line d1 pr-triad">
          من نظرة… <span>لكلمة…</span> <span>لوعد</span>
        </p>
        <h1 className="pr-names">
          <span className="pr-line d2 block">{first}</span>
          {second && (
            <>
              <span className="pr-line d3 pr-names-amp block">&</span>
              <span className="pr-line d4 block">{second}</span>
            </>
          )}
        </h1>
        <p className="pr-line d5 pr-hero-copy">
          قرأنا الفاتحة ونويناها على خير،
          <br />
          ويسعدنا تكونوا معانا في ليلة خطوبتنا
        </p>
        <p className="pr-line d6 pr-date-pill">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="pr-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="pr-line d7 pr-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      <RibbonDivider />

      {/* ───────── The story in three beats ───────── */}
      <section className="pr-section">
        <p className="pr-kicker pr-reveal">الحكاية</p>
        <h2 className="pr-title pr-reveal">ثلاث خطوات لقلبين</h2>
        <ol className="pr-beats">
          {BEATS.map((beat, index) => (
            <li key={beat.title} className="pr-beat pr-reveal" style={{ transitionDelay: `${index * 140}ms` }}>
              <span className="pr-beat-icon" aria-hidden>
                {beat.icon}
              </span>
              <span className="pr-beat-title">{beat.title}</span>
              <span className="pr-beat-body">{beat.body}</span>
            </li>
          ))}
        </ol>
      </section>

      {event.details.wording && (
        <section className="pr-section pt-0">
          <figure className="pr-note pr-reveal">
            <span className="pr-note-quote" aria-hidden>
              “
            </span>
            <blockquote>{event.details.wording}</blockquote>
            <figcaption>{event.details.hosts.length ? event.details.hosts.join(" · ") : "من القلب"}</figcaption>
          </figure>
        </section>
      )}

      {/* ───────── Evening band: countdown + programme ───────── */}
      <section className="pr-night">
        <p className="pr-kicker pr-reveal">ليلة الوعد</p>
        <h2 className="pr-title pr-reveal">باقي على فرحتنا</h2>
        <Countdown prefix="pr" target={target} todayText="النهارده ليلة الوعد" todayClassName="pr-reveal is-in" />

        {event.details.schedule.length > 0 && (
          <>
            <span className="pr-night-rule pr-reveal" aria-hidden />
            <h3 className="pr-subtitle pr-reveal">برنامج السهرة</h3>
            <ol className="pr-programme">
              {event.details.schedule.map((item, index) => (
                <li
                  key={`${item.time}-${item.label}`}
                  className="pr-reveal"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <span className="pr-programme-time">{formatTime(item.time)}</span>
                  <span className="pr-programme-dot" aria-hidden />
                  <span className="pr-programme-label">{item.label}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>

      {/* ───────── Venue ───────── */}
      <section className="pr-section">
        <div className="pr-venue pr-reveal">
          <span className="pr-venue-pin" aria-hidden>
            <PinIcon />
          </span>
          <p className="pr-kicker">المكان</p>
          <h2 className="pr-title">{event.details.venueName}</h2>
          {event.details.address && <p className="pr-muted mt-1">{event.details.address}</p>}
          <p className="mt-4">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="pr" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      <RibbonDivider />

      {event.settings.allowRsvp && (
        <FormSection
          prefix="pr"
          eyebrow="تأكيد الحضور"
          title="هتنورونا؟"
          hint="ردكم بيفرق معانا، ونحب نجهز مكانكم"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="pr" eyebrow="كلمة حلوة" title="اكتبولهم تهنئة">
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="pr"
          eyebrow="النقطة"
          title="نقطة الخطوبة"
          hint="نقطتك بتوصل للعروسين مع اسمك وتهنئتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing prayer ───────── */}
      <section className="pr-closing">
        <span className="pr-reveal pr-closing-mark" aria-hidden>
          <RingsMark size={54} />
        </span>
        <p className="pr-dua pr-reveal">
          اللهم تمّم لهما على خير،
          <br />
          واجمع بينهما في خير
        </p>
        <p className="pr-closing-names pr-reveal">
          {first}
          {second && (
            <>
              <span className="pr-amp mx-2">&</span>
              {second}
            </>
          )}
        </p>
      </section>

      <StoryFooter prefix="pr" />
    </div>
  );
}

const BEATS = [
  {
    title: "نظرة",
    body: "أول مرة… وكأن القلب عرف طريقه",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30">
        <path d="M16 3c1.2 7 5 10.8 13 13-8 2.2-11.8 6-13 13-1.2-7-5-10.8-13-13 8-2.2 11.8-6 13-13z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "كلمة",
    body: "كلمة طيبة، وأهل قرّبوا المسافة",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30">
        <path
          d="M6 8h20a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H14l-6 5v-5H6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M16 19s-5-2.8-5-6a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1c0 3.2-5 6-5 6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "وعد",
    body: "ودبلتين بيقولوا: ده أول الطريق",
    icon: <RingsMark size={34} />,
  },
] as const;

function Bow() {
  return (
    <svg className="pr-bow" viewBox="0 0 120 90" aria-hidden>
      <defs>
        <linearGradient id="pr-satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6d3d8" />
          <stop offset="0.5" stopColor="#e3a5af" />
          <stop offset="1" stopColor="#c97f8c" />
        </linearGradient>
      </defs>
      <g className="pr-bow-tail-a">
        <path d="M56 50 L34 88 L44 84 L48 92 L62 54z" fill="url(#pr-satin)" />
      </g>
      <g className="pr-bow-tail-b">
        <path d="M64 50 L86 88 L76 84 L72 92 L58 54z" fill="url(#pr-satin)" />
      </g>
      <g className="pr-bow-loop-a">
        <path d="M58 42 C40 18 8 18 10 40 C12 60 40 56 58 46z" fill="url(#pr-satin)" />
        <path d="M54 43 C40 30 20 30 20 40" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
      </g>
      <g className="pr-bow-loop-b">
        <path d="M62 42 C80 18 112 18 110 40 C108 60 80 56 62 46z" fill="url(#pr-satin)" />
        <path d="M66 43 C80 30 100 30 100 40" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
      </g>
      <rect className="pr-bow-knot" x="52" y="36" width="16" height="16" rx="5" fill="#c97f8c" />
    </svg>
  );
}

function HeroRings() {
  return (
    <svg viewBox="0 0 220 140" className="w-[min(70%,240px)]">
      <defs>
        <linearGradient id="pr-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9cf9c" />
          <stop offset="0.5" stopColor="#b98a56" />
          <stop offset="1" stopColor="#8a6239" />
        </linearGradient>
      </defs>
      <g className="pr-ring-a">
        <circle className="pr-ring-path" cx="88" cy="78" r="40" fill="none" stroke="url(#pr-gold)" strokeWidth="5" pathLength={1} />
      </g>
      <g className="pr-ring-b">
        <circle className="pr-ring-path" cx="132" cy="78" r="40" fill="none" stroke="url(#pr-gold)" strokeWidth="5" pathLength={1} />
        <path className="pr-diamond" d="M132 26 l9 9 -9 11 -9 -11z" fill="#fbf4ee" stroke="url(#pr-gold)" strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="pr-glints" fill="#d9b47a">
        <path d="M40 30 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" />
        <path d="M184 40 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6z" />
        <path d="M174 118 l1.4 3.6 3.6 1.4 -3.6 1.4 -1.4 3.6 -1.4 -3.6 -3.6 -1.4 3.6 -1.4z" />
        <path d="M54 120 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2z" />
      </g>
    </svg>
  );
}

export function RingsMark({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 32" width={size} height={(size * 32) / 48} aria-hidden>
      <circle cx="19" cy="18" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="29" cy="18" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M29 3 l3 3 -3 3.5 -3 -3.5z" fill="currentColor" />
    </svg>
  );
}

function RibbonDivider() {
  return (
    <div className="pr-divider pr-reveal" aria-hidden>
      <svg viewBox="0 0 300 40" preserveAspectRatio="none">
        <path
          d="M0 20 C40 4 70 36 110 20 S180 4 150 20 S190 36 230 20 S270 6 300 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
        />
      </svg>
    </div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path
        d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.6" fill="currentColor" />
    </svg>
  );
}
