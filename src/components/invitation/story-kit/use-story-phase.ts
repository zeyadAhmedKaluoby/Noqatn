"use client";

import { useEffect, useRef, useState } from "react";
import type { InvitationEvent } from "@/lib/types";

export type StoryPhase = "closed" | "opening" | "open";

type Options = {
  event: InvitationEvent;
  /** CSS class prefix of the template, e.g. "zf" for .zf-cover and .zf-reveal. */
  prefix: string;
  /** How long the reveal runs before the story unlocks, in ms. */
  openMs: number;
  /** Called on the guest's tap. `quick` is true when there is no reveal to play. */
  onOpen: (quick: boolean) => void;
};

/**
 * The closed → opening → open lifecycle every story shares:
 *  - locks page scroll while the cover is showing,
 *  - skips the reveal for reduced motion and animationLevel "NONE",
 *  - fades `.{prefix}-reveal` blocks in as they scroll into view.
 */
export function useStoryPhase({ event, prefix, openMs, onOpen }: Options) {
  const [phase, setPhase] = useState<StoryPhase>("closed");
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const level = event.design.animationLevel;
  const still = level === "NONE";

  useEffect(() => {
    const locked = phase !== "open";
    document.documentElement.classList.toggle("is-locked", locked);
    document.body.classList.toggle("is-locked", locked);
    return () => {
      document.documentElement.classList.remove("is-locked");
      document.body.classList.remove("is-locked");
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "open" || !root.current) return;
    const items = root.current.querySelectorAll<HTMLElement>(`.${prefix}-reveal`);
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [phase, prefix]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  function open() {
    if (phase !== "closed") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const quick = reduce || still;
    onOpen(quick);
    if (quick) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    timer.current = window.setTimeout(() => setPhase("open"), openMs);
  }

  /** Spread onto the cover <button>. */
  function cover(label: string) {
    return {
      type: "button" as const,
      onClick: open,
      "aria-hidden": phase === "open",
      tabIndex: phase === "open" ? -1 : 0,
      "aria-label": label,
      "data-story-cover": "",
      className: `${prefix}-cover ${phase !== "closed" ? "is-go" : ""} ${phase === "open" ? "is-gone" : ""}`,
    };
  }

  return { phase, root, level, still, cover };
}
