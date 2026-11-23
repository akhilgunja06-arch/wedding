import { useState } from 'react';
import { Loader2, Music2, Pause, Play, Volume2 } from 'lucide-react';
import { useWeddingMusic } from '../../lib/useWeddingMusic';
import { wedding } from '../../config/wedding';

export function MusicPlayer() {
  const { playing, loading, volume, mode, error, start, stop, setVolume } = useWeddingMusic();
  const [musicOn, setMusicOn] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const status = loading
    ? 'Starting…'
    : playing
      ? mode === 'generated'
        ? 'Live ambience'
        : 'Now playing'
      : musicOn
        ? 'Paused'
        : 'Music off';

  const handlePlayPause = async () => {
    if (playing) {
      stop();
      return;
    }
    const started = await start();
    if (started) setMusicOn(true);
  };

  const handleMusicSwitch = async () => {
    if (musicOn) {
      stop();
      setMusicOn(false);
      return;
    }
    setMusicOn(true);
    const started = await start();
    if (!started) setMusicOn(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-[70] max-w-[calc(100vw-6rem)] sm:bottom-6 sm:left-6">
      <div
        className={`glass flex items-center gap-2 overflow-hidden rounded-full py-1.5 pl-1.5 pr-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] transition-all duration-500 ${
          expanded ? 'sm:pr-3' : ''
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <button
          type="button"
          onClick={() => void handlePlayPause()}
          aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-maroon-950 shadow-[0_0_20px_-6px_rgba(201,162,39,0.9)] transition-transform duration-300 hover:scale-105"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
          )}
          {playing && (
            <span
              className="absolute inset-0 animate-ping rounded-full border border-gold-200/50"
              aria-hidden="true"
            />
          )}
        </button>

        <div className="flex min-w-0 flex-col items-start gap-1 pr-1">
          <button
            type="button"
            role="switch"
            aria-checked={musicOn}
            onClick={() => void handleMusicSwitch()}
            className="music-switch"
            aria-label={`Music ${musicOn ? 'on' : 'off'}`}
          >
            <span className="music-switch__track" aria-hidden="true">
              <span className="music-switch__knob" />
            </span>
            <span className="text-[0.52rem] uppercase tracking-[0.18em] text-gold-200/90">
              Music {musicOn ? 'ON' : 'OFF'}
            </span>
          </button>
          <span
            className="hidden max-w-[10rem] truncate text-[0.48rem] uppercase tracking-[0.12em] text-gold-200/45 sm:block"
            title={`${wedding.music.title} · ${wedding.music.credit}`}
            aria-live="polite"
          >
            {status} · {wedding.music.title}
          </span>
        </div>

        <div
          className={`flex items-center gap-2 overflow-hidden transition-all duration-500 ${
            expanded ? 'max-w-[7rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5 shrink-0 text-gold-300/70" aria-hidden="true" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="gold-range w-16 cursor-pointer"
            aria-label="Music volume"
          />
        </div>

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gold-300/70 transition-colors hover:text-gold-100 sm:hidden"
          aria-label={expanded ? 'Hide volume control' : 'Show volume control'}
          aria-expanded={expanded}
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {error && (
        <p className="mt-2 max-w-[16rem] rounded-lg border border-rose-500/30 bg-maroon-900/80 px-3 py-1.5 text-[0.55rem] leading-relaxed text-blush-200/80">
          {error}
        </p>
      )}

      <a
        href={wedding.music.creditUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-1.5 flex items-center gap-1.5 pl-2 text-[0.52rem] uppercase tracking-[0.14em] text-gold-200/40 transition-colors hover:text-gold-200/70"
        title={wedding.music.credit}
      >
        <Music2 className="h-2.5 w-2.5" aria-hidden="true" />
        Music credit
      </a>
    </div>
  );
}
