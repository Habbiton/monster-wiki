import { ApiProperty } from '@nestjs/swagger';

export class FindVotesResponseDto {
  @ApiProperty({
    description: 'User who has voted',
    example: '6601cab0ea9a3db66464554a',
  })
  readonly user: string;

  @ApiProperty({
    description: 'Voted monster',
    example: '6601cab0ea9a3db66464554a',
  })
  readonly monster: string;

  @ApiProperty({
    type: String,
    description: 'Date of vote',
    example: '2024-03-25T19:04:16.966Z',
  })
  readonly date: Date;
}

export class FindVotesWithRelationsResponseDto {
  @ApiProperty({
    description: 'User who has voted',
    example: { _id: '6601cab0ea9a3db66464554a', name: 'Bored Mike' },
  })
  readonly user: string;

  @ApiProperty({
    description: 'Voted monster',
    example: {
      _id: '6601ad83521f113a7807ce32',
      name: {
        first: 'Worm',
        last: 'Cold',
        title: 'Mr.',
      },
    },
  })
  readonly monster: string;

  @ApiProperty({
    type: String,
    description: 'Date of vote',
    example: '2024-03-25T19:04:16.966Z',
  })
  readonly date: Date;
}
