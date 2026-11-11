export type EventType = "WEDDING" | "ENGAGEMENT" | "SEBOU" | "AQIQAH" | "BIRTHDAY";

export type TemplateKey =
  | "elegant-floral"
  | "royal-gold"
  | "minimal-modern"
  | "garden-romance"
  | "romantic-engagement"
  | "sebou-lanterns"
  | "aqiqah-olive"
  | "birthday-candles"
  | "birthday-confetti"
  | "sebou-festival"
  | "poster-dance"
  | "wax-roses"
  | "rose-gate"
  | "bow-letter"
  | "watercolor-seal"
  | "bismillah-seal"
  | "garden-gate"
  | "lavender-window"
  | "mashrabiya-door"
  | "moon-door"
  | "ring-box"
  | "gift-burst";

export type AnimationLevel = "NONE" | "SUBTLE" | "FULL";

export type SongId = "canon" | "romance" | "pizzicato" | "waltz";

export type RsvpStatus = "ATTENDING" | "NOT_ATTENDING" | "MAYBE";

export type GiftStatus = "SUCCESS" | "PENDING" | "FAILED";

export type MessageStatus = "VISIBLE" | "HIDDEN";

export type ScheduleItem = {
  time: string;
  label: string;
};

export type InvitationEvent = {
  slug: string;
  managementToken: string;
  title: string;
  type: EventType;
  templateKey: TemplateKey;
  details: {
    hosts: string[];
    honoreeNames: string[];
    date: string;
    startTime: string;
    venueName: string;
    address: string;
    googleMapsUrl?: string;
    photo?: string;
    wording: string;
    schedule: ScheduleItem[];
  };
  design: {
    music: boolean;
    song: SongId;
    animationLevel: AnimationLevel;
  };
  settings: {
    allowRsvp: boolean;
    allowMessages: boolean;
    allowGifts: boolean;
    showGiftAmounts: boolean;
    showGuestMessagesPublicly: boolean;
  };
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
};

export type Rsvp = {
  id: string;
  eventSlug: string;
  guestName: string;
  phone?: string;
  status: RsvpStatus;
  numberOfGuests: number;
  note?: string;
  createdAt: string;
};

export type GuestMessage = {
  id: string;
  eventSlug: string;
  guestName: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
};

export type Gift = {
  id: string;
  eventSlug: string;
  guestName: string;
  message?: string;
  amountPiastres: number;
  status: GiftStatus;
  createdAt: string;
  simulated: boolean;
};

export type VisitCount = {
  views: number;
  sessions: number;
};

export type Store = {
  events: InvitationEvent[];
  rsvps: Rsvp[];
  messages: GuestMessage[];
  gifts: Gift[];
  visits: Record<string, VisitCount>;
};
