import express, { Request, Response } from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';

import authRouter from './routes/authRoute';
import swaggerDocument from './utils/swagger.json';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/api/doc');
});

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', authRouter);

export default app;
