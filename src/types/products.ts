type Response<T> = {
  total: number;
  count: number;
  limit: number;
  offset: number;
  results: T;
};

// Categories
export type CategoryResult = {
  id: string;
  name: {
    ['en-US']: string;
  };
  parent?: {
    id: string;
  };
};

export type CategoriesResponse = Response<CategoryResult[]>;

export type Subcategory = {
  id: string;
  name: string;
  parent: string;
};

export type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

// Products
export type SortType = 'name.en-US asc' | 'name.en-US desc' | 'price asc' | 'price desc';

export function isSortType(type: string): type is SortType {
  return ['name.en-US asc', 'name.en-US desc', 'price asc', 'price desc'].includes(type);
}

export type ProductsParams = {
  ['text.en-US']?: string;
  limit?: number;
  offset?: number;
  filter?: string[];
  sort?: SortType;
};

export type ProductCategory = {
  id: string;
};

export type ProductAttribute = {
  name: string;
  value: string;
};

export type ProductImage = {
  url: string;
};

export type ProductPrice = {
  country: string;
  value: {
    centAmount: number;
    currencyCode: string;
  };
  discounted?: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
};

export type ProductResult = {
  id: string;
  name: {
    ['en-US']: string;
  };
  description: {
    ['en-US']: string;
  };
  categories: ProductCategory[];
  masterVariant: {
    attributes: ProductAttribute[];
    images: ProductImage[];
    prices: ProductPrice[];
  };
};

export type ProductsResponse = Response<ProductResult[]>;

export type DetailedProductResult = {
  id: string;
  masterData: {
    current: {
      name: {
        ['en-US']: string;
      };
      description: {
        ['en-US']: string;
      };
      categories: ProductCategory[];
      masterVariant: {
        attributes: ProductAttribute[];
        images: ProductImage[];
        prices: ProductPrice[];
      };
    };
  };
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  attributes: ProductAttribute[];
  images: string[];
  price: {
    centValue: number;
    currencyCode: string;
    nonDiscountCentValue?: number;
  };
};

export type ProductsData = {
  total: number;
  products: Product[];
};

export type Attribute = {
  name: string;
  values: Map<string, boolean>;
};
