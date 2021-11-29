const request = require('supertest');
const app = require('../../index.js');

describe('Get user by id Endpoints', () => {
    /* Success Auth */
    it('Get user-by-id-test [success]', async () => {
        const res = await request(app)
        .get(`/get-users/28`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('successMsg');
    });

    it('Get user-by-id-test [unsuccess]', async () => {
        const res = await request(app)
        .get(`/get-users/218`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message');
    });
});