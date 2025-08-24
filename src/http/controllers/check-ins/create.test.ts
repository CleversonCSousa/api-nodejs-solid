import { app } from '@/app';
import { prismaClient } from '@/lib/prisma/prismaClient';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Check-in (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create check-in', async() => {
        
        const { token } = await createAndAuthenticateUser(app);

        const gym = await prismaClient.gym.create({
            data: {
                title: 'TypeScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091
            }
        });

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        ;

        expect(response.statusCode).toEqual(201);
        
    });
});