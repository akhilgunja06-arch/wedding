import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { wedding } from '../../config/wedding';

const SLIDE_DURATION = 9500;

/**
 * Slow, layered devotional slideshow behind the whole invitation.
 * Temple photographs fill the screen; deity portraits are never cropped.
 */
export function DevotionalBackground() {
  const slides = wedding.devotionalSlides;
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(1);

  useEffect(() => {
    if (reduced || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, [reduced, slides.length]);

  useEffect(() => {
    setMounted((current) => Math.max(current, index + 1));

    const next = slides[(index + 1) % slides.length];
    if (!next) return;
    const wide = window.matchMedia('(min-width: 768px)').matches;
    const image = new Image();
    image.src = wide ? next.desktop : next.mobile;
  }, [index, slides]);

  return (
    <div className="devo-bg" aria-hidden="true">
      {slides.slice(0, mounted).map((slide, slideIndex) => {
        const active = slideIndex === index;
        const kenBurns = active && !reduced;
        return (
          <div
            key={slide.id}
            className={`devo-slide ${slide.fit === 'contain' ? 'devo-slide--contain' : ''}`}
            data-active={active}
            style={{ ['--devo-focus' as string]: slide.focus }}
          >
            {slide.fit === 'contain' ? (
              <>
                <img
                  className="devo-cover"
                  src={slide.desktop}
                  alt=""
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <img
                  className={`devo-contain ${kenBurns ? 'devo-kb' : ''}`}
                  src={slide.desktop}
                  alt=""
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </>
            ) : (
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktop} />
                <img
                  className={kenBurns ? 'devo-kb' : ''}
                  src={slide.mobile}
                  alt=""
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={slideIndex === 0 ? 'high' : 'low'}
                />
              </picture>
            )}
          </div>
        );
      })}

      <div className="devo-veil--teal" />
      <div className="devo-veil" />
      <div className="devo-glow left-[-12%] top-[8%] h-[34rem] w-[34rem] bg-peacock-500/25" />
      <div className="devo-glow right-[-14%] top-[52%] h-[32rem] w-[32rem] bg-gold-500/15" />
      <div className="devo-mandala" />
      <div className="devo-grain" />
    </div>
  );
}
