import React, { useEffect } from 'react';
import * as styles from './CatalogPage.module.css';
import Products from '../../components/CatalogPage/Products/Products';
import fetchProducts from '../../store/async/ProductsThunk';
import { useAppDispatch } from '../../store/hooks/redux';

function CatalogPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, []);

  return (
    <div className={styles.catalog}>
      <Products />
    </div>
  );
}

export default CatalogPage;
