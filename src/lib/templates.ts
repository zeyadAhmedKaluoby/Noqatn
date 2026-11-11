import type { CSSProperties } from "react";
import type { EventType, TemplateKey } from "@/lib/types";

export type TemplateColors = {
  bg: string;
  ink: string;
  gold: string;
  muted: string;
  card: string;
  accent: string;
  stage: string;
  petal: string;
  button: string;
  buttonText: string;
};

export type OpeningKind =
  | "envelope"
  | "gold"
  | "minimal"
  | "garden"
  | "rings"
  | "lanterns"
  | "olive"
  | "candles"
  | "confetti"
  | "poster"
  | "wax"
  | "rosegate"
  | "bow"
  | "watercolor"
  | "bismillah"
  | "gate"
  | "lavender"
  | "mashrabiya"
  | "moon"
  | "ringbox"
  | "gift";

export type TemplateDef = {
  key: TemplateKey;
  name: string;
  brief: string;
  eventTypes: EventType[];
  opening: OpeningKind;
  decoration: "petals" | "sparkles" | "confetti" | "none";
  colors: TemplateColors;
};

export const EVENT_TYPES: Record<
  EventType,
  { label: string; blurb: string; kicker: string }
> = {
  WEDDING: {
    label: "زفاف",
    blurb: "ظرف يُفتح، بتلات هادئة، والموعد والمكان والنقطة في صفحة واحدة.",
    kicker: "دعوة زفاف",
  },
  ENGAGEMENT: {
    label: "خطوبة",
    blurb: "خواتم ووهج دافئ لليلة الخطوبة، مع رد الحضور ورسالة وهدية.",
    kicker: "دعوة خطوبة",
  },
  SEBOU: {
    label: "سبوع",
    blurb: "فوانيس ناعمة لليلة السبوع، واسم المولود في قلب الدعوة.",
    kicker: "دعوة سبوع",
  },
  AQIQAH: {
    label: "عقيقة",
    blurb: "أغصان زيتون ودعوة هادئة للعقيقة، مع تأكيد الحضور.",
    kicker: "دعوة عقيقة",
  },
  BIRTHDAY: {
    label: "عيد ميلاد",
    blurb: "شموع وألوان مرحة، وصورة يمكن استبدالها بصورة صاحب العيد.",
    kicker: "دعوة عيد ميلاد",
  },
};

export const TEMPLATES: TemplateDef[] = [
  {
    key: "elegant-floral",
    name: "زهور هادئة",
    brief: "عاج وذهبي ناعم. الظرف يُفتح ثم تنزل بتلات صغيرة.",
    eventTypes: ["WEDDING"],
    opening: "envelope",
    decoration: "petals",
    colors: {
      bg: "#f7f1e7",
      ink: "#2a2118",
      gold: "#b08a52",
      muted: "#7d6b59",
      card: "#fffaf4",
      accent: "#6d7f63",
      stage: "#e7dccb",
      petal: "#efc3cb",
      button: "#2a2118",
      buttonText: "#f7f1e7",
    },
  },
  {
    key: "royal-gold",
    name: "ذهب ملكي",
    brief: "زمرد داكن وذهب. إطار ذهبي يُرسم حول الأسماء.",
    eventTypes: ["WEDDING"],
    opening: "gold",
    decoration: "sparkles",
    colors: {
      bg: "#10241d",
      ink: "#f4ead7",
      gold: "#d4b06a",
      muted: "#cbb892",
      card: "#173128",
      accent: "#d4b06a",
      stage: "#07140f",
      petal: "#e6c98a",
      button: "#d4b06a",
      buttonText: "#14241c",
    },
  },
  {
    key: "minimal-modern",
    name: "هدوء حديث",
    brief: "أبيض ورملي وخط رفيع. الحركة قليلة والكلام واضح.",
    eventTypes: ["WEDDING"],
    opening: "minimal",
    decoration: "none",
    colors: {
      bg: "#f6f5f2",
      ink: "#22211e",
      gold: "#8a8f74",
      muted: "#6d6a63",
      card: "#ffffff",
      accent: "#8a8f74",
      stage: "#e4e1d8",
      petal: "#d9d3c5",
      button: "#22211e",
      buttonText: "#f6f5f2",
    },
  },
  {
    key: "garden-romance",
    name: "حديقة ورد",
    brief: "خوخ وكريم وورد مغبر. الزهور تظهر حول الإطار.",
    eventTypes: ["WEDDING"],
    opening: "garden",
    decoration: "petals",
    colors: {
      bg: "#fbf3f3",
      ink: "#3d2a2e",
      gold: "#c4898b",
      muted: "#8d6a6e",
      card: "#fff8f7",
      accent: "#7f9a78",
      stage: "#f0dfe2",
      petal: "#f3b7c4",
      button: "#8d4d5b",
      buttonText: "#fff8f7",
    },
  },
  {
    key: "romantic-engagement",
    name: "خطوبة دافئة",
    brief: "وردي دافئ وذهب وردي. الخواتم تكتمل عند الفتح.",
    eventTypes: ["ENGAGEMENT"],
    opening: "rings",
    decoration: "sparkles",
    colors: {
      bg: "#f8efe9",
      ink: "#3a2a2a",
      gold: "#c48b74",
      muted: "#8a6d66",
      card: "#fff9f6",
      accent: "#d7a29a",
      stage: "#eadfd6",
      petal: "#f0c7cf",
      button: "#9a5b63",
      buttonText: "#fff9f6",
    },
  },
  {
    key: "sebou-lanterns",
    name: "فوانيس السبوع",
    brief: "تركواز وذهبي دافئ. الفوانيس تتمايل ثم تظهر تفاصيل الليلة.",
    eventTypes: ["SEBOU"],
    opening: "lanterns",
    decoration: "sparkles",
    colors: {
      bg: "#fff6ea",
      ink: "#24304a",
      gold: "#f08a24",
      muted: "#6a5a78",
      card: "#fffdf8",
      accent: "#2bb8b0",
      stage: "#ffe4c4",
      petal: "#ffd36a",
      button: "#24304a",
      buttonText: "#fff6ea",
    },
  },
  {
    key: "aqiqah-olive",
    name: "زيتون العقيقة",
    brief: "ميرمية وكريم وذهب خافت. غصن زيتون يحيط باسم المولود.",
    eventTypes: ["AQIQAH"],
    opening: "olive",
    decoration: "petals",
    colors: {
      bg: "#f3f5ef",
      ink: "#243028",
      gold: "#a38b52",
      muted: "#667266",
      card: "#fbfcf8",
      accent: "#6e8b6a",
      stage: "#e3e8dc",
      petal: "#d5e0c8",
      button: "#3e5344",
      buttonText: "#f6f8f3",
    },
  },
  {
    key: "birthday-candles",
    name: "شموع العيد",
    brief: "وردي وفيست وبنفسجي. الشموع تضيء وقصاصات ملونة تنزل مع الفتح.",
    eventTypes: ["BIRTHDAY"],
    opening: "candles",
    decoration: "confetti",
    colors: {
      bg: "#fff1f7",
      ink: "#351848",
      gold: "#ff4f8b",
      muted: "#8a4d78",
      card: "#fff8fb",
      accent: "#3ec6ff",
      stage: "#ffd6ea",
      petal: "#ffe14a",
      button: "#7b3ff2",
      buttonText: "#fff7ff",
    },
  },
  {
    key: "birthday-confetti",
    name: "حفلة ألوان",
    brief: "أصفر ومرجاني وتركواز. بالونات وقصاصات لعيد ميلاد مرح.",
    eventTypes: ["BIRTHDAY"],
    opening: "confetti",
    decoration: "confetti",
    colors: {
      bg: "#fff8d4",
      ink: "#1d1a4a",
      gold: "#ff3d7f",
      muted: "#5c4b8a",
      card: "#ffffff",
      accent: "#22d3c5",
      stage: "#ffe56a",
      petal: "#7c5cff",
      button: "#ff5a1f",
      buttonText: "#fffaf3",
    },
  },
  {
    key: "sebou-festival",
    name: "ألوان السبوع",
    brief: "فوانيس ملونة وقصاصات. ليلة سبوع مرحة بدل الهدوء الذهبي.",
    eventTypes: ["SEBOU"],
    opening: "lanterns",
    decoration: "confetti",
    colors: {
      bg: "#eafff8",
      ink: "#1c2a4a",
      gold: "#ffb703",
      muted: "#3d6b78",
      card: "#ffffff",
      accent: "#ff5d8f",
      stage: "#bff7ea",
      petal: "#7c5cff",
      button: "#ff4d6d",
      buttonText: "#fff7f8",
    },
  },
  {
    key: "poster-dance",
    name: "ملصق الرقصة",
    brief: "أسود وذهبي. ملصق رقصة بأسماء كبيرة، وزوج يرقص، والمكان على الحافة.",
    eventTypes: ["WEDDING"],
    opening: "poster",
    decoration: "none",
    colors: {
      bg: "#0c0c0c",
      ink: "#f6edd8",
      gold: "#e6b325",
      muted: "#d9c48a",
      card: "#171717",
      accent: "#556838",
      stage: "#050505",
      petal: "#f4efe6",
      button: "#e6b325",
      buttonText: "#16130c",
    },
  },
  {
    key: "rose-gate",
    name: "باب الورد",
    brief: "ورق بلون الورد وبوابة زهر. الحكاية تنزل من الباب للبرنامج والقاعة والدعاء.",
    eventTypes: ["WEDDING"],
    opening: "rosegate",
    decoration: "none",
    colors: {
      bg: "#fbf7f4",
      ink: "#7a4e55",
      gold: "#c2a267",
      muted: "#8a5e64",
      card: "#fffdfb",
      accent: "#7a6992",
      stage: "#efe6e2",
      petal: "#f4dee0",
      button: "#7a4e55",
      buttonText: "#fbf7f4",
    },
  },
  {
    key: "wax-roses",
    name: "ختم الورد",
    brief: "وردي هادئ وختم شمع عليه ورد. الضيف يفتح الختم.",
    eventTypes: ["WEDDING"],
    opening: "wax",
    decoration: "petals",
    colors: {
      bg: "#fae4cf",
      ink: "#7e4f4c",
      gold: "#c2a267",
      muted: "#a0716c",
      card: "#fffaf6",
      accent: "#e7c9c2",
      stage: "#ece6ef",
      petal: "#f0c3cf",
      button: "#7e4f4c",
      buttonText: "#f3e6dc",
    },
  },
  {
    key: "bow-letter",
    name: "جواب الفيونكة",
    brief: "ورقة وردية وفيونكة. الدعوة تُقرأ كجواب.",
    eventTypes: ["WEDDING"],
    opening: "bow",
    decoration: "petals",
    colors: {
      bg: "#fdeef2",
      ink: "#6a3148",
      gold: "#d98aa4",
      muted: "#9a6478",
      card: "#fffafb",
      accent: "#f2c2d0",
      stage: "#f8dbe3",
      petal: "#f6c3d2",
      button: "#a14b68",
      buttonText: "#fffafb",
    },
  },
  {
    key: "watercolor-seal",
    name: "ألوان مائية",
    brief: "ظرف كريمي وختم برقوقي. الرسمة تظهر بعد الفتح.",
    eventTypes: ["WEDDING"],
    opening: "watercolor",
    decoration: "petals",
    colors: {
      bg: "#f7f1ea",
      ink: "#3d342c",
      gold: "#8d6a86",
      muted: "#7d6d62",
      card: "#fffaf6",
      accent: "#c7b7c4",
      stage: "#efe4d8",
      petal: "#e4c9cf",
      button: "#5c4654",
      buttonText: "#fffaf6",
    },
  },
  {
    key: "bismillah-seal",
    name: "ختم بسم الله",
    brief: "عاج وذهب. الختم يُفتح على الدعوة.",
    eventTypes: ["WEDDING"],
    opening: "bismillah",
    decoration: "sparkles",
    colors: {
      bg: "#f8f1e4",
      ink: "#3a2e22",
      gold: "#b08a45",
      muted: "#8a7356",
      card: "#fffaf3",
      accent: "#d7c29a",
      stage: "#efe2cc",
      petal: "#ead7b0",
      button: "#3a2e22",
      buttonText: "#f8f1e4",
    },
  },
  {
    key: "garden-gate",
    name: "بوابة الجنينة",
    brief: "قوس ورد وباب صغير. الجنينة تظهر مع الفتح.",
    eventTypes: ["WEDDING"],
    opening: "gate",
    decoration: "petals",
    colors: {
      bg: "#f6f3ee",
      ink: "#3d3a34",
      gold: "#c4a27a",
      muted: "#7d7368",
      card: "#fffdf9",
      accent: "#8ea37a",
      stage: "#e7efe2",
      petal: "#f0c3cf",
      button: "#3f5344",
      buttonText: "#f6f3ee",
    },
  },
  {
    key: "lavender-window",
    name: "شباك اللافندر",
    brief: "شباك قوسي على حقل بنفسجي هادئ.",
    eventTypes: ["WEDDING"],
    opening: "lavender",
    decoration: "petals",
    colors: {
      bg: "#f3eef6",
      ink: "#3d3450",
      gold: "#8d74a8",
      muted: "#74688a",
      card: "#fbf8fd",
      accent: "#c7b6de",
      stage: "#e4d8ef",
      petal: "#d7c4ea",
      button: "#5a4678",
      buttonText: "#fbf8fd",
    },
  },
  {
    key: "mashrabiya-door",
    name: "باب المشربية",
    brief: "خشب وذهب. الباب يُفتح على نور الفانوس.",
    eventTypes: ["WEDDING"],
    opening: "mashrabiya",
    decoration: "sparkles",
    colors: {
      bg: "#f4ecdf",
      ink: "#3a2918",
      gold: "#c4924a",
      muted: "#8a6a45",
      card: "#fff8ee",
      accent: "#8c5a32",
      stage: "#e7d3b4",
      petal: "#e6c48a",
      button: "#3a2918",
      buttonText: "#f4ecdf",
    },
  },
  {
    key: "moon-door",
    name: "باب القمر",
    brief: "كحلي وقمر. الباب الوردي يُفتح على الليل.",
    eventTypes: ["WEDDING"],
    opening: "moon",
    decoration: "sparkles",
    colors: {
      bg: "#141a33",
      ink: "#f6efe4",
      gold: "#e6c27a",
      muted: "#c9c2d8",
      card: "#1d2444",
      accent: "#e7a3b8",
      stage: "#0c1022",
      petal: "#f2d7a2",
      button: "#e6c27a",
      buttonText: "#1a1730",
    },
  },
  {
    key: "ring-box",
    name: "علبة الدبل",
    brief: "علبة تُفتح على دبلتين للخطوبة.",
    eventTypes: ["ENGAGEMENT"],
    opening: "ringbox",
    decoration: "sparkles",
    colors: {
      bg: "#f8efe9",
      ink: "#3a2a2a",
      gold: "#c48b74",
      muted: "#8a6d66",
      card: "#fff9f6",
      accent: "#e4b7ae",
      stage: "#eadfd6",
      petal: "#f0c7cf",
      button: "#9a5b63",
      buttonText: "#fff9f6",
    },
  },
  {
    key: "gift-burst",
    name: "الهدية",
    brief: "علبة هدية تُفتح والقصاصات تنزل.",
    eventTypes: ["BIRTHDAY"],
    opening: "gift",
    decoration: "confetti",
    colors: {
      bg: "#fff4ea",
      ink: "#3a2148",
      gold: "#ff5a8a",
      muted: "#8a4d78",
      card: "#fffaf6",
      accent: "#7c5cff",
      stage: "#ffe0c2",
      petal: "#ffe14a",
      button: "#7b3ff2",
      buttonText: "#fff7ff",
    },
  },
];

export function getTemplate(key: string) {
  return TEMPLATES.find((template) => template.key === key) ?? TEMPLATES[0];
}

export function templatesFor(type: EventType) {
  return TEMPLATES.filter((template) => template.eventTypes.includes(type));
}

export function themeVars(template: TemplateDef): CSSProperties {
  const colors = template.colors;
  return {
    "--bg": colors.bg,
    "--ink": colors.ink,
    "--gold": colors.gold,
    "--muted": colors.muted,
    "--card": colors.card,
    "--accent": colors.accent,
    "--stage": colors.stage,
    "--petal": colors.petal,
    "--button": colors.button,
    "--button-text": colors.buttonText,
  } as CSSProperties;
}
