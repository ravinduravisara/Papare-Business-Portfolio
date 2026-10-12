import { Router } from 'express';
import { isDbConnected } from '../config/db.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ThePapare Events API',
    version: '1.0.0',
    database: isDbConnected() ? 'connected' : 'disconnected',
  });
});

export default router;

