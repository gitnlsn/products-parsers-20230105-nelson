import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma-service';
import { loadOpenFoodProducts } from '../external-api/load-open-foods-products';
import { ProductData } from '../external-api/ProductData.interface';

@Injectable()
export class ProductsUpdateService {
  constructor(private prisma: PrismaService) {}

  async update() {
    const updateList: ProductData[] = [
      'products_01.json.gz',
      'products_02.json.gz',
      'products_03.json.gz',
      'products_04.json.gz',
      'products_05.json.gz',
      'products_06.json.gz',
      'products_07.json.gz',
      'products_08.json.gz',
      'products_09.json.gz',
    ];

    await Promise.all(
      updateList.map(async (data) => {
        const products = await loadOpenFoodProducts({
          data,
          limit: 100,
        });

        await this.prisma.$transaction(async (transaction) => {
          const existingProducts = await transaction.product.findMany({
            where: {
              code: { in: products.map((product) => product.code) },
            },
          });

          const newProducts = products.filter(
            (product) =>
              existingProducts.findIndex(
                (existingProduct) => product.code === existingProduct.code,
              ) === -1,
          );

          return await transaction.product.createMany({
            data: newProducts,
          });
        });
      }),
    );
  }
}
