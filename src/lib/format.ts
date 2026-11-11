import type { EventType, InvitationEvent, RsvpStatus, ScheduleItem } from "@/lib/types";

export function displayNames(names: string[]) {
  return names.map((name) => name.trim()).filter(Boolean).join(" و ");
}

export function formatArabicDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatTime(hhmm: string) {
  if (!/^\d{2}:\d{2}$/.test(hhmm)) return hhmm;
  const [hour, minute] = hhmm.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return new Intl.DateTimeFormat("ar-EG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatEgp(piastres: number) {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(piastres / 100);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("ar-EG").format(value);
}

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function parseSchedule(text: string): ScheduleItem[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      if (parts.length === 1) return { time: "", label: parts[0].trim() };
      return {
        time: parts[0].trim(),
        label: parts.slice(1).join("|").trim(),
      };
    })
    .filter((item) => item.label);
}

export function defaultWording(type: EventType, names: string[]) {
  const who = displayNames(names);
  switch (type) {
    case "WEDDING":
      return `يتشرف الأهل بدعوتكم لمشاركة فرحة زفاف ${who}.`;
    case "ENGAGEMENT":
      return `بقلوبٍ سعيدة ندعوكم لحضور حفل خطوبة ${who}.`;
    case "SEBOU":
      return `نشارككم فرحة سبوع ${who}، ويسعدنا أن تكونوا معنا.`;
    case "AQIQAH":
      return `نتشرف بدعوتكم لحضور عقيقة ${who}.`;
    case "BIRTHDAY":
      return `يسعدنا دعوتكم لمشاركة عيد ميلاد ${who}.`;
  }
}

export function eventTitle(type: EventType, names: string[]) {
  const first = names[0] ?? "";
  switch (type) {
    case "SEBOU":
      return `سبوع ${first}`;
    case "AQIQAH":
      return `عقيقة ${first}`;
    case "BIRTHDAY":
      return `عيد ميلاد ${first}`;
    default:
      return displayNames(names);
  }
}

export function honoreeLabel(type: EventType) {
  if (type === "BIRTHDAY") return "اسم صاحب العيد";
  if (type === "WEDDING" || type === "ENGAGEMENT") return "الاسم الأول";
  return "اسم المولود";
}

export const RSVP_LABEL: Record<RsvpStatus, string> = {
  ATTENDING: "سيحضر",
  NOT_ATTENDING: "يعتذر",
  MAYBE: "ربما",
};

export const GIFT_LABEL = {
  SUCCESS: "تم التحصيل",
  PENDING: "قيد الدفع",
  FAILED: "لم تكتمل",
} as const;

export function calendarLink(event: InvitationEvent) {
  const start = new Date(`${event.details.date}T${event.details.startTime || "20:00"}:00`);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${stamp(start)}/${stamp(end)}`,
    location: [event.details.venueName, event.details.address].filter(Boolean).join("، "),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Personalized guest name from ?to= (max 40 chars, like Ma3zoom). */
export function guestFromTo(value: string | null | undefined) {
  const name = (value ?? "").trim().slice(0, 40);
  return name || undefined;
}
