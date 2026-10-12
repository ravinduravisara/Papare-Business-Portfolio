import { Router } from 'express';
import { getPageSections, upsertPageSection } from '../controllers/pageController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/:slug', getPageSections);

// Admin protected
router.post('/', requireAuth, upsertPageSection);

export default router;

