import { Attribute, Product } from '../../types/products';

type FilterData = {
  attributes: Attribute[];
  minCentPrice: number;
  maxCentPrice: number;
};

function productsToFilterData(products: Product[]): FilterData {
  let minCentPrice = products[0].price.centValue;
  let maxCentPrice = 0;
  let attrs: Attribute[] = products[0].attributes.map((attr) => ({
    name: attr.name,
    values: new Map<string, boolean>().set(attr.value, false),
  }));
  products.forEach((product) => {
    const price = product.price.centValue;
    minCentPrice = price < minCentPrice ? price : minCentPrice;
    maxCentPrice = maxCentPrice < price ? price : maxCentPrice;

    // Intersection (All different attributes filters out)
    attrs = attrs.filter((attr) => product.attributes.some((a) => a.name === attr.name));
    attrs = attrs.map((attr) => {
      const index = product.attributes.findIndex((a) => a.name === attr.name);
      if (index !== -1) {
        attr.values.set(product.attributes[index].value, false);
      }
      return attr;
    });
  });
  attrs = attrs.filter((attr) => attr.values.size > 1);
  attrs = attrs.sort((a, b) => a.name.localeCompare(b.name));
  return {
    attributes: attrs,
    minCentPrice,
    maxCentPrice,
  };
}

export default productsToFilterData;
