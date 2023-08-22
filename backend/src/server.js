import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/database.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import { logger } from './middleware/logger.js';

import orderRouter from './routers/orderRouter.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import uploadImgProduct from './routers/uploadImage.js';
import uploadImgUser from './routers/uploadUser.js';

mongoose.set('strictQuery', true);
mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connect successully!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  next();
});
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(logger);

app.use('/api/uploads', uploadImgProduct);
app.use('/api/uploads-user', uploadImgUser);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message });
});

app.use('/uploads', express.static(path.join(__dirname, './../uploads')));

app.use(express.static(path.join(__dirname, './../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
