import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs";
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private rolesService: RolesService,
        private JwtService: JwtService) { }

    async login(dto: CreateUserDto) {
        const user = (await this.validateUser(dto))
        const userRoles = await this.rolesService.getUserRoles(user.id)
        const payload = { email: user.dataValues.email, id: user.dataValues.id, roles: userRoles }
        const token = await this.generateToken(user)
        return { token, user: payload }

    }
    async registration(dto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(dto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = (await this.usersService.createUser({ ...dto, password: hashPassword }))
        const userRoles = await this.rolesService.getUserRoles(user.id)
        const payload = { email: user.dataValues.email, id: user.dataValues.id, roles: userRoles }
        const token = await this.generateToken(user)

        return { token, user: payload }
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    private async generateToken(user: User) {
        const payload = {email: user.dataValues.email, id: user.dataValues.id}
        return this.JwtService.sign(payload)

    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException({ message: 'Неверный email' })
        }
        const passwordEquals = await bcrypt.compare(dto.password, user?.dataValues.password)

        if (passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Неверный пароль' })
    }
}
