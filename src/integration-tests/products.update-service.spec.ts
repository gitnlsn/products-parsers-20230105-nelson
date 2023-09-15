import { Test, TestingModule } from '@nestjs/testing';
import { ProductsUpdateService } from '../services/products-update-service';
import { PrismaService } from '../services/prisma-service';
import { CacheModule } from '@nestjs/cache-manager';

describe('ProductsUpdateService', () => {
  let service: ProductsUpdateService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsUpdateService, PrismaService],
      imports: [CacheModule.register()],
    }).compile();

    service = module.get<ProductsUpdateService>(ProductsUpdateService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.product.deleteMany({});
  });

  it('should update products', async () => {
    await service.update();

    const existingProducts = await prisma.product.findMany({});

    expect(existingProducts.length).toBe(900);
  });

  it('should upsert products', async () => {
    await service.update();
    await service.update();

    const existingProducts = await prisma.product.findMany({});

    expect(existingProducts.length).toBe(900);
  });
});
