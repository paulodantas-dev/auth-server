import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { sendEmail } from '../config/sendMail';
import User from '../models/User';
import { createAccessToken, createActivationToken, createRefreshToken } from '../utils/token';

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'This email does not exist.' });

      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) return res.status(401).json({ error: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });

      res.status(200).json({ access_token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const isEmailAlreadyExist = await User.findOne({ email });
      if (isEmailAlreadyExist) return res.status(403).json({ error: 'This email already exists.' });

      if (password.length < 8)
        return res.status(401).json({ error: 'Password must be at least 8 characters.' });

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const activation_token = createActivationToken({ newUser });

      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      await sendEmail(email, url, 'Verify your email address');

      res.status(200).json({ success: 'Register Success! Please activate your email to start.' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  logout: async (_req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.status(200).json({ success: 'Logged out!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  generateAccessToken: async (req: Request, res: Response) => {
    try {
      const getToken = req.cookies.refreshtoken;
      if (!getToken) return res.status(400).json({ error: 'Please login now.' });

      const resultToken = jwt.verify(getToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload;
      if (!resultToken) return res.status(401).json({ error: 'Token invalid.' });

      const user = await User.findById(resultToken.id);
      if (!user) return res.status(404).json({ error: 'User does not exist.' });

      const access_token = createAccessToken({ id: user._id });

      res.status(200).json({ access_token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  activateEmail: async (req: Request, res: Response) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET) as JwtPayload;

      const { name, email, password } = user.newUser;

      const isAlreadyExist = await User.findOne({ email });
      if (isAlreadyExist) return res.status(400).json({ error: 'This email already exists.' });

      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();

      res.status(200).json({ success: 'Account has been activated!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'This email does not exist.' });

      const access_token = createAccessToken({ id: user._id });
      const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

      await sendEmail(email, url, 'Reset your password');

      res.status(200).json({ success: 'Re-send the password, please check your email.' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { password } = req.body;

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.status(200).json({ success: 'Password successfully changed!' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
