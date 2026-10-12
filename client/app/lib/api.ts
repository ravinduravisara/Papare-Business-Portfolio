import axios from 'axios';
import type {
  ProjectDTO,
  ServiceDTO,
  ClientDTO,
  InquiryDTO,
  SiteSettingsDTO,
  AdminUserDTO,
  DashboardStatsDTO,
  MediaDTO,
} from '@thepapare/shared';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return '/api/v1';
  }
  return process.env.API_INTERNAL_URL ? `${process.env.API_INTERNAL_URL}/api/v1` : 'http://localhost:5000/api/v1';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Fallback data when API is offline during initial load or demo
export const FALLBACK_PROJECTS: ProjectDTO[] = [
  {
    id: 'p1',
    title: 'Jetour Owners Club Drive Fest 2026',
    slug: 'jetour-owners-club-drive-fest-2026',
    category: 'Automotive Experiences',
    description: "An automotive owners' drive experience combining a multi-stop drive, participant engagement and an organized event programme.",
    scopeOfWork: 'Event production and coordination.',
    projectStatus: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop',
    ],
    featured: true,
    isPublished: true,
    displayOrder: 1,
    clientName: 'United Motors',
    seoTitle: 'Jetour Owners Club Drive Fest 2026 | Case Study | ThePapare Events',
    seoDescription: "Event production and coordination case study for the Jetour Owners Club Drive Fest 2026 organized by United Motors.",
  },
  {
    id: 'p2',
    title: 'Dialog Halloween 2025',
    slug: 'dialog-halloween-2025',
    category: 'Themed Events',
    description: 'A themed corporate celebration transforming an everyday office environment into an immersive Halloween experience through creative setup, entertainment and event execution.',
    scopeOfWork: 'Event concept and execution.',
    projectStatus: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    ],
    featured: true,
    isPublished: true,
    displayOrder: 2,
    clientName: 'Dialog',
    seoTitle: 'Dialog Halloween 2025 | Corporate Celebration | ThePapare Events',
    seoDescription: 'Themed corporate celebration transforming the workplace into an immersive Halloween experience for Dialog.',
  },
  {
    id: 'p3',
    title: "ICC Men's T20 World Cup 2026 Fan Park Series",
    slug: 'icc-mens-t20-world-cup-2026-fan-park-series',
    category: 'Fan Engagement',
    description: 'Fan park activations bringing audiences together through live event experiences and on-ground engagement across selected locations.',
    scopeOfWork: 'Event and activation support, subject to the specific engagement.',
    projectStatus: 'Active Event',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop',
    ],
    featured: true,
    isPublished: true,
    displayOrder: 3,
    clientName: 'Dialog Play',
    seoTitle: "ICC Men's T20 World Cup 2026 Fan Park Series | ThePapare Events",
    seoDescription: 'Live cricket fan park activations and community event experiences for Dialog Play.',
  },
  {
    id: 'p4',
    title: 'Dialog Pay On the Move',
    slug: 'dialog-pay-on-the-move',
    category: 'Brand Activations',
    description: 'A proposed nationwide mobile engagement platform designed to bring the Dialog Pay experience closer to customers through a branded mobile setup and interactive activations.',
    scopeOfWork: 'Concept development and proposed activation planning.',
    projectStatus: 'Proposed Concept',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    ],
    featured: true,
    isPublished: true,
    displayOrder: 4,
    clientName: 'Dialog Finance',
    seoTitle: 'Dialog Pay On the Move | Proposed Brand Activation Concept',
    seoDescription: 'Concept development and proposed activation planning for Dialog Pay mobile engagement experience.',
  },
];

export const FALLBACK_SERVICES: ServiceDTO[] = [
  {
    id: 's1',
    title: 'Events & Experiences',
    slug: 'events-experiences',
    shortDescription: 'We conceptualize, plan and execute events that bring people, brands and experiences together.',
    fullDescription: 'From high-stakes corporate conferences and gala awards to high-energy brand activations and public sports gatherings, we deliver meticulously orchestrated events that unite audiences and elevate brand presence.',
    capabilities: [
      'Corporate events',
      'Conferences',
      'Business gatherings',
      'Product launches',
      'Brand launches',
      'Annual celebrations',
      'Awards ceremonies',
      'Employee engagement events',
      'Themed parties',
      'Halloween events',
      'Seasonal celebrations',
      'Brand activations',
      'Roadshows',
      'Experiential marketing',
      'Sports events',
      'Fan engagement',
      'Public activations',
      'Private functions',
      'Event logistics',
      'On-site management',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 's2',
    title: 'Event Production & Technical Solutions',
    slug: 'event-production',
    shortDescription: 'Technical and production solutions designed to transform event concepts into impactful experiences.',
    fullDescription: 'Technical and production solutions designed to transform event concepts into impactful experiences. We deliver high-precision stage engineering, LED wall displays, professional concert audio, lighting architecture, and technical show management.',
    capabilities: [
      'LED walls',
      'Event display solutions',
      'Stage design',
      'Stage fabrication',
      'Event branding',
      'Audio production coordination',
      'Lighting production coordination',
      'Audiovisual solutions',
      'Technical setup',
      'On-site production management',
      'Event infrastructure',
      'Logistics',
      'Vendor coordination',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 's3',
    title: 'Creative & Brand Solutions',
    slug: 'creative-brand-solutions',
    shortDescription: 'Creative ideas and visual solutions that help brands communicate, connect and stand out.',
    fullDescription: 'Creative ideas and visual solutions that help brands communicate, connect and stand out. Our creative studio develops distinctive event branding, visual themes, spatial graphics, and interactive touchpoints.',
    capabilities: [
      'Creative concepts',
      'Campaign development',
      'Event themes',
      'Event identities',
      'Graphic design',
      'Digital artwork',
      'Brand activations',
      'Audience engagement',
      'Presentations',
      'Promotional materials',
      'Brand integration',
      'Sponsorship visibility',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 3,
    isPublished: true,
  },
  {
    id: 's4',
    title: 'Video & Media Production',
    slug: 'video-media-production',
    shortDescription: 'Visual storytelling for commercials, corporate communication, campaigns and branded experiences.',
    fullDescription: 'Visual storytelling for commercials, corporate communication, campaigns and branded experiences. High-impact commercial video production, corporate storytelling, event highlights, and cinematic aftermovies.',
    capabilities: [
      'TV commercials',
      'Digital commercials',
      'Corporate videos',
      'Brand films',
      'Promotional videos',
      'Campaign content',
      'Event highlights',
      'Aftermovies',
      'Photography',
      'Videography',
      'Interviews',
      'Testimonials',
      'Behind-the-scenes content',
      'Video editing',
      'Post-production',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 4,
    isPublished: true,
  },
  {
    id: 's5',
    title: 'Social & Digital Content',
    slug: 'social-digital-content',
    shortDescription: 'Digital storytelling and content that extends brand experiences beyond physical events.',
    fullDescription: 'Digital storytelling and content that extends brand experiences beyond physical events. We design rapid-turnaround digital content, viral reels, event day live streams, and interactive campaign assets.',
    capabilities: [
      'Social media content creation',
      'Short-form videos',
      'Reels',
      'Digital assets',
      'Brand-led digital campaigns',
      'Social experiments',
      'Audience interactions',
      'Product launch content',
      'Brand activation content',
      'Event-to-digital packages',
      'Digital storytelling',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 5,
    isPublished: true,
  },
  {
    id: 's6',
    title: 'Studio & Production Facilities',
    slug: 'studio-production',
    shortDescription: 'Dedicated production environments and supporting services for professional creative projects.',
    fullDescription: 'Dedicated production environments and supporting services for professional creative projects. ThePapare Studios features acoustic studio space, green-screen cyclorama, multi-camera podcast setups, and broadcast-ready lighting. Facilities and equipment are subject to availability.',
    capabilities: [
      'Studio rental',
      'Green-screen productions',
      'Podcast recording',
      'Interview recording',
      'Corporate shoots',
      'Product shoots',
      'Branded content shoots',
      'Presenter-led productions',
      'Production equipment support',
      'Technical assistance',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    supportingImages: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    ],
    displayOrder: 6,
    isPublished: true,
  },
];

export const FALLBACK_CLIENTS: ClientDTO[] = [
  { id: 'c1', name: 'Dialog Play', logo: '/images/clients/dialog-play.svg', websiteUrl: 'https://www.dialog.lk', displayOrder: 1, isVisible: true },
  { id: 'c2', name: 'Dialog', logo: '/images/clients/dialog.svg', websiteUrl: 'https://www.dialog.lk', displayOrder: 2, isVisible: true },
  { id: 'c3', name: 'Dialog Television', logo: '/images/clients/dialog-tv.svg', websiteUrl: 'https://www.dialog.lk', displayOrder: 3, isVisible: true },
  { id: 'c4', name: 'Dialog Finance', logo: '/images/clients/dialog-finance.svg', websiteUrl: 'https://www.dialogfinance.lk', displayOrder: 4, isVisible: true },
  { id: 'c5', name: 'United Motors', logo: '/images/clients/united-motors.svg', websiteUrl: 'https://www.unitedmotors.lk', displayOrder: 5, isVisible: true },
];

export const api = {
  // Public
  async getProjects(category?: string): Promise<ProjectDTO[]> {
    try {
      const res = await apiClient.get('/projects', { params: { category } });
      return res.data?.data || FALLBACK_PROJECTS;
    } catch {
      return category && category !== 'All' && category !== 'All Projects'
        ? FALLBACK_PROJECTS.filter((p) => p.category === category)
        : FALLBACK_PROJECTS;
    }
  },

  async getProjectBySlug(slug: string): Promise<ProjectDTO | null> {
    try {
      const res = await apiClient.get(`/projects/${slug}`);
      return res.data?.data || null;
    } catch {
      return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
    }
  },

  async getServices(): Promise<ServiceDTO[]> {
    try {
      const res = await apiClient.get('/services');
      return res.data?.data || FALLBACK_SERVICES;
    } catch {
      return FALLBACK_SERVICES;
    }
  },

  async getServiceBySlug(slug: string): Promise<ServiceDTO | null> {
    try {
      const res = await apiClient.get(`/services/${slug}`);
      return res.data?.data || null;
    } catch {
      return FALLBACK_SERVICES.find((s) => s.slug === slug) || null;
    }
  },

  async getClients(): Promise<ClientDTO[]> {
    try {
      const res = await apiClient.get('/clients');
      return res.data?.data || FALLBACK_CLIENTS;
    } catch {
      return FALLBACK_CLIENTS;
    }
  },

  async getSettings(): Promise<SiteSettingsDTO> {
    try {
      const res = await apiClient.get('/settings');
      return (
        res.data?.data || {
          companyName: 'ThePapare Events',
          tagline: 'Experience Beyond Events.',
        }
      );
    } catch {
      return {
        companyName: 'ThePapare Events',
        tagline: 'Experience Beyond Events.',
      };
    }
  },

  async submitInquiry(data: Record<string, any>): Promise<{ success: boolean; message: string }> {
    const res = await apiClient.post('/inquiries', data);
    return res.data;
  },

  // Auth
  async login(credentials: { email: string; password: string }): Promise<{ success: boolean; user: AdminUserDTO }> {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getMe(): Promise<AdminUserDTO | null> {
    try {
      const res = await apiClient.get('/auth/me');
      return res.data?.user || null;
    } catch {
      return null;
    }
  },

  // Admin Dashboard
  async getDashboardStats(): Promise<DashboardStatsDTO> {
    const res = await apiClient.get('/settings/stats');
    return res.data?.data;
  },

  // Admin Projects
  async getAdminProjects(): Promise<ProjectDTO[]> {
    const res = await apiClient.get('/projects/admin/all');
    return res.data?.data || [];
  },

  async createProject(data: Partial<ProjectDTO>): Promise<ProjectDTO> {
    const res = await apiClient.post('/projects', data);
    return res.data?.data;
  },

  async updateProject(id: string, data: Partial<ProjectDTO>): Promise<ProjectDTO> {
    const res = await apiClient.patch(`/projects/${id}`, data);
    return res.data?.data;
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },

  // Admin Services
  async getAdminServices(): Promise<ServiceDTO[]> {
    const res = await apiClient.get('/services/admin/all');
    return res.data?.data || [];
  },

  async createService(data: Partial<ServiceDTO>): Promise<ServiceDTO> {
    const res = await apiClient.post('/services', data);
    return res.data?.data;
  },

  async updateService(id: string, data: Partial<ServiceDTO>): Promise<ServiceDTO> {
    const res = await apiClient.patch(`/services/${id}`, data);
    return res.data?.data;
  },

  async deleteService(id: string): Promise<void> {
    await apiClient.delete(`/services/${id}`);
  },

  // Admin Clients
  async getAdminClients(): Promise<ClientDTO[]> {
    const res = await apiClient.get('/clients/admin/all');
    return res.data?.data || [];
  },

  async createClient(data: Partial<ClientDTO>): Promise<ClientDTO> {
    const res = await apiClient.post('/clients', data);
    return res.data?.data;
  },

  async updateClient(id: string, data: Partial<ClientDTO>): Promise<ClientDTO> {
    const res = await apiClient.patch(`/clients/${id}`, data);
    return res.data?.data;
  },

  async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`);
  },

  // Admin Inquiries
  async getAdminInquiries(params?: { status?: string; service?: string; search?: string }): Promise<InquiryDTO[]> {
    const res = await apiClient.get('/inquiries', { params });
    return res.data?.data || [];
  },

  async updateInquiryStatus(id: string, status: string): Promise<InquiryDTO> {
    const res = await apiClient.patch(`/inquiries/${id}`, { status });
    return res.data?.data;
  },

  async deleteInquiry(id: string): Promise<void> {
    await apiClient.delete(`/inquiries/${id}`);
  },

  // Admin Media
  async getAdminMedia(): Promise<MediaDTO[]> {
    const res = await apiClient.get('/media');
    return res.data?.data || [];
  },

  async uploadMedia(formData: FormData): Promise<MediaDTO> {
    const res = await apiClient.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data?.data;
  },

  async deleteMedia(id: string): Promise<void> {
    await apiClient.delete(`/media/${id}`);
  },

  // Admin Settings
  async updateSettings(data: Partial<SiteSettingsDTO>): Promise<SiteSettingsDTO> {
    const res = await apiClient.patch('/settings', data);
    return res.data?.data;
  },
};

