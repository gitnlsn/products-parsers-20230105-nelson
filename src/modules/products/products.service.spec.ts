import { ProductsService } from './products.service';
import { PrismaService } from '../../services/prisma-service';
import { sampleProduct } from '../../integration-tests/sample-product';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    // @ts-expect-error
    prisma = {
      product: {
        findFirst: jest.fn().mockImplementation(() => sampleProduct),
        findMany: jest.fn(),
        update: jest.fn(),
      },
    } as PrismaService;
    service = new ProductsService(prisma);
  });

  describe('findAll', () => {
    it('should call prisma find', async () => {
      await service.findAll({
        limit: 2,
        pagination: 1,
      });

      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        take: 2,
        skip: 2,
      });
    });
  });

  describe('update', () => {
    it('should call prisma find', async () => {
      await service.update('123', {
        creator: 'new creator',
      });

      expect(prisma.product.update).toHaveBeenCalledTimes(1);
      expect(prisma.product.update).toHaveBeenCalledWith({
        data: { creator: 'new creator' },
        where: { code: '123' },
      });
    });
  });
});
