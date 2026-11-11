"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { OCCASION_PHOTOS, photoAlt, readPhotoFile, resolvePhoto } from "@/lib/photos";
import type { EventType, InvitationEvent } from "@/lib/types";

export function InvitePhoto({ event }: { event: InvitationEvent }) {
  const src = resolvePhoto(event);
  if (!src) return null;

  const alt = photoAlt(event, src);
  const className = "aspect-[4/3] w-full rounded-[1.6rem] object-cover shadow-[0_16px_40px_rgba(40,24,8,0.12)]";

  return (
    <figure className="px-6 pt-14">
      {src.startsWith("data:") ? (
        // Uploaded photos are stored in this browser, so they are not a remote image URL.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} />
      ) : (
        <Image src={src} alt={alt} width={1200} height={900} className={className} />
      )}
    </figure>
  );
}

export function PhotoField({
  type,
  value,
  onChange,
}: {
  type: EventType;
  value: string;
  onChange: (photo: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const preview = value === "" ? "" : value || OCCASION_PHOTOS[type].src;

  async function choose(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("اختر ملف صورة.");
      return;
    }
    if (file.size > 8_000_000) {
      setError("الصورة أكبر من ٨ ميجا.");
      return;
    }
    try {
      onChange(await readPhotoFile(file));
      setError("");
    } catch {
      setError("تعذرت قراءة الصورة. جرّب ملفاً آخر.");
    }
  }

  return (
    <div className="grid gap-3 text-sm">
      <span>صورة الدعوة</span>
      {preview ? (
        preview.startsWith("data:") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="الصورة المختارة"
            className="aspect-[4/3] w-full max-w-sm rounded-2xl object-cover"
          />
        ) : (
          <Image
            src={preview}
            alt={preview === OCCASION_PHOTOS[type].src ? OCCASION_PHOTOS[type].alt : "الصورة المختارة"}
            width={960}
            height={720}
            className="aspect-[4/3] w-full max-w-sm rounded-2xl object-cover"
          />
        )
      ) : (
        <p className="text-[#6d5c4c]">الدعوة بلا صورة.</p>
      )}
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          void choose(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => input.current?.click()}>
          ارفع صورة
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onChange(OCCASION_PHOTOS[type].src)}>
          صورة المناسبة
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onChange("")}>
          بدون صورة
        </button>
      </div>
      {error && <p className="text-[#8d4d5b]">{error}</p>}
    </div>
  );
}
