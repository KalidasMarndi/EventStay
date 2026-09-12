import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(UserRole.ORGANIZER, UserRole.ADMIN, UserRole.STAFF)
@Controller('v1/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get planner dashboard overview' })
  @ApiQuery({ name: 'eventId', required: false, description: 'Optional ID to scope dashboard to a single event' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getOverview(@CurrentUser('id') userId: string, @Query('eventId') eventId?: string) {
    return this.dashboardService.getOverview(userId, eventId);
  }
}
