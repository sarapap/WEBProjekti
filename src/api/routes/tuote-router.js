import express from 'express';

import {
 getTuote,
  getTuoteByname,
  getTuoteById,
  postTuote,
  putTuote,
  deleteTuote,

} from '../controllers/tuote-controller.js';

const tuoteRouter = express.Router();

tuoteRouter.route('/').get(getTuote).post(postTuote);
tuoteRouter.route('/:tuote_id').get(getTuoteById).put(putTuote).delete(deleteTuote);
tuoteRouter.route('/:tuote_nimi').get(getTuoteByname);

export default tuoteRouter;
