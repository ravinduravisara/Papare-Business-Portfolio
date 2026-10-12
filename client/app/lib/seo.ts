export interface MetaTagProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
}

export const DEFAULT_SEO = {
  title: 'ThePapare Events | Event Management, Creative & Production Agency Sri Lanka',
  description:
    'ThePapare Events delivers corporate events, brand activations, event production, creative solutions, video production and studio services in Sri Lanka.',
  siteUrl: 'https://thepapare.events',
  defaultImage: '/images/branding/og-cover.jpg',
  brandName: 'ThePapare Events',
  tagline: 'Experience Beyond Events.',
};

export function buildMetaTags(props: MetaTagProps) {
  const title = props.title
    ? `${props.title} | ${DEFAULT_SEO.brandName}`
    : DEFAULT_SEO.title;
  const description = props.description || DEFAULT_SEO.description;
  const image = props.image || DEFAULT_SEO.defaultImage;
  const canonical = props.canonical || DEFAULT_SEO.siteUrl;
  const type = props.type || 'website';

  const tags: Array<{ title?: string } | { name?: string; content?: string } | { property?: string; content?: string }> = [
    { title },
    { name: 'description', content: description },
    { property: 'og:site_name', content: DEFAULT_SEO.brandName },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ];

  if (props.noindex) {
    tags.push({ name: 'robots', content: 'noindex, nofollow' });
  } else {
    tags.push({ name: 'robots', content: 'index, follow, max-image-preview:large' });
  }

  if (props.keywords && props.keywords.length > 0) {
    tags.push({ name: 'keywords', content: props.keywords.join(', ') });
  }

  return tags;
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ThePapare Events',
    alternateName: 'ThePapare Events Sri Lanka',
    url: 'https://thepapare.events',
    logo: 'https://thepapare.events/images/branding/thepapare-logo.svg',
    description:
      'ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations in Sri Lanka.',
    slogan: 'Experience Beyond Events.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Colombo, Sri Lanka',
    },
    sameAs: [
      'https://facebook.com/thepapareevents',
      'https://instagram.com/thepapareevents',
      'https://linkedin.com/company/thepapareevents',
      'https://youtube.com/@thepapareevents',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94-11-234-5678',
      contactType: 'customer service',
      areaServed: 'LK',
      availableLanguage: ['English', 'Sinhala'],
    },
  };
}

export function generateServiceSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: title,
    provider: {
      '@type': 'Organization',
      name: 'ThePapare Events',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    description,
    url,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

