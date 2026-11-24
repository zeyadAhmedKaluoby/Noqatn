"use client";

import { type CSSProperties } from "react";
import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import { Garland, Lantern, Mortar, SebouDefs } from "@/components/invitation/sebou-art";
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

export const SEBOU_OPEN_MS = 2300;

const BEAD_COLORS = ["#f08a24", "#2bb8b0", "#e8648c", "#ffd36a", "#7c5cff", "#ffffff"];

/* deterministic trajectories (no Math.random) so server and client agree */
const BEADS = Array.from({ length: 34 }, (_, index) => {
  const angle = (index / 34) * Math.PI * 2 + (index % 4) * 0.21;
  const reach = 90 + ((index * 53) % 110);
  return {
    x: Math.round(Math.cos(angle) * reach),
    y: Math.round(Math.sin(angle) * reach * 0.8 - 30),
    color: BEAD_COLORS[index % BEAD_COLORS.length],
    delay: (index % 6) * 22,
  };
});

export function SebouStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const name = event.details.honoreeNames.map((item) => item.trim()).filter(Boolean)[0] ?? "";
  const hosts = event.details.hosts.filter(Boolean);
  const { phase, root, still, level, cover } = useStoryPhase({ event, prefix: "sb", openMs: SEBOU_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "18:00"}:00`).getTime();

  return (
    <div ref={root} className={`sb ${still ? "is-still" : ""}`}>
      <SebouDefs />

      {/* ───────── Cover: strike the mortar, light the lanterns ───────── */}
      <button {...cover("دُقّ الهون وافتح الدعوة")}>
        <span className="sb-sky" aria-hidden />
        <span className="sb-dawn" aria-hidden />
        <Garland />
        <span className="sb-cover-kicker">دعوة سبوع</span>
        <span className="sb-cover-name">{name}</span>

        <span className="sb-cover-stage" aria-hidden>
          <Mortar />
          <span className="sb-ripple r1" />
          <span className="sb-ripple r2" />
          <span className="sb-ripple r3" />
          <span className="sb-beads">
            {BEADS.map((bead, index) => (
              <i
                key={index}
                style={
                  {
                    "--x": `${bead.x}px`,
                    "--y": `${bead.y}px`,
                    background: bead.color,
                    animationDelay: `${bead.delay}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        </span>

        <span className="sb-cover-date">{dottedDate(event.details.date)}</span>
        <span className="sb-cover-hint">
          <span className="sb-tap" aria-hidden>
            <HandIcon />
          </span>
          دُقّ الهون وخلّي الفرحة تبدأ
        </span>
      </button>

      {/* ───────── Hero: lit garland, the name ───────── */}
      <section className={`sb-hero ${phase === "open" ? "sb-on" : ""}`}>
        <Garland className="is-lit" />
        <p className="sb-line d1 sb-kicker-big">ألف مبروك</p>
        <p className="sb-line d2 sb-welcome">نوّرت الدنيا يا</p>
        <h1 className="sb-line d3 sb-name">{name}</h1>
        <p className="sb-line d4 sb-sebou-label">سبوع {name}</p>
        {hosts.length > 0 && (
          <p className="sb-line d5 sb-hosts">
            يتشرف {hosts.join(" و ")}
            <br />
            بدعوتكم لحضور سبوع مولودهم
          </p>
        )}
        <p className="sb-line d6 sb-date">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="sb-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="sb-line d7 sb-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        {level === "FULL" && phase === "open" && (
          <span className="sb-fall" aria-hidden>
            {BEADS.slice(0, 20).map((bead, index) => (
              <i
                key={index}
                style={
                  {
                    left: `${(index * 37 + 5) % 100}%`,
                    background: bead.color,
                    animationDelay: `${(index % 7) * 0.2}s`,
                  } as CSSProperties
                }
              />
            ))}
          </span>
        )}
      </section>

      {/* ───────── Three traditions ───────── */}
      <section className="sb-section">
        <p className="sb-kicker sb-reveal">ليلة السبوع</p>
        <h2 className="sb-title sb-reveal">فرحة بتتعمل بالنور</h2>
        <ul className="sb-customs">
          {CUSTOMS.map((item, index) => (
            <li key={item.title} className="sb-custom sb-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="sb-custom-icon" aria-hidden>
                {item.icon}
              </span>
              <span className="sb-custom-title">{item.title}</span>
              <span className="sb-custom-body">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="sb-section pt-0">
          <figure className="sb-note sb-reveal">
            <span className="sb-note-lantern" aria-hidden>
              <Lantern color="orange" index={0} />
            </span>
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown ───────── */}
      <section className="sb-band">
        <p className="sb-kicker sb-reveal">على الميعاد</p>
        <h2 className="sb-title sb-reveal">باقي على السبوع</h2>
        <Countdown prefix="sb" target={target} todayText="النهارده السبوع!" />
      </section>

      {/* ───────── Programme: each item lights a small lantern ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="sb-section">
          <p className="sb-kicker sb-reveal">البرنامج</p>
          <h2 className="sb-title sb-reveal">تفاصيل الليلة</h2>
          <ol className="sb-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="sb-step sb-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="sb-step-lantern" aria-hidden>
                  <Lantern color={(["teal", "orange", "pink", "navy"] as const)[index % 4]} index={0} />
                </span>
                <span className="sb-step-time">{formatTime(item.time)}</span>
                <span className="sb-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="sb-section">
        <div className="sb-venue sb-reveal">
          <p className="sb-kicker">المكان</p>
          <h2 className="sb-title">{event.details.venueName}</h2>
          {event.details.address && <p className="sb-muted mt-1">{event.details.address}</p>}
          <p className="sb-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="sb" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection
          prefix="sb"
          eyebrow="تأكيد الحضور"
          title="هتشرفونا؟"
          hint="قولولنا مين جاي عشان نجهّز الملبّس والمكان"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="sb" eyebrow="دعاء" title={<>ادعوا لـ{name}</>}>
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="sb"
          eyebrow="النقطة"
          title="نقطة المولود"
          hint="نقطتك بتوصل لأهل المولود مع اسمك ودعائك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="sb-closing">
        <span className="sb-reveal sb-closing-mark" aria-hidden>
          <Lantern color="teal" index={0} />
        </span>
        <p className="sb-dua sb-reveal">
          ربنا يحفظه ويبارك فيه،
          <br />
          ويجعله من الصالحين
        </p>
        <p className="sb-closing-name sb-reveal">{name}</p>
      </section>

      <StoryFooter prefix="sb" />
    </div>
  );
}

const CUSTOMS = [
  {
    title: "دقّ الهون",
    body: "نعلن قدومه بصوت الفرحة",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M5 14 H27 L24 26 H8 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M18 3 L22 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "النور والشموع",
    body: "نمشي بالنور لتنوّر له الدنيا",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <rect x="11" y="14" width="10" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 3c2.4 2.6 2.4 5.4 0 8-2.4-2.6-2.4-5.4 0-8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "الملبّس",
    body: "نفرّح الصغار والكبار بالحلويات",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="10" cy="11" r="4" fill="currentColor" />
        <circle cx="22" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="22" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="25" cy="23" r="2.4" fill="currentColor" />
      </svg>
    ),
  },
] as const;
