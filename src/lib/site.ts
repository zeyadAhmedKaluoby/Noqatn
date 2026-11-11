/** Agency contact — set in env for production. */

export const SITE = {
  brandAr: "نقطني",
  brandEn: "Noqatni",
  phoneDisplay: process.env.NEXT_PUBLIC_ORDER_PHONE?.trim() || "01155400075",
  /** Digits only for wa.me, e.g. 201155400075 */
  whatsapp: (process.env.NEXT_PUBLIC_ORDER_WA || "201155400075").replace(/\D/g, ""),
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "https://www.instagram.com/",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim() || "@noqatni",
} as const;

export function whatsappHref(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const ORDER_HELLO = {
  ar: "أهلاً نقطني 👋 عايز أعمل دعوة لمناسبة",
  en: "Hi Noqatni 👋 I’d like an invitation for my occasion",
} as const;
