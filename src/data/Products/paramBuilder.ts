class ProductParamBuilder {
  public static filter = {
    category: (ids: string[]): string => {
      if (ids.length === 0) throw Error(`Empty values should be excluded from the query`);
      const query = ids.length === 1 ? `"${ids[0]}"` : this.combine(ids);
      return `categories.id:${query}`;
    },
    attribute: (key: string, values: string[]): string => {
      if (values.length === 0) throw Error(`Empty values should be excluded from the query`);
      const query = values.length === 1 ? `"${values[0]}"` : this.combine(values);
      return `variants.attributes.${key}:${query}`;
    },
    centValueRange: (from: number, to: number): string => {
      if (from > to) throw Error('Invalid value range');
      return `variants.price.centAmount:range(${from} to ${to})`;
    },
  };

  public static sort = {
    format: (type: 'name' | 'price', order: 'asc' | 'desc'): string => {
      const sortType = type === 'name' ? 'name.en-US' : 'price';
      return `${sortType} ${order}`;
    },
  };

  private static combine(values: string[]): string {
    return values.slice(1).reduce((prev, curr) => `${prev},"${curr}"`, `"${values[0]}"`);
  }
}

export default ProductParamBuilder;
