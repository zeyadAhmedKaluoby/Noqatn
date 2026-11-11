import { Suspense } from "react";
import type { Metadata } from "next";
import { PaymentResult } from "@/components/payment/result";

export const metadata: Metadata = {
  title: "نتيجة النقطة",
};

export const instant = false;

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={<main className="grid min-h-svh place-items-center">جارٍ التأكيد…</main>}>
      <PaymentResult />
    </Suspense>
  );
}
