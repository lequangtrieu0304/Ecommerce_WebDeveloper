import express from 'express';
const router = express.Router();

import orderController from '../controllers/orderController.js';
import { authenticationCookie, isAdmin } from '../middleware/tokenAccess.js';

router.get('/summary', authenticationCookie, isAdmin, orderController.summaryOrder);

router.get('/selling-products', orderController.sellingProducts);

router.get('/', orderController.getAllOrder);

router.get('/:id', orderController.getOrderById);

router.post('/auth', authenticationCookie, orderController.createOrderLogin);

router.post('/', orderController.createOrder);

export default router;