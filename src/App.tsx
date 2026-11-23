import { useState } from 'react';
import { PhotoLibraryProvider } from './lib/photoLibrary';
import { MusicProvider } from './lib/music';
import { DevotionalBackground } from './components/ui/DevotionalBackground';
import { ScrollDots, ScrollProgress, TopBar } from './components/ui/Navigation';
import { PetalCanvas } from './components/effects/PetalCanvas';
import { MusicPlayer } from './components/ui/MusicPlayer';
import { PhotoManager, PhotoManagerButton } from './components/admin/PhotoManager';
import { Blessing } from './components/sections/Blessing';
import { Deities } from './components/sections/Deities';
import { Hero } from './components/sections/Hero';
import { CoupleIntro } from './components/sections/CoupleIntro';
import { Details } from './components/sections/Details';
import { Venue } from './components/sections/Venue';
import { SaptaPadhi } from './components/sections/SaptaPadhi';
import { Gallery } from './components/sections/Gallery';
import { Family } from './components/sections/Family';
import { Finale } from './components/sections/Finale';

export default function App() {
  const [photoManagerOpen, setPhotoManagerOpen] = useState(false);

  return (
    <PhotoLibraryProvider>
      <MusicProvider>
        <a
          href="#invitation"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-300 focus:px-5 focus:py-2 focus:text-sm focus:text-peacock-950"
        >
          Skip to the wedding invitation
        </a>

        <DevotionalBackground />
        <ScrollProgress />
        <TopBar />
        <ScrollDots />
        <PetalCanvas />

        <main>
          <Blessing />
          <Deities />
          <Hero />
          <CoupleIntro />
          <Details />
          <Venue />
          <SaptaPadhi />
          <Gallery onOpenManager={() => setPhotoManagerOpen(true)} />
          <Family />
          <Finale />
        </main>

        <MusicPlayer />
        <PhotoManagerButton onClick={() => setPhotoManagerOpen(true)} />
        <PhotoManager open={photoManagerOpen} onClose={() => setPhotoManagerOpen(false)} />
      </MusicProvider>
    </PhotoLibraryProvider>
  );
}
