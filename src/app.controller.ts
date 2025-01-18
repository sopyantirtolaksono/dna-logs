import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ok')
  getOk(): string {
    return this.appService.getOk();
  }
}
