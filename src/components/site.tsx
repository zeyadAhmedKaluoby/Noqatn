import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <Image
      src="/brand/logo.png"
      alt=""
      width={size}
      height={size}
      priority={size >= 40}
      className={`rounded-full object-cover ${size >= 40 ? "shadow-[0_6px_16px_rgba(154,115,68,0.28)]" : ""}`}
      style={{ width: size, height: size }}
    />
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
