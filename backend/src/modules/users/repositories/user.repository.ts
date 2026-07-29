import { RegisterUserDto } from "@/modules/auth/dtos/register.dto";
import { prisma } from "@database/prisma"; 

export class UserRepository { 
    
    public async create(userData: RegisterUserDto){
        return await prisma.user.create({
            data: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                passwordHash: userData.password,
            }
        });
    }

    public async findByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }    

    public async findById(userId: string){
        return await prisma.user.findUnique({ where: { id: userId } });
    }
}