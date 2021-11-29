const request = require('supertest');
const app = require('../../index.js');

describe('User-register Endpoints', () => {
    it('Reg register-test [success]', async () => {
        const res = await request(app)
          .post('/user-register')
          .send({
            UserName: "Usert31est",
            UserPassword: "12345678", 
            UserEmail: "user1222@test.com", 
            UserRole: "User"
          });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
      });

    it('Reg register-test email [unsuccess]', async () => {
        const res = await request(app)
        .post('/user-register')
        .send({
            UserName: "nusho",
            UserPassword: "sho54321", 
            UserEmail: "sho@gmail.com", 
            UserRole: "User"
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });

    it('Reg register-test username [unsuccess]', async () => {
        const res = await request(app)
          .post('/user-register')
          .send({
            UserName: "shopopalo",
            UserPassword: "sho54321", 
            UserEmail: "nusho@outlook.com", 
            UserRole: "User"
          });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    });
});