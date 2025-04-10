import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        try {
            const authHeader = req.headers.authorization

            if (authHeader) {
                const bearer = authHeader.split(' ')[0]
                const token = authHeader.split(' ')[1]

                if (bearer !== 'Bearer' || !token) {
                    throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
                }

                this.jwtService.verify(token)
                return true

            } else {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

        } catch (error) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
        }
    }
}