import type { ReactNode } from "react";
import {
  BalloonsArt,
  Bunting,
  CandlesArt,
  GiftArt,
  RibbonCorners,
  SieveArt,
  Streamers,
  type IconName,
} from "@/components/invitation/festive/festive-art";

export type FestiveKey = "candles" | "confetti" | "gift" | "festival";

export type FestiveVariant = {
  /** Root class that carries the palette and the cover animation: bc, bf, gx, sf. */
  cls: string;
  /** Reveal length in ms. */
  openMs: number;
  beads: "radial" | "up";
  Art: () => ReactNode;
  Decor: () => ReactNode;
  coverKicker: string;
  coverLabel: string;
  coverHint: string;
  heroKicker: string;
  heroLine: string;
  hostsText: (hosts: string[]) => string;
  momentsEyebrow: string;
  momentsTitle: string;
  moments: { title: string; body: string; icon: IconName }[];
  countdown: { eyebrow: string; title: string; today: string };
  programme: { eyebrow: string; title: string };
  rsvp: { eyebrow: string; title: string; hint: string };
  message: { eyebrow: string; title: (name: string) => ReactNode };
  gift: { eyebrow: string; title: string; hint: string };
  closing: { line: string; sub: (name: string) => string };
};

const byHosts = (hosts: string[]) => `من ${hosts.join(" · ")}`;

export const FESTIVE: Record<FestiveKey, FestiveVariant> = {
  candles: {
    cls: "bc",
    openMs: 2500,
    beads: "radial",
    Art: CandlesArt,
    Decor: Bunting,
    coverKicker: "دعوة عيد ميلاد",
    coverLabel: "اتمنّى أمنية وانفخ الشموع وافتح الدعوة",
    coverHint: "اتمنّى أمنية وانفخ الشموع",
    heroKicker: "كل سنة وانت طيب",
    heroLine: "جاي نحتفل ونطفي الشموع مع بعض",
    hostsText: byHosts,
    momentsEyebrow: "اليوم ده",
    momentsTitle: "حفلة مليانة فرحة",
    moments: [
      { title: "تورتة وشموع", body: "نتمنّى أمنية وننفخ الشموع سوا", icon: "cake" },
      { title: "ألعاب وضحك", body: "فقرات ومسابقات للكل", icon: "game" },
      { title: "هدايا وصور", body: "نصوّر أحلى لحظات اليوم", icon: "camera" },
    ],
    countdown: { eyebrow: "العد التنازلي", title: "باقي على الحفلة", today: "النهارده الحفلة!" },
    programme: { eyebrow: "الفقرات", title: "برنامج الحفلة" },
    rsvp: { eyebrow: "تأكيد الحضور", title: "هتيجي؟", hint: "قولنا بدري عشان نجهّز التورتة" },
    message: { eyebrow: "أمنيات", title: (name) => <>اكتب أمنية لـ{name}</> },
    gift: { eyebrow: "الهدية", title: "نقطة العيد", hint: "هديتك بتوصل لصاحب العيد مع اسمك وأمنيتك." },
    closing: { line: "كل سنة وانت طيب", sub: (name) => `ويا رب كل أمنياتك تتحقق يا ${name}` },
  },
  confetti: {
    cls: "bf",
    openMs: 2300,
    beads: "radial",
    Art: BalloonsArt,
    Decor: Streamers,
    coverKicker: "دعوة حفلة",
    coverLabel: "افرقع البالونات وافتح الدعوة",
    coverHint: "افرقع البالونات واحدة واحدة",
    heroKicker: "حفلة ألوان",
    heroLine: "بالونات وجوايز وفرحة مالية المكان",
    hostsText: byHosts,
    momentsEyebrow: "في الحفلة",
    momentsTitle: "ألوان في كل مكان",
    moments: [
      { title: "بالونات وألوان", body: "ديكور مبهج وصور حلوة", icon: "balloon" },
      { title: "مسابقات وجوايز", body: "كل واحد له نصيب من الفرحة", icon: "star" },
      { title: "تورتة ومفاجآت", body: "وفي الآخر مفاجأة كبيرة", icon: "cake" },
    ],
    countdown: { eyebrow: "العد التنازلي", title: "باقي على الحفلة", today: "النهارده الحفلة!" },
    programme: { eyebrow: "الفقرات", title: "برنامج الحفلة" },
    rsvp: { eyebrow: "تأكيد الحضور", title: "هتيجي الحفلة؟", hint: "قولنا بدري عشان نحسب حسابك في الجوايز" },
    message: { eyebrow: "أمنيات", title: (name) => <>اكتب كلمة لـ{name}</> },
    gift: { eyebrow: "الهدية", title: "نقطة العيد", hint: "هديتك بتوصل لصاحب العيد مع اسمك وكلمتك." },
    closing: { line: "يوم ملوّن وحلو", sub: (name) => `وكل سنة وانت طيب يا ${name}` },
  },
  gift: {
    cls: "gx",
    openMs: 2400,
    beads: "up",
    Art: GiftArt,
    Decor: RibbonCorners,
    coverKicker: "مفاجأة عيد ميلاد",
    coverLabel: "فك الشريطة وافتح الهدية",
    coverHint: "فك الشريطة وافتح الهدية",
    heroKicker: "ده كارت دعوتك",
    heroLine: "جوه الهدية مفاجأة… ويا رب تحبها",
    hostsText: byHosts,
    momentsEyebrow: "جوه الهدية",
    momentsTitle: "مفاجآت مستنياك",
    moments: [
      { title: "مفاجأة", body: "حاجة حلوة مستخبية ليك", icon: "gift" },
      { title: "غنوة وطلب", body: "اطلب أغنيتك المفضلة", icon: "music" },
      { title: "صور وذكريات", body: "نصوّر أحلى لحظة", icon: "camera" },
    ],
    countdown: { eyebrow: "العد التنازلي", title: "باقي على الفتح", today: "النهارده نفتح الهدية!" },
    programme: { eyebrow: "الفقرات", title: "برنامج اليوم" },
    rsvp: { eyebrow: "تأكيد الحضور", title: "هتفتح الهدية معانا؟", hint: "قولنا بدري عشان نجهّز مكانك" },
    message: { eyebrow: "كارت تهنئة", title: (name) => <>اكتب كارت لـ{name}</> },
    gift: { eyebrow: "الهدية", title: "نقطة العيد", hint: "هديتك بتوصل لصاحب العيد مع اسمك وكلمتك." },
    closing: { line: "أحلى هدية إنك معانا", sub: (name) => `وكل سنة وانت طيب يا ${name}` },
  },
  festival: {
    cls: "sf",
    openMs: 2400,
    beads: "radial",
    Art: SieveArt,
    Decor: Bunting,
    coverKicker: "دعوة سبوع",
    coverLabel: "هز الغربال وافتح الدعوة",
    coverHint: "هزّ الغربال والملبّس يتنثر",
    heroKicker: "ألف مبروك",
    heroLine: "سبوع ملوّن وفرحة كبيرة",
    hostsText: (hosts) => `يتشرف ${hosts.join(" و ")} بدعوتكم لحضور سبوع مولودهم`,
    momentsEyebrow: "ليلة السبوع",
    momentsTitle: "فرحة بالألوان",
    moments: [
      { title: "الغربال والملبّس", body: "نهز الغربال وننثر الحلويات", icon: "sweet" },
      { title: "فوانيس وشموع", body: "نمشي بالنور والفوانيس", icon: "light" },
      { title: "ألوان وفرحة", body: "ديكور مبهج ولمّة حلوة", icon: "balloon" },
    ],
    countdown: { eyebrow: "على الميعاد", title: "باقي على السبوع", today: "النهارده السبوع!" },
    programme: { eyebrow: "البرنامج", title: "تفاصيل الليلة" },
    rsvp: { eyebrow: "تأكيد الحضور", title: "هتشرفونا؟", hint: "قولولنا مين جاي عشان نجهّز الملبّس والمكان" },
    message: { eyebrow: "دعاء", title: (name) => <>ادعوا لـ{name}</> },
    gift: { eyebrow: "النقطة", title: "نقطة المولود", hint: "نقطتك بتوصل لأهل المولود مع اسمك ودعائك." },
    closing: { line: "ربنا يحفظه ويبارك فيه", sub: (name) => `وتتربّى في عزّ يا ${name}` },
  },
};
