import type { Request, Response } from 'express';
import { Client } from '../models/Client.js';
import { logger } from '../utils/logger.js';

export async function getClients(req: Request, res: Response): Promise<void> {
  try {
    const clients = await Client.find({ isVisible: true }).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    logger.error('[ClientController] getClients error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve clients' });
  }
}

export async function getAllClientsAdmin(req: Request, res: Response): Promise<void> {
  try {
    const clients = await Client.find().sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    logger.error('[ClientController] getAllClientsAdmin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin clients' });
  }
}

export async function createClient(req: Request, res: Response): Promise<void> {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, message: 'Client created successfully', data: client });
  } catch (error) {
    logger.error('[ClientController] createClient error:', error);
    res.status(500).json({ success: false, message: 'Failed to create client' });
  }
}

export async function updateClient(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const updated = await Client.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Client updated successfully', data: updated });
  } catch (error) {
    logger.error('[ClientController] updateClient error:', error);
    res.status(500).json({ success: false, message: 'Failed to update client' });
  }
}

export async function deleteClient(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const deleted = await Client.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Client not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Client removed successfully' });
  } catch (error) {
    logger.error('[ClientController] deleteClient error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete client' });
  }
}
