import express, { Request, Response, NextFunction } from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';

import authRouter from './routes/authRoute';
import swaggerDocument from './utils/swagger.json';

const app = express();

dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/api/doc');
});

app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', authRouter);

export default app;
