const request = require('supertest');
const app = require('../../index.js');

describe('Get profile by id Endpoints', () => {
    it('Get profile-by-id-test [success]', async () => {
        const res = await request(app)
        .get(`/get-profile/5`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('successMsg');
    });

    it('Get profile-by-id-test [unsuccess]', async () => {
        const res = await request(app)
        .get(`/get-profile/100`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message');
    });
});