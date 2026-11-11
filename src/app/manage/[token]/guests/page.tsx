"use client";

import { useMemo, useState } from "react";
import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { copyText, downloadCsv } from "@/lib/export";
import { displayNames, formatDateTime, formatNumber, RSVP_LABEL } from "@/lib/format";
import type { RsvpStatus } from "@/lib/types";

const filters: { id: "ALL" | RsvpStatus; label: string }[] = [
  { id: "ALL", label: "الكل" },
  { id: "ATTENDING", label: "سيحضر" },
  { id: "MAYBE", label: "ربما" },
  { id: "NOT_ATTENDING", label: "يعتذر" },
];

export default function GuestsPage() {
  const event = useManageEvent();
  const { store } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("ALL");
  const [toast, setToast] = useState("");

  const all = useMemo(() => {
    if (!event) return [];
    return store.rsvps.filter((item) => item.eventSlug === event.slug);
  }, [event, store.rsvps]);

  const rows = useMemo(() => {
    return all.filter((item) => {
      if (filter !== "ALL" && item.status !== filter) return false;
      const haystack = `${item.guestName} ${item.phone ?? ""} ${item.note ?? ""}`;
      return haystack.includes(query.trim());
    });
  }, [all, filter, query]);

  const kpis = useMemo(() => {
    const yes = all.filter((item) => item.status === "ATTENDING");
    const no = all.filter((item) => item.status === "NOT_ATTENDING");
    const people = yes.reduce((sum, item) => sum + item.numberOfGuests, 0);
    return { people, yes: yes.length, no: no.length };
  }, [all]);

  if (!event) return null;

  function flash(text: string) {
    setToast(text);
    window.setTimeout(() => setToast(""), 1800);
  }

  function exportExcel() {
    if (!event) return;
    downloadCsv(`ضيوف ${displayNames(event.details.honoreeNames)}`, [
      ["الاسم", "الحالة", "العدد", "الموبايل", "ملاحظة", "الوقت"],
      ...rows.map((item) => [
        item.guestName,
        RSVP_LABEL[item.status],
        String(item.numberOfGuests),
        item.phone ?? "",
        item.note ?? "",
        formatDateTime(item.createdAt),
      ]),
    ]);
    flash("اتنزّلت الليستة");
  }

  async function copyList() {
    const text = rows
      .map(
        (item) =>
          `${item.guestName} · ${RSVP_LABEL[item.status]} · ${item.numberOfGuests}${item.phone ? ` · ${item.phone}` : ""}`,
      )
      .join("\n");
    await copyText(text || "مفيش ضيوف");
    flash("اتنسخت الليستة");
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="panel text-center">
          <p className="font-display text-3xl">{formatNumber(kpis.people)}</p>
          <p className="text-sm text-[#6d5c4c]">فرد جاي</p>
        </div>
        <div className="panel text-center">
          <p className="font-display text-3xl">{formatNumber(kpis.yes)}</p>
          <p className="text-sm text-[#6d5c4c]">رد بـ«حاضر»</p>
        </div>
        <div className="panel text-center">
          <p className="font-display text-3xl">{formatNumber(kpis.no)}</p>
          <p className="text-sm text-[#6d5c4c]">اعتذر</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          className="field max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث بالاسم"
          aria-label="بحث"
        />
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-pill ${filter === item.id ? "is-on" : "bg-white"}`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-ink" onClick={exportExcel} disabled={!rows.length}>
          نزّلوا الليستة Excel
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => void copyList()} disabled={!rows.length}>
          انسخوا الليستة
        </button>
        <a className="btn btn-ghost" href="/links">
          لينكات باسم كل ضيف
        </a>
      </div>

      {toast ? <p className="text-sm text-[#8c6f38]">{toast}</p> : null}

      {rows.length === 0 ? (
        <p className="panel text-[#6d5c4c]">لا يوجد ضيوف في هذا العرض.</p>
      ) : (
        <div className="table-wrap panel">
          <table className="data">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الحالة</th>
                <th>العدد</th>
                <th>الموبايل</th>
                <th>ملاحظة</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td>{item.guestName}</td>
                  <td>{RSVP_LABEL[item.status]}</td>
                  <td>{formatNumber(item.numberOfGuests)}</td>
                  <td dir="ltr">{item.phone || "—"}</td>
                  <td>{item.note || "—"}</td>
                  <td>{formatDateTime(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
