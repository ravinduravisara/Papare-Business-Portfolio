import React from 'react';
import { DEFAULT_SEO } from '../../lib/seo.js';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  schema?: Record<string, any>;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.defaultImage,
  canonical = DEFAULT_SEO.siteUrl,
  schema,
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${DEFAULT_SEO.brandName}` : DEFAULT_SEO.title;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={DEFAULT_SEO.brandName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
};

