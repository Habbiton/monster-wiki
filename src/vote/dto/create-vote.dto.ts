import { IsDefined, IsString } from 'class-validator';
import { IsMongoId } from '../../common/decorators/object-id.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty({
    type: String,
    description: 'Monster to vote',
    example: '6601cab0ea9a3db66464554a',
  })
  @IsDefined()
  @IsString()
  @IsMongoId()
  readonly monster: string;
}
