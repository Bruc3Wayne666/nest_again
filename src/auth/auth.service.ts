import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "@src/user/dto/create-user.dto";
import {UserService} from "@src/user/user.service";
import * as bcrypt from "bcryptjs"
import {User, UserDocument} from "@src/user/user.model";
import {LoginUserDto} from "@src/user/dto/login-user.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<string> {
        const candidate = await this.userService.getByEmail(createUserDto.email)
        if (candidate) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        const hashedPassword = await bcrypt.hash(createUserDto.password, 2)
        const user = await this.userService.createUser({...createUserDto, password: hashedPassword})
        return this.generateToken(user)
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const user = await this.validateLogin(loginUserDto)
        return this.generateToken(user)
    }

    private async generateToken(user: User): Promise<string> {
        return this.jwtService.sign({
            email: user.email,
            id: user._id,
            username: user.username
        })
    }

    private async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this.userService.getByEmail(loginUserDto.email)
        const isPasswordMatched = await bcrypt.compare(loginUserDto.password, user.password)
        if (user && isPasswordMatched) return user
        throw new UnauthorizedException({message: 'Wrong credentials'})
    }
}
