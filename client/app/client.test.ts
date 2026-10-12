import { describe, it, expect } from 'vitest';
import { FALLBACK_PROJECTS, FALLBACK_SERVICES, FALLBACK_CLIENTS } from './lib/api.js';
import { buildMetaTags } from './lib/seo.js';
import { inquirySchema } from '@thepapare/shared';

describe('Client Portfolio Business Logic & Data', () => {
  it('should have all 6 approved services with valid slugs', () => {
    expect(FALLBACK_SERVICES).toHaveLength(6);
    const slugs = FALLBACK_SERVICES.map((s) => s.slug);
    expect(slugs).toContain('events-experiences');
    expect(slugs).toContain('event-production');
    expect(slugs).toContain('creative-brand-solutions');
    expect(slugs).toContain('video-media-production');
    expect(slugs).toContain('social-digital-content');
    expect(slugs).toContain('studio-production');
  });

  it('should have all verified initial projects with correct statuses', () => {
    expect(FALLBACK_PROJECTS).toHaveLength(4);

    const jetour = FALLBACK_PROJECTS.find((p) => p.slug === 'jetour-owners-club-drive-fest-2026');
    expect(jetour).toBeDefined();
    expect(jetour?.clientName).toBe('United Motors');
    expect(jetour?.projectStatus).toBe('Completed');

    const dialogHalloween = FALLBACK_PROJECTS.find((p) => p.slug === 'dialog-halloween-2025');
    expect(dialogHalloween).toBeDefined();
    expect(dialogHalloween?.clientName).toBe('Dialog');
    expect(dialogHalloween?.projectStatus).toBe('Completed');

    const fanPark = FALLBACK_PROJECTS.find((p) => p.slug === 'icc-mens-t20-world-cup-2026-fan-park-series');
    expect(fanPark).toBeDefined();
    expect(fanPark?.clientName).toBe('Dialog Play');
    expect(fanPark?.projectStatus).toBe('Active Event');

    const dialogPay = FALLBACK_PROJECTS.find((p) => p.slug === 'dialog-pay-on-the-move');
    expect(dialogPay).toBeDefined();
    expect(dialogPay?.clientName).toBe('Dialog Finance');
    expect(dialogPay?.projectStatus).toBe('Proposed Concept');
  });

  it('should validate inquiry form input using inquirySchema', () => {
    const validData = {
      fullName: 'Kamal Perera',
      company: 'Enterprise LK',
      email: 'kamal@enterprise.lk',
      phone: '+94 77 123 4567',
      service: 'Events & Experiences',
      message: 'Looking for a comprehensive conference setup with LED walls.',
    };

    const parseResult = inquirySchema.safeParse(validData);
    expect(parseResult.success).toBe(true);

    const invalidData = {
      fullName: 'K',
      company: '',
      email: 'invalid-email',
      phone: '12',
      service: '',
      message: 'Short',
    };

    const invalidResult = inquirySchema.safeParse(invalidData);
    expect(invalidResult.success).toBe(false);
  });

  it('should build proper SEO meta tags', () => {
    const tags = buildMetaTags({
      title: 'Test Page',
      description: 'Test description',
      canonical: 'https://thepapare.events/test',
    });

    expect(tags.some((t: any) => t.title?.includes('Test Page'))).toBe(true);
    expect(tags.some((t: any) => t.content === 'Test description')).toBe(true);
    expect(tags.some((t: any) => t.property === 'og:url' && t.content === 'https://thepapare.events/test')).toBe(true);
  });
});

