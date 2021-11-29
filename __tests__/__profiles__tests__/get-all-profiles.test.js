const request = require('supertest');
const app = require('../../index.js');

describe('Profile create Endpoints', () => {
    it('Get profiles-test [success]', async () => {
        const res = await request(app)
        .get('/get-profiles')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("profiles");
    });
});