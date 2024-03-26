import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddGoldDto {
  @ApiProperty({
    type: Number,
    description: 'Amount of gold to be added (ONLY CEO)',
    example: 5,
  })
  @IsInt()
  @IsDefined()
  @Min(0)
  readonly goldAmount: number;
}
