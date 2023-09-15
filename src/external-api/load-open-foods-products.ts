import axios from 'axios';
import { parseJsonGZBufferToJson } from '../utils/parseJsonGZBufferToJson';
import { ProductData } from './ProductData.interface';
import { safeParseProduct } from '../utils/safeParseProduct';
import { ApiProduct } from './ApiProduct';

interface LoadOpenFoodProductsProps {
  data: ProductData;

  limit: number;
}

export const loadOpenFoodProducts = async ({
  data,

  limit,
}: LoadOpenFoodProductsProps) => {
  const response = await axios({
    url: `https://challenges.coode.sh/food/data/json/${data}`,
    responseType: 'stream',
    method: 'get',
  });

  return await parseJsonGZBufferToJson<ApiProduct>(response, limit).then(
    (products) => products.map(safeParseProduct),
  );
};
