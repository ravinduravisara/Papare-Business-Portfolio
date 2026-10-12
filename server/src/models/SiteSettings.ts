import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
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

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, required: true, default: 'ThePapare Events' },
    tagline: { type: String, required: true, default: 'Experience Beyond Events.' },
    logo: { type: String, default: '/images/branding/thepapare-logo.svg' },
    email: { type: String, default: 'contact@thepapare.events' },
    phone: { type: String, default: '+94 11 234 5678' },
    address: { type: String, default: 'Colombo, Sri Lanka' },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/thepapareevents' },
      instagram: { type: String, default: 'https://instagram.com/thepapareevents' },
      linkedin: { type: String, default: 'https://linkedin.com/company/thepapareevents' },
      youtube: { type: String, default: 'https://youtube.com/@thepapareevents' },
      x: { type: String, default: 'https://x.com/thepapareevents' },
    },
    defaultSeoTitle: {
      type: String,
      default: 'ThePapare Events | Event Management, Creative & Production Agency Sri Lanka',
    },
    defaultSeoDescription: {
      type: String,
      default:
        'ThePapare Events delivers corporate events, brand activations, event production, creative solutions, video production and studio services in Sri Lanka.',
    },
    footerContent: {
      type: String,
      default:
        'ThePapare Events is an integrated events, creative and production agency delivering end-to-end solutions for brands, businesses and organizations.',
    },
    copyrightText: {
      type: String,
      default: '© 2026 ThePapare Events. All rights reserved. One partner. Multiple capabilities. End-to-end execution.',
    },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);

