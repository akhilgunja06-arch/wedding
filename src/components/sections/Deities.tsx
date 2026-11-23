import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { wedding, type TemplePhoto } from '../../config/wedding';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { PaisleyBand } from '../ui/TempleOrnaments';
import { Diya, FrameCorners, GoldDivider, Gopuram, Lotus } from '../ui/Ornaments';

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

/**
 * The devotional chapter that follows the opening darshan. The individual
 * deity portraits live only in the combined opening composition, so this
 * section keeps the temple photography and the blessing words.
 */
export function Deities() {
  const reduced = useReducedMotion();

  return (
    <Section id="deities" slide={1} labelledBy="deities-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,25,0.74),rgba(4,30,32,0.5)_50%,rgba(2,10,22,0.86))]" />
        <div className="absolute left-1/2 top-1/3 h-[65vmin] w-[65vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,214,140,0.14),transparent_65%)]" />
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

        <Reveal className="mt-12">
          <div className="ornate-card relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] px-5 py-8 text-center sm:px-10 sm:py-9">
            <FrameCorners size={48} className="opacity-35" />
            <div className="flex items-center justify-center gap-4">
              <Diya lit className="h-9 w-9 opacity-80" />
              <Lotus className="h-8 w-16 opacity-80" />
              <Diya lit className="h-9 w-9 opacity-80" />
            </div>
            <p lang="te" className="font-telugu-display text-gold-gradient mt-4 text-lg leading-[1.9] sm:text-xl">
              {wedding.messages.deitiesBlessingTelugu}
            </p>
            <GoldDivider className="mx-auto my-5 w-40" />
            <p className="body-lux mx-auto max-w-xl text-sm italic text-gold-100/75">
              {wedding.messages.deitiesBlessingEnglish}
            </p>
          </div>
        </Reveal>

        <PaisleyBand className="mx-auto mt-14 w-full max-w-md opacity-70" />

        <Reveal className="mt-10">
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

        <Reveal className="mt-12" delay={0.1}>
          <div className="flex flex-col items-center gap-4 text-center">
            <GoldDivider className="w-52" />
            <p lang="te" className="font-telugu max-w-xl text-xs leading-relaxed text-gold-200/60">
              శ్రీ వేంకటేశ్వర స్వామి మరియు శ్రీ పద్మావతి అమ్మవారి దివ్య దర్శనం ఈ ఆహ్వానానికి మంగళ ప్రారంభం.
            </p>
            <motion.a
              href="#invitation"
              className="btn-gold"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Enter the Wedding Invitation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
