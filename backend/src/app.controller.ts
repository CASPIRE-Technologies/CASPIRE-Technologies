import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('v1')
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'API Health Check' })
  healthCheck() {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'Apex Software Engineering REST API',
      version: '1.0.0',
    };
  }
}
