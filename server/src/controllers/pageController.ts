import type { Request, Response } from 'express';
import { PageContent } from '../models/PageContent.js';
import { logger } from '../utils/logger.js';

export async function getPageSections(req: Request, res: Response): Promise<void> {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const sections = await PageContent.find({ pageIdentifier: slug }).sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: sections.length, data: sections });
  } catch (error) {
    logger.error('[PageController] getPageSections error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve page content' });
  }
}

export async function upsertPageSection(req: Request, res: Response): Promise<void> {
  try {
    const { pageIdentifier, sectionIdentifier } = req.body;
    const updated = await PageContent.findOneAndUpdate(
      { pageIdentifier: pageIdentifier.toLowerCase(), sectionIdentifier },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Page section saved', data: updated });
  } catch (error) {
    logger.error('[PageController] upsertPageSection error:', error);
    res.status(500).json({ success: false, message: 'Failed to save page section' });
  }
}
