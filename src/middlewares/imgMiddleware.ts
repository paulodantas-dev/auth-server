import { NextFunction, Request, Response } from 'express';

import { IFile } from '../controllers/imgController';
import { removeImgTmp } from '../utils/removeImgTemp';

export const imgMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ error: 'No files were uploaded.' });

    const file = req.files.file as IFile;

    if (file?.size > 1024 * 1024) {
      removeImgTmp(file?.tempFilePath);
      return res.status(400).json({ error: 'Size too large.' });
    } // 1mb

    if (file?.mimetype !== 'image/jpeg' && file?.mimetype !== 'image/png') {
      removeImgTmp(file?.tempFilePath);
      return res
        .status(400)
        .json({ error: 'File format is incorrect only png or jpeg are acceptable.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
