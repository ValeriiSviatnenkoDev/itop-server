const request = require('supertest');
const app = require('../../index.js');

describe('Delete profile Endpoints', () => {
    /* Success Del */
    it('Del delete-profile-test [success]', async () => {
        const res = await request(app)
        .delete(`/del-profile/:id`)
        .send({
            ProfileId: 16
        })
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('successMsg');
    });

    /* Unsuccess Del */
    it('Del delete-profile-test [unsuccess]', async () => {
        const res = await request(app)
        .delete(`/del-profile/:id`)
        .send({
            ProfileId: 876
        })
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});