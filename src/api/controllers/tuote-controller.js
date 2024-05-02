import {
  listAllTuote,
  findTuoteById,
  findTuoteByname,
  findLastTuoteId,
  addTuote,
  removeTuoteById,
  updateTuote
 } from '../models/tuote-model.js';

const getTuote = async (req, res) => {
    const tuoteet = await listAllTuote();
    if (!tuoteet) {
        res.sendStatus(404);
        return;
    }res
    res.json(tuoteet);
};

const getTuoteByname = async(req, res) => {
    const tuote = await findTuoteByname(req.params.tuote_nimi);
    if (tuote) {
        res.json(tuote);
    } else {
        res.sendStatus(404);
    }
}

const getTuoteById = async(req, res) => {
    const tuote = await findTuoteById(req.params.tuote_id);
    if (tuote) {
        res.json(tuote);
    } else {
        res.sendStatus(404);
    }
};
const getLastTuoteId = async (req, res) => {
  try {
    const tuote_id = await findLastTuoteId();
    console.log('tuote_id', tuote_id);
    if (!tuote_id) {
      res.sendStatus(404);
      return;
    }
    res.json(tuote_id);
  } catch (error) {
    console.error('Error getting last tuote_id:', error);
    res.status(500).send('Internal Server Error');
  }
};


const postTuote = async (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);

  let params = [
    req.body.tuote_nimi,
    req.body.tuote_kuvaus,
    req.body.tuote_hinta,
    req.body.tuote_kustannus,
    req.body.tyyppi_id,
    req.file.path
  ];

  const result = await addTuote(req.body, req.file);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.status(200);
  res.json(result);
};

const putTuote = async(req, res, next) => {
  const data = {
    tuote_nimi: req.body.tuote_nimi,
    tuote_kuvaus: req.body.tuote_kuvaus,
    tuote_hinta: req.body.tuote_hinta,
    tuote_kustannus: req.body.tuote_kustannus,
    tuote_tyyppi: req.body.tyyppi_id,
    tuote_kuva: req.file.filename // Update the file path
  };

  console.log("body", req.body);
  console.log("file", req.file);

  const result = await updateTuote(data, req.params.tuote_id, res.locals.tuote);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.status(200);
  res.json(result)
};

const deleteTuote = async (req, res) => {
    const result = await removeTuoteById(req.params.tuote_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getTuote, getTuoteByname, getTuoteById, getLastTuoteId, postTuote, putTuote, deleteTuote };
