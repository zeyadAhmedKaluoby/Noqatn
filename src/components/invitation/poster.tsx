import type { InvitationEvent } from "@/lib/types";

export function posterName(name: string) {
  const first = name.trim().split(/\s+/)[0];
  return first || name.trim();
}

export function posterDate(isoDate: string, lang: "ar" | "en" = "ar") {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return { day: "", month: "", year: "" };
  if (lang === "en") {
    const dayNum = date.getDate();
    const teen = dayNum % 100;
    const suffix =
      teen >= 11 && teen <= 13
        ? "th"
        : dayNum % 10 === 1
          ? "st"
          : dayNum % 10 === 2
            ? "nd"
            : dayNum % 10 === 3
              ? "rd"
              : "th";
    return {
      day: `${dayNum}${suffix}`,
      month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(date).toUpperCase(),
      year: String(date.getFullYear()),
    };
  }
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("ar-EG", options).format(date);
  return {
    day: format({ day: "numeric" }),
    month: format({ month: "long" }),
    year: format({ year: "numeric" }),
  };
}

function nameSize(name: string) {
  if (name.length >= 8) return "clamp(1.7rem, 7.5vw, 2.7rem)";
  if (name.length >= 6) return "clamp(2.2rem, 10vw, 3.5rem)";
  return "clamp(3rem, 13vw, 5rem)";
}

function venueSize(venue: string) {
  if (venue.length > 28) return "0.72rem";
  if (venue.length > 16) return "0.92rem";
  return "clamp(1.05rem, 3.5vw, 1.45rem)";
}

export function DancingCouple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 700" className={className} aria-hidden>
      <ellipse cx="186" cy="236" rx="112" ry="132" fill="#e6c15a" />
      <path fill="#3a2c24" d="M168 400l-12 250h40l8-250z" />
      <path fill="#2a211c" d="M204 398l10 252h38l-14-256z" />
      <path fill="#516333" d="M148 214c22-32 92-34 116 4l16 150c-22 36-78 46-112 32-24-10-28-46-20-186z" />
      <path fill="#f4efe6" d="M236 220c34-22 56-74 40-124-6-16-24-18-30-4 8 36-2 72-24 100z" />
      <ellipse cx="252" cy="86" rx="13" ry="11" fill="#efc7a6" transform="rotate(-18 252 86)" />
      <ellipse cx="198" cy="168" rx="34" ry="38" fill="#efc7a6" />
      <path fill="#d9d3c9" d="M166 158c8-46 78-54 92 2-8-18-36-28-62-16-16 8-26 10-30 14z" />
      <ellipse cx="166" cy="176" rx="7" ry="9" fill="#e4b494" />
      <path fill="#f7f4ee" d="M138 308c-40 16-86 92-102 190-12 74-8 150 10 176h132c-6-70-12-160-8-230 2-36 0-92-8-124-2-8-14-16-24-12z" />
      <path fill="#e6e0d2" d="M72 470c20 42 30 96 26 176h34c-2-70-12-124-28-166z" />
      <path fill="#f7f4ee" d="M114 214c16-22 58-20 72 6l4 82c-18 18-52 20-70 4z" />
      <path fill="#efc7a6" d="M118 232c-30 14-50 52-46 86 14 2 24-16 36-36 10-16 14-36 10-50z" />
      <path fill="#efc7a6" d="M172 230c28-30 58-78 66-124 2-12-12-18-18-8-8 28-28 64-52 96z" />
      <ellipse cx="236" cy="102" rx="12" ry="10" fill="#f3d0b0" transform="rotate(14 236 102)" />
      <path fill="#efc7a6" d="M126 198h24l-2 24h-20z" />
      <g transform="rotate(-14 136 170)">
        <ellipse cx="136" cy="170" rx="26" ry="30" fill="#efc7a6" />
        <path fill="#e2b226" d="M108 168c-2-48 22-74 52-68 20 4 32 24 28 46-10-20-30-30-48-24-16 6-26 20-28 36-2 4-4 8-4 10z" />
        <circle cx="164" cy="112" r="13" fill="#e2b226" />
        <path d="M120 166c6 4 14 4 18-1" fill="none" stroke="#c48a62" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M124 182c6 5 14 4 18-2" fill="none" stroke="#c48a62" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function PosterStage({ event }: { event: InvitationEvent }) {
  const names = event.details.honoreeNames.map(posterName).filter(Boolean).slice(0, 2);
  const { day, month, year } = posterDate(event.details.date);
  const join = "و";
  const venue = event.details.venueName.trim();

  return (
    <>
      <div className="poster-copy">
        {names[0] && (
          <p className="poster-name" dir="rtl" style={{ fontSize: nameSize(names[0]) }}>
            {names[0]}
          </p>
        )}
        {names.length > 1 && (
          <p className="poster-and" dir="rtl">
            {join}
          </p>
        )}
        {names[1] && (
          <p className="poster-name" dir="rtl" style={{ fontSize: nameSize(names[1]) }}>
            {names[1]}
          </p>
        )}
        {month && (
          <p className="poster-month" dir="rtl">
            {month}
          </p>
        )}
        {day && (
          <p className="poster-day" dir="rtl">
            {day}
          </p>
        )}
        {year && (
          <p className="poster-year" dir="ltr">
            {year}
          </p>
        )}
      </div>
      <DancingCouple className="poster-couple" />
      {venue && (
        <p className="poster-venue" dir="rtl" style={{ fontSize: venueSize(venue) }}>
          {venue}
        </p>
      )}
    </>
  );
}

export function PosterMasthead({ event }: { event: InvitationEvent }) {
  const names = event.details.honoreeNames.map(posterName).filter(Boolean).slice(0, 2);
  const { day, month, year } = posterDate(event.details.date);
  const join = "و";

  return (
    <div className="poster-mast" dir="ltr">
      <div className="poster-mast-copy" dir="rtl">
        {names[0] && <p className="poster-mast-name">{names[0]}</p>}
        {names.length > 1 && <p className="poster-and">{join}</p>}
        {names[1] && <p className="poster-mast-name">{names[1]}</p>}
        <p className="poster-mast-date">
          {day} {month}
        </p>
        <p className="poster-mast-year">{year}</p>
      </div>
      <DancingCouple className="poster-mast-art" />
    </div>
  );
}
