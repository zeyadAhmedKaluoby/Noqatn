import { Suspense } from "react";
import type { Metadata } from "next";
import { InvitationScreen } from "@/components/invitation/InvitationScreen";
import { SEED_EVENTS } from "@/lib/seed";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = SEED_EVENTS.find((item) => item.slug === slug);
  return {
    title: event?.title ?? "دعوة",
    description: event?.details.wording ?? "دعوة تفاعلية من نقطني",
  };
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;
  return (
    <Suspense fallback={<main className="grid min-h-svh place-items-center">جارٍ فتح الدعوة…</main>}>
      <InvitationScreen slug={slug} />
    </Suspense>
  );
}
