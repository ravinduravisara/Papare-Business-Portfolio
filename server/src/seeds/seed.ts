import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { AdminUser } from '../models/AdminUser.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { Client } from '../models/Client.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { PageContent } from '../models/PageContent.js';
import { initialServices, initialProjects, initialClients } from './seedData.js';
import { logger } from '../utils/logger.js';

export async function runSeed(): Promise<void> {
  logger.info('[Seed] Initializing database seeding...');
  await connectDB();

  // 1. Seed Initial Admin User
  const existingAdmin = await AdminUser.findOne({ email: env.INITIAL_ADMIN_EMAIL.toLowerCase() });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, 12);
    await AdminUser.create({
      name: env.INITIAL_ADMIN_NAME,
      email: env.INITIAL_ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });
    logger.info(`[Seed] Initial Admin created: ${env.INITIAL_ADMIN_EMAIL}`);
  } else {
    logger.info(`[Seed] Admin user ${env.INITIAL_ADMIN_EMAIL} already exists, skipping.`);
  }

  // 2. Seed Services (idempotent - do not overwrite existing)
  for (const s of initialServices) {
    const exists = await Service.findOne({ slug: s.slug });
    if (!exists) {
      await Service.create(s);
      logger.info(`[Seed] Service created: ${s.title}`);
    }
  }

  // 3. Seed Projects (idempotent)
  for (const p of initialProjects) {
    const exists = await Project.findOne({ slug: p.slug });
    if (!exists) {
      await Project.create(p);
      logger.info(`[Seed] Project created: ${p.title} (${p.projectStatus})`);
    }
  }

  // 4. Seed Clients (idempotent)
  for (const c of initialClients) {
    const exists = await Client.findOne({ name: c.name });
    if (!exists) {
      await Client.create(c);
      logger.info(`[Seed] Client created: ${c.name}`);
    }
  }

  // 5. Seed Site Settings
  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({
      companyName: 'ThePapare Events',
      tagline: 'Experience Beyond Events.',
      logo: '/images/branding/thepapare-logo.svg',
      email: 'contact@thepapare.events',
      phone: '+94 11 234 5678',
      address: 'Colombo, Sri Lanka',
      defaultSeoTitle: 'ThePapare Events | Event Management, Creative & Production Agency Sri Lanka',
      defaultSeoDescription:
        'ThePapare Events delivers corporate events, brand activations, event production, creative solutions, video production and studio services in Sri Lanka.',
      footerContent:
        'ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations.',
    });
    logger.info('[Seed] Initial Site Settings created.');
  }

  // 6. Seed Page Content
  const homeHeroExists = await PageContent.findOne({ pageIdentifier: 'home', sectionIdentifier: 'hero' });
  if (!homeHeroExists) {
    await PageContent.create({
      pageIdentifier: 'home',
      sectionIdentifier: 'hero',
      heading: 'EXPERIENCE BEYOND EVENTS.',
      subheading: 'An Integrated Events, Creative, Production & Experiential Agency.',
      description: 'From concept to execution, we bring ideas to life through events, creativity, production and content.',
      ctaText: 'EXPLORE OUR WORK',
      ctaLink: '/projects',
      displayOrder: 1,
    });
    logger.info('[Seed] Home Hero page content initialized.');
  }

  logger.info('[Seed] Database seeding completed successfully.');
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed()
    .then(() => disconnectDB())
    .catch((err) => {
      logger.error('[Seed] Seeding error:', err);
      process.exit(1);
    });
}

