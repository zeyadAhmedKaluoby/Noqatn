type SongHandle = {
  ready: Promise<void>;
  setMuted: (muted: boolean) => void;
  setHidden: (hidden: boolean) => void;
  stop: () => void;
};

export function startSong(src: string): SongHandle {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.9;

  let userMuted = false;
  let stopped = false;

  const ready = audio.play().then(() => undefined);

  return {
    ready,
    setMuted(muted: boolean) {
      userMuted = muted;
      audio.muted = muted;
      if (!muted && audio.paused && !stopped) void audio.play();
    },
    setHidden(hidden: boolean) {
      if (stopped) return;
      if (hidden) audio.pause();
      else if (!userMuted) void audio.play();
    },
    stop() {
      stopped = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    },
  };
}
