import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import * as jwt from "jsonwebtoken"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    // через сервис не получается верифицировать токен

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const [bearer, token] = authHeader.split(' ')


            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'Non authorized'})

            req.user = jwt.verify(token, 'bebra')
            return true
        } catch (e) {
            throw new UnauthorizedException({message: 'Non authorized'})
        }
    }
}
