import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Music2, Pause } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { useMusic } from '../../lib/music';
import { DivineDuo } from '../ui/DivineDuo';
import { Torana } from '../ui/TempleOrnaments';
import { Diya, Gopuram, Lotus } from '../ui/Ornaments';
import { burstPetals } from '../effects/PetalCanvas';

export function Blessing() {
  const reduced = useReducedMotion();
  const { playing, loading, start, stop } = useMusic();

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
      data-slide="1"
      aria-labelledby="blessings-heading"
      className="opening relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-[var(--open-pad-bottom)] pt-[var(--open-pad-top)] text-center sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,25,0.84)_0%,rgba(4,33,31,0.42)_38%,rgba(4,30,32,0.52)_70%,rgba(2,10,22,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,214,140,0.18),transparent_62%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,10,22,0.72),transparent)]" />
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
          {...fade(0.18)}
          lang="te"
          className="font-telugu-display mt-[var(--open-gap)] max-w-2xl text-[clamp(0.98rem,2.9vw,1.5rem)] leading-[1.55] text-gold-gradient text-gold-glow"
        >
          {wedding.messages.openingBlessingVenkateswaraTelugu}
        </motion.p>

        <motion.div {...fade(0.36, 28)} className="mt-[var(--open-gap)] flex w-full justify-center">
          <DivineDuo />
        </motion.div>

        <motion.p
          {...fade(0.5)}
          lang="te"
          className="font-telugu-display mt-[var(--open-gap)] max-w-2xl text-[clamp(0.9rem,2.5vw,1.28rem)] leading-[1.65] text-gold-200/90"
        >
          {wedding.messages.openingBlessingPadmavathiTelugu}
        </motion.p>

        <motion.div {...fade(0.62)} className="mt-[calc(var(--open-gap)*0.7)] flex flex-col items-center">
          <h1
            id="blessings-heading"
            lang="te"
            className="font-telugu-display text-[clamp(1.55rem,5.2vw,2.55rem)] leading-tight text-gold-gradient text-gold-glow"
          >
            {wedding.messages.openingCoupleTelugu}
          </h1>
          <p
            lang="te"
            className="font-telugu mt-1.5 text-[clamp(0.9rem,2.4vw,1.18rem)] tracking-[0.14em] text-gold-100/85"
          >
            {wedding.messages.openingWelcomeTelugu}
          </p>
        </motion.div>

        <motion.div {...fade(0.76)} className="mt-[var(--open-gap)] flex flex-col items-center gap-2">
          <Lotus className="h-5 w-12 opacity-70" />
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <a
              href="#invitation"
              onClick={enter}
              className="btn-gold min-h-[2.9rem] w-full px-6 py-3 text-[0.62rem] sm:w-auto"
              aria-label="Enter the wedding invitation"
            >
              {wedding.messages.enterInvitationLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => (playing ? stop() : void start())}
              disabled={loading}
              data-click-effect
              className="btn-outline-gold min-h-[2.9rem] w-full px-5 py-3 text-[0.56rem] disabled:opacity-60 sm:w-auto"
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {loading ? 'Starting…' : playing ? 'Pause the nadaswaram' : wedding.messages.openingMusicPrompt}
            </button>
          </div>
          <p lang="te" className="opening-telugu-hint font-telugu mt-1 text-[0.58rem] tracking-[0.1em] text-gold-300/55">
            {wedding.messages.enterInvitationTelugu}
          </p>
          <a
            href="#invitation"
            onClick={enter}
            className="opening-hint group mt-1 inline-flex flex-col items-center gap-0.5 text-[0.5rem] uppercase tracking-[0.28em] text-gold-200/45 transition-colors hover:text-gold-100"
          >
            {wedding.messages.openingHint}
            <ChevronDown className="h-4 w-4 animate-bounce text-gold-300/80" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
