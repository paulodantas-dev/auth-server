import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/User';
import { createAccessToken } from '../utils/token';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { fullname, username, email, password } = req.body;

      const newUserName = username.toLowerCase().replace(/ /g, '');

      const findUserName = await User.findOne({ username: newUserName });
      if (findUserName) return res.status(400).json({ error: 'This user name already exists.' });

      const findUserEmail = await User.findOne({ email });
      if (findUserEmail) return res.status(400).json({ error: 'This email already exists.' });

      if (password.length < 6)
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const userDB = new User({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
      });

      const access_token = createAccessToken({ id: userDB._id });

      const newUser = await userDB.save();

      res.status(200).json({
        access_token,
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.status(200).json({
        access_token,
        user,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  generateAccessToken: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ error: 'Token doenst exist.' });

      const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
      if (!verifyToken) return res.status(400).json({ error: 'invalid token.' });

      const user = await User.findById(verifyToken.id).select('-password');
      if (!user) return res.status(400).json({ error: 'This does not exist.' });

      const access_token = createAccessToken({ id: verifyToken.id });

      res.status(200).json({
        access_token,
        user,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default authController;
