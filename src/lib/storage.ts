import { initialStore } from "@/lib/seed";
import type { Store } from "@/lib/types";

export const STORAGE_KEY = "noqatni.store.v1";

export function readStore(): Store {
  const fresh = initialStore();
  if (typeof window === "undefined") return fresh;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }

    const parsed = JSON.parse(raw) as Partial<Store>;
    if (!Array.isArray(parsed.events) || !Array.isArray(parsed.rsvps)) {
      throw new Error("invalid store");
    }

    const freshBySlug = new Map(fresh.events.map((event) => [event.slug, event]));
    const events = parsed.events.map((item) => {
      const seed = freshBySlug.get(item.slug);
      if (
        seed &&
        (item.slug.startsWith("theme-") ||
          ["classic", "navy", "bab", "sage", "blush", "ivory", "ember", "mist", "sand"].includes(item.slug))
      ) {
        return seed;
      }
      return item;
    });
    for (const event of fresh.events) {
      if (!events.some((item) => item.slug === event.slug)) events.push(event);
    }

    return {
      events,
      rsvps: parsed.rsvps,
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
      gifts: Array.isArray(parsed.gifts) ? parsed.gifts : [],
      visits: { ...fresh.visits, ...(parsed.visits ?? {}) },
    };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }
}
