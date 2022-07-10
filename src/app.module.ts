import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      MongooseModule.forRoot(process.env.MONGO_URL),
      UserModule,
      PostModule,
      AuthModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
