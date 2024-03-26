import { ApiProperty } from '@nestjs/swagger';

export class DeleteEntityDto {
  @ApiProperty({
    type: Boolean,
    description: 'Confirmation of delete was success',
  })
  readonly acknowledged: boolean;

  @ApiProperty({
    type: Number,
    description: 'Count of deleted entities',
  })
  readonly deletedCount: number;
}
