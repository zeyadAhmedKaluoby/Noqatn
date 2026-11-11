import type { EventType, SongId } from "@/lib/types";

export type { SongId };

export type Song = {
  id: SongId;
  title: string;
  src: string;
  credit: string;
};

export const SONGS: Song[] = [
  {
    id: "canon",
    title: "كانون في مقام ري",
    src: "/audio/canon-in-d.mp3",
    credit: "Canon in D — Johann Pachelbel، أداء Kevin MacLeod، ترخيص CC BY 3.0",
  },
  {
    id: "romance",
    title: "رومانس الغيتار",
    src: "/audio/romance.mp3",
    credit: "Romance Anónimo — أداء Jim Greeninger، ترخيص CC0",
  },
  {
    id: "pizzicato",
    title: "بيزيكاتو",
    src: "/audio/pizzicato.mp3",
    credit: "Pizzicato من باليه سيلفيا — أداء Kevin MacLeod، ترخيص CC BY 3.0",
  },
  {
    id: "waltz",
    title: "فالس تشايكوفسكي",
    src: "/audio/waltz.mp3",
    credit: "Waltz, Op. 40 — Pyotr Ilyich Tchaikovsky، أداء Kevin MacLeod، ترخيص CC BY 3.0",
  },
];

const byType: Record<EventType, SongId> = {
  WEDDING: "canon",
  ENGAGEMENT: "romance",
  SEBOU: "pizzicato",
  AQIQAH: "waltz",
  BIRTHDAY: "waltz",
};

export function defaultSongFor(type: EventType): SongId {
  return byType[type];
}

export function getSong(id: string | undefined, type: EventType): Song {
  return SONGS.find((song) => song.id === id) ?? SONGS.find((song) => song.id === byType[type]) ?? SONGS[0];
}
