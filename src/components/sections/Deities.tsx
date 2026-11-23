import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import { wedding, type Deity, type TemplePhoto } from '../../config/wedding';
import { DeityImage } from '../ui/DeityImage';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { ArchCrown, PaisleyBand } from '../ui/TempleOrnaments';
import { Diya, FrameCorners, GoldDivider, Gopuram, Lotus } from '../ui/Ornaments';

function DeityCard({ deity, index }: { deity: Deity; index: number }) {
  return (
    <Reveal delay={index * 0.12} className="flex w-full justify-center">
      <article className="group flex w-full max-w-[19.5rem] flex-col items-center text-center sm:max-w-[24rem]">
        <div className="relative w-full">
          <div className="deity-halo" aria-hidden="true" />
          <ArchCrown className="absolute -top-7 left-1/2 w-[62%] -translate-x-1/2 opacity-80" aria-hidden="true" />
          <div className="deity-frame relative w-full">
            <FrameCorners size={40} className="z-20 opacity-60" />
            <div className="deity-frame__inner relative overflow-hidden">
              <DeityImage
                deity={deity}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 88vw"
                className="deity-image aspect-[3/4] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,31,0.16)_0%,transparent_30%,rgba(3,20,22,0.8)_100%)]" />
              <p
                lang="te"
                className="font-telugu pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-3 text-[0.62rem] tracking-[0.16em] text-gold-200/90"
              >
                {deity.mantraTelugu}
              </p>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-gold-200/35 bg-peacock-950/70 px-2.5 py-1 text-[0.46rem] uppercase tracking-[0.18em] text-gold-200/75 backdrop-blur-sm">
                <Camera className="h-2.5 w-2.5" aria-hidden="true" />
                {deity.isPhotograph ? 'Photograph' : 'Traditional artwork'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p lang="te" className="font-telugu-display text-gold-gradient text-xl sm:text-2xl">
            {deity.teluguName}
          </p>
          <h3 className="font-display mt-1 text-lg tracking-[0.08em] text-gold-100 sm:text-xl">
            {deity.name}
          </h3>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-gold-100/65">{deity.description}</p>
          <p className="mt-3 text-[0.52rem] uppercase tracking-[0.24em] text-gold-300/60">
            {deity.mantraLatin}
          </p>
          <a
            href={deity.creditUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 text-[0.52rem] uppercase tracking-[0.12em] text-gold-200/45 underline-offset-4 transition-colors hover:text-gold-200/80 hover:underline"
          >
            {deity.credit}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function TempleTile({ photo, index }: { photo: TemplePhoto; index: number }) {
  return (
    <Reveal delay={index * 0.08} y={20}>
      <figure className="group relative overflow-hidden rounded-[1.3rem] border border-gold-200/25 bg-peacock-900/40 shadow-[0_28px_60px_-40px_rgba(0,0,0,0.9)]">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(3,20,22,0.88)_100%)]" />
        <figcaption className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <p className="font-display text-sm text-gold-100 sm:text-base">{photo.title}</p>
          <p lang="te" className="font-telugu text-[0.62rem] text-gold-200/75">
            {photo.telugu}
          </p>
          <a
            href={photo.creditUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-1 inline-block text-[0.46rem] uppercase tracking-[0.14em] text-gold-200/45 underline-offset-4 hover:text-gold-200/80 hover:underline"
          >
            {photo.credit}
          </a>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Deities() {
  const reduced = useReducedMotion();

  return (
    <Section id="deities" labelledBy="deities-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,31,0.72),rgba(4,30,32,0.5)_50%,rgba(3,18,28,0.8))]" />
        <div className="absolute left-1/2 top-1/3 h-[65vmin] w-[65vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.13),transparent_65%)]" />
        <Gopuram className="absolute -bottom-6 left-0 w-32 opacity-[0.12] sm:w-44" />
        <Gopuram className="absolute -bottom-6 right-0 w-32 opacity-[0.12] sm:w-44" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <SectionHeading
          id="deities-heading"
          eyebrow={wedding.messages.deitiesEyebrow}
          title={wedding.messages.deitiesTitle}
          telugu={wedding.messages.deitiesTelugu}
          description={wedding.messages.deitiesIntro}
        />

        <div className="mt-14 grid gap-14 sm:gap-16 lg:grid-cols-2">
          {wedding.deities.map((deity, index) => (
            <DeityCard key={deity.id} deity={deity} index={index} />
          ))}
        </div>

        <PaisleyBand className="mx-auto mt-16 w-full max-w-md opacity-70" />

        <Reveal className="mt-12">
          <p className="eyebrow text-center">Tirumala · Tiruchanur</p>
          <h3 className="font-display mt-3 text-center text-2xl text-gold-100 sm:text-3xl">
            Sacred Places Of Our Blessing
          </h3>
          <p lang="te" className="font-telugu mt-2 text-center text-sm text-gold-200/75">
            మా ఆశీర్వాద క్షేత్రాలు
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wedding.templePhotos.map((photo, index) => (
            <TempleTile key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        <Reveal className="mt-14" delay={0.1}>
          <div className="ornate-card relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] px-5 py-8 text-center sm:px-10 sm:py-9">
            <FrameCorners size={48} className="opacity-40" />
            <div className="flex items-center justify-center gap-4">
              <Diya lit className="h-9 w-9 opacity-80" />
              <Lotus className="h-8 w-16 opacity-80" />
              <Diya lit className="h-9 w-9 opacity-80" />
            </div>
            <p
              lang="te"
              className="font-telugu-display text-gold-gradient mt-4 text-lg leading-[1.8] sm:text-xl"
            >
              {wedding.messages.deitiesBlessingTelugu}
            </p>
            <GoldDivider className="mx-auto my-5 w-40" />
            <p className="body-lux mx-auto max-w-xl text-sm italic text-gold-100/75">
              {wedding.messages.deitiesBlessingEnglish}
            </p>
            <motion.a
              href="#invitation"
              className="btn-gold mt-6"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Enter the Celebration
            </motion.a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
