import { sampleProduct } from '../../integration-tests/sample-product';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeAll(() => {
    // @ts-expect-error
    service = {
      findAll: jest.fn(),
      update: jest.fn(),
    } as ProductsService;
    controller = new ProductsController(service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call service with limit and pagination', async () => {
      await controller.findAll('1', '1');

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith({
        limit: 1,
        pagination: 1,
      });
    });

    it('should call service with default values', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith({
        limit: 100,
        pagination: 0,
      });
    });
  });

  describe('update', () => {
    it('should call service with values', async () => {
      (
        service.update as jest.MockedFunction<typeof service.update>
      ).mockResolvedValueOnce(sampleProduct as Product);
      await controller.update('123', {
        creator: 'new creator',
      });

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith('123', {
        creator: 'new creator',
      });
    });
  });
});
