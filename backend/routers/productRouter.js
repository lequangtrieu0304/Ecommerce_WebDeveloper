import express from 'express';
const router = express.Router();

import productController from '../controllers/productController.js';
import { authentication, authenticationCookie, isAdmin } from '../middleware/tokenAccess.js';

// router.get('/', productController.getAllProduct);

router.get('/', productController.getProductByKey);

router.get('/:id', productController.getProductById);

router.post('/', authenticationCookie, productController.createProduct);

router.post('/:id/review', authenticationCookie, productController.createReview);

router.put('/:id', authenticationCookie, isAdmin, productController.updatedProduct);

router.delete('/:id', authenticationCookie, isAdmin, productController.deleteProduct);

export default router;