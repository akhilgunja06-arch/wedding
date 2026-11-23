import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Gem,
  HeartHandshake,
  Infinity as InfinityIcon,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Wheat,
} from 'lucide-react';
import { wedding, type SaptaPadhiStep } from '../../config/wedding';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeading } from '../ui/Section';
import { Diya, FrameCorners, GoldDivider, Lotus } from '../ui/Ornaments';
import { PaisleyBand } from '../ui/TempleOrnaments';

const STEP_ICONS: Record<SaptaPadhiStep['icon'], typeof Wheat> = {
  grain: Wheat,
  strength: ShieldCheck,
  prosperity: Gem,
  happiness: Sun,
  family: Users,
  friendship: HeartHandshake,
  forever: InfinityIcon,
};

export function SaptaPadhi() {
  const steps = wedding.saptaPadhi;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const step = steps[index];
  const isLast = index === steps.length - 1;
  const Icon = STEP_ICONS[step.icon];

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, next));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    setIndex(clamped);
  };

  const slide = reduced
    ? {}
    : {
        initial: { opacity: 0, x: direction * 44 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: direction * -44 },
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
      };

  return (
    <Section id="saptapadhi" slide={5} labelledBy="saptapadhi-heading" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,31,0.78),rgba(5,44,41,0.42)_48%,rgba(3,18,28,0.85))]" />
        <div className="absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,180,71,0.14),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <SectionHeading
          id="saptapadhi-heading"
          eyebrow="Sapta Padhi"
          title={wedding.messages.saptaTitle}
          telugu={wedding.messages.saptaTelugu}
        />

        <Reveal className="mt-6" delay={0.05}>
          <p className="body-lux mx-auto max-w-2xl text-center text-sm sm:text-base">
            {wedding.messages.saptaIntro}
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <div
            className="ornate-card relative overflow-hidden rounded-[2rem] px-3 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8"
            role="group"
            tabIndex={0}
            data-local-keys
            aria-label="Sapta Padhi — the seven sacred steps"
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                goTo(index + 1);
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goTo(index - 1);
              }
            }}
          >
            <FrameCorners size={52} className="opacity-35" />

            <div className="relative flex items-center justify-between gap-1 sm:justify-center sm:gap-3">
              {steps.map((item, stepIndex) => {
                const active = stepIndex === index;
                const passed = stepIndex < index;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => goTo(stepIndex)}
                    data-click-effect
                    aria-label={`Step ${stepIndex + 1}: ${item.title} (${item.vowWordLatin})`}
                    aria-current={active ? 'step' : undefined}
                    className={`group flex min-h-[3rem] min-w-[2.2rem] flex-col items-center justify-center gap-1 rounded-xl px-0.5 transition-colors duration-300 sm:min-w-[3rem] sm:px-1 ${
                      active ? 'text-gold-100' : 'text-gold-200/45 hover:text-gold-200/80'
                    }`}
                  >
                    <Diya
                      lit={active || passed}
                      className={`h-6 w-6 transition-transform duration-300 sm:h-8 sm:w-8 ${
                        active ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    <span
                      className={`text-[0.52rem] tracking-[0.16em] ${
                        active ? 'text-gold-200' : 'text-gold-200/35'
                      }`}
                    >
                      {item.number}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-4 min-h-[30rem] sm:min-h-[27rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.number}
                  {...slide}
                  drag={reduced ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) goTo(index + 1);
                    else if (info.offset.x > 70) goTo(index - 1);
                  }}
                  className="flex flex-col items-center px-1 text-center"
                  aria-live="polite"
                >
                  <div className="mt-2 flex items-center gap-4 sm:gap-6">
                    <span className="step-medallion h-16 w-16 shrink-0 text-gold-300 sm:h-20 sm:w-20">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
                    </span>
                    <div className="text-left">
                      <p className="text-[0.5rem] uppercase tracking-[0.34em] text-gold-300/60">
                        Step {index + 1} of {steps.length}
                      </p>
                      <h3 className="font-display mt-1 text-2xl text-gold-100 sm:text-3xl">{step.title}</h3>
                      <p lang="te" className="font-telugu mt-0.5 text-sm text-gold-300/80">
                        {step.titleTelugu}
                      </p>
                    </div>
                    <span
                      className="font-display ml-auto hidden text-6xl leading-none text-transparent sm:block"
                      style={{ WebkitTextStroke: '1px rgba(233,211,163,0.45)' }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className="vow-seal mt-5">
                    <span lang="te" className="font-telugu-display text-gold-gradient text-2xl leading-none">
                      {step.vowWord}
                    </span>
                    <span className="text-[0.46rem] uppercase tracking-[0.28em] text-gold-300/55">
                      {step.vowWordLatin}
                    </span>
                  </div>

                  <div className="relative mt-5 w-full max-w-2xl rounded-2xl border border-gold-300/20 bg-peacock-950/45 px-4 py-5 backdrop-blur-sm sm:px-7">
                    <Lotus className="mx-auto -mt-9 h-6 w-12 opacity-80" />
                    <p className="text-[0.48rem] uppercase tracking-[0.3em] text-gold-300/50">
                      Traditional vow
                    </p>
                    <p lang="te" className="font-telugu mt-2 text-base leading-[1.9] text-gold-100 sm:text-lg">
                      “{step.vowTelugu}”
                    </p>
                    <div className="gold-rule mx-auto my-4 w-24" />
                    <p className="text-[0.48rem] uppercase tracking-[0.3em] text-gold-300/50">
                      Simple meaning
                    </p>
                    <p lang="te" className="font-telugu mt-1 text-sm leading-[1.9] text-gold-200/90 sm:text-base">
                      {step.meaningTelugu}
                    </p>
                    <p className="body-lux mt-3 text-sm italic text-gold-200/70">{step.meaningEnglish}</p>
                  </div>

                  {isLast && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.25 }}
                      className="mt-6 w-full max-w-2xl rounded-2xl border border-gold-300/30 bg-gradient-to-br from-gold-500/10 to-transparent px-5 py-5"
                    >
                      <p className="text-[0.5rem] uppercase tracking-[0.28em] text-gold-300/60">
                        {wedding.messages.saptaFinalHeading}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                        {steps.map((item) => (
                          <span
                            key={item.number}
                            className="rounded-full border border-gold-300/25 bg-gold-200/5 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.14em] text-gold-200/70"
                          >
                            <span lang="te" className="font-telugu text-[0.62rem]">
                              {item.vowWord}
                            </span>
                          </span>
                        ))}
                      </div>
                      <p className="font-display text-gold-gradient mt-4 text-base tracking-[0.14em] sm:text-lg">
                        {wedding.messages.saptaFinalLine}
                      </p>
                      <p lang="te" className="font-telugu mt-2 text-sm leading-[1.9] text-gold-200/80">
                        {wedding.messages.saptaFinalTelugu}
                      </p>
                      <a href="#finale" className="btn-gold mt-4">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        Continue to the Invitation
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-gold-200/10 pt-5">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className="btn-outline-gold min-h-[2.75rem] px-4 py-2.5 text-[0.58rem] disabled:cursor-not-allowed disabled:opacity-30 sm:px-5"
                aria-label="Previous sacred step"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex flex-1 flex-col items-center gap-2 px-2">
                <div
                  className="flex w-full max-w-[12rem] gap-1"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={steps.length}
                  aria-valuenow={index + 1}
                  aria-label={`Sapta Padhi progress: step ${index + 1} of ${steps.length}`}
                >
                  {steps.map((item, stepIndex) => (
                    <span
                      key={item.number}
                      className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                        stepIndex <= index ? 'bg-gold-300/80' : 'bg-gold-200/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[0.52rem] uppercase tracking-[0.26em] text-gold-200/50">
                  {index + 1} / {steps.length}
                </span>
              </div>

              {isLast ? (
                <a
                  href="#gallery"
                  className="btn-outline-gold min-h-[2.75rem] px-4 py-2.5 text-[0.58rem] sm:px-5"
                  aria-label="Go to the photo gallery"
                >
                  <span className="hidden sm:inline">Gallery</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="btn-outline-gold min-h-[2.75rem] px-4 py-2.5 text-[0.58rem] sm:px-5"
                  aria-label="Next sacred step"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <PaisleyBand className="mx-auto mt-6 w-44 opacity-50" />
            <p className="mt-3 text-center text-[0.55rem] uppercase tracking-[0.22em] text-gold-200/35">
              Swipe, tap a diya or use the arrow keys to walk through the seven steps
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.1}>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <GoldDivider className="w-52" />
            <p lang="te" className="font-telugu text-xs leading-relaxed text-gold-200/60">
              సప్తపది భావాలు సంప్రదాయ వివాహ ఆచారం నుండి తీసుకోబడ్డాయి.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
