import { Router } from 'express';
import { getSettings, updateSettings, getDashboardStats } from '../controllers/settingsController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { settingsSchema } from '../validators/schemas.js';

const router = Router();

// Public
router.get('/', getSettings);

// Admin protected
router.get('/stats', requireAuth, getDashboardStats);
router.patch('/', requireAuth, validateBody(settingsSchema), updateSettings);

export default router;

