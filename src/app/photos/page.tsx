import type { Metadata } from "next";
import { PhotosTool } from "@/components/tools/photos-tool";

export const metadata: Metadata = {
  title: "صفحة صور بعد الفرح",
  description: "ألبوم صور بعد المناسبة — ديمو من نقطني.",
};

export default function PhotosPage() {
  return <PhotosTool />;
}
