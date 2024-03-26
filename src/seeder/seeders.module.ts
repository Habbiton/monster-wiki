import { Module } from '@nestjs/common';

import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonsterSchema } from '../monster/schemas/monster.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { VoteSchema } from '../vote/schemas/vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Monster', schema: MonsterSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]),
  ],
  providers: [SeederService, BcryptService],
  exports: [SeederService],
})
export class SeedersModule {}
