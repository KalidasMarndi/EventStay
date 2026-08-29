import { Module } from '@nestjs/common';
import { StaysService } from './stays.service';
import { StaysController } from './stays.controller';

@Module({
  controllers: [StaysController],
  providers: [StaysService],
  exports: [StaysService],
})
export class StaysModule {}
