"use client";

import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { formatDateTime } from "@/lib/format";

export default function MessagesPage() {
  const event = useManageEvent();
  const { store, setMessageStatus } = useStore();
  if (!event) return null;
  const rows = store.messages.filter((item) => item.eventSlug === event.slug);

  if (rows.length === 0) {
    return <p className="panel text-[#6d5c4c]">لم تصل رسائل بعد.</p>;
  }

  return (
    <ul className="grid gap-3">
      {rows.map((item) => (
        <li key={item.id} className="panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-bold">{item.guestName}</p>
            <p className="text-sm text-[#6d5c4c]">{formatDateTime(item.createdAt)}</p>
          </div>
          <p className="mt-2 leading-8">{item.message}</p>
          <button
            type="button"
            className="btn btn-ghost mt-3"
            onClick={() => setMessageStatus(item.id, item.status === "VISIBLE" ? "HIDDEN" : "VISIBLE")}
          >
            {item.status === "VISIBLE" ? "إخفاء عن الضيوف" : "إظهار للضيوف"}
          </button>
        </li>
      ))}
    </ul>
  );
}
