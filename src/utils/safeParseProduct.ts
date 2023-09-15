import { Prisma } from '@prisma/client';
import { ApiProduct } from 'src/external-api/ApiProduct';

export const safeParseProduct = (apiProduct: ApiProduct): ApiProduct => ({
  code: apiProduct.code.replace(/[^0-9]/gi, ''),
  nutriscore_score: Number(apiProduct.nutriscore_score),
  created_t: Number(apiProduct.created_t),
  last_modified_t: Number(apiProduct.last_modified_t),
  serving_quantity: new Prisma.Decimal(apiProduct.serving_quantity || 0),

  brands: apiProduct.brands,
  categories: apiProduct.categories,
  cities: apiProduct.cities,
  creator: apiProduct.creator,
  image_url: apiProduct.image_url,
  ingredients_text: apiProduct.ingredients_text,
  labels: apiProduct.labels,
  main_category: apiProduct.main_category,
  nutriscore_grade: apiProduct.nutriscore_grade,
  product_name: apiProduct.product_name,
  purchase_places: apiProduct.purchase_places,
  quantity: apiProduct.quantity,
  serving_size: apiProduct.serving_size,
  stores: apiProduct.stores,
  traces: apiProduct.traces,
  url: apiProduct.url,
});
