import { Controller, Get, Query } from '@nestjs/common';
import { LogCountService } from './log-count.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('log_counts')
@Controller('log_counts')
export class LogCountController {
    constructor(private readonly logCountService: LogCountService) {}

    @Get('count')
    @ApiOperation({
        summary: 'Get request count',
        description: 'Get request count in the last hour',
    })
    @ApiQuery({
        name: 'filePath',
        required: true,
        example: 'C:/Projects/my-projects/dna-logs/dist/logs/app.log',
        description: 'Path to log file',
    })
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
