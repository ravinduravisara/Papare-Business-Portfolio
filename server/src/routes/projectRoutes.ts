import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import { projectSchema } from '../validators/schemas.js';

const router = Router();

// Public
router.get('/', getProjects);
router.get('/admin/all', requireAuth, getAllProjectsAdmin);
router.get('/:slug', getProjectBySlug);

// Admin protected
router.post('/', requireAuth, validateBody(projectSchema), createProject);
router.patch('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;

