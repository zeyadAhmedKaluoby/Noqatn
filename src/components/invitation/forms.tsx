"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/store";
import { formatDateTime, formatEgp, RSVP_LABEL, uid } from "@/lib/format";
import type { InvitationEvent, RsvpStatus } from "@/lib/types";

const PRESETS = [20000, 50000, 100000, 200000];

export function RsvpForm({ event, defaultName = "" }: { event: InvitationEvent; defaultName?: string }) {
  const { addRsvp } = useStore();
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<RsvpStatus>("ATTENDING");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    if (name.trim().length < 2) {
      setError("اكتب اسمك حتى نعرف من سيحضر.");
      return;
    }
    addRsvp({
      id: uid("rsvp"),
      eventSlug: event.slug,
      guestName: name.trim(),
      phone: phone.trim() || undefined,
      status,
      numberOfGuests: status === "NOT_ATTENDING" ? 0 : Math.min(20, Math.max(1, guests)),
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    });
    setDone(true);
    setError("");
  }

  if (done) {
    return <p className="text-center leading-7">وصل ردك. شكراً لأنك أخبرتنا.</p>;
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك" aria-label="اسمك" />
      <input className="field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="الموبايل، إن رغبت" aria-label="الموبايل" inputMode="tel" />
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(RSVP_LABEL) as RsvpStatus[]).map((value) => (
          <label key={value} className={`choice ${status === value ? "is-on" : ""}`}>
            <input type="radio" name="rsvp" checked={status === value} onChange={() => setStatus(value)} />
            {RSVP_LABEL[value]}
          </label>
        ))}
      </div>
      {status !== "NOT_ATTENDING" && (
        <label className="grid gap-1 text-sm">
          عدد الأشخاص
          <input className="field" type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
        </label>
      )}
      <textarea className="field min-h-20" value={note} onChange={(e) => setNote(e.target.value)} placeholder="ملاحظة قصيرة" aria-label="ملاحظة" />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="submit-btn" type="submit">
        أرسل الرد
      </button>
    </form>
  );
}

export function MessageForm({ event }: { event: InvitationEvent }) {
  const { store, addMessage } = useStore();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const visible = store.messages.filter(
    (item) => item.eventSlug === event.slug && item.status === "VISIBLE",
  );

  function submit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    if (name.trim().length < 2 || message.trim().length < 2) {
      setError("الاسم والرسالة مطلوبان.");
      return;
    }
    addMessage({
      id: uid("msg"),
      eventSlug: event.slug,
      guestName: name.trim(),
      message: message.trim(),
      status: "VISIBLE",
      createdAt: new Date().toISOString(),
    });
    setName("");
    setMessage("");
    setError("");
  }

  return (
    <div className="grid gap-4">
      {event.settings.showGuestMessagesPublicly && visible.length > 0 && (
        <ul className="grid gap-3">
          {visible.map((item) => (
            <li key={item.id} className="rounded-2xl bg-white/50 px-3 py-3">
              <p className="font-bold">{item.guestName}</p>
              <p className="mt-1 leading-7">{item.message}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{formatDateTime(item.createdAt)}</p>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={submit} className="grid gap-3">
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك" aria-label="اسمك" />
        <textarea className="field min-h-24" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="كلمتك للعروسين أو لأهل الفرح" aria-label="الرسالة" />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button className="submit-btn" type="submit">
          أرسل الرسالة
        </button>
      </form>
    </div>
  );
}

export function GiftForm({ event }: { event: InvitationEvent }) {
  const { store, addGift } = useStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [preset, setPreset] = useState(50000);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState("");

  function amount() {
    if (custom.trim()) {
      const pounds = Number(custom);
      if (!Number.isFinite(pounds)) return 0;
      return Math.round(pounds * 100);
    }
    return preset;
  }

  function submit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    const piastres = amount();
    if (name.trim().length < 2) {
      setError("اكتب اسمك على النقطة.");
      return;
    }
    if (piastres < 1000 || piastres > 10_000_000) {
      setError("المبلغ بين ١٠ و ١٠٠٬٠٠٠ جنيه.");
      return;
    }
    addGift({
      id: uid("gift"),
      eventSlug: event.slug,
      guestName: name.trim(),
      message: note.trim() || undefined,
      amountPiastres: piastres,
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
      simulated: true,
    });
    router.push(`/payment/return?status=success&slug=${event.slug}&amount=${piastres}`);
  }

  const visibleGifts = event.settings.showGiftAmounts
    ? store.gifts.filter((item) => item.eventSlug === event.slug && item.status === "SUCCESS")
    : [];

  return (
    <form onSubmit={submit} className="grid gap-3">
      {visibleGifts.length > 0 && (
        <ul className="grid gap-2 text-sm">
          {visibleGifts.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span>{item.guestName}</span>
              <span>{formatEgp(item.amountPiastres)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm leading-7 text-[var(--muted)]">
        هذه محاكاة. لن يُخصم مبلغ حقيقي، وتظهر النقطة في لوحة صاحب الدعوة كتحصيل تجريبي.
      </p>
      <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك" aria-label="اسمك" />
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            className={`choice ${!custom && preset === value ? "is-on" : ""}`}
            onClick={() => {
              setPreset(value);
              setCustom("");
            }}
          >
            {formatEgp(value)}
          </button>
        ))}
      </div>
      <input
        className="field"
        inputMode="decimal"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        placeholder="أو مبلغ آخر بالجنيه"
        aria-label="مبلغ آخر"
      />
      <textarea className="field min-h-20" value={note} onChange={(e) => setNote(e.target.value)} placeholder="كلمة مع النقطة" aria-label="كلمة مع النقطة" />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="submit-btn" type="submit">
        ابعث النقطة
      </button>
    </form>
  );
}
