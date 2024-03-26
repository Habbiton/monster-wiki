import { Controller, Get, Post, Body, Req, Delete } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Roles } from '../role/decorators/roles.decorator';
import { Role } from '../role/constants';
import { CreateVoteDto } from './dto/create-vote.dto';
import { RequestWithCurrentUser } from '../common/interfaces/pagination-data.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteEntityDto } from '../common/dto/delete-entity.dto';
import {
  FindVotesResponseDto,
  FindVotesWithRelationsResponseDto,
} from './dto/find-votes.dto';
import { SummaryVoteDto } from './dto/summary-vote.dto';
import { PaginatedFindMonstersResponseDto } from '../monster/dto/find-monsters.dto';

@ApiBearerAuth()
@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Delete()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: DeleteEntityDto,
  })
  @Roles(Role.Admin)
  async clean(): Promise<DeleteEntityDto> {
    return this.votesService.clean();
  }

  @Get('summary')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [SummaryVoteDto],
  })
  @Roles(Role.Admin)
  async getSummary(): Promise<SummaryVoteDto[]> {
    return this.votesService.getSummary();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [FindVotesWithRelationsResponseDto],
  })
  @Roles(Role.Admin)
  async findAll(): Promise<FindVotesWithRelationsResponseDto[]> {
    return this.votesService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: FindVotesResponseDto,
  })
  async create(
    @Req() req: RequestWithCurrentUser,
    @Body() data: CreateVoteDto,
  ): Promise<FindVotesResponseDto> {
    const currentUserId = req.user.sub;
    return this.votesService.create(data.monster, currentUserId);
  }
}
