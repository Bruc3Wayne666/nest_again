import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Post} from "@src/post/post.model";


export type UserDocument = User & Document

@Schema()
export class User {

    _id: mongoose.Schema.Types.ObjectId

    @Prop({unique: true, required: true})
    username: string

    @Prop({unique: true, required: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({required: true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    posts: Post[]

}

export const UserSchema = SchemaFactory.createForClass(User)