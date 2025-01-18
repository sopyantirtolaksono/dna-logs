import { Controller, Get, Query } from '@nestjs/common';
import { LogCountService } from './log-count.service';

@Controller('log-count')
export class LogCountController {
    constructor(private readonly logCountService: LogCountService) {}

    @Get('count')
    async getRequestCounts(@Query('filePath') filePath: string) {
        if (!filePath) {
            return { error: 'Log file path is required!' };
        }

        try {
            const counts = await this.logCountService.countRequestsInLastHour(filePath);
            return { counts };
        } catch (error) {
            return { error: error.message };
        }
    }
}
