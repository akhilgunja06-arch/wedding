import { useId } from 'react';

function useGoldId(prefix = 'gold') {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}

function GoldDefs({ id, glowId }: { id: string; glowId: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffdf5" />
        <stop offset="35%" stopColor="#f0dba9" />
        <stop offset="65%" stopColor="#bf944b" />
        <stop offset="100%" stopColor="#755622" />
      </linearGradient>
      <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function GoldDivider({ className = '' }: { className?: string }) {
  const id = useGoldId('div');
  const glow = useGoldId('divglow');
  return (
    <svg viewBox="0 0 420 44" className={className} role="presentation" aria-hidden="true" fill="none">
      <GoldDefs id={id} glowId={glow} />
      <g stroke={`url(#${id})`} strokeWidth="1.1" strokeLinecap="round">
        <path d="M10 22h120" opacity="0.65" />
        <circle cx="138" cy="22" r="2.2" fill={`url(#${id})`} stroke="none" />
        <path d="M150 22c12 0 16-9 26-9s14 9 24 9" opacity="0.9" />
        <path d="M270 22c-12 0-16-9-26-9s-14 9-24 9" opacity="0.9" />
        <circle cx="282" cy="22" r="2.2" fill={`url(#${id})`} stroke="none" />
        <path d="M290 22h120" opacity="0.65" />
        <path d="M210 6l10 16-10 16-10-16z" />
        <path d="M210 12l5 10-5 10-5-10z" fill={`url(#${id})`} stroke="none" opacity="0.85" />
      </g>
      <circle cx="210" cy="22" r="17" stroke={`url(#${id})`} strokeWidth="0.8" opacity="0.4" fill="none" />
    </svg>
  );
}

export function CornerFlourish({ className = '' }: { className?: string }) {
  const id = useGoldId('corner');
  const glow = useGoldId('cornerglow');
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <GoldDefs id={id} glowId={glow} />
      <g stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 76V30c0-13 11-24 24-24h46" />
        <path d="M14 84V34c0-11 9-20 20-20h50" opacity="0.55" />
        <path d="M30 44c0-9 7-16 16-16s16 7 16 16-7 16-16 16" opacity="0.9" />
        <path d="M46 28c7 4 11 10 11 17" opacity="0.6" />
        <path d="M62 74c-10 0-18-8-18-18" opacity="0.75" />
        <path d="M78 62c0-9-4-17-11-22" opacity="0.5" />
        <circle cx="30" cy="30" r="2.4" fill={`url(#${id})`} stroke="none" />
        <circle cx="84" cy="84" r="2" fill={`url(#${id})`} stroke="none" opacity="0.8" />
        <path d="M20 20c6 2 10 6 12 12" opacity="0.5" />
      </g>
    </svg>
  );
}

const CORNER_POSITIONS = [
  'left-1 top-1',
  'right-1 top-1 rotate-90',
  'bottom-1 right-1 rotate-180',
  'bottom-1 left-1 -rotate-90',
];

export function FrameCorners({ className = '', size = 64 }: { className?: string; size?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {CORNER_POSITIONS.map((position) => (
        <span key={position} className={`absolute ${position}`} style={{ width: size, height: size }}>
          <CornerFlourish className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}

export function Lotus({ className = '' }: { className?: string }) {
  const id = useGoldId('lotus');
  const glow = useGoldId('lotusglow');
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" fill="none">
      <GoldDefs id={id} glowId={glow} />
      <g stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round">
        <path
          d="M60 12c8 12 10 26 6 42-8-4-12-12-12-22 0-8 2-14 6-20z"
          fill={`url(#${id})`}
          fillOpacity="0.18"
        />
        <path d="M60 54c-6-10-16-16-28-18 2 12 10 22 24 26" fill={`url(#${id})`} fillOpacity="0.12" />
        <path d="M60 54c6-10 16-16 28-18-2 12-10 22-24 26" fill={`url(#${id})`} fillOpacity="0.12" />
        <path d="M60 54c-4-12-12-22-24-28-2 14 6 28 20 34" fill={`url(#${id})`} fillOpacity="0.08" />
        <path d="M60 54c4-12 12-22 24-28 2 14-6 28-20 34" fill={`url(#${id})`} fillOpacity="0.08" />
        <path d="M28 62c10-4 22-4 32 0 10-4 22-4 32 0" opacity="0.8" />
        <circle cx="60" cy="62" r="2.4" fill={`url(#${id})`} stroke="none" />
      </g>
    </svg>
  );
}

export function RingsIllustration({ className = '' }: { className?: string }) {
  const id = useGoldId('rings');
  const glow = useGoldId('ringsglow');
  return (
    <svg viewBox="0 0 240 160" className={className} aria-hidden="true" fill="none">
      <GoldDefs id={id} glowId={glow} />
      <g filter={`url(#${glow})`} opacity="0.35">
        <circle cx="88" cy="94" r="46" stroke={`url(#${id})`} strokeWidth="7" />
        <circle cx="152" cy="94" r="46" stroke={`url(#${id})`} strokeWidth="7" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="3.2">
        <circle cx="88" cy="94" r="46" />
        <circle cx="152" cy="94" r="46" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1" opacity="0.65">
        <circle cx="88" cy="94" r="41" />
        <circle cx="152" cy="94" r="41" />
      </g>
      <path
        d="M152 44l7 9 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z"
        fill={`url(#${id})`}
        opacity="0.95"
      />
      <g stroke={`url(#${id})`} strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
        <path d="M52 34l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path d="M196 118l1.6 5 5 1.6-5 1.6-1.6 5-1.6-5-5-1.6 5-1.6z" />
        <path d="M120 18v8M116 22h8" opacity="0.7" />
      </g>
    </svg>
  );
}

export function Flame({ className = '' }: { className?: string }) {
  const id = useGoldId('flame');
  const glow = useGoldId('flameglow');
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden="true" fill="none">
      <defs>
        <radialGradient id={id} cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="45%" stopColor="#ffc861" />
          <stop offset="100%" stopColor="#c9560f" />
        </radialGradient>
        <filter id={glow} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <ellipse cx="40" cy="72" rx="26" ry="34" fill="#ffb347" opacity="0.35" filter={`url(#${glow})`} />
      <path
        className="anim-flicker"
        d="M40 16c14 20 26 30 26 50 0 17-12 30-26 30S14 83 14 66c0-13 7-22 14-31 4 6 7 9 10 12 1-12 1-21 2-31z"
        fill={`url(#${id})`}
      />
      <path
        d="M40 46c7 10 12 16 12 26 0 9-5 16-12 16s-12-7-12-16c0-8 5-15 12-26z"
        fill="#fff3c4"
        opacity="0.85"
      />
    </svg>
  );
}

export function Diya({ className = '', lit = false }: { className?: string; lit?: boolean }) {
  const id = useGoldId('diya');
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e6c6" />
          <stop offset="55%" stopColor="#bf944b" />
          <stop offset="100%" stopColor="#755622" />
        </linearGradient>
      </defs>
      {lit && (
        <>
          <ellipse cx="32" cy="24" rx="9" ry="13" fill="#ffb347" opacity="0.3" />
          <path d="M32 10c5 7 8 11 8 17 0 6-4 10-8 10s-8-4-8-10c0-6 3-10 8-17z" fill="#ffd27a" />
          <path
            d="M32 18c2.4 4 4 6.5 4 10 0 3-2 5-4 5s-4-2-4-5c0-3.5 1.6-6 4-10z"
            fill="#fff6d6"
          />
        </>
      )}
      <path d="M10 32c6 8 14 12 22 12s16-4 22-12" stroke={`url(#${id})`} strokeWidth="1.6" />
      <path d="M14 34h36" stroke={`url(#${id})`} strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="32" cy="45" rx="12" ry="3" stroke={`url(#${id})`} strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function NamamEmblem({ className = '' }: { className?: string }) {
  const id = useGoldId('namam');
  const glow = useGoldId('namamglow');
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden="true" fill="none">
      <GoldDefs id={id} glowId={glow} />
      <g filter={`url(#${glow})`} opacity="0.4">
        <circle cx="110" cy="110" r="78" stroke={`url(#${id})`} strokeWidth="2" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1.2">
        <circle cx="110" cy="110" r="86" opacity="0.5" />
        <circle cx="110" cy="110" r="78" opacity="0.85" />
        <circle cx="110" cy="110" r="64" opacity="0.35" strokeDasharray="2 6" />
      </g>
      <g stroke={`url(#${id})`} strokeLinecap="round" fill="none">
        <path
          d="M88 70c-8 14-12 28-12 42 0 22 14 36 34 36s34-14 34-36c0-14-4-28-12-42"
          strokeWidth="7"
        />
        <path d="M110 62v78" strokeWidth="5" />
        <path d="M96 62h28" strokeWidth="2" opacity="0.7" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1.6" fill="none" opacity="0.9">
        <path d="M36 122c0-8 6-14 13-14 6 0 10 4 10 9 0 6-5 10-11 10h-5" />
        <path d="M42 118c3-2 7-1 8 2" />
        <path d="M50 132c6 4 12 3 16-2" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1.6" fill="none" opacity="0.9">
        <circle cx="182" cy="122" r="12" />
        <circle cx="182" cy="122" r="4.5" />
        <path d="M182 106v6M182 132v6M166 122h6M192 122h6M171 111l4 4M189 129l4 4M193 111l-4 4M175 129l-4 4" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="1" opacity="0.55">
        <path d="M110 12v10M104 17h12" />
        <path d="M28 60l5 5M33 60l-5 5" />
        <path d="M187 60l5 5M192 60l-5 5" />
      </g>
    </svg>
  );
}

export function TempleArch({
  className = '',
  opacity = 0.55,
}: {
  className?: string;
  opacity?: number;
}) {
  const id = useGoldId('arch');
  return (
    <svg
      viewBox="0 0 360 520"
      className={className}
      aria-hidden="true"
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e6c6" />
          <stop offset="45%" stopColor="#bf944b" />
          <stop offset="100%" stopColor="#755622" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round">
        <path d="M42 500V228c0-32 6-60 18-86 11-24 27-44 46-58 16-12 34-19 52-19h44c18 0 36 7 52 19 19 14 35 34 46 58 12 26 18 54 18 86v272" />
        <path
          d="M60 500V232c0-30 5-55 16-78 10-22 25-40 42-53 15-11 31-17 47-17h30c16 0 32 6 47 17 17 13 32 31 42 53 11 23 16 48 16 78v268"
          opacity="0.45"
        />
        <path d="M42 228h276" opacity="0.35" />
        <path d="M24 500h312" opacity="0.6" />
        <path d="M24 512h312" opacity="0.3" />
        <path d="M42 470h276" opacity="0.25" />
        <path d="M180 30V14" />
        <circle cx="180" cy="10" r="4" />
        <path d="M168 40c4-6 8-9 12-9s8 3 12 9" opacity="0.7" />
        <path d="M96 500v-96c0-12 8-20 18-20s18 8 18 20v96" opacity="0.6" />
        <path d="M228 500v-96c0-12 8-20 18-20s18 8 18 20v96" opacity="0.6" />
        <path d="M96 404h36M228 404h36" opacity="0.5" />
        <path d="M104 236c0-42 34-76 76-76s76 34 76 76" opacity="0.3" strokeDasharray="3 7" />
      </g>
      <g fill={`url(#${id})`} opacity="0.6">
        <circle cx="150" cy="104" r="2" />
        <circle cx="180" cy="96" r="2.4" />
        <circle cx="210" cy="104" r="2" />
      </g>
    </svg>
  );
}

export function Gopuram({ className = '' }: { className?: string }) {
  const id = useGoldId('gopuram');
  return (
    <svg viewBox="0 0 320 260" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e6c6" />
          <stop offset="60%" stopColor="#bf944b" />
          <stop offset="100%" stopColor="#755622" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth="1.2" strokeLinejoin="round">
        <path d="M160 10l6 16h-12z" />
        <path d="M150 26h20l4 14h-28z" />
        <path d="M142 40h36l6 18h-48z" />
        <path d="M132 58h56l7 20h-70z" />
        <path d="M120 78h80l8 22h-96z" />
        <path d="M108 100h104l9 24H99z" />
        <path d="M96 124h128l10 26H86z" />
        <path d="M84 150h152l11 28H73z" />
        <path d="M72 178h176l12 30H60z" />
        <path d="M60 208h200v34H60z" />
        <path d="M40 242h240v10H40z" />
        <path d="M146 208v-14c0-9 6-15 14-15s14 6 14 15v14" opacity="0.7" />
        <path d="M160 8v-6" opacity="0.5" />
        <circle cx="160" cy="2" r="2.4" opacity="0.6" />
      </g>
    </svg>
  );
}
