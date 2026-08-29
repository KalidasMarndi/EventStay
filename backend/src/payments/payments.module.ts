import { Module } from '@nestjs/common';

import { StripeProvider } from './providers/stripe.provider';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeProvider],
  exports: [PaymentsService],
})

export class PaymentsModule {}