import type { Request, Response } from 'express';
import { Service } from '../models/Service.js';
import { logger } from '../utils/logger.js';

export async function getServices(req: Request, res: Response): Promise<void> {
  try {
    const services = await Service.find({ isPublished: true }).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    logger.error('[ServiceController] getServices error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve services' });
  }
}

export async function getServiceBySlug(req: Request, res: Response): Promise<void> {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const service = await Service.findOne({ slug, isPublished: true });

    if (!service) {
      res.status(404).json({ success: false, message: `Service '${slug}' not found` });
      return;
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    logger.error('[ServiceController] getServiceBySlug error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve service details' });
  }
}

export async function getAllServicesAdmin(req: Request, res: Response): Promise<void> {
  try {
    const services = await Service.find().sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    logger.error('[ServiceController] getAllServicesAdmin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin services' });
  }
}

export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const slug = data.slug.toLowerCase().trim();

    const existing = await Service.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: `A service with slug '${slug}' already exists.` });
      return;
    }

    const service = await Service.create({ ...data, slug });
    res.status(201).json({ success: true, message: 'Service created successfully', data: service });
  } catch (error) {
    logger.error('[ServiceController] createService error:', error);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
}

export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const data = req.body;

    if (data.slug) {
      data.slug = data.slug.toLowerCase().trim();
      const existing = await Service.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) {
        res.status(409).json({ success: false, message: `A service with slug '${data.slug}' already exists.` });
        return;
      }
    }

    const updated = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Service updated successfully', data: updated });
  } catch (error) {
    logger.error('[ServiceController] updateService error:', error);
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
}

export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    logger.error('[ServiceController] deleteService error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
}
