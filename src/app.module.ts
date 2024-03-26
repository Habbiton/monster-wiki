import { InternalServerErrorException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersModule } from './monster/monsters.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { VotesModule } from './vote/votes.module';
import { SeederService } from './seeder/seeder.service';
import { SeedersModule } from './seeder/seeders.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    AuthModule,
    MonstersModule,
    UsersModule,
    VotesModule,
    SeedersModule,
  ],
})
export class AppModule {
  constructor(private readonly seederService: SeederService) {
    // System created only for tech test. SHOULD NOT BE USED ON PRODUCTION
    if (process.env.ALLOW_DB_SEED === 'true') {
      this.seederService
        .seedAll()
        .then(() => {
          console.log('DB seeded successfully');
        })
        .catch((e) => {
          throw new InternalServerErrorException(e);
        });
    }
  }
}
