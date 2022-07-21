import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './config/swagger.json';
import authRoute from './routes/authRoute';
import imgRoute from './routes/imgRoute';
import userRoute from './routes/userRoute';

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/api/doc');
});

app.use('/api', authRoute);
app.use('/api/user', userRoute);
app.use('/api/upload-avatar', imgRoute);
app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;
