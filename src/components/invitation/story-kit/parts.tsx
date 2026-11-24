"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { calendarLink, formatNumber } from "@/lib/format";
import type { InvitationEvent } from "@/lib/types";

/*
 * Building blocks shared by story templates.
 *
 * Every block renders classes of the form `{prefix}-name`, so a template keeps
 * its own look (and its own CSS) while the structure and behaviour live here.
 * All visible copy is passed in by the template, so each one keeps its own
 * voice and can supply Arabic and English text.
 */

export const DEFAULT_COUNT_UNITS = ["يوم", "ساعة", "دقيقة", "ثانية"] as const;

/** Live countdown. Classes: -count, -count-cell, -count-num, -count-label, -count-placeholder, -today. */
export function Countdown({
  prefix,
  target,
  todayText,
  todayClassName = "",
  units = DEFAULT_COUNT_UNITS,
}: {
  prefix: string;
  target: number;
  todayText: string;
  todayClassName?: string;
  units?: readonly [string, string, string, string];
}) {
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

  if (!now || Number.isNaN(target)) return <div className={`${prefix}-count-placeholder`} />;
  const diff = target - now;
  if (diff <= 0) return <p className={`${prefix}-today ${todayClassName}`.trim()}>{todayText}</p>;

  const parts = [
    [units[0], Math.floor(diff / 86_400_000)],
    [units[1], Math.floor((diff % 86_400_000) / 3_600_000)],
    [units[2], Math.floor((diff % 3_600_000) / 60_000)],
    [units[3], Math.floor((diff % 60_000) / 1000)],
  ] as const;

  return (
    <div className={`${prefix}-count`} role="timer" aria-live="off">
      {parts.map(([label, value]) => (
        <div key={label} className={`${prefix}-count-cell`}>
          <span className={`${prefix}-count-num`}>{formatNumber(value)}</span>
          <span className={`${prefix}-count-label`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * A titled section that holds a form (RSVP, messages, gift).
 * Classes: -section, -{eyebrowClass}, -title, -muted, -form, all with -reveal.
 */
export function FormSection({
  prefix,
  eyebrow,
  title,
  hint,
  hintClassName = "mt-2 text-center",
  eyebrowClass = "kicker",
  children,
}: {
  prefix: string;
  eyebrow: string;
  title: ReactNode;
  hint?: string;
  hintClassName?: string;
  /** Some templates call the small heading "eyebrow" instead of "kicker". */
  eyebrowClass?: "kicker" | "eyebrow";
  children: ReactNode;
}) {
  return (
    <section className={`${prefix}-section`}>
      <p className={`${prefix}-${eyebrowClass} ${prefix}-reveal`}>{eyebrow}</p>
      <h2 className={`${prefix}-title ${prefix}-reveal`}>{title}</h2>
      {hint && <p className={`${prefix}-muted ${prefix}-reveal ${hintClassName}`}>{hint}</p>}
      <div className={`${prefix}-form ${prefix}-reveal`}>{children}</div>
    </section>
  );
}

/** "Open the map" and "Add to calendar" buttons. Classes: -actions, -btn, -btn.is-ghost. */
export function VenueActions({
  prefix,
  event,
  mapLabel,
  calendarLabel,
}: {
  prefix: string;
  event: InvitationEvent;
  mapLabel: string;
  calendarLabel: string;
}) {
  return (
    <div className={`${prefix}-actions`}>
      {event.details.googleMapsUrl && (
        <a className={`${prefix}-btn`} href={event.details.googleMapsUrl} target="_blank" rel="noreferrer">
          {mapLabel}
        </a>
      )}
      <a className={`${prefix}-btn is-ghost`} href={calendarLink(event)} target="_blank" rel="noreferrer">
        {calendarLabel}
      </a>
    </div>
  );
}

/** Brand footer. Classes: -footer. */
export function StoryFooter({ prefix }: { prefix: string }) {
  return (
    <footer className={`${prefix}-footer`}>
      <Link href="/">نقطني</Link>
      <p>صُنعت هذه الدعوة على نقطني</p>
    </footer>
  );
}

/** 24 . 6 . 2027 in Arabic-Indic digits, for cover dates. */
export function dottedDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const format = new Intl.NumberFormat("ar-EG", { useGrouping: false });
  return `${format.format(date.getDate())} . ${format.format(date.getMonth() + 1)} . ${format.format(date.getFullYear())}`;
}

/** Tap hint icon for covers. */
export function HandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path
        fill="currentColor"
        d="M9.2 11.2V5.6a1.3 1.3 0 0 1 2.6 0v4.2h.5V4.4a1.3 1.3 0 0 1 2.6 0v5.4h.5V6.1a1.3 1.3 0 0 1 2.6 0v8.2c0 3-2.2 5.2-5.4 5.2h-.6c-2.4 0-4.2-1-5.2-2.6l-2.7-4.2a1.4 1.4 0 0 1 2.2-1.7l1.5 1.6V11.2z"
      />
    </svg>
  );
}
