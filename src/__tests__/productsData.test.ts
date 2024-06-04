import ProductParamBuilder from '../data/Products/paramBuilder';
import { parseCategories, parseDetailedProductResult, parseProductResult } from '../data/Products/parsers';
import { Category, CategoryResult, DetailedProductResult, Product, ProductResult } from '../types/products';

describe('ProductParamBuilder', () => {
  describe('filter.category', () => {
    it('should return the correct query string for a valid category ID', () => {
      const id = 'category123';
      const expected = 'categories.id: subtree("category123")';
      expect(ProductParamBuilder.filter.category(id)).toEqual(expected);
    });

    it('should return the correct query string for an empty category ID', () => {
      const id = '';
      const expected = 'categories.id: subtree("")';
      expect(ProductParamBuilder.filter.category(id)).toEqual(expected);
    });
  });

  describe('filter.attribute', () => {
    it('should return the correct query string for a key and multiple values', () => {
      const key = 'color';
      const values = ['red', 'blue'];
      const expected = 'variants.attributes.color:"red","blue"';
      expect(ProductParamBuilder.filter.attribute(key, values)).toEqual(expected);
    });

    it('should return the correct query string for a key and a single value', () => {
      const key = 'color';
      const values = ['red'];
      const expected = 'variants.attributes.color:"red"';
      expect(ProductParamBuilder.filter.attribute(key, values)).toEqual(expected);
    });

    it('should throw an error for a key and empty values', () => {
      const key = 'color';
      const values: string[] = [];
      expect(() => ProductParamBuilder.filter.attribute(key, values)).toThrow(
        'Empty values should be excluded from the query'
      );
    });
  });

  describe('filter.centValueRange', () => {
    it('should return the correct query string for a valid range', () => {
      const from = 1000;
      const to = 2000;
      const expected = 'variants.price.centAmount:range(1000 to 2000)';
      expect(ProductParamBuilder.filter.centValueRange(from, to)).toEqual(expected);
    });

    it('should throw an error if from is greater than to', () => {
      const from = 2000;
      const to = 1000;
      expect(() => ProductParamBuilder.filter.centValueRange(from, to)).toThrow('Invalid value range');
    });

    it('should return the correct query string if from is equal to to', () => {
      const from = 1500;
      const to = 1500;
      const expected = 'variants.price.centAmount:range(1500 to 1500)';
      expect(ProductParamBuilder.filter.centValueRange(from, to)).toEqual(expected);
    });
  });
});

describe('parseProductResult', () => {
  it('should parse a regular product result with a discount', () => {
    const productResult: ProductResult = {
      id: 'prod123',
      name: { 'en-US': 'Product A' },
      description: { 'en-US': 'Description of Product A' },
      categories: [{ id: 'cat1' }],
      masterVariant: {
        attributes: [{ name: 'Color', value: 'Red' }],
        images: [{ url: 'image1.jpg' }],
        prices: [
          {
            country: 'US',
            value: { centAmount: 1000, currencyCode: 'USD' },
            discounted: { value: { centAmount: 800, currencyCode: 'USD' } },
          },
        ],
      },
    };
    const expectedProduct: Product = {
      id: 'prod123',
      categoryId: 'cat1',
      name: 'Product A',
      description: 'Description of Product A',
      attributes: [{ name: 'Color', value: 'Red' }],
      images: ['image1.jpg'],
      price: { centValue: 800, currencyCode: 'USD', nonDiscountCentValue: 1000 },
    };
    expect(parseProductResult(productResult)).toEqual(expectedProduct);
  });

  it('should parse a regular product result without a discount', () => {
    const productResult: ProductResult = {
      id: 'prod123',
      name: { 'en-US': 'Product A' },
      description: { 'en-US': 'Description of Product A' },
      categories: [{ id: 'cat1' }],
      masterVariant: {
        attributes: [{ name: 'Color', value: 'Red' }],
        images: [{ url: 'image1.jpg' }],
        prices: [{ country: 'US', value: { centAmount: 1000, currencyCode: 'USD' } }],
      },
    };
    const expectedProduct: Product = {
      id: 'prod123',
      categoryId: 'cat1',
      name: 'Product A',
      description: 'Description of Product A',
      attributes: [{ name: 'Color', value: 'Red' }],
      images: ['image1.jpg'],
      price: { centValue: 1000, currencyCode: 'USD' },
    };
    expect(parseProductResult(productResult)).toEqual(expectedProduct);
  });
});

describe('parseDetailedProductResult', () => {
  it('should parse a detailed product result with a discount', () => {
    const detailedProductResult: DetailedProductResult = {
      id: 'prod123',
      masterData: {
        current: {
          name: { 'en-US': 'Product A' },
          description: { 'en-US': 'Description of Product A' },
          categories: [{ id: 'cat1' }],
          masterVariant: {
            attributes: [{ name: 'Color', value: 'Red' }],
            images: [{ url: 'image1.jpg' }],
            prices: [
              {
                country: 'US',
                value: { centAmount: 1000, currencyCode: 'USD' },
                discounted: { value: { centAmount: 800, currencyCode: 'USD' } },
              },
            ],
          },
        },
      },
    };
    const expectedProduct: Product = {
      id: 'prod123',
      categoryId: 'cat1',
      name: 'Product A',
      description: 'Description of Product A',
      attributes: [{ name: 'Color', value: 'Red' }],
      images: ['image1.jpg'],
      price: { centValue: 800, currencyCode: 'USD', nonDiscountCentValue: 1000 },
    };
    expect(parseDetailedProductResult(detailedProductResult)).toEqual(expectedProduct);
  });
});

describe('parseCategories', () => {
  it('should parse multiple category results with and without parents', () => {
    const categoryResults: CategoryResult[] = [
      { id: 'cat1', name: { 'en-US': 'Category A' } },
      { id: 'cat2', name: { 'en-US': 'Category B' }, parent: { id: 'cat1' } },
      { id: 'cat3', name: { 'en-US': 'Category C' } },
    ];
    const expectedCategories: Category[] = [
      { id: 'cat1', name: 'Category A', subcategories: [{ id: 'cat2', name: 'Category B', parent: 'cat1' }] },
      { id: 'cat3', name: 'Category C', subcategories: [] },
    ];
    expect(parseCategories(categoryResults)).toEqual(expectedCategories);
  });
});
