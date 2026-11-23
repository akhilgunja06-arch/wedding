import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { burstGold } from '../effects/PetalCanvas';

const TARGETS =
  'a.btn-gold, a.btn-outline-gold, a.btn-emerald, button.btn-gold, button.btn-outline-gold, button.btn-emerald, [data-click-effect]';

/**
 * Adds a soft gold ripple to important buttons and a small golden particle
 * burst at the pointer. Pure DOM work so every button inherits the effect
 * without extra component wrappers.
 */
export function ClickEffects() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const origin = event.target as HTMLElement | null;
      const target = origin?.closest<HTMLElement>(TARGETS);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 750);

      if (!reduced) burstGold(event.clientX, event.clientY);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduced]);

  return null;
}
