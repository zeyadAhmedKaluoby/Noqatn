"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemePair } from "@/components/invitation/theme-art";
import { SiteFooter } from "@/components/site";
import { getTemplate } from "@/lib/templates";
import type { TemplateKey } from "@/lib/types";

type Lang = "ar" | "en";

const copy = {
  ar: {
    order: "أنشئ دعوة",
    lang: "English",
    kicker: "دعوات للزفاف والخطوبة وأعياد الميلاد",
    line1: "دعوتك بقت",
    accent: "لينك",
    line2: "يتفتح زي الظرف",
    body: "تبعتها على الواتساب، والضيف يفتحها يلاقي لحناً وموعد ومكان، ويأكد حضوره. من غير تطبيق.",
    demo: "افتح دعوة ديمو",
    themes: "شوف القوالب",
    chip: ["ضيف بلا حساب", "لحن بعد الفتح", "رد ونقطة"],
    try: "جرّب بنفسك",
    every: "كل مناسبة ليها طريقة تتفتح بيها",
    everyBody: "افتح أي واحدة من الموبايل. دي نفس اللي الضيوف بتوعك هيشوفوه.",
    drawn: "دعوات مرسومة · من غير صور",
    drawnBody: "التصميم والحركة هما البطل. مش محتاجين غير الأسامي والتفاصيل.",
    open: "افتح الديمو",
  },
  en: {
    order: "Create invitation",
    lang: "عربي",
    kicker: "Invitations for weddings, engagements, and birthdays",
    line1: "Your invitation is a",
    accent: "link",
    line2: "that opens like an envelope",
    body: "Send it on WhatsApp. The guest finds music, the date, and the place, then confirms. No app.",
    demo: "Open a demo",
    themes: "See the themes",
    chip: ["No account", "Music on open", "A reply and a gift"],
    try: "Try them",
    every: "Every occasion opens its own way",
    everyBody: "Open any of them on your phone. This is what your guests will see.",
    drawn: "Illustrated, no photos needed",
    drawnBody: "The design and the motion lead. You only need the names and the details.",
    open: "Open demo",
  },
} as const;

const gallery: {
  slug: string;
  key: TemplateKey;
  tag: string;
  tagEn: string;
  names: string;
  namesEn: string;
  body: string;
  bodyEn: string;
}[] = [
  {
    slug: "theme-rose",
    key: "rose-gate",
    tag: "فرح · باب ورد",
    tagEn: "Wedding · a rose gate",
    names: "يحيى و ليلى",
    namesEn: "Yahya & Laila",
    body: "ورق بلون الورد وبوابة زهر. الحكاية تنزل من الباب للبرنامج والقاعة والدعاء.",
    bodyEn: "Blush paper and a rose gate. The story runs from the door to the plan, the hall, and a prayer.",
  },
  {
    slug: "theme-wax",
    key: "wax-roses",
    tag: "فرح · ختم وردي مموج",
    tagEn: "Wedding · pink wax seal",
    names: "سلمى و حازم",
    namesEn: "Salma & Hazem",
    body: "كارت هادي بختم شمع عليه وردة. الضيف يدوس، الختم يتفك والدعوة تتفتح.",
    bodyEn: "A quiet card with a wax seal and a rose. The guest taps, the seal breaks, and the invitation opens.",
  },
  {
    slug: "theme-bism",
    key: "bismillah-seal",
    tag: "فرح · ختم «بسم الله»",
    tagEn: "Wedding · Bismillah seal",
    names: "يوسف و ليلى",
    namesEn: "Youssef & Laila",
    body: "ظرف عاجي وختم مكتوب عليه بسم الله. الدهب يظهر مع الفتح.",
    bodyEn: "An ivory envelope and a seal that reads Bismillah. Gold shows as it opens.",
  },
  {
    slug: "theme-bow",
    key: "bow-letter",
    tag: "فرح · جواب بفيونكة ووردة",
    tagEn: "Wedding · letter with a bow",
    names: "عمر و فريدة",
    namesEn: "Omar & Farida",
    body: "ورقة وردية وفيونكة. الدعوة تُقرأ كجواب فيه الأسامي والتاريخ.",
    bodyEn: "A pink letter with a bow. The invitation reads as a note with the names and the date.",
  },
  {
    slug: "theme-water",
    key: "watercolor-seal",
    tag: "فرح · ألوان مائية وختم",
    tagEn: "Wedding · watercolor and a seal",
    names: "آدم و نور",
    namesEn: "Adam & Nour",
    body: "ظرف كريمي وختم برقوقي. الرسمة تظهر بعد ما الظرف يتفتح.",
    bodyEn: "A cream envelope and a plum seal. The drawing appears after the envelope opens.",
  },
  {
    slug: "theme-gate",
    key: "garden-gate",
    tag: "فرح · قوس ورد وبوابة جنينة",
    tagEn: "Wedding · rose arch and a gate",
    names: "يحيى و ملك",
    namesEn: "Yahya & Malak",
    body: "قوس ورد وباب صغير. الجنينة تظهر لما الضيف يفتح البوابة.",
    bodyEn: "A rose arch and a small door. The garden appears when the guest opens the gate.",
  },
  {
    slug: "theme-lav",
    key: "lavender-window",
    tag: "فرح · شباك على حقل لافندر",
    tagEn: "Wedding · a window on lavender",
    names: "كريم و رنا",
    namesEn: "Karim & Rana",
    body: "شباك قوسي على حقل بنفسجي وقت الغروب. الشباك يكبر مع الفتح.",
    bodyEn: "An arched window onto a violet field at dusk. The window grows as it opens.",
  },
  {
    slug: "theme-mash",
    key: "mashrabiya-door",
    tag: "كتب كتاب · باب مشربية",
    tagEn: "Katb ketab · mashrabiya door",
    names: "سيف و ريم",
    namesEn: "Seif & Reem",
    body: "باب خشب مشغول. يتفتح على نور الفانوس والدعوة.",
    bodyEn: "A carved wooden door. It opens onto lantern light and the invitation.",
  },
  {
    slug: "theme-moon",
    key: "moon-door",
    tag: "فرح · باب وردي تحت القمر",
    tagEn: "Wedding · a pink door under the moon",
    names: "مراد و لين",
    namesEn: "Morad & Leen",
    body: "باب وردي منور بالفوانيس. يتفتح على تراس تحت القمر.",
    bodyEn: "A pink door lit by lanterns. It opens onto a terrace under the moon.",
  },
  {
    slug: "theme-box",
    key: "ring-box",
    tag: "خطوبة · علبة دبل بتتفتح",
    tagEn: "Engagement · a ring box that opens",
    names: "سلمى و عمر",
    namesEn: "Salma & Omar",
    body: "الضيف يفتح العلبة يلاقي الدبلتين. وفيها برنامج السهرة وتأكيد الحضور.",
    bodyEn: "The guest opens the box and finds the rings, then the evening plan and a reply.",
  },
  {
    slug: "theme-gift",
    key: "gift-burst",
    tag: "عيد ميلاد · هدية بتفرقع",
    tagEn: "Birthday · a gift that bursts",
    names: "نور",
    namesEn: "Nour",
    body: "الضيف يفتح الهدية والقصاصات تنزل. ويقدر يقترح أغنية مع الرد.",
    bodyEn: "The guest opens the gift and confetti falls, then can suggest a song with the reply.",
  },
];

export function LandingHome() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  return (
    <>
      <main className="bg-[#fdfcf9] text-[#2c2a26]" dir={lang === "ar" ? "rtl" : "ltr"}>
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Seal />
            <span className="font-[family-name:var(--font-messiri)] text-3xl leading-none">نقطني</span>
            <span className="font-[family-name:var(--font-script)] text-4xl leading-none text-[#b8995c]">Noqatni</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-[#2c2a26]/30 bg-white px-4 text-sm font-semibold"
              onClick={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
            >
              {t.lang}
            </button>
            <Link
              href="/create"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#3d8b4a] px-5 text-sm font-bold text-white"
            >
              {t.order}
              <ChatIcon />
            </Link>
          </div>
        </header>

        <section className="mx-auto flex min-h-[78svh] w-full max-w-6xl flex-col justify-center px-5 pb-8 md:px-8">
          <p className="text-lg font-semibold text-[#a68446] md:text-xl">{t.kicker}</p>
          <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-messiri)] text-5xl font-semibold leading-[1.35] md:text-7xl">
            {t.line1}{" "}
            <em className="font-[family-name:var(--font-ruqaa)] text-[#b8995c] not-italic">{t.accent}</em>
            <br />
            {t.line2}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#9a8b7c] md:text-xl">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/invite/layla-omar" className="inline-flex min-h-14 items-center rounded-full bg-[#2c2a26] px-7 text-lg font-bold text-[#fdfcf9]">
              {t.demo}
            </Link>
            <a href="#themes" className="inline-flex min-h-14 items-center rounded-full border border-[#2c2a26] bg-white px-7 text-lg font-bold">
              {t.themes}
            </a>
          </div>
          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#a89888] md:text-base">
            {t.chip.map((item, index) => (
              <span key={item} className="contents">
                {index > 0 && (
                  <span className="text-[#c4a15a]" aria-hidden>
                    ◆
                  </span>
                )}
                <span>{item}</span>
              </span>
            ))}
          </p>
        </section>

        <section id="themes" className="bg-[#f7f4ee] px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-8 max-w-xl">
              <p className="text-[15px] font-medium text-[#a68446]">{t.try}</p>
              <h2 className="mt-3 font-[family-name:var(--font-messiri)] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.35]">
                {t.every}
              </h2>
              <p className="mt-4 text-[17px] leading-8 text-[#9a8b7c]">{t.everyBody}</p>
            </div>
            <div className="mb-5">
              <h3 className="text-[22px] font-bold">{t.drawn}</h3>
              <p className="mt-1 text-[15px] text-[#9a8b7c]">{t.drawnBody}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {gallery.map((item) => (
                <Link
                  key={item.slug}
                  href={`/invite/${item.slug}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#e6e0d6] bg-white text-inherit no-underline transition hover:-translate-y-1 hover:shadow-[0_26px_44px_-28px_rgba(80,65,40,0.4)]"
                >
                  <ThemeCard
                    templateKey={item.key}
                    tag={lang === "ar" ? item.tag : item.tagEn}
                    names={lang === "ar" ? item.names : item.namesEn}
                    body={lang === "ar" ? item.body : item.bodyEn}
                    cta={t.open}
                    rtl={lang === "ar"}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ThemeCard({
  templateKey,
  tag,
  names,
  body,
  cta,
  rtl,
}: {
  templateKey: TemplateKey;
  tag: string;
  names: string;
  body: string;
  cta: string;
  rtl: boolean;
}) {
  const template = getTemplate(templateKey);
  return (
    <>
      <div className="aspect-[1.35/1] overflow-hidden">
        <ThemePair kind={template.opening} names={names} date="٢١ مايو ٢٠٢٧" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-5 pb-5 pt-5">
        <p className="text-xs text-[#a68446]">{tag}</p>
        <h3 className="font-[family-name:var(--font-messiri)] text-2xl font-semibold leading-snug">{names}</h3>
        <p className="text-sm leading-6 text-[#9a8b7c]">{body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold">
          {cta}
          <svg viewBox="0 0 24 24" className={`h-4 w-4 ${rtl ? "-scale-x-100" : ""}`} aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </div>
    </>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 36 28" className="h-7 w-9" aria-hidden>
      <path d="M4 6 L18 24" stroke="#2c2a26" strokeWidth="1.6" fill="none" />
      <path d="M32 6 L18 24" stroke="#2c2a26" strokeWidth="1.6" fill="none" />
      <circle cx="28" cy="6" r="3.2" fill="#9c3b45" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 0 1 0 14c-.7 0-1.3-.1-2-.3l-.4-.1-2.4.6.6-2.3-.2-.4A7 7 0 0 1 12 5z"
      />
    </svg>
  );
}
