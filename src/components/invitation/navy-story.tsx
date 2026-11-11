"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GiftForm, RsvpForm } from "@/components/invitation/forms";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

type Phase = "closed" | "opening" | "open";

export function NavyStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [first, second] = event.details.honoreeNames;
  const names = displayNames(event.details.honoreeNames);
  const target = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime();
  const dotted = dottedDate(event.details.date);

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
    window.setTimeout(() => setPhase("open"), 1200);
  }

  return (
    <div className="navy-story">
      <button
        type="button"
        className={`navy-intro${phase !== "closed" ? " is-go" : ""}${phase === "open" ? " is-gone" : ""}`}
        onClick={open}
        aria-hidden={phase === "open"}
        tabIndex={phase === "open" ? -1 : 0}
        aria-label="اضغط لفتح الدعوة"
      >
        <div className="navy-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/themes/navy/castle-gate.webp" alt="" className="navy-gate" />
          <p className="navy-ey">دعوة زفاف</p>
          {guestTo ? <p className="navy-guest">إلى {guestTo}</p> : null}
          <p className="navy-mono">
            {first?.slice(0, 1)} <i>&</i> {second?.slice(0, 1) || ""}
          </p>
          <h1 className="navy-names">
            <span>{first}</span>
            <i>&</i>
            <span>{second}</span>
          </h1>
          <p className="navy-dt">{dotted}</p>
          <span className="navy-tap">اضغط لفتح الدعوة</span>
        </div>
      </button>

      <div className={`navy-main${phase === "open" ? " is-on" : ""}`}>
        <section className="navy-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/themes/navy/castle-small.webp" alt="" className="navy-castle" />
          <p className="navy-lead">كأنها حكاية من زمن الأمراء…</p>
          <p className="navy-lead">بوابة بتتفتح على يوم عمرنا،</p>
          <p className="navy-lead">ومستنيينكم تعدوها معانا.</p>
          <h2>
            {first}
            <i>&</i>
            {second}
          </h2>
          <p className="navy-when">{formatArabicDate(event.details.date)}</p>
        </section>

        <section className="navy-block">
          <h3>باقي على فرحتنا</h3>
          <Countdown target={target} />
        </section>

        {event.details.schedule.length > 0 ? (
          <section className="navy-block">
            <p className="navy-kicker">تفاصيل اليوم</p>
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

        <section className="navy-block">
          <h3>مكان الحفل</h3>
          <p className="navy-venue">{event.details.venueName}</p>
          <p className="navy-muted">{event.details.address}</p>
          <div className="navy-actions">
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
          <section className="navy-block">
            <p className="navy-kicker">R S V P</p>
            <h3>تأكيد الحضور</h3>
            <p className="navy-muted">وجودكم معانا أحلى هدية</p>
            <RsvpForm event={event} defaultName={guestTo} />
          </section>
        ) : null}

        {event.settings.allowGifts ? (
          <section className="navy-block">
            <h3>النقطة</h3>
            <p className="navy-muted">نقطتك تصل لصاحب الدعوة مع اسمك.</p>
            <GiftForm event={event} />
          </section>
        ) : null}

        <section className="navy-block navy-dua">
          <p className="navy-kicker">من القلب</p>
          <h3>رسالة ودعاء</h3>
          <p className="navy-wording">{event.details.wording}</p>
          <blockquote>
            بارك الله لكما، وبارك عليكما،
            <br />
            وجمع بينكما في خير
          </blockquote>
          <p className="navy-amen">آمين يا رب 🤍</p>
          <p className="navy-end">{names}</p>
        </section>

        <footer className="navy-foot">
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
    <div className="navy-cd">
      {parts.map(([label, value]) => (
        <div key={label}>
          <b>{formatNumber(value)}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
