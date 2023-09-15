import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaService } from '../../services/prisma-service';
import { ProductsUpdateSchedulerService } from '../../services/products-update-scheduler-service';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsUpdateService } from 'src/services/products-update-service';

@Module({
  imports: [CacheModule.register()],
  controllers: [StatusController],
  providers: [
    StatusService,
    PrismaService,
    ProductsUpdateSchedulerService,
    ProductsUpdateService,
  ],
})
export class StatusModule {}
