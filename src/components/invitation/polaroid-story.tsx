"use client";

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

export const POLAROID_OPEN_MS = 2700;

export function PolaroidStory({
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
  const photo = resolvePhoto(event);
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "po", openMs: POLAROID_OPEN_MS, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();
  const caption = (
    <>
      {first}
      {second && (
        <>
          <span className="po-amp">&</span>
          {second}
        </>
      )}
    </>
  );

  return (
    <div ref={root} className={`po ${still ? "is-still" : ""}`}>
      {/* ───────── Cover: a polaroid that develops ───────── */}
      <button {...cover("هزّ الصورة وافتح الدعوة")}>
        <span className="po-linen" aria-hidden />
        <span className="po-dawn" aria-hidden />
        <span className="po-cover-kicker">دعوة خطوبة</span>

        <span className="po-frame" aria-hidden>
          <span className="po-tape t1" />
          <span className="po-tape t2" />
          <span className="po-photo">
            <PhotoBody photo={photo} alt="" developing />
          </span>
          <span className="po-caption">{caption}</span>
        </span>

        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`po-spark s${i}`} aria-hidden>
            <svg viewBox="0 0 20 20" width="18" height="18">
              <path d="M10 0C11 6 14 9 20 10C14 11 11 14 10 20C9 14 6 11 0 10C6 9 9 6 10 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}

        <span className="po-cover-date">{dottedDate(event.details.date)}</span>
        <span className="po-cover-hint">
          <span className="po-tap" aria-hidden>
            <HandIcon />
          </span>
          هزّ الصورة وشوف مين فيها
        </span>
      </button>

      {/* ───────── Hero: the developed photograph ───────── */}
      <section className={`po-hero ${phase === "open" ? "po-on" : ""}`}>
        <p className="po-line d1 po-hand">لقطة من حكايتنا</p>
        <figure className="po-line d2 po-frame is-hero">
          <span className="po-tape t1" aria-hidden />
          <span className="po-tape t2" aria-hidden />
          <span className="po-photo">
            <PhotoBody photo={photo} alt={photo ? photoAlt(event, photo) : ""} />
          </span>
          <figcaption className="po-caption">{caption}</figcaption>
        </figure>
        <p className="po-line d3 po-hero-line">لقطة واحدة… وحكاية كاملة</p>
        <p className="po-line d4 po-hero-copy">يشرفنا تشاركونا ليلة خطوبتنا</p>
        {hosts.length > 0 && <p className="po-line d4 po-hosts">{hosts.join(" · ")}</p>}
        <p className="po-line d5 po-date">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="po-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="po-line d6 po-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {/* ───────── Three snapshots ───────── */}
      <section className="po-section">
        <p className="po-kicker po-reveal">حكايتنا</p>
        <h2 className="po-title po-reveal">في ثلاث لقطات</h2>
        <ul className="po-snaps">
          {SNAPS.map((item, index) => (
            <li key={item.title} className="po-snap po-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="po-snap-photo" aria-hidden>
                {item.icon}
              </span>
              <span className="po-snap-title">{item.title}</span>
              <span className="po-snap-body">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="po-section pt-0">
          <figure className="po-note po-reveal">
            <span className="po-tape t1" aria-hidden />
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown as a strip of film frames ───────── */}
      <section className="po-band">
        <p className="po-kicker po-reveal">العد التنازلي</p>
        <h2 className="po-title po-reveal">باقي على الخطوبة</h2>
        <Countdown prefix="po" target={target} todayText="النهارده الخطوبة" />
      </section>

      {/* ───────── Programme ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="po-section">
          <p className="po-kicker po-reveal">البرنامج</p>
          <h2 className="po-title po-reveal">تفاصيل السهرة</h2>
          <ol className="po-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="po-step po-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="po-step-corner" aria-hidden />
                <span className="po-step-time">{formatTime(item.time)}</span>
                <span className="po-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="po-section">
        <div className="po-venue po-reveal">
          <span className="po-tape t1" aria-hidden />
          <span className="po-tape t2" aria-hidden />
          <p className="po-kicker">المكان</p>
          <h2 className="po-title">{event.details.venueName}</h2>
          {event.details.address && <p className="po-muted mt-1">{event.details.address}</p>}
          <p className="po-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="po" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection
          prefix="po"
          eyebrow="تأكيد الحضور"
          title="هتشاركونا لقطتنا؟"
          hint="قولولنا قبل الميعاد عشان نجهّز لكم مكانكم"
        >
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="po" eyebrow="كلمة حلوة" title="اكتبولنا تهنئة">
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="po"
          eyebrow="النقطة"
          title="نقطة الخطوبة"
          hint="نقطتك بتوصل للعروسين مع اسمك وتهنئتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="po-closing">
        <p className="po-dua po-reveal">
          اللهم بارك لهما، وبارك عليهما،
          <br />
          واجمع بينهما في خير
        </p>
        <p className="po-closing-names po-reveal">{caption}</p>
      </section>

      <StoryFooter prefix="po" />
    </div>
  );
}

function PhotoBody({ photo, alt, developing = false }: { photo: string | null; alt: string; developing?: boolean }) {
  if (!photo) {
    return (
      <span className="po-empty" aria-hidden>
        <svg viewBox="0 0 120 80" width="120" height="80">
          <circle cx="46" cy="42" r="26" fill="none" stroke="#c9826c" strokeWidth="5" />
          <circle cx="76" cy="42" r="26" fill="none" stroke="#c9826c" strokeWidth="5" />
        </svg>
      </span>
    );
  }
  const className = developing ? "po-img is-developing" : "po-img";
  return photo.startsWith("data:") ? (
    // Uploaded photos live in this browser as data URLs, not remote images.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={photo} alt={alt} className={className} />
  ) : (
    <Image src={photo} alt={alt} width={800} height={800} className={className} />
  );
}

const SNAPS = [
  {
    title: "أول لقاء",
    body: "صدفة حلوة غيّرت كل حاجة",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 27 C6 20 4 14 4 11 a6 6 0 0 1 12 -1 a6 6 0 0 1 12 1 c0 3 -2 9 -12 16z" />
      </svg>
    ),
  },
  {
    title: "قراءة الفاتحة",
    body: "بدعاء أهلنا بدأ الطريق",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 7 C10 5 14 6 16 9 C18 6 22 5 27 7 V24 C22 22 18 23 16 26 C14 23 10 22 5 24 Z M16 9 V26" />
      </svg>
    ),
  },
  {
    title: "لبس الدبل",
    body: "ووعد جديد بنكتبه سوا",
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="19" r="8" />
        <circle cx="20" cy="19" r="8" />
        <path d="M20 4 l3 3 -3 4 -3 -4z" />
      </svg>
    ),
  },
] as const;
