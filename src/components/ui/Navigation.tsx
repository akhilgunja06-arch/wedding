import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { sectionLinks } from '../../config/sections';
import { wedding } from '../../config/wedding';
import { GoldDivider, Lotus } from './Ornaments';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-gold-500 via-gold-200 to-gold-500"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled
            ? 'border-b border-gold-200/15 bg-peacock-950/85 backdrop-blur-lg'
            : 'bg-gradient-to-b from-peacock-950/75 via-peacock-950/25 to-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#blessings" className="group flex items-center gap-3" aria-label="Back to the blessings">
            <span className="relative grid h-10 w-10 place-items-center rounded-full border border-gold-300/40 bg-peacock-900/50">
              <span className="font-display text-[0.6rem] tracking-[0.06em] text-gold-200">
                {wedding.couple.monogram}
              </span>
              <span className="absolute inset-0 rounded-full border border-gold-300/10 transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[0.58rem] uppercase tracking-[0.3em] text-gold-200/80">
                {wedding.couple.bride.name} &amp; {wedding.couple.groom.name}
              </span>
              <span className="text-[0.5rem] uppercase tracking-[0.28em] text-gold-300/45">
                {wedding.wedding.dateDisplay} · {wedding.venue.name}
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-gold-200/30 bg-peacock-900/40 px-4 py-2 text-[0.58rem] uppercase tracking-[0.24em] text-gold-200 transition-colors duration-300 hover:border-gold-200/70 hover:bg-gold-200/10"
            aria-expanded={menuOpen}
            aria-controls="wedding-menu"
          >
            <Menu className="h-3.5 w-3.5" aria-hidden="true" />
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="wedding-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Invitation navigation"
            className="fixed inset-0 z-[80] overflow-y-auto bg-peacock-950/97 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.14),transparent_65%)]" />
              <Lotus className="absolute bottom-6 left-1/2 h-16 w-32 -translate-x-1/2 opacity-20" />
            </div>

            <div className="relative mx-auto flex min-h-full max-w-2xl flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs tracking-[0.4em] text-gold-300/70">
                  {wedding.couple.monogram}
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-gold-200/35 text-gold-100 transition-colors hover:bg-gold-200/10"
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="font-script flex flex-wrap items-baseline justify-center gap-x-3 text-3xl text-gold-200/90">
                  <span>{wedding.couple.bride.name}</span>
                  <span aria-hidden="true" className="text-2xl opacity-70">&amp;</span>
                  <span>{wedding.couple.groom.name}</span>
                </p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-[0.3em] text-gold-300/50">
                  {wedding.wedding.dateLong} · {wedding.wedding.timeDisplay}
                </p>
              </div>

              <GoldDivider className="mx-auto mt-5 w-48" />

              <nav aria-label="Sections of the invitation" className="mt-6 flex-1">
                <ul className="grid gap-1">
                  {sectionLinks.map((section, index) => (
                    <motion.li
                      key={section.id}
                      initial={reduced ? false : { opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04, duration: 0.5 }}
                    >
                      <a
                        href={`#${section.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline justify-between gap-4 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-gold-200/5"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-[0.55rem] tracking-[0.2em] text-gold-400/50">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display text-xl text-gold-100/90 transition-colors group-hover:text-gold-200 sm:text-2xl">
                            {section.label}
                          </span>
                        </span>
                        <span lang="te" className="font-telugu text-[0.72rem] text-gold-300/60">
                          {section.telugu}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 border-t border-gold-200/10 pt-5 text-center">
                <p className="flex items-center justify-center gap-2 text-[0.55rem] uppercase tracking-[0.26em] text-gold-200/45">
                  <Heart className="h-3 w-3 fill-rosegold-500/70 text-rosegold-500" aria-hidden="true" />
                  {wedding.venue.address}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
