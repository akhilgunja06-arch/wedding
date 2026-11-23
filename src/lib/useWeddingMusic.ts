import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '../config/wedding';

export type MusicMode = 'file' | 'generated' | 'none';

interface GeneratedNodes {
  ctx: AudioContext;
  master: GainNode;
  timer: number;
  sources: AudioScheduledSourceNode[];
}

export function useWeddingMusic() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState<number>(wedding.music.defaultVolume);
  const [mode, setMode] = useState<MusicMode>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const generatedRef = useRef<GeneratedNodes | null>(null);
  const fileUnavailable = useRef(false);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = Math.min(1, volume);
    const generated = generatedRef.current;
    if (generated) {
      generated.master.gain.cancelScheduledValues(generated.ctx.currentTime);
      generated.master.gain.setTargetAtTime(volume * 0.5, generated.ctx.currentTime, 0.2);
    }
  }, [volume]);

  const stopGenerated = useCallback(() => {
    const generated = generatedRef.current;
    if (!generated) return;
    window.clearInterval(generated.timer);
    generated.master.gain.cancelScheduledValues(generated.ctx.currentTime);
    generated.master.gain.setTargetAtTime(0, generated.ctx.currentTime, 0.25);
    window.setTimeout(() => {
      generated.sources.forEach((source) => {
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
      });
      void generated.ctx.close().catch(() => undefined);
    }, 700);
    generatedRef.current = null;
  }, []);

  const startGenerated = useCallback(async () => {
    const ctx = new AudioContext();
    await ctx.resume();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(master);

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.055;
    droneGain.connect(master);

    const sources: AudioScheduledSourceNode[] = [];
    const droneFrequencies: [number, OscillatorType][] = [
      [110, 'sine'],
      [164.81, 'sine'],
      [220, 'triangle'],
    ];
    droneFrequencies.forEach(([frequency, type]) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = frequency;
      const gain = ctx.createGain();
      gain.gain.value = type === 'triangle' ? 0.25 : 0.5;
      osc.connect(gain);
      gain.connect(droneGain);
      osc.start();
      sources.push(osc);
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.022;
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    lfo.start();
    sources.push(lfo);

    const scale = [293.66, 329.63, 369.99, 440, 493.88, 587.33];
    const pluck = () => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = scale[Math.floor(Math.random() * scale.length)] * (Math.random() < 0.22 ? 0.5 : 1);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0006, now + 2.8);
      osc.connect(gain);
      gain.connect(master);
      gain.connect(delay);
      osc.start(now);
      osc.stop(now + 3);
    };

    const timer = window.setInterval(pluck, 1750);
    window.setTimeout(pluck, 400);

    master.gain.setTargetAtTime(volumeRef.current * 0.5, ctx.currentTime, 0.8);
    generatedRef.current = { ctx, master, timer, sources };
    setMode('generated');
  }, []);

  const playFile = useCallback(async () => {
    if (!wedding.music.src || fileUnavailable.current) return false;
    try {
      const audio = audioRef.current ?? new Audio(wedding.music.src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = Math.min(1, volumeRef.current);
      audioRef.current = audio;
      await audio.play();
      setMode('file');
      return true;
    } catch {
      fileUnavailable.current = true;
      audioRef.current?.pause();
      audioRef.current = null;
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    stopGenerated();
    setPlaying(false);
  }, [stopGenerated]);

  const start = useCallback(async (): Promise<boolean> => {
    if (playing) return true;
    setLoading(true);
    setError(null);
    try {
      const started = await playFile();
      if (!started) {
        if (wedding.music.allowGeneratedFallback) {
          await startGenerated();
        } else {
          setError('Music is unavailable. Add a licensed track at public/audio/wedding-theme.mp3.');
          return false;
        }
      }
      setPlaying(true);
      return true;
    } catch {
      setError('Music could not start. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [playing, playFile, startGenerated]);

  const toggle = useCallback(async (): Promise<boolean> => {
    if (playing) {
      stop();
      return false;
    }
    return start();
  }, [playing, start, stop]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      const generated = generatedRef.current;
      if (generated) {
        window.clearInterval(generated.timer);
        generated.sources.forEach((source) => {
          try {
            source.stop();
          } catch {
            /* noop */
          }
        });
        void generated.ctx.close().catch(() => undefined);
      }
    };
  }, []);

  const setVolume = useCallback((next: number) => {
    setVolumeState(Math.min(1, Math.max(0, next)));
  }, []);

  return { playing, loading, volume, mode, error, start, stop, toggle, setVolume };
}
