import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as styles from './DetailedProductPage.module.css';
import ProductsAPI from '../../api/products';
import { Product } from '../../types/products';
import Spinner from '../../components/Spinner/Spinner';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { BreadcrumbLink } from '../../types/breadcrumb';
import ImageSlider from '../../pageComponents/DetailedProductPage/ImageSlider/ImageSlider';
import EnlargedImage from '../../pageComponents/DetailedProductPage/EnlargedImage/EnlargedImage';
import ProductDetails from '../../pageComponents/DetailedProductPage/ProductDetails/ProductDetails';

type ProductState = {
  product: Product | null;
  loading: boolean;
  error: boolean;
};

function DetailedProductPage() {
  const { id } = useParams();
  const [productState, setProductState] = useState<ProductState>({ product: null, loading: true, error: false });
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbLink[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [enlarged, setEnlarged] = useState<boolean>(false);

  useEffect(() => {
    async function fn() {
      if (id) {
        try {
          const resp = await ProductsAPI.getDetailedProduct(id);
          setProductState((prev) => ({ ...prev, product: resp, loading: false }));
          const links: BreadcrumbLink[] = [{ name: resp.name, to: `/product/${resp.id}` }];
          ProductsAPI.getCategoryById(resp.categoryId).then((cat) => {
            links.unshift({ name: cat.name['en-US'], to: `/category/${cat.id}` });
            if (cat.parent) {
              ProductsAPI.getCategoryById(cat.parent.id).then((parent) => {
                links.unshift({ name: parent.name['en-US'], to: `/category/${parent.id}` });
                setBreadcrumb(links);
              });
            } else {
              setBreadcrumb(links);
            }
          });
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
      <Breadcrumb links={[{ name: 'All', to: '/catalog' }, ...breadcrumb]} />
      <div className={styles.details}>
        <div className={styles.slider_wrapper}>
          <ImageSlider
            index={imageIndex}
            onIndexChange={(i) => setImageIndex(i)}
            name={productState.product?.name!}
            images={productState.product?.images!}
            onImageClick={() => setEnlarged(true)}
          />
        </div>
        <ProductDetails product={productState.product!} />
      </div>
      {enlarged && (
        <EnlargedImage
          index={imageIndex}
          onIndexChange={(i) => setImageIndex(i)}
          name={productState.product?.name!}
          images={productState.product?.images!}
          onBackdropClick={() => setEnlarged(false)}
        />
      )}
    </div>
  );
}

export default DetailedProductPage;
