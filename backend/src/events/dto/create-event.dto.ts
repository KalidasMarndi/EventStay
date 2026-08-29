import {
  IsString,
  IsEnum,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventCategory, EventStatus } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: EventCategory })
  @IsEnum(EventCategory)
  category: EventCategory;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  venueId: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePerHead: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  featuredImage?: string;

  @ApiPropertyOptional({ enum: EventStatus })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
