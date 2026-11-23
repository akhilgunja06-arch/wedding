import { useEffect, useState } from 'react';
import type { Deity } from '../../config/wedding';
import { Lotus } from './Ornaments';

interface DeityImageProps {
  deity: Deity;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Deity portrait with a WebP-first source and a JPEG fallback.
 * If both fail, a respectful lotus placeholder is shown instead of a broken image.
 */
export function DeityImage({ deity, className = '', priority = false, sizes }: DeityImageProps) {
  const [stage, setStage] = useState<'webp' | 'jpg' | 'failed'>(
    deity.imageWebp ? 'webp' : 'jpg',
  );

  useEffect(() => {
    setStage(deity.imageWebp ? 'webp' : 'jpg');
  }, [deity.imageWebp]);

  if (stage === 'failed') {
    return (
      <div className={`flex aspect-[3/4] flex-col items-center justify-center gap-3 bg-peacock-900/80 px-4 text-center ${className}`}>
        <Lotus className="h-10 w-20 opacity-70" />
        <p lang="te" className="font-telugu text-base text-gold-200">
          {deity.teluguName}
        </p>
        <p className="text-[0.5rem] uppercase tracking-[0.22em] text-gold-300/55">Image unavailable</p>
      </div>
    );
  }

  return (
    <img
      src={stage === 'webp' ? deity.imageWebp : deity.image}
      alt={deity.alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onError={() => setStage(stage === 'webp' ? 'jpg' : 'failed')}
    />
  );
}
