import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Subtotal.module.css';
import Button from '../../../components/Button/Button';

type Props = {
  price: string;
  className?: string;
};

function Subtotal({ price, className }: Props) {
  return (
    <div className={`${styles.subtotal} ${className}`}>
      <div className={styles.price_wrapper}>
        <p className={styles.text}>Subtotal</p>
        <p className={styles.price}>{price}</p>
      </div>
      <NavLink to="/checkout" className={styles.btn}>
        <Button>Go to checkout</Button>
      </NavLink>
    </div>
  );
}

export default Subtotal;
