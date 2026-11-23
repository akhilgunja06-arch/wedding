import { useState } from 'react';
import { Check, Copy, MapPin, Navigation } from 'lucide-react';
import { mapsLinks, wedding, weddingDay } from '../../config/wedding';
import { MapIllustration } from '../ui/Backdrops';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { GoldDivider, Lotus } from '../ui/Ornaments';

export function Venue() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wedding.venue.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="venue" slide={6} labelledBy="venue-heading" className="overflow-hidden">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="venue-heading"
          eyebrow="Location"
          title="Find Our Wedding Venue"
          telugu="మా వివాహ వేదికను చేరుకోండి"
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gold-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-gold-300/30 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)]">
                <MapIllustration className="h-full w-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8">
                  <span className="pointer-events-none absolute h-24 w-24 animate-ping rounded-full border border-gold-300/30" />
                  <div className="relative rounded-2xl border border-gold-200/30 bg-peacock-950/80 px-5 py-3 text-center backdrop-blur-md">
                    <p className="text-[0.5rem] uppercase tracking-[0.3em] text-gold-300/70">The Venue</p>
                    <p className="font-display text-xl text-gold-100">{wedding.venue.name}</p>
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-gold-200/60">
                      Mandavalli Mandal · Eluru District
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-gold-200/15" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="ornate-card relative overflow-hidden rounded-[1.8rem] px-6 py-8 sm:px-9">
              <Lotus className="h-8 w-16 opacity-70" />
              <p className="eyebrow mt-4">Venue Address</p>
              <address className="mt-3 not-italic">
                {wedding.venue.lines.map((line) => (
                  <span key={line} className="font-display block text-lg leading-relaxed text-gold-100/90 sm:text-xl">
                    {line}
                  </span>
                ))}
              </address>

              <GoldDivider className="mt-6 w-52" />

              <p className="body-lux mt-5 text-sm">
                The muhurtham will be held at{' '}
                <span className="text-gold-200">{wedding.wedding.timeDisplay}</span> on{' '}
                <span className="text-gold-200">{weddingDay}, {wedding.wedding.dateLong}</span>. We would be honoured by your presence.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={mapsLinks.search}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold w-full sm:w-auto"
                  aria-label="View the wedding venue on Google Maps"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  View on Google Maps
                </a>
                <a
                  href={mapsLinks.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-gold w-full sm:w-auto"
                  aria-label="Get directions to the wedding venue from your current location"
                >
                  <Navigation className="h-4 w-4" aria-hidden="true" />
                  Get Directions
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button type="button" onClick={copyAddress} className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-gold-200/60 transition-colors hover:text-gold-100">
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copied ? 'Address copied' : 'Copy address'}
                </button>
                <span className="text-[0.55rem] uppercase tracking-[0.18em] text-gold-200/30">
                  Opens Google Maps in a new tab
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

