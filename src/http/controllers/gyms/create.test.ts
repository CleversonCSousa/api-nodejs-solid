import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create gym', async() => {
        
        const { token } = await createAndAuthenticateUser(app);

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send()
        ;

        expect(response.statusCode).toEqual(200);
        expect(response.body.user).toEqual(expect.objectContaining({
            email: 'joaopedro@gmail.com'
        }));
    });
});