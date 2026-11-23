import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Music2 } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { useMusic } from '../../lib/music';
import { DeityImage } from '../ui/DeityImage';
import { ArchCrown, Torana } from '../ui/TempleOrnaments';
import { Diya, Gopuram, Lotus } from '../ui/Ornaments';
import { burstPetals } from '../effects/PetalCanvas';

const venkateswara = wedding.deities[0];
const padmavathi = wedding.deities[1];

export function Blessing() {
  const reduced = useReducedMotion();
  const { playing, loading, start } = useMusic();

  const fade = (delay: number, y = 22) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        };

  const enter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    burstPetals(window.innerWidth / 2, window.innerHeight * 0.7);
    document
      .getElementById('invitation')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      id="blessings"
      aria-labelledby="blessings-heading"
      className="opening relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-[var(--open-pad-bottom)] pt-[var(--open-pad-top)] text-center sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,25,0.8)_0%,rgba(4,33,31,0.4)_38%,rgba(4,30,32,0.52)_70%,rgba(3,16,25,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,214,140,0.16),transparent_62%)]" />
        <Gopuram className="absolute -bottom-6 left-0 w-32 opacity-[0.14] sm:w-44" />
        <Gopuram className="absolute -bottom-6 right-0 w-32 opacity-[0.14] sm:w-44" />
        <Diya lit className="absolute bottom-10 left-6 hidden h-10 w-10 opacity-60 lg:block" />
        <Diya lit className="absolute bottom-10 right-6 hidden h-10 w-10 opacity-60 lg:block" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <motion.div {...fade(0.05, 12)} className="flex flex-col items-center">
          <Torana className="opening-torana w-48 opacity-80 sm:w-64" />
          <p lang="te" className="font-telugu mt-2 text-[0.66rem] tracking-[0.3em] text-gold-300/85 sm:text-xs">
            {wedding.messages.openingMantraTelugu}
          </p>
        </motion.div>

        <motion.p
          {...fade(0.2)}
          lang="te"
          className="font-telugu-display mt-[var(--open-gap)] max-w-2xl text-[clamp(1.02rem,3.1vw,1.6rem)] leading-[1.55] text-gold-gradient text-gold-glow"
        >
          {wedding.messages.openingBlessingVenkateswaraTelugu}
        </motion.p>

        <motion.div
          {...fade(0.4, 30)}
          className="relative mt-[var(--open-gap)] flex w-full items-end justify-center gap-3 sm:gap-7"
        >
          <figure className="group relative w-[var(--open-deity)]">
            <div className="deity-halo" aria-hidden="true" />
            <div className="deity-rays anim-spin-slower" aria-hidden="true" />
            <ArchCrown
              className="absolute -top-5 left-1/2 w-[70%] -translate-x-1/2 opacity-90 sm:-top-6"
              aria-hidden="true"
            />
            <div className="deity-frame relative">
              <div className="deity-frame__inner relative overflow-hidden rounded-[1.35rem]">
                <DeityImage
                  deity={venkateswara}
                  priority
                  sizes="(min-width: 1024px) 248px, (min-width: 640px) 220px, 42vw"
                  className="deity-image aspect-[3/4] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,31,0.18)_0%,transparent_32%,rgba(3,20,22,0.72)_100%)]" />
                <p
                  lang="te"
                  className="font-telugu pointer-events-none absolute inset-x-0 bottom-0 px-2 pb-2 text-[0.58rem] tracking-[0.12em] text-gold-200/90 sm:text-[0.66rem]"
                >
                  {venkateswara.mantraTelugu}
                </p>
              </div>
            </div>
            <figcaption className="mt-3">
              <p lang="te" className="font-telugu text-[0.68rem] leading-snug text-gold-200/90 sm:text-sm">
                {venkateswara.teluguName}
              </p>
              <p className="mt-0.5 text-[0.48rem] uppercase tracking-[0.24em] text-gold-300/55 sm:text-[0.55rem]">
                Tirumala
              </p>
            </figcaption>
          </figure>

          <figure className="group relative w-[clamp(4.9rem,23vw,8.4rem)] pb-8 sm:pb-12">
            <div className="deity-halo opacity-70" aria-hidden="true" />
            <div className="deity-frame relative">
              <div className="deity-frame__inner relative overflow-hidden rounded-[1.1rem]">
                <DeityImage
                  deity={padmavathi}
                  priority
                  sizes="(min-width: 1024px) 152px, (min-width: 640px) 130px, 25vw"
                  className="deity-image aspect-[3/4] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,31,0.2)_0%,transparent_34%,rgba(3,20,22,0.7)_100%)]" />
              </div>
            </div>
            <figcaption className="mt-2.5">
              <p lang="te" className="font-telugu text-[0.6rem] leading-snug text-gold-200/90 sm:text-xs">
                {padmavathi.teluguName}
              </p>
              <p className="mt-0.5 text-[0.44rem] uppercase tracking-[0.22em] text-gold-300/55 sm:text-[0.52rem]">
                Tiruchanur
              </p>
            </figcaption>
          </figure>
        </motion.div>

        <motion.p
          {...fade(0.55)}
          lang="te"
          className="font-telugu-display mt-[var(--open-gap)] max-w-2xl text-[clamp(0.95rem,2.7vw,1.35rem)] leading-[1.65] text-gold-200/90"
        >
          {wedding.messages.openingBlessingPadmavathiTelugu}
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-[calc(var(--open-gap)*0.75)] flex flex-col items-center">
          <h1
            id="blessings-heading"
            lang="te"
            className="font-telugu-display text-[clamp(1.65rem,5.6vw,2.7rem)] leading-tight text-gold-gradient text-gold-glow"
          >
            {wedding.messages.openingCoupleTelugu}
          </h1>
          <p
            lang="te"
            className="font-telugu mt-2 text-[clamp(0.95rem,2.6vw,1.25rem)] tracking-[0.14em] text-gold-100/85"
          >
            {wedding.messages.openingWelcomeTelugu}
          </p>
        </motion.div>

        <motion.div {...fade(0.85)} className="mt-[var(--open-gap)] flex flex-col items-center gap-2.5">
          <Lotus className="h-6 w-14 opacity-70" />
          {!playing && (
            <button
              type="button"
              onClick={() => void start()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-gold-300/35 bg-peacock-900/50 px-4 py-2 text-[0.58rem] uppercase tracking-[0.22em] text-gold-200/85 backdrop-blur-sm transition-colors hover:border-gold-300/80 hover:text-gold-100 disabled:opacity-60"
            >
              <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
              {loading ? 'Starting…' : wedding.messages.openingMusicPrompt}
            </button>
          )}
          <a
            href="#invitation"
            onClick={enter}
            className="group inline-flex flex-col items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.3em] text-gold-200/65 transition-colors hover:text-gold-100"
          >
            {wedding.messages.openingHint}
            <ChevronDown className="h-5 w-5 animate-bounce text-gold-300" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
