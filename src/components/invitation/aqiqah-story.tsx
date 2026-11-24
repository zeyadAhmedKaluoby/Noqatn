"use client";

import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import { OliveBranch, OliveSprig, OliveWreath } from "@/components/invitation/olive-art";
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

export const AQIQAH_OPEN_MS = 2200;

export function AqiqahStory({
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
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "aq", openMs: AQIQAH_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "14:00"}:00`).getTime();

  return (
    <div ref={root} className={`aq ${still ? "is-still" : ""}`}>
      {/* ───────── Cover: a branch whose leaves unfold ───────── */}
      <button {...cover("افتح الدعوة")}>
        <span className="aq-sky" aria-hidden />
        <span className="aq-dawn" aria-hidden />
        <span className="aq-cover-kicker">دعوة عقيقة</span>
        <span className="aq-cover-basmala">بسم الله ما شاء الله</span>

        <span className="aq-cover-art" aria-hidden>
          <OliveBranch />
        </span>

        <span className="aq-cover-name">{name}</span>
        <span className="aq-cover-date">{dottedDate(event.details.date)}</span>
        <span className="aq-cover-hint">
          <span className="aq-tap" aria-hidden>
            <HandIcon />
          </span>
          المس الغصن لتتفتح الأوراق
        </span>
      </button>

      {/* ───────── Hero: the wreath grows around the name ───────── */}
      <section className={`aq-hero ${phase === "open" ? "aq-on" : ""}`}>
        <p className="aq-line d0 aq-verse">﴿ الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ﴾</p>

        <div className="aq-ring">
          <OliveWreath />
          <div className="aq-ring-text">
            <p className="aq-line d3 aq-ring-kicker">رزقنا الله بـ</p>
            <h1 className="aq-line d4 aq-name">{name}</h1>
          </div>
        </div>

        {hosts.length > 0 && (
          <p className="aq-line d5 aq-hosts">
            يتشرف {hosts.join(" و ")}
            <br />
            بدعوتكم لحضور عقيقة مولودهم
          </p>
        )}
        <p className="aq-line d6 aq-date">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="aq-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="aq-line d7 aq-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {/* ───────── Three intentions ───────── */}
      <section className="aq-section">
        <p className="aq-kicker aq-reveal">نيّة الليلة</p>
        <h2 className="aq-title aq-reveal">شكر ومشاركة ودعاء</h2>
        <ul className="aq-intents">
          {INTENTS.map((item, index) => (
            <li key={item.title} className="aq-intent aq-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="aq-intent-icon" aria-hidden>
                {item.icon}
              </span>
              <span className="aq-intent-title">{item.title}</span>
              <span className="aq-intent-body">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="aq-section pt-0">
          <figure className="aq-note aq-reveal">
            <span className="aq-note-sprig" aria-hidden>
              <OliveSprig />
            </span>
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown ───────── */}
      <section className="aq-band">
        <p className="aq-kicker aq-reveal">على الميعاد</p>
        <h2 className="aq-title aq-reveal">باقي على العقيقة</h2>
        <Countdown prefix="aq" target={target} todayText="النهارده عقيقة المولود" />
      </section>

      {/* ───────── Programme: each item grows a leaf ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="aq-section">
          <p className="aq-kicker aq-reveal">البرنامج</p>
          <h2 className="aq-title aq-reveal">تفاصيل اليوم</h2>
          <ol className="aq-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="aq-step aq-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="aq-step-leaf" aria-hidden>
                  <svg viewBox="0 0 40 20" width="36" height="18">
                    <path d="M2 10 C10 1 28 1 38 10 C28 19 10 19 2 10Z" fill="#6e8b6a" />
                    <path d="M4 10 H34" stroke="#e7efd9" strokeOpacity="0.6" strokeWidth="1" />
                  </svg>
                </span>
                <span className="aq-step-time">{formatTime(item.time)}</span>
                <span className="aq-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="aq-section">
        <div className="aq-venue aq-reveal">
          <span className="aq-venue-sprig" aria-hidden>
            <OliveSprig size={64} />
          </span>
          <p className="aq-kicker">المكان</p>
          <h2 className="aq-title">{event.details.venueName}</h2>
          {event.details.address && <p className="aq-muted mt-1">{event.details.address}</p>}
          <p className="aq-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="aq" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection
          prefix="aq"
          eyebrow="تأكيد الحضور"
          title="تشرفونا؟"
          hint="نرجو تأكيد الحضور عشان نحسب عدد الوجبات"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="aq" eyebrow="دعاء" title={<>ادعوا لـ{name}</>}>
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="aq"
          eyebrow="النقطة"
          title="نقطة المولود"
          hint="نقطتك بتوصل لأهل المولود مع اسمك ودعائك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing prayer ───────── */}
      <section className="aq-closing">
        <span className="aq-reveal aq-closing-mark" aria-hidden>
          <OliveSprig size={72} />
        </span>
        <p className="aq-dua aq-reveal">
          بارك الله لكم في الموهوب،
          <br />
          وشكرتم الواهب، وبلغ أشدّه،
          <br />
          ورُزقتم برّه
        </p>
        <p className="aq-closing-name aq-reveal">{name}</p>
      </section>

      <StoryFooter prefix="aq" />
    </div>
  );
}

const INTENTS = [
  {
    title: "شكر",
    body: "شكرًا لله على نعمته وهبته",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M16 3c1.2 7 5 10.8 13 13-8 2.2-11.8 6-13 13-1.2-7-5-10.8-13-13 8-2.2 11.8-6 13-13z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "مشاركة",
    body: "نُطعم الأهل والأحباب ونفرح معهم",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="11" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="22" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 26c0-5 3.6-8 8-8s8 3 8 8M15 26c.6-4 3.4-6.6 7-6.6s6.4 2.6 7 6.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "دعاء",
    body: "ندعو للمولود بالصلاح والبركة",
    icon: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <path d="M6 18c0-5 3-9 7-9 2 0 3 1 3 3v6M26 18c0-5-3-9-7-9-2 0-3 1-3 3v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 18c0 5 4.5 9 10 9s10-4 10-9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;
