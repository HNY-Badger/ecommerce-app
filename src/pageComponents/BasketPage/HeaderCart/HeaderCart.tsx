import { FaCartShopping } from 'react-icons/fa6';
import React, { useEffect } from 'react';
import * as styles from './HeaderCart.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { refreshCart } from '../../../store/async/CartThunk';
import { notify } from '../../../store/reducers/NotificationSlice';
import Spinner from '../../../components/Spinner/Spinner';

function HeaderCart() {
  const dispatch = useAppDispatch();
  const { data: cart, loading, error } = useAppSelector((state) => state.cartReducer);
  const total = cart?.lineItems?.reduce((prev, curr) => prev + curr.quantity, 0) ?? 0;

  useEffect(() => {
    if (!loading) {
      if (error.includes('version')) {
        dispatch(notify({ text: 'Whoa! Slow down a bit', type: 'error' }));
        dispatch(refreshCart());
      } else if (cart === null && error !== `Cart doesn't exist`) {
        dispatch(refreshCart());
      }
    }
  }, [cart, loading, error]);

  return (
    <div className={styles.basket_wrapper}>
      <FaCartShopping />
      {loading ? <Spinner width="16px" /> : total > 0 && <div>{total}</div>}
    </div>
  );
}

export default HeaderCart;
