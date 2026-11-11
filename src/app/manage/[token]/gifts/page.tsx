"use client";

import { useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { formatDateTime, formatEgp, GIFT_LABEL } from "@/lib/format";

export default function GiftsPage() {
  const event = useManageEvent();
  const { store } = useStore();
  if (!event) return null;
  const rows = store.gifts.filter((item) => item.eventSlug === event.slug);
  const collected = rows.filter((item) => item.status === "SUCCESS").reduce((sum, item) => sum + item.amountPiastres, 0);
  const pending = rows.filter((item) => item.status === "PENDING").reduce((sum, item) => sum + item.amountPiastres, 0);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="panel">
          <p className="text-sm text-[#6d5c4c]">محصّل</p>
          <p className="font-display mt-2 text-4xl">{formatEgp(collected)}</p>
        </article>
        <article className="panel">
          <p className="text-sm text-[#6d5c4c]">قيد الدفع</p>
          <p className="font-display mt-2 text-4xl">{formatEgp(pending)}</p>
        </article>
      </div>
      {rows.length === 0 ? (
        <p className="panel text-[#6d5c4c]">لا نقاط بعد.</p>
      ) : (
        <div className="table-wrap panel">
          <table className="data">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>المبلغ</th>
                <th>الحالة</th>
                <th>ملاحظة</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td>{item.guestName}</td>
                  <td>{formatEgp(item.amountPiastres)}</td>
                  <td>
                    {GIFT_LABEL[item.status]}
                    {item.simulated ? " · تجريبي" : ""}
                  </td>
                  <td>{item.message || "—"}</td>
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
