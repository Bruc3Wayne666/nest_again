import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {UserService} from "@src/user/user.service";
import {User} from "@src/user/user.model";
import {Post} from "@src/post/post.model";
import {PostService} from "@src/post/post.service";
import {JwtAuthGuard} from "@src/auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private postService: PostService
    ) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User>{
        return this.userService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/posts')
    getPosts(@Param('id') id: string): Promise<Post[]>{
        return this.postService.getByUser(id)
    }

}
