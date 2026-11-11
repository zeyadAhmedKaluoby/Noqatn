import Link from "next/link";
import { Logo } from "@/components/site";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div className="grid justify-items-center">
        <Logo />
        <h1 className="font-display mt-3 text-4xl">هذه الصفحة غير موجودة</h1>
        <Link href="/" className="btn btn-ink mt-6">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
