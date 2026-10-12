import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { inquirySchema } from '../validators/schemas.js';

const router = Router();

// Public inquiry submission
router.post('/', inquiryLimiter, validateBody(inquirySchema), createInquiry);

// Admin protected inquiry management
router.get('/', requireAuth, getInquiries);
router.get('/:id', requireAuth, getInquiryById);
router.patch('/:id', requireAuth, updateInquiryStatus);
router.delete('/:id', requireAuth, deleteInquiry);

export default router;

