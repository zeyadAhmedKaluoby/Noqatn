export function Petals({ color, count = 14 }: { color: string; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="petal"
          style={{
            left: `${(index * 19) % 100}%`,
            animationDelay: `${(index % 7) * 0.5}s`,
            animationDuration: `${8 + (index % 5)}s`,
            background: color,
            width: 8 + (index % 4) * 3,
            height: 12 + (index % 3) * 4,
          }}
        />
      ))}
    </div>
  );
}

export function Sparkles({ count = 12 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="spark"
          style={{
            left: `${8 + ((index * 17) % 84)}%`,
            top: `${10 + ((index * 23) % 70)}%`,
            animationDelay: `${(index % 6) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Confetti({ colors, count = 24 }: { colors: string[]; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, index) => {
        const shape = index % 3;
        return (
          <span
            key={index}
            className={shape === 0 ? "confetti-dot" : shape === 1 ? "confetti-square" : "confetti-ribbon"}
            style={{
              left: `${(index * 13) % 100}%`,
              background: colors[index % colors.length],
              animationDelay: `${(index % 8) * 0.18}s`,
              animationDuration: `${4.6 + (index % 5) * 0.7}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <g fill="currentColor">
        <circle cx="40" cy="16" r="11" opacity="0.45" />
        <circle cx="40" cy="64" r="11" opacity="0.45" />
        <circle cx="16" cy="40" r="11" opacity="0.45" />
        <circle cx="64" cy="40" r="11" opacity="0.45" />
        <circle cx="26" cy="26" r="9" opacity="0.35" />
        <circle cx="54" cy="54" r="9" opacity="0.35" />
        <circle cx="40" cy="40" r="8" />
      </g>
    </svg>
  );
}
