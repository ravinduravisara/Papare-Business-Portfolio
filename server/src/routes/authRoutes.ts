import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { validateBody } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { loginSchema } from '../validators/schemas.js';

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', getMe);

export default router;

