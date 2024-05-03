import {
  getOstokset,
  geOstosByAsiakasId,
  getTuoteMaaraByAsiakasIdAndTuoteId,
  postOstos,
  putOstosTuoteenMaara,
  deleteOstosById

} from '../controllers/ostoskori-controller.js';
import express from 'express';


const ostoskoriRouter = express.Router();

ostoskoriRouter.route('/').get(getOstokset).post(postOstos);
ostoskoriRouter.route('/:asiakas_id').get(geOstosByAsiakasId).delete(deleteOstosById);
ostoskoriRouter.route('/:asiakas_id/:tuote_id').get(getTuoteMaaraByAsiakasIdAndTuoteId).put(putOstosTuoteenMaara);

export default ostoskoriRouter;
