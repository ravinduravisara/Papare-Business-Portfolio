import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  assetId: string;
  publicUrl: string;
  resourceType: 'image' | 'video';
  fileFormat: string;
  fileSize: number;
  altText: string;
  title: string;
  uploadedDate: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    assetId: { type: String, required: true, unique: true, index: true },
    publicUrl: { type: String, required: true },
    resourceType: { type: String, enum: ['image', 'video'], default: 'image' },
    fileFormat: { type: String, required: true },
    fileSize: { type: Number, required: true },
    altText: { type: String, default: '' },
    title: { type: String, default: '' },
    uploadedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Media = mongoose.model<IMedia>('Media', mediaSchema);

