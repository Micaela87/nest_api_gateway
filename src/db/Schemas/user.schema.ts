import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserDTO } from '../DTOs/UserDTOs/UserDTO';

export type UserDocument = HydratedDocument<UserDTO>;

@Schema()
export class User {

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Date, default: new Date() })
    dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);