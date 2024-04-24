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
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });
const tuoteRouter = express.Router();

tuoteRouter.route('/')
  .get(getTuote)
  .post(upload.single('tuote_kuva'), (req, res, next) => {
    const inputFile = req.file.path;
    const outputFile = 'resized-' + req.file.filename;

    sharp(inputFile)
      .resize(200, 200)
      .toFile(outputFile, (err, info) => {
        if (err) {
          console.error('Error resizing image', err);
          return res.status(500).send('Error resizing image');
        }

        console.log('Image resized successfully', info);
        // Call the postTuote function here, after resizing the image
        postTuote(req, res, next);
      });
  });


tuoteRouter.route('/:tuote_id').get(getTuoteById).put(putTuote).delete(deleteTuote);
tuoteRouter.route('/name/:tuote_nimi').get(getTuoteByname);

export default tuoteRouter;
