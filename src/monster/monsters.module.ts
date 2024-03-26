import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MonsterSchema } from './schemas/monster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Monster', schema: MonsterSchema }]),
  ],
  controllers: [MonstersController],
  providers: [MonstersService],
})
export class MonstersModule {}
