import {BadRequestException, HttpException, HttpStatus, Injectable, Request} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostDocument} from "@src/post/post.model";
import {Model} from "mongoose"
import {CreatePostDto} from "@src/post/dto/create-post.dto";
import {UserService} from "@src/user/user.service";
import {CloudinaryService} from "@src/file/file.service";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private userService: UserService,
        private fileService: CloudinaryService
    ) {
    }

    async create(file: Express.Multer.File, createPostDto: CreatePostDto, author: string): Promise<Post> {
        try {
            let upload
            if (file) {
                upload = await this.fileService.uploadImage(file)
                    .catch(() => {
                        throw new BadRequestException('Invalid file type.')
                    })
            }
            const newPost = await new this.postModel({...createPostDto, author, image_url: upload && upload.secure_url}).save()
            await this.userService.addPost(author, newPost)
            return newPost
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(): Promise<Post[]> {
        try {
            return this.postModel.find().populate('author')
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOne(id: string): Promise<Post> {
        try {
            return this.postModel.findById(id).populate('author')
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(file: Express.Multer.File, updatePostDto: CreatePostDto, id: string): Promise<Post> {
        try {
            let upload
            if (file) {
                upload = await this.fileService.uploadImage(file)
                    .catch(() => {
                        throw new BadRequestException('Invalid file type.')
                    })
            }
            return this.postModel.findByIdAndUpdate(id, {...updatePostDto, image_url: upload && upload.secure_url})
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: string, userId: string): Promise<Post> {
        try {
            await this.userService.removePost(id, userId)
            return this.postModel.findByIdAndDelete(id)
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
