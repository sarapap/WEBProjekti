import express from 'express';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import palauteRouter from './routes/palaute-router.js';
import kategoriaRouter from './routes/kategoria-router.js';
import tuoteRouter from './routes/tuote-router.js';
import KategoriaTuoteRouter from './routes/kategoriaTuote-router.js';
import tilausRouter from './routes/tilaus-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter

router.use('/asiakas', userRouter);
router.use('/auth', authRouter);
router.use('/palaute', palauteRouter);
router.use('/kategoria', kategoriaRouter);
router.use('/tuote', tuoteRouter);
router.use('/kategoria_tuote', KategoriaTuoteRouter);
router.use('/tilaus', tilausRouter);


export default router;
