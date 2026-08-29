import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Stays')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('v1/stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List stays with optional filtering' })
  findAll(
    @Query()
    query: PaginationDto & {
      city?: string;
      minPrice?: number;
      maxPrice?: number;
    },
  ) {
    return this.staysService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a stay by ID' })
  findOne(@Param('id') id: string) {
    return this.staysService.findById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Create a stay' })
  create(@Body() dto: CreateStayDto) {
    return this.staysService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Update a stay' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateStayDto>) {
    return this.staysService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Delete a stay' })
  remove(@Param('id') id: string) {
    return this.staysService.remove(id);
  }
}
