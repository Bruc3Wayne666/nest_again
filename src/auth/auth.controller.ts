import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "@src/auth/auth.service";
import {CreateUserDto} from "@src/user/dto/create-user.dto";
import {LoginUserDto} from "@src/user/dto/login-user.dto";
import {User} from "@src/user/user.model";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto): Promise<{token: string, user: User}> {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<{token: string, user: User}> {
        return this.authService.login(loginUserDto)
    }
}
