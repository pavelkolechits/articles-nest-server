import { Role } from "src/roles/roles.model";

export class CreateTokenDto{
    id: number;
    email: string;
    roles: Array<Role>
}