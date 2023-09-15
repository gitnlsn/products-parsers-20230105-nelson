import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { sampleProductSwagger } from '../../integration-tests/sample-product';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      example: [sampleProductSwagger],
    },
  })
  async findAll(
    @Query('limit') limit?: string,
    @Query('pagination') pagination?: string,
  ) {
    return await this.productsService.findAll({
      limit: +limit || 100,
      pagination: +pagination || 0,
    });
  }

  @Get(':code')
  @ApiResponse({
    status: 200,
    schema: {
      example: sampleProductSwagger,
    },
  })
  async findOne(@Param('code') code: string) {
    const existingProduct = await this.productsService.findOne(code);
    if (!existingProduct) {
      throw new NotFoundException();
    }

    return existingProduct;
  }

  @Put(':code')
  @ApiResponse({
    status: 200,
    schema: {
      example: sampleProductSwagger,
    },
  })
  async update(
    @Param('code') code: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(
      code,
      updateProductDto,
    );

    if (!updatedProduct) {
      throw new NotFoundException();
    }

    return updatedProduct;
  }

  @Delete(':code')
  @ApiResponse({
    status: 200,
    schema: {
      example: sampleProductSwagger,
    },
  })
  async remove(@Param('code') code: string) {
    const updatedProduct = await this.productsService.delete(code);

    if (!updatedProduct) {
      throw new NotFoundException();
    }

    return updatedProduct;
  }
}
