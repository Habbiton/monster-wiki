import { PartialType } from '@nestjs/mapped-types';
import { CreateMonsterDto } from './create-monster.dto';
import {
  ArrayNotEmpty,
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MonsterNameDto } from './monster-name.dto';
import {
  MonsterGenders,
  MonsterNationalities,
} from '../schemas/monster.schema';

export class UpdateMonsterDto extends PartialType(CreateMonsterDto) {
  @ApiProperty({
    type: MonsterNameDto,
    description: 'Name of the monster',
  })
  @IsNotEmpty()
  @IsDefined()
  @ValidateNested()
  @Type(() => MonsterNameDto)
  readonly name: MonsterNameDto;

  @ApiProperty({
    enum: MonsterGenders,
    description: 'Gender of the monster',
    example: 'male',
  })
  @IsIn(MonsterGenders)
  @IsDefined()
  readonly gender: string;

  @ApiProperty({
    description: 'Description of the monster',
    example: 'A scary monster with sharp teeth',
  })
  @IsNotEmpty()
  @IsDefined()
  readonly description: string;

  @ApiProperty({
    type: [String],
    enum: MonsterNationalities,
    description: 'Nationalities of the monster',
    example: ['US', 'SP'],
  })
  @IsIn(MonsterNationalities, { each: true })
  @IsDefined()
  @ArrayNotEmpty()
  readonly nationality: string[];

  @ApiProperty({
    description: 'Image of the monster',
    example: 'http://example.com/monster.jpg',
  })
  @IsNotEmpty()
  @IsDefined()
  @IsUrl()
  readonly image: string;

  @ApiProperty({ description: 'Speed of the monster', example: 10 })
  @IsNumber()
  @IsDefined()
  @Min(0)
  readonly speed: number;

  @ApiProperty({ description: 'Health of the monster', example: 150 })
  @IsInt()
  @IsDefined()
  @Min(0)
  readonly health: number;

  @ApiProperty({
    description: 'Secret notes of the monster',
    example: 'This monster is afraid of water',
  })
  @IsNotEmpty()
  @IsDefined()
  readonly secretNotes: string;

  @ApiProperty({ description: 'Password of the monster', example: 'abc123' })
  @IsNotEmpty()
  @IsDefined()
  readonly password: string;
}
