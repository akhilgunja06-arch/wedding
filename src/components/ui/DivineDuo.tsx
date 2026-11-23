import { wedding, type Deity } from '../../config/wedding';
import { ArchCrown } from './TempleOrnaments';
import { Lotus } from './Ornaments';

const [venkateswara, padmavathi] = wedding.deities;

function DuoPortrait({ deity, priority }: { deity: Deity; priority?: boolean }) {
  return (
    <figure className="duo-portrait group/portrait">
      <div className="duo-portrait__frame">
        <picture>
          <source srcSet={deity.duoImageWebp} type="image/webp" />
          <img
            src={deity.duoImageJpg}
            alt={deity.alt}
            width={600}
            height={800}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="duo-portrait__img"
          />
        </picture>
        <span className="duo-portrait__sheen" aria-hidden="true" />
        <span className="duo-portrait__ring" aria-hidden="true" />
      </div>
      <figcaption className="duo-portrait__caption">
        <span lang="te" className="font-telugu text-[0.6rem] leading-tight text-gold-200/95 sm:text-[0.72rem]">
          {deity.teluguName}
        </span>
        <span className="mt-0.5 block text-[0.4rem] uppercase tracking-[0.2em] text-gold-300/60 sm:text-[0.46rem]">
          {deity.id === 'venkateswara' ? 'Tirumala · Photograph' : 'Tiruchanur · Traditional artwork'}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * One temple-style frame holding Sri Venkateswara Swamy and Sri Padmavathi
 * Ammavaru together. Both images keep their original features; only light
 * colour and clarity enhancement is applied in CSS.
 */
export function DivineDuo() {
  return (
    <div className="divine-duo relative flex w-full flex-col items-center">
      <div className="divine-duo__halo" aria-hidden="true" />
      <div className="divine-duo__rays anim-spin-slower" aria-hidden="true" />

      <div className="relative w-full max-w-[22rem] sm:max-w-[25rem]">
        <ArchCrown
          className="absolute -top-7 left-1/2 z-20 w-[58%] -translate-x-1/2 opacity-95 sm:-top-8"
          aria-hidden="true"
        />
        <div className="duo-frame">
          <div className="duo-frame__inner">
            <p className="duo-frame__eyebrow">
              <span className="text-[0.38rem] uppercase tracking-[0.34em] text-gold-300/55 sm:text-[0.42rem]">
                {wedding.messages.openingDarshanLabel}
              </span>
            </p>

            <div className="duo-frame__portraits">
              <DuoPortrait deity={venkateswara} priority />
              <div className="duo-divider" aria-hidden="true">
                <span className="duo-divider__line" />
                <Lotus className="h-4 w-8 shrink-0 opacity-90 sm:h-5 sm:w-10" />
                <span className="duo-divider__line" />
              </div>
              <DuoPortrait deity={padmavathi} priority />
            </div>

            <div className="duo-frame__plaque">
              <span lang="te" className="font-telugu-display text-[0.6rem] leading-snug text-gold-gradient sm:text-[0.72rem]">
                శ్రీ వేంకటేశ్వర స్వామి · శ్రీ పద్మావతి అమ్మవారు
              </span>
              <span className="mt-0.5 block text-[0.36rem] uppercase tracking-[0.24em] text-gold-300/55 sm:text-[0.4rem]">
                The Divine Couple of Tirumala &amp; Tiruchanur
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="duo-credits mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.4rem] leading-relaxed tracking-[0.04em] text-gold-200/40 sm:text-[0.44rem]">
        <a href={venkateswara.creditUrl} target="_blank" rel="noreferrer noopener" className="underline-offset-2 hover:text-gold-200/75 hover:underline">
          Venkateswara photograph: Megala Shankar · CC BY-SA 4.0
        </a>
        <span aria-hidden="true" className="text-gold-300/25">·</span>
        <a href={padmavathi.creditUrl} target="_blank" rel="noreferrer noopener" className="underline-offset-2 hover:text-gold-200/75 hover:underline">
          Padmavathi: traditional devotional artwork · CC BY-SA 4.0
        </a>
      </p>
    </div>
  );
}
