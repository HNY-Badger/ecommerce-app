import api from '.';
import {
  CategoriesResponse,
  Category,
  CategoryResult,
  DetailedProductResult,
  Product,
  ProductsParams,
  ProductsResponse,
} from '../types/products';
import { parseCategories, parseDetailedProductResult, parseProductResult } from '../data/Products/parsers';

class ProductsAPI {
  public static async getCategories(parentId?: string): Promise<Category[]> {
    const params = parentId
      ? {
          where: `parent(id="${parentId}")`,
        }
      : {};
    const resp = await api.get<CategoriesResponse>(`/${process.env.CTP_PROJECT_KEY}/categories`, { params });
    const withParent = !!(parentId && parentId.length > 0);
    return parseCategories(resp.data.results, withParent);
  }

  public static async getCategoryById(id: string): Promise<CategoryResult> {
    const resp = await api.get<CategoryResult>(`/${process.env.CTP_PROJECT_KEY}/categories/${id}`);
    return resp.data;
  }

  // filter should be built with data/Products/builder
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
