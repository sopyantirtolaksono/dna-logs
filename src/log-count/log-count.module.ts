import { Module } from '@nestjs/common';
import { LogCountController } from './log-count.controller';
import { LogCountService } from './log-count.service';

@Module({
  controllers: [LogCountController],
  providers: [LogCountService]
})
export class LogCountModule {}
