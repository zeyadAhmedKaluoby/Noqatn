"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { guestFromTo } from "@/lib/format";

export type InviteLang = "ar" | "en";

export function useInviteKit() {
  const searchParams = useSearchParams();
  const guestTo = guestFromTo(searchParams.get("to"));
  const initialLang: InviteLang = searchParams.get("lang") === "en" ? "en" : "ar";
  const [lang, setLang] = useState<InviteLang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function toggleLang() {
    setLang((value) => (value === "ar" ? "en" : "ar"));
  }

  return { guestTo, lang, toggleLang };
}
