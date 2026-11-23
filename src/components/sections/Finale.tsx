import { CalendarPlus, Heart, MapPin, Navigation, Sparkles } from 'lucide-react';
import { mapsLinks, wedding, weddingDay } from '../../config/wedding';
import { googleCalendarLink } from '../../lib/calendar';
import { Reveal } from '../ui/Reveal';
import { GoldDivider, Gopuram, Lotus, RingsIllustration, TempleArch } from '../ui/Ornaments';
import { MandapBackdrop } from '../ui/Backdrops';

export function Finale() {
  return (
    <>
      <section
        id="finale"
        aria-labelledby="finale-heading"
        className="relative z-10 overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pt-28"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <MandapBackdrop className="h-full w-full opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-peacock-950/85 via-peacock-950/55 to-peacock-950" />
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,206,110,0.16),transparent_65%)]" />
          <TempleArch className="absolute -bottom-32 left-1/2 h-[44rem] w-auto -translate-x-1/2" opacity={0.16} />
          <Gopuram className="absolute -bottom-2 left-0 w-36 opacity-15 sm:w-52" />
          <Gopuram className="absolute -bottom-2 right-0 w-36 opacity-15 sm:w-52" />
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <Reveal>
            <Lotus className="mx-auto h-10 w-20 opacity-80" />
            <p className="eyebrow mt-5">A Final Blessing</p>
            <h2 id="finale-heading" className="h-display mt-4 text-gold-gradient text-gold-glow">
              {wedding.messages.finaleHeading}
            </h2>
            <p className="font-display mx-auto mt-4 max-w-2xl text-lg italic text-gold-100/85 sm:text-2xl">
              {wedding.messages.finaleSubheading}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <RingsIllustration className="mx-auto h-32 w-52 anim-float sm:h-40 sm:w-64" />
          </Reveal>

          <Reveal delay={0.18} className="mt-6 w-full">
            <p className="font-display flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[clamp(1.7rem,5vw,3.2rem)] tracking-[0.1em] text-gold-100">
              <span>{wedding.couple.bride.name.toUpperCase()}</span>
              <Heart className="h-5 w-5 fill-rosegold-500/90 text-rosegold-500 sm:h-7 sm:w-7" aria-hidden="true" />
              <span>{wedding.couple.groom.name.toUpperCase()}</span>
            </p>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.32em] text-gold-300/70">
              {weddingDay} · {wedding.wedding.dateDisplay} · {wedding.wedding.timeDisplay}
            </p>
            <p className="mt-1 text-[0.58rem] uppercase tracking-[0.22em] text-gold-200/50">
              {wedding.venue.address}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-8 w-full max-w-2xl">
            <GoldDivider className="mx-auto w-64" />
            <p lang="te" className="font-telugu mt-6 text-base leading-[2] text-gold-200/85 sm:text-lg">
              {wedding.messages.finaleTelugu}
            </p>
            <GoldDivider className="mx-auto mt-6 w-64" />
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a href={mapsLinks.search} target="_blank" rel="noreferrer" className="btn-gold w-full sm:w-auto">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              View Location
            </a>
            <a href={mapsLinks.directions} target="_blank" rel="noreferrer" className="btn-outline-gold w-full sm:w-auto">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
            <a href={googleCalendarLink()} target="_blank" rel="noreferrer" className="btn-outline-gold w-full sm:w-auto">
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Add to Calendar
            </a>
          </Reveal>

          <Reveal delay={0.35} className="mt-10">
            <p className="font-script flex flex-wrap items-baseline justify-center gap-x-2 text-3xl text-gold-200/85 sm:text-4xl">
              <span>With love,</span>
              <span>{wedding.couple.bride.name}</span>
              <span aria-hidden="true" className="text-2xl opacity-70">&amp;</span>
              <span>{wedding.couple.groom.name}</span>
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-[0.55rem] uppercase tracking-[0.28em] text-gold-300/50">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {wedding.messages.footerNote}
              <Sparkles className="h-3 w-3" aria-hidden="true" />
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gold-200/15 px-5 py-10 text-center sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
          <p className="font-display text-sm tracking-[0.4em] text-gold-200/80">{wedding.couple.monogram}</p>
          <GoldDivider className="w-40 opacity-60" />
          <p className="text-[0.58rem] uppercase tracking-[0.26em] text-gold-200/50">
            {wedding.couple.bride.name} &amp; {wedding.couple.groom.name} · {wedding.wedding.dateLong}
          </p>
          <p className="text-[0.55rem] uppercase tracking-[0.2em] text-gold-200/30">
            {wedding.venue.name} · Mandavalli Mandal · Eluru District · Andhra Pradesh
          </p>
          <p className="mt-2 max-w-2xl text-[0.5rem] leading-relaxed tracking-[0.06em] text-gold-200/30">
            Devotional photographs from Wikimedia Commons (CC BY-SA / CC BY / GODL).{' '}
            <a
              href={wedding.music.creditUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-2 transition-colors hover:text-gold-200/70 hover:underline"
            >
              Music: {wedding.music.credit}
            </a>
          </p>
          <a
            href="#blessings"
            className="mt-3 text-[0.55rem] uppercase tracking-[0.28em] text-gold-300/50 transition-colors hover:text-gold-200"
          >
            Back to the blessings ↑
          </a>
        </div>
      </footer>
    </>
  );
}
