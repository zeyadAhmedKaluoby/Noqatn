import type { Metadata } from "next";
import { OrderForm } from "@/components/order/form";

export const metadata: Metadata = {
  title: "اطلب دعوتك",
  description: "ابعت تفاصيل مناسبتك واختار الباكدج والشكل اللي عاجبك.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.package;
  const initialPackage = Array.isArray(raw) ? raw[0] : raw;

  return <OrderForm initialPackage={initialPackage} />;
}
