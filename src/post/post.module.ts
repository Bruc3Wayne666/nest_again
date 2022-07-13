import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "@src/post/post.model";
import {PostService} from "@src/post/post.service";
import {PostController} from "@src/post/post.controller";
import {UserModule} from "@src/user/user.module";
import {JwtService} from "@nestjs/jwt";
import {FileModule} from "@src/file/file.module";

@Module({
    imports: [
        FileModule,
        forwardRef(() => UserModule),
        MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])
    ],
    providers: [PostService, JwtService],
    controllers: [PostController],
    exports: [PostService]
})
export class PostModule {}
