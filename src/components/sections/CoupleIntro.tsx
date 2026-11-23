import { photoById, wedding } from '../../config/wedding';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { Parallax } from '../ui/Parallax';
import { GoldDivider, Lotus, RingsIllustration, TempleArch } from '../ui/Ornaments';

const stagePhoto = photoById('stage');
const romanticPhoto = photoById('romantic');
const groomPhoto = photoById('groom-1');
const bridePhoto = photoById('bride-1');

export function CoupleIntro() {
  return (
    <Section id="couple" labelledBy="couple-heading" className="overflow-hidden">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="couple-heading"
          eyebrow="The Couple"
          title="Two Hearts, One Promise"
          telugu={wedding.messages.storyTelugu}
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div className="pointer-events-none absolute -inset-8 -z-10 opacity-40" aria-hidden="true">
                <TempleArch className="h-full w-full" opacity={0.5} />
              </div>
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-gold-500/10 blur-2xl" />
              {romanticPhoto && (
                <PhotoFrame
                  photo={romanticPhoto}
                  aspectClass="aspect-[3/4]"
                  variant="hero"
                  monogram="T & M"
                  rounded="rounded-[999px_999px_1.4rem_1.4rem]"
                  showLabel
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Lotus className="h-10 w-20 opacity-80" />
              <p className="font-script mt-4 flex flex-wrap items-baseline justify-center gap-x-3 text-3xl text-gold-200/90 lg:justify-start sm:text-4xl">
                <span>{wedding.couple.bride.name}</span>
                <span aria-hidden="true" className="text-2xl opacity-70">&amp;</span>
                <span>{wedding.couple.groom.name}</span>
              </p>
              <p className="body-lux mt-5 max-w-xl font-display text-lg italic text-gold-100/85 sm:text-xl">
                “{wedding.messages.storyQuote}”
              </p>
              <GoldDivider className="mt-7 w-56 sm:w-72" />
              <div className="mt-7 grid w-full max-w-md grid-cols-2 gap-4">
                <div className="ornate-card rounded-2xl px-4 py-4 text-center">
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-gold-300/70">The Bride</p>
                  <p className="mt-1 font-display text-xl text-gold-100">{wedding.couple.bride.name}</p>
                  <p lang="te" className="font-telugu text-xs text-gold-200/70">
                    {wedding.couple.bride.teluguName}
                  </p>
                </div>
                <div className="ornate-card rounded-2xl px-4 py-4 text-center">
                  <p className="text-[0.55rem] uppercase tracking-[0.24em] text-gold-300/70">The Groom</p>
                  <p className="mt-1 font-display text-xl text-gold-100">{wedding.couple.groom.name}</p>
                  <p lang="te" className="font-telugu text-xs text-gold-200/70">
                    {wedding.couple.groom.teluguName}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-gold-300/70">
                {wedding.wedding.dateLong} · {wedding.wedding.timeDisplay}
              </p>
            </div>
          </Reveal>
        </div>

        {stagePhoto && (
          <Reveal className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-[2rem]">
              <Parallax distance={26} className="h-full w-full">
                <PhotoFrame
                  photo={stagePhoto}
                  aspectClass="aspect-[4/3] sm:aspect-[16/9]"
                  variant="hero"
                  monogram="T & M"
                  rounded="rounded-[2rem]"
                />
              </Parallax>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-950/95 via-maroon-950/60 to-transparent px-6 pb-7 pt-24 text-center sm:px-10 sm:pb-9">
                <p className="font-display text-lg italic text-gold-100/85 sm:text-2xl">
                  On our decorated wedding stage
                </p>
                <p className="mt-1 text-[0.58rem] uppercase tracking-[0.3em] text-gold-300/70">
                  {wedding.wedding.dateDisplay} · {wedding.venue.name}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <div className="relative mt-16 sm:mt-20">
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <Reveal delay={0.1} className="w-full">
              {groomPhoto && (
                <PhotoFrame
                  photo={groomPhoto}
                  aspectClass="aspect-[4/5]"
                  variant="hero"
                  monogram="M"
                  showLabel
                  className="mx-auto max-w-xs"
                />
              )}
              <p className="mt-3 text-center text-[0.58rem] uppercase tracking-[0.3em] text-gold-300/60">
                {wedding.couple.groom.role}
              </p>
              <p className="text-center font-display text-2xl text-gold-100">{wedding.couple.groom.name}</p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col items-center gap-2 px-2">
              <RingsIllustration className="h-24 w-36 sm:h-28 sm:w-40" />
              <span className="font-script text-2xl text-gold-200/80">weds</span>
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/50">
                {wedding.couple.monogram}
              </span>
            </Reveal>

            <Reveal className="w-full">
              {bridePhoto && (
                <PhotoFrame
                  photo={bridePhoto}
                  aspectClass="aspect-[4/5]"
                  variant="hero"
                  monogram="T"
                  showLabel
                  className="mx-auto max-w-xs"
                />
              )}
              <p className="mt-3 text-center text-[0.58rem] uppercase tracking-[0.3em] text-gold-300/60">
                {wedding.couple.bride.role}
              </p>
              <p className="text-center font-display text-2xl text-gold-100">{wedding.couple.bride.name}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
