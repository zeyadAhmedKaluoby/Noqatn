import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/site";
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
            <LogoMark size={36} />
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
