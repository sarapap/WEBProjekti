import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await getUserByUsername(req.body.username);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    asiakas_id: user.asiakas,
    asiakas_etuname: user.asiakas_etuname,
    asiakas_sukuname: user.asiakas_sukuname,
    usernaasiakas_tunnusme: user.asiakas_tunnus,
    asiakas_salasana: user.asiakas_salasana,
    asiakas_email: user.easiakas_mail,
    asiakas_puh: user.asiakas_puh,
    asiakas_registeri_pvm: user.asiakas_registeri_pvm,
  };

  // toinen vaihtoehto
  // delete user.password;

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});

  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe};
