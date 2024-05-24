import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as styles from './DetailedProductPage.module.css';
import ProductsAPI from '../../api/products';
import { Product } from '../../types/products';
import Spinner from '../../components/Spinner/Spinner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProductDetails from '../../components/DetailedProductPage/ProductDetails/ProductDetails';
import ImageSlider from '../../components/DetailedProductPage/ImageSlider/ImageSlider';

type ProductState = {
  product: Product | null;
  loading: boolean;
  error: boolean;
};

function DetailedProductPage() {
  const { id } = useParams();
  const [productState, setProductState] = useState<ProductState>({ product: null, loading: true, error: false });
  useEffect(() => {
    async function fn() {
      if (id) {
        try {
          const resp = await ProductsAPI.getDetailedProduct(id);
          setProductState((prev) => ({ ...prev, product: resp, loading: false }));
        } catch (e) {
          setProductState((prev) => ({
            ...prev,
            loading: false,
            error: true,
          }));
        }
      } else {
        setProductState((prev) => ({ ...prev, loading: false, error: true }));
      }
    }
    fn();
  }, []);

  if (productState.loading) {
    return (
      <div className={styles.center}>
        <Spinner width="100px" />
      </div>
    );
  }
  if (productState.error) {
    return <NotFoundPage />;
  }
  return (
    <div className={styles.product}>
      <ImageSlider name={productState.product?.name!} images={productState.product?.images!} />
      <ProductDetails product={productState.product!} />
    </div>
  );
}

export default DetailedProductPage;
