import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './create-role.dto.ts/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role,
        @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles
    ) { }

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }
    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({
            where: { value }
        });
        return role
    }
    async getUserRoles(userId: number) {
        const rolesId = await this.userRolesRepository.findAll({ where: { userId }, attributes: ['roleId'] });
        const roles = await this.roleRepository.findAll()
        const userRoles = roles.filter((role) => rolesId.some((i) => {
            return i.dataValues.roleId === role.id
        }))
        return userRoles
    }
}
