import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FrameCorners, Lotus } from './Ornaments';

export interface LightboxPhoto {
  id: string;
  label: string;
  src: string;
  caption?: string;
}

interface LightboxProps {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const reduced = useReducedMotion();
  const open = index !== null && photos.length > 0;
  const current = open ? photos[index as number] : null;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [current?.id]);

  const go = useCallback(
    (direction: number) => {
      if (index === null || photos.length === 0) return;
      onNavigate((index + direction + photos.length) % photos.length);
    },
    [index, onNavigate, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, go, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-peacock-950/96 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${current.label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.16),transparent_65%)]" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold-300/80">
              {(index as number) + 1} / {photos.length}
            </p>
            <p className="hidden max-w-md truncate font-display text-sm italic text-gold-200/70 sm:block">
              {current.label}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full border border-gold-200/40 text-gold-100 transition-colors hover:bg-gold-200/10"
              aria-label="Close photo viewer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 pb-2 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold-200/35 bg-peacock-950/60 text-gold-100 backdrop-blur-sm transition-colors hover:bg-gold-200/10 sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                className="relative flex max-h-full items-center justify-center"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="relative max-h-[74vh] rounded-[1.2rem] border border-gold-200/30 bg-peacock-900/40 p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
                  {imageError ? (
                    <div className="flex h-[46vh] w-[78vw] max-w-md flex-col items-center justify-center gap-3 rounded-[0.9rem] px-6 text-center">
                      <Lotus className="h-10 w-20 opacity-70" />
                      <p className="font-display text-lg text-gold-100">Photograph coming soon</p>
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-200/50">
                        Add this photo from the photo manager
                      </p>
                    </div>
                  ) : (
                    <img
                      src={current.src}
                      alt={`${current.label} — full view, Tanusha and Mahesh wedding photograph`}
                      className="max-h-[71vh] w-auto max-w-[86vw] rounded-[0.9rem] object-contain"
                      onError={() => setImageError(true)}
                    />
                  )}
                  <FrameCorners size={30} className="opacity-40" />
                </div>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold-200/35 bg-peacock-950/60 text-gold-100 backdrop-blur-sm transition-colors hover:bg-gold-200/10 sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative z-10 px-6 pb-6 text-center">
            <p className="font-display text-base italic text-gold-200/85">{current.caption ?? current.label}</p>
            <div className="mt-3 flex justify-center gap-2">
              {photos.map((photo, dotIndex) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => onNavigate(dotIndex)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIndex === index ? 'w-6 bg-gold-300' : 'w-1.5 bg-gold-300/30 hover:bg-gold-300/60'
                  }`}
                  aria-label={`View ${photo.label}`}
                  aria-current={dotIndex === index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
