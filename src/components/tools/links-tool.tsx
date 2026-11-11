"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/shell";
import { copyText } from "@/lib/export";

type GuestRow = { name: string; phone: string; link: string };

function parseGuests(text: string, base: string): GuestRow[] {
  const cleanBase = base.trim().replace(/[?#].*$/, "").replace(/\/$/, "");
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[،,]/);
      let phone = (parts.length > 1 ? parts[parts.length - 1] : "").replace(/\D/g, "");
      const name = (phone ? parts.slice(0, -1).join("،") : line).trim();
      if (phone.startsWith("01")) phone = `2${phone}`;
      return {
        name,
        phone,
        link: `${cleanBase}?to=${encodeURIComponent(name)}`,
      };
    })
    .filter((row) => row.name);
}

export function LinksTool() {
  const [base, setBase] = useState("https://noqatni.app/invite/layla-omar");
  const [names, setNames] = useState("أحمد\nمنى وكريم\nعائلة الأستاذ سامي، 01012345678");
  const [msg, setMsg] = useState("أهلاً {اسم} 💌\nيسعدنا حضورك فرحنا. دي دعوتك:\n{لينك}");
  const [toast, setToast] = useState("");

  const rows = useMemo(() => parseGuests(names, base), [names, base]);

  function flash(text: string) {
    setToast(text);
    window.setTimeout(() => setToast(""), 1800);
  }

  async function copyAll() {
    const text = rows.map((row) => `${row.name}\t${row.link}`).join("\n");
    await copyText(text);
    flash("اتنسخت كل اللينكات");
  }

  function waHref(row: GuestRow) {
      const body = msg.split("{اسم}").join(row.name).split("{لينك}").join(row.link);
    const phone = row.phone || "";
    return phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(body)}`
      : `https://wa.me/?text=${encodeURIComponent(body)}`;
  }

  return (
    <ToolShell
      title="لينكات الضيوف"
      lead="الصق أسماء الضيوف، اسم في كل سطر، وهتاخد لكل ضيف لينك باسمه، وزرار يبعتله الدعوة على الواتساب. الأداة دي بتشتغل على جهازك بس."
    >
      <div className="box">
        <label>
          لينك الدعوة
          <small>اللينك اللي هيتبعت، من غير أي حاجة بعد الاسم</small>
          <input dir="ltr" value={base} onChange={(e) => setBase(e.target.value)} />
        </label>
        <label>
          أسماء الضيوف
          <small>اسم في كل سطر. ولو عايز تحط الرقم: أحمد، 01012345678</small>
          <textarea value={names} onChange={(e) => setNames(e.target.value)} />
        </label>
        <label>
          رسالة الواتساب
          <small>كلمة {"{اسم}"} هتتبدل باسم الضيف، و{"{لينك}"} باللينك بتاعه</small>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} style={{ minHeight: 90 }} />
        </label>
      </div>

      <div className="box">
        <div className="bar">
          <span>{rows.length} ضيف</span>
          <button className="btn" type="button" onClick={() => void copyAll()} disabled={!rows.length}>
            انسخ كل اللينكات
          </button>
        </div>
        <div className="scroll">
          <table>
            <thead>
              <tr>
                <th>الضيف</th>
                <th>اللينك</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="empty">
                    اكتب أسماء الضيوف فوق
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={`${row.name}-${row.link}`}>
                    <td>{row.name}</td>
                    <td className="link">{row.link}</td>
                    <td className="acts">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => void copyText(row.link).then(() => flash("اتنسخ اللينك"))}
                      >
                        نسخ
                      </button>
                      <a className="btn wa" href={waHref(row)} target="_blank" rel="noopener noreferrer">
                        واتساب
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {toast ? <p className="toast">{toast}</p> : null}
    </ToolShell>
  );
}
