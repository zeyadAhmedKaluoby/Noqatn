"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { InvitationView } from "@/components/invitation/InvitationView";
import { useStore } from "@/components/store";
import { getTemplate } from "@/lib/templates";

export function InvitationScreen({ slug }: { slug: string }) {
  const { store, ready, bumpVisit } = useStore();
  const event = store.events.find((item) => item.slug === slug);
  const counted = useRef(false);

  useEffect(() => {
    if (!ready || !event || counted.current) return;
    counted.current = true;
    const recentKey = `noqatni-view:${slug}`;
    const last = Number(sessionStorage.getItem(recentKey) || 0);
    const now = Date.now();
    if (now - last < 1200) return;
    sessionStorage.setItem(recentKey, String(now));
    const sessionKey = `noqatni-session:${slug}`;
    const newSession = !sessionStorage.getItem(sessionKey);
    if (newSession) sessionStorage.setItem(sessionKey, "1");
    bumpVisit(slug, newSession);
  }, [ready, event, slug, bumpVisit]);

  if (!event && !ready) {
    return <main className="grid min-h-svh place-items-center">جارٍ فتح الدعوة…</main>;
  }

  if (!event) {
    return (
      <main className="grid min-h-svh place-items-center px-6 text-center">
        <div>
          <p className="kicker">نقطني</p>
          <h1 className="font-display mt-3 text-4xl">هذه الدعوة غير موجودة</h1>
          <Link href="/" className="btn btn-ink mt-6">
            العودة للرئيسية
          </Link>
        </div>
      </main>
    );
  }

  return <InvitationView event={event} template={getTemplate(event.templateKey)} />;
}
