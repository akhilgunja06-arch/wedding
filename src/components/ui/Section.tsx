import type { ReactNode } from 'react';
import { GoldDivider } from './Ornaments';
import { Reveal } from './Reveal';

export function Section({
  id,
  children,
  className = '',
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate z-10 px-5 py-20 sm:px-8 sm:py-24 md:py-28 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,30,30,0.58),rgba(4,28,32,0.44)_48%,rgba(3,18,28,0.64))]"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  telugu,
  description,
  id,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  telugu?: string;
  description?: string;
  id?: string;
  align?: 'center' | 'left';
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <Reveal className={`flex flex-col ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="h-section text-gold-gradient">
        {title}
      </h2>
      {telugu && (
        <p
          lang="te"
          className={`font-telugu mt-3 max-w-3xl text-base text-gold-200/85 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {telugu}
        </p>
      )}
      <GoldDivider className="mt-6 w-52 sm:w-72" />
      {description && (
        <p className={`body-lux mt-5 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </Reveal>
  );
}
