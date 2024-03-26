import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveGoldDto {
  @ApiProperty({
    type: Number,
    description: 'Amount of gold to be removed',
    example: 5,
  })
  @IsInt()
  @IsDefined()
  @Min(0)
  readonly goldAmount: number;
}
