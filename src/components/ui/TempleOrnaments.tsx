import { useId } from 'react';

function useOrnamentId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}

function GoldGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffdf5" />
        <stop offset="34%" stopColor="#f0dba9" />
        <stop offset="66%" stopColor="#c9a35f" />
        <stop offset="100%" stopColor="#8a6526" />
      </linearGradient>
    </defs>
  );
}

/** Mango-leaf torana garland, hung across the top of the invitation. */
export function Torana({ className = '' }: { className?: string }) {
  const id = useOrnamentId('torana');
  return (
    <svg viewBox="0 0 600 120" className={className} aria-hidden="true" fill="none">
      <GoldGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 16h584" opacity="0.45" />
        <path d="M8 16c0 52 120 76 292 76s292-24 292-76" opacity="0.22" />
        {Array.from({ length: 17 }).map((_, index) => {
          const x = 40 + index * 32.5;
          const t = index / 16;
          const drop = Math.sin(t * Math.PI) * 22;
          const length = 26 + drop;
          const flower = index % 4 === 0;
          return (
            <g key={`leaf-${index}`}>
              <path d={`M${x} 16v${8 + drop * 0.6}`} opacity="0.5" />
              <path
                d={`M${x} ${16 + 6 + drop * 0.6} c-8 12 -8 26 0 ${length} c8 ${-12 + 0} 8 ${-26} 0 ${-length} z`}
                fill={`url(#${id})`}
                fillOpacity="0.18"
              />
              {flower && (
                <>
                  <circle cx={x} cy={20 + 8 + drop * 0.6 + length} r="4" fill={`url(#${id})`} stroke="none" opacity="0.85" />
                  <circle cx={x} cy={20 + 8 + drop * 0.6 + length} r="7" opacity="0.35" />
                </>
              )}
            </g>
          );
        })}
        <path d="M292 92v10" opacity="0.5" />
        <circle cx="292" cy="106" r="3.4" fill={`url(#${id})`} stroke="none" />
      </g>
    </svg>
  );
}

/** Kalasham — the auspicious pot with coconut and mango leaves. */
export function Kalash({ className = '' }: { className?: string }) {
  const id = useOrnamentId('kalash');
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden="true" fill="none">
      <GoldGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round">
        <path d="M60 40c-9-8-18-11-26-10 6 8 13 12 20 14" fill={`url(#${id})`} fillOpacity="0.16" />
        <path d="M60 40c9-8 18-11 26-10-6 8-13 12-20 14" fill={`url(#${id})`} fillOpacity="0.16" />
        <ellipse cx="60" cy="36" rx="12" ry="9" fill={`url(#${id})`} fillOpacity="0.22" />
        <path d="M60 27v-8" opacity="0.7" />
        <path d="M42 44h36l-3 10H45z" fill={`url(#${id})`} fillOpacity="0.2" />
        <path d="M40 54c-14 10-20 26-20 42 0 24 18 40 40 40s40-16 40-40c0-16-6-32-20-42z" fill={`url(#${id})`} fillOpacity="0.12" />
        <path d="M40 62h40" opacity="0.45" />
        <path d="M36 84h48" opacity="0.3" />
        <path d="M44 108c8 6 24 6 32 0" opacity="0.35" />
      </g>
      <g fill={`url(#${id})`} opacity="0.75">
        <circle cx="60" cy="70" r="2.6" />
        <circle cx="60" cy="92" r="2" />
        <circle cx="60" cy="116" r="1.8" />
      </g>
    </svg>
  );
}

/** Floral vine for card corners. */
export function FloralVine({ className = '' }: { className?: string }) {
  const id = useOrnamentId('vine');
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" fill="none">
      <GoldGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 154C6 92 34 40 96 12" />
        <path d="M6 120c26-6 44-22 52-46" opacity="0.6" />
        <path d="M22 142c22-2 40-14 50-32" opacity="0.45" />
        <path d="M28 96c-2-14 4-26 16-32-2 14-6 24-16 32z" fill={`url(#${id})`} fillOpacity="0.18" />
        <path d="M52 70c2-14 10-24 22-28-4 14-10 24-22 28z" fill={`url(#${id})`} fillOpacity="0.18" />
        <path d="M62 118c10-6 16-16 16-28-12 4-18 14-16 28z" fill={`url(#${id})`} fillOpacity="0.14" />
        <circle cx="86" cy="40" r="3.4" fill={`url(#${id})`} stroke="none" />
        <circle cx="36" cy="76" r="2.6" fill={`url(#${id})`} stroke="none" opacity="0.8" />
        <circle cx="74" cy="96" r="2.2" fill={`url(#${id})`} stroke="none" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Small prabhavali crown that sits above a deity frame. */
export function ArchCrown({ className = '' }: { className?: string }) {
  const id = useOrnamentId('crown');
  return (
    <svg viewBox="0 0 240 90" className={className} aria-hidden="true" fill="none">
      <GoldGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M18 84c8-34 44-62 102-62s94 28 102 62" opacity="0.5" />
        <path d="M34 84c8-28 40-52 86-52s78 24 86 52" opacity="0.85" />
        <path d="M120 22V8" />
        <path d="M108 16c4-8 8-11 12-11s8 3 12 11" opacity="0.8" />
        <circle cx="120" cy="6" r="3.2" fill={`url(#${id})`} stroke="none" />
        <path d="M76 40c6-6 12-8 18-8M164 40c-6-6-12-8-18-8" opacity="0.55" />
        <path d="M120 34l6 8-6 8-6-8z" fill={`url(#${id})`} stroke="none" opacity="0.7" />
      </g>
      <g fill={`url(#${id})`} opacity="0.7">
        <circle cx="52" cy="66" r="2" />
        <circle cx="188" cy="66" r="2" />
        <circle cx="92" cy="46" r="1.7" />
        <circle cx="148" cy="46" r="1.7" />
      </g>
    </svg>
  );
}

/** Traditional paisley band used as a section divider. */
export function PaisleyBand({ className = '' }: { className?: string }) {
  const id = useOrnamentId('paisley');
  return (
    <svg viewBox="0 0 480 40" className={className} aria-hidden="true" fill="none">
      <GoldGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round">
        <path d="M8 20h150M322 20h150" opacity="0.45" />
        {Array.from({ length: 5 }).map((_, index) => {
          const x = 172 + index * 34;
          return (
            <g key={`paisley-${index}`} opacity={index === 2 ? 0.95 : 0.6}>
              <path d={`M${x} 26c0-9 5-15 13-15-2 9-6 14-13 15z`} fill={`url(#${id})`} fillOpacity="0.16" />
              <path d={`M${x} 26c8 1 12-4 13-15`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
