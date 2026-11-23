import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock, Heart, MapPin, Sparkles } from 'lucide-react';
import { photoById, wedding } from '../../config/wedding';
import { usePhotoLibrary } from '../../lib/photoLibrary';
import { FrameCorners, GoldDivider, Lotus, TempleArch } from '../ui/Ornaments';
import { FloralVine, Kalash } from '../ui/TempleOrnaments';
import { burstPetals } from '../effects/PetalCanvas';

const heroPhoto = photoById('hero');

export function Hero() {
  const reduced = useReducedMotion();
  const { overrides } = usePhotoLibrary();
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const candidate = overrides.hero ?? heroPhoto?.src;

  useEffect(() => {
    if (!candidate) {
      setPhotoSrc(null);
      return;
    }
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!cancelled) setPhotoSrc(candidate);
    };
    image.onerror = () => {
      if (!cancelled) setPhotoSrc(null);
    };
    image.src = candidate;
    return () => {
      cancelled = true;
    };
  }, [candidate]);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.05, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        };

  const explore = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    burstPetals(window.innerWidth / 2, window.innerHeight * 0.55);
    document
      .getElementById('details')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-heading"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden px-4 pb-28 pt-24 sm:px-8 sm:pb-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,24,25,0.82),rgba(4,33,31,0.45)_45%,rgba(3,16,25,0.9))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,214,140,0.14),transparent_62%)]" />
        <TempleArch
          className="absolute -bottom-40 left-1/2 h-[46rem] w-auto -translate-x-1/2"
          opacity={0.12}
        />
        <Kalash className="absolute bottom-8 left-4 hidden w-16 opacity-40 lg:block" />
        <Kalash className="absolute bottom-8 right-4 hidden w-16 opacity-40 lg:block" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p {...fade(0.1)} className="eyebrow flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span>13 · 12 · 2026</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
            <span>Lingala</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
            <span>Andhra Pradesh</span>
          </motion.p>

          <motion.p
            {...fade(0.2)}
            lang="te"
            className="font-telugu-display mt-5 text-[clamp(1.35rem,4.2vw,2.3rem)] leading-[1.5] text-gold-gradient text-gold-glow"
          >
            {wedding.messages.welcomeTelugu}
          </motion.p>

          <motion.h2
            {...fade(0.32)}
            id="invitation-heading"
            className="mt-3 flex flex-nowrap items-center justify-center gap-x-2.5 font-display text-[clamp(1.55rem,5vw,3.3rem)] leading-[1.05] tracking-[0.06em] text-ivory sm:gap-x-3 lg:justify-start"
          >
            <span className="text-gold-gradient">{wedding.couple.bride.name.toUpperCase()}</span>
            <Heart
              className="h-[0.55em] w-[0.55em] fill-rosegold-400 text-rosegold-400 anim-glow"
              aria-hidden="true"
              strokeWidth={1.4}
            />
            <span className="text-gold-gradient">{wedding.couple.groom.name.toUpperCase()}</span>
          </motion.h2>

          <motion.p
            {...fade(0.42)}
            lang="te"
            className="font-telugu mt-2 text-[clamp(1rem,2.8vw,1.35rem)] tracking-[0.16em] text-gold-200/90"
          >
            {wedding.couple.bride.teluguName} ❤️ {wedding.couple.groom.teluguName}
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-5 w-full max-w-xl">
            <GoldDivider className="w-full lg:max-w-md" />
          </motion.div>

          <motion.p {...fade(0.56)} className="body-lux mt-5 max-w-xl">
            {wedding.messages.welcomeEnglish}
          </motion.p>

          <motion.p
            {...fade(0.64)}
            lang="te"
            className="font-telugu mt-3 max-w-xl text-[0.82rem] leading-[1.9] text-gold-200/75 sm:text-sm"
          >
            {wedding.messages.welcomeTeluguMessage}
          </motion.p>

          <motion.ul {...fade(0.72)} className="mt-7 grid w-full max-w-xl gap-2.5 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: 'Date', value: wedding.wedding.dateDisplay },
              { icon: Clock, label: wedding.wedding.muhurthamLabel, value: `${wedding.wedding.timeDisplay} IST` },
              { icon: MapPin, label: 'Venue', value: wedding.venue.name },
            ].map((item) => (
              <li
                key={item.label}
                className="glass-card flex items-center gap-3 rounded-xl px-3 py-2.5 text-left"
              >
                <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[0.48rem] uppercase tracking-[0.24em] text-gold-300/65">
                    {item.label}
                  </span>
                  <span className="block truncate font-display text-sm text-gold-100 sm:text-base">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.82)} className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#details" onClick={explore} className="btn-gold w-full sm:w-auto">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Explore Invitation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#gallery" className="btn-outline-gold w-full sm:w-auto">
              View Photographs
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.45)} className="relative mx-auto hidden w-full max-w-sm lg:block">
          <div className="pointer-events-none absolute -inset-6 -z-10 opacity-60" aria-hidden="true">
            <TempleArch className="h-full w-full" opacity={0.55} />
          </div>
          <div
            className="anim-spin-slow pointer-events-none absolute -inset-8 -z-10 rounded-full border border-dashed border-gold-400/20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <div className="frame-gold rounded-[999px_999px_1.6rem_1.6rem]">
              <div className="frame-gold__inner relative aspect-[3/4] rounded-[999px_999px_1.35rem_1.35rem]">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={`${wedding.couple.bride.name} and ${wedding.couple.groom.name}`}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center">
                    <div className="pointer-events-none absolute inset-0 opacity-25">
                      <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 anim-spin-slower rounded-full border border-gold-400/40" />
                      <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/50" />
                    </div>
                    <FrameCorners size={30} className="opacity-40" />
                    <Lotus className="h-9 w-16 opacity-90" />
                    <p className="font-display text-3xl tracking-[0.2em] text-gold-gradient">
                      {wedding.couple.monogram}
                    </p>
                    <p className="text-[0.52rem] uppercase tracking-[0.28em] text-gold-200/55">
                      {wedding.wedding.dateLong}
                    </p>
                    <p lang="te" className="font-telugu text-[0.6rem] text-gold-200/60">
                      శుభ ముహూర్తం
                    </p>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-gold-200/20" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-6 -bottom-6 flex justify-center">
              <FloralVine className="h-16 w-16 rotate-[-135deg] opacity-70" />
            </div>
            <p className="font-script mt-8 text-center text-2xl text-gold-200/80">Forever begins</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
