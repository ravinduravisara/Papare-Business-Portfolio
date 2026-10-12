import mongoose, { Schema, Document } from 'mongoose';

export interface IPageContent extends Document {
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

const pageContentSchema = new Schema<IPageContent>(
  {
    pageIdentifier: { type: String, required: true, trim: true, index: true },
    sectionIdentifier: { type: String, required: true, trim: true },
    heading: { type: String, required: true },
    subheading: { type: String },
    description: { type: String },
    ctaText: { type: String },
    ctaLink: { type: String },
    media: { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

pageContentSchema.index({ pageIdentifier: 1, sectionIdentifier: 1 }, { unique: true });

export const PageContent = mongoose.model<IPageContent>('PageContent', pageContentSchema);

