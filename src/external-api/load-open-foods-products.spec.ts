import { ProductData } from './ProductData.interface';
import { loadOpenFoodProducts } from './load-open-foods-products';

describe('loadOpenFoodsProducts', () => {
  it.skip('should load products', async () => {
    // Skipped: external api call
    const products = await loadOpenFoodProducts({
      data: 'products_01.json.gz',
      limit: 2,
    });

    expect(products.length).toBe(2);
  });

  test.skip.each([
    ['products_01.json.gz'],
    ['products_02.json.gz'],
    ['products_03.json.gz'],
    ['products_04.json.gz'],
    ['products_05.json.gz'],
    ['products_06.json.gz'],
    ['products_07.json.gz'],
    ['products_08.json.gz'],
    ['products_09.json.gz'],
  ])('products should have defined properties: %s', async (data) => {
    // Skipped: external api call
    const products = await loadOpenFoodProducts({
      data: data as ProductData,
      limit: 1000,
    });

    products.forEach((product) => {
      expect(product.brands).toBeDefined();
      expect(product.categories).toBeDefined();
      expect(product.cities).toBeDefined();
      expect(product.code).toBeDefined();
      expect(product.created_t).toBeDefined();
      expect(product.creator).toBeDefined();
      expect(product.image_url).toBeDefined();
      expect(product.ingredients_text).toBeDefined();
      expect(product.labels).toBeDefined();
      expect(product.last_modified_t).toBeDefined();
      expect(product.main_category).toBeDefined();
      expect(product.nutriscore_grade).toBeDefined();
      expect(product.nutriscore_score).toBeDefined();
      expect(product.product_name).toBeDefined();
      expect(product.purchase_places).toBeDefined();
      expect(product.quantity).toBeDefined();
      expect(product.serving_quantity).toBeDefined();
      expect(product.serving_size).toBeDefined();
      expect(product.stores).toBeDefined();
      expect(product.traces).toBeDefined();
      expect(product.url).toBeDefined();
    });
  });
});
