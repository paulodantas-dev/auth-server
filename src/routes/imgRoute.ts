import express from 'express';

import { imgController } from '../controllers/imgController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { imgMiddleware } from '../middlewares/imgMiddleware';

const router = express.Router();

router.post('/', imgMiddleware, authMiddleware, imgController.uploadAvatar);

export default router;
