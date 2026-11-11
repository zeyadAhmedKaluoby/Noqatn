"use client";

import { useState } from "react";
import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { displayNames, formatDateTime } from "@/lib/format";
import { renderStoryImage } from "@/lib/story-image";
import type { GuestMessage } from "@/lib/types";

export default function MessagesPage() {
  const event = useManageEvent();
  const { store, setMessageStatus } = useStore();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ url: string; name: string; file: File } | null>(null);

  if (!event) return null;
  const rows = store.messages.filter((item) => item.eventSlug === event.slug);
  const couple = displayNames(event.details.honoreeNames);

  async function makeStory(item: GuestMessage) {
    setBusyId(item.id);
    try {
      const blob = await renderStoryImage({
        coupleNames: couple,
        guestName: item.guestName,
        message: item.message,
      });
      const file = new File([blob], `رسالة-${item.guestName}.png`, { type: "image/png" });
      const url = URL.createObjectURL(blob);
      if (preview?.url) URL.revokeObjectURL(preview.url);
      setPreview({ url, name: item.guestName, file });
    } finally {
      setBusyId(null);
    }
  }

  async function shareStory() {
    if (!preview) return;
    if (navigator.canShare?.({ files: [preview.file] })) {
      await navigator.share({ files: [preview.file], title: `رسالة ${preview.name}` });
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = preview.url;
    anchor.download = `رسالة ${preview.name}.png`;
    anchor.click();
  }

  if (rows.length === 0) {
    return <p className="panel text-[#6d5c4c]">لم تصل رسائل بعد.</p>;
  }

  return (
    <>
      <ul className="grid gap-3">
        {rows.map((item) => (
          <li key={item.id} className="panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-bold">{item.guestName}</p>
              <p className="text-sm text-[#6d5c4c]">{formatDateTime(item.createdAt)}</p>
            </div>
            <p className="mt-2 leading-8">{item.message}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setMessageStatus(item.id, item.status === "VISIBLE" ? "HIDDEN" : "VISIBLE")}
              >
                {item.status === "VISIBLE" ? "إخفاء عن الضيوف" : "إظهار للضيوف"}
              </button>
              <button
                type="button"
                className="btn btn-ink"
                disabled={busyId === item.id}
                onClick={() => void makeStory(item)}
              >
                {busyId === item.id ? "…" : "شير ستوري"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {preview ? (
        <div className="story-viewer" role="dialog" aria-modal="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview.url} alt={`ستوري من ${preview.name}`} />
          <div className="story-actions">
            <button type="button" className="btn btn-ink" onClick={() => void shareStory()}>
              شير على إنستجرام أو واتساب
            </button>
            <a className="btn btn-ghost" href={preview.url} download={`رسالة ${preview.name}.png`}>
              نزّل الصورة
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                URL.revokeObjectURL(preview.url);
                setPreview(null);
              }}
            >
              إغلاق
            </button>
          </div>
          <p className="story-hint">
            من قايمة الشير اختاروا إنستجرام (ستوري) أو واتساب (حالة). لو الشير مش متاح، نزّلوا الصورة
            وارفعوها يدوي.
          </p>
        </div>
      ) : null}
    </>
  );
}
