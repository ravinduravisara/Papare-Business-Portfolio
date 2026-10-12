import type { Request, Response } from 'express';
import { Project } from '../models/Project.js';
import { logger } from '../utils/logger.js';

export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const { category, featured, search } = req.query;
    const filter: Record<string, any> = { isPublished: true };

    if (category && category !== 'All' && category !== 'All Projects') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    logger.error('[ProjectController] getProjects error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve projects' });
  }
}

export async function getProjectBySlug(req: Request, res: Response): Promise<void> {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const project = await Project.findOne({ slug, isPublished: true });

    if (!project) {
      res.status(404).json({ success: false, message: `Project with slug '${slug}' not found` });
      return;
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    logger.error('[ProjectController] getProjectBySlug error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve project details' });
  }
}

export async function getAllProjectsAdmin(req: Request, res: Response): Promise<void> {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    logger.error('[ProjectController] getAllProjectsAdmin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin projects' });
  }
}

export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const slug = data.slug.toLowerCase().trim();

    const existing = await Project.findOne({ slug });
    if (existing) {
      res.status(409).json({ success: false, message: `A project with slug '${slug}' already exists.` });
      return;
    }

    const project = await Project.create({ ...data, slug });
    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    logger.error('[ProjectController] createProject error:', error);
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
}

export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const data = req.body;

    if (data.slug) {
      data.slug = data.slug.toLowerCase().trim();
      const existing = await Project.findOne({ slug: data.slug, _id: { $ne: id } });
      if (existing) {
        res.status(409).json({ success: false, message: `A project with slug '${data.slug}' already exists.` });
        return;
      }
    }

    const updated = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error) {
    logger.error('[ProjectController] updateProject error:', error);
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
}

export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    logger.error('[ProjectController] deleteProject error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
}
