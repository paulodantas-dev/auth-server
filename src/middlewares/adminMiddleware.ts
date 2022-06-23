import { Request, Response, NextFunction } from 'express';

import User from '../models/User';

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 1) return res.status(500).json({ error: 'Admin resources access denied.' });

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
