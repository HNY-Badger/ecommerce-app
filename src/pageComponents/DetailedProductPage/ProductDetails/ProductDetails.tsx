import React, { useEffect } from 'react';
import * as styles from './ProductDetails.module.css';
import { Product } from '../../../types/products';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { refreshCart, updateCart } from '../../../store/async/CartThunk';
import Button from '../../../components/Button/Button';
import Counter from '../../../components/Counter/Counter';

function formatPrice(price: number, currencyCode: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(price);
}

type Props = {
  product: Product;
};

function ProductDetails({ product }: Props) {
  const dispatch = useAppDispatch();
  const { data: cart, loading, error } = useAppSelector((state) => state.cartReducer);
  const productInCart = cart?.lineItems.find((item) => item.productId === product.id);

  useEffect(() => {
    if ((!cart && !loading) || error.length > 0) {
      dispatch(refreshCart());
    }
  }, [cart, loading, error]);

  const addButtonClickHandler = () => {
    if (cart !== null) {
      dispatch(
        updateCart.addLineItem({
          id: cart.id,
          version: cart.version,
          actionBody: { productId: product.id, quantity: 1 },
        })
      );
    }
  };

  const removeButtonClickHandler = () => {
    if (cart !== null && productInCart) {
      dispatch(
        updateCart.removeLineItem({
          id: cart.id,
          version: cart.version,
          actionBody: { lineItemId: productInCart.id, quantity: productInCart.quantity },
        })
      );
    }
  };

  const quantityHandler = (quantity: number) => {
    if (cart !== null && productInCart) {
      if (quantity <= 0) {
        dispatch(
          updateCart.removeLineItem({
            id: cart.id,
            version: cart.version,
            actionBody: { lineItemId: productInCart.id, quantity: productInCart.quantity },
          })
        );
      } else {
        dispatch(
          updateCart.changeLineItemQuantity({
            id: cart.id,
            version: cart.version,
            actionBody: { lineItemId: productInCart.id, quantity },
          })
        );
      }
    }
  };

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
      {productInCart ? (
        <>
          <Button variant="remove" onClick={removeButtonClickHandler}>
            Remove from the cart
          </Button>
          <Counter value={productInCart.quantity} onChange={quantityHandler} />
        </>
      ) : (
        <Button onClick={addButtonClickHandler}>Add to cart</Button>
      )}
    </div>
  );
}

export default ProductDetails;
