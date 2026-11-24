"use client";

import type { ComponentType } from "react";
import { AqiqahStory, AQIQAH_OPEN_MS } from "@/components/invitation/aqiqah-story";
import { BabStory } from "@/components/invitation/bab-story";
import { BalloonsStory, BALLOONS_OPEN_MS } from "@/components/invitation/balloons-story";
import { ClassicStory } from "@/components/invitation/classic-story";
import { FestiveStory } from "@/components/invitation/festive/festive-story";
import { FESTIVE, type FestiveKey } from "@/components/invitation/festive/festive-variants";
import { NavyStory } from "@/components/invitation/navy-story";
import { PromiseStory, PROMISE_OPEN_MS } from "@/components/invitation/promise-story";
import { PolaroidStory, POLAROID_OPEN_MS } from "@/components/invitation/polaroid-story";
import { RingBoxStory, RINGBOX_OPEN_MS } from "@/components/invitation/ringbox-story";
import { SebouStory, SEBOU_OPEN_MS } from "@/components/invitation/sebou-story";
import { SharedStory } from "@/components/invitation/shared-story";
import { WeddingStory } from "@/components/invitation/wedding/wedding-story";
import { WEDDING, type WeddingKey } from "@/components/invitation/wedding/wedding-variants";
import { WaxStory } from "@/components/invitation/wax-story";
import { ZaffaStory, ZAFFA_OPEN_MS } from "@/components/invitation/zaffa-story";
import { STORY_DEMOS, type StoryDemo } from "@/lib/story-demos";
import type { InvitationEvent, TemplateKey } from "@/lib/types";

/** What every story receives. `onOpen(quick)` is called on the guest's tap. */
export type StoryProps = {
  event: InvitationEvent;
  guestTo?: string;
  onOpen: (quick: boolean) => void;
};

export type StoryEntry = {
  /** The story component. */
  Story: ComponentType<StoryProps>;
  /** How long after the tap before the sticky "order one" bar appears. */
  ctaDelay: (quick: boolean) => number;
  /** Extra class on the page wrapper (used to tint the sticky bar). */
  pageClass?: string;
  /** Extra classes on the <article>. */
  articleClass: string;
  /** Paint the article with the template's `bg` colour. */
  paintBackground?: boolean;
};

type LegacyProps = { event: InvitationEvent; guestTo?: string; onOpen: () => void };

/** Older stories call onOpen() with no argument and always play their reveal. */
function legacy(Component: ComponentType<LegacyProps>): ComponentType<StoryProps> {
  return function LegacyStory({ event, guestTo, onOpen }) {
    return <Component event={event} guestTo={guestTo} onOpen={() => onOpen(false)} />;
  };
}

/** The six data-driven stories share one component, configured by a StoryDemo. */
function shared(demo: StoryDemo): ComponentType<StoryProps> {
  return function SharedDemoStory({ event, guestTo, onOpen }) {
    return <SharedStory event={event} guestTo={guestTo} demo={demo} onOpen={() => onOpen(false)} />;
  };
}

/** The four festive templates share one body; the variant picks cover, palette and copy. */
function festive(variant: FestiveKey): ComponentType<StoryProps> {
  return function FestiveVariantStory(props) {
    return <FestiveStory variant={variant} {...props} />;
  };
}

/** The wedding family shares one body; the variant picks the cover mechanism, art and palette. */
function wedding(variant: WeddingKey): ComponentType<StoryProps> {
  return function WeddingVariantStory(props) {
    return <WeddingStory variant={variant} {...props} />;
  };
}

const fixed = (ms: number) => () => ms;
const quickable = (ms: number) => (quick: boolean) => (quick ? 0 : ms);

/**
 * Templates that render as a full story. Anything not listed here falls back to
 * the generic cover + page in InvitationView. Add a new story template here.
 *
 * `rose-gate` is not registered yet: its wrapper differs (rounded desktop card,
 * starts music on pointer-down, no sticky bar) and moves over in Phase 4.
 */
export const STORY_REGISTRY: Partial<Record<TemplateKey, StoryEntry>> = {
  "promise-ribbon": {
    Story: PromiseStory,
    ctaDelay: quickable(PROMISE_OPEN_MS),
    pageClass: "promise-page",
    articleClass: "overflow-x-clip",
  },
  "golden-balloons": {
    Story: BalloonsStory,
    ctaDelay: quickable(BALLOONS_OPEN_MS),
    pageClass: "gb-page",
    articleClass: "overflow-x-clip",
  },
  "zaffa-candles": {
    Story: ZaffaStory,
    ctaDelay: quickable(ZAFFA_OPEN_MS),
    pageClass: "zf-page",
    articleClass: "overflow-x-clip",
  },
  "aqiqah-olive": {
    Story: AqiqahStory,
    ctaDelay: quickable(AQIQAH_OPEN_MS),
    pageClass: "aq-page",
    articleClass: "overflow-x-clip",
  },
  "sebou-lanterns": {
    Story: SebouStory,
    ctaDelay: quickable(SEBOU_OPEN_MS),
    pageClass: "sb-page",
    articleClass: "overflow-x-clip",
  },
  "romantic-engagement": {
    Story: PolaroidStory,
    ctaDelay: quickable(POLAROID_OPEN_MS),
    pageClass: "po-page",
    articleClass: "overflow-x-clip",
  },
  "ring-box": {
    Story: RingBoxStory,
    ctaDelay: quickable(RINGBOX_OPEN_MS),
    pageClass: "rb-page",
    articleClass: "overflow-x-clip",
  },
  "birthday-candles": {
    Story: festive("candles"),
    ctaDelay: quickable(FESTIVE.candles.openMs),
    pageClass: "pt-page-bc",
    articleClass: "overflow-x-clip",
  },
  "birthday-confetti": {
    Story: festive("confetti"),
    ctaDelay: quickable(FESTIVE.confetti.openMs),
    pageClass: "pt-page-bf",
    articleClass: "overflow-x-clip",
  },
  "gift-burst": {
    Story: festive("gift"),
    ctaDelay: quickable(FESTIVE.gift.openMs),
    pageClass: "pt-page-gx",
    articleClass: "overflow-x-clip",
  },
  "sebou-festival": {
    Story: festive("festival"),
    ctaDelay: quickable(FESTIVE.festival.openMs),
    pageClass: "pt-page-sf",
    articleClass: "overflow-x-clip",
  },
  "garden-gate": {
    Story: wedding("gate"),
    ctaDelay: quickable(WEDDING.gate.openMs),
    pageClass: "wd-page-wg",
    articleClass: "overflow-x-clip",
  },
  "mashrabiya-door": {
    Story: wedding("mashrabiya"),
    ctaDelay: quickable(WEDDING.mashrabiya.openMs),
    pageClass: "wd-page-wm",
    articleClass: "overflow-x-clip",
  },
  "moon-door": {
    Story: wedding("moon"),
    ctaDelay: quickable(WEDDING.moon.openMs),
    pageClass: "wd-page-wn",
    articleClass: "overflow-x-clip",
  },
  "lavender-window": {
    Story: wedding("lavender"),
    ctaDelay: quickable(WEDDING.lavender.openMs),
    pageClass: "wd-page-wl",
    articleClass: "overflow-x-clip",
  },
  "elegant-floral": {
    Story: wedding("floral"),
    ctaDelay: quickable(WEDDING.floral.openMs),
    pageClass: "wd-page-we",
    articleClass: "overflow-x-clip",
  },
  "watercolor-seal": {
    Story: wedding("watercolor"),
    ctaDelay: quickable(WEDDING.watercolor.openMs),
    pageClass: "wd-page-ww",
    articleClass: "overflow-x-clip",
  },
  "bismillah-seal": {
    Story: wedding("bismillah"),
    ctaDelay: quickable(WEDDING.bismillah.openMs),
    pageClass: "wd-page-wb",
    articleClass: "overflow-x-clip",
  },
  "royal-gold": {
    Story: wedding("royal"),
    ctaDelay: quickable(WEDDING.royal.openMs),
    pageClass: "wd-page-wy",
    articleClass: "overflow-x-clip",
  },
  "garden-romance": {
    Story: wedding("garden"),
    ctaDelay: quickable(WEDDING.garden.openMs),
    pageClass: "wd-page-wr",
    articleClass: "overflow-x-clip",
  },
  "bow-letter": {
    Story: wedding("bow"),
    ctaDelay: quickable(WEDDING.bow.openMs),
    pageClass: "wd-page-wt",
    articleClass: "overflow-x-clip",
  },
  "minimal-modern": {
    Story: wedding("minimal"),
    ctaDelay: quickable(WEDDING.minimal.openMs),
    pageClass: "wd-page-wi",
    articleClass: "overflow-x-clip",
  },
  "poster-dance": {
    Story: wedding("poster"),
    ctaDelay: quickable(WEDDING.poster.openMs),
    pageClass: "wd-page-wp",
    articleClass: "overflow-x-clip",
  },
  "wax-roses": {
    Story: legacy(WaxStory),
    ctaDelay: fixed(1500),
    articleClass: "overflow-visible bg-[#f8efec]",
  },
  "classic-wax": {
    Story: legacy(ClassicStory),
    ctaDelay: fixed(900),
    articleClass: "overflow-x-clip bg-[#f7f1e8]",
  },
  "navy-castle": {
    Story: legacy(NavyStory),
    ctaDelay: fixed(1100),
    articleClass: "overflow-x-clip bg-[#f4efe6]",
  },
  "bab-doors": {
    Story: legacy(BabStory),
    ctaDelay: fixed(1700),
    articleClass: "overflow-x-clip bg-[#f7f3ec]",
  },
  // the six "shared story" templates are data-driven from STORY_DEMOS
  ...Object.fromEntries(
    STORY_DEMOS.map((demo) => [
      demo.key,
      {
        Story: shared(demo),
        ctaDelay: fixed(demo.durationMs),
        articleClass: "overflow-x-clip",
        paintBackground: true,
      } satisfies StoryEntry,
    ]),
  ),
};
