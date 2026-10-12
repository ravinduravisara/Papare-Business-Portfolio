import { Router } from 'express';
import {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { serviceSchema } from '../validators/schemas.js';

const router = Router();

// Public
router.get('/', getServices);
router.get('/admin/all', requireAuth, getAllServicesAdmin);
router.get('/:slug', getServiceBySlug);

// Admin protected
router.post('/', requireAuth, validateBody(serviceSchema), createService);
router.patch('/:id', requireAuth, updateService);
router.delete('/:id', requireAuth, deleteService);

export default router;

