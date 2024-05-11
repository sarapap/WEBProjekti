import request from 'supertest';
import app from '../src/app';
import {
    listAllTuote,
    findTuoteById,
    findTuoteByTyyppeId,
    findTuoteByname,
    findLastTuoteId,
    addTuote,
    removeTuoteById,
    updateTuote,
    findTuoteByKuva
} from '../src/api/models/tuote-model.js';

// Mockataan tarvittavat toiminnot
jest.mock('../models/tuote-model.js');

describe('TuoteController', () => {
    describe('GET /tuote', () => {
        it('should return all products', async () => {
            const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            listAllTuote.mockResolvedValue(mockProducts);

            const response = await request(app).get('/tuote');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        it('should return 404 if no products are found', async () => {
            listAllTuote.mockResolvedValue(null);

            const response = await request(app).get('/tuote');

            expect(response.status).toBe(404);
        });
    });


    describe('DELETE /tuote/:tuote_id', () => {
        it('should delete a product by id', async () => {
            const productId = 1;
            removeTuoteById.mockResolvedValue({ success: true });

            const response = await request(app).delete(`/tuote/${productId}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should return 400 if deletion fails', async () => {
            const productId = 1;
            removeTuoteById.mockResolvedValue(null);

            const response = await request(app).delete(`/tuote/${productId}`);

            expect(response.status).toBe(400);
        });
    });

});
