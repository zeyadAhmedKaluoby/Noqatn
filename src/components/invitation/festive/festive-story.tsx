"use client";

import Image from "next/image";
import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import { Beads, Icon } from "@/components/invitation/festive/festive-art";
import { FESTIVE, type FestiveKey } from "@/components/invitation/festive/festive-variants";
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
 * Shared body for the festive templates (birthday candles, confetti party, gift
 * burst, sebou festival). Each variant brings its own cover art, hero decoration,
 * palette (CSS) and Arabic copy; the structure, lifecycle and forms are common.
 */
export function FestiveStory({
  variant,
  event,
  guestTo,
  onOpen,
}: {
  variant: FestiveKey;
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
}) {
  const v = FESTIVE[variant];
  const names = event.details.honoreeNames.map((item) => item.trim()).filter(Boolean);
  const name = names.join(" و ");
  const hosts = event.details.hosts.filter(Boolean);
  const photo = resolvePhoto(event);
  const { phase, root, still, cover } = useStoryPhase({ event, prefix: "pt", openMs: v.openMs, onOpen });
  const target = new Date(`${event.details.date}T${event.details.startTime || "18:00"}:00`).getTime();

  return (
    <div ref={root} className={`pt ${v.cls} ${still ? "is-still" : ""}`}>
      {/* ───────── Cover ───────── */}
      <button {...cover(v.coverLabel)}>
        <span className="pt-sky" aria-hidden />
        <span className="pt-dawn" aria-hidden />
        <span className="pt-cover-kicker">{v.coverKicker}</span>
        <span className="pt-cover-name">{name}</span>
        <span className="pt-cover-art" aria-hidden>
          {v.Art()}
          <Beads mode={v.beads} />
        </span>
        <span className="pt-cover-date">{dottedDate(event.details.date)}</span>
        <span className="pt-cover-hint">
          <span className="pt-tap" aria-hidden>
            <HandIcon />
          </span>
          {v.coverHint}
        </span>
      </button>

      {/* ───────── Hero ───────── */}
      <section className={`pt-hero ${phase === "open" ? "pt-on" : ""}`}>
        <div className="pt-decor">{v.Decor()}</div>
        <p className="pt-line d1 pt-hero-kicker">{v.heroKicker}</p>
        <h1 className="pt-line d2 pt-name">{name}</h1>
        <p className="pt-line d3 pt-hero-line">{v.heroLine}</p>
        {hosts.length > 0 && <p className="pt-line d4 pt-hosts">{v.hostsText(hosts)}</p>}
        <p className="pt-line d5 pt-date">
          <span>{formatArabicDate(event.details.date)}</span>
          <span className="pt-date-sep" aria-hidden />
          <span>{formatTime(event.details.startTime)}</span>
        </p>
        <span className="pt-line d6 pt-scroll" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </section>

      {/* ───────── Photo sticker ───────── */}
      {photo && (
        <section className="pt-section pt-photo-section">
          <figure className="pt-sticker pt-reveal">
            <span className="pt-tape" aria-hidden />
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

      {/* ───────── Three moments ───────── */}
      <section className="pt-section">
        <p className="pt-eyebrow pt-reveal">{v.momentsEyebrow}</p>
        <h2 className="pt-title pt-reveal">{v.momentsTitle}</h2>
        <ul className="pt-moments">
          {v.moments.map((item, index) => (
            <li key={item.title} className="pt-moment pt-reveal" style={{ transitionDelay: `${index * 130}ms` }}>
              <span className="pt-moment-icon" aria-hidden>
                <Icon name={item.icon} />
              </span>
              <span className="pt-moment-title">{item.title}</span>
              <span className="pt-moment-body">{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {event.details.wording && (
        <section className="pt-section pt-note-section">
          <figure className="pt-note pt-reveal">
            <blockquote>{event.details.wording}</blockquote>
          </figure>
        </section>
      )}

      {/* ───────── Countdown ───────── */}
      <section className="pt-band">
        <p className="pt-eyebrow pt-reveal">{v.countdown.eyebrow}</p>
        <h2 className="pt-title pt-reveal">{v.countdown.title}</h2>
        <Countdown prefix="pt" target={target} todayText={v.countdown.today} />
      </section>

      {/* ───────── Programme ───────── */}
      {event.details.schedule.length > 0 && (
        <section className="pt-section">
          <p className="pt-eyebrow pt-reveal">{v.programme.eyebrow}</p>
          <h2 className="pt-title pt-reveal">{v.programme.title}</h2>
          <ol className="pt-programme">
            {event.details.schedule.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="pt-step pt-reveal" style={{ transitionDelay: `${index * 90}ms` }}>
                <span className={`pt-step-dot c${index % 4}`} aria-hidden />
                <span className="pt-step-time">{formatTime(item.time)}</span>
                <span className="pt-step-label">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───────── Venue ───────── */}
      <section className="pt-section">
        <div className="pt-venue pt-reveal">
          <p className="pt-eyebrow">المكان</p>
          <h2 className="pt-title">{event.details.venueName}</h2>
          {event.details.address && <p className="pt-muted mt-1">{event.details.address}</p>}
          <p className="pt-venue-when">
            {formatArabicDate(event.details.date)}
            <br />
            الساعة {formatTime(event.details.startTime)}
          </p>
          <VenueActions prefix="pt" event={event} mapLabel="افتح الخريطة" calendarLabel="أضف للتقويم" />
        </div>
      </section>

      {event.settings.allowRsvp && (
        <FormSection prefix="pt" eyebrowClass="eyebrow" eyebrow={v.rsvp.eyebrow} title={v.rsvp.title} hint={v.rsvp.hint}>
          <RsvpForm event={event} defaultName={guestTo} />
        </FormSection>
      )}

      {event.settings.allowMessages && (
        <FormSection prefix="pt" eyebrowClass="eyebrow" eyebrow={v.message.eyebrow} title={v.message.title(name)}>
          <MessageForm event={event} />
        </FormSection>
      )}

      {event.settings.allowGifts && (
        <FormSection
          prefix="pt"
          eyebrowClass="eyebrow"
          eyebrow={v.gift.eyebrow}
          title={v.gift.title}
          hint={v.gift.hint}
          hintClassName="mx-auto mt-2 max-w-xs text-center leading-7"
        >
          <GiftForm event={event} />
        </FormSection>
      )}

      {/* ───────── Closing ───────── */}
      <section className="pt-closing">
        <span className="pt-closing-mark pt-reveal" aria-hidden>
          <Icon name={v.moments[0].icon} />
        </span>
        <p className="pt-closing-line pt-reveal">{v.closing.line}</p>
        <p className="pt-closing-sub pt-reveal">{v.closing.sub(name)}</p>
      </section>

      <StoryFooter prefix="pt" />
    </div>
  );
}
