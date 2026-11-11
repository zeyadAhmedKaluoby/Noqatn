"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GiftForm, RsvpForm } from "@/components/invitation/forms";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

type Phase = "closed" | "opening" | "open";

export function BabStory({
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
    window.setTimeout(() => setPhase("open"), 1900);
  }

  return (
    <div className="bab-story">
      <button
        type="button"
        className={`bab-intro${phase !== "closed" ? " is-open" : ""}${phase === "open" ? " is-gone" : ""}`}
        onClick={open}
        aria-label="اضغط لفتح الدعوة"
        tabIndex={phase === "open" ? -1 : 0}
        aria-hidden={phase === "open"}
      >
        <div className="bab-leaf l">
          <div className="bab-paint">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bab-wr top" src="/themes/bab/wreath-top.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bab-wr bottom" src="/themes/bab/wreath-bottom.webp" alt="" />
            <i className="bab-knob" />
          </div>
        </div>
        <div className="bab-leaf r">
          <div className="bab-paint">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bab-wr top" src="/themes/bab/wreath-top.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="bab-wr bottom" src="/themes/bab/wreath-bottom.webp" alt="" />
            <i className="bab-knob" />
          </div>
        </div>
        <div className="bab-seam" />
        <div className="bab-face">
          <p className="bab-ey">دعوة زفاف</p>
          {guestTo ? <p className="bab-guest">أهلاً {guestTo}</p> : null}
          <p className="bab-mono">{mono}</p>
          <p className="bab-dt">{dottedDate(event.details.date)}</p>
          <span className="bab-tap">اضغط لفتح الدعوة</span>
        </div>
      </button>

      <div className={`bab-main${phase === "open" ? " is-on" : ""}`}>
        <section className="bab-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/themes/bab/house.webp" alt="" className="bab-house" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/themes/bab/couple.webp" alt="" className="bab-couple" />
          <p className="bab-lead">كأنها حكاية من زمنٍ جميل...</p>
          <p className="bab-lead">بابٌ يُفتح على حديقةٍ من ورد،</p>
          <p className="bab-lead">ويومٌ ننتظره بكل الحب.</p>
          <h1>
            {first} <i>&</i> {second}
          </h1>
          <p className="bab-when">{formatArabicDate(event.details.date)}</p>
          <p className="bab-muted">وبحضوركم تكتمل فرحتنا</p>
        </section>

        <section className="bab-block">
          <h2>باقي على فرحتنا</h2>
          <Countdown target={target} />
        </section>

        {event.details.schedule.length > 0 ? (
          <section className="bab-block">
            <h2>برنامج الحفل</h2>
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

        <section className="bab-block">
          <h2>مكان الحفل</h2>
          <p className="bab-venue">{event.details.venueName}</p>
          <p className="bab-muted">{event.details.address}</p>
          <div className="bab-actions">
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

        <section className="bab-block">
          <h2>رسالة من القلب</h2>
          <p className="bab-wording">{event.details.wording}</p>
        </section>

        {event.settings.allowRsvp ? (
          <section className="bab-block">
            <RsvpForm event={event} defaultName={guestTo} />
          </section>
        ) : null}

        {event.settings.allowGifts ? (
          <section className="bab-block">
            <h2>النقطة</h2>
            <p className="bab-muted">نقطتك تصل لصاحب الدعوة مع اسمك.</p>
            <GiftForm event={event} />
          </section>
        ) : null}

        <section className="bab-block bab-dua">
          <p className="bab-kicker">من القلب</p>
          <h2>رسالة ودعاء</h2>
          <blockquote>
            بارك الله لكما، وبارك عليكما،
            <br />
            وجمع بينكما في خير
          </blockquote>
          <p className="bab-amen">آمين يا رب 🤍</p>
          <p className="bab-end">{names}</p>
        </section>

        <footer className="bab-foot">
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
    <div className="bab-cd">
      {parts.map(([label, value]) => (
        <div key={label}>
          <b>{formatNumber(value)}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
