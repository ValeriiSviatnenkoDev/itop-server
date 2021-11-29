const request = require('supertest');
const app = require('../../index.js');

describe('Update profile Endpoints', () => {
    /* Success Update */
    it('Up update-profile-test [success]', async () => {
        const res = await request(app)
        .put(`/up-profile/:id`)
        .send({
            ProfileId: 8, 
            ProfileName: "Fufu",
            ProfileSurname: "Bubovich",
            ProfileGender: "Male",
            ProfileBd: "11.11.2011",
            ProfileCity: "Minsk"
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('successMsg');
    });

    /* Unsuccess Update */
    it('Up update-profile-test [unsuccess]', async () => {
        const res = await request(app)
        .put('/up-profile/:id')
        .send({
            ProfileId: 98, 
            ProfileName: "Fu",
            ProfileSurname: "wan Hang",
            ProfileGender: "Male",
            ProfileBd: "12.01.1965",
            ProfileCity: "Pekin"
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});