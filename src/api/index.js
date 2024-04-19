import express from 'express';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter

router.use('/api/vi/asiakas', userRouter);
router.use('/auth', authRouter);

export default router;
