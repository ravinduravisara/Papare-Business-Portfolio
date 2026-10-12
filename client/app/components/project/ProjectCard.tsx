import React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectDTO } from '@thepapare/shared';

export const ProjectCard: React.FC<{ project: ProjectDTO }> = ({ project }) => {
  return (
    <article className="group relative bg-secondary border border-border-custom overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-1.5 flex flex-col justify-between">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 bg-primary/90 border border-border-custom text-white">
            {project.category}
          </span>
          {project.projectStatus === 'Proposed Concept' ? (
            <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300">
              PROPOSED CONCEPT
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 bg-accent/20 border border-accent/40 text-accent">
              {project.projectStatus.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
        <div>
          {project.clientName && (
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-2">
              CLIENT // {project.clientName}
            </span>
          )}

          <h3 className="font-display uppercase text-xl font-bold text-white mb-3 tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="pt-3 border-t border-border-custom/50 mb-6">
            <span className="font-mono text-[11px] text-accent uppercase font-semibold block mb-1">
              SCOPE
            </span>
            <p className="text-xs text-neutral-300 line-clamp-2">
              {project.scopeOfWork}
            </p>
          </div>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="pt-4 border-t border-border-custom/60 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white"
        >
          <span>VIEW CASE STUDY</span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-border-custom group-hover:bg-accent group-hover:border-accent transition-colors">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>
    </article>
  );
};

export const ProjectGrid: React.FC<{ projects: ProjectDTO[] }> = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center border border-border-custom bg-secondary/30 p-12">
        <h3 className="font-display uppercase text-xl font-bold text-white mb-2">
          No projects found in this category
        </h3>
        <p className="text-text-secondary text-sm max-w-md mx-auto">
          Please select another category or check back as we update our production archive.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};

