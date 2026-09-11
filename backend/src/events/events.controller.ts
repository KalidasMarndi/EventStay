import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '@prisma/client';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /** ── Public ── */
  @Public()
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'List events with filtering, pagination, and sorting',
  })
  findAll(@Query() query: QueryEventsDto) {
    return this.eventsService.findAll(query);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a single event by slug' })
  findBySlug(@Param('slug') slug: string, @Query('preview') preview?: boolean) {
    return this.eventsService.findBySlug(slug, preview === true || preview === 'true' as any);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single event by ID' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  /** ── Organizer ── */
  @Post()
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Create a new event' })
  create(@Body() dto: CreateEventDto, @CurrentUser() user: { id: string }) {
    return this.eventsService.create(dto, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Update an event' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.eventsService.update(id, dto, user.id);
  }

  @Put(':id/microsite')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Update event microsite configuration' })
  updateMicrosite(
    @Param('id') id: string,
    @Body() micrositeConfig: any,
    @CurrentUser() user: { id: string },
  ) {
    return this.eventsService.updateMicrosite(id, micrositeConfig, user.id);
  }

  @Post(':id/publish')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Publish an event microsite' })
  publishEvent(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.eventsService.publishEvent(id, user.id);
  }

  @Post(':id/unpublish')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Unpublish an event microsite' })
  unpublishEvent(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.eventsService.unpublishEvent(id, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: '[Organizer] Delete an event' })
  remove(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.eventsService.remove(id, user.id);
  }
}
