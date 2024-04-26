import {
  listAllTuote,
  findTuoteById,
  findTuoteByname,
  addTuote,
  removeTuoteById,
  updateTuote

 } from '../models/tuote-model.js';

import bcrypt from 'bcrypt';

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

const postTuote = async (req, res) => {
  console.log("body", req.body);
  console.log("file", req.file);

  let params = [
    req.body.tuote_nimi,
    req.file.path, // Use the file path instead of null
    req.body.tuote_hinta,
    req.body.tuote_kustannus,
    req.body.tuote_tyyppi
  ];

  const result = await addTuote(req.body, req.file);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.status(200);
  res.json(result);
};

const putTuote = async (req, res) => {
    const result = await updateTuote(req.body, req.params.tuote_id, res.locals.tuote);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteTuote = async (req, res) => {
    const result = await removeTuoteById(req.params.tuote_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getTuote, getTuoteByname, getTuoteById, postTuote, putTuote, deleteTuote };
