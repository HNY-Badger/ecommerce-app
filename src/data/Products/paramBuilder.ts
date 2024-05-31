class ProductParamBuilder {
  public static filter = {
    category: (id: string): string => {
      const query = `"${id}"`;
      return `categories.id: subtree(${query})`;
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

  private static combine(values: string[]): string {
    return values.slice(1).reduce((prev, curr) => `${prev},"${curr}"`, `"${values[0]}"`);
  }
}

export default ProductParamBuilder;
