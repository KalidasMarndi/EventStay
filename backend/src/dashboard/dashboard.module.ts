import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DatabaseModule } from '../database/database.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [DatabaseModule, InventoryModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
