"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/site";
import { Confetti, Petals, Sparkles } from "@/components/invitation/decor";
import { GiftForm, MessageForm, RsvpForm } from "@/components/invitation/forms";
import type { InviteLang } from "@/components/invitation/hooks/useInviteKit";
import { GuestRibbon, InviteLangButton, inviteCopy } from "@/components/invitation/invite-kit";
import { InvitePhoto } from "@/components/invitation/photo";
import { PosterMasthead } from "@/components/invitation/poster";
import { invitationTemplates } from "@/components/invitation/openings";
import { BabStory } from "@/components/invitation/bab-story";
import { ClassicStory } from "@/components/invitation/classic-story";
import { NavyStory } from "@/components/invitation/navy-story";
import { RoseStory } from "@/components/invitation/rose-story";
import { SharedStory } from "@/components/invitation/shared-story";
import { WaxStory } from "@/components/invitation/wax-story";
import { getStoryDemo, STORY_DEMO_KEYS } from "@/lib/story-demos";
import "@/components/invitation/ma3zoom-stories.css";
import "@/components/invitation/shared-story.css";
import { calendarLink, displayNames, formatArabicDate, formatNumber, formatTime } from "@/lib/format";
import { startSong } from "@/lib/music";
import { getSong } from "@/lib/songs";
import { EVENT_TYPES, themeVars, type TemplateDef } from "@/lib/templates";
import type { InvitationEvent } from "@/lib/types";

type Phase = "closed" | "opening" | "open";

export function InvitationView({
  event,
  template,
  guestTo,
  lang,
  onToggleLang,
}: {
  event: InvitationEvent;
  template: TemplateDef;
  guestTo?: string;
  lang: InviteLang;
  onToggleLang: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [storyOpen, setStoryOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const music = useRef<ReturnType<typeof startSong> | null>(null);
  const timer = useRef<number | null>(null);
  const Opening = invitationTemplates[template.key];
  const t = inviteCopy[lang];

  useEffect(() => {
    music.current?.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    const onHide = () => {
      music.current?.setHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      music.current?.stop();
    };
  }, []);

  function finish() {
    if (timer.current) window.clearTimeout(timer.current);
    setPhase("open");
  }

  function startMusic() {
    if (music.current || !event.design.music) return;
    try {
      const handle = startSong(getSong(event.design.song, event.type).src);
      handle.setMuted(muted);
      music.current = handle;
      void handle.ready.catch(() => setAudioFailed(true));
    } catch {
      setAudioFailed(true);
    }
  }

  function openInvite() {
    if (phase !== "closed") return;
    startMusic();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const quick = reduce || event.design.animationLevel === "NONE";
    setPhase("opening");
    timer.current = window.setTimeout(finish, quick ? 180 : 1400);
  }

  const showDecor = phase !== "closed" && event.design.animationLevel !== "NONE" && template.decoration !== "none";

  if (template.key === "rose-gate") {
    return (
      <div className="min-h-svh md:px-4 md:py-6" style={{ background: template.colors.stage }}>
        <InviteLangButton lang={lang} onToggle={onToggleLang} />
        <article
          className="invitation rose-story mx-auto w-full max-w-[480px] overflow-x-clip bg-[#fbf7f4] md:min-h-[calc(100svh-3rem)] md:rounded-[2rem] md:shadow-[0_30px_80px_rgba(80,40,40,0.12)]"
          style={themeVars(template)}
          onPointerDown={startMusic}
        >
          <GuestRibbon name={guestTo} lang={lang} />
          <RoseStory event={event} guestTo={guestTo} />
        </article>
        {event.design.music && !audioFailed && (
          <button type="button" className="audio-fab" aria-pressed={muted} onClick={() => setMuted((value) => !value)}>
            {muted ? t.unmute : t.mute}
            <span className="font-normal"> · {getSong(event.design.song, event.type).title}</span>
          </button>
        )}
      </div>
    );
  }

  if (template.key === "wax-roses") {
    return (
      <div className="min-h-svh" style={{ background: template.colors.stage }}>
        <InviteLangButton lang={lang} onToggle={onToggleLang} />
        <article className="invitation mx-auto w-full max-w-[480px] overflow-visible bg-[#f8efec]" style={themeVars(template)}>
          <GuestRibbon name={guestTo} lang={lang} />
          <WaxStory
            event={event}
            guestTo={guestTo}
            onOpen={() => {
              startMusic();
              window.setTimeout(() => setStoryOpen(true), 1500);
            }}
          />
        </article>
        {storyOpen && <StoryCta muted={muted} audioFailed={audioFailed} music={event.design.music} unmute={t.unmute} mute={t.mute} onMute={() => setMuted((value) => !value)} />}
      </div>
    );
  }

  if (template.key === "classic-wax") {
    return (
      <div className="min-h-svh" style={{ background: template.colors.stage }}>
        <InviteLangButton lang={lang} onToggle={onToggleLang} />
        <article className="invitation mx-auto w-full max-w-[480px] overflow-x-clip bg-[#f7f1e8]" style={themeVars(template)}>
          <GuestRibbon name={guestTo} lang={lang} />
          <ClassicStory
            event={event}
            guestTo={guestTo}
            onOpen={() => {
              startMusic();
              window.setTimeout(() => setStoryOpen(true), 900);
            }}
          />
        </article>
        {storyOpen && <StoryCta muted={muted} audioFailed={audioFailed} music={event.design.music} unmute={t.unmute} mute={t.mute} onMute={() => setMuted((value) => !value)} />}
      </div>
    );
  }

  if (template.key === "navy-castle") {
    return (
      <div className="min-h-svh" style={{ background: template.colors.stage }}>
        <InviteLangButton lang={lang} onToggle={onToggleLang} />
        <article className="invitation mx-auto w-full max-w-[480px] overflow-x-clip bg-[#f4efe6]" style={themeVars(template)}>
          <GuestRibbon name={guestTo} lang={lang} />
          <NavyStory
            event={event}
            guestTo={guestTo}
            onOpen={() => {
              startMusic();
              window.setTimeout(() => setStoryOpen(true), 1100);
            }}
          />
        </article>
        {storyOpen && <StoryCta muted={muted} audioFailed={audioFailed} music={event.design.music} unmute={t.unmute} mute={t.mute} onMute={() => setMuted((value) => !value)} />}
      </div>
    );
  }

  if (template.key === "bab-doors") {
    return (
      <div className="min-h-svh" style={{ background: template.colors.stage }}>
        <InviteLangButton lang={lang} onToggle={onToggleLang} />
        <article className="invitation mx-auto w-full max-w-[480px] overflow-x-clip bg-[#f7f3ec]" style={themeVars(template)}>
          <GuestRibbon name={guestTo} lang={lang} />
          <BabStory
            event={event}
            guestTo={guestTo}
            onOpen={() => {
              startMusic();
              window.setTimeout(() => setStoryOpen(true), 1700);
            }}
          />
        </article>
        {storyOpen && <StoryCta muted={muted} audioFailed={audioFailed} music={event.design.music} unmute={t.unmute} mute={t.mute} onMute={() => setMuted((value) => !value)} />}
      </div>
    );
  }

  if (STORY_DEMO_KEYS.has(template.key)) {
    const demo = getStoryDemo(template.key);
    if (demo) {
      return (
        <div className="min-h-svh" style={{ background: template.colors.stage }}>
          <InviteLangButton lang={lang} onToggle={onToggleLang} />
          <article
            className="invitation mx-auto w-full max-w-[480px] overflow-x-clip"
            style={{ ...themeVars(template), background: template.colors.bg }}
          >
            <GuestRibbon name={guestTo} lang={lang} />
            <SharedStory
              event={event}
              guestTo={guestTo}
              demo={demo}
              onOpen={() => {
                startMusic();
                window.setTimeout(() => setStoryOpen(true), demo.durationMs);
              }}
            />
          </article>
          {storyOpen && <StoryCta muted={muted} audioFailed={audioFailed} music={event.design.music} unmute={t.unmute} mute={t.mute} onMute={() => setMuted((value) => !value)} />}
        </div>
      );
    }
  }

  return (
    <div className="min-h-svh md:px-4 md:py-6" style={{ background: template.colors.stage }}>
      <InviteLangButton lang={lang} onToggle={onToggleLang} />
      <article
        className={`invitation phase-${phase} mx-auto w-full max-w-[480px] overflow-hidden md:min-h-[calc(100svh-3rem)] md:rounded-[2rem] md:shadow-[0_30px_80px_rgba(40,24,8,0.18)] ${template.decoration === "confetti" ? "is-party" : ""} ${template.key === "poster-dance" ? "is-poster" : ""}`}
        style={themeVars(template)}
      >
        <p className="absolute inset-x-0 top-3 z-20 flex items-center justify-center gap-2 text-xs tracking-[0.22em] text-[var(--muted)]">
          <LogoMark size={22} />
          نقطني
        </p>
        {showDecor && template.decoration === "petals" && <Petals color={template.colors.petal} />}
        {showDecor && template.decoration === "sparkles" && <Sparkles />}
        {showDecor && template.decoration === "confetti" && (
          <Confetti colors={[template.colors.gold, template.colors.accent, template.colors.petal, template.colors.button]} />
        )}

        {phase !== "open" ? (
          <>
            <GuestRibbon name={guestTo} lang={lang} />
            <Opening event={event} onOpen={openInvite} />
          </>
        ) : (
          <Content event={event} template={template} audioFailed={audioFailed} lang={lang} guestTo={guestTo} />
        )}

        {phase === "opening" && (
          <button type="button" className="absolute inset-x-0 bottom-6 z-20 mx-auto w-fit text-sm underline" onClick={finish}>
            {t.skip}
          </button>
        )}
      </article>

      {phase === "open" && event.design.music && !audioFailed && (
        <button type="button" className="audio-fab" aria-pressed={muted} onClick={() => setMuted((value) => !value)}>
          {muted ? t.unmute : t.mute}
          <span className="font-normal"> · {getSong(event.design.song, event.type).title}</span>
        </button>
      )}
    </div>
  );
}

function Content({
  event,
  template,
  audioFailed,
  lang,
  guestTo,
}: {
  event: InvitationEvent;
  template: TemplateDef;
  audioFailed: boolean;
  lang: InviteLang;
  guestTo?: string;
}) {
  const t = inviteCopy[lang];
  const target = new Date(`${event.details.date}T${event.details.startTime || "12:00"}:00`).getTime();
  const poster = template.key === "poster-dance";
  const hasPhoto = event.details.photo !== "";

  return (
    <div className="reveal pb-16">
      {event.status === "DRAFT" && (
        <p className="bg-[#f3dfb6] px-4 py-2 text-center text-sm text-[#3d2a12]">مسودة، ولم تُنشر بعد</p>
      )}
      <GuestRibbon name={guestTo} lang={lang} />
      {poster && <PosterMasthead event={event} />}
      {(!poster || hasPhoto) && <InvitePhoto event={event} />}
      <header className={`px-6 pb-4 text-center ${poster ? "pt-5" : hasPhoto ? "pt-8" : "pt-16"}`}>
        {!poster && (
          <>
            <p className="kicker">{EVENT_TYPES[event.type].kicker}</p>
            <h1 className="font-display mt-4 text-5xl leading-[1.35]">
              {displayNames(event.details.honoreeNames)}
            </h1>
          </>
        )}
        {event.details.hosts.length > 0 && (
          <p className="mt-3 text-sm text-[var(--muted)]">بدعوة من {displayNames(event.details.hosts)}</p>
        )}
        <p className="mx-auto mt-6 max-w-sm text-lg leading-9">{event.details.wording}</p>
        {audioFailed && (
          <p className="mt-4 text-sm text-[var(--muted)]">تعذر تشغيل الصوت، والدعوة كاملة بدونه.</p>
        )}
      </header>

      <section className="invite-block text-center">
        <p className="text-sm text-[var(--muted)]">{t.date}</p>
        <p className="font-display mt-2 text-3xl leading-relaxed">{formatArabicDate(event.details.date)}</p>
        <p className="mt-2">
          {formatTime(event.details.startTime)} · {t.cairo}
        </p>
        <Countdown target={target} lang={lang} />
        <a className="open-btn mt-5" href={calendarLink(event)} target="_blank" rel="noreferrer">
          {t.calendar}
        </a>
      </section>

      {event.details.schedule.length > 0 && (
        <section className="invite-block">
          <h2 className="font-display text-3xl">{t.program}</h2>
          <ul className="mt-4 grid gap-3">
            {event.details.schedule.map((item) => (
              <li key={`${item.time}-${item.label}`} className="flex items-baseline justify-between gap-4">
                <span>{item.label}</span>
                {item.time && <span className="text-[var(--muted)]">{formatTime(item.time)}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="invite-block">
        <h2 className="font-display text-3xl">{t.venue}</h2>
        <p className="mt-3 text-lg">{event.details.venueName}</p>
        <p className="mt-1 text-[var(--muted)]">{event.details.address}</p>
        {event.details.googleMapsUrl && (
          <a className="open-btn mt-5" href={event.details.googleMapsUrl} target="_blank" rel="noreferrer">
            {t.map}
          </a>
        )}
      </section>

      {event.settings.allowRsvp && (
        <section className="invite-block">
          <h2 className="font-display text-3xl">{t.rsvp}</h2>
          <div className="mt-4">
            <RsvpForm event={event} defaultName={guestTo} />
          </div>
        </section>
      )}

      {event.settings.allowMessages && (
        <section className="invite-block">
          <h2 className="font-display text-3xl">{t.message}</h2>
          <div className="mt-4">
            <MessageForm event={event} />
          </div>
        </section>
      )}

      {event.settings.allowGifts && (
        <section className="invite-block">
          <h2 className="font-display text-3xl">{t.gift}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            {event.type === "BIRTHDAY"
              ? "نقطتك هدية لصاحب العيد."
              : event.type === "SEBOU" || event.type === "AQIQAH"
                ? "هدية بسيطة لأهل المولود."
                : "نقطتك تصل لصاحب الدعوة مع اسمك."}
          </p>
          <div className="mt-4">
            <GiftForm event={event} />
          </div>
        </section>
      )}

      <footer className="px-6 pt-8 text-center text-sm text-[var(--muted)]">
        <Link href="/" className="font-display text-2xl text-[var(--ink)]">
          نقطني
        </Link>
        <p className="mt-2">{t.made}</p>
        {event.design.music && (
          <p className="mx-auto mt-3 max-w-xs text-xs leading-6">{getSong(event.design.song, event.type).credit}</p>
        )}
      </footer>
    </div>
  );
}

function StoryCta({
  muted,
  audioFailed,
  music,
  unmute,
  mute,
  onMute,
}: {
  muted: boolean;
  audioFailed: boolean;
  music: boolean;
  unmute: string;
  mute: string;
  onMute: () => void;
}) {
  return (
    <div className="wax-business">
      <Link href="/order">عايز دعوة زي دي؟ اطلبها على نقطني</Link>
      {music && !audioFailed && (
        <button type="button" aria-pressed={muted} aria-label={muted ? unmute : mute} onClick={onMute}>
          <SpeakerIcon muted={muted} />
        </button>
      )}
    </div>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M4 9h3.2L12 5.2v13.6L7.2 15H4V9zm10.2 1.2a3.2 3.2 0 0 1 0 3.6" />
      {!muted && <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M16.2 8.2a5 5 0 0 1 0 7.6" />}
      {muted && <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M16 9l4 6M20 9l-4 6" />}
    </svg>
  );
}

function Countdown({ target, lang }: { target: number; lang: InviteLang }) {
  const [now, setNow] = useState<number | null>(null);
  const t = inviteCopy[lang];

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
  if (diff <= 0) {
    return <p className="mt-4 text-sm">{t.day}</p>;
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  const parts = [
    [t.units.day, days],
    [t.units.hour, hours],
    [t.units.minute, minutes],
    [t.units.second, seconds],
  ] as const;

  return (
    <div className="mt-5 grid grid-cols-4 gap-2">
      {parts.map(([label, value]) => (
        <div key={label} className="rounded-2xl bg-white/40 px-1 py-3">
          <p className="font-display text-2xl">{formatNumber(value)}</p>
          <p className="text-xs text-[var(--muted)]">{label}</p>
        </div>
      ))}
    </div>
  );
}
