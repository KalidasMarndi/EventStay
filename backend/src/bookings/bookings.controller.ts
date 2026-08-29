import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { IdempotencyInterceptor } from '../common/interceptors/idempotency.interceptor';
import { UseInterceptors } from '@nestjs/common';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('v1/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get bookings for the authenticated user' })
  findAll(@CurrentUser() user: { id: string }, @Query() query: PaginationDto) {
    return this.bookingsService.findAllForUser(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific booking' })
  findOne(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.bookingsService.findById(id, user.id);
  }

  @Post()
  @UseInterceptors(IdempotencyInterceptor)
  @ApiOperation({ summary: 'Create a booking for an event' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: { id: string }) {
    return this.bookingsService.create(dto, user.id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a booking' })
  cancel(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.bookingsService.cancel(id, user.id);
  }
}
