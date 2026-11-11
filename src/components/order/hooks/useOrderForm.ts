"use client";

import { useMemo, useState, type FormEvent } from "react";
import { SITE, whatsappHref } from "@/lib/site";

export type PackageValue = "Classic" | "Signature" | "Luxury" | "مش عارف لسه";

export type OrderDraft = {
  name: string;
  phone: string;
  occasion: string;
  names: string;
  date: string;
  place: string;
  style: string;
  package: PackageValue;
  extras: string[];
  language: string;
  notes: string;
};

const PACKAGES: PackageValue[] = ["Classic", "Signature", "Luxury", "مش عارف لسه"];

function normalizePackage(value: string | null | undefined): PackageValue {
  if (value && PACKAGES.includes(value as PackageValue)) return value as PackageValue;
  return "مش عارف لسه";
}

export function useOrderForm(initialPackage?: string | null) {
  const [draft, setDraft] = useState<OrderDraft>(() => ({
    name: "",
    phone: "",
    occasion: "فرح",
    names: "",
    date: "",
    place: "",
    style: "مش متأكد",
    package: normalizePackage(initialPackage),
    extras: [],
    language: "عربي وإنجليزي",
    notes: "",
  }));
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState("");

  const waHref = useMemo(() => (summary ? whatsappHref(summary) : ""), [summary]);

  function patch(partial: Partial<OrderDraft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function toggleExtra(value: string) {
    setDraft((current) => {
      const has = current.extras.includes(value);
      return {
        ...current,
        extras: has ? current.extras.filter((item) => item !== value) : [...current.extras, value],
      };
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = draft.name.trim();
    const phone = draft.phone.trim();
    const names = draft.names.trim();
    if (!name || !phone || !names) {
      setError("محتاجين اسمك، ورقم الواتساب، والأسماء اللي على الدعوة.");
      return;
    }
    setError("");
    const extras = draft.extras.join("، ");
    const text =
      `أهلاً نقطني 👋 ده طلبي:\n` +
      `• الاسم: ${name}\n• المناسبة: ${draft.occasion} (${names})\n` +
      (draft.date ? `• التاريخ: ${draft.date}\n` : "") +
      (draft.place.trim() ? `• المكان: ${draft.place.trim()}\n` : "") +
      `• الشكل: ${draft.style}\n• الباكدج: ${draft.package}\n` +
      (extras ? `• إضافات: ${extras}\n` : "") +
      `• اللغة: ${draft.language}` +
      (draft.notes.trim() ? `\n• ملاحظات: ${draft.notes.trim()}` : "");
    setSummary(text);
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return {
    draft,
    error,
    done,
    summary,
    waHref,
    hasWhatsApp: Boolean(SITE.whatsapp),
    patch,
    toggleExtra,
    onSubmit,
  };
}
