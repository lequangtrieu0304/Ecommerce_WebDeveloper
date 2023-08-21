import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';
import { authentication, authenticationCookie } from '../middleware/tokenAccess.js';

router.get('/create-admin', userController.createdAdminAccount);

router.get('/logout', userController.handleLogout);

router.post('/forgot-password', userController.forgotPassword)

router.post('/reset-password/:token', userController.resetPassword)

router.post('/login', userController.handleLogin);

router.post('/register', userController.handleRegister);

router.put('/update/:id', authenticationCookie, userController.handleUpdate);

export default router;