import { Router } from 'express';
import {
  getClients,
  getAllClientsAdmin,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { clientSchema } from '../validators/schemas.js';

const router = Router();

// Public
router.get('/', getClients);
router.get('/admin/all', requireAuth, getAllClientsAdmin);

// Admin protected
router.post('/', requireAuth, validateBody(clientSchema), createClient);
router.patch('/:id', requireAuth, updateClient);
router.delete('/:id', requireAuth, deleteClient);

export default router;

