import { app } from '@/app';
import { prismaClient } from '@/lib/prisma/prismaClient';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Validate Check-in (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to validate check-in', async() => {
        
        const { token } = await createAndAuthenticateUser(app);

        const user = await prismaClient.user.findFirstOrThrow();

        const gym = await prismaClient.gym.create({
            data: {
                title: 'TypeScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091
            }
        });

        let checkIn = await prismaClient.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
         });

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()
        ;

        expect(response.statusCode).toEqual(204);
        
        checkIn = await prismaClient.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id
            }
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));

    });
});