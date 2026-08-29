import * as common from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Public } from '../common/decorators/public.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { Request } from 'express';

@ApiTags('Payments')
@common.Controller('v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @common.UseGuards(RolesGuard)
  @common.Post(':bookingId/create-session')
  @ApiOperation({ summary: 'Create a payment session for a booking' })
  createSession(@common.Param('bookingId') bookingId: string) {
    return this.paymentsService.createPaymentSession(bookingId);
  }

  @Public()
  @common.Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook endpoint for payment updates' })
  async stripeWebhook(
    @common.Req() req: common.RawBodyRequest<Request>,
    @common.Headers('stripe-signature') signature: string,
  ) {
    // Note: ensure the Nest app is configured to parse raw bodies for this route
    const raw = req.rawBody;
    if (!raw) {
      throw new Error('Raw body not available on request. Check NestJS rawBody configuration.');
    }
    return this.paymentsService.handleStripeWebhook(signature, raw);
  }
}
