import type { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry.js';
import { sendInquiryNotification } from '../services/emailService.js';
import { logger } from '../utils/logger.js';

export async function createInquiry(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;

    // 1. Persist in MongoDB FIRST
    const inquiry = await Inquiry.create({
      fullName: data.fullName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      service: data.service,
      projectDate: data.projectDate,
      budget: data.budget,
      message: data.message,
      status: 'New',
    });

    // 2. Attempt email dispatch in background without crashing request
    sendInquiryNotification(inquiry).catch((err) => {
      logger.error('[InquiryController] Email dispatch failed for inquiry:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to ThePapare Events. Your inquiry has been successfully received.',
      data: {
        id: inquiry._id,
        fullName: inquiry.fullName,
        service: inquiry.service,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    logger.error('[InquiryController] Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Could not store inquiry in the database. Please try again or reach out directly.',
    });
  }
}

export async function getInquiries(req: Request, res: Response): Promise<void> {
  try {
    const { status, service, search } = req.query;
    const filter: Record<string, any> = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (service && service !== 'All') {
      filter.service = service;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    logger.error('[InquiryController] getInquiries error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiries' });
  }
}

export async function getInquiryById(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    logger.error('[InquiryController] getInquiryById error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiry' });
  }
}

export async function updateInquiryStatus(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed', 'Archived'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status value' });
      return;
    }

    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Inquiry status updated', data: updated });
  } catch (error) {
    logger.error('[InquiryController] updateInquiryStatus error:', error);
    res.status(500).json({ success: false, message: 'Failed to update inquiry status' });
  }
}

export async function deleteInquiry(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    logger.error('[InquiryController] deleteInquiry error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
}
