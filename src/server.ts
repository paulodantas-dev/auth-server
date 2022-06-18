import express from 'express';

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
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', authRouter);

export default app;
