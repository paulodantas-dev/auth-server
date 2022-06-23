import express from 'express';

import { userController } from '../controllers/userController';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, userController.getUser);
router.get('/all', authMiddleware, adminMiddleware, userController.getAllUser);
router.patch('/update', authMiddleware, userController.updateUser);
router.patch('/update-role/:id', authMiddleware, adminMiddleware, userController.updateUsersRole);
router.delete('/delete/:id', authMiddleware, adminMiddleware, userController.deleteUser);

export default router;
