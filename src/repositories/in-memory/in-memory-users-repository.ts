import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";

export class InMemoryUsersRepository implements UsersRepository {

    private items: User[] = [];
    
    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email);

        if(!user) {
            return null;
        }

        return user;
    }

    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }


        this.items.push(user);
        
        return user;
    }
}