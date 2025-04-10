import { Injectable, Req } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private roleService: RolesService,
    ) {

    }
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")

        if (!role) {
            throw new Error('role not found')
        }
        await user.$set('roles', [role?.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        })
        return users
    }
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user
    }
}
