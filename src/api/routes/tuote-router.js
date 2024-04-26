import express from 'express';
import {
  getTuote,
  getTuoteByname,
  getTuoteById,
  postTuote,
  putTuote,
  deleteTuote,
} from '../controllers/tuote-controller.js';
import multer from 'multer';
import sharp from 'sharp';
import {authenticateToken, createThumbnail} from '../../middlewares.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    console.log("file in multer filename", file);
    cb(null, file.fieldname + '-' + Date.now()+".png");
  }
});

const upload = multer({ storage: storage });
const tuoteRouter = express.Router();

tuoteRouter.route('/')
  .get(getTuote)
  .post(upload.single('tuote_kuva'), (req, res, next) => {
    console.log("req.file", req.file);
    const inputFile = req.file.path;
    const outputFile = req.file.filename;
    postTuote(req, res, next);

  });

  tuoteRouter.route('/:tuote_id').get(getTuoteById).put(putTuote).delete(deleteTuote);
tuoteRouter.route('/name/:tuote_nimi').get(getTuoteByname);

export default tuoteRouter;
