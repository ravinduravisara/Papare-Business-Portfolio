export type ProjectStatus =
  | 'Completed'
  | 'In Progress'
  | 'Proposed Concept'
  | 'Concept Development'
  | 'Active Event';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';

export type UserRole = 'admin' | 'superadmin' | 'editor';

export interface AdminUserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectDTO {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  scopeOfWork: string;
  projectStatus: ProjectStatus;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  isPublished: boolean;
  displayOrder: number;
  clientName?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceDTO {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  featuredImage: string;
  supportingImages: string[];
  displayOrder: number;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientDTO {
  _id?: string;
  id?: string;
  name: string;
  logo: string;
  websiteUrl?: string;
  displayOrder: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface InquiryDTO {
  _id?: string;
  id?: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectDate?: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageContentDTO {
  _id?: string;
  id?: string;
  pageIdentifier: string;
  sectionIdentifier: string;
  heading: string;
  subheading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  media?: string;
  displayOrder: number;
}

export interface MediaDTO {
  _id?: string;
  id?: string;
  assetId: string;
  publicUrl: string;
  resourceType: 'image' | 'video';
  fileFormat: string;
  fileSize: number;
  altText: string;
  title: string;
  uploadedDate?: string;
}

export interface SiteSettingsDTO {
  _id?: string;
  id?: string;
  companyName: string;
  tagline: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    x?: string;
  };
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  footerContent?: string;
  copyrightText?: string;
}

export interface DashboardStatsDTO {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalServices: number;
  totalClients: number;
  totalInquiries: number;
  newInquiries: number;
  recentInquiries: InquiryDTO[];
}

