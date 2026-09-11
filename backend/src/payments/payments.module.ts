import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MockPaymentProvider } from './providers/mock-payment.provider';
import { BookingsModule } from '../bookings/bookings.module';
import { InventoryModule } from '../inventory/inventory.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, BookingsModule, InventoryModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, MockPaymentProvider],
  exports: [PaymentsService],
})
export class PaymentsModule {}