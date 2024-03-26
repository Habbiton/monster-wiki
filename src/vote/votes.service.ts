import { BadRequestException, Injectable } from '@nestjs/common';
import { Vote, VoteDocument } from './schemas/vote.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Monster } from '../monster/schemas/monster.schema';
import { DeleteResult } from 'mongodb';

@Injectable()
export class VotesService {
  constructor(
    @InjectModel('Vote') private readonly voteModel: Model<Vote>,
    @InjectModel('Monster') private readonly monsterModel: Model<Monster>,
  ) {}

  async create(monster: string, user: string): Promise<VoteDocument> {
    const userHasAlreadyVoted = await this.voteModel.findOne({ user });
    if (userHasAlreadyVoted) {
      throw new BadRequestException('User has already voted');
    }
    const monsterExists = await this.monsterModel.exists({ _id: monster });
    if (!monsterExists) {
      throw new BadRequestException("Monster doesn't exist");
    }
    return this.voteModel.create({ monster, user });
  }

  async findAll(): Promise<VoteDocument[]> {
    return this.voteModel
      .find()
      .populate('monster', 'name')
      .populate('user', 'name')
      .exec();
  }

  async getSummary(): Promise<VoteSummaryInterface[]> {
    return this.voteModel
      .aggregate([
        { $group: { _id: '$monster', count: { $sum: 1 } } },
        {
          $lookup: {
            from: 'monsters',
            localField: '_id',
            foreignField: '_id',
            as: 'monster',
          },
        },
        {
          $project: {
            monster: {
              _id: '$_id',
              name: { $arrayElemAt: ['$monster.name', 0] },
            },
            count: 1,
            _id: 0,
          },
        },
      ])
      .exec();
  }

  async clean(): Promise<DeleteResult> {
    return this.voteModel.deleteMany().exec();
  }
}
