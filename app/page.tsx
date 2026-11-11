'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import HowIWork from '@/components/HowIWork';
import Contact from '@/components/Contact';
import Footer, { BackToTop } from '@/components/Footer';
import { useReveal } from '@/components/useReveal';
import { useScrollEffects } from '@/components/useScrollEffects';
import { PROJECTS, PROJECTS_SHOWN, type ProjectFilter } from '@/lib/data';

export default function Page() {
  const { scrolled, active, showTop } = useScrollEffects();
  useReveal();

  // Live here, not in Projects, so the skills panel can clear the filter and
  // open the full list before jumping to a card that might be hidden.
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
  const [projectsOpen, setProjectsOpen] = useState(false);

  // A new filter starts collapsed again.
  const filterProjects = useCallback((filter: ProjectFilter) => {
    setProjectFilter(filter);
    setProjectsOpen(false);
  }, []);

  const jumpToProject = useCallback((id: string) => {
    setProjectFilter('all');
    if (PROJECTS.findIndex((p) => p.id === id) >= PROJECTS_SHOWN) setProjectsOpen(true);
    // Let the unfiltered cards mount before scrolling to one.
    window.setTimeout(() => {
      const card = document.getElementById(`project-${id}`);
      if (!card) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      if (reduce) return;
      card.animate(
        [
          { outlineStyle: 'solid', outlineWidth: '0px', outlineColor: 'rgba(43, 68, 240, 0)', outlineOffset: '0px' },
          { outlineStyle: 'solid', outlineWidth: '6px', outlineColor: 'rgba(43, 68, 240, 1)', outlineOffset: '8px', offset: 0.35 },
          { outlineStyle: 'solid', outlineWidth: '6px', outlineColor: 'rgba(43, 68, 240, 0)', outlineOffset: '16px' },
        ],
        { duration: 1300, delay: 500, easing: 'ease-out' }
      );
    }, 60);
  }, []);

  return (
    <div className="site">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header scrolled={scrolled} active={active} />
      <main id="main">
        <Hero />
        <Skills onJump={jumpToProject} />
        <Projects filter={projectFilter} onFilter={filterProjects} open={projectsOpen} onOpen={setProjectsOpen} />
        <Experience />
        <Certificates />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
      {showTop && <BackToTop />}
    </div>
  );
}
