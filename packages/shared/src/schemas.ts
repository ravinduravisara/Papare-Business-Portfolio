import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required (minimum 2 characters)'),
  company: z.string().min(1, 'Company or organization name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please provide a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  projectDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Project description must be at least 10 characters'),
  privacyConsent: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  scopeOfWork: z.string().min(2, 'Scope of work is required'),
  projectStatus: z.enum([
    'Completed',
    'In Progress',
    'Proposed Concept',
    'Concept Development',
    'Active Event',
  ]),
  coverImage: z.string().min(1, 'Cover image is required'),
  gallery: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  displayOrder: z.number().default(0),
  clientName: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  shortDescription: z.string().min(10, 'Short description is required'),
  fullDescription: z.string().min(20, 'Full description is required'),
  capabilities: z.array(z.string()).min(1, 'At least one capability is required'),
  featuredImage: z.string().min(1, 'Featured image is required'),
  supportingImages: z.array(z.string()).default([]),
  displayOrder: z.number().default(0),
  isPublished: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required'),
  logo: z.string().min(1, 'Logo URL or identifier is required'),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  displayOrder: z.number().default(0),
  isVisible: z.boolean().default(true),
});

export const settingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  logo: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      youtube: z.string().optional(),
      x: z.string().optional(),
    })
    .optional(),
  defaultSeoTitle: z.string().optional(),
  defaultSeoDescription: z.string().optional(),
  footerContent: z.string().optional(),
  copyrightText: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;

