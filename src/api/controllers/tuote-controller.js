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

  // Your code to handle the uploaded data goes here

  res.status(200).send('File uploaded successfully');
};


//   const result = await addTuote(req.body, req.file);

//   if (result.tuote_id) {
//     res.status(201);
//     res.json({message: 'New tuote added.', result});
//   } else {
//     res.sendStatus(400);
//   }
// };


const putTuote = async (req, res) => {
    // if (
    //     res.locals.tuote.tuote_id !== Number(req.params.tuote_id) &&
    //     res.locals.tuote.role !== 'admin'
    // ) {
    //     res.sendStatus(403);
    //     return;
    // }

    const result = await updateTuote(req.body, req.params.tuote_id, res.locals.tuote);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteTuote = async (req, res) => {
    // if (
    //     res.locals.tuote.tuote_id !== Number(req.params.tuote_id)

    // ) {
    //     res.sendStatus(403);
    //     return;
    // }
    const result = await removeTuoteById(req.params.tuote_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getTuote, getTuoteByname, getTuoteById, postTuote, putTuote, deleteTuote };
