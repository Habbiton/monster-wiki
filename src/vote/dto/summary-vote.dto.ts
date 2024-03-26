import { ApiProperty } from '@nestjs/swagger';

export class SummaryVoteDto {
  @ApiProperty({
    description: 'Number of votes',
    example: 4,
  })
  count: number;

  @ApiProperty({
    description: 'Voted monster',
    example: {
      _id: '6601ad83521f113a7807ce32',
      name: [
        {
          first: 'Worm',
          last: 'Cold',
          title: 'Mr.',
        },
      ],
    },
  })
  readonly monster: VoteSummaryMonsterInterface[];
}
