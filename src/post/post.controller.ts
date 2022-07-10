import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Param,
    Delete,
    Put,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import {PostService} from "@src/post/post.service";
import {CreatePostDto} from "@src/post/dto/create-post.dto";
import {Post as PostItem} from "@src/post/post.model";
import {JwtAuthGuard} from "@src/auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('post')
export class PostController {
    constructor (private postService: PostService){}

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@UploadedFile() file: Express.Multer.File, @Body() createPostDto: CreatePostDto, @Request() {user}): Promise<PostItem> {
        return this.postService.create(file, createPostDto, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: string): Promise<PostItem> {
        return this.postService.getOne(id)
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@UploadedFile() file: Express.Multer.File, @Body() updatePostDto: CreatePostDto, @Param('id') id: string): Promise<PostItem> {
        return this.postService.update(file, updatePostDto, id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string, @Request() {user}): Promise<PostItem> {
        return this.postService.delete(id, user.id)
    }

}
