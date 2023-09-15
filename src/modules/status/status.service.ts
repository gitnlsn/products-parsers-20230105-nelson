import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma-service';
import { NodeApiStatus } from './entities/status.entity';
import { ProductsUpdateSchedulerService } from '../../services/products-update-scheduler-service';

@Injectable()
export class StatusService {
  constructor(
    private prisma: PrismaService,
    private productsUpdateService: ProductsUpdateSchedulerService,
  ) {}

  async status(): Promise<NodeApiStatus> {
    const prismaConnectionStatus = (await this.prisma.checkConnection())
      ? 'ok'
      : 'error';

    const productsLastAutoUpdate =
      await this.productsUpdateService.getLastUpdateTimestamp();

    return {
      prismaConnectionStatus,
      productsLastAutoUpdate,
      nodeMemoryUsage: process.memoryUsage(),
      nodeUptime: process.uptime(),
    };
  }
}
