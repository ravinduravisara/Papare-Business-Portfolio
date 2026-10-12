import mongoose, { Schema, Document } from 'mongoose';
import type { ProjectStatus } from '@thepapare/shared';

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    scopeOfWork: { type: String, required: true },
    projectStatus: {
      type: String,
      enum: ['Completed', 'In Progress', 'Proposed Concept', 'Concept Development', 'Active Event'],
      default: 'Completed',
    },
    coverImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    isPublished: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
    clientName: { type: String, trim: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);

