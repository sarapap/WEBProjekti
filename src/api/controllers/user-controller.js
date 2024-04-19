import { listAllUsers, findUserById, addUser, updateUser, removeUser } from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
    const users = await listAllUsers();
    if (!users) {
        res.sendStatus(404);
        return;
    }res
    res.json(users);
};

const getUserById = async(req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const postUser = async (req, res, next) => {
  console.log(req.body);
  req.body.asiakas_salasana = bcrypt.hashSync(req.body.asiakas_salasana, 10);

  const result = await addUser(req.body);
  if (!result) {
      const error = new Error('Invalid or missing fields.');
      error.status = 400;
      return next(error);
  }
  res.status(201).json(result);
};


const putUser = async (req, res) => {
    if (
        res.locals.user.user_id !== Number(req.params.id) &&
        res.locals.user.role !== 'admin'
    ) {
        res.sendStatus(403);
        return;
    }

    const result = await updateUser(req.body, req.params.id, res.locals.user);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

const deleteUser = async (req, res) => {
    if (
        res.locals.user.user_id !== Number(req.params.id) &&
        res.locals.user.role !== 'admin'
    ) {
        res.sendStatus(403);
        return;
    }
    const result = await removeUser(req.params.id);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.json(result);
};

export { getUser, getUserById, postUser, putUser, deleteUser };
