'use client';

import { useState } from 'react';
import Splash from '@/components/Splash';
import Hero from '@/components/Hero';
import Stack from '@/components/Stack';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Contact from '@/components/Contact';
import { useReveal } from '@/components/useReveal';
import { PAPER_DARK } from '@/lib/data';

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  useReveal(loaded);

  return (
    <>
      {!loaded && <Splash onDone={() => setLoaded(true)} />}
      <main className="halftone" style={{ background: PAPER_DARK }}>
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
