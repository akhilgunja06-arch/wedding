import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, Maximize2, RefreshCw } from 'lucide-react';
import { FrameCorners, Lotus } from './Ornaments';
import { usePhotoLibrary } from '../../lib/photoLibrary';
import type { PhotoSlot } from '../../config/wedding';

interface PhotoFrameProps {
  photo: PhotoSlot;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  onOpen?: (id: string) => void;
  variant?: 'gallery' | 'hero' | 'portrait';
  showLabel?: boolean;
  monogram?: string;
  rounded?: string;
  onStatus?: (id: string, status: 'loaded' | 'error') => void;
}

export function PhotoFrame({
  photo,
  className = '',
  aspectClass = 'aspect-[3/4]',
  priority = false,
  onOpen,
  variant = 'gallery',
  showLabel = false,
  monogram = 'T & M',
  rounded = 'rounded-[1.4rem]',
  onStatus,
}: PhotoFrameProps) {
  const { overrides, save, saving } = usePhotoLibrary();
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const src = overrides[photo.id] ?? photo.src;
  const busy = saving === photo.id;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const hasImage = Boolean(src) && !failed;

  const pickFile = () => inputRef.current?.click();

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void save(photo.id, file);
    event.target.value = '';
  };

  return (
    <figure className={`group relative ${className}`}>
      <div
        className={`frame-gold relative overflow-hidden ${rounded} ${aspectClass} transition-transform duration-700 ease-out group-hover:-translate-y-1`}
      >
        <div className={`frame-gold__inner absolute inset-[9px] ${rounded}`}>
          {hasImage ? (
            <>
              <img
                src={src}
                alt={`${photo.label} — Tanusha and Mahesh wedding photograph`}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={priority ? 'high' : 'auto'}
                onLoad={() => onStatus?.(photo.id, 'loaded')}
                onError={() => {
                  setFailed(true);
                  onStatus?.(photo.id, 'error');
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-peacock-950/75 via-transparent to-transparent opacity-70" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-200/20" />

              {onOpen && (
                <button
                  type="button"
                  onClick={() => onOpen(photo.id)}
                  className="absolute inset-0 z-10 flex items-end justify-center pb-4 focus-visible:bg-peacock-950/30"
                  aria-label={`Open ${photo.label} in the full screen photo viewer`}
                >
                  <span className="flex items-center gap-2 rounded-full border border-gold-200/40 bg-peacock-950/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.24em] text-gold-200 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    View
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={pickFile}
                className="absolute right-2.5 top-2.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-gold-200/40 bg-peacock-950/70 text-gold-200 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-peacock-900/90 focus-visible:opacity-100 group-hover:opacity-100"
                aria-label={`Replace photo for ${photo.label}`}
                title="Replace photo"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-6 text-center">
              <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
                <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 anim-spin-slower rounded-full border border-gold-400/40" />
                <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/50" />
              </div>
              <FrameCorners size={34} className="opacity-50" />
              <div className="relative flex flex-col items-center gap-2">
                <Lotus className="h-9 w-16 opacity-90" />
                {variant === 'hero' && (
                  <span className="font-display text-2xl tracking-[0.18em] text-gold-gradient">{monogram}</span>
                )}
                <p className="max-w-[16rem] text-[0.6rem] uppercase leading-relaxed tracking-[0.22em] text-gold-200/70">
                  {photo.label}
                </p>
                <button
                  type="button"
                  onClick={pickFile}
                  className="mt-1 inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-gold-200/5 px-4 py-2 text-[0.58rem] uppercase tracking-[0.2em] text-gold-200 transition-colors duration-300 hover:border-gold-200/80 hover:bg-gold-200/10"
                >
                  {busy ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {busy ? 'Saving' : 'Add photo'}
                </button>
                <span className="text-[0.55rem] uppercase tracking-[0.18em] text-gold-200/35">
                  JPG · PNG · WEBP
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLabel && (
        <figcaption className="mt-3 px-1">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-gold-300/80">{photo.label}</p>
          {photo.caption && (
            <p className="mt-1 font-display text-sm italic text-gold-100/60">{photo.caption}</p>
          )}
        </figcaption>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFile}
        aria-label={`Upload ${photo.label}`}
      />
    </figure>
  );
}
