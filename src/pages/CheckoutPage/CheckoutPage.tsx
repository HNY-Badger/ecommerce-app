import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './CheckoutPage.module.css';
import Button from '../../components/Button/Button';

function CheckoutPage() {
  return (
    <div className={styles.checkout}>
      <p className={styles.message}>Technical assignment doesn&apos;t specify the content of this page</p>
      <Link to="/">
        <Button type="button">Return to Home Page</Button>
      </Link>
    </div>
  );
}

export default CheckoutPage;
