import express from 'express';
import multer from 'multer';
import {
  authentication,
  authenticationCookie,
  isAdmin,
} from '../middleware/tokenAccess.js';
import path from 'path';
import CustomError from '../Errors/index.js';

const router = express.Router();

const IMAGE_UPLOAD_DIR = 'uploads/';
const IMAGE_MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(IMAGE_UPLOAD_DIR));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const fileFilter = (req, file, cb) => {
  const isAllowedType = ALLOWED_IMAGE_TYPES.includes(file.mimetype);
  if (isAllowedType) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_IMAGE_TYPE'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: IMAGE_MAX_SIZE },
  fileFilter: fileFilter,
});

router.post(
  '/image',
  authenticationCookie,
  isAdmin,
  upload.single('image'),
  (req, res, next) => {
    try {
      if (!req.file) {
        throw new CustomError.BadRequestError('IMAGE_UPLOAD_FAILED');
      }
      res.status(201).json({
        image: `${req.file.path}`,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
