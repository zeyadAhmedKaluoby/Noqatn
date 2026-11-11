"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/shell";

const PHOTOS = [
  { src: "/images/occasion-wedding.jpg", alt: "جلسة تصوير الزفاف" },
  { src: "/images/occasion-engagement.jpg", alt: "الخطوبة" },
  { src: "/images/flow-opening.jpg", alt: "لحظة الافتتاح" },
  { src: "/images/flow-details.jpg", alt: "تفاصيل اليوم" },
  { src: "/images/flow-petals.jpg", alt: "بتلات" },
  { src: "/images/occasion-birthday.jpg", alt: "احتفال" },
];

export function PhotosTool() {
  const [active, setActive] = useState<(typeof PHOTOS)[number] | null>(null);

  return (
    <ToolShell
      title="صور الفرح"
      lead="اليوم كان أحلى بيكم. دي صفحة ديمو لألبوم بعد المناسبة — في الدعوة الحقيقية الزرار بيفتح ألبوم مشترك بتاع العرسان."
    >
      <section className="thanks">
        <p>ضيفوا صوركم في الألبوم عشان نفضل فاكرين اليوم من كل زاوية.</p>
      </section>

      <div className="actions">
        <a className="btn solid" href="/order">
          اطلبوا صفحة صور لفرحكم
        </a>
        <a className="btn" href="#wall">
          شوفوا الألبوم
        </a>
      </div>

      <div className="head-row">
        <h2>صور الفرح</h2>
        <span>{PHOTOS.length} صور</span>
      </div>

      <div className="wall" id="wall">
        {PHOTOS.map((photo) => (
          <button key={photo.src} type="button" onClick={() => setActive(photo)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} />
          </button>
        ))}
      </div>

      <p className="sign">
        دي صفحة ديمو من نقطني. في الصفحة الحقيقية بنربط ألبوم Google Photos أو رفع صور مخصوص.
      </p>

      {active ? (
        <div className="viewer" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={active.src} alt={active.alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="close" aria-label="إغلاق" onClick={() => setActive(null)}>
            ✕
          </button>
        </div>
      ) : null}
    </ToolShell>
  );
}
