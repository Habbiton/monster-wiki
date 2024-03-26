import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Monster } from '../monster/schemas/monster.schema';
import { User } from '../user/schemas/user.schema';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { Vote } from '../vote/schemas/vote.schema';

const USERNAME_REGEX = /\s+/g;

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('Monster') private readonly monsterModel: Model<Monster>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Vote') private readonly voteModel: Model<Vote>,
    private readonly bcryptService: BcryptService,
  ) {}

  async seedAll() {
    await this.seedMonsters();
    await this.seedUsers();
    await this.seedVotes();
  }

  async seedMonsters() {
    const monstersData = [
      {
        name: {
          first: 'Worm',
          last: 'Cold',
          title: 'Mr.',
        },
        gender: 'female',
        description: 'Cold and cool',
        nationality: ['SP'],
        image:
          'https://static.wikia.nocookie.net/scoobydoo/images/c/c8/Snow_monster_%28Be_Cold%2C_Scooby-Doo%21%29.png',
        goldBalance: 0,
        speed: 4.6,
        health: 126,
        secretNotes: 'Found on a dark corner',
        password: 'wannaHug',
      },
      {
        name: {
          first: 'Mighty',
          last: 'Fury',
          title: 'Ms.',
        },
        gender: 'male',
        description: 'Powerful and fierce',
        nationality: ['SP', 'US'],
        image:
          'https://cdn2.myminifactory.com/assets/object-assets/624f1f6304c47/images/720X720-store-thumbnail-ancienttempleguardian.jpg',
        goldBalance: 0,
        speed: 8.9,
        health: 195,
        secretNotes: 'Guardian of the ancient temple',
        password: 'roarRoar',
      },
      {
        name: {
          first: 'Shadow',
          last: 'Fang',
          title: 'Ms.',
        },
        gender: 'male',
        description: 'Mysterious and elusive',
        nationality: ['DE'],
        image:
          'https://static.wikia.nocookie.net/villains/images/3/33/Shadowfang_shushu.jpg',
        goldBalance: 0,
        speed: 6.3,
        health: 150,
        secretNotes: 'Haunts the haunted forest',
        password: 'hideInDarkness',
      },
      {
        name: {
          first: 'Flame',
          last: 'Blaze',
          title: 'Mr.',
        },
        gender: 'female',
        description: 'Fiery and intense',
        nationality: ['SP', 'DE'],
        image:
          'https://static.wikia.nocookie.net/monster/images/e/eb/Blaze.jpg',
        goldBalance: 0,
        speed: 7.2,
        health: 170,
        secretNotes: 'Seen near the volcanic mountains',
        password: 'burnBright',
      },
      {
        name: {
          first: 'Thunder',
          last: 'Storm',
          title: 'Mr.',
        },
        gender: 'male',
        description: 'Electrifying and powerful',
        nationality: ['SP'],
        image:
          'https://static.wikia.nocookie.net/witcherrp/images/0/06/Gosha-babko-air-elemental-01_%282%29.jpg',
        goldBalance: 0,
        speed: 5.8,
        health: 180,
        secretNotes: 'Ruler of the skies',
        password: 'thunderStrike',
      },
      {
        name: {
          first: 'Mystic',
          last: 'Whisper',
          title: 'Ms.',
        },
        gender: 'female',
        description: 'Enigmatic and mysterious',
        nationality: ['SP', 'US'],
        image:
          'https://static.wikia.nocookie.net/monster-legends-competitive/images/f/f7/DielabRecolor.png',
        goldBalance: 0,
        speed: 6.5,
        health: 160,
        secretNotes: 'Seen in the depths of the enchanted forest',
        password: 'whisperSecrets',
      },
      {
        name: {
          first: 'Iron',
          last: 'Claw',
          title: 'Mr.',
        },
        gender: 'male',
        description: 'Strong and unyielding',
        nationality: ['US'],
        image:
          'https://static.wikia.nocookie.net/battle-cats/images/4/43/E_265.png',
        goldBalance: 0,
        speed: 6.0,
        health: 190,
        secretNotes: 'Protector of the ancient ruins',
        password: 'steelResolve',
      },
      {
        name: {
          first: 'Dark',
          last: 'Shade',
          title: 'Mr.',
        },
        gender: 'male',
        description: 'Sinister and shadowy',
        nationality: ['SP'],
        image:
          'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/creepy-monster-01-dark-shadows-matthias-hauser.jpg',
        goldBalance: 0,
        speed: 6.7,
        health: 175,
        secretNotes: 'Lurks in the depths of the night',
        password: 'embraceDarkness',
      },
      {
        name: {
          first: 'Crystal',
          last: 'Gaze',
          title: 'Ms.',
        },
        gender: 'female',
        description: 'Ethereal and mesmerizing',
        nationality: ['SP'],
        image:
          'https://media.mkpcdn.com/prod/1000x/76c7b4acbe0e26ae0b21a08c52e17dd2_577770.jpg',
        goldBalance: 0,
        speed: 6.9,
        health: 185,
        secretNotes: 'Guardian of the crystal caves',
        password: 'gazeIntoFuture',
      },
      {
        name: {
          first: 'Frost',
          last: 'Bite',
          title: 'Mr.',
        },
        gender: 'male',
        description: 'Icy and chilling',
        nationality: ['DE', 'SP'],
        image:
          'https://static.wikia.nocookie.net/monsterlegends/images/e/ee/Frostbite.png',
        goldBalance: 0,
        speed: 5.5,
        health: 165,
        secretNotes: 'Freezes everything in his path',
        password: 'frozenTundra',
      },
    ];

    await this.monsterModel.deleteMany();
    await this.monsterModel.insertMany(monstersData);
  }

  async seedUsers() {
    const usersData: Partial<User>[] = [
      {
        name: 'Bored Mike',
        role: 'ADMIN',
        password: 'imisssullivan',
      },
      {
        name: 'Entrepreneur Carlos',
        role: 'CEO',
        password: 'iswearimnotsatoshi',
      },
      {
        name: 'Happy Franky',
        role: 'USER',
        password: 'suuuuupeeeeer',
      },
      {
        name: 'Strange Tommy',
        role: 'USER',
        password: 'nothilfiger',
      },
      {
        name: 'Clean Mary',
        role: 'USER',
        password: 'marygoround',
      },
      {
        name: 'Handsome Jerry',
        role: 'USER',
        password: 'idontmisstom',
      },
      {
        name: 'Terrific Emma',
        role: 'USER',
        password: 'bestMattress',
      },
    ];
    for await (const userData of usersData) {
      userData.password = await this.bcryptService.hashPassword(
        userData.password,
      );
      userData.username = userData.name
        .toLowerCase()
        .replace(USERNAME_REGEX, '-');
    }

    await this.userModel.deleteMany();
    await this.userModel.insertMany(usersData);
  }

  async seedVotes() {
    await this.voteModel.deleteMany();
  }
}
