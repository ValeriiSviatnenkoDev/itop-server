const request = require('supertest');
const app = require('../../index.js');

describe('Get-all-users Endpoints', () => {
    /* Success Auth */
    it('Get users-test [success]', async () => {
        const res = await request(app)
        .get('/get-users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("users");
    });
});
