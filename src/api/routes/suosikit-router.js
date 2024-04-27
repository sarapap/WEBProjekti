import {
  getsuosikit,
getsuosikkiByAsiakasId,
postsuosikki,
deletesuosikkiById
} from '../controllers/suosikit-controller.js';
import express from 'express';


const suosikitRouter = express.Router();

suosikitRouter.route('/').get(getsuosikit).post(postsuosikki);
suosikitRouter.route('/:asiakas_id').get(getsuosikkiByAsiakasId);
suosikitRouter.route('/:asiakas_id/:tuote_id').delete(deletesuosikkiById);

export default suosikitRouter;
