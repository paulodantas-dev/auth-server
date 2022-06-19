import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Cookie from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/User';
import { createAccessToken, createRefreshToken } from '../utils/token';

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { fullname, username, email, password } = req.body;

      const newUserName = username.toLowerCase().replace(/ /g, '');

      const findUserName = await User.findOne({ username: newUserName });
      if (findUserName) return res.status(400).json({ error: 'This user name already exists.' });

      const findUserEmail = await User.findOne({ email });
      if (findUserEmail) return res.status(403).json({ error: 'This email already exists.' });

      if (password.length < 8)
        return res.status(401).json({ error: 'Password must be at least 8 characters.' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      Cookie.set('refreshtoken', refresh_token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days
        path: '/api/refresh_token',
        sameSite: 'None',
        secure: true,
      });

      const user = await newUser.save();

      res.status(200).json({
        access_token,
        user,
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
      if (!isMatch) return res.status(401).json({ error: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      Cookie.set('refreshtoken', refresh_token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30days
        path: '/api/refresh_token',
        sameSite: 'None',
        secure: true,
      });

      res.status(200).json({
        access_token,
        user,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  logout: async (_req: Request, res: Response) => {
    try {
      Cookie.remove('refreshtoken', {
        path: '/api/refresh_token',
        sameSite: 'None',
        secure: true,
      });
      return res.json({ success: 'Logged out!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  generateAccessToken: async (req: Request, res: Response) => {
    try {
      const getToken = Cookie.get('refreshtoken');
      if (!getToken) return res.status(400).json({ error: 'Please login now.' });

      const resultToken = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
      if (!resultToken) return res.status(401).json({ error: 'Token invalid.' });

      const user = await User.findById(resultToken.id);
      if (!user) return res.status(404).json({ error: 'This does not exist.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        access_token,
        user,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default authController;
