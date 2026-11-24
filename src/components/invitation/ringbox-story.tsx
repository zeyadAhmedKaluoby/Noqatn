"use client";

import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import { Monogram, RingBoxArt, RingBullet, RingDefs } from "@/components/invitation/ringbox-art";
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

export const RINGBOX_OPEN_MS = 2800;

const initial = (name: string | undefined) => (name ? Array.from(name.trim())[0] ?? "" : "");

export function RingBoxStory({
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
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "rb", openMs: RINGBOX_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();

  return (
    <div ref={root} className={`rb ${still ? "is-still" : ""}`}>
      <RingDefs />

      {/* ───────── Cover: a velvet ring box ───────── */}
      <button {...cover("افتح علبة الدبل وافتح الدعوة")}>
        <span className="rb-sky" aria-hidden />
        <span className="rb-dawn" aria-hidden />
        <span className="rb-cover-kicker">دعوة خطوبة</span>
        <span className="rb-cover-names">
          {first}
          {second && (
            <>
              <span className="rb-amp">&</span>
              {second}
            </>
          )}
        </span>

        <span className="rb-cover-art" aria-hidden>
          <RingBoxArt />
        </span>

        <span className="rb-cover-date">{dottedDate(event.details.date)}</span>
        <span className="rb-cover-hint">
          <span className="rb-tap" aria-hidden>
            <HandIcon />
          </span>
          افتح العلبة وشوف الدبلتين
        </span>
      </button>

      {/* ───────── Hero: the monogram ───────── */}
      <section className={`rb-hero ${phase === "open" ? "rb-on" : ""}`}>
        <p className="rb-line d0 rb-eyebrow">قالوا نعم… وقلوبنا اتفقت</p>
        <div className="rb-mono-wrap">
          <Monogram a={initial(first)} b={initial(second ?? first)} />
        </div>
        <h1 className="rb-names">
          <span className="rb-line d3">{first}</span>
          {second && (
            <>
              <span className="rb-line d3 rb-names-amp" aria-hidden>
                &
              </span>
              <span className="rb-line d3">{second}</span>
            </>
          )}
        </h1>
        <p className="rb-line d4 rb-hero-copy">يشرفنا تشاركونا لحظة لبس الدبل</p>
        {hosts.length > 0 && <p className="rb-line d4 rb-hosts">{hosts.join(" · ")}</p>}
        <p className="rb-line d5 rb-date">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="rb-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="rb-line d6 rb-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {/* ───────── The evening in three moments ───────── */}
      <section className="rb-section">
        <p className="rb-kicker rb-reveal">ليلة الخطوبة</p>
        <h2 className="rb-title rb-reveal">لحظات متستنيكم</h2>
        <ul className="rb-moments">
          {MOMENTS.map((item, index) => (
            <li key={item.title} className="rb-moment rb-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="rb-moment-num" aria-hidden>
                {item.num}
              </span>
              <span className="rb-moment-title">{item.title}</span>
              <span className="rb-moment-body">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="rb-section pt-0">
          <figure className="rb-note rb-reveal">
            <span className="rb-note-gem" aria-hidden />
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown ───────── */}
      <section className="rb-band">
        <p className="rb-kicker rb-reveal">العد التنازلي</p>
        <h2 className="rb-title rb-reveal">باقي على لبس الدبل</h2>
        <Countdown prefix="rb" target={target} todayText="النهارده لبس الدبل" />
      </section>

      {/* ───────── Programme: a ring draws itself beside each item ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="rb-section">
          <p className="rb-kicker rb-reveal">البرنامج</p>
          <h2 className="rb-title rb-reveal">تفاصيل السهرة</h2>
          <ol className="rb-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="rb-step rb-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="rb-step-ring">
                  <RingBullet />
                </span>
                <span className="rb-step-time">{formatTime(item.time)}</span>
                <span className="rb-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="rb-section">
        <div className="rb-venue rb-reveal">
          <span className="rb-venue-gem" aria-hidden />
          <p className="rb-kicker">المكان</p>
          <h2 className="rb-title">{event.details.venueName}</h2>
          {event.details.address && <p className="rb-muted mt-1">{event.details.address}</p>}
          <p className="rb-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="rb" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection
          prefix="rb"
          eyebrow="تأكيد الحضور"
          title="هتشاركونا الفرحة؟"
          hint="ردكم بيفرق معانا، ونحب نجهّز لكم مكانكم"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="rb" eyebrow="كلمة حلوة" title="اكتبولهم تهنئة">
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="rb"
          eyebrow="النقطة"
          title="نقطة الخطوبة"
          hint="نقطتك بتوصل للعروسين مع اسمك وتهنئتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="rb-closing">
        <span className="rb-reveal rb-closing-mark" aria-hidden>
          <svg viewBox="0 0 60 36" width="64" height="38">
            <circle cx="22" cy="19" r="12" fill="none" stroke="#c48b74" strokeWidth="3" />
            <circle cx="38" cy="19" r="12" fill="none" stroke="#c48b74" strokeWidth="3" />
            <path d="M38 2 l4 4 -4 5 -4 -5z" fill="#fff9f2" stroke="#c48b74" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="rb-dua rb-reveal">
          اللهم بارك لهما، وبارك عليهما،
          <br />
          واجمع بينهما في خير
        </p>
        <p className="rb-closing-names rb-reveal">
          {first}
          {second && (
            <>
              <span className="rb-amp mx-2">&</span>
              {second}
            </>
          )}
        </p>
      </section>

      <StoryFooter prefix="rb" />
    </div>
  );
}

const MOMENTS = [
  { num: "١", title: "قراءة الفاتحة", body: "نبدأ بالدعاء ومعانا أهلنا" },
  { num: "٢", title: "لبس الدبل", body: "اللحظة اللي مستنيينها كلنا" },
  { num: "٣", title: "التورتة والصور", body: "نفرح ونصوّر أحلى ذكرى" },
] as const;
