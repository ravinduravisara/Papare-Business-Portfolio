import React from 'react';
import { Link } from 'react-router';
import { SectionHeading } from '../common/SectionHeading.js';
import { Button } from '../common/Button.js';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects.js';

export const FeaturedProjects: React.FC = () => {
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured || p.isPublished).slice(0, 4);

  return (
    <section className="py-24 md:py-36 bg-secondary/30 border-t border-border-custom relative">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SectionHeading
            number="03"
            label="SELECTED WORK"
            title="EXPERIENCES WE BRING TO LIFE."
            subtitle="Explore our verified event productions, themed activations and creative projects."
            className="mb-0"
          />
          <Link
            to="/projects"
            className="mt-6 md:mt-0 font-display text-xs uppercase tracking-widest text-accent hover:text-white inline-flex items-center gap-1 font-semibold group shrink-0"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cinematic Showcase List */}
        <div className="space-y-16 md:space-y-24">
          {featured.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border border-border-custom bg-secondary/80 p-6 md:p-10 group hover:border-accent/60 transition-colors"
              >
                {/* Visual Image */}
                <div
                  className={`lg:col-span-7 relative overflow-hidden bg-primary aspect-[16/10] ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-60" />

                  {/* Status Pill */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="font-mono text-[10px] md:text-xs uppercase font-semibold px-3 py-1 bg-primary/90 border border-border-custom text-white">
                      {project.category}
                    </span>
                    {project.projectStatus === 'Proposed Concept' ? (
                      <span className="font-mono text-[10px] md:text-xs uppercase font-semibold px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300">
                        PROPOSED CONCEPT
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] md:text-xs uppercase font-semibold px-3 py-1 bg-accent/20 border border-accent/40 text-accent">
                        {project.projectStatus.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Information */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {project.clientName && (
                    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary block">
                      CLIENT // {project.clientName}
                    </span>
                  )}

                  <h3 className="font-display uppercase text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-border-custom/80 space-y-2">
                    <span className="font-mono text-xs uppercase text-accent font-semibold block">
                      SCOPE OF ENGAGEMENT
                    </span>
                    <p className="text-xs md:text-sm text-neutral-300 font-sans">
                      {project.scopeOfWork}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center text-xs font-display font-semibold uppercase tracking-wider text-white hover:text-accent group/btn transition-colors gap-2"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-24">
          <Button to="/projects" variant="primary" arrow="diagonal">
            VIEW ALL PROJECTS
          </Button>
        </div>
      </div>
    </section>
  );
};

