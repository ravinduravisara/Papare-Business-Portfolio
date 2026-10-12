import type { Request, Response } from 'express';
import { Media } from '../models/Media.js';
import { uploadMediaBuffer, deleteMediaAsset } from '../services/mediaService.js';
import { logger } from '../utils/logger.js';

export async function uploadMedia(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const altText = (req.body.altText as string) || file.originalname;
    const title = (req.body.title as string) || file.originalname;

    const mediaRecord = await uploadMediaBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
      altText,
      title
    );

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: mediaRecord,
    });
  } catch (error) {
    logger.error('[MediaController] Upload error:', error);
    res.status(500).json({ success: false, message: (error as Error).message || 'Failed to upload media' });
  }
}

export async function getMediaList(req: Request, res: Response): Promise<void> {
  try {
    const media = await Media.find().sort({ uploadedDate: -1 });
    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    logger.error('[MediaController] getMediaList error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve media library' });
  }
}

export async function deleteMedia(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await deleteMediaAsset(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Media record not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Media removed successfully' });
  } catch (error) {
    logger.error('[MediaController] deleteMedia error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete media' });
  }
}
