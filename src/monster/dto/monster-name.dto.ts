import { IsDefined, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MonsterNameDto {
  @ApiProperty({
    type: String,
    description: 'Firstname of the monster',
    example: 'Electric',
  })
  @IsNotEmpty()
  @IsDefined()
  readonly first: string;

  @ApiProperty({
    type: String,
    description: 'Lastname of the monster',
    example: 'Bolt',
  })
  @IsNotEmpty()
  @IsDefined()
  readonly last: string;

  @ApiProperty({
    type: String,
    description: 'Title of the monster',
    example: 'Mr.',
  })
  @IsNotEmpty()
  @IsDefined()
  readonly title: string;
}
