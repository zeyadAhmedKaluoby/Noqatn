import type { Metadata } from "next";
import { CreateWizard } from "@/app/create/wizard";

export const metadata: Metadata = {
  title: "أنشئ دعوة",
  description: "اختر المناسبة والقالب، ثم انشر رابط الضيوف ورابط الإدارة.",
};

export default function CreatePage() {
  return <CreateWizard />;
}
