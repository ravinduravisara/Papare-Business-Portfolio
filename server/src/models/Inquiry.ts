import mongoose, { Schema, Document } from 'mongoose';
import type { InquiryStatus } from '@thepapare/shared';

export interface IInquiry extends Document {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectDate?: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true, index: true },
    projectDate: { type: String, trim: true },
    budget: { type: String, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Archived'],
      default: 'New',
      index: true,
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model<IInquiry>('Inquiry', inquirySchema);

