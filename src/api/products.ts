import api from '.';
import {
  CategoriesResponse,
  Category,
  DetailedProductResult,
  Product,
  ProductsParams,
  ProductsResponse,
} from '../types/products';
import { parseCategories, parseDetailedProductResult, parseProductResult } from '../data/Products/parsers';

class ProductsAPI {
  public static async getCategories(): Promise<Category[]> {
    const resp = await api.get<CategoriesResponse>(`/${process.env.CTP_PROJECT_KEY}/categories`);
    return parseCategories(resp.data.results);
  }

  // filter and sort should be built with data/Products/builder
  public static async getProducts(params?: ProductsParams): Promise<Product[]> {
    const resp = await api.get<ProductsResponse>(`/${process.env.CTP_PROJECT_KEY}/product-projections/search`, {
      params,
    });
    return resp.data.results.map((result) => parseProductResult(result));
  }

  public static async getDetailedProduct(id: string): Promise<Product> {
    const resp = await api.get<DetailedProductResult>(`/${process.env.CTP_PROJECT_KEY}/products/${id}`);
    return parseDetailedProductResult(resp.data);
  }
}

export default ProductsAPI;
