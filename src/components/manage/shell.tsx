"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site";
import { useStore } from "@/components/store";
import type { InvitationEvent } from "@/lib/types";

const ManageContext = createContext<InvitationEvent | null>(null);

export function useManageEvent() {
  return useContext(ManageContext);
}

export function ManageShell({ token, children }: { token: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const { store, ready } = useStore();
  const event = store.events.find((item) => item.managementToken === token) ?? null;

  if (!ready) {
    return <main className="grid min-h-svh place-items-center">جارٍ فتح لوحة الدعوة…</main>;
  }

  if (!event) {
    return (
      <main className="grid min-h-svh place-items-center px-6 text-center">
        <div>
          <p className="kicker">نقطني</p>
          <h1 className="font-display mt-3 text-4xl">رابط الإدارة غير معروف</h1>
          <Link href="/" className="btn btn-ink mt-6">
            الرئيسية
          </Link>
        </div>
      </main>
    );
  }

  const base = `/manage/${token}`;
  const links = [
    { href: base, label: "نظرة عامة", exact: true },
    { href: `${base}/guests`, label: "الحضور" },
    { href: `${base}/messages`, label: "الرسائل" },
    { href: `${base}/gifts`, label: "النقطة" },
    { href: `${base}/settings`, label: "الإعدادات" },
  ];

  return (
    <ManageContext.Provider value={event}>
      <div className="mx-auto min-h-svh max-w-6xl px-4 py-4 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <Link href={`/invite/${event.slug}`} className="btn btn-ghost">
            فتح الدعوة
          </Link>
        </header>
        <div className="mt-6">
          <p className="text-sm text-[#6d5c4c]">إدارة</p>
          <h1 className="font-display text-4xl">{event.title}</h1>
        </div>
        <nav className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {links.map((link) => {
            const on = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={`nav-pill ${on ? "is-on" : "bg-white"}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="py-6">{children}</div>
      </div>
    </ManageContext.Provider>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <article className="panel">
      <p className="text-sm text-[#6d5c4c]">{label}</p>
      <p className="font-display mt-2 text-4xl">{value}</p>
      {hint && <p className="mt-2 text-xs leading-6 text-[#8a7766]">{hint}</p>}
    </article>
  );
}

function originSnapshot() {
  return window.location.origin;
}

function originServer() {
  return "";
}

function originSubscribe() {
  return () => {};
}

export function CopyLink({ label, path }: { label: string; path: string }) {
  const origin = useSyncExternalStore(originSubscribe, originSnapshot, originServer);
  const [copied, setCopied] = useState(false);
  const value = `${origin}${path}`;

  return (
    <article className="panel">
      <p className="text-sm text-[#6d5c4c]">{label}</p>
      <p className="mt-2 break-all text-sm" dir="ltr">
        {value}
      </p>
      <button
        type="button"
        className="btn btn-ghost mt-3"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        }}
      >
        {copied ? "تم النسخ" : "نسخ الرابط"}
      </button>
    </article>
  );
}
