

import express from 'express';
import userRouter from './User';
import authRouter from './Auth';
import productRouter from './Product';
import serviceRouter from './Service';
import orderRouter from './Order';
import authGuard from '../guards/auth';

const router = express.Router();

const index = '/api/rest/v1/'
router.use(index, authRouter);
router.use(index, authGuard, userRouter);
router.use(index, authGuard, productRouter);
router.use(index, authGuard, serviceRouter);
router.use(index, authGuard, orderRouter);

export default router