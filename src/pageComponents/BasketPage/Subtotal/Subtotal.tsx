import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Subtotal.module.css';
import Button from '../../../components/Button/Button';

type Props = {
  price: string;
  nonDiscountPrice?: string;
  className?: string;
};

function Subtotal({ price, nonDiscountPrice, className }: Props) {
  return (
    <div className={`${styles.subtotal} ${className}`}>
      <div className={styles.price_wrapper}>
        <p className={styles.text}>Subtotal</p>
        <div className={styles.prices}>
          {nonDiscountPrice ? (
            <>
              <p className={styles.non_discount_price}>{nonDiscountPrice}</p>
              <p className={styles.price}>{price}</p>
            </>
          ) : (
            <p className={styles.price}>{price}</p>
          )}
        </div>
      </div>
      <NavLink to="/checkout" className={styles.btn}>
        <Button>Go to checkout</Button>
      </NavLink>
    </div>
  );
}

export default Subtotal;
