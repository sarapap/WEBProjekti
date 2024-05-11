import request from 'supertest';
import app from '../src/app.js';
import { addUser, findUserByUsername, removeUser } from '../../src/api/models/user-model.js';

describe('User Management End-to-End Tests', () => {
    let testUser;

    beforeAll(async () => {
        const userData = {
            etunimi: 'Testi',
            sukunimi: 'Käyttäjä',
            tunnus: 'testikayttaja',
            salasana: 'salasana123',
            email: 'testi@example.com',
            puhelin: '123456789',
        };
        testUser = await addUser(userData);
    });

    afterAll(async () => {
        if (testUser) {
            await removeUser(testUser.id);
        }
    });

    it('should create a new user', async () => {
        const newUser = {
            etunimi: 'Uusi',
            sukunimi: 'Käyttäjä',
            tunnus: 'uusikayttaja',
            salasana: 'salasana123',
            email: 'uusi@example.com',
            puhelin: '987654321',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
    });

    it('should retrieve a user by username', async () => {
        const response = await request(app)
            .get(`/users/username/${testUser.tunnus}`)
            .expect(200);

        expect(response.body.tunnus).toBe(testUser.tunnus);
        expect(response.body.id).toBe(testUser.id);
    });

    it('should update user information', async () => {
        const updatedUserInfo = {
            etunimi: 'Päivitetty',
            sukunimi: 'Käyttäjä',
            email: 'paivitetty@example.com',
        };

        const response = await request(app)
            .put(`/users/${testUser.id}`)
            .send(updatedUserInfo)
            .expect(200);

        expect(response.body.etunimi).toBe(updatedUserInfo.etunimi);
        expect(response.body.email).toBe(updatedUserInfo.email);
    });

    it('should delete a user', async () => {
        const response = await request(app)
            .delete(`/users/${testUser.id}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it('should not retrieve a deleted user', async () => {
        const response = await request(app)
            .get(`/users/${testUser.id}`)
            .expect(404);

        expect(response.body.error).toBe('Käyttäjää ei löydy.');
    });
});
