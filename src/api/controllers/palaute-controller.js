import { listAllpalaute, findPalauteByPvm, findPalauteByDateRange, addPalaute, removePalauteById} from '../models/palaute-model.js';
// import bcrypt from 'bcrypt';

const getPalaute = async (req, res) => {
    const palaute = await listAllpalaute();
    if (!palaute) {
        res.sendStatus(404);
        return;
    }res
    res.json(palaute);
};


const getPalauteByPvm = async(req, res) => {
    const palaute = await findPalauteByPvm(req.params.pvm);
    if (palaute) {
        res.json(palaute);
    } else {
        res.sendStatus(404);
    }
};

const getPalauteByDateRange = async (req, res) => {
    const palaute = await findPalauteByDateRange(req.params.startDate, req.params.endDate);
    if (palaute) {
        res.json(palaute);
    } else {
        res.sendStatus(404);
    }
}

const postPalaute = async (req, res) => {
  console.log(req.body);

  const result = await addPalaute(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return
  }
  res.status(201).json(result);
};


const deletePalaute = async (req, res) => {
    // if (
    //     res.locals.palaute.palaute_id !== Number(req.params.id)

    // ) {
    //     res.sendStatus(403);
    //     return;
    // }
    const result = await removePalauteById(req.params.id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getPalaute, getPalauteByPvm, getPalauteByDateRange, postPalaute, deletePalaute};
