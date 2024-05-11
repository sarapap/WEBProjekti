// test/userController.test.js
import request from 'supertest';
import app from '../src/app.js';
import {
    listAllUsers,
    findUserById,
    findUserByUsername,
    findUserByTunnus,
    addUser,
    updateUser,
    removeUser,
    updateUserPassword,
    getAlennusRyhma,
} from '../src/api/models/user-model.js';

beforeEach(() => {
    jest.clearAllMocks();
});


jest.mock('../models/user-model');

// Mockataan salasana-tarkistuksen funktio
jest.mock('../../utils/salasana.js', () => ({
    checkPassword: jest.fn(),
}));


// Testit getUserByUsername
describe('getUserByUsername', () => {
    it('should return a user by username', async () => {
        const mockUser = { id: 1, tunnus: 'testuser' };
        findUserByUsername.mockResolvedValue(mockUser);

        const response = await request(app).get('/users/username/testuser');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    it('should return 404 if user is not found', async () => {
        findUserByUsername.mockResolvedValue(null);

        const response = await request(app).get('/users/username/nonexistent');

        expect(response.status).toBe(404);
    });
});

// Testit userLoginPost
describe('userLoginPost', () => {
    it('should return a token on successful login', async () => {
        const mockUser = {
            asiakas_id: 1,
            tunnus: 'testuser',
            salasana: 'hashedpassword', // Mockattu hashattu salasana
        };

        // Mockataan salasanan tarkistaminen ja käyttäjän haku
        findUserByTunnus.mockResolvedValue(mockUser);
        jest.mock('../../utils/salasana.js', () => ({
            checkPassword: jest.fn().mockReturnValue(true),
        }));

        const response = await request(app)
            .post('/users/login')
            .send({ tunnus: 'testuser', salasana: 'password' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    });

    it('should return 401 if password is incorrect', async () => {
        findUserByTunnus.mockResolvedValue({
            asiakas_id: 1,
            tunnus: 'testuser',
            salasana: 'hashedpassword',
        });

        jest.mock('../../utils/salasana.js', () => ({
            checkPassword: jest.fn().mockReturnValue(false),
        }));

        const response = await request(app)
            .post('/users/login')
            .send({ tunnus: 'testuser', salasana: 'wrongpassword' });

        expect(response.status).toBe(401);
    });
});

// Testit putUser
describe('putUser', () => {
    it('should update user information', async () => {
        const asiakas_id = 1;
        const updatedUser = { etunimi: 'Updated', sukunimi: 'User' };

        updateUser.mockResolvedValue(updatedUser);

        const response = await request(app)
            .put(`/users/${asiakas_id}`)
            .send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedUser);
    });

    it('should return 400 if update fails', async () => {
        updateUser.mockResolvedValue(null);

        const response = await request(app)
            .put('/users/1')
            .send({ etunimi: 'Fail' });

        expect(response.status).toBe(400);
    });
});

// Testit deleteUser
describe('deleteUser', () => {
    it('should delete a user if authorized', async () => {
        removeUser.mockResolvedValue({ success: true });

        const response = await request(app)
            .delete('/users/1');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should return 403 if not authorized', async () => {
        res.locals.user = { user_id: 2, role: 'user' }; // Mockataan käyttäjä paikallisesti
        const response = await request(app)
            .delete('/users/1');

        expect(response.status).toBe(403);
    });
});

// Testit updatePasswordController
describe('updatePasswordController', () => {
    it('should update user password', async () => {
        const newPassword = 'newpassword';
        const hashedPassword = 'hashedNewPassword';
        const userId = 1;

        findUserById.mockResolvedValue({ asiakas_id: userId });
        updateUserPassword.mockResolvedValue({ success: true });

        const response = await request(app)
            .put(`/users/${userId}/password`)
            .send({ salasana: newPassword });

        expect(response.status).toBe(200);
    });

    it('should return 400 if no password is provided', async () => {
        const response = await request(app)
            .put('/users/1/password')
            .send({ salasana: null });

        expect(response.status).toBe(400);
    });
});

// Testit checkAlennus
describe('checkAlennus', () => {
    it('should return true if user is eligible for a discount', async () => {
        const alennusRyhma = 'Opiskelija';
        getAlennusRyhma.mockResolvedValue(alennusRyhma);

        const response = await request(app)
            .get('/users/1/alennus');

        expect(response.status).toBe(200);
        expect(response.body.isEligible).toBe(true);
    });

    it('should return 404 if no discount group is found', async () => {
        getAlennusRyhma.mockResolvedValue(null);

        const response = await request(app)
            .get('/users/1/alennus');

        expect(response.status).toBe(404);
    });
});
