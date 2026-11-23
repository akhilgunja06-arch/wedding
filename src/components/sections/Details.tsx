import { CalendarDays, CalendarPlus, Clock, MapPin, Navigation, Sparkles } from 'lucide-react';
import { mapsLinks, wedding, weddingDate, weddingDay } from '../../config/wedding';
import { googleCalendarLink } from '../../lib/calendar';
import { Countdown } from '../ui/Countdown';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { FrameCorners, GoldDivider, Lotus, RingsIllustration } from '../ui/Ornaments';

function InfoTile({
  icon,
  label,
  value,
  hint,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="ornate-card ornate-card--hover group flex h-full flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-300/35 bg-gold-200/5 text-gold-300 transition-colors duration-500 group-hover:border-gold-300/70 group-hover:text-gold-200">
          {icon}
        </span>
        <span className="text-[0.55rem] uppercase tracking-[0.28em] text-gold-300/65">{label}</span>
        <span className="font-display text-xl leading-snug text-gold-100 sm:text-2xl">{value}</span>
        {hint && <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-200/50">{hint}</span>}
      </div>
    </Reveal>
  );
}

export function Details() {
  return (
    <Section id="details" slide={4} labelledBy="details-heading">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          id="details-heading"
          eyebrow="Save the Date"
          title={wedding.messages.detailsHeading}
          telugu={wedding.messages.detailsTelugu}
        />

        <Reveal className="mt-12">
          <div className="ornate-card relative overflow-hidden rounded-[2rem] px-5 py-8 sm:px-10 sm:py-12">
            <FrameCorners size={54} className="opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.14),transparent_60%)]" />

            <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
              <div className="text-center">
                <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/60">
                  {wedding.couple.bride.role}
                </p>
                <p className="font-display mt-1 text-3xl text-gold-100 sm:text-4xl">
                  {wedding.couple.bride.name}
                </p>
                <p lang="te" className="font-telugu text-sm text-gold-200/70">
                  {wedding.couple.bride.teluguName}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <RingsIllustration className="h-20 w-32 anim-float" />
                <span className="font-script text-2xl text-gold-200/85">weds</span>
              </div>

              <div className="text-center">
                <p className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/60">
                  {wedding.couple.groom.role}
                </p>
                <p className="font-display mt-1 text-3xl text-gold-100 sm:text-4xl">
                  {wedding.couple.groom.name}
                </p>
                <p lang="te" className="font-telugu text-sm text-gold-200/70">
                  {wedding.couple.groom.teluguName}
                </p>
              </div>
            </div>

            <GoldDivider className="mx-auto mt-8 w-full max-w-md" />

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <InfoTile
                icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />}
                label="Wedding Date"
                value={wedding.wedding.dateDisplay}
                hint={weddingDay}
              />
              <InfoTile
                delay={0.08}
                icon={<Clock className="h-5 w-5" aria-hidden="true" />}
                label={wedding.wedding.muhurthamLabel}
                value={wedding.wedding.timeDisplay}
                hint="Indian Standard Time"
              />
              <InfoTile
                delay={0.16}
                icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
                label="Venue"
                value={wedding.venue.name}
                hint="Mandavalli Mandal, Eluru District"
              />
            </div>

            <div className="relative mt-9">
              <Countdown target={weddingDate} />
            </div>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={googleCalendarLink()} target="_blank" rel="noreferrer" className="btn-gold w-full sm:w-auto">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Add to Calendar
              </a>
              <a href={mapsLinks.directions} target="_blank" rel="noreferrer" className="btn-outline-gold w-full sm:w-auto">
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get Directions
              </a>
            </div>

            <div className="relative mt-8 flex items-center justify-center gap-3 text-gold-200/50">
              <Lotus className="h-6 w-12" />
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <Lotus className="h-6 w-12" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
