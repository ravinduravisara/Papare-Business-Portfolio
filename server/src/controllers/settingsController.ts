import type { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings.js';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Client } from '../models/Client.js';
import { Inquiry } from '../models/Inquiry.js';
import { logger } from '../utils/logger.js';

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    logger.error('[SettingsController] getSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve site settings' });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Website settings updated successfully',
      data: settings,
    });
  } catch (error) {
    logger.error('[SettingsController] updateSettings error:', error);
    res.status(500).json({ success: false, message: 'Failed to update website settings' });
  }
}

export async function getDashboardStats(req: Request, res: Response): Promise<void> {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalServices,
      totalClients,
      totalInquiries,
      newInquiries,
      recentInquiries,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ isPublished: true }),
      Project.countDocuments({ isPublished: false }),
      Service.countDocuments(),
      Client.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Inquiry.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalServices,
        totalClients,
        totalInquiries,
        newInquiries,
        recentInquiries,
      },
    });
  } catch (error) {
    logger.error('[SettingsController] getDashboardStats error:', error);
    res.status(500).json({ success: false, message: 'Failed to aggregate dashboard statistics' });
  }
}

