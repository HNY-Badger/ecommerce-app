import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './EmptyBasketPage.module.css';
import Button from '../../components/Button/Button';

function EmptyBasketPage() {
  return (
    <div className={styles.empty}>
      <p className={styles.empty_message}>Looks like your cart is empty...</p>
      <NavLink to="/catalog">
        <Button>Back to the shopping</Button>
      </NavLink>
    </div>
  );
}

export default EmptyBasketPage;
