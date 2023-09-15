import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cache } from 'cache-manager';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async checkConnection() {
    const cachedStatus = await this.cacheManager.get<boolean>(
      'prisma-connection-status',
    );

    if (cachedStatus !== undefined) {
      return cachedStatus;
    }

    try {
      await this.$executeRaw`SELECT CURRENT_TIMESTAMP;`;

      await this.cacheManager.set('prisma-connection-status', true);
      return true;
    } catch (error) {
      await this.cacheManager.set('prisma-connection-status', false);
      return false;
    }
  }
}
