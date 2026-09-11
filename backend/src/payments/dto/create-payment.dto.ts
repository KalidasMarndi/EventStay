import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'The booking reference ID' })
  @IsString()
  @IsNotEmpty()
  bookingReference: string;

  @ApiProperty({ description: 'The guest session ID used for the hold' })
  @IsString()
  @IsOptional()
  guestSessionId?: string;
}
