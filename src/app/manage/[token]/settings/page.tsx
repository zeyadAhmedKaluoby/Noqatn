"use client";

import { useState } from "react";
import { PhotoField } from "@/components/invitation/photo";
import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { eventTitle, honoreeLabel, parseSchedule } from "@/lib/format";
import { isOccasionPhoto, OCCASION_PHOTOS } from "@/lib/photos";
import { getSong, SONGS } from "@/lib/songs";
import { EVENT_TYPES, templatesFor } from "@/lib/templates";
import type { AnimationLevel, EventType, InvitationEvent, SongId } from "@/lib/types";

export default function SettingsPage() {
  const event = useManageEvent();
  if (!event) return null;
  return <SettingsForm key={event.updatedAt} event={event} />;
}

function SettingsForm({ event }: { event: InvitationEvent }) {
  const { saveEvent } = useStore();
  const [draft, setDraft] = useState(event);
  const [schedule, setSchedule] = useState(
    event.details.schedule.map((item) => (item.time ? `${item.time} | ${item.label}` : item.label)).join("\n"),
  );
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const choices = templatesFor(draft.type);
  const couple = draft.type === "WEDDING" || draft.type === "ENGAGEMENT";

  function patch(partial: Partial<InvitationEvent>) {
    setDraft((current) => ({ ...current, ...partial }));
    setSaved(false);
    setError("");
  }

  function save() {
    const names = draft.details.honoreeNames.map((name) => name.trim()).filter(Boolean);
    if (names.length === 0 || (couple && names.length < 2)) {
      setError(couple ? "اكتب الاسمين." : `اكتب ${honoreeLabel(draft.type)}.`);
      return;
    }
    const next: InvitationEvent = {
      ...draft,
      title: eventTitle(draft.type, names),
      details: {
        ...draft.details,
        honoreeNames: names,
        hosts: draft.details.hosts.map((host) => host.trim()).filter(Boolean),
        schedule: parseSchedule(schedule),
      },
      templateKey: choices.some((item) => item.key === draft.templateKey) ? draft.templateKey : choices[0].key,
      design: {
        ...draft.design,
        song: getSong(draft.design.song, draft.type).id,
      },
      updatedAt: new Date().toISOString(),
    };
    saveEvent(next);
    setSaved(true);
  }

  return (
    <div className="grid max-w-2xl gap-4">
      <label className="grid gap-2 text-sm">
        نوع المناسبة
        <select
          className="field"
          value={draft.type}
          onChange={(e) => {
            const type = e.target.value as EventType;
            const allowed = templatesFor(type);
            const currentPhoto = draft.details.photo;
            const photo =
              currentPhoto === undefined || (currentPhoto !== "" && isOccasionPhoto(currentPhoto))
                ? OCCASION_PHOTOS[type].src
                : currentPhoto;
            patch({
              type,
              templateKey: allowed.some((item) => item.key === draft.templateKey) ? draft.templateKey : allowed[0].key,
              details: { ...draft.details, photo },
            });
          }}
        >
          {(Object.keys(EVENT_TYPES) as EventType[]).map((type) => (
            <option key={type} value={type}>
              {EVENT_TYPES[type].label}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        القالب
        <select className="field" value={draft.templateKey} onChange={(e) => patch({ templateKey: e.target.value as InvitationEvent["templateKey"] })}>
          {choices.map((template) => (
            <option key={template.key} value={template.key}>
              {template.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        {couple ? "الاسماء مفصولة بسطر" : honoreeLabel(draft.type)}
        <textarea
          className="field min-h-20"
          value={draft.details.honoreeNames.join("\n")}
          onChange={(e) =>
            patch({
              details: {
                ...draft.details,
                honoreeNames: e.target.value.split("\n"),
              },
            })
          }
        />
      </label>
      <label className="grid gap-2 text-sm">
        أصحاب الدعوة، سطر لكل اسم
        <textarea
          className="field min-h-20"
          value={draft.details.hosts.join("\n")}
          onChange={(e) => patch({ details: { ...draft.details, hosts: e.target.value.split("\n") } })}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          التاريخ
          <input className="field" type="date" value={draft.details.date} onChange={(e) => patch({ details: { ...draft.details, date: e.target.value } })} />
        </label>
        <label className="grid gap-2 text-sm">
          الوقت
          <input className="field" type="time" value={draft.details.startTime} onChange={(e) => patch({ details: { ...draft.details, startTime: e.target.value } })} />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        المكان
        <input className="field" value={draft.details.venueName} onChange={(e) => patch({ details: { ...draft.details, venueName: e.target.value } })} />
      </label>
      <label className="grid gap-2 text-sm">
        العنوان
        <input className="field" value={draft.details.address} onChange={(e) => patch({ details: { ...draft.details, address: e.target.value } })} />
      </label>
      <label className="grid gap-2 text-sm">
        رابط الخريطة
        <input className="field" dir="ltr" value={draft.details.googleMapsUrl ?? ""} onChange={(e) => patch({ details: { ...draft.details, googleMapsUrl: e.target.value } })} />
      </label>
      <PhotoField
        type={draft.type}
        value={draft.details.photo ?? OCCASION_PHOTOS[draft.type].src}
        onChange={(photo) => patch({ details: { ...draft.details, photo } })}
      />
      <label className="grid gap-2 text-sm">
        نص الدعوة
        <textarea className="field min-h-28" value={draft.details.wording} onChange={(e) => patch({ details: { ...draft.details, wording: e.target.value } })} />
      </label>
      <label className="grid gap-2 text-sm">
        البرنامج
        <textarea className="field min-h-24" value={schedule} onChange={(e) => { setSchedule(e.target.value); setSaved(false); }} />
      </label>
      <label className="grid gap-2 text-sm">
        الحركة
        <select className="field" value={draft.design.animationLevel} onChange={(e) => patch({ design: { ...draft.design, animationLevel: e.target.value as AnimationLevel } })}>
          <option value="FULL">كاملة</option>
          <option value="SUBTLE">هادئة</option>
          <option value="NONE">بدون</option>
        </select>
      </label>
      <Check label="أغنية" checked={draft.design.music} onChange={(music) => patch({ design: { ...draft.design, music } })} />
      <label className="grid gap-2 text-sm">
        الأغنية
        <select
          className="field"
          value={getSong(draft.design.song, draft.type).id}
          onChange={(e) => patch({ design: { ...draft.design, song: e.target.value as SongId } })}
        >
          {SONGS.map((song) => (
            <option key={song.id} value={song.id}>
              {song.title}
            </option>
          ))}
        </select>
      </label>
      <Check label="رد الحضور" checked={draft.settings.allowRsvp} onChange={(allowRsvp) => patch({ settings: { ...draft.settings, allowRsvp } })} />
      <Check label="الرسائل" checked={draft.settings.allowMessages} onChange={(allowMessages) => patch({ settings: { ...draft.settings, allowMessages } })} />
      <Check label="إظهار الرسائل" checked={draft.settings.showGuestMessagesPublicly} onChange={(showGuestMessagesPublicly) => patch({ settings: { ...draft.settings, showGuestMessagesPublicly } })} />
      <Check label="النقطة" checked={draft.settings.allowGifts} onChange={(allowGifts) => patch({ settings: { ...draft.settings, allowGifts } })} />
      <Check label="إظهار المبالغ للضيوف" checked={draft.settings.showGiftAmounts} onChange={(showGiftAmounts) => patch({ settings: { ...draft.settings, showGiftAmounts } })} />
      <label className="grid gap-2 text-sm">
        الحالة
        <select className="field" value={draft.status} onChange={(e) => patch({ status: e.target.value as InvitationEvent["status"] })}>
          <option value="PUBLISHED">منشورة</option>
          <option value="DRAFT">مسودة</option>
        </select>
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex items-center gap-3">
        <button type="button" className="btn btn-ink" onClick={save}>
          حفظ التعديل
        </button>
        {saved && <p className="text-sm text-[#3e5344]">تم الحفظ في هذا المتصفح.</p>}
      </div>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="panel flex items-center justify-between gap-3">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
