import {Body, Controller, Post, UseGuards, Request, Get, Param, Delete, Put} from '@nestjs/common';
import {PostService} from "@src/post/post.service";
import {CreatePostDto} from "@src/post/dto/create-post.dto";
import {Post as PostItem} from "@src/post/post.model";
import {JwtAuthGuard} from "@src/auth/jwt-auth.guard";

@Controller('post')
export class PostController {
    constructor (private postService: PostService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto, @Request() {user}): Promise<PostItem> {
        return this.postService.create(createPostDto, user.id)
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<PostItem> {
        return this.postService.getOne(id)
    }

    @Put(':id')
    update(@Body() updatePostDto: CreatePostDto, @Param('id') id: string): Promise<PostItem> {
        return this.postService.update(updatePostDto, id)
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Request() {user}): Promise<PostItem> {
        return this.postService.delete(id, user.id)
    }
}
