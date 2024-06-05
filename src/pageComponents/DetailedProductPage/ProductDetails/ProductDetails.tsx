import React from 'react';
import * as styles from './ProductDetails.module.css';
import { Product } from '../../../types/products';

function formatPrice(price: number, currencyCode: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
}

type Props = {
  product: Product;
};

function ProductDetails({ product }: Props) {
  return (
    <div className={styles.info}>
      <div className={styles.heading}>
        <p className={styles.name}>{product.name}</p>
        <div className={styles.prices}>
          {product.price.nonDiscountCentValue ? (
            <>
              <p className={styles.discount_price}>
                {formatPrice(product.price.centValue / 100, product.price.currencyCode)}
              </p>
              <p className={styles.non_discount_price}>
                {formatPrice(product.price.nonDiscountCentValue / 100, product.price.currencyCode)}
              </p>
            </>
          ) : (
            <p>{formatPrice(product.price.centValue / 100, product.price.currencyCode)}</p>
          )}
        </div>
      </div>
      <div className={styles.details}>
        <p>{product.description}</p>
        <ul className={styles.attributes}>
          {product.attributes.map((attr) => (
            <li key={attr.name}>
              <span>{attr.name}: </span>
              {attr.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;
