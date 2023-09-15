import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { ProductsUpdateService } from './products-update-service';

@Injectable()
export class ProductsUpdateSchedulerService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private productsUpdateService: ProductsUpdateService,
  ) {}

  @Cron('* * * * *')
  async updateProducts() {
    await this.productsUpdateService.update();
    await this.updateLastUpdateTimestamp();
    console.log(
      `ProductsUpdateSchedulerService - ${new Date()}: successs. products updated.`,
    );
  }

  async updateLastUpdateTimestamp() {
    await this.cacheManager.set(
      'products-cron-auto-update-last-timestamp',
      new Date(),
      0,
    );
  }

  async getLastUpdateTimestamp() {
    return await this.cacheManager.get<Date>(
      'products-cron-auto-update-last-timestamp',
    );
  }
}
