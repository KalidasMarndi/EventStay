import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TravelService } from './travel.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Prisma } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

@ApiTags('Travel Services')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('v1/travel-services')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Public()
  @Get('public/:slug')
  @ApiOperation({ summary: 'Get visible travel services for a public event microsite' })
  async getPublicServices(@Param('slug') slug: string) {
    return this.travelService.getPublicServices(slug);
  }

  @ApiBearerAuth()
  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get all travel services for an event (Planner)' })
  async getEventServices(@Param('eventId') eventId: string, @CurrentUser('id') userId: string) {
    return this.travelService.getEventServices(eventId, userId);
  }

  @ApiBearerAuth()
  @Post('event/:eventId')
  @ApiOperation({ summary: 'Create a new travel service' })
  async createService(
    @Param('eventId') eventId: string,
    @CurrentUser('id') userId: string,
    @Body() data: Prisma.TravelServiceUncheckedCreateWithoutEventInput
  ) {
    return this.travelService.createService(eventId, userId, data);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a travel service' })
  async updateService(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() data: Prisma.TravelServiceUpdateInput
  ) {
    return this.travelService.updateService(id, userId, data);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a travel service' })
  async deleteService(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.travelService.deleteService(id, userId);
  }
}
