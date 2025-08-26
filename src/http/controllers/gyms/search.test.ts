import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search Gyms (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to search gyms by title', async() => {
        
        const { token } = await createAndAuthenticateUser(app, 'ADMIN');

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Any thing',
                phone: '2288888888',
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        ;

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Any thing',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        ;

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'TypeScript'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        ;

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'TypeScript Gym'
            })
        ]);
    });
});