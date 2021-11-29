const request = require('supertest');
const app = require('../../index.js');

describe('Profile create Endpoints', () => {
    it('Create profile-create-test [success]', async () => {
        const res = await request(app)
        .post('/profile-create')
        .send({
            ProfileUserId: 49, 
            ProfileName: "Ragnar", 
            ProfileSurname: "Lothdbrok", 
            ProfileGender: "Male", 
            ProfileBd: "10.05.958", 
            ProfileCity: "Norway"
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('successMsg');
      });

    it('Create profile-create-test [unsuccess]', async () => {
        const res = await request(app)
        .post('/profile-create')
        .send({
            ProfileUserId: 30, 
            ProfileName: "Lagerta", 
            ProfileSurname: "Lothdbrok", 
            ProfileGender: "Female", 
            ProfileBd: "09.04.961", 
            ProfileCity: "Norway"
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});