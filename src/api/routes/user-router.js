import express from 'express';
import {
    getUser,
    getUserById,
    getUserByUsername,
    postUser,
    userLoginPost,
    putUser,
    deleteUser,
    getUserInfo,
    updatePasswordController,
    checkAlennus
} from '../controllers/user-controller.js';
import { addUser } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
const SECRET_KEY = config.SECRET_KEY;

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/info/:id').get(getUserInfo).put(putUser);
userRouter.route('/login').post(userLoginPost);
userRouter.route('/alennus/:id').get(checkAlennus);
userRouter.route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);
userRouter.route('/password/:id').put(updatePasswordController);
userRouter.route('/name/:tunnus').get(getUserByUsername);
userRouter.post('/vieras', async (req, res) => {
    try {
        const {
            etunimi,
            sukunimi,
            tunnus,
            salasana,
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        } = req.body;

        // Tässä voit tehdä tarvittavat tarkistukset annetuille tiedoille

        const result = await addUser({
            etunimi,
            sukunimi,
            tunnus,
            salasana: bcrypt.hashSync(salasana, 10),
            rooli: 'vieras', // Asetetaan rooliksi vieras
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        });

        if (!result) {
            throw new Error("Vierasasiakkaan lisääminen epäonnistui");
        }

        const token = jwt.sign(
            {
                asiakas_id: result.asiakas_id,
                username: tunnus,
                role: result.rooli,
            },
            SECRET_KEY
        );

        res.status(201).json({ success: true, token, asiakas_id: result.asiakas_id });
    } catch (error) {
        console.error('Virhe vierasasiakkaan lisäämisessä:', error.message);
        res.status(400).json({ error: error.message });
    }
});

export default userRouter;