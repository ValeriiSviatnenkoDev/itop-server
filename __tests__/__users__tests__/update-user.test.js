const request = require('supertest');
const app = require('../../index.js');

describe('Update user Endpoints', () => {
    /* Success Update */
    it('Up update-user-test [success]', async () => {
        const res = await request(app)
        .put(`/up-user/:id`)
        .send({
            UserId: 49,
            UserName: 'mikokolka',
            UserRole: 'Admin',
            UserEmail: 'mik@gmail.com'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('successMsg');
    });

    /* Unsuccess Update */
    it('Up update-user-test [unsuccess]', async () => {
        const res = await request(app)
        .put('/up-user/:id')
        .send({
            UserId: 101,
            UserName: 'mikolkach',
            UserRole: 'Admin',
            UserEmail: 'mik@gmail.com'
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});