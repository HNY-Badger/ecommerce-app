import React, { useEffect } from 'react';
import * as styles from './BasketPage.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { clearCart, refreshCart } from '../../store/async/CartThunk';
import BasketItems from '../../pageComponents/BasketPage/BasketItems/BasketItems';
import Subtotal from '../../pageComponents/BasketPage/Subtotal/Subtotal';
import formatPrice from '../../utils/formatPrice';
import Button from '../../components/Button/Button';
import EmptyBasketPage from './EmptyBasketPage';

function BasketPage() {
  const dispatch = useAppDispatch();
  const { data: cart, loading, error } = useAppSelector((state) => state.cartReducer);

  useEffect(() => {
    if ((!cart && !loading) || error.length > 0) {
      dispatch(refreshCart());
    }
  }, [cart, loading, error]);

  const clearCartHandler = () => {
    if (cart) {
      const { id, version, lineItems } = cart;
      dispatch(
        clearCart({ id, version, items: lineItems.map((item) => ({ lineItemId: item.id, quantity: item.quantity })) })
      );
    }
  };

  return (
    <div className={styles.basket}>
      {cart && cart.lineItems.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.headbar}>
            <p className={styles.cart_text}>Your shopping cart</p>
            <Button className={styles.remove_btn} variant="remove" onClick={clearCartHandler}>
              Clear&nbsp;cart
            </Button>
          </div>
          <BasketItems items={cart?.lineItems} />
          <Subtotal
            className={styles.subtotal}
            price={formatPrice((cart?.totalPrice.centAmount ?? 0) / 100, cart?.totalPrice.currencyCode ?? 'USD')}
          />
        </div>
      ) : (
        <EmptyBasketPage />
      )}
    </div>
  );
}

export default BasketPage;
