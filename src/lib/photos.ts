import type { EventType, InvitationEvent } from "@/lib/types";

export const OCCASION_PHOTOS: Record<EventType, { src: string; alt: string }> = {
  WEDDING: {
    src: "/images/occasion-wedding.jpg",
    alt: "ظرف عاجي بختم ذهبي وخاتمين وورد فاتح",
  },
  ENGAGEMENT: {
    src: "/images/occasion-engagement.jpg",
    alt: "خاتما خطوبة على حرير وردي",
  },
  SEBOU: {
    src: "/images/occasion-sebou.jpg",
    alt: "منخل سبوع مزيّن بقطع ذهبية وفوانيس",
  },
  AQIQAH: {
    src: "/images/occasion-aqiqah.jpg",
    alt: "أغصان زيتون على مائدة هادئة",
  },
  BIRTHDAY: {
    src: "/images/occasion-birthday.jpg",
    alt: "كيكة عيد ميلاد بثلاث شموع ذهبية",
  },
};

export function isOccasionPhoto(src: string) {
  return Object.values(OCCASION_PHOTOS).some((photo) => photo.src === src);
}

export function resolvePhoto(event: Pick<InvitationEvent, "type" | "details">) {
  if (event.details.photo === "") return null;
  if (event.details.photo) return event.details.photo;
  return OCCASION_PHOTOS[event.type].src;
}

export function photoAlt(event: Pick<InvitationEvent, "type">, src: string) {
  if (src === OCCASION_PHOTOS[event.type].src) return OCCASION_PHOTOS[event.type].alt;
  return "صورة الدعوة";
}

export function readPhotoFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const maxEdge = 1400;
      const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    image.src = url;
  });
}
