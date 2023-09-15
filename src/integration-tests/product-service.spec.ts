import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../services/prisma-service';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsService } from '../modules/products/products.service';
import { sampleProduct } from './sample-product';
import { Product } from '@prisma/client';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  let product: Product;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
      imports: [CacheModule.register()],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    product = await prisma.product.create({
      data: sampleProduct,
    });
  });

  afterEach(async () => {
    await prisma.product.deleteMany({});
  });

  it('should update product', async () => {
    const updatedCreator = await service.update(product.code, {
      creator: 'new creator',
    });

    expect(updatedCreator.creator).toBe('new creator');
  });

  it('should delete product', async () => {
    const deletedCreator = await service.delete(product.code);

    expect(deletedCreator.status).toBe('trash');
  });

  it('should get product by code', async () => {
    const existingProduct = await service.findOne(product.code);

    expect(existingProduct.code).toBe(product.code);
  });

  it('should get all products', async () => {
    const existingProducts = await service.findAll({
      limit: 1,
      pagination: 0,
    });

    expect(existingProducts.length).toBe(1);
  });
});
