import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Petal {
  x: number;
  y: number;
  size: number;
  angle: number;
  spin: number;
  vx: number;
  vy: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  opacity: number;
  tone: number;
  dust: boolean;
  life: number;
}

const TONES = ['#fffdf5', '#f9f3e6', '#f0d6cb', '#f4e6c6', '#e3bda9'];

function makePetal(width: number, height: number, dust = false): Petal {
  return {
    x: Math.random() * width,
    y: dust ? Math.random() * height : -40 - Math.random() * height * 0.4,
    size: dust ? 0.8 + Math.random() * 1.9 : 5 + Math.random() * 7,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.012,
    vx: (Math.random() - 0.5) * 0.22,
    vy: dust ? 0.06 + Math.random() * 0.18 : 0.24 + Math.random() * 0.5,
    sway: dust ? 2 : 12 + Math.random() * 26,
    swaySpeed: 0.0003 + Math.random() * 0.0007,
    phase: Math.random() * Math.PI * 2,
    opacity: dust ? 0.25 + Math.random() * 0.5 : 0.35 + Math.random() * 0.5,
    tone: Math.floor(Math.random() * TONES.length),
    dust,
    life: 1,
  };
}

export function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let petals: Petal[] = [];
    let frame = 0;
    let last = performance.now();
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const petalCount = width < 640 ? 14 : width < 1024 ? 24 : 34;
      const dustCount = width < 640 ? 12 : width < 1024 ? 20 : 28;
      petals = [
        ...Array.from({ length: petalCount }, () => makePetal(width, height)),
        ...Array.from({ length: dustCount }, () => makePetal(width, height, true)),
      ];
    };

    const drawPetal = (petal: Petal) => {
      const { x, y, size, angle, opacity, tone, dust } = petal;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      if (dust) {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3.2);
        gradient.addColorStop(0, 'rgba(255, 240, 200, 0.95)');
        gradient.addColorStop(0.4, 'rgba(233, 209, 148, 0.45)');
        gradient.addColorStop(1, 'rgba(201, 162, 39, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size * 3.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const gradient = ctx.createLinearGradient(0, -size, 0, size);
        gradient.addColorStop(0, TONES[tone]);
        gradient.addColorStop(1, tone % 2 === 0 ? '#e2a6ad' : '#dfbd72');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size * 0.78, -size * 0.45, size * 0.62, size * 0.55, 0, size);
        ctx.bezierCurveTo(-size * 0.62, size * 0.55, -size * 0.78, -size * 0.45, 0, -size);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 250, 242, 0.28)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.7);
        ctx.lineTo(0, size * 0.75);
        ctx.stroke();
      }
      ctx.restore();
    };

    const step = (now: number) => {
      if (!running) return;
      const delta = Math.min(now - last, 48);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const petal of petals) {
        petal.phase += petal.swaySpeed * delta * 60;
        petal.x += (petal.vx + Math.sin(petal.phase) * petal.sway * 0.008) * (delta / 16.67);
        petal.y += petal.vy * (delta / 16.67);
        petal.angle += petal.spin * (delta / 16.67);
        if (petal.life < 1) petal.life = Math.min(1, petal.life + 0.02);

        if (petal.y > height + 40 || petal.x < -60 || petal.x > width + 60) {
          Object.assign(petal, makePetal(width, height, petal.dust));
          if (petal.dust) {
            petal.y = Math.random() * height;
            petal.life = 0.2;
          }
        }
        drawPetal(petal);
      }

      frame = requestAnimationFrame(step);
    };

    const burst = (event: Event) => {
      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail ?? {};
      const originX = detail.x ?? width / 2;
      const originY = detail.y ?? height * 0.55;
      for (let index = 0; index < 34; index += 1) {
        const petal = makePetal(width, height);
        petal.x = originX + (Math.random() - 0.5) * 120;
        petal.y = originY + (Math.random() - 0.5) * 80;
        petal.vx = (Math.random() - 0.5) * 5.5;
        petal.vy = -2.4 - Math.random() * 4.5;
        petal.size = 4 + Math.random() * 7;
        petal.life = 1;
        petals.push(petal);
      }
      if (petals.length > 220) petals = petals.slice(-220);
    };

    const goldBurst = (event: Event) => {
      const detail = (event as CustomEvent<{ x?: number; y?: number }>).detail ?? {};
      const originX = detail.x ?? width / 2;
      const originY = detail.y ?? height / 2;
      const angle = Math.random() * Math.PI * 2;
      for (let index = 0; index < 26; index += 1) {
        const particle = makePetal(width, height, true);
        const spread = angle + (index / 26) * Math.PI * 2;
        const speed = 1.1 + Math.random() * 2.6;
        particle.x = originX;
        particle.y = originY;
        particle.vx = Math.cos(spread) * speed;
        particle.vy = Math.sin(spread) * speed - 0.7;
        particle.size = 0.7 + Math.random() * 1.9;
        particle.opacity = 0.55 + Math.random() * 0.4;
        particle.life = 1;
        petals.push(particle);
      }
      if (petals.length > 260) petals = petals.slice(-260);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    resize();
    frame = requestAnimationFrame(step);
    window.addEventListener('resize', resize);
    window.addEventListener('wedding:petals', burst);
    window.addEventListener('wedding:goldburst', goldBurst);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('wedding:petals', burst);
      window.removeEventListener('wedding:goldburst', goldBurst);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
}

export function burstPetals(x?: number, y?: number) {
  window.dispatchEvent(new CustomEvent('wedding:petals', { detail: { x, y } }));
}

/** Small golden particle burst used for button and slide transitions. */
export function burstGold(x?: number, y?: number) {
  window.dispatchEvent(new CustomEvent('wedding:goldburst', { detail: { x, y } }));
}
