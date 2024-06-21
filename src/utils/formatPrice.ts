function formatPrice(price: number, currencyCode: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
}

export default formatPrice;
