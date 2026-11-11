"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site";
import { formatEgp } from "@/lib/format";

export function PaymentResult() {
  const params = useSearchParams();
  const status = params.get("status");
  const slug = params.get("slug");
  const amount = Number(params.get("amount") || 0);
  const success = status === "success" && Number.isFinite(amount) && amount > 0;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 py-16 text-center">
        <div>
          <p className="kicker">النقطة</p>
          <h1 className="font-display mt-3 text-5xl">{success ? "وصلت نقطتك" : "لم تكتمل النقطة"}</h1>
          <p className="mt-4 leading-8 text-[#5c4d40]">
            {success
              ? `سُجّلت ${formatEgp(amount)} كتحصيل تجريبي. لم يُخصم أي مبلغ من بطاقة أو محفظة.`
              : "لم نجد عملية مكتملة. يمكنك العودة إلى الدعوة والمحاولة من جديد."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {slug && (
              <Link href={`/invite/${slug}`} className="btn btn-ink">
                العودة للدعوة
              </Link>
            )}
            <Link href="/" className="btn btn-ghost">
              الرئيسية
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
