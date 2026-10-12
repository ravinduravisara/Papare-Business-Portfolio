import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useProjects } from '../hooks/useProjects.js';
import { ProjectFilters } from '../components/project/ProjectFilters.js';
import { ProjectGrid } from '../components/project/ProjectGrid.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { buildMetaTags } from '../lib/seo.js';
import { motion } from 'framer-motion';

export const meta: MetaFunction = () => {
  return buildMetaTags({
    title: 'Our Work | Project Case Studies & Portfolio',
    description:
      "Explore ThePapare Events' portfolio: verified corporate events, automotive drive experiences, themed events, fan parks, and brand activations in Sri Lanka.",
    canonical: 'https://thepapare.events/projects',
  });
};

const CATEGORIES = [
  'All Projects',
  'Corporate Events',
  'Brand Activations',
  'Automotive Experiences',
  'Themed Events',
  'Fan Engagement',
  'Creative Production',
  'Video Production',
];

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Projects';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const { projects, isLoading } = useProjects();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All Projects') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  const filteredProjects =
    activeCategory === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Portfolio Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 border-b border-border-custom bg-secondary/30">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block"
          >
            // AGENCY PORTFOLIO
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] max-w-4xl mb-6"
          >
            EXPERIENCES WE BRING TO LIFE.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-xl max-w-2xl leading-relaxed"
          >
            Selected productions, live brand activations, themed environments and experiential campaigns.
          </motion.p>
        </div>
      </section>

      {/* Main Grid & Filters */}
      <section className="py-16 md:py-24 max-w-content mx-auto px-6 md:px-12">
        <ProjectFilters
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        <ProjectGrid projects={filteredProjects} />
      </section>

      <ContactCTA />
    </>
  );
}

