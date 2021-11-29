const request = require('supertest');
const app = require('../../index.js');

describe('User-login Endpoints', () => {
    /* Success Auth */
    it('Auth login-test [success]', async () => {
        const res = await request(app)
        .post('/user-login')
        .send({
            UserEmail: 'sho@gmail.com',
            UserPassword: 'sho54321',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    });

    /* Unsuccess Auth */
    it('Auth login-test password [unsuccess]', async () => {
        const res = await request(app)
        .post('/user-login')
        .send({
            UserEmail: 'sho@gmail.com',
            UserPassword: 'ssho54321',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

    it('Auth login-test email [unsuccess]', async () => {
        const res = await request(app)
        .post('/user-login')
        .send({
            UserEmail: 'shosh@gmail.com',
            UserPassword: 'sho54321',
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});