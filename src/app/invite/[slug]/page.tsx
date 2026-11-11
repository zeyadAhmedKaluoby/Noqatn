import { Suspense } from "react";
import type { Metadata } from "next";
import { InvitationScreen } from "@/components/invitation/InvitationScreen";
import { SEED_EVENTS } from "@/lib/seed";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = SEED_EVENTS.find((item) => item.slug === slug);
  const title = event?.title ?? "دعوة";
  const description = event?.details.wording ?? "دعوة تفاعلية من نقطني";
  const photo = event?.details.photo;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ar_EG",
      ...(photo ? { images: [{ url: photo }] } : {}),
    },
    twitter: {
      card: photo ? "summary_large_image" : "summary",
      title,
      description,
      ...(photo ? { images: [photo] } : {}),
    },
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
