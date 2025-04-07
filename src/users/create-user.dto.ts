export class CreateUserDto {
    readonly email: string
    readonly password: string
}

export class ReturnUserDto {
    id: number;
    email: string;
}