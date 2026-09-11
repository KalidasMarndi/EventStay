import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryLockerService } from './inventory-locker.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, InventoryLockerService],
  exports: [InventoryService, InventoryLockerService],
})
export class InventoryModule {}
