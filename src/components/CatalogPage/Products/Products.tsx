import React from 'react';
import * as styles from './Products.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { useAppSelector } from '../../../store/hooks/redux';
import Spinner from '../../Spinner/Spinner';

function Products() {
  const { products, loading } = useAppSelector((state) => state.productsReducer);

  return loading ? (
    <div className={styles.spinner_wrapper}>
      <Spinner width="200px" />
    </div>
  ) : (
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
