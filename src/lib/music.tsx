import { createContext, useContext, type ReactNode } from 'react';
import { useWeddingMusic } from './useWeddingMusic';

type MusicValue = ReturnType<typeof useWeddingMusic>;

const MusicContext = createContext<MusicValue | null>(null);

/** Shares one audio element between the music player and the opening screen. */
export function MusicProvider({ children }: { children: ReactNode }) {
  const value = useWeddingMusic();
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicValue {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used inside MusicProvider');
  return context;
}
