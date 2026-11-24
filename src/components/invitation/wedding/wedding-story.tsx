"use client";

import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import Image from "next/image";
import { DancingCouple } from "@/components/invitation/poster";
import {
  BowKnot,
  GardenFrame,
  ORNAMENTS,
  Petals,
  RoyalFrame,
  SealFace,
  Wash,
} from "@/components/invitation/wedding/wedding-art";
import {
  namesInside,
  WEDDING,
  type WeddingKey,
  type WeddingVariant,
} from "@/components/invitation/wedding/wedding-variants";
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

/**
 * Shared body for the wedding family. Each variant chooses a cover mechanism
 * (doors, an envelope, a frame that draws itself, a folded letter, or a stage
 * spotlight), its art, palette, ornament
 * and a few lines of copy. The story underneath is common and elegant.
 */
export function WeddingStory({
  variant,
  event,
  guestTo,
  onOpen,
}: {
  variant: WeddingKey;
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const v = WEDDING[variant];
  const [first, second] = event.details.honoreeNames.map((name) => name.trim()).filter(Boolean);
  const hosts = event.details.hosts.filter(Boolean);
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "wd", openMs: v.openMs, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();
  const parts = dateParts(event.details.date);
  const inside = namesInside(v);
  const photo = resolvePhoto(event);

  return (
    <div ref={root} className={`wd ${v.cls} ${v.dark ? "story-dark" : ""} ${still ? "is-still" : ""}`}>
      {/* ───────── Cover ───────── */}
      <button {...cover(v.coverLabel)}>
        <span className="wd-sky" aria-hidden />
        <span className="wd-dawn" aria-hidden />
        {!inside && (
          <>
            <span className="wd-cover-kicker">{v.coverKicker}</span>
            <span className="wd-cover-names">
              {first}
              {second && (
                <>
                  <span className="wd-amp">&</span>
                  {second}
                </>
              )}
            </span>
          </>
        )}
        <CoverObject v={v} first={first} second={second} date={dottedDate(event.details.date)} />
        {!inside && <span className="wd-cover-date">{dottedDate(event.details.date)}</span>}
        <span className="wd-cover-hint">
          <span className="wd-tap" aria-hidden>
            <HandIcon />
          </span>
          {v.coverHint}
        </span>
      </button>

      {/* ───────── Hero ───────── */}
      <section className={`wd-hero ${phase === "open" ? "wd-on" : ""}`}>
        <div className="wd-line d0 wd-ornament">{ORNAMENTS[v.ornament]()}</div>
        {v.verse && <p className="wd-line d1 wd-verse">{v.verse}</p>}
        <p className="wd-line d2 wd-lead">{v.heroLead}</p>
        {hosts.length > 0 && (
          <p className="wd-line d2 wd-hosts">
            يتشرف {hosts.join(" و ")}
            <br />
            بدعوتكم لحضور حفل زفاف
          </p>
        )}
        <h1 className="wd-names">
          <span className="wd-line d3 block">{first}</span>
          {second && (
            <>
              <span className="wd-line d4 wd-names-amp block">&</span>
              <span className="wd-line d5 block">{second}</span>
            </>
          )}
        </h1>
        <div className="wd-line d6 wd-trio">
          <span>{parts.weekday}</span>
          <span className="wd-trio-day">{parts.day}</span>
          <span>{parts.monthYear}</span>
        </div>
        <p className="wd-line d6 wd-time">الساعة {formatTime(event.details.startTime)}</p>
        <span className="wd-line d7 wd-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {event.details.wording && (
        <section className="wd-section">
          <figure className="wd-note wd-reveal">
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown ───────── */}
      <section className="wd-band">
        <p className="wd-kicker wd-reveal">على الميعاد</p>
        <h2 className="wd-title wd-reveal">{v.countdownTitle}</h2>
        <Countdown prefix="wd" target={target} todayText="الليلة ليلة الفرح" />
      </section>

      {/* ───────── Programme ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="wd-section">
          <p className="wd-kicker wd-reveal">البرنامج</p>
          <h2 className="wd-title wd-reveal">برنامج الليلة</h2>
          <ol className="wd-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="wd-step wd-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className="wd-step-node" aria-hidden />
                <span className="wd-step-time">{formatTime(item.time)}</span>
                <span className="wd-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="wd-section">
        <div className="wd-venue wd-reveal">
          <p className="wd-kicker">مكان الفرح</p>
          <h2 className="wd-title">{event.details.venueName}</h2>
          {event.details.address && <p className="wd-muted mt-1">{event.details.address}</p>}
          <p className="wd-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="wd" event={event} mapLabel="الوصول للقاعة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {photo && (
        <section className="wd-section wd-photo-wrap">
          <figure className="wd-photo wd-reveal">
            {photo.startsWith("data:") ? (
              // Uploaded photos are stored in this browser, so they are not a remote image URL.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={photoAlt(event, photo)} />
            ) : (
              <Image src={photo} alt={photoAlt(event, photo)} width={900} height={1125} />
            )}
          </figure>
        </section>
      )}

      {event.settings.allowRsvp && (
        <FormSection prefix="wd" eyebrow="تأكيد الحضور" title="تشرفونا؟" hint="نرجو الرد قبل يوم الفرح، عشان نجهّز لكم مكانكم">
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="wd" eyebrow="من القلب" title="دعوة حلوة للعروسين">
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="wd"
          eyebrow="النقطة"
          title="نقطة العروسين"
          hint="نقطتك بتوصل للعروسين مع اسمك ودعوتك."
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="wd-closing">
        <div className="wd-reveal wd-ornament">{ORNAMENTS[v.ornament]()}</div>
        <p className="wd-dua wd-reveal">
          بارك الله لكما، وبارك عليكما،
          <br />
          وجمع بينكما في خير
        </p>
        <p className="wd-closing-names wd-reveal">
          {first}
          {second && (
            <>
              <span className="wd-amp mx-2">&</span>
              {second}
            </>
          )}
        </p>
      </section>

      <StoryFooter prefix="wd" />
    </div>
  );
}

function CoverObject({ v, first, second, date }: { v: WeddingVariant; first?: string; second?: string; date: string }) {
  const names = (
    <>
      {first}
      {second && (
        <>
          <span className="wd-amp">&</span>
          {second}
        </>
      )}
    </>
  );

  if (v.mechanism === "frame") {
    return (
      <span className="wd-frame" aria-hidden>
        <span className="wd-frame-art">{v.frame === "royal" ? <RoyalFrame /> : <GardenFrame />}</span>
        <span className="wd-frame-shine" />
        <span className="wd-in-kicker">{v.coverKicker}</span>
        <span className="wd-in-names">{names}</span>
        <span className="wd-in-date">{date}</span>
      </span>
    );
  }

  if (v.mechanism === "letter") {
    const initials = [first, second].filter(Boolean).map((name) => name!.charAt(0));
    return (
      <span className="wd-letter-wrap" aria-hidden>
        <span className="wd-letter">
          <span className="wd-lt-base">
            <span className="wd-lt-line">{v.letterLines[0]}</span>
            <span className="wd-lt-line">{v.letterLines[1]}</span>
            <span className="wd-lt-date">{date}</span>
          </span>
          <span className="wd-lt-flap">
            <span className="wd-lt-face inner">
              <span className="wd-lt-orn">{ORNAMENTS[v.ornament]()}</span>
              <span className="wd-in-names">{names}</span>
            </span>
            <span className="wd-lt-face outer">
              <span className="wd-in-kicker">{v.coverKicker}</span>
              <span className="wd-in-names">{names}</span>
              <span className="wd-in-date">{date}</span>
            </span>
          </span>
          {v.tie === "bow" ? (
            <span className="wd-tie is-bow">
              <span className="wd-ribbon l" />
              <span className="wd-ribbon r" />
              <span className="wd-bow">
                <BowKnot />
              </span>
            </span>
          ) : (
            <span className="wd-tie is-band">
              <span className="wd-band-seal">{initials.join(" · ")}</span>
            </span>
          )}
        </span>
      </span>
    );
  }

  if (v.mechanism === "spotlight") {
    return (
      <span className="wd-stage" aria-hidden>
        <span className="wd-beam" />
        <span className="wd-poster">
          <span className="wd-in-kicker">{v.coverKicker}</span>
          <span className="wd-in-names">{names}</span>
          <span className="wd-poster-art">
            <DancingCouple className="wd-couple" />
          </span>
          <span className="wd-in-date">{date}</span>
        </span>
      </span>
    );
  }

  if (v.mechanism === "doors") {
    return (
      <span className={`wd-portal is-${v.portal}`} aria-hidden>
        <span className="wd-scene">{v.Scene()}</span>
        <span className="wd-leaf l">{v.Leaf()}</span>
        <span className="wd-leaf r">{v.Leaf()}</span>
        {v.portal === "window" && <span className="wd-sill" />}
      </span>
    );
  }
  return (
    <span className="wd-env-wrap" aria-hidden>
      {v.extra === "wash" && <Wash />}
      {v.extra === "petals" && <Petals />}
      <span className="wd-env">
        <span className="wd-env-back" />
        <span className="wd-flap back" />
        <span className="wd-env-card">
          <span className="wd-env-names">
            {first}
            {second && (
              <>
                <span className="wd-amp">&</span>
                {second}
              </>
            )}
          </span>
          <span className="wd-env-date">{date}</span>
        </span>
        <span className="wd-env-front" />
        <span className="wd-flap front" />
        <span className="wd-seal">
          <span className="wd-seal-half l" />
          <span className="wd-seal-half r" />
          <span className="wd-seal-face">
            <SealFace kind={v.seal} />
          </span>
        </span>
      </span>
    </span>
  );
}

function dateParts(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return { weekday: "", day: isoDate, monthYear: "" };
  return {
    weekday: new Intl.DateTimeFormat("ar-EG", { weekday: "long" }).format(date),
    day: new Intl.DateTimeFormat("ar-EG", { day: "numeric" }).format(date),
    monthYear: new Intl.DateTimeFormat("ar-EG", { month: "long", year: "numeric" }).format(date),
  };
}
