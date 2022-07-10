import {Injectable, Request} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Post, PostDocument} from "@src/post/post.model";
import {Model} from "mongoose"
import {CreatePostDto} from "@src/post/dto/create-post.dto";
import {UserService} from "@src/user/user.service";

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private userService: UserService
    ) {}

    async create(createPostDto: CreatePostDto, author: string): Promise<Post> {
        const newPost = await new this.postModel({...createPostDto, author}).save()
        await this.userService.addPost(author, newPost)
        return newPost
    }

    async getOne(id: string): Promise<Post> {
        return this.postModel.findById(id)
    }

    async update(updatePostDto: CreatePostDto, id: string): Promise<Post> {
        return this.postModel.findByIdAndUpdate(id, updatePostDto)
    }

    async delete(id: string, userId: string): Promise<Post> {
        await this.userService.removePost(id, userId)
        return this.postModel.findByIdAndDelete(id)
    }
}
