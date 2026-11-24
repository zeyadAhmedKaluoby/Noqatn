import Link from "next/link";
import { SITE } from "@/lib/site";

/** The bowl of ن, a crescent cupping its own dot. Shared with public/brand/logo.svg. */
export const NOON_BOWL_PATH =
  "M9 27C9 46 20 56 32 56C44 56 55 46 55 27C52 41.5 43 49.5 32 49.5C21 49.5 12 41.5 9 27Z";

/**
 * Noqatni mark: the letter ن whose dot (نقطة) is a wax seal.
 * The bowl takes `currentColor`, so it follows the surrounding ink.
 */
export function LogoMark({
  size = 44,
  seal = "#9b2236",
  className,
}: {
  size?: number;
  seal?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={{ flex: "none" }}
      aria-hidden
      focusable="false"
    >
      <path d={NOON_BOWL_PATH} fill="currentColor" />
      <circle cx="32" cy="25" r="9" fill={seal} />
      {size >= 32 ? (
        <>
          <circle cx="29" cy="22" r="3.6" fill="#fff" opacity="0.16" />
          <circle cx="32" cy="25" r="5.6" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="0.9" />
        </>
      ) : null}
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[#241910]">
      <LogoMark />
      <span className="font-display text-3xl leading-none">{SITE.brandAr}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm md:flex">
        <Link href="/#demos">النماذج</Link>
        <Link href="/#packages">الباكدجات</Link>
      </nav>
      <Link href="/order" className="btn btn-ink">
        اطلب دعوتك
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#eadfd2] px-6 py-10 text-sm text-[#6d5c4c]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="max-w-xl leading-7">
          © {new Date().getFullYear()} {SITE.brandAr}. دعوات أونلاين من مصر.
        </p>
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
          {SITE.instagramHandle}
        </a>
      </div>
    </footer>
  );
}
