import request from 'supertest';
import app from '../server';

describe('Not Found Handler', () => {
    it('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/unknown-route');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'Not Found');
    });
});
