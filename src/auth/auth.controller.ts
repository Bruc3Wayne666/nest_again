import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "@src/auth/auth.service";
import {CreateUserDto} from "@src/user/dto/create-user.dto";
import {User} from "@src/user/user.model";
import {LoginUserDto} from "@src/user/dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<string> {
        return this.authService.login(loginUserDto)
    }
}
