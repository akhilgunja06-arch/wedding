import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { wedding, type Deity } from '../../config/wedding';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { Diya, FrameCorners, GoldDivider, Gopuram, Lotus } from '../ui/Ornaments';
import { MandapBackdrop } from '../ui/Backdrops';

function DeityCard({ deity, index }: { deity: Deity; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <Reveal delay={index * 0.12} className="flex w-full justify-center">
      <article className="group flex w-full max-w-[23rem] flex-col items-center text-center">
        <div className="deity-frame relative w-full">
          <FrameCorners size={44} className="z-20 opacity-70" />
          <div className="deity-frame__inner relative overflow-hidden">
            {failed ? (
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-4 bg-maroon-900/80 px-6">
                <Lotus className="h-12 w-24 opacity-70" />
                <p lang="te" className="font-telugu text-lg text-gold-200">
                  {deity.teluguName}
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.22em] text-gold-300/55">
                  Image unavailable
                </p>
              </div>
            ) : (
              <img
                src={deity.image}
                alt={deity.alt}
                loading="lazy"
                decoding="async"
                className="deity-image aspect-[3/4] w-full object-cover"
                onError={() => setFailed(true)}
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent" />
            <p
              lang="te"
              className="font-telugu pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-3 text-[0.62rem] tracking-[0.16em] text-gold-200/85"
            >
              {deity.mantraTelugu}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <p lang="te" className="font-telugu text-gold-gradient text-xl sm:text-2xl">
            {deity.teluguName}
          </p>
          <h3 className="font-display mt-1 text-lg tracking-[0.08em] text-gold-100 sm:text-xl">
            {deity.name}
          </h3>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-gold-100/60">{deity.description}</p>
          <p className="mt-3 text-[0.55rem] uppercase tracking-[0.24em] text-gold-300/60">
            {deity.mantraLatin}
          </p>
          <a
            href={deity.creditUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 text-[0.55rem] uppercase tracking-[0.14em] text-gold-200/45 underline-offset-4 transition-colors hover:text-gold-200/80 hover:underline"
          >
            {deity.credit}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Deities() {
  const reduced = useReducedMotion();

  return (
    <Section id="deities" labelledBy="deities-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <MandapBackdrop className="absolute inset-0 h-full w-full opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-950 via-transparent to-maroon-950" />
        <div className="absolute left-1/2 top-1/3 h-[65vmin] w-[65vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,71,0.13),transparent_65%)]" />
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

        <div className="mt-12 grid gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-16">
          {wedding.deities.map((deity, index) => (
            <DeityCard key={deity.id} deity={deity} index={index} />
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
              className="font-telugu text-gold-gradient mt-4 text-lg leading-[1.9] sm:text-xl"
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
