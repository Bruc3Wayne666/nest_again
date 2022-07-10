import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "@src/user/user.model";
import mongoose from "mongoose";


export type PostDocument = Post & Document


@Schema()
export class Post {

    @Prop({required: true})
    title: string

    @Prop({required: true})
    text: string

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User

    @Prop()
    image_url: string
}

export const PostSchema = SchemaFactory.createForClass(Post)