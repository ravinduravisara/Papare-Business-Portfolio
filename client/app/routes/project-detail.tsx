import React from 'react';
import { useParams, Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import { useProjectDetail, useProjects } from '../hooks/useProjects.js';
import { ProjectHero } from '../components/project/ProjectHero.js';
import { ProjectGallery } from '../components/project/ProjectGallery.js';
import { ProjectCard } from '../components/project/ProjectCard.js';
import { ContactCTA } from '../components/home/ContactCTA.js';
import { Button } from '../components/common/Button.js';
import { buildMetaTags, generateBreadcrumbSchema } from '../lib/seo.js';
import { ArrowLeft, CheckCircle2, Building, Calendar, Layers } from 'lucide-react';

export const meta: MetaFunction = ({ params }) => {
  const slug = params.slug || '';
  return buildMetaTags({
    title: slug
      ? `${slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | Case Study`
      : 'Project Case Study',
    canonical: `https://thepapare.events/projects/${slug}`,
  });
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useProjectDetail(slug || '');
  const { projects } = useProjects();

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-primary">
        <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
          Project Not Found
        </h2>
        <p className="text-text-secondary max-w-md mb-8">
          The requested project or case study could not be found. It may be unpublished or the link may be invalid.
        </p>
        <Button to="/projects" variant="primary" arrow="horizontal">
          Back to Projects
        </Button>
      </div>
    );
  }

  const related = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://thepapare.events' },
    { name: 'Projects', url: 'https://thepapare.events/projects' },
    { name: project.title, url: `https://thepapare.events/projects/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <ProjectHero
        title={project.title}
        category={project.category}
        status={project.projectStatus}
        client={project.clientName}
        description={project.description}
      />

      {/* Main Case Study Section */}
      <section className="py-20 md:py-28 max-w-content mx-auto px-6 md:px-12">
        {/* Scope and Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-secondary border border-border-custom mb-16">
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-accent shrink-0 mt-1" />
            <div>
              <span className="font-mono text-xs uppercase text-text-secondary block">
                CLIENT OR PARTNER
              </span>
              <span className="font-display font-bold text-white text-base">
                {project.clientName || 'ThePapare Agency Engagement'}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-accent shrink-0 mt-1" />
            <div>
              <span className="font-mono text-xs uppercase text-text-secondary block">
                DELIVERY CATEGORY
              </span>
              <span className="font-display font-bold text-white text-base">
                {project.category}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
            <div>
              <span className="font-mono text-xs uppercase text-text-secondary block">
                STATUS &amp; SCOPE
              </span>
              <span className="font-display font-bold text-white text-base">
                {project.projectStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Narrative & Scope */}
        <div className="max-w-4xl space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
              // CASE SUMMARY
            </span>
            <p className="text-lg md:text-xl text-neutral-200 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          <div className="pt-6 border-t border-border-custom">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block">
              // SCOPE OF WORK
            </span>
            <div className="p-6 bg-secondary/80 border border-border-custom">
              <p className="text-white text-base font-sans font-medium">
                {project.scopeOfWork}
              </p>
              {project.projectStatus === 'Proposed Concept' && (
                <p className="text-xs text-amber-300 font-mono mt-3">
                  * Note: This project represents a proposed concept development and activation architecture.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* High Resolution Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border-custom">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-6 block">
              // PRODUCTION GALLERY
            </span>
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border-custom">
            <div className="flex items-center justify-between mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent block">
                // RELATED PRODUCTIONS
              </span>
              <Link
                to="/projects"
                className="text-xs font-display font-semibold uppercase text-neutral-300 hover:text-white"
              >
                All Projects →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((rel) => (
                <ProjectCard key={rel.slug} project={rel} />
              ))}
            </div>
          </div>
        )}
      </section>

      <ContactCTA />
    </>
  );
}

