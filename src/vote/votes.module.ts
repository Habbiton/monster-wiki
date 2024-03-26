import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteSchema } from './schemas/vote.schema';
import { MonsterSchema } from '../monster/schemas/monster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
    MongooseModule.forFeature([{ name: 'Monster', schema: MonsterSchema }]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
