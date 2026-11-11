"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site";
import { useStore } from "@/components/store";
import { PhotoField } from "@/components/invitation/photo";
import { defaultWording, eventTitle, honoreeLabel, parseSchedule, uid } from "@/lib/format";
import { isOccasionPhoto, OCCASION_PHOTOS } from "@/lib/photos";
import { defaultSongFor, SONGS } from "@/lib/songs";
import { EVENT_TYPES, templatesFor } from "@/lib/templates";
import type { AnimationLevel, EventType, InvitationEvent, SongId } from "@/lib/types";

const steps = ["المناسبة", "القالب", "التفاصيل", "النشر"];

type Draft = {
  type: EventType;
  templateKey: InvitationEvent["templateKey"];
  name1: string;
  name2: string;
  photo: string;
  hosts: string;
  date: string;
  startTime: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  wording: string;
  schedule: string;
  music: boolean;
  song: SongId;
  animationLevel: AnimationLevel;
  allowRsvp: boolean;
  allowMessages: boolean;
  allowGifts: boolean;
  showGiftAmounts: boolean;
  showGuestMessagesPublicly: boolean;
};

const initialDraft: Draft = {
  type: "WEDDING",
  templateKey: "elegant-floral",
  name1: "",
  name2: "",
  photo: "/images/occasion-wedding.jpg",
  hosts: "",
  date: "",
  startTime: "19:30",
  venueName: "",
  address: "",
  googleMapsUrl: "",
  wording: "",
  schedule: "",
  music: true,
  song: "canon",
  animationLevel: "FULL",
  allowRsvp: true,
  allowMessages: true,
  allowGifts: true,
  showGiftAmounts: false,
  showGuestMessagesPublicly: true,
};

export function CreateWizard() {
  const { ready, saveEvent } = useStore();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [error, setError] = useState("");
  const [published, setPublished] = useState<InvitationEvent | null>(null);
  const [origin, setOrigin] = useState("");
  const couple = draft.type === "WEDDING" || draft.type === "ENGAGEMENT";
  const choices = useMemo(() => templatesFor(draft.type), [draft.type]);

  function patch(partial: Partial<Draft>) {
    setDraft((current) => {
      const next = { ...current, ...partial };
      if (partial.type) {
        const allowed = templatesFor(partial.type);
        if (!allowed.some((item) => item.key === next.templateKey)) {
          next.templateKey = allowed[0].key;
        }
        if (partial.song === undefined) next.song = defaultSongFor(partial.type);
        if (partial.photo === undefined && (current.photo === "" || isOccasionPhoto(current.photo))) {
          next.photo = current.photo === "" ? "" : OCCASION_PHOTOS[partial.type].src;
        }
      }
      return next;
    });
  }

  function validateDetails() {
    if (draft.name1.trim().length < 2) return `اكتب ${honoreeLabel(draft.type)}.`;
    if (couple && draft.name2.trim().length < 2) return "اكتب الاسم الثاني.";
    if (!draft.date) return "اختر تاريخ المناسبة.";
    if (!draft.venueName.trim() || !draft.address.trim()) return "المكان والعنوان مطلوبان.";
    if (draft.googleMapsUrl && !/^https?:\/\//.test(draft.googleMapsUrl)) {
      return "رابط الخريطة يبدأ بـ https://";
    }
    return "";
  }

  function go(next: number) {
    if (next === 3) {
      const problem = validateDetails();
      if (problem) {
        setError(problem);
        return;
      }
    }
    setError("");
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function publish() {
    const problem = validateDetails();
    if (problem) {
      setError(problem);
      setStep(2);
      return;
    }
    const names = couple
      ? [draft.name1.trim(), draft.name2.trim()]
      : [draft.name1.trim()];
    const title = eventTitle(draft.type, names);
    const event: InvitationEvent = {
      slug: `nq-${uid("e").slice(-6)}`,
      managementToken: `m-${Math.random().toString(36).slice(2, 12)}`,
      title,
      type: draft.type,
      templateKey: draft.templateKey,
      details: {
        hosts: draft.hosts
          .split(/[،,]/)
          .map((item) => item.trim())
          .filter(Boolean),
        honoreeNames: names,
        date: draft.date,
        startTime: draft.startTime || "19:00",
        venueName: draft.venueName.trim(),
        address: draft.address.trim(),
        googleMapsUrl: draft.googleMapsUrl.trim() || undefined,
        photo: draft.photo,
        wording: draft.wording.trim() || defaultWording(draft.type, names),
        schedule: parseSchedule(draft.schedule),
      },
      design: { music: draft.music, song: draft.song, animationLevel: draft.animationLevel },
      settings: {
        allowRsvp: draft.allowRsvp,
        allowMessages: draft.allowMessages,
        allowGifts: draft.allowGifts,
        showGiftAmounts: draft.showGiftAmounts,
        showGuestMessagesPublicly: draft.showGuestMessagesPublicly,
      },
      status: "PUBLISHED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveEvent(event);
    setPublished(event);
    setOrigin(window.location.origin);
    setStep(4);
  }

  if (!ready) {
    return (
      <>
        <SiteHeader />
        <main className="grid min-h-[50vh] place-items-center">جارٍ التجهيز…</main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="kicker">دعوة جديدة</p>
        <h1 className="font-display mt-2 text-5xl">أنشئ دعوة نقطني</h1>
        <p className="mt-3 leading-7 text-[#6d5c4c]">
          تُحفظ الدعوة في هذا المتصفح. الضيف يفتح الرابط العام، وأنت تحتفظ برابط الإدارة.
        </p>
        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <li key={label} className={`nav-pill ${step === index ? "is-on" : "bg-white"}`}>
              {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(Object.keys(EVENT_TYPES) as EventType[]).map((type) => (
              <button
                key={type}
                type="button"
                className={`panel text-start ${draft.type === type ? "ring-2 ring-[#9a7344]" : ""}`}
                onClick={() => patch({ type })}
              >
                <span className="font-display text-3xl">{EVENT_TYPES[type].label}</span>
                <span className="mt-2 block leading-7 text-[#5c4d40]">{EVENT_TYPES[type].blurb}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 grid gap-3">
            {choices.map((template) => (
              <button
                key={template.key}
                type="button"
                className={`panel text-start ${draft.templateKey === template.key ? "ring-2 ring-[#9a7344]" : ""}`}
                onClick={() => patch({ templateKey: template.key })}
              >
                <span className="font-display text-3xl">{template.name}</span>
                <span className="mt-2 block leading-7 text-[#5c4d40]">{template.brief}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 grid gap-4">
            <PhotoField type={draft.type} value={draft.photo} onChange={(photo) => patch({ photo })} />
            <label className="grid gap-2 text-sm">
              {honoreeLabel(draft.type)}
              <input className="field" value={draft.name1} onChange={(e) => patch({ name1: e.target.value })} />
            </label>
            {couple && (
              <label className="grid gap-2 text-sm">
                الاسم الثاني
                <input className="field" value={draft.name2} onChange={(e) => patch({ name2: e.target.value })} />
              </label>
            )}
            <label className="grid gap-2 text-sm">
              أصحاب الدعوة، مفصولة بفاصلة
              <input className="field" value={draft.hosts} onChange={(e) => patch({ hosts: e.target.value })} placeholder="آل محمود، آل حسن" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                التاريخ
                <input className="field" type="date" value={draft.date} onChange={(e) => patch({ date: e.target.value })} />
              </label>
              <label className="grid gap-2 text-sm">
                الوقت
                <input className="field" type="time" value={draft.startTime} onChange={(e) => patch({ startTime: e.target.value })} />
              </label>
            </div>
            <label className="grid gap-2 text-sm">
              اسم المكان
              <input className="field" value={draft.venueName} onChange={(e) => patch({ venueName: e.target.value })} />
            </label>
            <label className="grid gap-2 text-sm">
              العنوان
              <input className="field" value={draft.address} onChange={(e) => patch({ address: e.target.value })} />
            </label>
            <label className="grid gap-2 text-sm">
              رابط خرائط جوجل
              <input className="field" dir="ltr" value={draft.googleMapsUrl} onChange={(e) => patch({ googleMapsUrl: e.target.value })} placeholder="https://maps.google.com/..." />
            </label>
            <label className="grid gap-2 text-sm">
              نص الدعوة
              <textarea className="field min-h-28" value={draft.wording} onChange={(e) => patch({ wording: e.target.value })} placeholder="يُكتب تلقائياً إن تركته فارغاً" />
            </label>
            <label className="grid gap-2 text-sm">
              البرنامج، سطر لكل فقرة: الوقت | الوصف
              <textarea className="field min-h-24" value={draft.schedule} onChange={(e) => patch({ schedule: e.target.value })} placeholder={"19:30 | استقبال الضيوف\n20:30 | عقد القران"} />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 grid gap-3">
            <Toggle label="أغنية بعد الفتح" checked={draft.music} onChange={(music) => patch({ music })} />
            {draft.music && (
              <label className="panel grid gap-2 text-sm">
                الأغنية
                <select className="field" value={draft.song} onChange={(e) => patch({ song: e.target.value as SongId })}>
                  {SONGS.map((song) => (
                    <option key={song.id} value={song.id}>
                      {song.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="panel grid gap-2 text-sm">
              مستوى الحركة
              <select className="field" value={draft.animationLevel} onChange={(e) => patch({ animationLevel: e.target.value as AnimationLevel })}>
                <option value="FULL">كاملة</option>
                <option value="SUBTLE">هادئة</option>
                <option value="NONE">بدون حركة زخرفية</option>
              </select>
            </label>
            <Toggle label="رد الحضور" checked={draft.allowRsvp} onChange={(allowRsvp) => patch({ allowRsvp })} />
            <Toggle label="الرسائل" checked={draft.allowMessages} onChange={(allowMessages) => patch({ allowMessages })} />
            <Toggle label="إظهار الرسائل للضيوف" checked={draft.showGuestMessagesPublicly} onChange={(showGuestMessagesPublicly) => patch({ showGuestMessagesPublicly })} />
            <Toggle label="النقطة" checked={draft.allowGifts} onChange={(allowGifts) => patch({ allowGifts })} />
            <Toggle label="إظهار مبالغ النقطة للضيوف" checked={draft.showGiftAmounts} onChange={(showGiftAmounts) => patch({ showGiftAmounts })} />
          </div>
        )}

        {published && step === 4 && (
          <div className="mt-6 grid gap-4">
            <article className="panel">
              <h2 className="font-display text-4xl">الدعوة جاهزة</h2>
              <p className="mt-2 leading-7">رابط الإدارة هو مفتاح التعديل. احتفظ به، ومن يملكه يدير الدعوة.</p>
            </article>
            <LinkBox label="رابط الضيوف" value={`${origin}/invite/${published.slug}`} href={`/invite/${published.slug}`} />
            <LinkBox label="رابط الإدارة" value={`${origin}/manage/${published.managementToken}`} href={`/manage/${published.managementToken}`} />
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

        {step < 4 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => go(step - 1)}>
                السابق
              </button>
            )}
            {step < 3 && (
              <button type="button" className="btn btn-ink" onClick={() => go(step + 1)}>
                التالي
              </button>
            )}
            {step === 3 && (
              <button type="button" className="btn btn-gold" onClick={publish}>
                انشر الدعوة
              </button>
            )}
          </div>
        )}
      </main>
    </>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button type="button" className="panel flex items-center justify-between gap-4 text-start" onClick={() => onChange(!checked)}>
      <span>{label}</span>
      <span className={`nav-pill ${checked ? "is-on" : "bg-[#f3eee6]"}`}>{checked ? "يعمل" : "متوقف"}</span>
    </button>
  );
}

function LinkBox({ label, value, href }: { label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <article className="panel">
      <p className="text-sm text-[#6d5c4c]">{label}</p>
      <p className="mt-2 break-all text-sm" dir="ltr">
        {value}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={href} className="btn btn-ink">
          فتح
        </Link>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
        >
          {copied ? "تم النسخ" : "نسخ"}
        </button>
      </div>
    </article>
  );
}
