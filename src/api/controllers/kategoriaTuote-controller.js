import {
  listAllKategoriaTuote,
  findKategoriaTuoteById,
  findKategoriaTuoteByTuoteId,
  findKategoriaTuoteByKategoriaId,
  addKategoriaTuote,
  removeKategoriaTuoteById,
  updateKategoriaTuoteById
} from '../models/kategoriaTuote-model.js';
import bcrypt from 'bcrypt';

const getKategoriaTuoteeet = async (req, res) => {
    const kategoriatuoteet = await listAllKategoriaTuote();
    if (!kategoriatuoteet) {
        res.sendStatus(404);
        return;
    }res
    res.json(kategoriatuoteet);
};

const getKategoriaTuoteById = async (req, res) => {
  const kategoriatuote_id = req.params.id; // 获取 kategoriatuote_id 参数
  const kategoriaTuote = await findKategoriaTuoteById(kategoriatuote_id); // 使用 kategoriatuote_id 参数查询数据
  if (kategoriaTuote) {
      res.json(kategoriaTuote);
  } else {
      res.sendStatus(404);
  }
};


const getKategoriaTuoteByTuoteId = async(req, res) => {
    const kategoriaTuote = await findKategoriaTuoteByTuoteId(req.params.tuote_id);
    if (kategoriaTuote) {
        res.json(kategoriaTuote);
    } else {
        res.sendStatus(404);
    }
};

const getKategoriaTuoteByKategoriaId = async(req, res) => {
  const kategoriaTuote = await findKategoriaTuoteByKategoriaId(req.params.kategoria_id);
  if (kategoriaTuote) {
      res.json(kategoriaTuote);
  } else {
      res.sendStatus(404);
  }
}

const postKategoriaTuote = async (req, res) => {
  console.log(req.body);

  const result = await addKategoriaTuote(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return
  }
  res.status(201).json(result);
};


const putKategoriaTuoteById = async (req, res) => {

    console.log("req.body", req.body);
    const result = await updateKategoriaTuoteById(req.body, req.params.kategoriatuote_id, res.locals.kategoriaTuote);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteKategoriaTuoteById = async (req, res) => {

    const result = await removeKategoriaTuoteById(req.params.kategoriatuote_id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export {
  getKategoriaTuoteeet,
  getKategoriaTuoteById,
  getKategoriaTuoteByKategoriaId,
  getKategoriaTuoteByTuoteId,
  postKategoriaTuote,
  putKategoriaTuoteById,
  deleteKategoriaTuoteById
};
