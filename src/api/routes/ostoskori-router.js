import {
  getOstokset,
  geOstosByAsiakasId,
  postOstos,
  putOstosTuoteenMaara,
  deleteOstosById

} from '../controllers/ostoskori-controller.js';
import express from 'express';


const ostoskoriRouter = express.Router();

ostoskoriRouter.route('/').get(getOstokset).post(postOstos);
ostoskoriRouter.route('/:asiakas_id').get(geOstosByAsiakasId);
ostoskoriRouter.route('/:asiakas_id/:tuote_id').delete(deleteOstosById).put(putOstosTuoteenMaara);

export default ostoskoriRouter;
