import express from 'express';

import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.generateAccessToken);
router.post('/activate', authController.activateEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authMiddleware, authController.resetPassword);

export default router;
