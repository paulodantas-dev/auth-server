import { Request, Response } from 'express';

import User from '../models/User';

export const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.user;

      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getAllUser: async (_req: Request, res: Response) => {
    try {
      const users = await User.find().select('-password');
      if (!users) {
        return res.status(404).json({ error: 'Users not found' });
      }

      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { name, avatar } = req.body;
      const { id } = req.user;
      await User.findOneAndUpdate(
        { _id: id },
        {
          name,
          avatar,
        }
      );

      res.status(200).json({ success: 'Update Success!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  updateUsersRole: async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
      const { id } = req.params;

      await User.findOneAndUpdate(
        { _id: id },
        {
          role,
        }
      );

      res.status(200).json({ success: 'Update Success!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);

      res.status(200).json({ success: 'Deleted Success!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
