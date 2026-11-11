import type { Metadata } from "next";
import { CardTool } from "@/components/tools/card-tool";

export const metadata: Metadata = {
  title: "كروت QR للطباعة",
  description: "كارت دعوة وكارت ترابيزات بـQR جاهزين للطباعة.",
};

export default function CardPage() {
  return <CardTool />;
}
