import React from 'react';
import { clsx } from 'clsx';

export interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-12">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={clsx(
              'px-4 py-2 font-display text-xs uppercase tracking-wider font-semibold transition-all duration-200 border',
              isActive
                ? 'bg-accent border-accent text-white shadow-[0_0_15px_rgba(230,57,70,0.3)]'
                : 'bg-secondary/60 border-border-custom text-neutral-300 hover:border-neutral-400 hover:text-white'
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

