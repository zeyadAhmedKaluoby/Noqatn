import type { Metadata } from "next";
import { LinksTool } from "@/components/tools/links-tool";

export const metadata: Metadata = {
  title: "لينكات الضيوف",
  description: "ولّد لينك باسم كل ضيف ورسالة واتساب جاهزة.",
};

export default function LinksPage() {
  return <LinksTool />;
}
