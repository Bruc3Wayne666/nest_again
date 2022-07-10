import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from "@src/auth/auth.service";
import {UserModule} from "@src/user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'bebra',
            signOptions: {expiresIn: '1h'}
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {
}
