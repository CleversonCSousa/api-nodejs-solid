import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to register', async() => {
        const response = await request(app.server)
        .post('/users')
        .send({
            name: 'Joao Pedro',
            email: 'joaopedro2@gmail.com',
            password: '12345678'
        })
        ;

        expect(response.statusCode).toEqual(201);
    });
});