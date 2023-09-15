import { Product } from '@prisma/client';

export type UpdateProductDto = Partial<Omit<Product, 'id' | 'imported_t'>>;
