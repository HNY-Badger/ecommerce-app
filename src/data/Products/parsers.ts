import {
  Category,
  CategoryResult,
  DetailedProductResult,
  Product,
  ProductResult,
  Subcategory,
} from '../../types/products';

function parseProductResult(result: ProductResult): Product {
  const master = result.masterVariant;
  const usPrice = master.prices[0];
  const parsed: Product = {
    id: result.id,
    categoryId: result.categories[0].id,
    name: result.name['en-US'],
    description: result.description['en-US'],
    attributes: master.attributes,
    images: master.images.map((img) => img.url),
    price: {
      centValue: usPrice.value.centAmount,
      currencyCode: usPrice.value.currencyCode,
    },
  };
  if (usPrice.discounted) {
    parsed.price.centValue = usPrice.discounted.value.centAmount;
    parsed.price.nonDiscountCentValue = usPrice.value.centAmount;
  }
  return parsed;
}

function parseDetailedProductResult(result: DetailedProductResult): Product {
  const { current } = result.masterData;
  const master = current.masterVariant;
  const usPrice = master.prices[0];
  const parsed: Product = {
    id: result.id,
    categoryId: current.categories[0].id,
    name: current.name['en-US'],
    description: current.description['en-US'],
    attributes: master.attributes,
    images: master.images.map((img) => img.url),
    price: {
      centValue: usPrice.value.centAmount,
      currencyCode: usPrice.value.currencyCode,
    },
  };
  if (usPrice.discounted) {
    parsed.price.centValue = usPrice.discounted.value.centAmount;
    parsed.price.nonDiscountCentValue = usPrice.value.centAmount;
  }
  return parsed;
}

function parseCategories(results: CategoryResult[], withParent?: boolean): Category[] {
  const categories: Category[] = [];
  const subcategories: Subcategory[] = [];
  results.forEach((result) => {
    if (!result.parent || withParent) {
      const cat: Category = {
        id: result.id,
        name: result.name['en-US'],
        subcategories: [],
      };
      categories.push(cat);
    } else {
      const subcat: Subcategory = {
        parent: result.parent.id,
        id: result.id,
        name: result.name['en-US'],
      };
      subcategories.push(subcat);
    }
  });
  subcategories.forEach((subcat) => {
    const parent = categories.find((cat) => cat.id === subcat.parent);
    if (parent) {
      parent.subcategories.push(subcat);
    }
  });
  return categories;
}

export { parseProductResult, parseDetailedProductResult, parseCategories };
