import type { ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function ToolShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="tool-page">
      <div className="wrap">
        <header className="tool-top">
          <Link className="logo" href="/" aria-label={SITE.brandEn}>
            <svg viewBox="0 0 64 44" aria-hidden>
              <path
                d="M3 4 L32 30 L61 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="30" r="11" fill="#a3253a" />
            </svg>
            <span className="a">{SITE.brandAr}</span>
            <span className="e">{SITE.brandEn}</span>
          </Link>
          <Link className="back" href="/#packages">
            الباكدجات ←
          </Link>
        </header>
        <div>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
