import { Heart } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { GoldDivider, Lotus, TempleArch } from '../ui/Ornaments';

export function Family() {
  const { families } = wedding;

  const familyCards = [
    {
      key: 'groom',
      label: families.groomLabel,
      telugu: 'పెళ్లికొడుకు కుటుంబం',
      names: families.groomParents,
      fallback: `The family of ${wedding.couple.groom.name}`,
    },
    {
      key: 'bride',
      label: families.brideLabel,
      telugu: 'పెళ్లికూతురు కుటుంబం',
      names: families.brideParents,
      fallback: `The family of ${wedding.couple.bride.name}`,
    },
  ];

  return (
    <Section id="family" labelledBy="family-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
        <TempleArch className="absolute -bottom-24 left-1/2 h-[42rem] w-auto -translate-x-1/2" opacity={0.12} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(201,162,39,0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <SectionHeading
          id="family-heading"
          eyebrow="With Gratitude"
          title={wedding.messages.familyHeading}
          telugu={wedding.messages.familyTelugu}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {familyCards.map((card, index) => (
            <Reveal key={card.key} delay={index * 0.1}>
              <div className="ornate-card ornate-card--hover relative h-full overflow-hidden rounded-[1.6rem] px-6 py-9 text-center">
                <Lotus className="mx-auto h-8 w-16 opacity-80" />
                <p className="eyebrow mt-4 text-[0.55rem]">{card.label}</p>
                <p className="font-display mt-3 text-2xl leading-snug text-gold-100 sm:text-3xl">
                  {card.names || card.fallback}
                </p>
                <p lang="te" className="font-telugu mt-2 text-sm text-gold-200/65">
                  {card.telugu}
                </p>
                <GoldDivider className="mx-auto mt-6 w-40 opacity-60" />
                <p className="mt-4 text-[0.58rem] uppercase tracking-[0.24em] text-gold-300/50">
                  {card.key === 'groom' ? wedding.couple.groom.role : wedding.couple.bride.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <div className="ornate-card relative overflow-hidden rounded-[1.8rem] px-6 py-10 text-center sm:px-12">
            <span className="font-display pointer-events-none absolute left-4 top-0 text-7xl text-gold-300/10" aria-hidden="true">
              “
            </span>
            <span className="font-display pointer-events-none absolute bottom-0 right-4 text-7xl text-gold-300/10" aria-hidden="true">
              ”
            </span>
            <Heart className="mx-auto h-5 w-5 fill-rosegold-500/70 text-rosegold-500" aria-hidden="true" />
            <p className="body-lux mx-auto mt-5 max-w-2xl text-base italic text-gold-100/85 sm:text-lg">
              {wedding.messages.familyMessage}
            </p>
            <GoldDivider className="mx-auto mt-7 w-56" />
            <p className="font-script mt-5 flex flex-wrap items-baseline justify-center gap-x-3 text-3xl text-gold-200/90">
              <span>{wedding.couple.bride.name}</span>
              <span aria-hidden="true" className="text-2xl opacity-70">&amp;</span>
              <span>{wedding.couple.groom.name}</span>
            </p>
            <p className="mt-1 text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/50">
              {wedding.wedding.dateLong}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
