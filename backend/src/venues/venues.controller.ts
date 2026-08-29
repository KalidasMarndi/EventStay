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
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Venues')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('v1/venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all venues' })
  findAll(@Query() query: PaginationDto & { city?: string }) {
    return this.venuesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a venue by ID' })
  findOne(@Param('id') id: string) {
    return this.venuesService.findById(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Create a venue' })
  create(@Body() dto: CreateVenueDto) {
    return this.venuesService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Update a venue' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateVenueDto>) {
    return this.venuesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: '[Admin] Delete a venue' })
  remove(@Param('id') id: string) {
    return this.venuesService.remove(id);
  }
}
