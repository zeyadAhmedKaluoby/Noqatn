/** Draw a 1080×1920 story image from a guest message (Ma3zoom-style). */

export type StoryPayload = {
  coupleNames: string;
  guestName: string;
  message: string;
};

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 12);
}

export async function renderStoryImage(payload: StoryPayload): Promise<Blob> {
  const W = 1080;
  const H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");

  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#2c241c");
  gradient.addColorStop(0.45, "#4a3a2a");
  gradient.addColorStop(1, "#1a1510");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(184,153,92,0.55)";
  ctx.lineWidth = 4;
  ctx.strokeRect(64, 64, W - 128, H - 128);

  ctx.fillStyle = "#b8995c";
  ctx.font = "500 36px Cairo, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("نقطني", W / 2, 160);

  ctx.fillStyle = "#f6efe4";
  ctx.font = "600 52px 'El Messiri', Cairo, serif";
  ctx.fillText(payload.coupleNames.slice(0, 40), W / 2, 280);

  ctx.fillStyle = "rgba(246,239,228,0.7)";
  ctx.font = "400 34px Cairo, system-ui, sans-serif";
  ctx.fillText(payload.guestName.slice(0, 40), W / 2, 360);

  ctx.fillStyle = "#f6efe4";
  ctx.font = "400 44px Cairo, system-ui, sans-serif";
  const lines = wrap(ctx, payload.message.trim() || "…", W - 220);
  let y = 520;
  for (const line of lines) {
    ctx.fillText(line, W / 2, y);
    y += 64;
  }

  ctx.fillStyle = "rgba(184,153,92,0.9)";
  ctx.font = "400 28px Cairo, system-ui, sans-serif";
  ctx.fillText("رسالة من ضيفكم", W / 2, H - 140);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png");
  });
}
