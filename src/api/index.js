import express from 'express';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import palauteRouter from './routes/palaute-router.js';
import kategoriaRouter from './routes/kategoria-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter

router.use('/asiakas', userRouter);
router.use('/auth', authRouter);
router.use('/palaute', palauteRouter);
router.use('/kategoria', kategoriaRouter);

export default router;
