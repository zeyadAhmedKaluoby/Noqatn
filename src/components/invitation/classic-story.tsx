"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GiftForm, RsvpForm } from "@/components/invitation/forms";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

type Phase = "video" | "open";

export function ClassicStory({
  event,
  guestTo,
  onOpen,
}: {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("video");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [first, second] = event.details.honoreeNames;
  const names = displayNames(event.details.honoreeNames);
  const target = new Date(`${event.details.date}T${event.details.startTime || "18:00"}:00`).getTime();

  useEffect(() => {
    const locked = phase === "video";
    document.documentElement.classList.toggle("is-locked", locked);
    document.body.classList.toggle("is-locked", locked);
    return () => {
      document.documentElement.classList.remove("is-locked");
      document.body.classList.remove("is-locked");
    };
  }, [phase]);

  function start() {
    if (phase !== "video") return;
    const video = videoRef.current;
    onOpen();
    if (video) {
      void video.play().catch(() => finishVideo());
      video.onended = finishVideo;
      return;
    }
    finishVideo();
  }

  function finishVideo() {
    setPhase("open");
  }

  return (
    <div className="classic-story">
      {phase === "video" && (
        <button type="button" className="classic-video" onClick={start} aria-label="اضغط للبدء">
          <video ref={videoRef} playsInline muted preload="auto" poster="/themes/classic/hero.jpg">
            <source src="/themes/classic/stamp.mp4" type="video/mp4" />
          </video>
          <span className="classic-tap">
            <span className="classic-wave" />
            <span className="classic-wave delay" />
            اضغط للبدء
          </span>
        </button>
      )}

      <div className={`classic-main${phase === "open" ? " is-on" : ""}`}>
        <section className="classic-hero" style={{ backgroundImage: "url(/themes/classic/hero.jpg)" }}>
          {guestTo ? <p className="classic-guest">أهلاً {guestTo}</p> : null}
          <div className="classic-tagline">
            <p>بين الحلم والواقع ولدت حكايتنا...</p>
            <p>وها هي اليوم تصل إلى أجمل فصولها،</p>
            <p>يوم فرحتنا.</p>
          </div>
          <div className="classic-names">
            <span>{first}</span>
            <i>&</i>
            <span>{second ?? ""}</span>
          </div>
          <p className="classic-date">{formatArabicDate(event.details.date)}</p>
          <div className="classic-heart-rule" aria-hidden>
            <span />
            <b>♥</b>
            <span />
          </div>
        </section>

        <section className="classic-quote">
          <p className="classic-basmala">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</p>
          <p className="classic-ayah">
            ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً
            وَرَحْمَةً﴾
          </p>
          <p className="classic-ayah-src">— سورة الروم:٢١</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/themes/classic/birds.png" alt="" className="classic-birds" />
          <p className="classic-msg">بكل حب وفرح، يتشرف</p>
          <div className="classic-parents">
            <span>
              {first}
              <br />
              وعائلته
            </span>
            <span className="classic-sep">♥</span>
            <span>
              {second ?? ""}
              <br />
              وعائلتها
            </span>
          </div>
          <p className="classic-msg">بدعوتكم لمشاركتهما في حفل زفافهما، ويسعدهما حضوركم هذه المناسبة</p>
          <p className="classic-close">ننتظركم بكل حب.</p>
        </section>

        <section className="classic-block">
          <h2>تفاصيل الحفل</h2>
          <div className="classic-heart-rule" aria-hidden>
            <span />
            <b>♥</b>
            <span />
          </div>
          <p className="classic-big">{formatArabicDate(event.details.date)}</p>
          <p>{formatTime(event.details.startTime)}</p>
          <p className="classic-venue">{event.details.venueName}</p>
          <p className="classic-muted">{event.details.address}</p>
          {event.details.googleMapsUrl ? (
            <a className="classic-btn" href={event.details.googleMapsUrl} target="_blank" rel="noreferrer">
              خريطة الموقع
            </a>
          ) : null}
        </section>

        <section className="classic-block">
          <h2>العد التنازلي</h2>
          <p className="classic-muted">حتى نلتقي في يومنا المميز</p>
          <Countdown target={target} />
        </section>

        {event.details.schedule.length > 0 ? (
          <section className="classic-block">
            <h2>برنامج الحفل</h2>
            <ul className="classic-prog">
              {event.details.schedule.map((item) => (
                <li key={`${item.time}-${item.label}`}>
                  <span>{item.label}</span>
                  {item.time ? <time>{formatTime(item.time)}</time> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {event.settings.allowRsvp ? (
          <section className="classic-block">
            <h2>شاركونا بداية رحلتنا</h2>
            <p className="classic-muted">نسعد بحضوركم ومشاركتكم فرحتنا</p>
            <div className="classic-form">
              <RsvpForm event={event} defaultName={guestTo} />
            </div>
          </section>
        ) : null}

        {event.settings.allowGifts ? (
          <section className="classic-block">
            <h2>النقطة</h2>
            <p className="classic-muted">نقطتك تصل لصاحب الدعوة مع اسمك.</p>
            <div className="classic-form">
              <GiftForm event={event} />
            </div>
          </section>
        ) : null}

        <section className="classic-block classic-dua">
          <p className="classic-kicker">من القلب</p>
          <h2>رسالة ودعاء</h2>
          <p className="classic-wording">{event.details.wording}</p>
          <blockquote>
            بارك الله لكما، وبارك عليكما،
            <br />
            وجمع بينكما في خير
          </blockquote>
          <p className="classic-amen">آمين يا رب 🤍</p>
          <p className="classic-end-names">{names}</p>
        </section>

        <footer className="classic-foot">
          تم بواسطة <Link href="/">نقطني</Link>
          <p>دي دعوة ديمو. الأسامي والتاريخ والمكان للعرض بس.</p>
        </footer>
      </div>
    </div>
  );
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
  if (diff <= 0) return <p className="classic-today">النهارده يوم فرحنا 🤍</p>;
  const parts = [
    ["يوم", Math.floor(diff / 86_400_000)],
    ["ساعة", Math.floor((diff % 86_400_000) / 3_600_000)],
    ["دقيقة", Math.floor((diff % 3_600_000) / 60_000)],
    ["ثانية", Math.floor((diff % 60_000) / 1000)],
  ] as const;
  return (
    <div className="classic-cd">
      {parts.map(([label, value]) => (
        <div key={label}>
          <b>{formatNumber(value)}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
