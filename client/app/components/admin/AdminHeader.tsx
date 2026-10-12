import React from 'react';

export interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-border-custom">
      <div>
        <h1 className="font-display font-bold uppercase text-2xl sm:text-3xl text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-text-secondary text-sm font-sans mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
};

