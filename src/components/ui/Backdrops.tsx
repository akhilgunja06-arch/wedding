import { useId } from 'react';

function useGoldId(prefix = 'gold') {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}

export function MandapBackdrop({ className = '' }: { className?: string }) {
  const id = useGoldId('mandap');
  return (
    <svg
      viewBox="0 0 1200 800"
      className={className}
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e6c6" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#bf944b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#755622" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffdfa0" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#bf944b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#bf944b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill={`url(#${id}-light)`} />
      <g stroke={`url(#${id})`} strokeWidth="1.4" opacity="0.55">
        <path d="M170 800V330c0-40 8-76 24-108 14-30 34-55 58-72 20-15 42-24 64-24h420c22 0 44 9 64 24 24 17 44 42 58 72 16 32 24 68 24 108v470" />
        <path
          d="M196 800V334c0-36 7-68 21-97 13-27 30-49 51-65 18-13 38-21 58-21h416c20 0 40 8 58 21 21 16 38 38 51 65 14 29 21 61 21 97v466"
          opacity="0.5"
        />
        <path d="M120 800V300M1080 800V300" opacity="0.35" />
        <path d="M60 800V240M1140 800V240" opacity="0.2" />
        <path d="M120 300h-24M1080 300h24" opacity="0.3" />
        <path d="M60 240h60M1080 240h60" opacity="0.3" />
        <path
          d="M316 800V300c0-30 6-56 18-78 11-21 25-38 42-49 14-10 29-15 44-15h360c15 0 30 5 44 15 17 11 31 28 42 49 12 22 18 48 18 78v500"
          opacity="0.3"
        />
        <path d="M600 96V44" opacity="0.7" />
        <circle cx="600" cy="38" r="6" opacity="0.8" />
        <path d="M576 74c8-10 16-14 24-14s16 4 24 14" opacity="0.6" />
        <path d="M340 430c0-84 116-152 260-152s260 68 260 152" opacity="0.18" strokeDasharray="4 10" />
      </g>
      <g fill={`url(#${id})`} opacity="0.45">
        {Array.from({ length: 19 }).map((_, index) => {
          const t = index / 18;
          const x = 150 + t * 900;
          const y = 210 + Math.sin(t * Math.PI) * 120;
          return <circle key={`garland-${index}`} cx={x} cy={y} r={index % 2 === 0 ? 5 : 3.4} />;
        })}
        {Array.from({ length: 13 }).map((_, index) => {
          const t = index / 12;
          const x = 300 + t * 600;
          const y = 300 + Math.sin(t * Math.PI) * 70;
          return <circle key={`garland-b-${index}`} cx={x} cy={y} r={4} opacity="0.8" />;
        })}
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1" opacity="0.3">
        <path d="M170 800h860" />
        <path d="M210 770h780" />
      </g>
    </svg>
  );
}

export function MapIllustration({ className = '' }: { className?: string }) {
  const id = useGoldId('map');
  const glow = useGoldId('mapglow');
  return (
    <svg viewBox="0 0 640 420" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e6c6" />
          <stop offset="100%" stopColor="#a9821c" />
        </linearGradient>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a4741" />
          <stop offset="100%" stopColor="#04211f" />
        </radialGradient>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width="640" height="420" fill={`url(#${id}-bg)`} rx="24" />
      <g stroke={`url(#${id})`} strokeWidth="1" opacity="0.16">
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={`h-${i}`} d={`M0 ${32 * i + 20}h640`} />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <path key={`v-${i}`} d={`M${32 * i + 20} 0v420`} />
        ))}
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1.5" opacity="0.4">
        <path d="M-20 300c90-30 130 10 200-10s110-70 190-60 150 40 290 10" />
        <path d="M-20 322c90-30 130 10 200-10s110-70 190-60 150 40 290 10" opacity="0.4" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1.6" opacity="0.5">
        <path d="M120 420c20-90 90-130 160-170s90-90 90-250" />
        <path d="M470 420c-20-70-10-130 40-180s60-90 50-240" opacity="0.6" />
        <path d="M0 170h200c40 0 60 20 90 20s60-30 100-30h250" opacity="0.45" />
        <path d="M340 420V300c0-40 20-60 50-80" opacity="0.35" />
      </g>
      <g fill={`url(#${id})`} opacity="0.28">
        <rect x="70" y="60" width="60" height="44" rx="6" />
        <rect x="380" y="90" width="80" height="52" rx="6" />
        <rect x="470" y="250" width="70" height="60" rx="6" />
        <rect x="170" y="240" width="56" height="70" rx="6" />
        <rect x="250" y="120" width="46" height="46" rx="6" />
      </g>
      <g opacity="0.9">
        <circle cx="420" cy="210" r="34" fill="#bf944b" opacity="0.18" filter={`url(#${glow})`} />
        <circle cx="420" cy="210" r="26" stroke={`url(#${id})`} strokeWidth="1" opacity="0.5" />
        <circle cx="420" cy="210" r="16" stroke={`url(#${id})`} strokeWidth="0.8" opacity="0.35" />
        <path
          d="M420 158c-19 0-34 15-34 34 0 25 34 58 34 58s34-33 34-58c0-19-15-34-34-34z"
          fill={`url(#${id})`}
        />
        <circle cx="420" cy="192" r="11" fill="#073834" />
        <circle cx="420" cy="192" r="4.5" fill={`url(#${id})`} />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1" opacity="0.5">
        <path d="M40 380h120M480 40h120" strokeDasharray="3 7" />
      </g>
    </svg>
  );
}
