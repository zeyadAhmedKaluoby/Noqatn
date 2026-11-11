import { Suspense } from "react";
import type { Metadata } from "next";
import { ManageShell } from "@/components/manage/shell";
import { SEED_EVENTS } from "@/lib/seed";

type Props = { children: React.ReactNode; params: Promise<{ token: string }> };

export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const event = SEED_EVENTS.find((item) => item.managementToken === token);
  return { title: event ? `إدارة ${event.title}` : "إدارة الدعوة" };
}

export default async function ManageLayout({ children, params }: Props) {
  const { token } = await params;
  return (
    <Suspense fallback={<main className="grid min-h-svh place-items-center">جارٍ فتح لوحة الدعوة…</main>}>
      <ManageShell token={token}>{children}</ManageShell>
    </Suspense>
  );
}
