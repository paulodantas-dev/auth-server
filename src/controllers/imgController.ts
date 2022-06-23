import { Request, Response } from 'express';

import { v2 as cloudinary } from 'cloudinary';

import { removeTmp } from '../utils/removeImgTemp';

export interface IFile {
  tempFilePath: string;
  mimetype: string;
  size: number;
}

export const imgController = {
  uploadAvatar: (req: Request, res: Response) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
      });

      const file = req.files?.file as IFile;

      cloudinary.uploader.upload(
        file?.tempFilePath,
        {
          folder: 'mern-auth',
          width: 150,
          height: 150,
          crop: 'fill',
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file?.tempFilePath);

          res.status(200).json({ url: result?.secure_url });
        }
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
