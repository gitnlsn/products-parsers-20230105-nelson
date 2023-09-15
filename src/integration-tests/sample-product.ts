import { Prisma } from '@prisma/client';
import { ApiProduct } from '../external-api/ApiProduct';

export const sampleProduct: ApiProduct = {
  code: '123',
  brands: '',
  categories: '',
  cities: '',
  created_t: 1534239669,
  creator: 'creator',
  image_url: 'image_url',
  ingredients_text: '',
  labels: '',
  last_modified_t: 1534239669,
  main_category: 'main category',
  nutriscore_grade: 'grade',
  nutriscore_score: 123,
  product_name: 'product name',
  purchase_places: 'place 1',
  quantity: '123',
  serving_quantity: new Prisma.Decimal(123.1),
  serving_size: 'serving size 1',
  stores: 'store 1',
  traces: 'trace 1',
  url: 'url',
};

export const sampleProductSwagger = {
  ...sampleProduct,
  serving_quantity: 123.1,
};
