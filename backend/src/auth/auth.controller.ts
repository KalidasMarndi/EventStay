import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { UpsertUserDto } from '../users/dto/upsert-user.dto';

/**
 * AuthController
 *
 * Handles Clerk webhook events that sync user identity into our PostgreSQL database.
 *
 * In production, validate the Clerk webhook signature with svix before processing:
 * https://clerk.com/docs/integrations/webhooks/sync-data
 */
@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('webhook/clerk')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Clerk webhook — sync user.created / user.updated events',
  })
  async clerkWebhook(
    @Body() payload: Record<string, unknown>,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    @Headers('svix-signature') _sig: string,
  ) {
    const type = payload['type'] as string;
    const data = payload['data'] as Record<string, unknown>;

    // TODO: verify svix signature before trusting payload
    if (type === 'user.created' || type === 'user.updated') {
      const emailAddresses = data['email_addresses'] as Array<{
        email_address: string;
      }>;
      const primaryEmail = emailAddresses?.[0]?.email_address ?? '';

      const dto: UpsertUserDto = {
        clerkId: data['id'] as string,
        name: `${(data['first_name'] as string) ?? ''} ${(data['last_name'] as string) ?? ''}`.trim(),
        email: primaryEmail,
        avatar: data['image_url'] as string | undefined,
      };

      await this.usersService.upsertFromClerk(dto);
    }

    return { received: true };
  }
}
