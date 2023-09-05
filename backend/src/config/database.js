import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_URL: process.env.MONGODB_URL,
};
