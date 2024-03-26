import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  findAll() {
    return this.userModel.find().exec();
  }

  findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }
}
