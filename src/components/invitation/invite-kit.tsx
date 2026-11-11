"use client";

import type { InviteLang } from "@/components/invitation/hooks/useInviteKit";

export function GuestRibbon({ name, lang }: { name?: string; lang: InviteLang }) {
  if (!name) return null;
  return (
    <p className="invite-guest-ribbon" dir="auto">
      {lang === "ar" ? `دعوة خاصة لـ ${name}` : `A personal invitation for ${name}`}
    </p>
  );
}

export function InviteLangButton({
  lang,
  onToggle,
}: {
  lang: InviteLang;
  onToggle: () => void;
}) {
  return (
    <button type="button" className="invite-lang-fab" onClick={onToggle} aria-label="Change language">
      {lang === "ar" ? "English" : "عربي"}
    </button>
  );
}

export const inviteCopy = {
  ar: {
    date: "الموعد",
    program: "البرنامج",
    venue: "المكان",
    map: "الموقع على الخريطة",
    calendar: "ضيفها للتقويم",
    rsvp: "هل تشرفنا؟",
    message: "كلمة منك",
    gift: "النقطة",
    skip: "تخطّي",
    mute: "كتم الأغنية",
    unmute: "تشغيل الأغنية",
    made: "صُنعت هذه الدعوة على نقطني",
    cairo: "بتوقيت القاهرة",
    day: "اليوم المنتظر",
    units: { day: "يوم", hour: "ساعة", minute: "دقيقة", second: "ثانية" },
  },
  en: {
    date: "When",
    program: "Programme",
    venue: "Where",
    map: "Open in Maps",
    calendar: "Add to calendar",
    rsvp: "Will you join us?",
    message: "A note from you",
    gift: "A gift",
    skip: "Skip",
    mute: "Mute music",
    unmute: "Play music",
    made: "Made with Noqatni",
    cairo: "Cairo time",
    day: "The big day",
    units: { day: "days", hour: "hrs", minute: "min", second: "sec" },
  },
} as const;
