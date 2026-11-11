"use client";

import { useEffect, useState } from "react";
import { ToolShell } from "@/components/tools/shell";

const STYLES = [
  { id: "classic", label: "كلاسيك", invite: "layla-omar" },
  { id: "bismillah", label: "ظرف بسم الله", invite: "theme-bism" },
] as const;

export function CardTool() {
  const [style, setStyle] = useState<(typeof STYLES)[number]["id"]>("classic");
  const [origin, setOrigin] = useState("https://noqatni.app");
  const current = STYLES.find((item) => item.id === style) ?? STYLES[0];

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const inviteUrl = `${origin}/invite/${current.invite}`;
  const messageUrl = `${inviteUrl}#message`;
  const inviteQr = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(inviteUrl)}`;
  const tableQr = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(messageUrl)}`;

  return (
    <ToolShell
      title="كروت QR للطباعة"
      lead="كارتين بمقاس A6 بنفس تصميم دعوتكم: كارت للدعوة، وكارت على ترابيزات القاعة عشان المعازيم يمسحوا ويكتبوا تهنئتهم."
    >
      <div className="tabs" role="tablist">
        {STYLES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={style === item.id ? "on" : ""}
            onClick={() => setStyle(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="sides">
        <div className="side">
          <div className="qr-card">
            <p className="pair">نقطني</p>
            <p className="who">ليلى و عمر</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={inviteQr} alt="QR للدعوة" />
            <small>امسح وافتح الدعوة</small>
          </div>
          <b>كارت الدعوة</b>
          <small>الكود بيفتح الدعوة على طول، للي مش بيفتح لينكات واتساب</small>
        </div>
        <div className="side">
          <div className="qr-card alt">
            <p className="pair">اكتبولنا تهنئة</p>
            <p className="who">على الترابيزة</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tableQr} alt="QR للتهنئة" />
            <small>امسح واترك رسالة</small>
          </div>
          <b>كارت الترابيزات</b>
          <small>الكود بيفتح جزء التهنئة، والتهاني توصلكم على صفحتكم</small>
        </div>
      </div>

      <div className="steps">
        <div>
          <span>🍽</span>الكارت على الترابيزة
        </div>
        <div>
          <span>📱</span>الضيف يمسح الكود
        </div>
        <div>
          <span>💌</span>يكتب تهنئته
        </div>
        <div>
          <span>📋</span>كلها توصلكم
        </div>
      </div>

      <div className="note-box">
        <b>إزاي بتوصلكم:</b> بنعملكم الكارتين بأساميكم وتاريخ فرحكم وقاعتكم، بنفس ألوان دعوتكم، والكود
        بيتعمل للينك دعوتكم. بنبعتهم صور وPDF جاهزين للطباعة.
      </div>
    </ToolShell>
  );
}
