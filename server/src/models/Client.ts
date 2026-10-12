import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  logo: string;
  websiteUrl?: string;
  displayOrder: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    websiteUrl: { type: String, trim: true },
    displayOrder: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Client = mongoose.model<IClient>('Client', clientSchema);

