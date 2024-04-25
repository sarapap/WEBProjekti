import {
  getTilausSisalto,
getTilausSisaltoById,
getTilausSisaltoByTilausId,
getTilausSisaltoByTilausPvm,
getTilasSisaltoByDateRange,
postTilausSisalto,
putTilausSisaltoById,
deleteTilausSisaltoById
} from '../controllers/tilausSisalto-controller.js';

import express from 'express';

const tilausSisaltoRouter = express.Router();

tilausSisaltoRouter.route('/').get(getTilausSisalto).post(postTilausSisalto);
tilausSisaltoRouter.route('/:id').get(getTilausSisaltoById).put(putTilausSisaltoById).delete(deleteTilausSisaltoById);
tilausSisaltoRouter.route('/tilaus/:tilaus_id').get(getTilausSisaltoByTilausId);
tilausSisaltoRouter.route('/pvm/:tilaus_pvm').get(getTilausSisaltoByTilausPvm);
tilausSisaltoRouter.route('/daterange/:startDate/:endDate').get(getTilasSisaltoByDateRange);



export default tilausSisaltoRouter;
