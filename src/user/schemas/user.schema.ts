import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export const UserRoles: string[] = ['CEO', 'ADMIN', 'USER'];

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
