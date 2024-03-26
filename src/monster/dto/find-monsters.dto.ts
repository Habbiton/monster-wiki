import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MonsterNameDto } from './monster-name.dto';
import {
  MonsterGenders,
  MonsterNationalities,
} from '../schemas/monster.schema';
import { Type } from 'class-transformer';

export class FindMonstersDto {
  @ApiProperty({ description: 'Requested page number', example: 2 })
  @Min(1)
  @IsInt()
  @IsDefined()
  @Type(() => Number)
  readonly pageNumber: number;

  @ApiProperty({ description: 'Requested page size', example: 5 })
  @Min(1)
  @IsInt()
  @IsDefined()
  @Type(() => Number)
  readonly pageSize: number;
}

export class FindMonstersResponseDto {
  @ApiProperty({
    type: MonsterNameDto,
    description: 'Name of the monster',
    example: { first: 'Electric', last: 'Bolt', title: 'Mr.' },
  })
  @Type(() => MonsterNameDto)
  readonly name: MonsterNameDto;

  @ApiProperty({
    enum: MonsterGenders,
    description: 'Gender of the monster',
    example: 'male',
  })
  readonly gender: string;

  @ApiProperty({
    description: 'Description of the monster',
    example: 'A scary monster with sharp teeth',
  })
  readonly description: string;

  @ApiProperty({
    type: [String],
    enum: MonsterNationalities,
    description: 'Nationalities of the monster',
    example: ['US', 'SP'],
  })
  readonly nationality: string[];

  @ApiProperty({
    description: 'Image of the monster',
    example: 'http://example.com/monster.jpg',
  })
  readonly image: string;

  @ApiProperty({ description: 'Gold balance of the monster', example: 0 })
  readonly goldBalance: number;

  @ApiProperty({ description: 'Speed of the monster', example: 10 })
  readonly speed: number;

  @ApiProperty({ description: 'Health of the monster', example: 150 })
  readonly health: number;

  @ApiProperty({
    description: 'Secret notes of the monster (only ADMIN)',
    example: 'This monster is afraid of water',
    required: false,
  })
  readonly secretNotes: string;

  @ApiProperty({
    description: 'Password of the monster (only ADMIN)',
    example: 'abc123',
    required: false,
  })
  readonly password: string;
}

export class PaginationMetaDto {
  @ApiProperty({
    type: Number,
    description: 'Current page of pagination',
    example: 2,
  })
  readonly currentPage: number;

  @ApiProperty({
    type: Number,
    description: 'Page size of pagination',
    example: 5,
  })
  readonly pageSize: number;

  @ApiProperty({
    type: Number,
    description: 'Total element count of model',
    example: 25,
  })
  readonly totalCount: number;
}

export class PaginatedFindMonstersResponseDto {
  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Meta information about pagination',
  })
  readonly meta: PaginationMetaDto;

  @ApiProperty({
    description: 'Array of model data',
    type: [FindMonstersResponseDto],
  })
  readonly data: FindMonstersResponseDto[];
}
