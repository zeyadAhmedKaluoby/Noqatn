"use client";

import { CopyLink, Stat, useManageEvent } from "@/components/manage/shell";
import { useStore } from "@/components/store";
import { formatDateTime, formatEgp, formatNumber, RSVP_LABEL } from "@/lib/format";

export default function ManageOverviewPage() {
  const event = useManageEvent();
  const { store } = useStore();
  if (!event) return null;

  const rsvps = store.rsvps.filter((item) => item.eventSlug === event.slug);
  const messages = store.messages.filter((item) => item.eventSlug === event.slug);
  const gifts = store.gifts.filter((item) => item.eventSlug === event.slug);
  const attending = rsvps.filter((item) => item.status === "ATTENDING");
  const seats = attending.reduce((sum, item) => sum + item.numberOfGuests, 0);
  const collected = gifts
    .filter((item) => item.status === "SUCCESS")
    .reduce((sum, item) => sum + item.amountPiastres, 0);
  const pending = gifts
    .filter((item) => item.status === "PENDING")
    .reduce((sum, item) => sum + item.amountPiastres, 0);
  const visits = store.visits[event.slug] ?? { views: 0, sessions: 0 };

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="مرات فتح الدعوة" value={formatNumber(visits.views)} hint="كل فتح للصفحة يُحسب مرة." />
        <Stat label="زوار تقريبيون" value={formatNumber(visits.sessions)} hint="جلسة متصفح واحدة تُحسب زائراً." />
        <Stat label="سيأتون" value={formatNumber(attending.length)} hint="عدد الردود بالموافقة، لا يشمل المعتذرين." />
        <Stat label="إجمالي المقاعد" value={formatNumber(seats)} hint="مجموع عدد الأشخاص في ردود الحضور." />
        <Stat label="الرسائل" value={formatNumber(messages.length)} />
        <Stat label="نقطة محصّلة" value={formatEgp(collected)} hint="المدفوعات المعلّقة غير داخلة." />
        <Stat label="قيد الدفع" value={formatEgp(pending)} hint="لم يُحسب ضمن المحصّل." />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <CopyLink label="رابط الضيوف" path={`/invite/${event.slug}`} />
        <CopyLink label="رابط الإدارة" path={`/manage/${event.managementToken}`} />
      </div>
      <p className="text-sm leading-7 text-[#6d5c4c]">
        رابط الإدارة مفتاح الدعوة. لا تشاركه مع الضيوف. النقطة في هذه النسخة محاكاة ولا يوجد خصم حقيقي.
      </p>
      <section className="panel">
        <h2 className="text-lg font-bold">آخر الردود</h2>
        {rsvps.length === 0 ? (
          <p className="mt-3 text-[#6d5c4c]">لا ردود بعد.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {rsvps.slice(0, 4).map((item) => (
              <li key={item.id} className="flex flex-wrap justify-between gap-2 border-b border-[#eadfd2] py-2">
                <span>{item.guestName}</span>
                <span className="text-[#6d5c4c]">
                  {RSVP_LABEL[item.status]} · {formatDateTime(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
