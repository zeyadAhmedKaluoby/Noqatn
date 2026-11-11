"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { RoseMotif, type RoseMotifKind } from "@/components/invitation/rose-art";
import { GiftForm } from "@/components/invitation/forms";
import { useStore } from "@/components/store";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime, uid } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

const MOTIFS: RoseMotifKind[] = ["arch", "ring", "couple", "gate", "roses", "cake"];

export function RoseStory({ event, guestTo }: { event: InvitationEvent; guestTo?: string }) {
  const [first, second] = event.details.honoreeNames;
  const names = displayNames(event.details.honoreeNames);
  const when = `${formatArabicDate(event.details.date)} · ${formatTime(event.details.startTime)}`;

  return (
    <div className="rose-sheet">
      {event.status === "DRAFT" && <p className="rose-draft">مسودة، ولم تُنشر بعد</p>}

      <section className="rose-hero">
        <HeroPaper />
        <div className="rose-intro">
          {guestTo ? <p className="rose-a rose-a2">أهلاً {guestTo}،</p> : null}
          <p className={`rose-a ${guestTo ? "rose-a3" : "rose-a2"}`}>وراء كل باب حكاية،</p>
          <p className={`rose-a ${guestTo ? "rose-a4" : "rose-a3"}`}>وحكايتنا بدأت من هنا…</p>
          <p className={`rose-a ${guestTo ? "rose-a5" : "rose-a4"}`}>افتحوا الباب وشاركونا الفرحة.</p>
        </div>
        <h1 className="rose-names rose-a rose-a5">
          <span className="rose-name">{first}</span>
          {second && <span className="rose-amp">&</span>}
          {second && <span className="rose-name">{second}</span>}
        </h1>
        <p className="rose-date rose-a rose-a6">{formatHeroDate(event.details.date)}</p>
        <RoseMotif kind="gate" className="rose-gate rose-rise" />
      </section>

      <section className="rose-sec">
        <Reveal>
          <h2 className="rose-h">باقي على فرحتنا</h2>
          <HeartRule />
          <Countdown target={new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`).getTime()} />
        </Reveal>
      </section>

      {event.details.schedule.length > 0 && (
        <section className="rose-sec">
          <Reveal>
            <h2 className="rose-h">برنامج الحفل</h2>
            <p className="rose-sub">{formatArabicDate(event.details.date)}</p>
            <HeartRule />
            <ol className="rose-zz">
              {event.details.schedule.map((item, index) => (
                <li key={`${item.time}-${item.label}-${index}`} className={`rose-zr ${index % 2 ? "is-flip" : ""}`}>
                  <div className="rose-zp">
                    <RoseMotif kind={motifFor(item.label, index)} className="h-full w-full" />
                  </div>
                  <div className="rose-zt">
                    {item.time && <b>{formatTime(item.time)}</b>}
                    <span>{item.label}</span>
                  </div>
                  <i className="rose-mk" />
                </li>
              ))}
            </ol>
            <p className="rose-end">مستنيينكم</p>
          </Reveal>
        </section>
      )}

      <section className="rose-sec">
        <Reveal>
          <h2 className="rose-h">هنستناكم هنا</h2>
          <HeartRule />
          <div className="rose-map">
            <VenueMap />
          </div>
          <p className="rose-hall">{event.details.venueName}</p>
          <p className="rose-addr">{event.details.address}</p>
          <p className="rose-when">{when}</p>
          <div className="rose-vbtns">
            <a className="rose-vb is-solid" href={event.details.googleMapsUrl || "https://maps.google.com/?q=Cairo"} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              الوصول للقاعة
            </a>
            <a className="rose-vb" href={calendarLink(event)} target="_blank" rel="noopener noreferrer">
              <CalIcon />
              أضف للتقويم
            </a>
          </div>
          <RoseMotif kind="roses" className="rose-flourish" />
        </Reveal>
      </section>

      {(event.settings.allowRsvp || event.settings.allowMessages) && (
        <section className="rose-sec">
          <Reveal>
            <Letter event={event} when={when} />
          </Reveal>
          <Reveal className="rose-final">
            <p className="rose-tag">بكل الحب</p>
            <p className="rose-nm">{names}</p>
          </Reveal>
        </section>
      )}

      {event.settings.allowGifts && (
        <section className="rose-sec">
          <Reveal>
            <h2 className="rose-h">النقطة</h2>
            <p className="rose-sub">نقطتك توصلهم باسمك</p>
            <div className="rose-gift">
              <GiftForm event={event} />
            </div>
          </Reveal>
        </section>
      )}

      <section className="rose-sec rose-dua">
        <Reveal>
          <RoseMotif kind="roses" className="rose-flourish" />
          <p className="rose-kicker">من القلب</p>
          <h2 className="rose-h">رسالة ودعاء</h2>
          <p className="rose-dm">{event.details.wording}</p>
          <div className="rose-dq">
            <span className="rose-qm" aria-hidden>
              ❝
            </span>
            <p>
              بارك الله لكما، وبارك عليكما،
              <br />
              وجمع بينكما في خير
            </p>
            <span className="rose-qs">
              اللهم اجعل بيتهما عامرًا بالمودة والرحمة،
              <br />
              واجعل أيامهما كلها فرح وسكينة
            </span>
          </div>
          <p className="rose-amen">آمين يا رب 🤍</p>
          <DuaRule />
          <p className="rose-nm">{names}</p>
        </Reveal>
      </section>

      <footer className="rose-foot">
        صُممت بحب في{" "}
        <Link href="/">نقطني</Link>
      </footer>
    </div>
  );
}

function Letter({ event, when }: { event: InvitationEvent; when: string }) {
  const { addRsvp, addMessage } = useStore();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    if (name.trim().length < 2) {
      setError("اكتب اسمك حتى نعرف مين بعت الرسالة.");
      return;
    }
    const guestName = name.trim();
    const note = message.trim();
    if (event.settings.allowRsvp) {
      addRsvp({
        id: uid("rsvp"),
        eventSlug: event.slug,
        guestName,
        status: attending ? "ATTENDING" : "NOT_ATTENDING",
        numberOfGuests: attending ? guests : 0,
        note: note || undefined,
        createdAt: new Date().toISOString(),
      });
    }
    if (event.settings.allowMessages && note.length >= 2) {
      addMessage({
        id: uid("msg"),
        eventSlug: event.slug,
        guestName,
        message: note,
        status: "VISIBLE",
        createdAt: new Date().toISOString(),
      });
    }
    setDone(true);
    setError("");
  }

  if (done) {
    const coming = !event.settings.allowRsvp || attending;
    return (
      <div className="rose-paper rose-ok">
        <div className="rose-chk" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3>{coming ? "اتسجل حضورك" : "وصلت رسالتك"}</h3>
        <p className="rose-salut">
          شكرًا يا {name.trim()}… {coming ? "فرحتنا تكمل بيك" : "وحشتكم الفرحة"}
        </p>
        <div className="rose-sum">
          <div className="r">
            <span className="ci" aria-hidden>
              <PersonIcon />
            </span>
            <div>
              <b>{name.trim()}</b>
              {coming && event.settings.allowRsvp && <small>{guestPhrase(guests)}</small>}
            </div>
          </div>
          <div className="r">
            <span className="ci" aria-hidden>
              <CalIcon />
            </span>
            <div>
              <b>{formatArabicDate(event.details.date)}</b>
              <small>{formatTime(event.details.startTime)}</small>
            </div>
          </div>
          <div className="r">
            <span className="ci" aria-hidden>
              <PinIcon />
            </span>
            <div>
              <b>{event.details.venueName}</b>
              <small>{event.details.address}</small>
            </div>
          </div>
        </div>
        <p className="sr-only">{when}</p>
      </div>
    );
  }

  return (
    <div className="rose-paper">
      <form onSubmit={submit}>
        <h3>إلى العروسين…</h3>
        <p className="rose-salut">ألف مبروك، وربنا يتمم بخير…</p>
        <textarea
          className="rose-lined"
          value={message}
          maxLength={600}
          aria-label="رسالتك للعروسين"
          onChange={(input) => setMessage(input.target.value)}
        />
        {event.settings.allowRsvp && (
          <div className="rose-radios">
            <label className="rose-opt">
              <input className="rose-radio" type="radio" name="att" checked={attending} onChange={() => setAttending(true)} />
              <span className="rose-rd" />
              جاي بإذن الله
            </label>
            <label className="rose-opt">
              <input className="rose-radio" type="radio" name="att" checked={!attending} onChange={() => setAttending(false)} />
              <span className="rose-rd" />
              مش هقدر
            </label>
          </div>
        )}
        <div className="rose-sig">
          <div>
            <label className="rose-lbl" htmlFor="rose-name">
              التوقيع
            </label>
            <input id="rose-name" className="rose-sign" value={name} maxLength={80} autoComplete="name" onChange={(input) => setName(input.target.value)} />
          </div>
          {event.settings.allowRsvp && attending && (
            <div>
              <span className="rose-lbl">العدد</span>
              <div className="rose-stp">
                <button type="button" aria-label="أنقص العدد" onClick={() => setGuests((value) => Math.max(1, value - 1))}>
                  −
                </button>
                <output>{formatNumber(guests)}</output>
                <button type="button" aria-label="زود العدد" onClick={() => setGuests((value) => Math.min(20, value + 1))}>
                  +
                </button>
              </div>
            </div>
          )}
        </div>
        {error && <p className="rose-err">{error}</p>}
        <button className="rose-send" type="submit">
          <SendIcon />
          حط رسالتك في الظرف
        </button>
      </form>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rose-rv ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </div>
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
  if (diff <= 0) return <p className="rose-sub">اليوم المنتظر</p>;

  const parts = [
    ["يوم", Math.floor(diff / 86_400_000)],
    ["ساعة", Math.floor((diff % 86_400_000) / 3_600_000)],
    ["دقيقة", Math.floor((diff % 3_600_000) / 60_000)],
    ["ثانية", Math.floor((diff % 60_000) / 1000)],
  ] as const;

  return (
    <div className="rose-cd">
      {parts.map(([label, value]) => (
        <div key={label}>
          <b>{formatNumber(value)}</b>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function HeroPaper() {
  const id = useId().replace(/:/g, "");
  const wash = `${id}wash`;
  const paper = `${id}paper`;
  const gold = `${id}gold`;
  return (
    <svg preserveAspectRatio="none" viewBox="0 0 390 844" aria-hidden className="absolute inset-0 h-full w-full">
      <defs>
        <filter id={wash} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id={paper}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="12" />
          <feColorMatrix values="0 0 0 0 .4  0 0 0 0 .35  0 0 0 0 .45  0 0 0 .05 0" />
        </filter>
        <linearGradient id={gold} x1="0" x2="1">
          <stop offset="0" stopColor="#C2A267" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C2A267" />
          <stop offset="1" stopColor="#C2A267" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="390" height="844" fill="#FBF7F4" />
      <circle cx="0" cy="10" r="110" fill="#F4DEE0" opacity="0.7" filter={`url(#${wash})`} />
      <circle cx="390" cy="560" r="120" fill="#E3ECDF" opacity="0.6" filter={`url(#${wash})`} />
      <rect width="390" height="844" filter={`url(#${paper})`} />
      <line x1="100" y1="438" x2="181" y2="438" stroke={`url(#${gold})`} />
      <line x1="209" y1="438" x2="290" y2="438" stroke={`url(#${gold})`} />
      <path
        d="M195,444 C186,437 186,430 191,429 C193,428.5 195,430 195,432 C195,430 197,428.5 199,429 C204,430 204,437 195,444 Z"
        fill="#C2A267"
      />
      <path d="M352,76 Q353.44,82.56 360,84 Q353.44,85.44 352,92 Q350.56,85.44 344,84 Q350.56,82.56 352,76 Z" fill="#C2A267" />
      <path d="M36,236 Q36.72,239.28 40,240 Q36.72,240.72 36,244 Q35.28,240.72 32,240 Q35.28,239.28 36,236 Z" fill="#C2A267" opacity="0.7" />
    </svg>
  );
}

function HeartRule() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 28" className="rose-rule" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#C2A267" stopOpacity="0" />
          <stop offset="0.5" stopColor="#C2A267" />
          <stop offset="1" stopColor="#C2A267" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="8" y1="14" x2="92" y2="14" stroke={`url(#${id})`} />
      <line x1="128" y1="14" x2="212" y2="14" stroke={`url(#${id})`} />
      <path d="M110 20 C101 13 101 6 106 5 C108 4.5 110 6 110 8 C110 6 112 4.5 114 5 C119 6 119 13 110 20 Z" fill="#C2A267" />
    </svg>
  );
}

function DuaRule() {
  return (
    <svg viewBox="0 0 220 40" className="rose-dua-rule" aria-hidden>
      <g fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M10 20h70M140 20h70" />
        <path d="M110 8c-8 6-8 18 0 24 8-6 8-18 0-24z" />
        <path d="M96 20c-6-6-14-6-18 0 4 6 12 6 18 0zM124 20c6-6 14-6 18 0-4 6-12 6-18 0z" />
      </g>
      <circle cx="110" cy="20" r="2" fill="var(--gold)" />
    </svg>
  );
}

function VenueMap() {
  return (
    <svg viewBox="0 0 310 210" preserveAspectRatio="xMidYMid slice" aria-hidden className="h-full w-full">
      <rect width="310" height="210" fill="var(--tint)" />
      <path d="M-10,150 C60,120 90,170 160,140 S260,90 330,120" fill="none" stroke="#D9E3E8" strokeWidth="18" />
      <ellipse cx="70" cy="60" rx="46" ry="28" fill="#DCE6D6" />
      <ellipse cx="250" cy="185" rx="50" ry="26" fill="#DCE6D6" />
      <g stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none">
        <path d="M0,95 H310" />
        <path d="M120,0 V210" />
        <path d="M220,0 C210,70 240,120 230,210" />
        <path d="M0,30 L120,95" />
      </g>
      <g stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M30,0 V95" />
        <path d="M160,95 V210" />
        <path d="M260,0 V95" />
        <path d="M120,170 H310" />
      </g>
      <path
        d="M60,200 C90,170 110,150 120,120 S170,100 200,78"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2.2"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <circle cx="60" cy="200" r="5" fill="var(--gold)" />
      <path d="M200,82 c-10,-12 -18,-20 -18,-30 a18,18 0 0 1 36,0 c0,10 -8,18 -18,30z" fill="var(--ink)" />
      <path d="M200,61 C196,57 192,55 192,51 a4,4 0 0 1 8,-1 a4,4 0 0 1 8,1 c0,4 -4,6 -8,10z" fill="#fff" />
    </svg>
  );
}

function motifFor(label: string, index: number): RoseMotifKind {
  if (/استقبال|ضياف/.test(label)) return "arch";
  if (/كتاب|عقد|قران|خطوب/.test(label)) return "ring";
  if (/دخول|عروس/.test(label)) return "couple";
  if (/رقص/.test(label)) return "gate";
  if (/عشاء|سفرة/.test(label)) return "roses";
  if (/تورت|كيك/.test(label)) return "cake";
  return MOTIFS[index % MOTIFS.length];
}

function formatHeroDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function guestPhrase(count: number) {
  if (count <= 1) return "ضيف واحد";
  if (count === 2) return "ضيفان";
  return `${formatNumber(count)} ضيوف`;
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m3 11 18-8-8 18-2-8z" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" />
    </svg>
  );
}
