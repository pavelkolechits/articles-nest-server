import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from 'src/roles/create-role.dto.ts/create-role.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private JwtService: JwtService) { }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)

    }
    async registration(dto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.usersService.createUser({ ...dto, password: hashPassword })
        return this.generateToken(user)
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    private async generateToken(user: User) {
        
        const payload = { email: user.dataValues.email, id: user.dataValues.id, roles: user.dataValues.roles }
        return {
            token: this.JwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email)
        if(!user) {
            throw new UnauthorizedException({ message: 'Неверный email' })
        }
        const passwordEquals = await bcrypt.compare(dto.password, user?.dataValues.password)

        if (passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Неверный пароль' })
    }
}
