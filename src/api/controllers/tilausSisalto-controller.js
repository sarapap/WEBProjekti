import{
  listAllTilausSisalto,
  findTilausSisaltoById,
  findTilausSisaltoByTilausId,
  findTilausSisaltoByPvm,
  findTilausSisaltoByDateRange,
  addTilausSisalto,
  removeTilausSisaltoById,
  updateTilausSisaltoById
} from '../models/tilausSisalto-model.js';

const getTilausSisalto = async (req, res) => {
  const tilausSisalto = await listAllTilausSisalto();
  if (!tilausSisalto) {
      res.sendStatus(404);
      return;
  }res
  res.json(tilausSisalto);
};

const getTilausSisaltoById = async(req, res) => {
  const tilausSisalto = await findTilausSisaltoById(req.params.id);
  if (tilausSisalto) {
      res.json(tilausSisalto);
  } else {
      res.sendStatus(404);
  }
};

const getTilausSisaltoByTilausId = async(req, res) => {
  const tilausSisalto = await findTilausSisaltoByTilausId(req.params.tilaus_id);
  if (!tilausSisalto) {
    res.sendStatus(404);
    return;
}
res.json(tilausSisalto);
};


const getTilausSisaltoByTilausPvm = async(req, res) => {
  const tilausSisalto = await findTilausSisaltoByPvm(req.params.tilaus_pvm);
  if (tilausSisalto) {
      res.json(tilausSisalto);
  } else {
      res.sendStatus(404);
  }
}

const getTilasSisaltoByDateRange = async (req, res) => {
  const tilausSisalto = await findTilausSisaltoByDateRange(req.params.startDate, req.params.endDate);
  if (tilausSisalto) {
      res.json(tilausSisalto);
  } else {
      res.sendStatus(404);
  }
}

const postTilausSisalto = async (req, res) => {
  console.log(req.body);

  const result = await addTilausSisalto(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return
  }
res.status(201).json(result);
};

const putTilausSisaltoById = async (req, res) => {

  console.log("req.body", req.body);
  const result = await updateTilausSisaltoById(req.body, req.params.id, res.locals.tilausSisalto);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.json(result);
};

const deleteTilausSisaltoById = async (req, res) => {

  const result = await removeTilausSisaltoById(req.params.id);
  if (!result) {
      res.sendStatus(400);
      return;
  }
  res.json(result);
};

export {
getTilausSisalto,
getTilausSisaltoById,
getTilausSisaltoByTilausId,
getTilausSisaltoByTilausPvm,
getTilasSisaltoByDateRange,
postTilausSisalto,
putTilausSisaltoById,
deleteTilausSisaltoById
};
