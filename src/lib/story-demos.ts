import type { TemplateKey } from "@/lib/types";

export type StoryCover = "fade" | "doors" | "seal" | "frame";

export type StoryDemo = {
  key: TemplateKey;
  cover: StoryCover;
  tone: "light" | "dark";
  leads: [string, string, string];
  openLabel: string;
  durationMs: number;
};

/** Full-story demos built from Noqatn’s own themes (not Ma3zoom). */
export const STORY_DEMOS: StoryDemo[] = [
  {
    key: "sage-scroll",
    cover: "fade",
    tone: "light",
    leads: ["ورقة بلون الجنينة…", "وحكاية هادية بتتفتح معاكم،", "يوم فرحنا في نور هادي."],
    openLabel: "اضغط لفتح الدعوة",
    durationMs: 1100,
  },
  {
    key: "blush-veil",
    cover: "seal",
    tone: "light",
    leads: ["ختم ورد على ورق دافئ…", "ولما يتفك،", "تبدأ الحكاية."],
    openLabel: "اضغط على الختم",
    durationMs: 1300,
  },
  {
    key: "ivory-verse",
    cover: "frame",
    tone: "light",
    leads: ["عاج وذهب خافت…", "وآية تفتح الصفحة،", "قبل الأسامي والتفاصيل."],
    openLabel: "اضغط للقراءة",
    durationMs: 1000,
  },
  {
    key: "ember-hall",
    cover: "frame",
    tone: "dark",
    leads: ["قاعة بلون الزمرد…", "وإطار ذهب يتحرّك،", "على ليلة ملكية."],
    openLabel: "افتح الدعوة",
    durationMs: 1200,
  },
  {
    key: "mist-lilac",
    cover: "fade",
    tone: "light",
    leads: ["شباك على ضباب بنفسجي…", "والهواء هادي،", "ومستنيينكم تعدّوا معانا."],
    openLabel: "اضغط لفتح الدعوة",
    durationMs: 1100,
  },
  {
    key: "sand-line",
    cover: "fade",
    tone: "light",
    leads: ["سطر رفيع على رمل فاتح…", "بلا زحمة،", "بس الأسامي والموعد بوضوح."],
    openLabel: "افتح الدعوة",
    durationMs: 900,
  },
];

export const STORY_DEMO_KEYS = new Set(STORY_DEMOS.map((item) => item.key));

export function getStoryDemo(key: TemplateKey) {
  return STORY_DEMOS.find((item) => item.key === key);
}
