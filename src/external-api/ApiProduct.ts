import { Product } from '@prisma/client';

export type ApiProduct = Omit<Product, 'id' | 'status' | 'imported_t'> & {
  id?: Product['id'];
  imported_t?: Product['imported_t'];
  status?: Product['status'];
};
