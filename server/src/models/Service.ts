import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    capabilities: { type: [String], required: true, default: [] },
    featuredImage: { type: String, required: true },
    supportingImages: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', serviceSchema);

