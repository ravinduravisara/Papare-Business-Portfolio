import { Router } from 'express';
import multer from 'multer';
import { uploadMedia, getMediaList, deleteMedia } from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/auth.js';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are supported.'));
    }
  },
});

const router = Router();

router.post('/', requireAuth, upload.single('file'), uploadMedia);
router.get('/', requireAuth, getMediaList);
router.delete('/:id', requireAuth, deleteMedia);

export default router;

