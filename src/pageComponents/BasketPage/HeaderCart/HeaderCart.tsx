import { FaCartShopping } from 'react-icons/fa6';
import React, { useEffect } from 'react';
import * as styles from './HeaderCart.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { refreshCart } from '../../../store/async/CartThunk';

function HeaderCart() {
  const dispatch = useAppDispatch();
  const { data: cart, loading, error } = useAppSelector((state) => state.cartReducer);
  const total = cart?.lineItems?.reduce((prev, curr) => prev + curr.quantity, 0) ?? 0;

  useEffect(() => {
    if ((!cart && !loading) || error.length > 0) {
      dispatch(refreshCart());
    }
  }, [cart, loading, error]);

  return (
    <div className={styles.basket_wrapper}>
      <FaCartShopping />
      {total > 0 && <div>{total}</div>}
    </div>
  );
}

export default HeaderCart;
