import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "@src/user/user.model";
import {Post, PostSchema} from "@src/post/post.model";
import {PostService} from "@src/post/post.service";
import {PostModule} from "@src/post/post.module";
import {CloudinaryService} from "@src/file/file.service";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: Post.name, schema: PostSchema}
        ]),
        forwardRef(() => PostModule)
    ],
    controllers: [UserController],
    providers: [
        UserService,
        PostService,
        CloudinaryService,
        JwtService
    ],
    exports: [UserService]
})
export class UserModule {}
