import { Request, Response, NextFunction } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { IUser } from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ error: 'Invalid Authentication.' });

    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload as IUser;
    if (!user) return res.status(401).json({ error: 'Invalid Authentication.' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
