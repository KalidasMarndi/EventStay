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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Inventory')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('v1/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create new inventory block' })
  create(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all inventory for an event' })
  findAllByEvent(@Query('eventId') eventId: string) {
    if (!eventId) throw new Error('eventId is required');
    return this.inventoryService.findAllByEvent(eventId);
  }

  @Public()
  @Get('stats')
  @ApiOperation({ summary: 'Get inventory stats overview for an event' })
  getStats(@Query('eventId') eventId: string) {
    if (!eventId) throw new Error('eventId is required');
    return this.inventoryService.getStats(eventId);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single inventory block' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an inventory block' })
  update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an inventory block' })
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  @Post(':id/hold')
  @ApiOperation({ summary: 'Create a temporary hold on inventory' })
  // Should ideally have a user guard or public session token. For now allow public with a mock userId
  @Public() 
  holdInventory(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
    @Body('userId') userId: string // In production, get from CurrentUser decorator
  ) {
    if (!quantity || quantity <= 0) throw new Error('Valid quantity is required');
    const uId = userId || 'anonymous-session';
    return this.inventoryService.holdInventory(id, quantity, uId);
  }

  @Delete('holds/:holdId')
  @ApiOperation({ summary: 'Release a temporary hold' })
  @Public()
  releaseHold(@Param('holdId') holdId: string) {
    return this.inventoryService.releaseHold(holdId);
  }
}
