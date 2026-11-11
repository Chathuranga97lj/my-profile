'use client';

import { useState, useSyncExternalStore } from 'react';
import Splash from '@/components/Splash';
import ChapterBar from '@/components/ChapterBar';
import Hero from '@/components/Hero';
import Stack from '@/components/Stack';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import { useReveal } from '@/components/useReveal';

/**
 * Whether the seal should be skipped — decided by the blocking script in
 * `layout.tsx`, which stamps `data-splash="skip"` when it has already played
 * this session or the visitor asked for reduced motion.
 *
 * This is an external value the server cannot know, so it is read through
 * `useSyncExternalStore` rather than assigned from an effect: the server
 * snapshot is `false`, the client snapshot is the real attribute, and React
 * reconciles the two without a hydration mismatch or a cascading render. The
 * attribute is set once before first paint and never changes, so `subscribe`
 * has nothing to listen for.
 */
const subscribe = () => () => {};
const readSkip = () => document.documentElement.dataset.splash === 'skip';
const serverSkip = () => false;

export default function Page() {
  const skipped = useSyncExternalStore(subscribe, readSkip, serverSkip);
  const [dismissed, setDismissed] = useState(false);
  const loaded = skipped || dismissed;

  useReveal(loaded);

  return (
    <>
      {!loaded && <Splash onDone={() => setDismissed(true)} />}
      <ChapterBar />
      <main className="halftone">
        <Hero ready={loaded} />
        <div className="shell">
          <Stack />
          <Projects />
          <Timeline />
          <Contact />
        </div>
      </main>
    </>
  );
}
