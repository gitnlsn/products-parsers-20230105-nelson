import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
@ApiTags('Api Status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({
    summary: 'Get api status',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        prismaConnectionStatus: 'ok',
        productsLastAutoUpdate: new Date(2023, 5, 15, 14),
        nodeUptime: 3600,
        nodeMemoryUsage: {
          rss: 49979392,
          heapTotal: 5910528,
          heapUsed: 4849544,
          external: 2121398,
          arrayBuffers: 10532,
        },
      },
    },
  })
  status() {
    return this.statusService.status();
  }
}
