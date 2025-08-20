import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Profile (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to get user profile', async() => {
        
        await request(app.server)
            .post('/users')
            .send({
                name: 'Joao Pedro',
                email: 'joaopedro@gmail.com',
                password: '12345678'
            })
        ;
        
        const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            name: 'Joao Pedro',
            email: 'joaopedro@gmail.com',
            password: '12345678'
        })
        ;

        const { token } = authResponse.body;

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
        ;

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'joaopedro@gmail.com'
        }));
    });
});