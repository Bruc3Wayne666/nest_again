import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "@src/user/user.model";
import {Model} from "mongoose";
import {CreateUserDto} from "@src/user/dto/create-user.dto";
import {Post} from "@src/post/post.model";


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async getAll(): Promise<User[]> {
        return this.userModel.find().populate('posts')
    }

    async getOne(id: string): Promise<User> {
        return this.userModel.findById(id)
    }

    async addPost(id: string, post: Post): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, {
            $push: {
                posts: post
            }
        })
    }

    async removePost(id: string, userId: string): Promise<User> {
        try {
            return this.userModel.findByIdAndUpdate(userId, {
                $pull: {
                    posts: {
                        _id: id
                    }
                }
            })
        } catch (e) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email})
    }


    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await new this.userModel(createUserDto).save()
    }

}
