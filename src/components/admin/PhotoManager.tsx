import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ImagePlus, Info, Loader2, Settings2, Trash2, Upload, X } from 'lucide-react';
import { wedding, type PhotoSlot } from '../../config/wedding';
import { usePhotoLibrary } from '../../lib/photoLibrary';
import { GoldDivider, Lotus } from '../ui/Ornaments';

const GROUPS: { key: PhotoSlot['group']; title: string; telugu: string }[] = [
  { key: 'story', title: 'Welcome & Story', telugu: 'స్వాగతం' },
  { key: 'groom', title: 'Groom', telugu: 'పెళ్లికొడుకు' },
  { key: 'bride', title: 'Bride', telugu: 'పెళ్లికూతురు' },
  { key: 'couple', title: 'Couple', telugu: 'వధూవరులు' },
];

export function PhotoManager({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { overrides, save, remove, saving, error, ready } = usePhotoLibrary();
  const [target, setTarget] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const choose = (id: string) => {
    setTarget(id);
    window.setTimeout(() => inputRef.current?.click(), 0);
  };

  const onFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && target) void save(target, file);
    event.target.value = '';
    setTarget(null);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[85] bg-peacock-950/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Photo manager"
              className="fixed inset-y-0 right-0 z-[86] flex w-full max-w-md flex-col border-l border-gold-200/20 bg-peacock-900/95 shadow-[-40px_0_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-gold-200/15 px-5 py-5">
                <div>
                  <p className="eyebrow text-[0.55rem]">Photo Studio</p>
                  <h2 className="font-display mt-1 text-2xl text-gold-gradient">Add Your Photographs</h2>
                  <p className="mt-1 text-[0.6rem] leading-relaxed text-gold-200/50">
                    Uploaded photos are stored privately in this browser.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-200/30 text-gold-100 transition-colors hover:bg-gold-200/10"
                  aria-label="Close photo manager"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="flex gap-2 rounded-xl border border-gold-200/20 bg-gold-200/5 px-3 py-2.5 text-[0.6rem] leading-relaxed text-gold-200/65">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" aria-hidden="true" />
                  <span>
                    For the published invitation, save your originals in <code className="text-gold-200">public/photos</code>{' '}
                    using the file names shown beside each slot.
                  </span>
                </div>

                {error && (
                  <p className="mt-3 rounded-xl border border-rosegold-500/40 bg-rosegold-500/10 px-3 py-2 text-[0.6rem] text-rosegold-200">
                    {error}
                  </p>
                )}

                {!ready && (
                  <p className="mt-3 flex items-center gap-2 text-[0.6rem] text-gold-200/50">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    Loading your photographs…
                  </p>
                )}

                {GROUPS.map((group) => {
                  const photos = wedding.photos.filter((photo) => photo.group === group.key);
                  if (photos.length === 0) return null;
                  return (
                    <section key={group.key} className="mt-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-lg text-gold-100">{group.title}</h3>
                        <span lang="te" className="font-telugu text-[0.6rem] text-gold-300/50">
                          {group.telugu}
                        </span>
                      </div>
                      <GoldDivider className="mt-2 w-full opacity-50" />
                      <ul className="mt-3 space-y-2">
                        {photos.map((photo) => {
                          const preview = overrides[photo.id] ?? photo.src;
                          const busy = saving === photo.id;
                          const filename = photo.src?.split('/').pop() ?? '';
                          return (
                            <li
                              key={photo.id}
                              className="flex items-center gap-3 rounded-xl border border-gold-200/12 bg-peacock-950/35 p-2.5"
                            >
                              <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md border border-gold-200/25 bg-peacock-950">
                                {preview ? (
                                  <img
                                    src={preview}
                                    alt=""
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={(event) => {
                                      event.currentTarget.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span className="grid h-full w-full place-items-center">
                                    <Lotus className="h-5 w-9 opacity-60" />
                                  </span>
                                )}
                                {overrides[photo.id] && (
                                  <span className="absolute inset-x-0 bottom-0 bg-peacock-950/85 py-0.5 text-center text-[0.4rem] uppercase tracking-[0.1em] text-gold-200/80">
                                    Uploaded
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[0.66rem] text-gold-100/85">{photo.label}</p>
                                <p className="truncate text-[0.52rem] text-gold-200/35">{filename}</p>
                              </div>
                              <div className="flex shrink-0 items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => choose(photo.id)}
                                  className="grid h-8 w-8 place-items-center rounded-full border border-gold-200/25 text-gold-200 transition-colors hover:bg-gold-200/10"
                                  aria-label={`Upload photo for ${photo.label}`}
                                  title={preview ? 'Replace photo' : 'Upload photo'}
                                >
                                  {busy ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                                  ) : preview ? (
                                    <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : (
                                    <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                                  )}
                                </button>
                                {overrides[photo.id] && (
                                  <a
                                    href={overrides[photo.id]}
                                    download={filename}
                                    className="grid h-8 w-8 place-items-center rounded-full border border-gold-200/25 text-gold-200 transition-colors hover:bg-gold-200/10"
                                    aria-label={`Download ${photo.label} as ${filename}`}
                                    title={`Download as ${filename}`}
                                  >
                                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                  </a>
                                )}
                                {overrides[photo.id] && (
                                  <button
                                    type="button"
                                    onClick={() => void remove(photo.id)}
                                    className="grid h-8 w-8 place-items-center rounded-full border border-rose-400/25 text-rosegold-300/80 transition-colors hover:bg-rosegold-500/15"
                                    aria-label={`Remove uploaded photo for ${photo.label}`}
                                    title="Remove uploaded photo"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  );
                })}

                <p className="mt-8 flex items-center gap-2 pb-4 text-[0.55rem] uppercase tracking-[0.18em] text-gold-200/30">
                  <Settings2 className="h-3 w-3" aria-hidden="true" />
                  {wedding.photos.length} photograph slots
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={onFile}
        aria-label="Choose a photograph to upload"
      />
    </>
  );
}

export function PhotoManagerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group fixed bottom-4 right-4 z-[70] grid h-11 w-11 place-items-center rounded-full border border-gold-200/40 bg-peacock-900/80 text-gold-200 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all duration-300 hover:border-gold-200/80 hover:bg-gold-200/10 sm:bottom-6 sm:right-6"
      aria-label="Open the photo manager to add or replace photographs"
    >
      <ImagePlus className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full border border-gold-200/20 bg-peacock-950/90 px-3 py-1 text-[0.5rem] uppercase tracking-[0.18em] text-gold-200/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Manage photos
      </span>
    </button>
  );
}
