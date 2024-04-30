import { listAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import promisePool from '../../utils/database.js';
import config from '../../config/config.js';

const getUser = async (req, res) => {
    const users = await listAllUsers();
    if (!users) {
        res.sendStatus(404);
        return;
    } res
    res.json(users);
};

const getUserByUsername = async (req, res) => {
    const user = await findUserByUsername(req.params.tunnus);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}

const getUserById = async (req, res) => {
    const user = await findUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const SECRET_KEY = config.SECRET_KEY;

const postUser = async (req, res) => {
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

        const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            throw new Error(`Puuttuvat kentät: ${missingFields.join(", ")}`);
        }

        const result = await addUser({
            etunimi,
            sukunimi,
            tunnus,
            salasana: bcrypt.hashSync(salasana, 10),
            rooli: req.body.rooli || 'user',
            email,
            puhelin,
            syntymapaiva,
            ehdot_hyvaksytty,
            allennus_ryhma,
        });

        if (!result) {
            throw new Error("Käyttäjän lisääminen epäonnistui");
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
        console.error('Virhe postUser-toiminnossa:', error.message);
        res.status(400).json({ error: error.message });
    }
};

const userLoginPost = async (req, res) => {
    try {
        const { tunnus, salasana } = req.body;

        if (!tunnus || !salasana) {
            throw new Error('Käyttäjätunnus ja salasana ovat pakollisia');
        }

        const sql = 'SELECT * FROM asiakas WHERE tunnus = ?';
        const [rows] = await promisePool.execute(sql, [tunnus]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana' });
        }

        const user = rows[0];

        const passwordMatch = bcrypt.compareSync(salasana, user.salasana);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana' });
        }

        const token = jwt.sign(
            { asiakas_id: user.asiakas_id, tunnus: user.tunnus, role: user.rooli },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, message: 'Kirjautuminen onnistui', token, asiakas_id: user.id });

    } catch (error) {
        console.error('Virhe kirjautumisessa:', error.message);
        res.status(400).json({ error: error.message });
    }
};


const putUser = async (req, res) => {
    const result = await updateUser(req.body, req.params.asiakas_id, res.locals.user);
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

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = await findUserById(userId);

        if (!userData) {
            return res.status(404).json({ error: "Käyttäjää ei löydy." });
        }

        res.status(200).json({
            nimi: `${userData.etunimi} ${userData.sukunimi}`,
            tunnus: userData.tunnus,
            email: userData.email,
            puhelin: userData.puhelin,
            syntymapaiva: userData.syntymapaiva,
            allennus_ryhma: userData.allennus_ryhma,
        });

    } catch (error) {
        console.error("Virhe getUserInfo-funktiossa:", error.message);
        res.status(500).json({ error: "Virhe palvelimella." });
    }
};

export { getUser, getUserByUsername, getUserById, postUser, userLoginPost, putUser, deleteUser, getUserInfo };
