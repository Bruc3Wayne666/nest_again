import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://airat:lelkek2004@nodecluster.fimc0.mongodb.net/?retryWrites=true&w=majority'),
      UserModule,
      PostModule,
      AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
