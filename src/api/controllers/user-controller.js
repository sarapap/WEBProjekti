import { listAllUsers, findUserById, findUserByUsername, addUser, updateUser, removeUser } from '../models/user-model.js';
import bcrypt from 'bcrypt';

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

const postUser = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        if (!req.body.salasana) {
            throw new Error("Salasana puuttuu");
        }

        req.body.salasana = bcrypt.hashSync(req.body.salasana, 10);
        if (!req.body.rooli) {
            req.body.rooli = "user";
        }

        const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            throw new Error(`Puuttuvat kentät: ${missingFields.join(", ")}`);
        }

        const result = await addUser(req.body);
        if (!result) {
            throw new Error("Käyttäjän lisääminen epäonnistui");
        }

        res.status(201).json({ message: "Käyttäjä lisätty onnistuneesti", asiakas_id: result.asiakas_id });

    } catch (error) {
        console.error("Virhe rekisteröinnissä:", error.message);
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

export { getUser, getUserByUsername, getUserById, postUser, putUser, deleteUser };
