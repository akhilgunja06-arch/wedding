import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Home } from 'lucide-react';
import { slides } from '../../config/slides';

const LAST = slides.length - 1;

/**
 * Chapter navigator. On wide screens it is a slim rail in the right margin;
 * on tablets and phones it becomes a touch-friendly bar above the music
 * controls. Visitors can always keep scrolling — the deck never traps them.
 */
export function SlideDeck() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [nearTop, setNearTop] = useState(true);
  const activeRef = useRef(0);

  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const chapter = Number((visible.target as HTMLElement).dataset.slide);
        if (Number.isNaN(chapter)) return;
        const next = Math.min(LAST, Math.max(0, chapter - 1));
        activeRef.current = next;
        setActive(next);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const target = index < 0 ? 0 : index > LAST ? 0 : index;
      const element = document.getElementById(slides[target].id);
      if (!element) return;

      activeRef.current = target;
      setActive(target);
      element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    },
    [reduced],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          'input, textarea, select, [contenteditable="true"], [data-local-keys], [role="dialog"]',
        )
      ) {
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(activeRef.current + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeRef.current - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo]);

  const slide = slides[active];
  const navLabel = `Slide ${active + 1} of ${slides.length}: ${slide.label}`;

  return (
    <>
      {/* Desktop / large tablet rail */}
      <nav
        aria-label="Invitation slides"
        className="slide-deck group fixed right-3 top-1/2 z-[68] hidden -translate-y-1/2 flex-col items-center gap-0.5 rounded-full px-1.5 py-2 xl:flex"
      >
        <span className="slide-deck__tip" aria-hidden="true">
          {slide.number} · {slide.label}
        </span>

        <button
          type="button"
          onClick={() => goTo(0)}
          data-click-effect
          className="slide-deck__btn"
          aria-label="Return to the first slide"
          title="Return to the beginning"
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          data-click-effect
          className="slide-deck__btn disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        </button>

        <div
          className="flex flex-col items-center gap-1 py-1"
          role="group"
          aria-label={navLabel}
        >
          {slides.map((item, index) => {
            const current = index === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${item.number}: ${item.label}`}
                aria-current={current ? 'step' : undefined}
                className="slide-deck__tick"
              >
                <span
                  className={`block w-[3px] rounded-full transition-all duration-500 ${
                    current
                      ? 'h-5 bg-gradient-to-b from-gold-200 to-gold-500 shadow-[0_0_10px_rgba(233,211,163,0.75)]'
                      : index < active
                        ? 'h-2.5 bg-gold-300/55'
                        : 'h-2.5 bg-gold-200/20'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          data-click-effect
          className="slide-deck__btn"
          aria-label={active === LAST ? 'Return to the first slide' : 'Next slide'}
          title={active === LAST ? 'Return to the beginning' : 'Next slide'}
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>

      {/* Phone / small tablet bar */}
      <nav
        aria-label="Invitation slides"
        className={`slide-deck fixed bottom-[max(4.9rem,calc(env(safe-area-inset-bottom)+4.6rem))] left-1/2 z-[68] -translate-x-1/2 items-center gap-1 rounded-full px-1.5 py-1.5 sm:gap-1.5 sm:px-2 xl:hidden ${
          nearTop ? 'hidden' : 'flex'
        }`}
      >
        <button
          type="button"
          onClick={() => goTo(0)}
          data-click-effect
          className="slide-deck__btn"
          aria-label="Return to the first slide"
          title="Return to the beginning"
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          data-click-effect
          className="slide-deck__btn disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="slide-deck__center flex min-w-0 flex-col items-center px-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-[0.72rem] leading-none tracking-[0.16em] text-gold-100">
              {slide.number}
            </span>
            <span className="text-[0.42rem] leading-none tracking-[0.18em] text-gold-300/45">
              / {slides[LAST].number}
            </span>
            <span className="hidden max-w-[9rem] truncate text-[0.44rem] uppercase tracking-[0.2em] text-gold-300/65 sm:inline">
              {slide.label}
            </span>
          </div>

          <div
            className="mt-1 flex w-full items-center justify-center gap-[3px]"
            role="group"
            aria-label={navLabel}
          >
            {slides.map((item, index) => {
              const current = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${item.number}: ${item.label}`}
                  aria-current={current ? 'step' : undefined}
                  className="slide-deck__tick"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-500 ${
                      current
                        ? 'w-5 bg-gradient-to-r from-gold-200 to-gold-500 shadow-[0_0_10px_rgba(233,211,163,0.75)]'
                        : index < active
                          ? 'w-2.5 bg-gold-300/55'
                          : 'w-2.5 bg-gold-200/20'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          data-click-effect
          className="slide-deck__btn"
          aria-label={active === LAST ? 'Return to the first slide' : 'Next slide'}
          title={active === LAST ? 'Return to the beginning' : 'Next slide'}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>

      <p className="sr-only" aria-live="polite">
        {navLabel} — {slide.telugu}
      </p>
    </>
  );
}
