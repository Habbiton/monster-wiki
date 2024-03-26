import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { RemoveGoldDto } from './dto/remove-gold.dto';
import { Roles } from '../role/decorators/roles.decorator';
import { Role } from '../role/constants';
import { RequestWithCurrentUser } from '../common/interfaces/pagination-data.interface';
import {
  FindMonstersDto,
  FindMonstersResponseDto,
  PaginatedFindMonstersResponseDto,
} from './dto/find-monsters.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteEntityDto } from '../common/dto/delete-entity.dto';
import { AddGoldDto } from './dto/add-gold.dto';
import { SignInAuthResponseDto } from '../auth/dto/sign-in-auth.dto';

@ApiBearerAuth()
@ApiTags('Monsters')
@Controller('monsters')
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'OK', type: CreateMonsterDto })
  @Roles(Role.Admin)
  async create(
    @Body() createMonsterDto: CreateMonsterDto,
  ): Promise<CreateMonsterDto> {
    return this.monstersService.create(createMonsterDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: PaginatedFindMonstersResponseDto,
  })
  async findAll(
    @Query() query: FindMonstersDto,
    @Req() { isAdmin }: RequestWithCurrentUser,
  ): Promise<PaginatedFindMonstersResponseDto> {
    return this.monstersService.findAllPaginated(query, isAdmin);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: FindMonstersResponseDto,
  })
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateMonsterDto: UpdateMonsterDto,
  ): Promise<FindMonstersResponseDto> {
    return this.monstersService.update(id, updateMonsterDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'OK', type: DeleteEntityDto })
  @Roles(Role.Admin)
  async remove(@Param('id') id: string): Promise<DeleteEntityDto> {
    return this.monstersService.delete(id);
  }

  @Post(':id/add-gold')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: FindMonstersResponseDto,
  })
  @Roles(Role.Ceo)
  async addGoldDto(
    @Param('id') id: string,
    @Body() data: AddGoldDto,
  ): Promise<FindMonstersResponseDto> {
    return await this.monstersService.modifyGold(id, data.goldAmount);
  }

  @Post(':id/remove-gold')
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: FindMonstersResponseDto,
  })
  @Roles(Role.Admin)
  async removeGold(
    @Param('id') id: string,
    @Body() data: RemoveGoldDto,
  ): Promise<FindMonstersResponseDto> {
    return await this.monstersService.modifyGold(id, -data.goldAmount);
  }
}
