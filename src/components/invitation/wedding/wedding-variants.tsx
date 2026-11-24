import type { ReactNode } from "react";
import {
  GardenScene,
  IronGateLeaf,
  LanternScene,
  LatticeLeaf,
  LavenderScene,
  MoonDoorLeaf,
  MoonScene,
  ShutterLeaf,
  type OrnamentKey,
} from "@/components/invitation/wedding/wedding-art";

export type WeddingKey =
  | "gate"
  | "mashrabiya"
  | "moon"
  | "lavender"
  | "floral"
  | "watercolor"
  | "bismillah"
  | "royal"
  | "garden"
  | "bow"
  | "minimal"
  | "poster";

type Common = {
  /** Root class carrying palette + cover animation: wg, wm, wn, wl, we, ww, wb, wy, wr, wt, wi, wp. */
  cls: string;
  openMs: number;
  coverKicker: string;
  coverLabel: string;
  coverHint: string;
  ornament: OrnamentKey;
  verse?: string;
  heroLead: string;
  countdownTitle: string;
  /** Dark page: turns on the shared .story-dark form tone. */
  dark?: boolean;
};

export type DoorsVariant = Common & {
  mechanism: "doors";
  Leaf: () => ReactNode;
  Scene: () => ReactNode;
  /** "window" adds a sill and a squarer arch. */
  portal: "arch" | "window";
};

export type EnvelopeVariant = Common & {
  mechanism: "envelope";
  seal: "floral" | "plum" | "bismillah";
  extra: "petals" | "wash" | "sweep";
};

/** A frame that draws itself around the names (gold rules, or a rose vine that blooms). */
export type FrameVariant = Common & {
  mechanism: "frame";
  frame: "royal" | "garden";
};

/** A folded letter: the tie lets go, then the top half unfolds. */
export type LetterVariant = Common & {
  mechanism: "letter";
  tie: "bow" | "band";
  /** Two short lines written inside the letter. */
  letterLines: [string, string];
};

/** A dark stage: the spotlight switches on and the couple starts to dance. */
export type SpotlightVariant = Common & {
  mechanism: "spotlight";
};

export type WeddingVariant = DoorsVariant | EnvelopeVariant | FrameVariant | LetterVariant | SpotlightVariant;

/** Mechanisms that carry the kicker, names and date inside their object instead of above it. */
export function namesInside(v: WeddingVariant) {
  return v.mechanism === "frame" || v.mechanism === "letter" || v.mechanism === "spotlight";
}

const MAWADDA = "﴿ وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾";
const AZWAJ = "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾";

export const WEDDING: Record<WeddingKey, WeddingVariant> = {
  gate: {
    cls: "wg",
    mechanism: "doors",
    openMs: 2900,
    Leaf: IronGateLeaf,
    Scene: GardenScene,
    portal: "arch",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح البوابة وادخل الجنينة",
    coverHint: "المس البوابة وادخل الجنينة",
    ornament: "rose",
    verse: MAWADDA,
    heroLead: "في جنينة الفرح",
    countdownTitle: "باقي على الفرح",
  },
  mashrabiya: {
    cls: "wm",
    mechanism: "doors",
    openMs: 2900,
    Leaf: LatticeLeaf,
    Scene: LanternScene,
    portal: "arch",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح باب المشربية",
    coverHint: "المس الباب ويتفتح على النور",
    ornament: "lattice",
    verse: AZWAJ,
    heroLead: "على نور الفوانيس",
    countdownTitle: "باقي على الليلة",
  },
  moon: {
    cls: "wn",
    mechanism: "doors",
    openMs: 2900,
    Leaf: MoonDoorLeaf,
    Scene: MoonScene,
    portal: "arch",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح باب القمر",
    coverHint: "المس الباب وشوف القمر",
    ornament: "crescent",
    dark: true,
    heroLead: "ليلة تحت القمر",
    countdownTitle: "باقي على ليلتنا",
  },
  lavender: {
    cls: "wl",
    mechanism: "doors",
    openMs: 2900,
    Leaf: ShutterLeaf,
    Scene: LavenderScene,
    portal: "window",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح الشباك",
    coverHint: "افتح الشباك على الحقل",
    ornament: "lavender",
    verse: MAWADDA,
    heroLead: "على حقل اللافندر",
    countdownTitle: "باقي على الفرح",
  },
  floral: {
    cls: "we",
    mechanism: "envelope",
    openMs: 2800,
    seal: "floral",
    extra: "petals",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح الظرف",
    coverHint: "المس الختم وافتح الظرف",
    ornament: "rose",
    verse: MAWADDA,
    heroLead: "بكل الحب",
    countdownTitle: "باقي على الفرح",
  },
  watercolor: {
    cls: "ww",
    mechanism: "envelope",
    openMs: 2800,
    seal: "plum",
    extra: "wash",
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح الظرف",
    coverHint: "المس الختم وخلّي الألوان تفرد",
    ornament: "wash",
    heroLead: "بألوان الفرح",
    countdownTitle: "باقي على الفرح",
  },
  bismillah: {
    cls: "wb",
    mechanism: "envelope",
    openMs: 2800,
    seal: "bismillah",
    extra: "sweep",
    coverKicker: "بسم الله الرحمن الرحيم",
    coverLabel: "افتح الختم وافتح الدعوة",
    coverHint: "المس الختم وافتح الدعوة",
    ornament: "bismillah",
    verse: AZWAJ,
    heroLead: "على بركة الله",
    countdownTitle: "باقي على الفرح",
  },
  royal: {
    cls: "wy",
    mechanism: "frame",
    openMs: 2800,
    frame: "royal",
    coverKicker: "دعوة زفاف",
    coverLabel: "المس الإطار وافتح الدعوة",
    coverHint: "المس الإطار وخلّيه يتنوّر بالذهب",
    ornament: "royal",
    verse: AZWAJ,
    dark: true,
    heroLead: "في ليلة من ذهب",
    countdownTitle: "باقي على الليلة",
  },
  garden: {
    cls: "wr",
    mechanism: "frame",
    openMs: 2800,
    frame: "garden",
    coverKicker: "دعوة زفاف",
    coverLabel: "المس الورد وافتح الدعوة",
    coverHint: "المس الإطار وخلّي الورد يفتّح",
    ornament: "rose",
    verse: MAWADDA,
    heroLead: "بين الورد",
    countdownTitle: "باقي على الفرح",
  },
  bow: {
    cls: "wt",
    mechanism: "letter",
    openMs: 2700,
    tie: "bow",
    letterLines: ["يسعدنا حضوركم", "لمشاركتنا فرحتنا"],
    coverKicker: "جواب لحضرتك",
    coverLabel: "فك الفيونكة وافتح الجواب",
    coverHint: "فك الفيونكة واقرأ الجواب",
    ornament: "bow",
    verse: MAWADDA,
    heroLead: "جوابنا ليكم",
    countdownTitle: "باقي على الفرح",
  },
  minimal: {
    cls: "wi",
    mechanism: "letter",
    openMs: 2500,
    tie: "band",
    letterLines: ["بكل بساطة", "يسعدنا وجودكم معنا"],
    coverKicker: "دعوة زفاف",
    coverLabel: "افتح الكارت",
    coverHint: "المس الكارت وافتحه",
    ornament: "line",
    heroLead: "يوم واحد، وكل الحب",
    countdownTitle: "باقي على اليوم",
  },
  poster: {
    cls: "wp",
    mechanism: "spotlight",
    openMs: 2700,
    coverKicker: "الليلة دي رقصتنا",
    coverLabel: "شغّل النور وافتح الدعوة",
    coverHint: "المس الملصق وشغّل النور",
    ornament: "star",
    dark: true,
    heroLead: "على أول رقصة",
    countdownTitle: "باقي على الرقصة",
  },
};
