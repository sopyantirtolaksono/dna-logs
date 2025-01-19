import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('apps')
@Controller('checks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOperation({
    summary: 'Get hello',
    description: 'Get string hello',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ok')
  @ApiOperation({
    summary: 'Get ok',
    description: 'Get string ok',
  })
  getOk(): string {
    return this.appService.getOk();
  }
}
