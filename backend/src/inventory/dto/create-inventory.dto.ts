import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsDateString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stayId: string;

  @ApiProperty({ description: 'Room type or package name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Negotiated Rate per night' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ default: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ description: 'Total Allocation' })
  @IsNumber()
  @Min(0)
  availableRooms: number;

  @ApiPropertyOptional({ default: 2 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  bookingDeadline?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  minimumStay?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1)
  @IsOptional()
  maximumStay?: number;

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  inclusions?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cancellationPolicy?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  paymentPolicy?: string;

  @ApiPropertyOptional({ default: 'ACTIVE' })
  @IsString()
  @IsOptional()
  status?: string;
}
