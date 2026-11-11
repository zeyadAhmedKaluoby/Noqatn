"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GiftForm, RsvpForm } from "@/components/invitation/forms";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import type { StoryDemo } from "@/lib/story-demos";
import type { InvitationEvent } from "@/lib/types";

type Phase = "closed" | "opening" | "open";

export function SharedStory({
  event,
  guestTo,
  demo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  demo: StoryDemo;
  onOpen: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [first, second] = event.details.honoreeNames;
  const names = displayNames(event.details.honoreeNames);
  const mono = `${first?.slice(0, 1) || ""} & ${second?.slice(0, 1) || ""}`;
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();

  useEffect(() => {
    const locked = phase !== "open";
    document.documentElement.classList.toggle("is-locked", locked);
    document.body.classList.toggle("is-locked", locked);
    return () => {
      document.documentElement.classList.remove("is-locked");
      document.body.classList.remove("is-locked");
    };
  }, [phase]);

  function open() {
    if (phase !== "closed") return;
    onOpen();
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), demo.durationMs);
  }

  return (
    <div className={`shared-story tone-${demo.tone} cover-${demo.cover}`}>
      <button
        type="button"
        className={`shared-cover${phase !== "closed" ? " is-go" : ""}${phase === "open" ? " is-gone" : ""}`}
        onClick={open}
        aria-label={demo.openLabel}
        tabIndex={phase === "open" ? -1 : 0}
        aria-hidden={phase === "open"}
      >
        {demo.cover === "doors" ? (
          <>
            <span className="shared-leaf l" />
            <span className="shared-leaf r" />
            <span className="shared-seam" />
          </>
        ) : null}
        <div className="shared-face">
          <p className="shared-ey">دعوة زفاف</p>
          {guestTo ? <p className="shared-guest">أهلاً {guestTo}</p> : null}
          {demo.cover === "seal" ? <span className="shared-seal" aria-hidden /> : null}
          <p className="shared-mono">{mono}</p>
          <h1 className="shared-names">
            <span>{first}</span>
            {second ? <i>&</i> : null}
            {second ? <span>{second}</span> : null}
          </h1>
          <p className="shared-dt">{dottedDate(event.details.date)}</p>
          <span className="shared-tap">{demo.openLabel}</span>
        </div>
      </button>

      <div className={`shared-main${phase === "open" ? " is-on" : ""}`}>
        <section className="shared-hero">
          {demo.leads.map((line) => (
            <p key={line} className="shared-lead">
              {line}
            </p>
          ))}
          <h2>
            {first}
            {second ? <i> & </i> : null}
            {second}
          </h2>
          <p className="shared-when">{formatArabicDate(event.details.date)}</p>
        </section>

        <section className="shared-block">
          <h3>باقي على فرحتنا</h3>
          <Countdown target={target} />
        </section>

        {event.details.schedule.length > 0 ? (
          <section className="shared-block">
            <p className="shared-kicker">تفاصيل اليوم</p>
            <h3>برنامج الحفل</h3>
            <ul>
              {event.details.schedule.map((item) => (
                <li key={`${item.time}-${item.label}`}>
                  <span>{item.label}</span>
                  {item.time ? <time>{formatTime(item.time)}</time> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="shared-block">
          <h3>مكان الحفل</h3>
          <p className="shared-venue">{event.details.venueName}</p>
          <p className="shared-muted">{event.details.address}</p>
          <div className="shared-actions">
            {event.details.googleMapsUrl ? (
              <a href={event.details.googleMapsUrl} target="_blank" rel="noreferrer">
                الوصول للقاعة
              </a>
            ) : null}
            <a href={calendarLink(event)} target="_blank" rel="noreferrer">
              أضف للتقويم
            </a>
          </div>
        </section>

        {event.settings.allowRsvp ? (
          <section className="shared-block">
            <p className="shared-kicker">R S V P</p>
            <h3>تأكيد الحضور</h3>
            <RsvpForm event={event} defaultName={guestTo} />
          </section>
        ) : null}

        {event.settings.allowGifts ? (
          <section className="shared-block">
            <h3>النقطة</h3>
            <p className="shared-muted">نقطتك تصل لصاحب الدعوة مع اسمك.</p>
            <GiftForm event={event} />
          </section>
        ) : null}

        <section className="shared-block shared-dua">
          <p className="shared-kicker">من القلب</p>
          <h3>رسالة ودعاء</h3>
          <p className="shared-wording">{event.details.wording}</p>
          <blockquote>
            بارك الله لكما، وبارك عليكما،
            <br />
            وجمع بينكما في خير
          </blockquote>
          <p className="shared-amen">آمين يا رب</p>
          <p className="shared-end">{names}</p>
        </section>

        <footer className="shared-foot">
          صُممت بحب في <Link href="/">نقطني</Link>
        </footer>
      </div>
    </div>
  );
}

function dottedDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  const n = new Intl.NumberFormat("ar-EG", { useGrouping: false });
  return `${n.format(date.getDate())} . ${n.format(date.getMonth() + 1)} . ${n.format(date.getFullYear())}`;
}

function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const a = window.setTimeout(tick, 0);
    const b = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(a);
      window.clearInterval(b);
    };
  }, []);
  if (!now || Number.isNaN(target)) return null;
  const diff = Math.max(0, target - now);
  const parts = [
    ["يوم", Math.floor(diff / 86_400_000)],
    ["ساعة", Math.floor((diff % 86_400_000) / 3_600_000)],
    ["دقيقة", Math.floor((diff % 3_600_000) / 60_000)],
    ["ثانية", Math.floor((diff % 60_000) / 1000)],
  ] as const;
  return (
    <div className="shared-cd">
      {parts.map(([label, value]) => (
        <div key={label}>
          <b>{formatNumber(value)}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
