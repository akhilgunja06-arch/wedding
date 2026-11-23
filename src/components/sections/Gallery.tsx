import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Images, Settings2 } from 'lucide-react';
import { photoById, wedding, type PhotoGroup, type PhotoSlot } from '../../config/wedding';
import { usePhotoLibrary } from '../../lib/photoLibrary';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Lightbox, type LightboxPhoto } from '../ui/Lightbox';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { GoldDivider, Lotus } from '../ui/Ornaments';
import { Parallax } from '../ui/Parallax';

const FILTERS: { id: 'all' | Exclude<PhotoGroup, 'story'>; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'groom', label: 'Groom' },
  { id: 'bride', label: 'Bride' },
  { id: 'couple', label: 'Couple' },
];

const GROUP_TITLES: Record<Exclude<PhotoGroup, 'story'>, { title: string; telugu: string }> = {
  groom: { title: 'The Groom', telugu: 'పెళ్లికొడుకు' },
  bride: { title: 'The Bride', telugu: 'పెళ్లికూతురు' },
  couple: { title: 'Together', telugu: 'వధూవరులు' },
};

function GroupGrid({
  photos,
  onOpen,
  onStatus,
}: {
  photos: PhotoSlot[];
  onOpen: (id: string) => void;
  onStatus: (id: string, status: 'loaded' | 'error') => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {photos.map((photo, index) => (
        <Reveal key={photo.id} delay={Math.min(index * 0.05, 0.3)} y={22}>
          <PhotoFrame
            photo={photo}
            aspectClass={photo.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'}
            onOpen={onOpen}
            onStatus={onStatus}
            rounded="rounded-[1.15rem]"
          />
        </Reveal>
      ))}
    </div>
  );
}

export function Gallery({ onOpenManager }: { onOpenManager: () => void }) {
  const { overrides } = usePhotoLibrary();
  const [filter, setFilter] = useState<'all' | Exclude<PhotoGroup, 'story'>>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const handleStatus = useCallback((id: string, status: 'loaded' | 'error') => {
    setLoaded((current) => {
      if (status === 'loaded') return current[id] ? current : { ...current, [id]: true };
      if (!current[id]) return current;
      const { [id]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  const lightboxPhotos = useMemo<LightboxPhoto[]>(() => {
    return wedding.photos
      .map((photo) => ({ photo, src: overrides[photo.id] ?? photo.src }))
      .filter((entry): entry is { photo: PhotoSlot; src: string } => Boolean(entry.src))
      .filter(({ photo, src }) => loaded[photo.id] || Boolean(overrides[photo.id] && src))
      .map(({ photo, src }) => ({ id: photo.id, label: photo.label, src, caption: photo.caption }));
  }, [overrides, loaded]);

  const openPhoto = (id: string) => {
    const position = lightboxPhotos.findIndex((photo) => photo.id === id);
    if (position >= 0) setLightboxIndex(position);
  };

  const storyPhotos = ['stage', 'hero', 'romantic']
    .map((id) => photoById(id))
    .filter((photo): photo is PhotoSlot => Boolean(photo));

  const visibleGroups: Exclude<PhotoGroup, 'story'>[] =
    filter === 'all' ? ['groom', 'bride', 'couple'] : [filter];

  return (
    <Section id="gallery" slide={7} labelledBy="gallery-heading">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Photo Album"
          title={wedding.messages.galleryHeading}
          telugu={wedding.messages.galleryTelugu}
          description="A few frames from our journey. Tap a photograph to open it full screen, or tap an empty frame to add your own picture."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {storyPhotos.map((photo, index) => (
            <Reveal key={photo.id} delay={index * 0.1} className={index === 1 ? 'sm:mt-10' : index === 2 ? 'sm:-mt-4' : ''}>
              <div className="relative mx-auto w-full max-w-[19rem]">
                <Parallax distance={index === 1 ? 24 : 12}>
                  <PhotoFrame
                    photo={photo}
                    aspectClass={index === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}
                    onOpen={openPhoto}
                    onStatus={handleStatus}
                    variant="hero"
                    monogram="T & M"
                    showLabel
                    rounded="rounded-[1.6rem]"
                  />
                </Parallax>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`relative rounded-full px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                  active ? 'text-peacock-950' : 'text-gold-200/70 hover:text-gold-100'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-500"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </Reveal>

        <div className="mt-10 space-y-14">
          {visibleGroups.map((group) => {
            const photos = wedding.photos.filter((photo) => photo.group === group);
            return (
              <div key={group}>
                <Reveal className="mb-6 flex flex-col items-center gap-2 text-center">
                  <Lotus className="h-6 w-12 opacity-70" />
                  <h3 className="font-display text-2xl text-gold-100 sm:text-3xl">
                    {GROUP_TITLES[group].title}
                  </h3>
                  <p lang="te" className="font-telugu text-xs text-gold-300/70">
                    {GROUP_TITLES[group].telugu}
                  </p>
                  <GoldDivider className="mt-1 w-40 opacity-70" />
                </Reveal>
                <GroupGrid photos={photos} onOpen={openPhoto} onStatus={handleStatus} />
              </div>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <div className="ornate-card flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <Images className="h-5 w-5 text-gold-300" aria-hidden="true" />
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold-200/70">
                Add or replace photographs any time — they stay on this device.
              </p>
            </div>
            <button type="button" onClick={onOpenManager} className="btn-outline-gold shrink-0 px-4 py-2.5 text-[0.58rem]">
              <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
              Manage Photos
            </button>
          </div>
        </Reveal>
      </div>

      <Lightbox
        photos={lightboxPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </Section>
  );
}
