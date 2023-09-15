import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProps } from './interfaces/FindAllProps';
import { PrismaService } from '../../services/prisma-service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ limit, pagination }: FindAllProps) {
    return await this.prisma.product.findMany({
      take: limit,
      skip: limit * pagination,
    });
  }

  async findOne(code: string): Promise<Product | undefined> {
    return await this.prisma.product.findFirst({
      where: {
        code,
      },
    });
  }

  async update(
    code: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | undefined> {
    const existingProduct = await this.prisma.product.findFirst({
      where: { code },
    });

    if (!existingProduct) {
      return undefined;
    }

    return await this.prisma.product.update({
      data: updateProductDto,
      where: { code },
    });
  }

  async delete(code: string): Promise<Product | undefined> {
    const existingProduct = await this.prisma.product.findFirst({
      where: { code },
    });

    if (!existingProduct) {
      return undefined;
    }

    return await this.prisma.product.update({
      data: { status: 'trash' },
      where: { code },
    });
  }
}
