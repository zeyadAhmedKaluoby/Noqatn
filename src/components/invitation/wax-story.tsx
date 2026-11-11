"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GiftForm, RsvpForm } from "@/components/invitation/forms";
import { formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

type Phase = "closed" | "opening" | "open";

export function WaxStory({ event, onOpen, guestTo }: { event: InvitationEvent; onOpen: () => void; guestTo?: string }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [first, second] = event.details.honoreeNames;
  const groom = second ?? first;
  const bride = second ? first : "";

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
    window.setTimeout(() => setPhase("open"), 1500);
  }

  return (
    <div className="bg-[#f8efec] text-[#7e4f4c]">
      <button
          type="button"
          onClick={open}
          aria-hidden={phase === "open"}
          tabIndex={phase === "open" ? -1 : 0}
          className={`wax-cover ${phase !== "closed" ? "is-go" : ""} ${phase === "open" ? "is-gone" : ""}`}
        >
          <span className="pointer-events-none absolute -top-16 end-[-3rem] h-52 w-52 rounded-full bg-[#f6e8e4]/80 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-10 start-[-3rem] h-52 w-52 rounded-full bg-[#f6e8e4]/70 blur-3xl" />
          <Star className="wax-fade absolute end-[16%] top-[13%] text-[#c2a267]" />
          <Star className="wax-fade absolute start-[14%] bottom-[17%] text-[#c2a267] opacity-70" />
          <p className="wax-fade text-[13px] tracking-[0.42em] text-[#a0716c]">دعوة زفاف</p>
          <p className="wax-fade mt-4 font-[family-name:var(--font-ruqaa)] text-[2.45rem] font-bold leading-none">
            {groom} & {bride}
          </p>
          <img src="/themes/wax-seal.jpg" alt="" className="wax-seal my-1 w-[min(64%,270px)] [mask-image:radial-gradient(closest-side,black_68%,transparent_92%)]" />
          <p className="wax-fade mt-1 text-sm tracking-[0.42em]">{dottedDate(event.details.date)}</p>
          <span className="wax-fade wax-tap mt-4 grid h-14 w-14 place-items-center rounded-full border border-[#c4a9a4]/80 bg-white/70">
            <HandIcon />
          </span>
          <span className="wax-fade mt-3 text-sm">اضغط لفتح الدعوة</span>
      </button>

      <section className={`flex min-h-svh flex-col items-center justify-center px-8 py-16 text-center ${phase === "open" ? "wax-on" : ""}`}>
        <p className="wax-line d1 text-lg leading-9">حكايتنا بدأت بوعد…</p>
        <p className="wax-line d2 text-lg leading-9">وكبرت بالحب والدعاء،</p>
        <p className="wax-line d3 text-lg leading-9">واليوم نكتبها معاكم.</p>
        <h1 className="wax-line d4 mt-8 font-[family-name:var(--font-ruqaa)] text-6xl leading-none">{groom}</h1>
        <p className="wax-line d4 mt-2 font-[family-name:var(--font-ruqaa)] text-3xl">&</p>
        <h1 className="wax-line d5 font-[family-name:var(--font-ruqaa)] text-6xl leading-none">{bride}</h1>
        <p className="wax-line d6 mt-6 text-lg">{formatArabicDate(event.details.date)}</p>
        <img
          src="/themes/wax-seal.jpg"
          alt=""
          className="wax-rise mt-6 w-28 [mask-image:radial-gradient(closest-side,black_60%,transparent_88%)]"
        />
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="font-[family-name:var(--font-ruqaa)] text-4xl">باقي على فرحتنا</h2>
        <Countdown target={new Date(`${event.details.date}T${event.details.startTime || "12:00"}:00`).getTime()} />
      </section>

      <section className="px-8 py-16">
        <h2 className="text-center font-[family-name:var(--font-ruqaa)] text-4xl">برنامج الحفل</h2>
        <p className="mt-3 text-center text-[#a0716c]">{formatArabicDate(event.details.date)}</p>
        <ol className="relative mx-auto mt-10 max-w-sm border-s border-[#c2a267]/80 ps-8">
          {event.details.schedule.map((item) => (
            <li key={`${item.time}-${item.label}`} className="relative pb-10">
              <span className="absolute -start-[37px] top-3 h-2.5 w-2.5 rotate-45 bg-[#c2a267]" />
              <p className="font-[family-name:var(--font-ruqaa)] text-3xl leading-none">{formatTime(item.time)}</p>
              <p className="mt-2 text-lg">{item.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-8 py-16 text-center">
        <p className="text-sm tracking-[0.3em] text-[#c2a267]">التفاصيل</p>
        <h2 className="mt-3 font-[family-name:var(--font-ruqaa)] text-4xl">مكان الحفل</h2>
        <p className="mt-4 text-2xl">{event.details.venueName}</p>
        <p className="mt-1 text-[#a0716c]">{event.details.address}</p>
        <p className="mt-3">
          {formatArabicDate(event.details.date)} · {formatTime(event.details.startTime)}
        </p>
        {event.details.googleMapsUrl && (
          <a className="mt-6 inline-flex min-h-12 items-center rounded-full border border-[#7e4f4c] px-6" href={event.details.googleMapsUrl} target="_blank" rel="noreferrer">
            الوصول للقاعة
          </a>
        )}
      </section>

      {event.settings.allowRsvp && (
        <section className="px-6 py-16">
          <p className="text-center text-sm tracking-[0.35em] text-[#c2a267]">R · S · V · P</p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-ruqaa)] text-4xl">تشرفونا؟</h2>
          <p className="mt-2 text-center text-sm text-[#a0716c]">نرجو الرد قبل يوم الفرح</p>
          <div className="mt-6">
            <RsvpForm event={event} defaultName={guestTo} />
          </div>
        </section>
      )}

      {event.settings.allowGifts && (
        <section className="px-6 py-16">
          <h2 className="text-center font-[family-name:var(--font-ruqaa)] text-4xl">النقطة</h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-[#a0716c]">
            نقطتك تصل لصاحب الدعوة مع اسمك.
          </p>
          <div className="mt-6">
            <GiftForm event={event} />
          </div>
        </section>
      )}

      <section className="px-8 py-20 text-center">
        <p className="text-sm tracking-[0.3em] text-[#c2a267]">من القلب</p>
        <h2 className="mt-3 font-[family-name:var(--font-ruqaa)] text-4xl">رسالة ودعاء</h2>
        <p className="mx-auto mt-6 max-w-sm text-lg leading-9">{event.details.wording}</p>
        <p className="mx-auto mt-8 max-w-sm font-[family-name:var(--font-ruqaa)] text-2xl leading-loose">
          بارك الله لكما، وبارك عليكما، وجمع بينكما في خير
        </p>
      </section>

      <footer className="px-6 pb-28 pt-10 text-center text-sm text-[#a0716c]">
        <Link href="/" className="font-[family-name:var(--font-ruqaa)] text-2xl text-[#7e4f4c]">
          نقطني
        </Link>
        <p className="mt-2">صُنعت هذه الدعوة على نقطني</p>
      </footer>
    </div>
  );
}

function dottedDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const format = new Intl.NumberFormat("ar-EG", { useGrouping: false });
  return `${format.format(date.getDate())} . ${format.format(date.getMonth() + 1)} . ${format.format(date.getFullYear())}`;
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className ?? ""}`} aria-hidden>
      <path d="M10 0C11 6 14 9 20 10C14 11 11 14 10 20C9 14 6 11 0 10C6 9 9 6 10 0Z" fill="currentColor" />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        fill="currentColor"
        d="M9.2 11.2V5.6a1.3 1.3 0 0 1 2.6 0v4.2h.5V4.4a1.3 1.3 0 0 1 2.6 0v5.4h.5V6.1a1.3 1.3 0 0 1 2.6 0v8.2c0 3-2.2 5.2-5.4 5.2h-.6c-2.4 0-4.2-1-5.2-2.6l-2.7-4.2a1.4 1.4 0 0 1 2.2-1.7l1.5 1.6V11.2z"
      />
    </svg>
  );
}

function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const kick = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(timer);
    };
  }, []);

  if (!now || Number.isNaN(target)) return null;
  const diff = target - now;
  if (diff <= 0) return <p className="mt-6">اليوم المنتظر</p>;

  const parts = [
    ["يوم", Math.floor(diff / 86_400_000)],
    ["ساعة", Math.floor((diff % 86_400_000) / 3_600_000)],
    ["دقيقة", Math.floor((diff % 3_600_000) / 60_000)],
    ["ثانية", Math.floor((diff % 60_000) / 1000)],
  ] as const;

  return (
    <div className="mx-auto mt-8 grid max-w-sm grid-cols-4 gap-3">
      {parts.map(([label, value]) => (
        <div key={label}>
          <p className="font-[family-name:var(--font-ruqaa)] text-4xl">{formatNumber(value)}</p>
          <p className="text-sm text-[#a0716c]">{label}</p>
        </div>
      ))}
    </div>
  );
}
