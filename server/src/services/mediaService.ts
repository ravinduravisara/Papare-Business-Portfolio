import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { Media, IMedia } from '../models/Media.js';
import { logger } from '../utils/logger.js';
import crypto from 'crypto';

export interface UploadResult {
  assetId: string;
  publicUrl: string;
  resourceType: 'image' | 'video';
  fileFormat: string;
  fileSize: number;
}

export async function uploadMediaBuffer(
  buffer: Buffer,
  filename: string,
  mimetype: string,
  altText: string = '',
  title: string = ''
): Promise<IMedia> {
  const isVideo = mimetype.startsWith('video/');
  const resourceType = isVideo ? 'video' : 'image';
  const format = mimetype.split('/')[1] || 'jpg';
  const size = buffer.length;

  if (isCloudinaryConfigured()) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'thepapare-events',
          resource_type: resourceType,
        },
        async (error, result) => {
          if (error || !result) {
            logger.error('[MediaService] Cloudinary upload error:', error);
            reject(new Error(error?.message || 'Failed to upload to Cloudinary'));
            return;
          }

          try {
            const mediaRecord = await Media.create({
              assetId: result.public_id,
              publicUrl: result.secure_url,
              resourceType,
              fileFormat: result.format || format,
              fileSize: result.bytes || size,
              altText: altText || filename,
              title: title || filename,
            });
            resolve(mediaRecord);
          } catch (dbErr) {
            reject(dbErr);
          }
        }
      );
      uploadStream.end(buffer);
    });
  }

  // Fallback when Cloudinary is not configured: generate safe placeholder / data URL / local reference
  const assetId = `local_${crypto.randomUUID()}`;
  const base64Data = buffer.toString('base64');
  const publicUrl = `data:${mimetype};base64,${base64Data}`;

  const mediaRecord = await Media.create({
    assetId,
    publicUrl,
    resourceType,
    fileFormat: format,
    fileSize: size,
    altText: altText || filename,
    title: title || filename,
  });

  return mediaRecord;
}

export async function deleteMediaAsset(id: string): Promise<boolean> {
  const media = await Media.findById(id);
  if (!media) {
    return false;
  }

  if (isCloudinaryConfigured() && !media.assetId.startsWith('local_')) {
    try {
      await cloudinary.uploader.destroy(media.assetId, {
        resource_type: media.resourceType,
      });
    } catch (err) {
      logger.warn(`[MediaService] Cloudinary delete warning for ${media.assetId}:`, err);
    }
  }

  await media.deleteOne();
  return true;
}

