import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Monster, MonsterDocument } from './schemas/monster.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { FindMonstersDto } from './dto/find-monsters.dto';

@Injectable()
export class MonstersService {
  constructor(
    @InjectModel('Monster') private readonly monsterModel: Model<Monster>,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<MonsterDocument> {
    return this.monsterModel.create(createMonsterDto);
  }

  async findAll(): Promise<MonsterDocument[]> {
    return this.monsterModel.find().exec();
  }
  async findAllPaginated(
    findMonstersQueryDto: FindMonstersDto,
    isAdmin: boolean = false,
  ): Promise<PaginationData<MonsterDocument[]>> {
    const pageNumber = findMonstersQueryDto.pageNumber;
    const pageSize = findMonstersQueryDto.pageSize;

    const skip = (pageNumber - 1) * pageSize;
    const count = await this.monsterModel.countDocuments();
    const query = this.monsterModel
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    if (isAdmin) {
      query.select('+secretNotes').select('+password');
    }

    const monsters = await query.exec();

    return {
      meta: { currentPage: pageNumber, pageSize, totalCount: count },
      data: monsters,
    };
  }

  async findById(id: string, isAdmin = false): Promise<MonsterDocument> {
    const query = this.monsterModel.findOne({ _id: id });
    if (isAdmin) {
      query.select('+secretNotes').select('+password');
    }
    return query.exec();
  }

  async update(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<MonsterDocument> {
    return this.monsterModel
      .findOneAndUpdate({ _id: id }, updateMonsterDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.monsterModel.deleteOne({ _id: id }).exec();
  }

  async modifyGold(id: string, goldAmount: number): Promise<MonsterDocument> {
    const monster = await this.monsterModel.findOne({ _id: id }).exec();
    if (!monster) {
      throw new BadRequestException(`Monster with ID: ${id} not found`);
    }
    if (monster.goldBalance + goldAmount < 0) {
      throw new BadRequestException(
        `Monster with ID: ${id} can't have goldBalance < 0`,
      );
    }
    return this.monsterModel
      .findOneAndUpdate(
        { _id: id },
        { goldBalance: monster.goldBalance + goldAmount },
        { new: true },
      )
      .exec();
  }
}
