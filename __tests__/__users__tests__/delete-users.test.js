const request = require('supertest');
const app = require('../../index.js');

describe('Delete user Endpoints', () => {
    /* Success Del */
    it('Del delete-user-test [success]', async () => {
        const res = await request(app)
        .delete(`/del-user/:id`)
        .send({
            UserId: 75
        })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('successMsg');
    });

    /* Unsuccess Del */

    it('Del delete-user-test [unsuccess]', async () => {
        const res = await request(app)
        .delete(`/del-user/:id`)
        .send({
            UserId: 212
        })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});