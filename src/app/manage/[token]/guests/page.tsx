"use client";

import { useMemo, useState } from "react";
import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { formatDateTime, formatNumber, RSVP_LABEL } from "@/lib/format";
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
  const rows = useMemo(() => {
    if (!event) return [];
    return store.rsvps.filter((item) => {
      if (item.eventSlug !== event.slug) return false;
      if (filter !== "ALL" && item.status !== filter) return false;
      const haystack = `${item.guestName} ${item.phone ?? ""} ${item.note ?? ""}`;
      return haystack.includes(query.trim());
    });
  }, [event, filter, query, store.rsvps]);

  if (!event) return null;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <input className="field max-w-xs" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث بالاسم" aria-label="بحث" />
        {filters.map((item) => (
          <button key={item.id} type="button" className={`nav-pill ${filter === item.id ? "is-on" : "bg-white"}`} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
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
