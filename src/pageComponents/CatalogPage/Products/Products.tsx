import React from 'react';
import * as styles from './Products.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { useAppSelector } from '../../../store/hooks/redux';

function Products() {
  const {
    data: { products },
  } = useAppSelector((state) => state.productsReducer);

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.images[0]}
          name={product.name}
          description={product.description}
          price={product.price.centValue / 100}
          currencyCode={product.price.currencyCode}
          nonDiscountPrice={product.price.nonDiscountCentValue ? product.price.nonDiscountCentValue / 100 : undefined}
        />
      ))}
    </div>
  );
}

export default Products;
