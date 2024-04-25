import express from 'express';
import {
  getKategoriaTuoteeet,
  getKategoriaTuoteById,
  getKategoriaTuoteByKategoriaId,
  getKategoriaTuoteByTuoteId,
  postKategoriaTuote,
  putKategoriaTuoteById,
  deleteKategoriaTuoteById

} from '../controllers/kategoriaTuote-controller.js';

const KategoriaTuoteRouter = express.Router();

KategoriaTuoteRouter.route('/').get(getKategoriaTuoteeet).post(postKategoriaTuote);
KategoriaTuoteRouter.route('/kategoria/:kategoria_id').get(getKategoriaTuoteByKategoriaId);
KategoriaTuoteRouter.route('/tuote/:tuote_id').get(getKategoriaTuoteByTuoteId);
KategoriaTuoteRouter.route('/:id').get(getKategoriaTuoteById).put(putKategoriaTuoteById).delete(deleteKategoriaTuoteById);

export default KategoriaTuoteRouter;
